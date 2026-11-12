import Image from "next/image";
import Link from "next/link";
import { formatPrice, type ShopProduct } from "@/lib/shop";
import ImagePlaceholder from "./ImagePlaceholder";

/** Termékkártya: lágy fehér kártya, visszafogott hover. */
export default function ProductCard({ product }: { product: ShopProduct }) {
  const href = `/termekek/${product.category}/${product.slug}`;
  const image = product.images[0];

  return (
    <Link href={href} className="group block h-full">
      <article className="soft-card flex h-full flex-col p-5 transition-shadow duration-300 group-hover:shadow-soft">
        <div className="relative aspect-square w-full overflow-hidden rounded-card bg-cream-deep">
          {image ? (
            <Image
              src={image}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 90vw"
              className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <ImagePlaceholder label="Termékfotó helye" />
          )}
        </div>

        <h3 className="mt-5 font-serif text-2xl font-light leading-snug text-ink transition-colors duration-300 group-hover:text-bronze">
          {product.name}
        </h3>

        <div className="mt-auto pt-4">
          <p className="text-lg text-bronze">{formatPrice(product.price)}</p>
          {product.oldPrice ? (
            <p className="mt-0.5 text-sm text-faded line-through">{formatPrice(product.oldPrice)}</p>
          ) : null}
          <span className="mt-4 block text-xs uppercase tracking-label text-faded transition-colors duration-300 group-hover:text-bronze">
            Részletek
          </span>
        </div>
      </article>
    </Link>
  );
}
