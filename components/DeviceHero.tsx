"use client";

import Link from "next/link";
import { useRef } from "react";
import DeviceScroll from "./DeviceScroll";

/**
 * Nyitóképernyő a készülékkel, amely a görgetés ütemére fordul körbe.
 * A logó a fejlécben van, ezért itt nem ismétlődik.
 *
 * Fekvőben a képernyő felső háromnegyedét a kép tölti ki, az alsó
 * negyedét a krém sáv a címmel — a szöveg nem lóg bele a képbe.
 * A kép széle maszkkal olvad bele az oldalba, így nincs éles határ.
 *
 * A szekció magassága adja a forgás útját: a készülék pontosan akkor ér
 * körbe, amikor a nyitóképernyő véget ér — addig a kép a helyén marad,
 * és csak utána gördül tovább az oldal.
 *
 * A magasságok svh egységben vannak, így a mobil böngésző címsávjának
 * össze-kinyílása nem mozdítja el a nyitóképernyőt görgetés közben.
 */
export default function DeviceHero() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="relative h-[260svh] landscape:h-[300svh]">
      <div className="sticky top-20 flex h-[calc(100svh-5rem)] w-full flex-col overflow-hidden">
        {/* A kép: fekvőben a magasság háromnegyede */}
        <div className="device-fade relative overflow-hidden landscape:h-3/4">
          <DeviceScroll sectionRef={sectionRef} />
        </div>

        {/* Fekvő nézet: alsó negyed krém sáv a címmel, átfedés nélkül */}
        <div className="hidden landscape:flex landscape:h-1/4 landscape:flex-col landscape:items-center landscape:justify-center landscape:px-6 landscape:text-center">
          <p className="section-label">Üdvözlünk a Lobelle oldalán</p>
          <h1 className="mx-auto mt-2 max-w-4xl font-serif text-4xl font-medium leading-[1.1] text-ink xl:text-5xl">
            Az innovatív füllyukasztás új generációja
          </h1>
        </div>

        {/* Álló nézet: a kép alatt a cím, a pillérek és a két gomb */}
        <div className="flex flex-1 flex-col items-center justify-evenly px-6 pb-8 text-center landscape:hidden">
          <div>
            <p className="section-label !text-xs">Üdvözlünk a Lobelle oldalán</p>
            <h1 className="mt-3 font-serif text-[2.1rem] font-medium leading-[1.12] text-ink">
              Az innovatív füllyukasztás új generációja
            </h1>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-label text-bronze-soft">
            <span>Biztonság</span>
            <span className="h-1 w-1 rounded-full bg-sand" aria-hidden="true" />
            <span>Innováció</span>
            <span className="h-1 w-1 rounded-full bg-sand" aria-hidden="true" />
            <span>Szakmaiság</span>
          </div>

          <div className="flex w-full flex-col items-center gap-3">
            <Link href="/termekek/ful-es-orrlyukaszto-keszulek" className="btn-primary w-full max-w-xs !py-3.5">
              Fedezd fel a rendszert
            </Link>
            <Link href="/kepzes" className="btn-outline w-full max-w-xs !py-3.5">
              Jelentkezz képzésre
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
