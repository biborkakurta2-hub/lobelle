/**
 * Shopify Storefront API kapcsolat.
 *
 * A webshop háttérrendszere a Shopify: a termékeket, árakat és a készletet
 * a Shopify adminban kezeljük, a fizetés a Shopify biztonságos fizetési
 * oldalán történik. Az oldal megjelenése és felépítése változatlan marad.
 *
 * Bekapcsolás: a .env.local fájlban add meg a bolt címét és a Storefront
 * API tokent (lásd .env.example). Amíg ezek hiányoznak, az oldal a
 * data/products.json helyi adataival működik tovább.
 */

const API_VERSION = "2024-10";

export const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? "";
export const SHOPIFY_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN ?? "";

export function isShopifyConfigured(): boolean {
  return Boolean(SHOPIFY_DOMAIN && SHOPIFY_TOKEN);
}

type GraphQLResponse<T> = { data?: T; errors?: { message: string }[] };

export async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  const response = await fetch(`https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    // A terméklista a build során kérdeződik le, így az oldal statikus marad
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Shopify API hiba: HTTP ${response.status}`);
  }

  const result = (await response.json()) as GraphQLResponse<T>;
  if (result.errors?.length) {
    throw new Error(`Shopify API hiba: ${result.errors.map((e) => e.message).join("; ")}`);
  }
  if (!result.data) {
    throw new Error("A Shopify üres választ adott.");
  }
  return result.data;
}

/* ------------------------------------------------------------------ */
/* Termékek lekérése                                                   */
/* ------------------------------------------------------------------ */

const PRODUCTS_QUERY = `
  query Termekek($cursor: String) {
    products(first: 100, after: $cursor) {
      pageInfo { hasNextPage endCursor }
      nodes {
        id
        handle
        title
        description
        tags
        availableForSale
        images(first: 10) { nodes { url altText } }
        collections(first: 10) { nodes { handle title } }
        variants(first: 1) {
          nodes {
            id
            sku
            availableForSale
            price { amount }
            compareAtPrice { amount }
          }
        }
      }
    }
  }
`;

type ShopifyProductNode = {
  id: string;
  handle: string;
  title: string;
  description: string;
  tags: string[];
  availableForSale: boolean;
  images: { nodes: { url: string; altText: string | null }[] };
  collections: { nodes: { handle: string; title: string }[] };
  variants: {
    nodes: {
      id: string;
      sku: string | null;
      availableForSale: boolean;
      price: { amount: string };
      compareAtPrice: { amount: string } | null;
    }[];
  };
};

export async function fetchShopifyProducts(): Promise<ShopifyProductNode[]> {
  const all: ShopifyProductNode[] = [];
  let cursor: string | null = null;

  // A Shopify lapokban adja vissza a termékeket
  for (let page = 0; page < 20; page++) {
    const data: { products: { pageInfo: { hasNextPage: boolean; endCursor: string }; nodes: ShopifyProductNode[] } } =
      await shopifyFetch(PRODUCTS_QUERY, { cursor });
    all.push(...data.products.nodes);
    if (!data.products.pageInfo.hasNextPage) break;
    cursor = data.products.pageInfo.endCursor;
  }

  return all;
}

/* ------------------------------------------------------------------ */
/* Kosár és fizetés                                                    */
/* ------------------------------------------------------------------ */

const CART_CREATE = `
  mutation KosarLetrehozas($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart { checkoutUrl }
      userErrors { message }
    }
  }
`;

/**
 * Létrehoz egy Shopify kosarat a megadott tételekkel, és visszaadja a
 * fizetési oldal címét, ahová a vásárlót át kell irányítani.
 */
export async function createShopifyCheckout(
  lines: { variantId: string; quantity: number }[]
): Promise<string> {
  const data = await shopifyFetch<{
    cartCreate: { cart: { checkoutUrl: string } | null; userErrors: { message: string }[] };
  }>(CART_CREATE, {
    lines: lines.map((line) => ({ merchandiseId: line.variantId, quantity: line.quantity })),
  });

  if (data.cartCreate.userErrors?.length) {
    throw new Error(data.cartCreate.userErrors.map((e) => e.message).join("; "));
  }
  if (!data.cartCreate.cart?.checkoutUrl) {
    throw new Error("A Shopify nem adott vissza fizetési címet.");
  }
  return data.cartCreate.cart.checkoutUrl;
}
