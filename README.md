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

## Webshop — termékek és Shopify

A webshop (kategória-rács, termékoldal, kosár, megrendelés) két forrásból tud
dolgozni, és magától a megfelelőt választja.

### 1. Jelenlegi állapot: helyi termékadatok

A `data/products.json` fájlban **68 valós termék** van a lobelle.hu-ról letöltve
(nevek, árak, leírások, cikkszámok, 286 fotó a `public/termekek/` mappában).
A rendelés a kosároldali űrlapon, e-mailben érkezik.

Frissítés a lobelle.hu-ról:

```bash
npm run scrape                                  # minden kategória, képekkel
npm run scrape -- --category gyerek-ekszerek    # csak egy kategória
npm run scrape -- --no-images                   # csak nevek, árak, leírások
```

### 2. Shopify a háttérben (bekapcsolható)

Ha megadod a Shopify adatait, a termékek, árak és a készlet onnan jönnek, a
fizetés pedig a Shopify biztonságos oldalán történik (bankkártya, számlázás,
szállítás). **Az oldal megjelenése és felépítése nem változik.**

Lépések:

1. **Shopify bolt** létrehozása és előfizetés.
2. **Termékek feltöltése**: Shopify admin → Termékek → Importálás, és töltsd fel
   a 68 termék CSV-jét (a projekt gyökeréből újra előállítható a scrape adataiból).
   A CSV a kategórianeveket címkeként is tartalmazza — ezek alapján kerülnek a
   termékek a megfelelő kategóriába az oldalon.
3. **Gyűjtemények**: hozz létre hat gyűjteményt a kategóriákhoz. A gyűjtemény
   URL-neve (handle) legyen azonos a `lib/products.ts`-ben lévő slug-gal, vagy a
   címe a kategória nevével — az adatréteg mindkettőt felismeri.
4. **Storefront API token**: Shopify admin → Beállítások → Alkalmazások és
   értékesítési csatornák → Alkalmazásfejlesztés → új alkalmazás → Storefront API.
   Engedélyek: termékek olvasása, készlet olvasása, fizetés létrehozása.
5. **Beállítás**: másold a `.env.example` fájlt `.env.local` néven, és töltsd ki a
   bolt címét és a tokent. Vercelen ugyanezeket a környezeti változókat add meg.
6. `npm run build` — a termékek a build során töltődnek be, így az oldal statikus marad.

Ha a Shopify átmenetileg nem elérhető, vagy a bolt még üres, az oldal
automatikusan a helyi termékadatokra vált vissza, és nem dől el a build.

### Mi hol van a kódban

| Fájl | Szerep |
| --- | --- |
| `lib/shopify.ts` | Shopify Storefront API: termékek lekérése, kosár és fizetés |
| `lib/shop.ts` | Adatréteg: Shopify vagy helyi adat, árformázás |
| `lib/products.ts` | A hat kategória és a lobelle.hu forrás-útvonalaik |
| `scripts/scrape-lobelle.mjs` | Termékletöltő a lobelle.hu-ról |
| `components/CartView.tsx` | Kosár; Shopify fizetés vagy e-mailes rendelés |

## Élesítés előtt cserélendő placeholderek

1. **Logó** — a brosúrából kinyert, átlátszó hátterű logó (`/public/logo.png` és
   `/public/logo-mark.png`) már éles; ha nagyobb felbontású mesterfájl érkezik, elég a két
   PNG-t lecserélni.
2. **Formspree végpont** — `lib/forms.ts`: a `FORMSPREE_ENDPOINT` placeholder helyére a valós
   Formspree űrlap URL-je kerül (amíg placeholder, az űrlapok — a megrendelés is — nem
   küldenek hálózati kérést, csak visszaigazolnak).
3. **Életképek galéria** — a `app/eletkepek/page.tsx` fotói placeholderek, valós képekre
   cserélendők. (A termékfotók már valósak.)
4. **Képzési időpontok** — `app/kepzes/idopontok/page.tsx`: a `SESSIONS` tömb placeholder
   városokat és „egyeztetés alatt" időpontokat tartalmaz.
5. **Jogi oldalak** — a lábléc ÁSZF / Adatkezelési tájékoztató / Elállási tájékoztató linkjei
   jelenleg a kapcsolat oldalra mutatnak; a végleges dokumentumok oldalaira irányítandók.
   Webshop üzemeltetéséhez ezek kötelezők.
6. **Közösségi linkek** — a Facebook / Instagram URL-ek (`facebook.com/lobelle.hu`,
   `instagram.com/lobelle.hu`) ellenőrizendők, szükség esetén a valós profilokra cserélendők.
7. **Open Graph kép** — érdemes feltölteni egy `og-image` fájlt és beállítani az
   `app/layout.tsx` metadata blokkjában.
