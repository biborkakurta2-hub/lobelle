"use client";

import Image from "next/image";
import { useState } from "react";
import ImagePlaceholder from "./ImagePlaceholder";

/** Termékgaléria: nagy kép + bélyegképek, lightbox nélkül, visszafogottan. */
export default function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="border border-hairline bg-white p-2">
        <div className="border border-hairline/60 p-4">
          <ImagePlaceholder label="Termékfotó helye" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="relative border border-hairline bg-white p-2">
        <span aria-hidden="true" className="absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-bronze" />
        <span aria-hidden="true" className="absolute right-0 top-0 h-5 w-5 border-r-2 border-t-2 border-bronze" />
        <span aria-hidden="true" className="absolute bottom-0 left-0 h-5 w-5 border-b-2 border-l-2 border-bronze" />
        <span aria-hidden="true" className="absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-bronze" />
        <div className="relative aspect-square w-full border border-hairline/60 bg-cream-deep">
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
                className={`relative h-20 w-20 border bg-cream-deep transition-colors duration-300 ${
                  index === active ? "border-bronze" : "border-hairline hover:border-bronze/60"
                }`}
              >
                <Image src={src} alt="" fill sizes="5rem" className="object-contain p-1.5" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
