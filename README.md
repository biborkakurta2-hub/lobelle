# Lobelle – Titan Ear Piercing Technologies

A Lobelle (titánium fülbelövő rendszerek és füllyukasztó szakemberképzés) weboldala,
a márka brosúrájának dizájnja és tartalma alapján.

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** — a brosúra dizájn tokenjeivel (bronz `#C07F3F`, krém `#FAF7F2`)
- **Google Fonts** `next/font`-tal: Lora (címek) + Poppins (szövegtörzs)
- Teljesen statikus generálás (SSG), Vercelre külön beállítás nélkül deployolható

## Futtatás

```bash
npm install
npm run dev      # fejlesztői szerver: http://localhost:3000
npm run build    # produkciós build (minden oldal statikus)
```

## Oldaltérkép

| Útvonal | Oldal |
| --- | --- |
| `/` | Főoldal (hero, pillérek, titánium előnyök, ASTM sáv, kollekció, képzés teaser, hírlevél) |
| `/termekek/standard-ekszerek` | Standard ékszerek korosztály nélkül |
| `/termekek/gyerek-ekszerek` | Gyerek ékszerek |
| `/termekek/baba-ekszerek` | Baba ékszerek dobozzal együtt |
| `/termekek/orr-piercingek` | Orr piercingek |
| `/termekek/kellekek-eszkozok` | Kellékek, eszközök |
| `/termekek/ful-es-orrlyukaszto-keszulek` | Fül- és orrlyukasztó készülék |
| `/kepzes` | Képzés leírása |
| `/kepzes/privat-oktatas` | Privát oktatás + érdeklődő űrlap |
| `/kepzes/idopontok` | Képzés időpontok, helyszínek |
| `/kepzes/szakembereknek` | Már füllyukasztó szakember vagyok + regisztrációs űrlap |
| `/rolunk` | Rólunk |
| `/miert-a-lobelle` | Miért a Lobelle? (négy pillér) |
| `/eletkepek` | Életképek (galéria) |
| `/gyakori-kerdesek` | Gyakori kérdések (accordion) |
| `/kapcsolat` | Kapcsolatfelvétel |
| `/termekek/<kategória>/<termék>` | Termékoldal (galéria, ár, kosárba tétel) |
| `/kosar` | Kosár és megrendelés |

## Webshop — termékek betöltése

A webshop (kategória-rács, termékoldal, kosár, megrendelés) készen áll; a termékadatok a
`data/products.json` fájlból jönnek. Ez a fájl induláskor üres, ezért a kategóriaoldalak
„feltöltés alatt" állapotot mutatnak — kitalált termék vagy ár sehol nem jelenik meg.

### Termékek letöltése a lobelle.hu oldalról

```bash
npm run scrape                             # minden kategória, képekkel együtt
npm run scrape -- --category gyerek-ekszerek   # csak egy kategória
npm run scrape -- --no-images              # csak nevek, árak, leírások
npm run scrape -- --no-details             # gyorsabb: csak a listaoldalak
```

A szkript végigjárja a `lib/products.ts`-ben megadott kategóriák (`sourcePath`) oldalait,
lapoz az `?infinite_page=N` paraméterrel, kiolvassa a terméknevet, árat, leírást és
cikkszámot (elsődlegesen a JSON-LD adatokból, ennek hiányában a HTML szerkezetéből),
letölti a fotókat a `public/termekek/<kategória>/` mappába, és feltölti a
`data/products.json` fájlt. Futtatás után `npm run build`, majd commit és push.

Ha a szkript nem talál terméket, a lobelle.hu HTML-szerkezete eltér a vártól — ilyenkor a
`scripts/scrape-lobelle.mjs` `CARD_SELECTORS` listája igazítandó a tényleges osztálynevekhez.

### Shopify-integráció

Az adatréteg egy helyen van: `lib/shop.ts`. Shopify esetén a `getProductsByCategory` és a
`getProduct` függvényt kell a Shopify Storefront API hívásaira cserélni (build időben
lekérve, így az oldal statikus maradhat). A kosár (`components/CartProvider.tsx`) a Shopify
cart API-jára, a megrendelő űrlap (`components/CartView.tsx`) pedig a Shopify checkout
átirányítására cserélhető. A `next.config.mjs` már engedélyezi a `cdn.shopify.com` képeket.

## Élesítés előtt cserélendő placeholderek

1. **Logó** — a brosúrából kinyert, átlátszó hátterű logó (`/public/logo.png` és
   `/public/logo-mark.png`) már éles; ha nagyobb felbontású mesterfájl érkezik, elég a két
   PNG-t lecserélni.
2. **Formspree végpont** — `lib/forms.ts`: a `FORMSPREE_ENDPOINT` placeholder helyére a valós
   Formspree űrlap URL-je kerül (amíg placeholder, az űrlapok — a megrendelés is — nem
   küldenek hálózati kérést, csak visszaigazolnak).
3. **Termékek, árak, fotók** — az `npm run scrape` tölti be őket (lásd feljebb). Az Életképek
   galéria fotói külön cserélendők.
4. **Képzési időpontok** — `app/kepzes/idopontok/page.tsx`: a `SESSIONS` tömb placeholder
   városokat és „egyeztetés alatt" időpontokat tartalmaz.
5. **Jogi oldalak** — a lábléc ÁSZF / Adatkezelési tájékoztató / Elállási tájékoztató linkjei
   jelenleg a kapcsolat oldalra mutatnak; a végleges dokumentumok oldalaira irányítandók.
   Webshop üzemeltetéséhez ezek kötelezők.
6. **Közösségi linkek** — a Facebook / Instagram URL-ek (`facebook.com/lobelle.hu`,
   `instagram.com/lobelle.hu`) ellenőrizendők, szükség esetén a valós profilokra cserélendők.
7. **Open Graph kép** — érdemes feltölteni egy `og-image` fájlt és beállítani az
   `app/layout.tsx` metadata blokkjában.
