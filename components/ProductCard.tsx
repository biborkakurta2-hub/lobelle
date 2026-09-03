import Image from "next/image";
import Link from "next/link";
import { formatPrice, type ShopProduct } from "@/lib/shop";
import ImagePlaceholder from "./ImagePlaceholder";

/** Termékkártya a kategória-rácsba: dupla keret, sarokjelölés, visszafogott hover. */
export default function ProductCard({ product }: { product: ShopProduct }) {
  const href = `/termekek/${product.category}/${product.slug}`;
  const image = product.images[0];

  return (
    <Link href={href} className="group block h-full">
      <article className="relative flex h-full flex-col border border-hairline bg-white p-2 transition-colors duration-300 group-hover:border-bronze/50">
        <span aria-hidden="true" className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-bronze" />
        <span aria-hidden="true" className="absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-bronze" />
        <span aria-hidden="true" className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-bronze" />
        <span aria-hidden="true" className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-bronze" />

        <div className="flex h-full flex-col border border-hairline/60 p-5">
          <div className="relative aspect-square w-full overflow-hidden bg-cream-deep">
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

          <h3 className="mt-5 font-serif text-lg leading-snug text-ink transition-colors duration-300 group-hover:text-bronze">
            {product.name}
          </h3>

          <div className="mt-auto pt-4">
            <p className="font-serif text-lg text-bronze">{formatPrice(product.price)}</p>
            {product.oldPrice ? (
              <p className="mt-0.5 text-xs text-faded line-through">{formatPrice(product.oldPrice)}</p>
            ) : null}
            <span className="mt-4 block text-xs uppercase tracking-label text-faded transition-colors duration-300 group-hover:text-bronze">
              Részletek
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
