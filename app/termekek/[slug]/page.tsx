import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import FramedCard from "@/components/FramedCard";
import ProductGrid from "@/components/ProductGrid";
import { PRODUCT_CATEGORIES, getCategory } from "@/lib/products";
import { getProductsByCategory } from "@/lib/shop";

/*
 * Termékkategória oldal — statikusan generálva (SSG).
 *
 * A termékek a data/products.json fájlból jönnek, amelyet az `npm run scrape`
 * tölt fel a lobelle.hu adataival. Shopify esetén elég a lib/shop.ts
 * adatforrását kicserélni, ez az oldal változatlanul működik tovább.
 */

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return PRODUCT_CATEGORIES.map((category) => ({ slug: category.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const category = getCategory(params.slug);
  if (!category) return {};
  return {
    title: category.title,
    description: `${category.description} Implantátum minőségű, ASTM F136 szabványú Grade 23 titánium — a Lobelle kollekcióból.`,
    openGraph: {
      title: `${category.title} | Lobelle`,
      description: category.description,
    },
  };
}

export default function ProductCategoryPage({ params }: Props) {
  const category = getCategory(params.slug);
  if (!category) notFound();

  const products = getProductsByCategory(category.slug);

  return (
    <>
      <PageHero label="Kollekció" title={category.title}>
        {category.longDescription}
      </PageHero>

      <section className="mx-auto max-w-content px-5 py-16 sm:px-7 md:py-24 lg:px-8">
        {products.length > 0 ? (
          <FadeIn>
            <ProductGrid products={products} />
          </FadeIn>
        ) : (
          <FadeIn>
            <FramedCard className="mx-auto max-w-2xl">
              <div className="py-10 text-center">
                <span className="section-label">Feltöltés alatt</span>
                <p className="mt-5 font-serif text-3xl font-light leading-snug text-ink">
                  A kategória termékei hamarosan elérhetők.
                </p>
                <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-faded">
                  Amíg a webshop feltöltése tart, telefonon és emailben is szívesen adunk
                  tájékoztatást a kínálatról, az árakról és a szállításról.
                </p>
                <Link href="/kapcsolat" className="btn-primary mt-8 inline-block">
                  Érdeklődöm a kategóriáról
                </Link>
              </div>
            </FramedCard>
          </FadeIn>
        )}

        <FadeIn>
          <div className="mt-16 border-t border-hairline pt-10 text-center">
            <p className="text-sm text-faded">
              Kérdésed van a kollekcióról, vagy nagyobb mennyiséget rendelnél?
            </p>
            <Link href="/kapcsolat" className="btn-outline mt-6 inline-block">
              Kapcsolatfelvétel
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
