import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import FramedCard from "@/components/FramedCard";

export const metadata: Metadata = {
  title: "Rólunk",
  description:
    "A Lobelle Magyarországon egyedülálló, implantátum minőségű titánium fülbelövő rendszereket ad a szakemberek kezébe — és melléjük a tudást, amitől a szolgáltatásuk valóban prémium lesz.",
  openGraph: {
    title: "Rólunk | Lobelle",
    description: "Nem csupán rendszer. Szemlélet. Ismerd meg a Lobelle márkát.",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero label="A márkáról" title="Nem csupán rendszer. Szemlélet.">
        A Lobelle ott kezdődik, ahol a kompromisszum véget ér.
      </PageHero>

      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-7 md:py-24 lg:px-8">
        <FadeIn>
          <div className="space-y-6 text-base leading-relaxed text-faded">
            <p>
              Magyarországon egyedülálló, implantátum minőségű titánium fülbelövő rendszereket
              adunk a szakemberek kezébe — és melléjük azt a tudást, amitől a szolgáltatásuk
              valóban prémium lesz. Nálunk a prémium alapanyag, a tudatos választás és a szakmai
              háttér egy helyen találkozik.
            </p>
            <p>
              Az alapanyagban nem ismerünk kompromisszumot: minden ékszerünk ASTM F136 szabványú,
              Grade 23 titánból készül — ugyanabból az anyagból, amelyet orvosi implantátumokhoz
              használnak. Teljesen nikkelmentes, biokompatibilis, nem oxidálódik és nem
              színeződik el, ezért a legkisebbeknek is biztonsággal ajánljuk.
            </p>
            <p>
              De a Lobelle nem áll meg a terméknél. Nem csak forgalmazunk — oktatunk is:
              gyakorlatorientált szakemberképzésünkön kozmetikusok és szakmaváltók sajátítják el
              a professzionális fül- és orrlyukasztást, hivatalos, FAR-regisztrált tanúsítvánnyal.
              A képzés után sem engedjük el a kezüket: folyamatos szakmai támogatást és
              kedvezményes vásárlási lehetőséget kapnak.
            </p>
            <p>
              Küldetésünk egyszerű: hogy Magyarországon a füllyukasztás ne rutinmunka legyen,
              hanem prémium szolgáltatás — biztonságos anyagokkal, képzett szakemberekkel és
              olyan odafigyeléssel, amit minden vendég megérdemel.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={120}>
          <FramedCard className="mt-14">
            <div className="py-8 text-center">
              <p className="mx-auto max-w-md font-serif text-3xl font-medium leading-snug text-ink">
                „Ha egyszer titániumot használsz, nem térsz vissza máshoz.”
              </p>
              <div className="gold-hairline mx-auto mt-6" aria-hidden="true" />
              <p className="mt-5 text-xs uppercase tracking-label text-faded">
                Lobelle — ahol a profizmus kezdődik
              </p>
            </div>
          </FramedCard>
        </FadeIn>
      </section>

      <section className="border-t border-hairline bg-white/50">
        <div className="mx-auto max-w-content px-4 py-16 text-center sm:px-6 md:py-20 lg:px-8">
          <FadeIn>
            <SectionHeading label="Ismerj meg minket közelebbről" title="Így dolgozunk">
              Nézd meg a négy pillérünket, vagy böngéssz az életképeink között.
            </SectionHeading>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/miert-a-lobelle" className="btn-primary">
                Miért a Lobelle?
              </Link>
              <Link href="/eletkepek" className="btn-outline">
                Életképek
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
