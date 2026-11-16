import catalog from "@/data/products.json";
import { PRODUCT_CATEGORIES } from "@/lib/products";
import { fetchShopifyProducts, isShopifyConfigured } from "@/lib/shopify";

/**
 * Webshop adatréteg.
 *
 * Két forrásból tud dolgozni, és magától a megfelelőt választja:
 *
 *  1. Ha be van állítva a Shopify (lásd .env.example), a termékek,
 *     árak és a készlet a Shopify boltból jönnek. A lekérés a build
 *     során történik, így az oldal statikus és gyors marad.
 *
 *  2. Ha nincs Shopify, a data/products.json helyi adatait használja,
 *     amelyeket az `npm run scrape` töltött le a lobelle.hu-ról.
 *
 * Így az oldal a Shopify bekapcsolása előtt és után is működik.
 */

export type ShopProduct = {
  /** Egyedi azonosító */
  id: string;
  /** URL-barát azonosító a termékoldalhoz */
  slug: string;
  name: string;
  /** Bruttó ár forintban; null, ha nincs ár */
  price: number | null;
  /** Áthúzott, eredeti ár akció esetén */
  oldPrice?: number | null;
  /** Képek: helyi útvonalak (/termekek/...) vagy abszolút URL-ek */
  images: string[];
  /** A képek eredeti mérete — ebből jön a galéria képaránya, az `images` sorrendjében */
  imageSizes?: { width: number; height: number }[];
  /** Kategória slug — a PRODUCT_CATEGORIES egyik eleme */
  category: string;
  description?: string;
  sku?: string;
  inStock?: boolean;
  /** Az eredeti termékoldal, ha helyi adatból dolgozunk */
  sourceUrl?: string;
  /** Shopify változat azonosítója — ez kell a kosárhoz és a fizetéshez */
  variantId?: string;
};

type Catalog = {
  generatedAt: string | null;
  source: string;
  products: ShopProduct[];
};

const localCatalog = catalog as unknown as Catalog;

const LOCAL_PRODUCTS: ShopProduct[] = Array.isArray(localCatalog.products)
  ? localCatalog.products
  : [];

/** Magyar kategórianév -> kategória slug, a Shopify címkék megfeleltetéséhez */
const CATEGORY_BY_NAME = new Map(
  PRODUCT_CATEGORIES.map((c) => [c.name.toLowerCase(), c.slug])
);
const CATEGORY_SLUGS = new Set(PRODUCT_CATEGORIES.map((c) => c.slug));

/** Egy Shopify termék kategóriájának megállapítása gyűjtemény vagy címke alapján */
function resolveCategory(
  collections: { handle: string; title: string }[],
  tags: string[]
): string | null {
  for (const collection of collections) {
    if (CATEGORY_SLUGS.has(collection.handle)) return collection.handle;
    const byTitle = CATEGORY_BY_NAME.get(collection.title.toLowerCase());
    if (byTitle) return byTitle;
  }
  for (const tag of tags) {
    const bySlug = CATEGORY_BY_NAME.get(tag.toLowerCase());
    if (bySlug) return bySlug;
    if (CATEGORY_SLUGS.has(tag)) return tag;
  }
  return null;
}

function toInteger(amount: string | null | undefined): number | null {
  if (!amount) return null;
  const value = Math.round(Number(amount));
  return Number.isFinite(value) && value > 0 ? value : null;
}

let cache: Promise<ShopProduct[]> | null = null;

/** A teljes termékkínálat — Shopifyból, vagy helyi adatból */
export function getAllProducts(): Promise<ShopProduct[]> {
  if (cache) return cache;

  cache = (async () => {
    if (!isShopifyConfigured()) return LOCAL_PRODUCTS;

    try {
      const nodes = await fetchShopifyProducts();
      const products: ShopProduct[] = [];

      for (const node of nodes) {
        const category = resolveCategory(node.collections.nodes, node.tags);
        if (!category) continue; // nem a hat kategória valamelyikébe tartozik

        const variant = node.variants.nodes[0];
        products.push({
          id: node.id,
          slug: node.handle,
          name: node.title,
          price: toInteger(variant?.price.amount),
          oldPrice: toInteger(variant?.compareAtPrice?.amount),
          images: node.images.nodes.map((image) => image.url),
          imageSizes: node.images.nodes.map((image) => ({
            width: image.width ?? 1024,
            height: image.height ?? 678,
          })),
          category,
          description: node.description || undefined,
          sku: variant?.sku || undefined,
          inStock: variant?.availableForSale ?? node.availableForSale,
          variantId: variant?.id,
        });
      }

      // Ha a Shopify bolt még üres, ne tűnjön el a kínálat az oldalról
      return products.length > 0 ? products : LOCAL_PRODUCTS;
    } catch (error) {
      // A build ne dőljön el egy átmeneti hiba miatt: marad a helyi adat
      console.warn(
        "A Shopify termékek lekérése nem sikerült, a helyi adatokat használjuk:",
        error instanceof Error ? error.message : error
      );
      return LOCAL_PRODUCTS;
    }
  })();

  return cache;
}

export async function getProductsByCategory(categorySlug: string): Promise<ShopProduct[]> {
  const products = await getAllProducts();
  return products.filter((p) => p.category === categorySlug);
}

export async function getProduct(
  categorySlug: string,
  productSlug: string
): Promise<ShopProduct | undefined> {
  const products = await getAllProducts();
  return products.find((p) => p.category === categorySlug && p.slug === productSlug);
}

/** Van-e egyáltalán termékadat? */
export async function hasCatalog(): Promise<boolean> {
  return (await getAllProducts()).length > 0;
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
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${grouped} Ft`;
}
