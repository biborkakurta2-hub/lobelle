import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import FramedCard from "@/components/FramedCard";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { PRODUCT_CATEGORIES, getCategory } from "@/lib/products";

/*
 * Termékkategória oldalak — statikusan generálva (SSG).
 *
 * WEBSHOP-INTEGRÁCIÓ: ha később webshop motor vagy Shopify kerül az oldal mögé,
 * a lib/products.ts statikus adatai helyett itt hívható a termék API
 * (pl. Shopify Storefront API) a generateStaticParams-ban és a page-ben.
 * Az "Érdeklődöm" CTA ekkor cserélhető kosárba tétel gombra.
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

  return (
    <>
      <PageHero label="Kollekció" title={category.title}>
        {category.longDescription}
      </PageHero>

      <section className="mx-auto max-w-content px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {category.products.map((product, i) => (
            <FadeIn key={product.name} delay={(i % 3) * 100}>
              <FramedCard className="h-full">
                <div className="flex h-full flex-col">
                  {/* PLACEHOLDER termékfotó — valós fotóra cserélendő */}
                  <ImagePlaceholder label="Termékfotó helye" />
                  <h2 className="mt-5 font-serif text-lg text-ink">{product.name}</h2>
                  {/* PLACEHOLDER ár — valós árra cserélendő */}
                  <p className="mt-2 text-sm text-faded">{product.price}</p>
                  <div className="mt-auto pt-5">
                    <Link
                      href={`/kapcsolat?targy=${encodeURIComponent(product.name)}`}
                      className="btn-outline block w-full !px-4 text-center !text-xs"
                    >
                      Érdeklődöm
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
              Kérdésed van a kollekcióról, vagy nagyobb mennyiséget rendelnél?
            </p>
            <Link href="/kapcsolat" className="btn-primary mt-6 inline-block">
              Kapcsolatfelvétel
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
