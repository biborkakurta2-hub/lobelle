"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A Lobelle készülék görgetésvezérelt forgatása.
 *
 * A gördülékenységért négy dolog felel:
 *  - 151 képkocka: az eredeti felvétel 52 kockája közé számolt köztes
 *    képek kerültek, így a lépésköz harmadára csökkent,
 *  - a kockák párhuzamosan töltődnek be, nem egyesével sorban — korábban
 *    emiatt ugrált a kép addig, amíg a letöltés be nem fejeződött,
 *  - a görgetés értékét nem azonnal követi a kép, hanem lágyan simítva,
 *  - a szomszédos kockák között áttűnés van.
 *
 * Képkockák: /public/keszulek/f001.webp … f151.webp (1280 x 720).
 */

const FRAME_COUNT = 151;
const FRAME_WIDTH = 1280;
const FRAME_HEIGHT = 720;
const EASING = 0.16; // mennyit közelít a megjelenített állapot a célhoz képkockánként
const PARALLEL = 6; // egyszerre ennyi kocka tölt

const framePath = (index: number) =>
  `/keszulek/f${String(index + 1).padStart(3, "0")}.webp`;

export default function DeviceScroll({
  sectionRef,
}: {
  sectionRef: React.RefObject<HTMLElement>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    ctx.imageSmoothingQuality = "high";

    const frames: HTMLImageElement[] = new Array(FRAME_COUNT);
    let disposed = false;
    let target = 0;
    let shown = 0;
    let raf = 0;
    let last = -1; // a legutóbb kirajzolt állapot — fölösleges újrarajzolás nélkül

    function render(progress: number) {
      // Fordított sorrend: nyitáskor az utolsó kocka látszik, amelyen a
      // készülék teljes egészében benne van a képben
      const position = (1 - progress) * (FRAME_COUNT - 1);
      const index = Math.min(FRAME_COUNT - 1, Math.floor(position));
      const blend = position - index;

      // Ha a pontos kocka még nem töltött be, a legközelebbi készet rajzoljuk,
      // így a felület soha nem marad üres
      let base = frames[index];
      if (!base?.complete) {
        for (let step = 1; step < FRAME_COUNT; step++) {
          const before = frames[index - step];
          if (before?.complete) {
            base = before;
            break;
          }
          const after = frames[index + step];
          if (after?.complete) {
            base = after;
            break;
          }
        }
      }
      if (!base?.complete) return;

      ctx!.drawImage(base, 0, 0, FRAME_WIDTH, FRAME_HEIGHT);

      // Áttűnés a következő kockára, hogy ne lépcsőzzön a mozgás
      const next = frames[index + 1];
      if (blend > 0.01 && next?.complete) {
        ctx!.globalAlpha = blend;
        ctx!.drawImage(next, 0, 0, FRAME_WIDTH, FRAME_HEIGHT);
        ctx!.globalAlpha = 1;
      }
    }

    function readScroll() {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      target = Math.min(1, Math.max(0, -rect.top / scrollable));
    }

    function tick() {
      if (disposed) return;
      shown += (target - shown) * EASING;
      if (Math.abs(target - shown) < 0.0004) shown = target;
      // Csak akkor rajzolunk, ha tényleg változott valami
      if (Math.abs(shown - last) > 0.00005) {
        render(shown);
        last = shown;
      }
      raf = window.requestAnimationFrame(tick);
    }

    function loadFrame(index: number): Promise<void> {
      return new Promise((resolve) => {
        const image = new Image();
        image.src = framePath(index);
        const done = () => {
          frames[index] = image;
          resolve();
        };
        if (image.decode) image.decode().then(done, done);
        else {
          image.onload = done;
          image.onerror = done;
        }
      });
    }

    /** A maradék kockák betöltése párhuzamosan, a görgetés irányában haladva */
    async function loadRest(order: number[]) {
      let cursor = 0;
      const worker = async () => {
        while (!disposed && cursor < order.length) {
          const index = order[cursor++];
          if (!frames[index]) await loadFrame(index);
        }
      };
      await Promise.all(Array.from({ length: PARALLEL }, worker));
    }

    async function start() {
      // A nyitókocka tölt be elsőként — fordított sorrend miatt ez az utolsó
      // fájl —, hogy a kép azonnal látszódjon, ne csak a teljes letöltés után
      const opening = FRAME_COUNT - 1;
      await loadFrame(opening);
      if (disposed) return;
      render(0);
      last = 0;
      setReady(true);

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        // Mozgás helyett egy jellemző állókép
        const still = Math.floor(FRAME_COUNT / 2);
        await loadFrame(still);
        if (!disposed) render(0.5);
        return;
      }

      // Már a töltés alatt követi a görgetést: a legközelebbi kész kockát
      // rajzolja, és ahogy érkeznek a többiek, finomodik a mozgás
      readScroll();
      shown = target;
      window.addEventListener("scroll", readScroll, { passive: true });
      window.addEventListener("resize", readScroll);
      raf = window.requestAnimationFrame(tick);

      const order: number[] = [];
      for (let i = opening - 1; i >= 0; i--) order.push(i);
      await loadRest(order);
    }

    start();

    return () => {
      disposed = true;
      window.removeEventListener("scroll", readScroll);
      window.removeEventListener("resize", readScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [sectionRef]);

  return (
    <canvas
      ref={canvasRef}
      width={FRAME_WIDTH}
      height={FRAME_HEIGHT}
      className={`h-full w-full object-cover transition-opacity duration-700 ${
        ready ? "opacity-100" : "opacity-0"
      }`}
      role="img"
      aria-label="A Lobelle füllyukasztó készülék körbefordul, ahogy görgetsz"
    />
  );
}
