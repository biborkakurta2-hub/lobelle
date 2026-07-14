export type NavLink = { label: string; href: string };

export type NavGroup = {
  label: string;
  href?: string;
  items?: NavLink[];
};

export const PHONE = "+36 30 483 3814";
export const PHONE_HREF = "tel:+36304833814";
export const EMAIL = "rendeles@lobelle.hu";
export const ADDRESS = "4031 Debrecen, Széchenyi u. 62. fszt. 26.";

export const NAV: NavGroup[] = [
  {
    label: "Termékek",
    items: [
      { label: "Standard ékszerek korosztály nélkül", href: "/termekek/standard-ekszerek" },
      { label: "Gyerek ékszerek", href: "/termekek/gyerek-ekszerek" },
      { label: "Baba ékszerek dobozzal együtt", href: "/termekek/baba-ekszerek" },
      { label: "Orr piercingek", href: "/termekek/orr-piercingek" },
      { label: "Kellékek, eszközök", href: "/termekek/kellekek-eszkozok" },
      { label: "Fül- és orrlyukasztó készülék", href: "/termekek/ful-es-orrlyukaszto-keszulek" },
    ],
  },
  {
    label: "Képzés",
    items: [
      { label: "Képzés leírása", href: "/kepzes" },
      { label: "Privát oktatás", href: "/kepzes/privat-oktatas" },
      { label: "Képzés időpontok, helyszínek", href: "/kepzes/idopontok" },
      { label: "Már füllyukasztó szakember vagyok", href: "/kepzes/szakembereknek" },
    ],
  },
  {
    label: "Rólunk",
    items: [
      { label: "Rólunk", href: "/rolunk" },
      { label: "Miért a Lobelle?", href: "/miert-a-lobelle" },
      { label: "Életképek", href: "/eletkepek" },
      { label: "Gyakori kérdések", href: "/gyakori-kerdesek" },
    ],
  },
  { label: "Kapcsolat", href: "/kapcsolat" },
];
