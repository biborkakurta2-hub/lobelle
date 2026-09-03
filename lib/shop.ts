import catalog from "@/data/products.json";

/**
 * Webshop adatréteg.
 *
 * A termékadatok a `data/products.json` fájlból jönnek, amelyet az
 * `npm run scrape` parancs tölt fel a lobelle.hu oldaláról (nevek, árak,
 * képek, leírások). Amíg a fájl üres, a kategóriaoldalak a "feltöltés alatt"
 * állapotot mutatják — sehol nem jelenik meg kitalált ár vagy termék.
 *
 * SHOPIFY-INTEGRÁCIÓ: ha a webshop mögé Shopify kerül, elég ezt az egy
 * fájlt kicserélni: a `getProductsByCategory` / `getProduct` függvények
 * helyére a Shopify Storefront API hívásai kerülnek (build időben lekérve,
 * így az oldal statikus maradhat), a `AddToCart` komponens pedig a Shopify
 * cart mutation-öket hívja a jelenlegi belső kosár helyett.
 */

export type ShopProduct = {
  /** Egyedi azonosító (a forrásoldal termékazonosítója vagy a slug) */
  id: string;
  /** URL-barát azonosító a termékoldalhoz */
  slug: string;
  name: string;
  /** Bruttó ár forintban; null, ha az oldalon nem szerepelt ár */
  price: number | null;
  /** Áthúzott, eredeti ár akció esetén */
  oldPrice?: number | null;
  /** Képek: helyi útvonalak (/termekek/...) vagy abszolút URL-ek */
  images: string[];
  /** Kategória slug — a PRODUCT_CATEGORIES egyik eleme */
  category: string;
  description?: string;
  sku?: string;
  inStock?: boolean;
  /** Az eredeti termékoldal a lobelle.hu-n (hivatkozásként, ellenőrzéshez) */
  sourceUrl?: string;
};

type Catalog = {
  generatedAt: string | null;
  source: string;
  products: ShopProduct[];
};

const data = catalog as unknown as Catalog;

export const ALL_PRODUCTS: ShopProduct[] = Array.isArray(data.products) ? data.products : [];

export const CATALOG_GENERATED_AT: string | null = data.generatedAt ?? null;

/** Van-e már valós, letöltött termékadat a webshopban? */
export function hasCatalog(): boolean {
  return ALL_PRODUCTS.length > 0;
}

export function getProductsByCategory(categorySlug: string): ShopProduct[] {
  return ALL_PRODUCTS.filter((p) => p.category === categorySlug);
}

export function getProduct(categorySlug: string, productSlug: string): ShopProduct | undefined {
  return ALL_PRODUCTS.find((p) => p.category === categorySlug && p.slug === productSlug);
}

/**
 * Magyar árformátum: 4 990 Ft
 *
 * Az ezres tagolást kézzel végezzük: az Intl.NumberFormat a build környezet
 * ICU-adataitól függ, és csonkolt ICU mellett tagolás nélküli számot adna.
 */
export function formatPrice(price: number | null | undefined): string {
  if (price === null || price === undefined || Number.isNaN(price)) {
    return "Ár egyeztetés alatt";
  }
  const grouped = Math.round(price)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${grouped} Ft`;
}
