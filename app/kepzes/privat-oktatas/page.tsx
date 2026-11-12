import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import InterestForm from "@/components/InterestForm";

export const metadata: Metadata = {
  title: "Privát oktatás",
  description:
    "Egyéni fül- és orrlyukasztó képzés a saját tempódban, hozzád igazított időpontban. Teljes figyelem, gyakorlatorientált tematika, FAR-regisztrált tanúsítvány.",
  openGraph: {
    title: "Privát oktatás | Lobelle",
    description: "Egyéni füllyukasztó képzés a saját tempódban, hozzád igazított időpontban.",
  },
};

const BENEFITS = [
  {
    title: "Teljes oktatói figyelem",
    text: "Az oktató csak veled foglalkozik — minden kérdésedre azonnal választ kapsz, és annyi gyakorlási lehetőséged van, amennyire szükséged van.",
  },
  {
    title: "Hozzád igazított időpont",
    text: "Nem kell csoportos időponthoz alkalmazkodnod: a képzés napját és időpontját közösen egyeztetjük.",
  },
  {
    title: "Saját tempó",
    text: "Ott időzünk el, ahol neked fontos — legyen az a jelölés precizitása, a babák füllyukasztása vagy az utóápolási tanácsadás.",
  },
  {
    title: "Ugyanaz a teljes csomag",
    text: "A privát képzés is a közel 70 000 Ft értékű kezdőcsomaggal és hivatalos, FAR-regisztrált tanúsítvánnyal zárul.",
  },
];

export default function PrivateTrainingPage() {
  return (
    <>
      <PageHero label="Oktatás" title="Privát oktatás">
        Egyéni képzés azoknak, akik a csoportos időpontok helyett a saját tempójukban, teljes
        oktatói figyelem mellett sajátítanák el a professzionális fül- és orrlyukasztást.
      </PageHero>

      <section className="mx-auto max-w-content px-5 py-16 sm:px-7 md:py-24 lg:px-8">
        <FadeIn>
          <SectionHeading label="Előnyök" title="Miért érdemes privát képzést választanod?" />
        </FadeIn>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {BENEFITS.map((benefit, i) => (
            <FadeIn key={benefit.title} delay={(i % 2) * 120}>
              <div className="h-full border-t border-hairline pt-6">
                <h3 className="font-serif text-2xl font-medium text-ink">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-faded">{benefit.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="border-t border-hairline bg-white/50">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-7 md:py-24 lg:px-8">
          <FadeIn>
            <SectionHeading label="Érdeklődés" title="Kérj egyéni időpontot">
              Írd meg, mikor érnél rá, és milyen előzetes tapasztalattal rendelkezel — minden
              mást mi intézünk.
            </SectionHeading>
            <div className="mt-10">
              <InterestForm
                formName="Privát oktatás érdeklődés"
                messageLabel="Mikor érnél rá, és mit szeretnél tanulni?"
                submitLabel="Érdeklődés elküldése"
              />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
