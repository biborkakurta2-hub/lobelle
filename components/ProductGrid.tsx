"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import type { ShopProduct } from "@/lib/shop";

type SortKey = "default" | "price-asc" | "price-desc" | "name";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "default", label: "Alapértelmezett" },
  { value: "price-asc", label: "Ár szerint növekvő" },
  { value: "price-desc", label: "Ár szerint csökkenő" },
  { value: "name", label: "Név szerint" },
];

export default function ProductGrid({ products }: { products: ShopProduct[] }) {
  const [sort, setSort] = useState<SortKey>("default");

  const sorted = useMemo(() => {
    const list = [...products];
    switch (sort) {
      case "price-asc":
        return list.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
      case "price-desc":
        return list.sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
      case "name":
        return list.sort((a, b) => a.name.localeCompare(b.name, "hu"));
      default:
        return list;
    }
  }, [products, sort]);

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-hairline pb-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-faded">
          {products.length} termék a kategóriában
        </p>
        <div className="flex items-center gap-3">
          <label htmlFor="sort" className="text-xs uppercase tracking-label text-bronze-soft">
            Rendezés
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-full border border-hairline bg-white px-5 py-2.5 text-sm font-light text-ink transition-colors focus:border-bronze focus:outline-none"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
