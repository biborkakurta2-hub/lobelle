"use client";

import Link from "next/link";
import { useRef } from "react";
import Logo from "./Logo";
import DeviceScroll from "./DeviceScroll";

/**
 * Nyitóképernyő: a Lobelle készülék nagyban, középen, a görgetés ütemére
 * fordulva. A szekció magasabb a képernyőnél, a tartalom tapad — amíg a
 * szekción görgetünk, a készülék fordul, a szöveg a helyén marad.
 */
export default function DeviceHero() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="relative h-[220vh] lg:h-[260vh]">
      <div className="sticky top-20 flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center gap-6 px-5 py-8 sm:px-7 lg:px-8">
        <div className="text-center">
          <Logo className="mx-auto h-20 w-auto md:h-24" />
          <p className="section-label mt-5">Üdvözlünk a Lobelle oldalán</p>
          <h1 className="mx-auto mt-3 max-w-3xl font-serif text-4xl font-medium leading-[1.1] text-ink md:text-5xl">
            Az innovatív füllyukasztás új generációja
          </h1>
        </div>

        <div className="flex w-full max-w-5xl justify-center">
          <DeviceScroll sectionRef={sectionRef} />
        </div>

        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm uppercase tracking-label text-bronze-soft">
            <span>Biztonság</span>
            <span className="h-1 w-1 rounded-full bg-sand" aria-hidden="true" />
            <span>Innováció</span>
            <span className="h-1 w-1 rounded-full bg-sand" aria-hidden="true" />
            <span>Szakmaiság</span>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/termekek/ful-es-orrlyukaszto-keszulek" className="btn-primary">
              Fedezd fel a rendszert
            </Link>
            <Link href="/kepzes" className="btn-outline">
              Jelentkezz képzésre
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
