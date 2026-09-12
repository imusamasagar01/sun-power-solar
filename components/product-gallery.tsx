"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const gallery = images.length > 0 ? images : ["/images/product-solar-panel.jpg"];
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="group relative aspect-4/3 overflow-hidden rounded-3xl border border-line bg-card shadow-card">
        <Image
          key={gallery[active]}
          src={gallery[active]}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="animate-fade-in object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      {gallery.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
          {gallery.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`View image ${index + 1}`}
              className={cn(
                "relative aspect-square overflow-hidden rounded-xl border-2 bg-card transition-all duration-200",
                index === active
                  ? "border-brand-600 shadow-glow"
                  : "border-line opacity-70 hover:-translate-y-0.5 hover:border-brand-200 hover:opacity-100",
              )}
            >
              <Image src={image} alt="" fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
