"use client";

import Image from "next/image";
import { useState } from "react";
import ImagePlaceholder from "./ImagePlaceholder";

/** Termékgaléria: nagy kép + bélyegképek, lágyan lekerekítve. */
export default function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
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
      <div className="soft-card p-4">
        <div className="relative aspect-square w-full overflow-hidden rounded-card bg-cream-deep">
          <Image
            src={images[active]}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 32rem, 90vw"
            className="object-contain p-6"
            priority
          />
        </div>
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
