"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import CartLink from "./CartLink";
import { NAV, PHONE, PHONE_HREF } from "@/lib/navigation";

/**
 * Letisztult, egysoros fejléc: logó balra, csoportosított lenyíló menük,
 * telefonszám CTA gombként. Mobilon összecsukható menü.
 */
export default function Header() {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Kattintás a menün kívül: lenyíló bezárása
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenGroup(null);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenGroup(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const closeAll = () => {
    setOpenGroup(null);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-hairline/70 bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex h-20 max-w-content items-center justify-between gap-6 px-5 sm:px-7 lg:px-8">
        <Link href="/" aria-label="Lobelle – főoldal" onClick={closeAll} className="shrink-0">
          <Logo className="h-16 w-auto" />
        </Link>

        {/* Asztali navigáció */}
        <nav ref={navRef} aria-label="Fő navigáció" className="hidden items-center gap-1 lg:flex">
          {NAV.map((group) =>
            group.items ? (
              <div key={group.label} className="relative">
                <button
                  type="button"
                  className={`flex items-center gap-1.5 px-4 py-2 text-sm tracking-wide transition-colors duration-300 hover:text-bronze ${
                    openGroup === group.label ? "text-bronze" : "text-ink"
                  }`}
                  aria-expanded={openGroup === group.label}
                  aria-haspopup="true"
                  onClick={() =>
                    setOpenGroup(openGroup === group.label ? null : group.label)
                  }
                >
                  {group.label}
                  <svg
                    viewBox="0 0 10 6"
                    className={`h-1.5 w-2.5 transition-transform duration-300 ${
                      openGroup === group.label ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  >
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.2" fill="none" />
                  </svg>
                </button>
                {openGroup === group.label ? (
                  <div className="absolute left-0 top-full min-w-[19rem] overflow-hidden rounded-card border border-hairline bg-white shadow-soft">
                    <ul className="py-2">
                      {group.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={closeAll}
                            className="block px-5 py-2.5 text-sm text-faded transition-colors duration-300 hover:bg-cream-deep hover:text-bronze"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            ) : (
              <Link
                key={group.label}
                href={group.href!}
                onClick={closeAll}
                className="px-4 py-2 text-sm tracking-wide text-ink transition-colors duration-300 hover:text-bronze"
              >
                {group.label}
              </Link>
            )
          )}
        </nav>

        {/* Kosár + telefonszám CTA */}
        <div className="ml-auto flex items-center gap-5 lg:ml-0">
          <CartLink />
          <a href={PHONE_HREF} className="btn-primary hidden whitespace-nowrap !px-6 !py-3 !text-sm xl:inline-block">
            Hívjon: {PHONE}
          </a>
        </div>

        {/* Mobil menü gomb */}
        <button
          type="button"
          className="-mr-2 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Menü bezárása" : "Menü megnyitása"}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span
            className={`h-px w-6 bg-ink transition-transform duration-300 ${
              mobileOpen ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span className={`h-px w-6 bg-ink transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span
            className={`h-px w-6 bg-ink transition-transform duration-300 ${
              mobileOpen ? "-translate-y-[9.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobil menü */}
      {mobileOpen ? (
        <nav
          id="mobile-menu"
          aria-label="Mobil navigáció"
          className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-hairline bg-cream lg:hidden"
        >
          <div className="mx-auto max-w-content px-4 py-4 sm:px-6">
            {NAV.map((group) =>
              group.items ? (
                <div key={group.label} className="border-b border-hairline/40 py-3">
                  <span className="section-label !text-xs">{group.label}</span>
                  <ul className="mt-2">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={closeAll}
                          className="block py-2 text-sm text-ink transition-colors hover:text-bronze"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div key={group.label} className="border-b border-hairline/40 py-3">
                  <Link
                    href={group.href!}
                    onClick={closeAll}
                    className="block py-1 text-sm text-ink transition-colors hover:text-bronze"
                  >
                    {group.label}
                  </Link>
                </div>
              )
            )}
            <a href={PHONE_HREF} className="btn-primary mt-5 block text-center !text-sm">
              Hívjon: {PHONE}
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
