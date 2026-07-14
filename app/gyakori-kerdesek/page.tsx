import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import Accordion from "@/components/Accordion";

export const metadata: Metadata = {
  title: "Gyakori kérdések",
  description:
    "Válaszok a leggyakoribb kérdésekre: fáj-e a füllyukasztás, mennyi a gyógyulási idő, mikor lyukasztható a babák füle, miben más a titán, és hogyan foglalhatsz időpontot.",
  openGraph: {
    title: "Gyakori kérdések | Lobelle",
    description: "Válaszok a füllyukasztással kapcsolatos leggyakoribb kérdésekre.",
  },
};

const FAQ_ITEMS = [
  {
    question: "Fáj a füllyukasztás?",
    answer:
      "A Lobelle rendszer rendkívül vékony titánium szárral dolgozik, ezért a lyukasztás alig érezhető — egy rövid, enyhe csípéshez hasonlítható. A professzionális készülék egyetlen gyors mozdulattal végzi el a lyukasztást, így a kellemetlenség a másodperc törtrészéig tart.",
  },
  {
    question: "Mennyi a gyógyulási idő?",
    answer:
      "Fülcimpa esetén a teljes gyógyulás általában 6–8 hét. A titánium biokompatibilis anyaga a tapasztalatok szerint gyorsabb gyógyulást, kevesebb gyulladást és minimális irritációt jelent más fémekhez képest. A gyógyulás ideje alatt az első ékszert javasolt bent hagyni.",
  },
  {
    question: "Hány éves kortól lyukasztható a babák füle?",
    answer:
      "A babafül-lyukasztás a kötelező védőoltások beadása után, jellemzően 3–4 hónapos kortól ajánlott — a pontos időzítésről érdemes a gyermekorvossal is egyeztetni. A Lobelle baba ékszerek lekerekített hátsó kapcsa alvás közben sem szúr, a nikkelmentes titán pedig a legérzékenyebb babákbőrnek is biztonságos.",
  },
  {
    question: "Miben más a titán, mint az orvosi fém?",
    answer:
      "Az „orvosi fém” néven forgalmazott ékszerek többsége sebészeti acél, amely tartalmazhat nikkelt — a leggyakoribb kontakt allergént. Az ASTM F136 szabványú, Grade 23 titán ezzel szemben teljesen nikkelmentes és biokompatibilis: a szervezet sajátjaként fogadja, ezért allergiás reakció gyakorlatilag nem alakul ki.",
  },
  {
    question: "Hogyan ápoljam a friss fül-lyukat?",
    answer:
      "Naponta kétszer tisztítsd a lyukasztás környékét az utóápoló oldattal, előtte moss kezet. Az ékszert a gyógyulás alatt ne vedd ki, és kerüld a felesleges érintését. Uszoda, szauna és állóvíz az első hetekben kerülendő. A képzéseinken és a vásárláskor részletes utóápolási útmutatót is adunk.",
  },
  {
    question: "Mi a helyzet, ha allergiás vagyok a fémekre?",
    answer:
      "Pontosan ilyen esetekre való a titán. A fémallergiák túlnyomó többségét a nikkel okozza — a Lobelle ékszerek ezzel szemben teljesen nikkelmentes, implantátum minőségű titánból készülnek, amelyet orvosi implantátumokhoz is használnak. Ismert, súlyos fémallergia esetén javasolt előzetesen bőrgyógyásszal egyeztetni.",
  },
  {
    question: "Van korhatára a füllyukasztásnak?",
    answer:
      "Felfelé nincs korhatár. 18 év alatt szülői vagy törvényes képviselői beleegyezés szükséges, amelyet írásos hozzájárulási nyilatkozattal rögzítünk — ez a szakembereink munkájának kötelező része. Babáknál a védőoltások beadása után, jellemzően 3–4 hónapos kortól végezhető a lyukasztás.",
  },
  {
    question: "Hogyan foglalhatok időpontot?",
    answer:
      "Hívj minket a +36 30 483 3814-es telefonszámon, írj a rendeles@lobelle.hu címre, vagy használd a kapcsolatfelvételi űrlapunkat. Képzésre a Képzés időpontok, helyszínek oldalon keresztül tudsz jelentkezni.",
  },
  {
    question: "Elmozdulhat vagy kilazulhat az ékszer a gyógyulás alatt?",
    answer:
      "A Lobelle ékszerek hátsó kapcsa biztonságosan záródik, ugyanakkor lekerekített kialakítású, így nem nyomja a bőrt és alvás közben sem szúr. Helyes utóápolás mellett az ékszer stabilan a helyén marad a teljes gyógyulási idő alatt.",
  },
  {
    question: "Mit tegyek, ha begyullad a lyukasztás helye?",
    answer:
      "Enyhe bőrpír az első napokban természetes. Ha a gyulladás erősödik vagy néhány nap után sem múlik, folytasd az utóápoló használatát, az ékszert ne vedd ki — a járat záródása a váladékot bezárhatja —, és fordulj a lyukasztást végző szakemberhez vagy orvoshoz. Regisztrált szakembereink ilyen esetekben is számíthatnak a szakmai támogatásunkra.",
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHero label="Segítünk eligazodni" title="Gyakori kérdések">
        Összegyűjtöttük a leggyakrabban felmerülő kérdéseket a füllyukasztásról, a titániumról
        és az utóápolásról. Ha nem találod a választ, keress minket bátran.
      </PageHero>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <FadeIn>
          <Accordion items={FAQ_ITEMS} />
        </FadeIn>
        <FadeIn>
          <div className="mt-14 text-center">
            <p className="text-sm text-faded">Nem találtad meg a választ a kérdésedre?</p>
            <Link href="/kapcsolat" className="btn-primary mt-6 inline-block">
              Tedd fel nekünk
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
