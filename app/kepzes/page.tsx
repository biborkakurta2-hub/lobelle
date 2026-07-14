import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import FramedCard from "@/components/FramedCard";

export const metadata: Metadata = {
  title: "Fül- és orrlyukasztó szakemberképzés",
  description:
    "Intenzív, gyakorlatorientált fül- és orrlyukasztó képzés 2–3 órában, előképzettség nélkül. Közel 70 000 Ft értékű kezdőcsomag, hivatalos FAR-regisztrált tanúsítvány (B/2021/000190).",
  openGraph: {
    title: "Fül- és orrlyukasztó szakemberképzés | Lobelle",
    description:
      "Gyakorlatorientált képzés kezdőcsomaggal és FAR-regisztrált tanúsítvánnyal — akár másnap dolgozhatsz.",
  },
};

const THEORY = [
  {
    title: "Anatómia",
    text: "Idegek, erek, porcszövetek — hol szabad és hol tilos szúrni.",
  },
  {
    title: "Higiénia",
    text: "Aszeptikus munkaterület, keresztfertőzések megelőzése.",
  },
  {
    title: "Anyagtudomány",
    text: "Tű vs. készülék; titán, orvosi fém, arany különbségei.",
  },
  {
    title: "Jogi háttér",
    text: "Beleegyező nyilatkozatok, korhatárok, felelősség.",
  },
];

const PRACTICE = [
  {
    title: "Jelölés",
    text: "A tökéletes szimmetria megtervezése.",
  },
  {
    title: "Szúrási gyakorlat",
    text: "Speciális gyakorlófülön, oktatói felügyelettel.",
  },
  {
    title: "Ékszerválasztás",
    text: "Megfelelő anyag és méret minden vendéghez.",
  },
  {
    title: "Utóápolás",
    text: "Teendők gyulladás vagy allergia esetén.",
  },
];

const STARTER_KIT = [
  "Prémium füllyukasztó eszköz",
  "Prémium orrlyukasztó eszköz",
  "Utóápoló",
  "Speciális eltávolító csipeszek",
  "Sebészeti jelölőtoll",
  "Gyakorló ékszerek",
  "Hordtáska és tükör",
  "Termékkatalógus",
  "Hozzájárulási nyilatkozat",
];

const AUDIENCE = [
  {
    title: "Kozmetikusoknak",
    text: "Meglévő vendégkörödnek kínálhatsz új, keresett szolgáltatást — a képzés után akár másnap.",
  },
  {
    title: "Szépségipari szakembereknek",
    text: "Fodrászként, műkörmösként vagy sminkesként is bővítheted a kínálatodat professzionális füllyukasztással.",
  },
  {
    title: "Pályakezdőknek",
    text: "Előképzettség nélkül is elsajátíthatod a szakmát — az elméleti és gyakorlati alapokat tőlünk kapod meg.",
  },
  {
    title: "Szakmaváltóknak",
    text: "Saját szolgáltatást indítanál? A kezdőcsomaggal és a tanúsítvánnyal minden eszközöd megvan az induláshoz.",
  },
];

export default function TrainingPage() {
  return (
    <>
      <PageHero label="Oktatás" title="Fül- és orrlyukasztó szakemberképzés">
        Intenzív, gyakorlatorientált képzés 2–3 órában — előképzettség nélkül. Kozmetikusoknak
        és mindazoknak, akik professzionális szolgáltatással bővítenék a kínálatukat, és akár
        másnap dolgozni szeretnének.
      </PageHero>

      {/* Elmélet + gyakorlat */}
      <section className="mx-auto max-w-content px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2">
          <FadeIn>
            <SectionHeading align="left" label="Első rész" title="Elméleti alapozás" />
            <div className="mt-8 space-y-7">
              {THEORY.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <span className="mt-1.5 text-xs text-bronze" aria-hidden="true">◆</span>
                  <div>
                    <h3 className="font-serif text-lg text-ink">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-faded">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={120}>
            <SectionHeading align="left" label="Második rész" title="Gyakorlati tréning" />
            <div className="mt-8 space-y-7">
              {PRACTICE.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <span className="mt-1.5 text-xs text-bronze" aria-hidden="true">◆</span>
                  <div>
                    <h3 className="font-serif text-lg text-ink">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-faded">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Kezdőcsomag */}
      <section className="border-y border-hairline/50 bg-cream-deep/60">
        <div className="mx-auto max-w-content px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <FadeIn>
            <SectionHeading
              label="A képzés része"
              title="Közel 70 000 Ft értékű kezdőcsomag"
            >
              Nem csak tudást kapsz, hanem mindent, amivel már a képzés másnapján fogadhatod az
              első vendégeidet.
            </SectionHeading>
          </FadeIn>
          <FadeIn delay={120}>
            <FramedCard className="mx-auto mt-12 max-w-3xl">
              <ul className="grid gap-x-10 gap-y-4 py-4 text-sm text-ink sm:grid-cols-2">
                {STARTER_KIT.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 text-xs text-bronze" aria-hidden="true">◆</span>
                    {item}
                  </li>
                ))}
              </ul>
            </FramedCard>
          </FadeIn>
        </div>
      </section>

      {/* FAR-tanúsítvány */}
      <section className="bg-bronze">
        <div className="mx-auto max-w-content px-4 py-14 text-center sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-xs uppercase tracking-label text-cream/80">Hivatalos tanúsítvány</p>
            <p className="mt-4 font-serif text-2xl leading-snug text-cream md:text-3xl">
              A képzés hivatalos, FAR-regisztrált tanúsítvánnyal zárul.
            </p>
            <p className="mt-4 text-sm uppercase tracking-[0.15em] text-cream/90">
              Felnőttképzési nyilvántartási szám: B/2021/000190
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Kinek ajánljuk */}
      <section className="mx-auto max-w-content px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <FadeIn>
          <SectionHeading label="Célközönség" title="Kinek ajánljuk?" />
        </FadeIn>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {AUDIENCE.map((item, i) => (
            <FadeIn key={item.title} delay={(i % 2) * 120}>
              <div className="h-full border-t border-hairline pt-6">
                <h3 className="font-serif text-xl text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-faded">{item.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="mt-16 border-t border-hairline/60 pt-12 text-center">
            <p className="font-serif text-2xl text-ink">Kezdd el még ebben a hónapban.</p>
            <p className="mx-auto mt-3 max-w-xl text-sm text-faded">
              Nézd meg az aktuális időpontokat és helyszíneket, vagy kérdezz tőlünk bátran — a
              képzésekkel kapcsolatban is szívesen segítünk.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/kepzes/idopontok" className="btn-primary">
                Jelentkezem a képzésre
              </Link>
              <Link href="/kepzes/privat-oktatas" className="btn-outline">
                Inkább privát oktatást kérek
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
