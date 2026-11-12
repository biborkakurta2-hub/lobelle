import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FadeIn from "@/components/FadeIn";
import ProductGallery from "@/components/ProductGallery";
import ProductCard from "@/components/ProductCard";
import AddToCart from "@/components/AddToCart";
import { getCategory } from "@/lib/products";
import { ALL_PRODUCTS, formatPrice, getProduct, getProductsByCategory } from "@/lib/shop";

type Props = { params: { slug: string; product: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return ALL_PRODUCTS.map((product) => ({ slug: product.category, product: product.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const product = getProduct(params.slug, params.product);
  if (!product) return {};
  const description =
    product.description?.slice(0, 155) ??
    `${product.name} — implantátum minőségű, ASTM F136 szabványú Grade 23 titánium a Lobelle kollekciójából.`;
  return {
    title: product.name,
    description,
    openGraph: {
      title: `${product.name} | Lobelle`,
      description,
      images: product.images[0] ? [product.images[0]] : undefined,
    },
  };
}

const HIGHLIGHTS = [
  "ASTM F136 szabványú, Grade 23 implantátum minőségű titán",
  "Teljesen nikkelmentes, biokompatibilis alapanyag",
  "Lekerekített hátsó kapocs — alvás közben sem szúr",
  "Nem oxidálódik, nem korrodál, nem színeződik el",
];

export default function ProductPage({ params }: Props) {
  const category = getCategory(params.slug);
  const product = getProduct(params.slug, params.product);
  if (!category || !product) notFound();

  const related = getProductsByCategory(category.slug)
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <>
      {/* Morzsamenü */}
      <nav aria-label="Morzsamenü" className="border-b border-hairline bg-cream-deep/60">
        <ol className="mx-auto flex max-w-content flex-wrap items-center gap-2 px-4 py-4 text-xs text-faded sm:px-6 lg:px-8">
          <li>
            <Link href="/" className="transition-colors hover:text-bronze">
              Főoldal
            </Link>
          </li>
          <li aria-hidden="true" className="text-hairline">
            /
          </li>
          <li>
            <Link href={`/termekek/${category.slug}`} className="transition-colors hover:text-bronze">
              {category.shortName}
            </Link>
          </li>
          <li aria-hidden="true" className="text-hairline">
            /
          </li>
          <li className="text-ink">{product.name}</li>
        </ol>
      </nav>

      <section className="mx-auto max-w-content px-5 py-14 sm:px-7 md:py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <ProductGallery images={product.images} alt={product.name} />
          </FadeIn>

          <FadeIn delay={120}>
            <div>
              <span className="section-label">{category.shortName}</span>
              <h1 className="mt-4 font-serif text-4xl font-light leading-tight text-ink md:text-4xl">
                {product.name}
              </h1>
              <div className="gold-hairline mt-6" aria-hidden="true" />

              <p className="mt-6 font-serif text-3xl text-bronze">{formatPrice(product.price)}</p>
              {product.sku ? (
                <p className="mt-2 text-xs uppercase tracking-label text-faded">Cikkszám: {product.sku}</p>
              ) : null}

              {product.description ? (
                <p className="mt-6 text-base leading-relaxed text-faded">{product.description}</p>
              ) : null}

              <ul className="mt-8 space-y-3 border-t border-hairline pt-8 text-sm text-faded">
                {HIGHLIGHTS.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bronze" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <AddToCart product={product} />
              </div>

              <p className="mt-8 border-t border-hairline pt-6 text-sm text-faded">
                Kérdésed van a termékről?{" "}
                <Link href="/kapcsolat" className="text-bronze underline underline-offset-4 hover:text-bronze-dark">
                  Írj nekünk
                </Link>{" "}
                vagy hívj minket a +36 30 483 3814 számon.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="border-t border-hairline bg-cream-deep/60">
          <div className="mx-auto max-w-content px-5 py-16 sm:px-7 md:py-20 lg:px-8">
            <FadeIn>
              <div className="text-center">
                <span className="section-label">Hasonló darabok</span>
                <h2 className="mt-4 font-serif text-3xl font-light text-ink md:text-3xl">Ezek is érdekelhetnek</h2>
                <div className="gold-hairline mx-auto mt-6" aria-hidden="true" />
              </div>
            </FadeIn>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, i) => (
                <FadeIn key={item.id} delay={(i % 3) * 100}>
                  <ProductCard product={item} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
