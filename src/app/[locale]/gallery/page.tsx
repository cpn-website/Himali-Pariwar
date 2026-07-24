"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import { Locale, translations } from "@/data/translations";
import { Badge } from "@/components/ui/Badge";
import { galleryData, GalleryItem } from "@/data/gallery";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default function GalleryPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const locale = (resolvedParams.locale || "en") as Locale;
  const t = translations[locale];

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Extract unique categories
  const categories = ["All", ...Array.from(new Set(galleryData.map((item) => item.category[locale])))];

  // Filter gallery items
  const filteredGallery = galleryData.filter((item) => {
    return activeCategory === "All" || item.category[locale] === activeCategory;
  });

  const openLightbox = (item: GalleryItem) => {
    // Find index of the item inside filteredGallery
    const idx = filteredGallery.findIndex((x) => x.id === item.id);
    if (idx !== -1) {
      setLightboxIndex(idx);
    }
  };

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    const nextIdx = (lightboxIndex - 1 + filteredGallery.length) % filteredGallery.length;
    setLightboxIndex(nextIdx);
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    const nextIdx = (lightboxIndex + 1) % filteredGallery.length;
    setLightboxIndex(nextIdx);
  };

  return (
    <div className="flex flex-col flex-grow">
      {/* Page Header */}
      <section className="bg-surface-container-low py-12 px-margin-mobile md:px-margin-desktop border-b border-outline-variant">
        <div className="max-w-container-max mx-auto text-center">
          <p className="font-sans text-label-sm text-on-surface-variant mb-stack-md tracking-wider uppercase">
            {t.home} / {t.gallery}
          </p>
          <h1 className="font-serif text-display-lg-mobile md:text-display-lg text-primary mb-stack-lg font-bold">
            {locale === "en" ? "Gallery & Photo Archives" : "फोटो ग्यालरी तथा ऐतिहासिक अभिलेख"}
          </h1>
          <p className="font-sans text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            {locale === "en"
              ? "Visual documentation of our historical restoration projects, cultural programs, and community assemblies."
              : "जैसीदेवल क्षेत्रका भौतिक सम्पदाको पुनर्निर्माण, सांस्कृतिक कार्यक्रम र सामुदायिक बैठकहरूको सचित्र अभिलेख।"}
          </p>
        </div>
      </section>

      {/* Gallery Filter & Grid */}
      <section className="py-stack-lg max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full flex-grow">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-stack-lg pb-6 border-b border-outline-variant/60">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeCategory === cat
                  ? "bg-primary text-on-primary shadow-sm"
                  : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-primary"
              }`}
            >
              {cat === "All" ? (locale === "en" ? "All" : "सबै") : cat}
            </button>
          ))}
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item)}
              className="bg-surface-container-lowest border border-outline-variant p-3 rounded-lg flex flex-col group cursor-pointer shadow-heritage hover:-translate-y-1 hover:border-primary/40 transition-all duration-300"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-surface-variant rounded mb-3">
                <Image
                  src={item.url}
                  alt={item.caption[locale]}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-103 transition-transform duration-500"
                />
              </div>
              <div className="flex justify-between items-start gap-2">
                <p className="font-sans text-[11px] text-on-surface-variant leading-relaxed line-clamp-2">
                  {item.caption[locale]}
                </p>
                <Badge variant="outline" className="text-[8px] flex-shrink-0 px-1.5 py-0.5 mt-0.5">
                  {item.category[locale]}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 bg-black/95 z-50 flex flex-col justify-between p-4 md:p-8 animate-fade-in">
          {/* Top Panel: Header & Close */}
          <div className="flex justify-between items-center text-white">
            <span className="font-sans text-xs font-semibold">
              {filteredGallery[lightboxIndex].category[locale]} ({lightboxIndex + 1} / {filteredGallery.length})
            </span>
            <button
              onClick={() => setLightboxIndex(null)}
              className="text-white hover:text-primary-fixed-dim focus:outline-none"
            >
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>
          </div>

          {/* Main Panel: Image & Navigation */}
          <div className="flex-grow flex items-center justify-between gap-4 max-w-5xl mx-auto w-full relative">
            {/* Left Button */}
            <button
              onClick={handlePrev}
              className="text-white hover:text-primary-fixed-dim bg-white/10 hover:bg-white/20 p-2.5 rounded-full z-10 transition-colors focus:outline-none"
            >
              <span className="material-symbols-outlined text-3xl">chevron_left</span>
            </button>

            {/* Central Image */}
            <div className="relative w-full h-[60vh] md:h-[70vh] flex justify-center items-center">
              <Image
                src={filteredGallery[lightboxIndex].url}
                alt={filteredGallery[lightboxIndex].caption[locale]}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            {/* Right Button */}
            <button
              onClick={handleNext}
              className="text-white hover:text-primary-fixed-dim bg-white/10 hover:bg-white/20 p-2.5 rounded-full z-10 transition-colors focus:outline-none"
            >
              <span className="material-symbols-outlined text-3xl">chevron_right</span>
            </button>
          </div>

          {/* Bottom Panel: Caption */}
          <div className="text-center text-white max-w-xl mx-auto pb-4">
            <p className="font-serif text-sm md:text-base leading-relaxed text-surface-variant font-medium">
              {filteredGallery[lightboxIndex].caption[locale]}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
