"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

/** Kosár ikon a fejlécben, a tételek számával. */
export default function CartLink({ className = "" }: { className?: string }) {
  const { count } = useCart();

  return (
    <Link
      href="/kosar"
      className={`relative flex items-center gap-2 text-ink transition-colors duration-300 hover:text-bronze ${className}`}
      aria-label={count > 0 ? `Kosár, ${count} tétel` : "Kosár, üres"}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
        <path d="M6 8h12l-1 12H7L6 8z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      </svg>
      {count > 0 ? (
        <span className="flex h-4 min-w-4 items-center justify-center bg-bronze px-1 text-[0.65rem] leading-none text-cream">
          {count}
        </span>
      ) : null}
    </Link>
  );
}
