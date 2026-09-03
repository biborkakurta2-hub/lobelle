"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { ShopProduct } from "@/lib/shop";

/**
 * Kosár — a böngésző memóriájában él (nincs localStorage, a brief szerint).
 * Oldalfrissítéskor kiürül; a megrendelés a /kosar oldalon, a Formspree
 * űrlapon keresztül megy el, tehát fizetési szolgáltató nélkül is működik.
 *
 * SHOPIFY-INTEGRÁCIÓ: ha a bolt mögé Shopify kerül, ez a provider cserélhető
 * a Shopify cart API-jára (cartCreate / cartLinesAdd), a checkout gomb pedig
 * a Shopify checkout URL-jére irányít.
 */

export type CartLine = {
  product: ShopProduct;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  total: number;
  add: (product: ShopProduct, quantity?: number) => void;
  remove: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  const add = useCallback((product: ShopProduct, quantity = 1) => {
    setLines((current) => {
      const existing = current.find((line) => line.product.id === product.id);
      if (existing) {
        return current.map((line) =>
          line.product.id === product.id ? { ...line, quantity: line.quantity + quantity } : line
        );
      }
      return [...current, { product, quantity }];
    });
  }, []);

  const remove = useCallback((productId: string) => {
    setLines((current) => current.filter((line) => line.product.id !== productId));
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    setLines((current) =>
      quantity <= 0
        ? current.filter((line) => line.product.id !== productId)
        : current.map((line) => (line.product.id === productId ? { ...line, quantity } : line))
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((sum, line) => sum + line.quantity, 0);
    const total = lines.reduce((sum, line) => sum + (line.product.price ?? 0) * line.quantity, 0);
    return { lines, count, total, add, remove, setQuantity, clear };
  }, [lines, add, remove, setQuantity, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("A useCart csak a CartProvider-en belül használható.");
  return ctx;
}
