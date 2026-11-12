"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "./CartProvider";
import type { ShopProduct } from "@/lib/shop";

/** Mennyiségválasztó + kosárba tétel a termékoldalon. */
export default function AddToCart({ product }: { product: ShopProduct }) {
  const { add } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    add(product, quantity);
    setAdded(true);
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center rounded-full border border-hairline bg-white">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-4 py-3 text-lg text-faded transition-colors hover:text-bronze"
            aria-label="Mennyiség csökkentése"
          >
            <span aria-hidden="true">−</span>
          </button>
          <span className="w-10 text-center text-sm text-ink" aria-live="polite">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(99, q + 1))}
            className="px-4 py-3 text-lg text-faded transition-colors hover:text-bronze"
            aria-label="Mennyiség növelése"
          >
            <span aria-hidden="true">+</span>
          </button>
        </div>

        <button type="button" onClick={handleAdd} className="btn-primary flex-1 sm:flex-none">
          Kosárba teszem
        </button>
      </div>

      {added ? (
        <p className="soft-card mt-5 px-6 py-4 text-sm text-ink" role="status">
          A termék a kosárba került.{" "}
          <Link href="/kosar" className="text-bronze underline underline-offset-4 hover:text-bronze-dark">
            Kosár megtekintése
          </Link>
        </p>
      ) : null}
    </div>
  );
}
