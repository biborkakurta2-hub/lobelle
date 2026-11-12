"use client";

import { useRef } from "react";
import Logo from "./Logo";
import DeviceScroll from "./DeviceScroll";

/**
 * Nyitóképernyő: a készülék tölti ki a képernyőt, és a görgetés ütemére
 * fordul. A képen csak a logó van, alatta.
 *
 * Fekvő tájolásban (asztali gép, fektetett tablet) a kép a teljes
 * felületre feszül; állóban a saját képarányában tölti ki a szélességet,
 * így a készülék vége sehol nem vágódik le.
 */
export default function DeviceHero() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="relative h-[240vh] md:h-[280vh]">
      <div className="sticky top-20 flex h-[calc(100vh-5rem)] w-full flex-col items-center justify-center overflow-hidden landscape:block">
        <DeviceScroll sectionRef={sectionRef} />

        <div className="mt-8 flex justify-center landscape:absolute landscape:inset-x-0 landscape:bottom-0 landscape:mt-0 landscape:bg-gradient-to-t landscape:from-cream landscape:via-cream/80 landscape:to-transparent landscape:px-5 landscape:pb-10 landscape:pt-28">
          <Logo className="h-16 w-auto md:h-20" />
        </div>
      </div>
    </section>
  );
}
