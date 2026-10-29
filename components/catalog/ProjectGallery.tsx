"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Галерея проекта: большое фото + превью-лентка */
export function ProjectGallery({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = React.useState(0);
  const safe = images.length > 0 ? images : ["/images/placeholder.svg"];
  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + safe.length) % safe.length);

  return (
    // min-w-0: иначе лента превью (shrink-0) раздувает grid-колонку на мобильном
    <div className="min-w-0 space-y-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-primary-light shadow-soft">
        <AnimatePresence mode="sync">
          <motion.div
            key={safe[index]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <Image
              src={safe[index]}
              alt={`${title} — фото ${index + 1}`}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </AnimatePresence>

        {safe.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Предыдущее фото"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-forest backdrop-blur-sm transition-colors hover:bg-primary"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Следующее фото"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-forest backdrop-blur-sm transition-colors hover:bg-primary"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {safe.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {safe.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Фото ${i + 1}`}
              className={cn(
                "relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-all",
                i === index ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
              )}
            >
              <Image src={img} alt="" fill className="object-cover" sizes="96px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
