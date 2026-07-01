"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Fills its (relative, overflow-hidden) parent and auto-cycles through the
 * given images every 5s with a cross-fade. Shows dots when there are several.
 */
export function CyclingImage({
  images,
  alt,
  imgFit,
}: {
  images: string[];
  alt: string;
  imgFit: string;
}) {
  const [idx, setIdx] = useState(0);

  // first photo stays 7s, the rest 2s each
  useEffect(() => {
    if (images.length <= 1) return;
    const delay = idx === 0 ? 7000 : 2000;
    const id = setTimeout(
      () => setIdx((i) => (i + 1) % images.length),
      delay,
    );
    return () => clearTimeout(id);
  }, [idx, images.length]);

  return (
    <>
      {images.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt={alt}
          className={cn(
            "absolute inset-0 size-full transition-opacity duration-700 ease-in-out",
            imgFit === "contain" ? "object-contain p-2" : "object-cover",
            i === idx ? "opacity-100" : "opacity-0",
          )}
        />
      ))}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1">
          {images.map((src, i) => (
            <span
              key={src}
              className={cn(
                "size-1.5 rounded-full transition-all",
                i === idx ? "w-4 bg-white" : "bg-white/50",
              )}
            />
          ))}
        </div>
      )}
    </>
  );
}
