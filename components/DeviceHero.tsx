"use client";

import Link from "next/link";
import { useRef } from "react";
import DeviceScroll from "./DeviceScroll";

/**
 * Nyitóképernyő a készülékkel, amely a görgetés ütemére fordul körbe.
 * A logó a fejlécben van, ezért itt nem ismétlődik.
 *
 * A szekció magassága adja a forgás útját: a készülék pontosan akkor ér
 * körbe, amikor a nyitóképernyő véget ér — addig a kép a helyén marad,
 * és csak utána gördül tovább az oldal.
 *
 * A magasságok svh egységben vannak, így a mobil böngésző címsávjának
 * össze-kinyílása nem mozdítja el a nyitóképernyőt görgetés közben.
 *
 * A kép mindkét tájolásban teljes egészében látszik, vágás nélkül:
 * állóban a saját képarányában tölti ki a szélességet, fekvőben a
 * rendelkezésre álló felületbe illeszkedik.
 */
export default function DeviceHero() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="relative h-[260svh] landscape:h-[300svh]">
      <div className="sticky top-20 flex h-[calc(100svh-5rem)] w-full flex-col overflow-hidden landscape:block">
        {/* A kép legfelül, közvetlenül a fejléc alatt, teljes egészében */}
        <DeviceScroll sectionRef={sectionRef} />

        {/* Álló nézet: a szöveg a kép alatt, egyenletesen kitöltve a teret */}
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
