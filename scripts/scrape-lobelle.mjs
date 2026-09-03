#!/usr/bin/env node
/**
 * Termékletöltő a lobelle.hu oldalról.
 *
 * Használat (a projekt gyökeréből):
 *
 *   npm run scrape                          – minden kategória, képekkel együtt
 *   npm run scrape -- --category gyerek-ekszerek
 *   npm run scrape -- --no-images           – csak nevek, árak, leírások
 *   npm run scrape -- --no-details          – gyorsabb: csak a listaoldalak
 *
 * Eredmény:
 *   data/products.json          – a webshop termékadatai
 *   public/termekek/<kat>/...   – a letöltött termékfotók
 *
 * A szkript a lobelle.hu nyilvános oldalait olvassa. A kategóriák és azok
 * forrás-útvonalai a lib/products.ts fájlban vannak (sourcePath mező).
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join, extname } from "node:path";
import { fileURLToPath } from "node:url";
import * as cheerio from "cheerio";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
/** A forrásoldal — teszteléshez vagy domainváltáskor felülírható: LOBELLE_BASE=... */
const BASE = process.env.LOBELLE_BASE ?? "https://lobelle.hu";
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0 Safari/537.36";

const args = process.argv.slice(2);
const onlyCategory = valueOf("--category");
const withImages = !args.includes("--no-images");
const withDetails = !args.includes("--no-details");
const MAX_PAGES = Number(valueOf("--max-pages") ?? 25);

function valueOf(flag) {
  const i = args.indexOf(flag);
  return i >= 0 ? args[i + 1] : undefined;
}

/* ------------------------------------------------------------------ */
/* Kategóriák beolvasása a lib/products.ts fájlból                      */
/* ------------------------------------------------------------------ */

function readCategories() {
  const src = readFileSync(join(ROOT, "lib/products.ts"), "utf8");
  const cats = [];
  const blocks = src.split(/\{\s*\n\s*slug:/).slice(1);
  for (const block of blocks) {
    const slug = block.match(/^\s*"([^"]+)"/)?.[1];
    const sourcePath = block.match(/sourcePath:\s*"([^"]+)"/)?.[1];
    if (slug && sourcePath) cats.push({ slug, sourcePath });
  }
  return cats;
}

/* ------------------------------------------------------------------ */
/* Segédfüggvények                                                      */
/* ------------------------------------------------------------------ */

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchHtml(url, attempt = 1) {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA, "Accept-Language": "hu-HU,hu;q=0.9" },
      redirect: "follow",
    });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`HTTP ${res.status}`);
    }
    return await res.text();
  } catch (err) {
    if (attempt < 3) {
      await sleep(attempt * 1500);
      return fetchHtml(url, attempt + 1);
    }
    console.warn(`   ! nem sikerült letölteni: ${url} (${err.message})`);
    return null;
  }
}

function slugify(text) {
  const map = { á: "a", é: "e", í: "i", ó: "o", ö: "o", ő: "o", ú: "u", ü: "u", ű: "u" };
  return String(text)
    .toLowerCase()
    .replace(/[áéíóöőúüű]/g, (c) => map[c] ?? c)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** "4 990 Ft", "4.990,- Ft", "12 500&nbsp;Ft" -> 4990 */
function parsePrice(text) {
  if (!text) return null;
  const cleaned = String(text).replace(/ /g, " ");
  const match = cleaned.match(/(\d[\d\s.,]*)\s*(?:Ft|HUF)/i) ?? cleaned.match(/(\d[\d\s.]{2,})/);
  if (!match) return null;
  const digits = match[1].replace(/[^\d]/g, "");
  if (!digits) return null;
  const value = Number(digits);
  return Number.isFinite(value) && value > 0 ? value : null;
}

function absolute(url) {
  if (!url) return null;
  if (url.startsWith("//")) return "https:" + url;
  if (url.startsWith("http")) return url;
  return BASE + (url.startsWith("/") ? url : "/" + url);
}

/** Nagyobb változat kérése a webshop thumbnail URL-jéből, ha felismerhető minta */
function preferLargeImage(url) {
  if (!url) return url;
  return url
    .replace(/\/(\d{2,3})x(\d{2,3})\//, "/1000x1000/")
    .replace(/_(\d{2,3})x(\d{2,3})\./, ".")
    .replace(/[?&](width|w)=\d+/gi, "");
}

/* ------------------------------------------------------------------ */
/* Termékek kinyerése egy listaoldalról                                 */
/* ------------------------------------------------------------------ */

function extractFromJsonLd($) {
  const found = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    let json;
    try {
      json = JSON.parse($(el).contents().text().trim());
    } catch {
      return;
    }
    const walk = (node) => {
      if (!node || typeof node !== "object") return;
      if (Array.isArray(node)) return node.forEach(walk);
      const type = node["@type"];
      const types = Array.isArray(type) ? type : [type];
      if (types.includes("Product")) {
        const offers = Array.isArray(node.offers) ? node.offers[0] : node.offers;
        found.push({
          name: String(node.name ?? "").trim(),
          price: parsePrice(offers?.price ?? offers?.lowPrice ?? null),
          image: absolute(
            Array.isArray(node.image) ? node.image[0] : typeof node.image === "string" ? node.image : null
          ),
          url: absolute(node.url ?? node["@id"] ?? null),
          sku: node.sku ? String(node.sku) : undefined,
          description: node.description ? String(node.description).trim() : undefined,
          inStock: offers?.availability ? !/OutOfStock/i.test(offers.availability) : undefined,
        });
      }
      Object.values(node).forEach(walk);
    };
    walk(json);
  });
  return found.filter((p) => p.name);
}

