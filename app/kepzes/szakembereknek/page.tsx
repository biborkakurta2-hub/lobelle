import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import InterestForm from "@/components/InterestForm";

export const metadata: Metadata = {
  title: "Már füllyukasztó szakember vagyok",
  description:
    "Szakmai regisztráció gyakorló füllyukasztó szakembereknek: kedvezményes vásárlás, elsőbbségi értesítés az újdonságokról és folyamatos szakmai támogatás a Lobelle-től.",
  openGraph: {
    title: "Már füllyukasztó szakember vagyok | Lobelle",
    description: "Szakmai regisztráció: kedvezményes vásárlás és folyamatos támogatás szakembereknek.",
  },
};

const BENEFITS = [
  {
    title: "Kedvezményes vásárlás",
    text: "A Lobelle tanfolyam elvégzése után minden termékünket kedvezményes szakmai áron vásárolhatod meg — ékszereket, készülékeket és kellékeket egyaránt.",
  },
  {
    title: "Elsőbbségi értesítés",
    text: "Elsőként értesülsz az új kollekciókról és a készletre érkező termékekről, így a vendégeidnek mindig a legfrissebb kínálatot mutathatod.",
  },
  {
    title: "Folyamatos szakmai támogatás",
    text: "Elakadtál egy esetnél, vagy tanácsra van szükséged? Regisztrált szakemberként közvetlen szakmai támogatást kapsz tőlünk.",
  },
  {
    title: "Átállás titániumra",
    text: "Ha eddig más rendszerrel dolgoztál, segítünk az átállásban — eszközválasztásban, technikában és a vendégkommunikációban is.",
  },
];

export default function ProfessionalsPage() {
  return (
    <>
      <PageHero label="Szakembereknek" title="Már füllyukasztó szakember vagyok">
        Gyakorló szakemberként is van helyed a Lobelle-nél: regisztrálj, és dolgozz Magyarországon
        egyedülálló, implantátum minőségű titánium rendszerrel — kedvezményes feltételekkel.
      </PageHero>

      <section className="mx-auto max-w-content px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <FadeIn>
          <SectionHeading label="Előnyök" title="Mit kapsz a szakmai regisztrációval?" />
        </FadeIn>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {BENEFITS.map((benefit, i) => (
            <FadeIn key={benefit.title} delay={(i % 2) * 120}>
              <div className="h-full border-t border-hairline pt-6">
                <h3 className="font-serif text-xl text-ink">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-faded">{benefit.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="border-t border-hairline/50 bg-cream-deep/60">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <FadeIn>
            <SectionHeading label="Regisztráció" title="Regisztrálj szakemberként">
              Írd meg, mióta és milyen rendszerrel dolgozol — felvesszük veled a kapcsolatot a
              szakmai feltételekkel.
            </SectionHeading>
            <div className="mt-10">
              <InterestForm
                formName="Szakmai regisztráció"
                messageLabel="Mióta dolgozol füllyukasztóként, milyen rendszert használsz?"
                submitLabel="Regisztrációs igény elküldése"
              />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
