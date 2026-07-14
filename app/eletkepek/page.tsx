import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import FramedCard from "@/components/FramedCard";
import ImagePlaceholder from "@/components/ImagePlaceholder";

export const metadata: Metadata = {
  title: "Életképek",
  description:
    "Pillanatok a Lobelle képzésekről, a műhelyünkből és a mindennapjainkból — így dolgozunk mi.",
  openGraph: {
    title: "Életképek | Lobelle",
    description: "Pillanatok a Lobelle képzésekről és a mindennapjainkból.",
  },
};

/* PLACEHOLDER galéria — a feliratok szerinti valós fotókra cserélendők. */
const GALLERY = [
  "Képzés közben",
  "Gyakorlati tréning",
  "A kezdőcsomag",
  "Titánium kollekció",
  "Babafül lyukasztás",
  "A készülék közelről",
  "Oktatónk munka közben",
  "Elégedett vendég",
  "Díszdobozos baba szett",
  "Műhelypillanat",
  "Tanúsítvány átadás",
  "A Lobelle csapat",
];

export default function GalleryPage() {
  return (
    <>
      <PageHero label="Galéria" title="Életképek">
        Pillanatok a képzésekről, a műhelyünkből és a mindennapjainkból — mert a szakmaiság
        képeken is látszik.
      </PageHero>

      <section className="mx-auto max-w-content px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY.map((caption, i) => (
            <FadeIn key={caption} delay={(i % 3) * 100}>
              <FramedCard>
                {/* PLACEHOLDER fotó — valós képre cserélendő */}
                <ImagePlaceholder label={caption} aspect="aspect-[4/3]" />
                <p className="mt-4 text-center text-xs uppercase tracking-label text-faded">
                  {caption}
                </p>
              </FramedCard>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
