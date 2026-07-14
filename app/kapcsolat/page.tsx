import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import ContactForm from "@/components/ContactForm";
import { PHONE, PHONE_HREF, EMAIL, ADDRESS } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Kapcsolatfelvétel",
  description:
    "Vedd fel velünk a kapcsolatot: 4031 Debrecen, Széchenyi u. 62. fszt. 26. Telefon: +36 30 483 3814. Email: rendeles@lobelle.hu.",
  openGraph: {
    title: "Kapcsolatfelvétel | Lobelle",
    description: "Írj nekünk, vagy hívj minket — kérdésekben és rendelésben is segítünk.",
  },
};

const CONTACT_DETAILS = [
  {
    label: "Cím",
    value: ADDRESS,
    href: undefined,
  },
  {
    label: "Telefon",
    value: PHONE,
    href: PHONE_HREF,
  },
  {
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero label="Kapcsolat" title="Kapcsolatfelvétel">
        Kérdésed van a termékekről, a képzésről vagy rendelnél? Írj nekünk, vagy hívj minket —
        munkanapokon rövid időn belül válaszolunk.
      </PageHero>

      <section className="mx-auto max-w-content px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_20rem] lg:gap-20">
          <FadeIn>
            <h2 className="font-serif text-2xl text-ink">Írj nekünk üzenetet</h2>
            <div className="gold-hairline mt-5" aria-hidden="true" />
            <div className="mt-8">
              <ContactForm />
            </div>
          </FadeIn>

          <FadeIn delay={120}>
            <h2 className="font-serif text-2xl text-ink">Elérhetőségeink</h2>
            <div className="gold-hairline mt-5" aria-hidden="true" />
            <dl className="mt-8 space-y-7">
              {CONTACT_DETAILS.map((item) => (
                <div key={item.label}>
                  <dt className="section-label !text-[0.65rem]">{item.label}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-ink">
                    {item.href ? (
                      <a href={item.href} className="transition-colors hover:text-bronze">
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </dd>
                </div>
              ))}
              <div>
                <dt className="section-label !text-[0.65rem]">Közösség</dt>
                <dd className="mt-2 space-y-1.5 text-sm text-ink">
                  <a
                    href="https://www.facebook.com/lobelle.hu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block transition-colors hover:text-bronze"
                  >
                    Facebook
                  </a>
                  <a
                    href="https://www.instagram.com/lobelle.hu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block transition-colors hover:text-bronze"
                  >
                    Instagram
                  </a>
                </dd>
              </div>
            </dl>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
