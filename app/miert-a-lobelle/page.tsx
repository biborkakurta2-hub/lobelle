import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Miért a Lobelle?",
  description:
    "A Lobelle négy pillére: ultra-hipoallergén titán, oktatói háttér, prémium garancia és személyes figyelem. A minőség nem luxus, a biztonság nem opció.",
  openGraph: {
    title: "Miért a Lobelle? | Lobelle",
    description:
      "Négy pillér: ultra-hipoallergén titán, oktatói háttér, prémium garancia, személyes figyelem.",
  },
};

const PILLARS = [
  {
    number: "01",
    title: "Ultra-hipoallergén",
    text: "Implantátum minőségű titán, teljesen nikkelmentesen. A legbiztonságosabb választás — a legkisebbeknek is.",
  },
  {
    number: "02",
    title: "Oktatói háttér",
    text: "Nem csak forgalmazunk, értünk is hozzá. Tapasztalt oktatók kísérnek az első lépésektől a profi szintig.",
  },
  {
    number: "03",
    title: "Prémium garancia",
    text: "Szigorúan ellenőrzött, steril termékek, ASTM F136 szabvány szerint. Minőség, kompromisszumok nélkül.",
  },
  {
    number: "04",
    title: "Személyes figyelem",
    text: "Legyen szó kezdő szettről vagy szakmai váltásról — minden lépésnél számíthatsz ránk.",
  },
];

export default function WhyLobellePage() {
  return (
    <>
      <PageHero label="Négy pillér" title="Miért a Lobelle?">
        Négy elv, amelyből soha nem engedünk — bármit is hoz a divat vagy a piac.
      </PageHero>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="space-y-0">
          {PILLARS.map((pillar, i) => (
            <FadeIn key={pillar.number} delay={i * 80}>
              <div className="grid gap-6 border-t border-hairline py-12 last:border-b sm:grid-cols-[8rem_1fr] sm:gap-10">
                <span className="font-serif text-5xl font-medium text-hairline sm:text-6xl" aria-hidden="true">
                  {pillar.number}
                </span>
                <div>
                  <h2 className="font-serif text-2xl text-ink md:text-3xl">{pillar.title}</h2>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-faded">{pillar.text}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Záró idézet */}
      <section className="border-t border-hairline/50 bg-cream-deep/60">
        <div className="mx-auto max-w-content px-4 py-20 text-center sm:px-6 md:py-28 lg:px-8">
          <FadeIn>
            <span className="text-bronze" aria-hidden="true">◆</span>
            <blockquote className="mx-auto mt-8 max-w-2xl font-serif text-2xl leading-snug text-ink md:text-4xl">
              „A minőség nem luxus. A biztonság nem opció.
              <br className="hidden md:block" /> A szakmaiság nem kompromisszum kérdése.”
            </blockquote>
            <div className="gold-hairline mx-auto mt-10" aria-hidden="true" />
            <p className="mt-6 text-xs uppercase tracking-label text-faded">
              Lobelle — ahol a profizmus kezdődik
            </p>
            <Link href="/kepzes" className="btn-primary mt-12 inline-block">
              Csatlakozz hozzánk
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
