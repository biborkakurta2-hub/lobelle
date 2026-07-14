/**
 * Termékkategóriák és placeholder termékek.
 *
 * WEBSHOP-INTEGRÁCIÓ: később ide köthető be a webshop motor vagy a Shopify
 * Storefront API — a kategória- és terméklista lecserélhető API-hívásra
 * (pl. generateStaticParams + fetch a build idején, az SSG megtartásával).
 * A PLACEHOLDER termékek és árak valós adatokra cserélendők.
 */

export type Product = {
  name: string;
  /** PLACEHOLDER ár — valós árra cserélendő */
  price: string;
  note?: string;
};

export type ProductCategory = {
  slug: string;
  name: string;
  shortName: string;
  title: string;
  description: string;
  longDescription: string;
  products: Product[];
};

const placeholderProducts = (names: string[]): Product[] =>
  names.map((name) => ({ name, price: "Ár feltöltés alatt" }));

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    slug: "standard-ekszerek",
    name: "Standard ékszerek korosztály nélkül",
    shortName: "Standard ékszerek",
    title: "Standard ékszerek",
    description: "Korosztály nélkül — letisztult formák minden napra.",
    longDescription:
      "Implantátum minőségű, ASTM F136 szabványú Grade 23 titánból készült fülbevalók, amelyeket korosztálytól függetlenül bárki biztonsággal viselhet. Teljesen nikkelmentesek, nem oxidálódnak és nem színeződnek el — a rendkívül vékony szár és a lekerekített hátsó kapocs pedig a mindennapi viseletet is kényelmessé teszi.",
    products: placeholderProducts([
      "Titánium golyós fülbevaló",
      "Titánium kristályköves fülbevaló",
      "Titánium csillag fülbevaló",
      "Titánium szív fülbevaló",
      "Titánium karika fülbevaló",
      "Titánium gyöngyházfényű fülbevaló",
    ]),
  },
  {
    slug: "gyerek-ekszerek",
    name: "Gyerek ékszerek",
    shortName: "Gyerek ékszerek",
    title: "Gyerek ékszerek",
    description: "Játékos, mégis elegáns darabok a legkisebbeknek.",
    longDescription:
      "Gyerekeknek tervezett titánium fülbevalók: játékos formák, biztonságos, lekerekített hátsó kapocs, amely alvás közben sem szúr. A nikkelmentes, biokompatibilis anyag az érzékeny gyerekbőrnek is kíméletes — a szülő nyugalma pedig nem extra, hanem alapfelszereltség.",
    products: placeholderProducts([
      "Titánium pillangó fülbevaló",
      "Titánium virág fülbevaló",
      "Titánium szívecske fülbevaló",
      "Titánium csillag fülbevaló gyerekeknek",
      "Titánium katica fülbevaló",
      "Titánium színes köves fülbevaló",
    ]),
  },
  {
    slug: "baba-ekszerek",
    name: "Baba ékszerek dobozzal együtt",
    shortName: "Baba ékszerek",
    title: "Baba ékszerek díszdobozzal",
    description: "Elegáns díszdobozzal — ajándéknak is tökéletes.",
    longDescription:
      "Az első fülbevaló egyszeri alkalom — ehhez méltó kivitelben kínáljuk. Minden baba ékszer elegáns díszdobozban érkezik, így ajándéknak is tökéletes. A rendkívül vékony titánium szár kíméletes lyukasztást tesz lehetővé, a lekerekített kapocs pedig a legkisebbeknek is kényelmes.",
    products: placeholderProducts([
      "Baba szett golyós fülbevalóval és díszdobozzal",
      "Baba szett kristályköves fülbevalóval és díszdobozzal",
      "Baba szett szíves fülbevalóval és díszdobozzal",
      "Baba szett virágos fülbevalóval és díszdobozzal",
      "Baba szett csillagos fülbevalóval és díszdobozzal",
      "Baba szett gyöngyös fülbevalóval és díszdobozzal",
    ]),
  },
  {
    slug: "orr-piercingek",
    name: "Orr piercingek",
    shortName: "Orr piercingek",
    title: "Orr piercingek",
    description: "Precíz, kíméletes titánium orrékszerek.",
    longDescription:
      "Titánium orrékszerek, amelyek ugyanabból az implantátum minőségű alapanyagból készülnek, mint a fülbevalóink. A biokompatibilis, nikkelmentes titán gyorsabb gyógyulást és kevesebb irritációt jelent — pontosan ott, ahol a bőr a legérzékenyebb.",
    products: placeholderProducts([
      "Titánium orr stud golyós véggel",
      "Titánium orr stud kristályköves véggel",
      "Titánium orrkarika",
      "Titánium L-szárú orrékszer",
      "Titánium csavart szárú orrékszer",
      "Titánium orrékszer szett",
    ]),
  },
  {
    slug: "kellekek-eszkozok",
    name: "Kellékek, eszközök",
    shortName: "Kellékek, eszközök",
    title: "Kellékek és eszközök",
    description: "Utóápolók, csipeszek és minden, ami a munkához kell.",
    longDescription:
      "Minden, ami a professzionális munkához kell: utóápoló oldatok, speciális eltávolító csipeszek, sebészeti jelölőtollak, fertőtlenítők és gyakorló kellékek. Ugyanazzal az igényességgel válogatva, mint az ékszereink — mert a prémium szolgáltatás a részleteken múlik.",
    products: placeholderProducts([
      "Utóápoló oldat",
      "Speciális eltávolító csipesz",
      "Sebészeti jelölőtoll",
      "Fertőtlenítő kendő",
      "Gyakorló fül szúrási gyakorlathoz",
      "Hozzájárulási nyilatkozat tömb",
    ]),
  },
  {
    slug: "ful-es-orrlyukaszto-keszulek",
    name: "Fül- és orrlyukasztó készülék",
    shortName: "Lyukasztó készülék",
    title: "Fül- és orrlyukasztó készülék",
    description: "A Lobelle-rendszer szíve: professzionális készülék.",
    longDescription:
      "A Lobelle-rendszer szíve: professzionális fül- és orrlyukasztó készülék, amelyet kifejezetten a rendkívül vékony titánium ékszereinkhez terveztek. A precíz mechanika kíméletes, alig érezhető lyukasztást tesz lehetővé — babáknál és felnőtteknél egyaránt.",
    products: placeholderProducts([
      "Lobelle professzionális füllyukasztó készülék",
      "Lobelle professzionális orrlyukasztó készülék",
      "Készülék szett hordtáskával",
      "Tartalék rugós egység",
      "Készülék fertőtlenítő állvány",
      "Kezdő készülékcsomag",
    ]),
  },
];

export function getCategory(slug: string): ProductCategory | undefined {
  return PRODUCT_CATEGORIES.find((c) => c.slug === slug);
}
