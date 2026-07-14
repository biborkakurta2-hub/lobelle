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

## Élesítés előtt cserélendő placeholderek

1. **Logó** — a végleges, átlátszó hátterű bronz logó `/public/logo.png` néven töltendő fel,
   majd a `components/Logo.tsx`-ben jelölt módon `next/image`-re cserélendő az SVG placeholder.
2. **Formspree végpont** — `lib/forms.ts`: a `FORMSPREE_ENDPOINT` placeholder helyére a valós
   Formspree űrlap URL-je kerül (amíg placeholder, az űrlapok nem küldenek hálózati kérést).
3. **Termékfotók** — minden termékkártyán és az Életképek galériában `ImagePlaceholder`
   szerepel; valós fotókra (`next/image`) cserélendők.
4. **Árak** — `lib/products.ts`: minden termék ára „Ár feltöltés alatt" placeholder.
5. **Terméknevek** — `lib/products.ts`: a terméklisták illusztratív placeholderek, a valós
   katalógusra cserélendők (később webshop motor / Shopify API is beköthető, a fájl kommentje
   szerint).
6. **Képzési időpontok** — `app/kepzes/idopontok/page.tsx`: a `SESSIONS` tömb placeholder
   városokat és „egyeztetés alatt" időpontokat tartalmaz.
7. **Jogi oldalak** — a lábléc ÁSZF / Adatkezelési tájékoztató / Elállási tájékoztató linkjei
   jelenleg a kapcsolat oldalra mutatnak; a végleges dokumentumok oldalaira irányítandók.
8. **Közösségi linkek** — a Facebook / Instagram URL-ek (`facebook.com/lobelle.hu`,
   `instagram.com/lobelle.hu`) ellenőrizendők, szükség esetén a valós profilokra cserélendők.
9. **Open Graph kép** — érdemes feltölteni egy `og-image` fájlt és beállítani az
   `app/layout.tsx` metadata blokkjában.
