#!/usr/bin/env node
/**
 * Shopify-kapcsolat ellenőrzése.
 *
 *   npm run shopify:check
 *
 * Megmondja, hogy a bolt elérhető-e, hány termék jön át, mindegyik
 * bekerül-e valamelyik kategóriába, és hogy a fizetés létrejön-e.
 * A beállításokat a .env.local fájlból vagy a környezeti változókból olvassa.
 */

import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const API_VERSION = "2024-10";

/* A hat kategória — a lib/products.ts-ből kiolvasva, hogy ne csússzon szét */
function readCategories() {
  const src = readFileSync(join(ROOT, "lib/products.ts"), "utf8");
  const slugs = [...src.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
  const names = [...src.matchAll(/name:\s*"([^"]+)"/g)].map((m) => m[1]);
  return slugs.map((slug, i) => ({ slug, name: names[i] ?? slug }));
}

function loadEnv() {
  const file = join(ROOT, ".env.local");
  if (existsSync(file)) {
    for (const line of readFileSync(file, "utf8").split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) {
        process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
      }
    }
  }
  return {
    domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? "",
    token: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN ?? "",
  };
}

async function gql(domain, token, query, variables = {}) {
  const res = await fetch(`https://${domain}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} — ${res.statusText}`);
  const json = await res.json();
  if (json.errors?.length) throw new Error(json.errors.map((e) => e.message).join("; "));
  return json.data;
}

const PRODUCTS = `
  query($cursor: String) {
    shop { name }
    products(first: 100, after: $cursor) {
      pageInfo { hasNextPage endCursor }
      nodes {
        handle title tags availableForSale
        images(first: 3) { nodes { url width height } }
        collections(first: 10) { nodes { handle title } }
        variants(first: 1) { nodes { id sku availableForSale price { amount currencyCode } } }
      }
    }
  }
`;

const CART = `
  mutation($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart { checkoutUrl }
      userErrors { message }
    }
  }
`;

async function main() {
  const { domain, token } = loadEnv();
  console.log("Shopify-kapcsolat ellenőrzése\n");

  if (!domain || !token) {
    console.log("  A beállítások hiányoznak.");
    console.log("  Hozz létre egy .env.local fájlt a .env.example alapján,");
    console.log("  és töltsd ki a bolt címét és a Storefront tokent.");
    process.exitCode = 1;
    return;
  }
  console.log(`  Bolt: ${domain}`);

  const categories = readCategories();
  const bySlug = new Set(categories.map((c) => c.slug));
  const byName = new Map(categories.map((c) => [c.name.toLowerCase(), c.slug]));

  const resolve = (collections, tags) => {
    for (const c of collections) {
      if (bySlug.has(c.handle)) return c.handle;
      const t = byName.get(c.title.toLowerCase());
      if (t) return t;
    }
    for (const tag of tags) {
      const t = byName.get(tag.toLowerCase());
      if (t) return t;
      if (bySlug.has(tag)) return tag;
    }
    return null;
  };

  let cursor = null;
  const all = [];
  let shopName = "";
  for (let page = 0; page < 20; page++) {
    const data = await gql(domain, token, PRODUCTS, { cursor });
    shopName ||= data.shop?.name ?? "";
    all.push(...data.products.nodes);
    if (!data.products.pageInfo.hasNextPage) break;
    cursor = data.products.pageInfo.endCursor;
  }

  console.log(`  Bolt neve: ${shopName}`);
  console.log(`  Termék a Shopifyban: ${all.length}\n`);

  const counts = new Map(categories.map((c) => [c.slug, 0]));
  const orphans = [];
  let noImage = 0;
  let noPrice = 0;
  let notForSale = 0;

  for (const p of all) {
    const cat = resolve(p.collections.nodes, p.tags);
    if (cat) counts.set(cat, counts.get(cat) + 1);
    else orphans.push(p.title);
    if (p.images.nodes.length === 0) noImage++;
    const v = p.variants.nodes[0];
    if (!v?.price?.amount || Number(v.price.amount) <= 0) noPrice++;
    if (!(v?.availableForSale ?? p.availableForSale)) notForSale++;
  }

  console.log("  Kategóriák:");
  for (const c of categories) {
    const n = counts.get(c.slug);
    console.log(`    ${n > 0 ? "rendben" : "ÜRES   "}  ${String(n).padStart(3)}  ${c.name}`);
  }

  const shown = all.length - orphans.length;
  console.log(`\n  Az oldalon megjelenik: ${shown} / ${all.length}`);

  if (orphans.length) {
    console.log(`\n  ${orphans.length} termék egyik kategóriába sem kerül be —`);
    console.log("  ezek NEM jelennek meg az oldalon. Adj nekik kategóriacímkét:");
    for (const t of orphans.slice(0, 10)) console.log(`    - ${t}`);
    if (orphans.length > 10) console.log(`    ... és még ${orphans.length - 10}`);
  }
  if (noImage) console.log(`\n  Kép nélküli termék: ${noImage}`);
  if (noPrice) console.log(`  Ár nélküli termék: ${noPrice}`);
  if (notForSale) console.log(`  Nem megvásárolható termék: ${notForSale}`);

  // Fizetés próbája az első megvásárolható termékkel
  const buyable = all.find((p) => p.variants.nodes[0]?.id);
  if (buyable) {
    const variantId = buyable.variants.nodes[0].id;
    try {
      const data = await gql(domain, token, CART, { lines: [{ merchandiseId: variantId, quantity: 1 }] });
      const err = data.cartCreate.userErrors?.[0]?.message;
      const url = data.cartCreate.cart?.checkoutUrl;
      if (url) {
        console.log(`\n  Fizetés: működik`);
        console.log(`  Próbakosár: ${url}`);
      } else {
        console.log(`\n  Fizetés: NEM működik — ${err ?? "nem jött vissza fizetési cím"}`);
      }
    } catch (e) {
      console.log(`\n  Fizetés: NEM működik — ${e.message}`);
    }
  }

  const gond = orphans.length > 0 || shown === 0;
  console.log(`\n  ${gond ? "Van mit javítani, lásd fent." : "Minden rendben, mehet élesbe."}`);
  if (shown === 0) process.exitCode = 1;
}

main().catch((e) => {
  console.error("\n  Hiba:", e.message);
  console.error("\n  Ellenőrizd a bolt címét és a tokent, valamint hogy a Storefront API");
  console.error("  jogosultságok között engedélyezve van a termékek olvasása.");
  process.exitCode = 1;
});
