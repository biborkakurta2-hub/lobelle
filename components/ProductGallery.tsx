"use client";

import Image from "next/image";
import { useState } from "react";
import ImagePlaceholder from "./ImagePlaceholder";

export type ImageSize = { width: number; height: number };

/** Ha nem ismerjük a méretet, a kínálatban leggyakoribb 3:2 arányt vesszük. */
const DEFAULT_SIZE: ImageSize = { width: 1024, height: 678 };

/**
 * Termékgaléria: nagy kép + bélyegképek.
 *
 * A nagy kép a saját képarányában jelenik meg — nincs négyzetes keretbe
 * kényszerítve, így nem marad körülötte üres sáv, és semmi nem vágódik le.
 */
export default function ProductGallery({
  images,
  alt,
  imageSizes,
}: {
  images: string[];
  alt: string;
  imageSizes?: ImageSize[];
}) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="soft-card p-4">
        <ImagePlaceholder label="Termékfotó helye" />
      </div>
    );
  }

  return (
    <div>
      <div className="soft-card p-3">
        <Image
          src={images[active]}
          alt={alt}
          width={(imageSizes?.[active] ?? DEFAULT_SIZE).width}
          height={(imageSizes?.[active] ?? DEFAULT_SIZE).height}
          sizes="(min-width: 1024px) 32rem, 92vw"
          className="h-auto w-full rounded-card"
          priority
        />
      </div>

      {images.length > 1 ? (
        <ul className="mt-4 flex flex-wrap gap-3">
          {images.map((src, index) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-label={`${index + 1}. kép megtekintése`}
                aria-current={index === active}
                className={`relative h-20 w-20 overflow-hidden rounded-card border bg-cream-deep transition-colors duration-300 ${
                  index === active ? "border-bronze" : "border-hairline hover:border-bronze/60"
                }`}
              >
                <Image src={src} alt="" fill sizes="5rem" className="object-contain p-2" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
