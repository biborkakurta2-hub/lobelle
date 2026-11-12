"use client";

import Link from "next/link";
import { useRef } from "react";
import Logo from "./Logo";
import DeviceScroll from "./DeviceScroll";

/**
 * Nyitóképernyő a készülékkel, amely a görgetés ütemére fordul.
 *
 * A felvétel fekvő formátumú, ezért a két tájolás más felépítést kap:
 *  - fekvőben (asztali gép, fektetett tablet) a kép a teljes felületre
 *    feszül, rajta csak a logó, alul;
 *  - állóban (telefon, álló tablet) a kép a teljes szélességet tölti ki
 *    vágás nélkül, fölötte a logó, alatta a cím és a két gomb — így a
 *    képernyő kitöltött, nem marad üres sáv.
 */
export default function DeviceHero() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="relative h-[240vh] landscape:h-[280vh]">
      <div className="sticky top-20 flex h-[calc(100vh-5rem)] w-full flex-col justify-center gap-7 overflow-hidden landscape:block landscape:gap-0">
        {/* Álló nézetben a logó a kép fölött */}
        <div className="flex justify-center px-5 landscape:hidden">
          <Logo className="h-14 w-auto" />
        </div>

        <DeviceScroll sectionRef={sectionRef} />

        {/* Álló nézetben a cím és a gombok töltik ki a képernyő alsó felét */}
        <div className="px-5 text-center landscape:hidden">
          <p className="section-label !text-xs">Üdvözlünk a Lobelle oldalán</p>
          <h1 className="mt-2 font-serif text-3xl font-medium leading-[1.15] text-ink">
            Az innovatív füllyukasztás új generációja
          </h1>
          <div className="mt-6 flex flex-col items-center gap-3">
            <Link href="/termekek/ful-es-orrlyukaszto-keszulek" className="btn-primary w-full max-w-xs !py-3.5">
              Fedezd fel a rendszert
            </Link>
            <Link href="/kepzes" className="btn-outline w-full max-w-xs !py-3.5">
              Jelentkezz képzésre
            </Link>
          </div>
        </div>

        {/* Fekvő nézetben csak a logó, alul, finom krém áttűnéssel */}
        <div className="hidden landscape:absolute landscape:inset-x-0 landscape:bottom-0 landscape:flex landscape:justify-center landscape:bg-gradient-to-t landscape:from-cream landscape:via-cream/80 landscape:to-transparent landscape:px-5 landscape:pb-10 landscape:pt-28">
          <Logo className="h-16 w-auto md:h-20" />
        </div>
      </div>
    </section>
  );
}