const CARD_SELECTORS = [
  "[data-product-id]",
  ".product-card",
  ".product-item",
  ".product-wrapper",
  ".product-box",
  ".product",
  "li.product",
  ".products .item",
  "article.product",
];

function extractFromMarkup($) {
  let cards = $();
  for (const sel of CARD_SELECTORS) {
    const found = $(sel);
    if (found.length > cards.length) cards = found;
  }
  if (!cards.length) return [];

  const products = [];
  cards.each((_, el) => {
    const $card = $(el);

    const $link = $card
      .find("a[href]")
      .filter((_, a) => {
        const href = $(a).attr("href") ?? "";
        return href.length > 1 && !href.startsWith("#") && !/javascript:/i.test(href);
      })
      .first();
    const url = absolute($link.attr("href"));

    let name =
      $card.find(".product-name, .name, h2, h3, h4").first().text().trim() ||
      $link.attr("title")?.trim() ||
      $card.find("img").first().attr("alt")?.trim() ||
      $link.text().trim();
    name = name.replace(/\s+/g, " ").trim();

    const priceText =
      $card.find(".product-price, .price, .price-net, .price-gross, [class*='price']").first().text() ||
      $card.text();
    const price = parsePrice(priceText);

    const $img = $card.find("img").first();
    const image = absolute(
      $img.attr("data-src") ||
        $img.attr("data-original") ||
        $img.attr("data-lazy") ||
        $img.attr("src") ||
        null
    );

    if (name && (url || image)) {
      products.push({ name, price, image, url, inStock: undefined });
    }
  });
  return products;
}

/** Egy termék adatlapjának feldolgozása: több kép, leírás, pontosabb ár */
async function fetchProductDetails(url) {
  const html = await fetchHtml(url);
  if (!html) return null;
  const $ = cheerio.load(html);

  const ld = extractFromJsonLd($)[0];

  const images = new Set();
  if (ld?.image) images.add(ld.image);
  $(
    ".product-image img, .product-gallery img, .gallery img, [class*='product'] img, #product-image img"
  ).each((_, el) => {
    const src = absolute(
      $(el).attr("data-zoom-image") || $(el).attr("data-large") || $(el).attr("data-src") || $(el).attr("src")
    );
    if (src && !/logo|placeholder|sprite|icon|banner/i.test(src)) images.add(preferLargeImage(src));
  });
  $('meta[property="og:image"]').each((_, el) => {
    const src = absolute($(el).attr("content"));
    if (src) images.add(src);
  });

  const description =
    ld?.description ||
    $(".product-description, .description, #description, [class*='description']")
      .first()
      .text()
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 1200) ||
    undefined;

  const price =
    ld?.price ??
    parsePrice($('meta[property="product:price:amount"]').attr("content")) ??
    parsePrice($(".product-price, .price, [class*='price']").first().text());

  const name =
    ld?.name ||
    $("h1").first().text().replace(/\s+/g, " ").trim() ||
    $('meta[property="og:title"]').attr("content")?.trim();

  return {
    name,
    price,
    description,
    sku: ld?.sku,
    inStock: ld?.inStock,
    images: [...images].slice(0, 6),
  };
}

/* ------------------------------------------------------------------ */
/* Képletöltés                                                          */
/* ------------------------------------------------------------------ */

