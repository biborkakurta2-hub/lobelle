"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { ShopProduct } from "@/lib/shop";

/**
 * Kosár.
 *
 * A tartalma sütiben marad meg, így oldalfrissítés, visszalépés vagy egy
 * külső oldalról való visszatérés után sem ürül ki. (A brief a localStorage
 * és a sessionStorage használatát tiltotta — ez süti, és a kosár működéséhez
 * feltétlenül szükséges, ezért sütitájékoztató-köteles sem.)
 *
 * A sütinek 4 kB-os korlátja van, ezért soronként csak a megjelenítéshez
 * és a fizetéshez kellő mezőket tesszük el, a hosszú leírást és a további
 * képeket nem. A fizetéskor úgyis a Shopify számol a saját áraival.
 */

export type CartLine = {
  product: ShopProduct;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  total: number;
  /** Igaz, amint a sütiből visszaolvastuk a kosarat (szerveroldalon hamis) */
  restored: boolean;
  add: (product: ShopProduct, quantity?: number) => void;
  remove: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const COOKIE = "lobelle_kosar";
const COOKIE_DAYS = 7;
const MAX_BYTES = 3800; // a 4 kB-os korlát alatt, tartalékkal

/** Rövid kulcsok, hogy minél több fér jen a sütibe */
type StoredLine = {
  i: string; // id
  s: string; // slug
  c: string; // kategória
  n: string; // név
  p: number | null; // ár
  m?: string; // első kép
  v?: string; // Shopify változat azonosítója
  q: number; // darab
};

function serialize(lines: CartLine[]): string {
  const stored: StoredLine[] = lines.map(({ product, quantity }) => ({
    i: product.id,
    s: product.slug,
    c: product.category,
    n: product.name,
    p: product.price,
    ...(product.images[0] ? { m: product.images[0] } : {}),
    ...(product.variantId ? { v: product.variantId } : {}),
    q: quantity,
  }));

  // Ha nem férne bele, a legrégebbi tételeket hagyjuk el
  let value = encodeURIComponent(JSON.stringify(stored));
  while (stored.length > 1 && value.length > MAX_BYTES) {
    stored.shift();
    value = encodeURIComponent(JSON.stringify(stored));
  }
  return value.length > MAX_BYTES ? "" : value;
}

function deserialize(value: string): CartLine[] {
  const parsed: unknown = JSON.parse(decodeURIComponent(value));
  if (!Array.isArray(parsed)) return [];

  const lines: CartLine[] = [];
  for (const raw of parsed) {
    const l = raw as Partial<StoredLine>;
    const quantity = Number(l.q);
    if (!l.i || !l.s || !l.c || !l.n) continue;
    if (!Number.isFinite(quantity) || quantity <= 0) continue;
    lines.push({
      quantity: Math.min(99, Math.floor(quantity)),
      product: {
        id: l.i,
        slug: l.s,
        category: l.c,
        name: l.n,
        price: typeof l.p === "number" ? l.p : null,
        images: l.m ? [l.m] : [],
        variantId: l.v,
      },
    });
  }
  return lines;
}

function readCookie(): CartLine[] {
  if (typeof document === "undefined") return [];
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE}=([^;]*)`));
  if (!match) return [];
  try {
    return deserialize(match[1]);
  } catch {
    return []; // sérült vagy régi formátumú süti — induljunk üresen
  }
}

function writeCookie(lines: CartLine[]) {
  if (typeof document === "undefined") return;
  const base = `; path=/; max-age=`;
  const flags = `; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
  if (lines.length === 0) {
    document.cookie = `${COOKIE}=${base}0${flags}`;
    return;
  }
  const value = serialize(lines);
  if (!value) return;
  document.cookie = `${COOKIE}=${value}${base}${COOKIE_DAYS * 24 * 60 * 60}${flags}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [restored, setRestored] = useState(false);
  const loaded = useRef(false);

  // Visszaolvasás csak a böngészőben, hogy a kiszolgálón készült HTML és az
  // első kirajzolás egyezzen (különben hidratálási eltérés lenne)
  useEffect(() => {
    setLines(readCookie());
    loaded.current = true;
    setRestored(true);
  }, []);

  // Minden változás után mentünk — de csak a visszaolvasás UTÁN, különben az
  // induló üres állapot azonnal felülírná a sütiben lévő kosarat
  useEffect(() => {
    if (!loaded.current) return;
    writeCookie(lines);
  }, [lines]);

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
    return { lines, count, total, restored, add, remove, setQuantity, clear };
  }, [lines, restored, add, remove, setQuantity, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("A useCart csak a CartProvider-en belül használható.");
  return ctx;
}
