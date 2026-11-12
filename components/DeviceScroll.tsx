"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A Lobelle készülék görgetésvezérelt forgatása, teljes képernyőn.
 *
 * A gördülékenységért három dolog felel:
 *  - a képkockák előre dekódolva töltődnek be, így megjelenéskor nincs akadás,
 *  - a görgetés értékét nem azonnal követi a kép, hanem lágyan simítva,
 *  - a szomszédos képkockák között áttűnés van, így az 52 kocka folyamatos
 *    mozgásnak látszik, nem lépkedésnek.
 *
 * Képkockák: /public/keszulek/f001.webp … f052.webp (1800 x 1012).
 */

const FRAME_COUNT = 52;
const FRAME_WIDTH = 1800;
const FRAME_HEIGHT = 1012;
/* A vászon szélesebb a képkockánál: a két szélső sávot a kép saját
   szélső képpontjaiból nyújtjuk ki, így a toldás soronként pontosan
   egyezik a képpel, és nem látszik függőleges él. */
const SIDE_BAND = 460;
const CANVAS_WIDTH = FRAME_WIDTH + SIDE_BAND * 2;
const EASING = 0.16; // mennyit közelít a megjelenített állapot a célhoz képkockánként

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

    /** Egy képkocka kirajzolása a kinyújtott oldalsó sávokkal együtt */
    function paint(image: HTMLImageElement, alpha: number) {
      ctx!.globalAlpha = alpha;
      // bal sáv a kép bal szélső oszlopából
      ctx!.drawImage(image, 0, 0, 2, FRAME_HEIGHT, 0, 0, SIDE_BAND, FRAME_HEIGHT);
      // jobb sáv a kép jobb szélső oszlopából
      ctx!.drawImage(
        image,
        FRAME_WIDTH - 2, 0, 2, FRAME_HEIGHT,
        SIDE_BAND + FRAME_WIDTH, 0, SIDE_BAND, FRAME_HEIGHT
      );
      // maga a képkocka, középen
      ctx!.drawImage(image, SIDE_BAND, 0, FRAME_WIDTH, FRAME_HEIGHT);
      ctx!.globalAlpha = 1;
    }

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
          if (before?.complete) { base = before; break; }
          const after = frames[index + step];
          if (after?.complete) { base = after; break; }
        }
      }
      if (!base?.complete) return;

      paint(base, 1);

      // Áttűnés a következő kockára, hogy ne lépcsőzzön a mozgás
      const next = frames[index + 1];
      if (blend > 0.01 && next?.complete) {
        paint(next, blend);
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
      render(shown);
      raf = window.requestAnimationFrame(tick);
    }

    function loadFrame(index: number): Promise<HTMLImageElement> {
      return new Promise((resolve) => {
        const image = new Image();
        image.src = framePath(index);
        const done = () => resolve(image);
        if (image.decode) image.decode().then(done, done);
        else {
          image.onload = done;
          image.onerror = done;
        }
      });
    }

    async function start() {
      // A nyitókocka tölt be elsőként — fordított sorrend miatt ez az utolsó
      // fájl —, hogy a kép azonnal látszódjon, ne csak a teljes letöltés után
      const opening = FRAME_COUNT - 1;
      frames[opening] = await loadFrame(opening);
      if (disposed) return;
      render(0);
      setReady(true);

      // A többi kocka a görgetés irányában, visszafelé haladva
      for (let i = opening - 1; i >= 0; i--) {
        if (disposed) return;
        frames[i] = await loadFrame(i);
      }

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        render(0.5); // mozgás helyett egy jellemző állókép
        return;
      }

      readScroll();
      shown = target;
      window.addEventListener("scroll", readScroll, { passive: true });
      window.addEventListener("resize", readScroll);
      raf = window.requestAnimationFrame(tick);
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
      width={CANVAS_WIDTH}
      height={FRAME_HEIGHT}
      className={`aspect-[16/9] w-full object-cover transition-opacity duration-700 landscape:aspect-auto landscape:h-full landscape:w-full ${
        ready ? "opacity-100" : "opacity-0"
      }`}
      role="img"
      aria-label="A Lobelle füllyukasztó készülék körbefordul, ahogy görgetsz"
    />
  );
}
