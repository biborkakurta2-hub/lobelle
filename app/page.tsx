import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import DeviceHero from "@/components/DeviceHero";
import SectionHeading from "@/components/SectionHeading";
import FramedCard from "@/components/FramedCard";
import NewsletterForm from "@/components/NewsletterForm";
import { PRODUCT_CATEGORIES } from "@/lib/products";

export const metadata: Metadata = {
  title: "Lobelle – Az innovatív füllyukasztás új generációja",
  description:
    "Magyarországon egyedülálló, implantátum minőségű titánium fülbelövő rendszerek és füllyukasztó szakemberképzés. ASTM F136 szabvány, Grade 23 titán, nikkelmentes ékszerek.",
  openGraph: {
    title: "Lobelle – Az innovatív füllyukasztás új generációja",
    description:
      "Implantátum minőségű titánium fülbelövő rendszerek és szakemberképzés. Biztonság, innováció, szakmaiság.",
  },
};

const PILLARS = [
  {
    title: "Biztonság",
    text: "ASTM F136 szabványú, Grade 23 titán — ugyanaz az anyag, amelyet orvosi implantátumokhoz használnak.",
  },
  {
    title: "Innováció",
    text: "Rendkívül vékony kivitel és lekerekített hátsó kapocs: kíméletes lyukasztás, kényelmes viselet babáknak és felnőtteknek.",
  },
  {
    title: "Szakmaiság",
    text: "Nem csak forgalmazunk — oktatunk is. Képzett szakemberek, valós gyakorlati tudás, folyamatos támogatás.",
  },
];

const TITANIUM_BENEFITS = [
  {
    title: "Teljesen nikkelmentes",
    text: "A leggyakoribb allergén nélkül — érzékeny bőrnek is.",
  },
  {
    title: "Biokompatibilis",
    text: "A szervezet sajátjaként fogadja, nem lép reakcióba a bőrrel.",
  },
  {
    title: "Nem oxidálódik",
    text: "Évek múlva is ugyanolyan, mint az első napon.",
  },
  {
    title: "Nem korrodál",
    text: "Víz, izzadság, kozmetikum — semmi nem árt neki.",
  },
  {
    title: "Nem színeződik el",
    text: "Tartós, elegáns megjelenés kompromisszum nélkül.",
  },
  {
    title: "Kíméletes kivitel",
    text: "Rendkívül vékony szár — a lyukasztás alig érezhető.",
  },
];

