/**
 * Termékkategóriák.
 *
 * A kategóriák leírásai a brosúrából származnak, a `sourcePath` pedig a
 * lobelle.hu megfelelő kategóriaoldalára mutat — ebből dolgozik az
 * `npm run scrape` parancs, amikor letölti a valós termékeket.
 */

export type ProductCategory = {
  slug: string;
  /** Teljes név a navigációban */
  name: string;
  /** Rövid név a kártyákon */
  shortName: string;
  /** Oldalcím */
  title: string;
  /** Egymondatos leírás a brosúrából */
  description: string;
  /** Bővebb kategórialeírás */
  longDescription: string;
  /** A megfelelő kategória útvonala a lobelle.hu oldalon (a letöltő szkripthez) */
  sourcePath: string;
};

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    slug: "standard-ekszerek",
    name: "Standard ékszerek korosztály nélkül",
    shortName: "Standard ékszerek",
    title: "Standard ékszerek",
    description: "Korosztály nélkül — letisztult formák minden napra.",
    longDescription:
      "Implantátum minőségű, ASTM F136 szabványú Grade 23 titánból készült fülbevalók, amelyeket korosztálytól függetlenül bárki biztonsággal viselhet. Teljesen nikkelmentesek, nem oxidálódnak és nem színeződnek el — a rendkívül vékony szár és a lekerekített hátsó kapocs pedig a mindennapi viseletet is kényelmessé teszi.",
    sourcePath: "/Standard-ekszerek-korosztaly-nelkul",
  },
  {
    slug: "gyerek-ekszerek",
    name: "Gyerek ékszerek",
    shortName: "Gyerek ékszerek",
    title: "Gyerek ékszerek",
    description: "Játékos, mégis elegáns darabok a legkisebbeknek.",
    longDescription:
      "Gyerekeknek tervezett titánium fülbevalók: játékos formák, biztonságos, lekerekített hátsó kapocs, amely alvás közben sem szúr. A nikkelmentes, biokompatibilis anyag az érzékeny gyerekbőrnek is kíméletes — a szülő nyugalma pedig nem extra, hanem alapfelszereltség.",
    sourcePath: "/Gyerek-ekszerek",
  },
  {
    slug: "baba-ekszerek",
    name: "Baba ékszerek dobozzal együtt",
    shortName: "Baba ékszerek",
    title: "Baba ékszerek díszdobozzal",
    description: "Elegáns díszdobozzal — ajándéknak is tökéletes.",
    longDescription:
      "Az első fülbevaló egyszeri alkalom — ehhez méltó kivitelben kínáljuk. Minden baba ékszer elegáns díszdobozban érkezik, így ajándéknak is tökéletes. A rendkívül vékony titánium szár kíméletes lyukasztást tesz lehetővé, a lekerekített kapocs pedig a legkisebbeknek is kényelmes.",
    sourcePath: "/Baba-ekszerek-dobozzal-egyutt",
  },
  {
    slug: "orr-piercingek",
    name: "Orr piercingek",
    shortName: "Orr piercingek",
    title: "Orr piercingek",
    description: "Precíz, kíméletes titánium orrékszerek.",
    longDescription:
      "Titánium orrékszerek, amelyek ugyanabból az implantátum minőségű alapanyagból készülnek, mint a fülbevalóink. A biokompatibilis, nikkelmentes titán gyorsabb gyógyulást és kevesebb irritációt jelent — pontosan ott, ahol a bőr a legérzékenyebb.",
    sourcePath: "/Orr-piercingek",
  },
  {
    slug: "kellekek-eszkozok",
    name: "Kellékek, eszközök",
    shortName: "Kellékek, eszközök",
    title: "Kellékek és eszközök",
    description: "Utóápolók, csipeszek és minden, ami a munkához kell.",
    longDescription:
      "Minden, ami a professzionális munkához kell: utóápoló oldatok, speciális eltávolító csipeszek, sebészeti jelölőtollak, fertőtlenítők és gyakorló kellékek. Ugyanazzal az igényességgel válogatva, mint az ékszereink — mert a prémium szolgáltatás a részleteken múlik.",
    sourcePath: "/Kellekek-eszkozok",
  },
  {
    slug: "ful-es-orrlyukaszto-keszulek",
    name: "Fül- és orrlyukasztó készülék",
    shortName: "Lyukasztó készülék",
    title: "Fül- és orrlyukasztó készülék",
    description: "A Lobelle-rendszer szíve: professzionális készülék.",
    longDescription:
      "A Lobelle-rendszer szíve: professzionális fül- és orrlyukasztó készülék, amelyet kifejezetten a rendkívül vékony titánium ékszereinkhez terveztek. A precíz mechanika kíméletes, alig érezhető lyukasztást tesz lehetővé — babáknál és felnőtteknél egyaránt.",
    sourcePath: "/Ful-es-orrlyukaszto-keszulek",
  },
];

export function getCategory(slug: string): ProductCategory | undefined {
  return PRODUCT_CATEGORIES.find((c) => c.slug === slug);
}
