"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import { Locale, translations } from "@/data/translations";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { newsData, NewsItem } from "@/data/news";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default function NewsPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const locale = (resolvedParams.locale || "en") as Locale;
  const t = translations[locale];

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);

  // Extract unique categories
  const categories = ["All", ...Array.from(new Set(newsData.map((item) => item.category[locale])))];

  // Filter news items
  const filteredNews = newsData.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category[locale] === activeCategory;
    const matchesSearch =
      item.title[locale].toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary[locale].toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content[locale].toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col flex-grow">
      {/* Page Header */}
      <section className="bg-surface-container-low py-12 px-margin-mobile md:px-margin-desktop border-b border-outline-variant">
        <div className="max-w-container-max mx-auto text-center">
          <p className="font-sans text-label-sm text-on-surface-variant mb-stack-md tracking-wider uppercase">
            {t.home} / {t.news}
          </p>
          <h1 className="font-serif text-display-lg-mobile md:text-display-lg text-primary mb-stack-lg font-bold">
            {locale === "en" ? "News & Announcements" : "ताजा समाचार तथा सूचना पाटी"}
          </h1>
          <p className="font-sans text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            {locale === "en"
              ? "Follow updates on our temple restoration work, community health programs, and cultural events."
              : "जैसीदेवल क्षेत्रका सम्पदा पुनर्निर्माण, स्वास्थ्य शिविर र सांस्कृतिक गतिविधिबारे नियमित अपडेट रहनुहोस्।"}
          </p>
        </div>
      </section>

      {/* Filters and List */}
      <section className="py-stack-lg max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full flex-grow">
        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-stack-lg pb-6 border-b border-outline-variant/60">
          {/* Category Chips */}
          <div className="flex flex-wrap gap-2">
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

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={locale === "en" ? "Search news..." : "समाचार खोज्नुहोस्..."}
              className="w-full bg-surface-container-low border border-outline-variant text-on-surface rounded py-2.5 pl-4 pr-10 focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none font-sans text-xs"
            />
            <span className="material-symbols-outlined absolute right-3 top-2 text-on-surface-variant text-lg">
              search
            </span>
          </div>
        </div>

        {/* News Grid */}
        {filteredNews.length === 0 ? (
          <div className="text-center py-16 text-on-surface-variant text-sm font-medium">
            {locale === "en" ? "No news found matching your query." : "खोजिएको विवरण फेला परेन।"}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {filteredNews.map((news) => (
              <Card key={news.id} className="flex flex-col justify-between h-[450px]">
                <div className="space-y-stack-md">
                  <div className="relative aspect-video rounded overflow-hidden border border-outline-variant">
                    <Image
                      src={news.image}
                      alt={news.title[locale]}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex justify-between items-center text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">
                    <span>{new Date(news.date).toLocaleDateString(locale, { dateStyle: "medium" })}</span>
                    <Badge variant="primary" className="px-1.5 py-0.5 text-[9px]">
                      {news.category[locale]}
                    </Badge>
                  </div>

                  <h3 className="font-serif text-title-lg text-primary font-semibold line-clamp-2 hover:underline cursor-pointer" onClick={() => setSelectedArticle(news)}>
                    {news.title[locale]}
                  </h3>
                  
                  <p className="font-sans text-xs text-on-surface-variant leading-relaxed line-clamp-3">
                    {news.summary[locale]}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedArticle(news)}
                  className="text-primary font-sans text-xs font-bold inline-flex items-center gap-1 hover:underline mt-4 text-left self-start"
                >
                  {t.readMore}
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto pt-24 pb-12">
          <div className="bg-surface border border-outline-variant rounded-lg max-w-2xl w-full p-stack-lg shadow-2xl animate-scale-in max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-start gap-4 mb-stack-md">
              <div>
                <Badge variant="primary" className="mb-2">
                  {selectedArticle.category[locale]}
                </Badge>
                <h2 className="font-serif text-headline-md text-primary font-bold">
                  {selectedArticle.title[locale]}
                </h2>
                <div className="text-[10px] text-on-surface-variant font-bold uppercase mt-2">
                  {locale === "en" ? "Published on " : "प्रकाशित मिति: "}{" "}
                  {new Date(selectedArticle.date).toLocaleDateString(locale, { dateStyle: "long" })}
                </div>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-on-surface-variant hover:text-primary focus:outline-none"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>

            <div className="relative aspect-video rounded overflow-hidden border border-outline-variant mb-stack-lg">
              <Image
                src={selectedArticle.image}
                alt={selectedArticle.title[locale]}
                fill
                sizes="(max-width: 768px) 100vw, 700px"
                className="object-cover"
              />
            </div>

            <p className="font-sans text-body-lg text-secondary font-medium border-l-4 border-primary pl-4 mb-stack-lg leading-relaxed">
              {selectedArticle.summary[locale]}
            </p>

            <div className="font-sans text-body-md text-on-surface-variant leading-relaxed space-y-4 pt-2">
              <p>{selectedArticle.content[locale]}</p>
            </div>

            <div className="mt-8 pt-4 border-t border-outline-variant/60 flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="bg-primary text-on-primary font-sans text-label-md px-6 py-2.5 rounded hover:opacity-90 transition-opacity"
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
