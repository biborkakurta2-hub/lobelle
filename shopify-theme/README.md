# Lobelle — Shopify téma

A Lobelle brosúrájának dizájnja valódi Shopify témaként (Liquid, Online Store 2.0).
Ez **nem** azonos a repó gyökerében lévő Next.js oldallal — az egy külön, önálló weboldal.

## Telepítés

### 1. lehetőség — ZIP feltöltése (leggyorsabb)

1. Csomagold a téma mappáit ZIP-be úgy, hogy az `assets`, `config`, `layout`, `locales`,
   `sections`, `snippets`, `templates` mappák a ZIP **gyökerében** legyenek.
2. Shopify admin → **Online Store → Themes → Add theme → Upload zip file**
3. Feltöltés után **Customize** a szerkesztéshez, majd **Publish** az élesítéshez.

### 2. lehetőség — GitHub-kapcsolat

A Shopify GitHub-integrációja azt várja, hogy a téma a repó (branch) **gyökerében**
legyen. Ehhez a `shopify-theme` mappa tartalmát egy külön branch gyökerébe kell másolni:

```bash
git checkout --orphan shopify-theme
git rm -rf --cached .
git clean -fd -e shopify-theme
mv shopify-theme/* shopify-theme/.[!.]* . 2>/dev/null; rmdir shopify-theme
git add -A && git commit -m "Shopify téma"
git push -u origin shopify-theme
```

Ezután: Shopify admin → **Online Store → Themes → Add theme → Connect from GitHub**,
válaszd a repót és a `shopify-theme` branchet.

## Beüzemelés a Shopify adminban

A téma a Shopify adatait használja, ezért néhány dolgot be kell állítani:

1. **Téma beállítások** (Customize → Theme settings)
   - Logó: alapból a témába épített Lobelle logó jelenik meg; felülírható saját feltöltéssel.
   - Színek: a brosúra palettája alapértelmezés (bronz `#C07F3F`, krém `#FAF7F2`).
   - Elérhetőségek: telefonszám, e-mail, cím — a fejléc, lábléc és a kapcsolati oldal ezt használja.
   - Közösségi média: Facebook és Instagram URL.

2. **Navigáció** (Bolt adminisztráció → Navigáció)
   Hozz létre egy főmenüt almenükkel — a fejléc lenyílói ezekből épülnek fel:
   - Termékek: a hat kategória
   - Képzés: képzés leírása, privát oktatás, időpontok, szakembereknek
   - Rólunk: rólunk, miért a Lobelle, életképek, gyakori kérdések
   - Kapcsolat

3. **Kategóriák és termékek** (Termékek → Gyűjtemények)
   Vidd fel a hat kategóriát gyűjteményként, majd a termékeket képekkel és árakkal.
   A nyitóoldal „Termékkínálat" szekciójában rendeld hozzá a gyűjteményeket a kártyákhoz.

4. **Oldalak** (Bolt adminisztráció → Oldalak)
   A témában kész sablonok vannak ezekhez — az oldal létrehozásakor válaszd ki a sablont:

   | Oldal | Ajánlott URL | Sablon |
   | --- | --- | --- |
   | Kapcsolat | `kapcsolat` | `page.kapcsolat` |
   | Gyakori kérdések | `gyakori-kerdesek` | `page.gyakori-kerdesek` |
   | Miért a Lobelle? | `miert-a-lobelle` | `page.miert-a-lobelle` |
   | Életképek | `eletkepek` | `page.eletkepek` |
   | Rólunk, Képzés stb. | tetszőleges | `page` (alapértelmezett) |

   Az Életképek galéria képeit a téma szerkesztőjében töltsd fel.

5. **Jogi oldalak** — ÁSZF, Adatkezelési tájékoztató, Elállási tájékoztató. Hozd létre őket
   oldalként, majd add hozzá egy menühöz, és állítsd be a láblécben (Lábléc → Jogi linkek menü).

## Szerkeszthető szekciók

Minden szekció a Shopify téma szerkesztőjében állítható, szöveggel együtt:

| Szekció | Mire való |
| --- | --- |
| Nyitókép | Logó, üdvözlő felirat, főcím, két gomb |
| Pillérek | Biztonság / Innováció / Szakmaiság |
| Előnyök | Titánium előnyök rácsa |
| Kiemelt sáv | Bronz sáv (ASTM F136, FAR-szám) |
| Kategóriarács | A hat kategória kártyái |
| Kiemelt termékek | Termékek egy választott gyűjteményből |
| Képzés ajánló | Kétoszlopos képzésajánló idézetkártyával |
| Számozott pillérek | „Miért a Lobelle?" négy pillére záró idézettel |
| Gyakori kérdések | Accordion |
| Galéria | Életképek |
| Kapcsolati űrlap | Shopify űrlap az elérhetőségekkel |
| Hírlevél | Feliratkozás a Shopify vásárlói listájára |
| Szöveg | Szabad szöveges blokk |
| Hirdetősáv | Felső sáv (üresen hagyva nem jelenik meg) |

## Megjegyzések

- **Betűtípusok:** Lora és Poppins, Google Fontsról betöltve — így pontosan egyezik a brosúra
  tipográfiájával. A Shopify theme-check ezt „remote asset" figyelmeztetéssel jelzi; ez nem hiba.
- **Emoji:** a téma sehol nem használ emojit; ikon helyett vékony vonalas SVG és rombusz (◆).
- **Nyelv:** a felület magyar, az alapértelmezett nyelvi fájl a `locales/hu.default.json`.
- **Ellenőrzés:** a téma a hivatalos `@shopify/theme-check` eszközön 0 hibával megy át.
