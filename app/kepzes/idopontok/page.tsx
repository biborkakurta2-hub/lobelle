import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import FramedCard from "@/components/FramedCard";

export const metadata: Metadata = {
  title: "Képzés időpontok, helyszínek",
  description:
    "A Lobelle fül- és orrlyukasztó szakemberképzés aktuális időpontjai és helyszínei. Jelentkezz a hozzád legközelebbi képzésre.",
  openGraph: {
    title: "Képzés időpontok, helyszínek | Lobelle",
    description: "Aktuális képzési időpontok és helyszínek — jelentkezz a hozzád legközelebbire.",
  },
};

/*
 * PLACEHOLDER időpontok — a valós képzési naptárra cserélendők!
 * Az adatok szándékosan itt, egy helyen szerepelnek, hogy könnyű legyen frissíteni.
 */
const SESSIONS = [
  {
    city: "Debrecen",
    venue: "Lobelle képzési központ — 4031 Debrecen, Széchenyi u. 62. fszt. 26.",
    date: "Időpont egyeztetés alatt",
    time: "Délelőtti kezdés",
    spots: "Korlátozott létszám",
  },
  {
    city: "Budapest",
    venue: "Helyszín egyeztetés alatt",
    date: "Időpont egyeztetés alatt",
    time: "Délelőtti kezdés",
    spots: "Korlátozott létszám",
  },
  {
    city: "Szeged",
    venue: "Helyszín egyeztetés alatt",
    date: "Időpont egyeztetés alatt",
    time: "Délutáni kezdés",
    spots: "Korlátozott létszám",
  },
  {
    city: "Győr",
    venue: "Helyszín egyeztetés alatt",
    date: "Időpont egyeztetés alatt",
    time: "Délutáni kezdés",
    spots: "Korlátozott létszám",
  },
];

export default function SchedulePage() {
  return (
    <>
      <PageHero label="Oktatás" title="Képzés időpontok, helyszínek">
        Válaszd ki a hozzád legközelebbi helyszínt és a neked megfelelő időpontot. A képzés
        2–3 órás, és a kezdőcsomagot a helyszínen kapod meg.
      </PageHero>

      <section className="mx-auto max-w-content px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {SESSIONS.map((session, i) => (
            <FadeIn key={session.city} delay={(i % 2) * 120}>
              <FramedCard className="h-full">
                <div className="flex h-full flex-col">
                  <span className="section-label !text-[0.65rem]">Helyszín</span>
                  <h2 className="mt-2 font-serif text-2xl text-ink">{session.city}</h2>
                  <dl className="mt-5 space-y-3 text-sm">
                    <div className="flex gap-3">
                      <dt className="w-24 shrink-0 text-faded">Cím</dt>
                      <dd className="text-ink">{session.venue}</dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className="w-24 shrink-0 text-faded">Dátum</dt>
                      <dd className="text-ink">{session.date}</dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className="w-24 shrink-0 text-faded">Kezdés</dt>
                      <dd className="text-ink">{session.time}</dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className="w-24 shrink-0 text-faded">Létszám</dt>
                      <dd className="text-ink">{session.spots}</dd>
                    </div>
                  </dl>
                  <div className="mt-auto pt-6">
                    <Link
                      href={`/kapcsolat?targy=${encodeURIComponent(`Képzés jelentkezés – ${session.city}`)}`}
                      className="btn-primary block w-full text-center !text-xs"
                    >
                      Jelentkezem
                    </Link>
                  </div>
                </div>
              </FramedCard>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="mt-16 border-t border-hairline/60 pt-10 text-center">
            <p className="text-sm text-faded">
              Nem találsz megfelelő időpontot, vagy a saját városodba szerveznél képzést?
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/kepzes/privat-oktatas" className="btn-primary">
                Privát oktatást kérek
              </Link>
              <Link href="/kapcsolat" className="btn-outline">
                Írok nektek
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