export default function HomePage() {
  return (
    <>
      <DeviceHero />

      {/* A nyitókép alatt: a három pillér és a két fő útvonal.
          A cím már a nyitóképbe lóg bele, ezért itt nem ismétlődik. */}
      <section className="mx-auto hidden max-w-content px-5 pb-4 pt-14 text-center sm:px-7 lg:px-8 landscape:block">
        <FadeIn>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm uppercase tracking-label text-bronze-soft">
            <span>Biztonság</span>
            <span className="h-1 w-1 rounded-full bg-sand" aria-hidden="true" />
            <span>Innováció</span>
            <span className="h-1 w-1 rounded-full bg-sand" aria-hidden="true" />
            <span>Szakmaiság</span>
          </div>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/termekek/ful-es-orrlyukaszto-keszulek" className="btn-primary">
              Fedezd fel a rendszert
            </Link>
            <Link href="/kepzes" className="btn-outline">
              Jelentkezz képzésre
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* A három pillér */}
      <section className="mx-auto max-w-content px-5 py-20 sm:px-7 md:py-28 lg:px-8">
        <FadeIn>
          <SectionHeading label="A márkáról" title="Nem csupán rendszer. Szemlélet.">
            A Lobelle ott kezdődik, ahol a kompromisszum véget ér. Magyarországon egyedülálló,
            implantátum minőségű titánium fülbelövő rendszereket adunk a szakemberek kezébe —
            és melléjük azt a tudást, amitől a szolgáltatásuk valóban prémium lesz.
          </SectionHeading>
        </FadeIn>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <FadeIn key={pillar.title} delay={i * 120}>
              <div className="h-full border-t border-hairline pt-8 text-center">
                <span className="mx-auto block h-1.5 w-1.5 rounded-full bg-bronze" aria-hidden="true" />
                <h3 className="mt-4 font-serif text-3xl font-medium text-ink">{pillar.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-faded">{pillar.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Titánium előnyök */}
      <section className="border-y border-hairline bg-white/50">
        <div className="mx-auto max-w-content px-5 py-20 sm:px-7 md:py-28 lg:px-8">
          <FadeIn>
            <SectionHeading label="Anyag és technológia" title="A titánium ereje">
              A titánium jelenleg a világ egyik legbiztonságosabb fémje füllyukasztáshoz. Nem
              véletlen, hogy orvosi implantátumoknál is ezt használják: gyorsabb gyógyulás,
              kevesebb gyulladás, minimális irritáció.
            </SectionHeading>
          </FadeIn>
          <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {TITANIUM_BENEFITS.map((benefit, i) => (
              <FadeIn key={benefit.title} delay={(i % 3) * 100}>
                <div className="flex gap-4">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bronze" aria-hidden="true" />
                  <div>
                    <h3 className="font-serif text-xl font-medium text-ink">{benefit.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-faded">{benefit.text}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ASTM F136 kiemelt sáv */}
      <section className="bg-bronze">
        <div className="mx-auto max-w-content px-4 py-14 text-center sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-xs uppercase tracking-label text-white/80">Prémium garancia</p>
            <p className="mt-4 font-serif text-3xl font-medium leading-snug text-cream md:text-3xl">
              ASTM F136 szabvány <span aria-hidden="true">·</span> Grade 23 implantátum minőségű
              titán
            </p>
            <p className="mt-4 text-sm text-white/90">
              Szigorúan ellenőrzött, steril termékek — kompromisszumok nélkül.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Termékkategória-rács */}
      <section className="mx-auto max-w-content px-5 py-20 sm:px-7 md:py-28 lg:px-8">
        <FadeIn>
          <SectionHeading label="Kollekció" title="Termékkínálat">
            Minden darab ugyanabból az alapanyagból, ugyanazzal az igényességgel készül — a
            legkisebbeknek szánt első fülbevalótól a professzionális eszközökig.
          </SectionHeading>
        </FadeIn>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCT_CATEGORIES.map((category, i) => (
            <FadeIn key={category.slug} delay={(i % 3) * 100}>
              <Link href={`/termekek/${category.slug}`} className="group block h-full">
                <FramedCard className="h-full transition-colors duration-300 group-hover:border-bronze/50">
                  <div className="flex h-full flex-col text-center">
                    <span className="mx-auto block h-1.5 w-1.5 rounded-full bg-bronze" aria-hidden="true" />
                    <h3 className="mt-3 font-serif text-2xl font-medium text-ink transition-colors duration-300 group-hover:text-bronze">
                      {category.shortName}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-faded">
                      {category.description}
                    </p>
                    <span className="mt-5 text-xs uppercase tracking-label text-bronze">
                      Megnézem
                    </span>
                  </div>
                </FramedCard>
              </Link>
            </FadeIn>
          ))}
        </div>
        <FadeIn>
          <p className="mt-12 text-center font-serif text-2xl italic text-faded">
            A prémium vendég prémium minőséget vár.
          </p>
        </FadeIn>
      </section>

      {/* Képzés teaser */}
      <section className="border-y border-hairline bg-white/50">
        <div className="mx-auto grid max-w-content items-center gap-12 px-5 py-20 sm:px-7 md:py-28 lg:grid-cols-2 lg:px-8">
          <FadeIn>
            <SectionHeading
              align="left"
              label="Oktatás"
              title="Fül- és orrlyukasztó szakemberképzés"
            >
              Intenzív, gyakorlatorientált képzés 2–3 órában — előképzettség nélkül.
              Kozmetikusoknak és mindazoknak, akik professzionális szolgáltatással bővítenék a
              kínálatukat, és akár másnap dolgozni szeretnének.
            </SectionHeading>
            <ul className="mt-8 space-y-3 text-sm text-faded">
              <li className="flex gap-3">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bronze" aria-hidden="true" />
                Elméleti alapozás: anatómia, higiénia, anyagtudomány, jogi háttér
              </li>
              <li className="flex gap-3">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bronze" aria-hidden="true" />
                Gyakorlati tréning speciális gyakorlófülön, oktatói felügyelettel
              </li>
              <li className="flex gap-3">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bronze" aria-hidden="true" />
                Közel 70 000 Ft értékű kezdőcsomag a képzés részeként
              </li>
              <li className="flex gap-3">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bronze" aria-hidden="true" />
                Hivatalos, FAR-regisztrált tanúsítvány
              </li>
            </ul>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/kepzes" className="btn-primary">
                Képzés részletei
              </Link>
              <Link href="/kepzes/idopontok" className="btn-outline">
                Időpontok, helyszínek
              </Link>
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <FramedCard>
              <div className="py-10 text-center">
                <span className="section-label">Lobelle</span>
                <p className="mx-auto mt-6 max-w-sm font-serif text-3xl font-medium leading-snug text-ink">
                  „Ha egyszer titániumot használsz, nem térsz vissza máshoz.”
                </p>
                <div className="gold-hairline mx-auto mt-8" aria-hidden="true" />
                <p className="mt-6 text-xs uppercase tracking-label text-faded">
                  Ahol a profizmus kezdődik
                </p>
              </div>
            </FramedCard>
          </FadeIn>
        </div>
      </section>

      {/* Hírlevél */}
      <section className="mx-auto max-w-content px-4 py-20 text-center sm:px-6 md:py-28 lg:px-8">
        <FadeIn>
          <SectionHeading label="Hírlevél" title="Maradjunk kapcsolatban">
            Iratkozz fel, hogy elsőként értesülj az új kollekciókról, képzési időpontokról és
            szakmai újdonságokról.
          </SectionHeading>
          <div className="mt-10">
            <NewsletterForm />
          </div>
        </FadeIn>
      </section>
    </>
  );
}