async function downloadImage(url, targetPath) {
  if (existsSync(join(ROOT, "public", targetPath))) return targetPath;
  try {
    const res = await fetch(url, { headers: { "User-Agent": UA, Referer: BASE } });
    if (!res.ok) return null;
    const buffer = Buffer.from(await res.arrayBuffer());
    if (buffer.length < 1024) return null; // túl kicsi: valószínűleg hibaoldal
    const full = join(ROOT, "public", targetPath);
    mkdirSync(dirname(full), { recursive: true });
    writeFileSync(full, buffer);
    return targetPath;
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ */
/* Fő folyamat                                                          */
/* ------------------------------------------------------------------ */

async function scrapeCategory(category) {
  console.log(`\n▸ ${category.slug}  (${BASE}${category.sourcePath})`);

  const collected = new Map();

  for (let page = 1; page <= MAX_PAGES; page++) {
    const url =
      page === 1 ? BASE + category.sourcePath : `${BASE}${category.sourcePath}?infinite_page=${page}`;
    const html = await fetchHtml(url);
    if (!html) break;

    const $ = cheerio.load(html);
    let items = extractFromJsonLd($);
    if (items.length === 0) items = extractFromMarkup($);

    const fresh = items.filter((item) => {
      const key = item.url ?? item.name;
      if (!key || collected.has(key)) return false;
      collected.set(key, item);
      return true;
    });

    console.log(`   ${page}. oldal: ${items.length} találat, ebből új: ${fresh.length}`);
    if (fresh.length === 0) break;
    await sleep(700);
  }

  const products = [];
  const usedSlugs = new Set();
  let index = 0;

  for (const item of collected.values()) {
    index += 1;
    let detail = null;
    if (withDetails && item.url) {
      detail = await fetchProductDetails(item.url);
      await sleep(500);
    }

    const name = (detail?.name || item.name || "").replace(/\s+/g, " ").trim();
    if (!name) continue;

    // Egyedi slug: azonos nevű termékeknél -2, -3 utótag
    let slug = slugify(name) || `termek-${index}`;
    if (usedSlugs.has(slug)) {
      let n = 2;
      while (usedSlugs.has(`${slug}-${n}`)) n += 1;
      slug = `${slug}-${n}`;
    }
    usedSlugs.add(slug);

    const price = detail?.price ?? item.price ?? null;

    const sourceImages = detail?.images?.length
      ? detail.images
      : item.image
        ? [preferLargeImage(item.image)]
        : [];

    let images = [];
    if (withImages && sourceImages.length) {
      for (const src of sourceImages) {
        let ext = ".jpg";
        try {
          ext = (extname(new URL(src).pathname) || ".jpg").split("?")[0].slice(0, 5);
        } catch {
          continue; // értelmezhetetlen kép-URL: kihagyjuk
        }
        // A sorszám a ténylegesen elmentett képeket követi, nem a forráslistát
        const position = images.length + 1;
        const target = `/termekek/${category.slug}/${slug}${position > 1 ? `-${position}` : ""}${ext}`;
        const saved = await downloadImage(src, target);
        if (saved) images.push(saved);
      }
    } else {
      images = sourceImages;
    }

    products.push({
      // Kategórián belül garantáltan egyedi — a SKU hiányozhat vagy ismétlődhet
      id: `${category.slug}/${slug}`,
      slug,
      name,
      price,
      images,
      category: category.slug,
      description: detail?.description ?? item.description,
      sku: detail?.sku ?? item.sku,
      inStock: detail?.inStock ?? item.inStock ?? true,
      sourceUrl: item.url ?? undefined,
    });

    const priceLabel = price ? `${price} Ft` : "ár nélkül";
    console.log(`   · ${name} — ${priceLabel}${images.length ? `, ${images.length} kép` : ", kép nélkül"}`);
  }

  return products;
}

async function main() {
  const categories = readCategories().filter((c) => !onlyCategory || c.slug === onlyCategory);
  if (categories.length === 0) {
    console.error(`Nincs ilyen kategória: ${onlyCategory}`);
    process.exit(1);
  }

  console.log(`Lobelle termékletöltés — ${categories.length} kategória`);
  console.log(`Képek letöltése: ${withImages ? "igen" : "nem"} · Adatlapok: ${withDetails ? "igen" : "nem"}`);

  const all = [];
  for (const category of categories) {
    try {
      all.push(...(await scrapeCategory(category)));
    } catch (err) {
      console.error(`   ! hiba a(z) ${category.slug} kategóriánál: ${err.message}`);
    }
  }

  // Ha csak egy kategóriát frissítettünk, a többi megmarad
  const outPath = join(ROOT, "data/products.json");
  let previous = [];
  if (onlyCategory && existsSync(outPath)) {
    try {
      previous = JSON.parse(readFileSync(outPath, "utf8")).products ?? [];
      previous = previous.filter((p) => p.category !== onlyCategory);
    } catch {
      previous = [];
    }
  }

  const products = [...previous, ...all];
  writeFileSync(
    outPath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        source: BASE,
        products,
      },
      null,
      2
    ) + "\n"
  );

  const withPrice = products.filter((p) => p.price).length;
  const withImage = products.filter((p) => p.images.length).length;
  console.log(`\nKész: ${products.length} termék mentve a data/products.json fájlba`);
  console.log(`   árral: ${withPrice} · képpel: ${withImage}`);
  if (products.length === 0) {
    console.log("\nHa nem talált terméket, valószínűleg más a HTML szerkezete.");
    console.log("Mentsd el a kategóriaoldalt HTML-ként, és küldd el — a szkript ahhoz igazítható.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
