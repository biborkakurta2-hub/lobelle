"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A Lobelle készülék görgetésvezérelt forgatása.
 *
 * A mozgás nem videólejátszás, hanem képkocka-sorozat: a görgetés állása
 * határozza meg, melyik kocka látszik, így mobilon is akadásmentes, és
 * oda-vissza görgetve is pontosan követi a mozdulatot.
 *
 * A képkockák: /public/keszulek/f001.webp … f052.webp (1800 x 1012).
 */

const FRAME_COUNT = 52;
const FRAME_WIDTH = 1800;
const FRAME_HEIGHT = 1012;

const framePath = (index: number) =>
  `/keszulek/f${String(index + 1).padStart(3, "0")}.webp`;

export default function DeviceScroll({ sectionRef }: { sectionRef: React.RefObject<HTMLElement> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentRef = useRef(-1);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function draw(index: number) {
      const image = framesRef.current[index];
      if (!image || !image.complete || currentRef.current === index) return;
      ctx!.clearRect(0, 0, FRAME_WIDTH, FRAME_HEIGHT);
      ctx!.drawImage(image, 0, 0, FRAME_WIDTH, FRAME_HEIGHT);
      currentRef.current = index;
    }

    // Az első kocka azonnal, hogy ne legyen üres a felület
    const first = new Image();
    first.src = framePath(0);
    first.onload = () => {
      framesRef.current[0] = first;
      draw(0);
      setReady(true);
    };

    // A többi kocka a háttérben töltődik
    for (let i = 1; i < FRAME_COUNT; i++) {
      const image = new Image();
      image.src = framePath(i);
      framesRef.current[i] = image;
    }

    // Mozgáscsökkentett módban egy jellemző állókép marad
    if (reduceMotion) {
      const still = framesRef.current[Math.floor(FRAME_COUNT / 2)];
      if (still) still.onload = () => draw(Math.floor(FRAME_COUNT / 2));
      return;
    }

    let frameRequest = 0;

    function update() {
      frameRequest = 0;
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      draw(Math.round(progress * (FRAME_COUNT - 1)));
    }

    function onScroll() {
      if (frameRequest) return;
      frameRequest = window.requestAnimationFrame(update);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frameRequest) window.cancelAnimationFrame(frameRequest);
    };
  }, [sectionRef]);

  return (
    <div className="relative inline-block overflow-hidden rounded-card border border-hairline bg-cream-deep leading-none shadow-soft">
      <canvas
        ref={canvasRef}
        width={FRAME_WIDTH}
        height={FRAME_HEIGHT}
        className={`block h-auto max-h-[46vh] w-auto max-w-full transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
        role="img"
        aria-label="A Lobelle füllyukasztó készülék körbefordul, ahogy görgetsz"
      />
    </div>
  );
}
