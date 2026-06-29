"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function SmartLockGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  const [origin, setOrigin] = useState("50% 50%");
  const [zoom, setZoom] = useState(false);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        className="relative aspect-square cursor-zoom-in overflow-hidden rounded-2xl border bg-card shadow-sm"
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={handleMove}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[active]}
          alt={alt}
          className="size-full object-contain p-4 transition-transform duration-200 ease-out"
          style={{
            transformOrigin: origin,
            transform: zoom ? "scale(1.6)" : "scale(1)",
          }}
        />
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2 sm:grid-cols-6">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`ფოტო ${i + 1}`}
              className={cn(
                "aspect-square overflow-hidden rounded-lg border-2 bg-card transition",
                i === active
                  ? "border-brand-accent"
                  : "border-transparent hover:border-brand-accent/40",
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`${alt} ${i + 1}`}
                className="size-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
