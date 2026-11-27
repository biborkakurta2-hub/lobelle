"use client";

import Link from "next/link";
import { useRef } from "react";
import DeviceScroll from "./DeviceScroll";

/**
 * Nyitóképernyő: a készülék egy lekerekített buborékban fordul körbe,
 * mellette a szöveg. Körülötte az oldal saját háttere látszik — a kép
 * nem ér a képernyő széléig, és nincs maszkos elhalványulás.
 *
 * A logó a fejlécben van, ezért itt nem ismétlődik.
 *
 * A szekció magassága adja a forgás útját: a készülék pontosan akkor ér
 * körbe, amikor a nyitóképernyő véget ér — addig a tartalom a helyén
 * marad, és csak utána gördül tovább az oldal.
 *
 * A magasságok svh egységben vannak, így a mobil böngésző címsávjának
 * össze-kinyílása nem mozdítja el a nyitóképernyőt görgetés közben.
 */
export default function DeviceHero() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="relative h-[260svh]">
      <div className="sticky top-20 flex h-[calc(100svh-5rem)] w-full items-center overflow-hidden">
        {/* Nagy képernyőn szélesebb sáv és nagyobb hely a képnek */}
        <div className="mx-auto grid w-full max-w-content items-center gap-7 px-5 sm:px-7 lg:max-w-[80rem] lg:grid-cols-[1.28fr_1fr] lg:gap-12 lg:px-8 xl:max-w-[88rem]">
          {/* A kép buborékban, az oldal háttere előtt */}
          <div className="overflow-hidden rounded-[1.75rem] bg-cream-deep shadow-soft md:rounded-[2.25rem]">
            <div className="aspect-[16/9] w-full">
              <DeviceScroll sectionRef={sectionRef} />
            </div>
          </div>

          {/* Mellette a szöveg */}
          <div className="text-center lg:text-left">
            <p className="section-label">Üdvözlünk a Lobelle oldalán</p>
            <h1 className="mt-4 font-serif text-[2rem] font-medium leading-[1.12] text-ink sm:text-4xl lg:text-[2.3rem] xl:text-[2.7rem]">
              Az innovatív füllyukasztás új generációja
            </h1>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-label text-bronze-soft lg:justify-start">
              <span>Biztonság</span>
              <span className="h-1 w-1 rounded-full bg-sand" aria-hidden="true" />
              <span>Innováció</span>
              <span className="h-1 w-1 rounded-full bg-sand" aria-hidden="true" />
              <span>Szakmaiság</span>
            </div>

            <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                href="/termekek/ful-es-orrlyukaszto-keszulek"
                className="btn-primary !py-3.5 sm:!px-7"
              >
                Fedezd fel a rendszert
              </Link>
              <Link href="/kepzes" className="btn-outline !py-3.5 sm:!px-7">
                Jelentkezz képzésre
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
