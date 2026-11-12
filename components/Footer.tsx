import Link from "next/link";
import Logo from "./Logo";
import { NAV, PHONE, PHONE_HREF, EMAIL, ADDRESS } from "@/lib/navigation";

export default function Footer() {
  return (
    <footer className="border-t border-hairline/70 bg-white/50">
      <div className="mx-auto max-w-content px-5 py-16 sm:px-7 lg:px-8">
        {/* Logó középen */}
        <div className="flex justify-center">
          <Logo className="h-28 w-auto" />
        </div>
        <div className="gold-hairline mx-auto mt-8" aria-hidden="true" />

        <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Elérhetőségek */}
          <div>
            <span className="section-label !text-xs">Elérhetőségek</span>
            <ul className="mt-4 space-y-3 text-sm text-faded">
              <li>{ADDRESS}</li>
              <li>
                <a href={PHONE_HREF} className="transition-colors hover:text-bronze">
                  {PHONE}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="transition-colors hover:text-bronze">
                  {EMAIL}
                </a>
              </li>
            </ul>
          </div>

          {/* Menücsoportok */}
          {NAV.filter((g) => g.items).map((group) => (
            <div key={group.label}>
              <span className="section-label !text-xs">{group.label}</span>
              <ul className="mt-4 space-y-2.5 text-sm">
                {group.items!.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-faded transition-colors hover:text-bronze">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Jogi linkek + közösségi média */}
        <div className="mt-14 border-t border-hairline pt-8">
          <div className="flex flex-col items-center justify-between gap-6 text-sm text-faded md:flex-row">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {/* PLACEHOLDER jogi oldalak — a végleges dokumentumok linkjeire cserélendők */}
              <li>
                <Link href="/kapcsolat" className="transition-colors hover:text-bronze">
                  ÁSZF
                </Link>
              </li>
              <li>
                <Link href="/kapcsolat" className="transition-colors hover:text-bronze">
                  Adatkezelési tájékoztató
                </Link>
              </li>
              <li>
                <Link href="/kapcsolat" className="transition-colors hover:text-bronze">
                  Elállási tájékoztató
                </Link>
              </li>
            </ul>
            <ul className="flex items-center gap-5">
              <li>
                <a
                  href="https://www.facebook.com/lobelle.hu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-bronze"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V9H6v3h3v9h3v-9h3l1-3h-4V6.5a.5.5 0 0 1 .5-.5H15V3z" />
                  </svg>
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/lobelle.hu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-bronze"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
                  </svg>
                  Instagram
                </a>
              </li>
            </ul>
          </div>
          <p className="mt-8 text-center text-xs uppercase tracking-label text-faded/80">
            © 2026 Lobelle · Minden jog fenntartva
          </p>
        </div>
      </div>
    </footer>
  );
}
