"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { Locale, translations } from "@/data/translations";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { eventsData, EventItem } from "@/data/events";
import { siteConfig } from "@/config/siteConfig";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default function EventsPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const locale = (resolvedParams.locale || "en") as Locale;
  const t = translations[locale];

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  // Extract unique categories
  const categories = ["All", ...Array.from(new Set(eventsData.map((e) => e.category[locale])))];

  // Filter events
  const filteredEvents = eventsData.filter((e) => {
    return activeCategory === "All" || e.category[locale] === activeCategory;
  });

  return (
    <div className="flex flex-col flex-grow">
      {/* Page Header */}
      <section className="bg-surface-container-low py-12 px-margin-mobile md:px-margin-desktop border-b border-outline-variant">
        <div className="max-w-container-max mx-auto text-center">
          <p className="font-sans text-label-sm text-on-surface-variant mb-stack-md tracking-wider uppercase">
            {t.home} / {t.events}
          </p>
          <h1 className="font-serif text-display-lg-mobile md:text-display-lg text-primary mb-stack-lg font-bold">
            {locale === "en" ? "Events & Activities Calendar" : "सामुदायिक कार्यक्रम तथा जात्रा तालिका"}
          </h1>
          <p className="font-sans text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            {locale === "en"
              ? "Join our upcoming cleanups, festival planning, health clinics, and sports tournaments."
              : "जैसीदेवल क्षेत्रमा आयोजना हुने सरसफाई, स्वास्थ्य शिविर, जात्रा रथ तान्ने तालिकाहरूमा सहभागी हुनुहोस्।"}
          </p>
        </div>
      </section>

      {/* Main Content */}
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

        {/* Events Layout: Two-Column Split (List vs Calendar Graphic) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-margin-desktop">
          {/* Left Columns: Event Cards */}
          <div className="lg:col-span-2 space-y-stack-md">
            {filteredEvents.length === 0 ? (
              <div className="text-center py-12 text-on-surface-variant text-sm font-medium">
                {locale === "en" ? "No events scheduled in this category." : "यस विधामा कुनै कार्यक्रम तय गरिएको छैन।"}
              </div>
            ) : (
              filteredEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className="flex flex-col sm:flex-row gap-4 p-stack-md rounded-lg bg-surface-container-lowest border border-outline-variant shadow-heritage hover:border-primary/55 hover:shadow-lg cursor-pointer transition-all duration-300"
                >
                  {/* Calendar Date Block */}
                  <div className="flex-shrink-0 w-16 h-20 bg-primary/5 border border-primary/20 rounded flex flex-col items-center justify-center text-primary font-bold">
                    <span className="text-2xl leading-none">{event.date.split("-")[2]}</span>
                    <span className="text-xs uppercase tracking-wider mt-1.5">
                      {new Date(event.date).toLocaleString(locale, { month: "short" })}
                    </span>
                    <span className="text-[9px] text-on-surface-variant font-medium mt-1">
                      {event.date.split("-")[0]}
                    </span>
                  </div>

                  {/* Event Summary Details */}
                  <div className="flex-grow space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <Badge
                        variant={
                          event.status === "completed"
                            ? "outline"
                            : event.status === "cancelled"
                            ? "outline"
                            : "secondary"
                        }
                        className="text-[9px]"
                      >
                        {event.category[locale]}
                      </Badge>
                      
                      {event.status !== "upcoming" && (
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${
                          event.status === "completed" ? "text-secondary" : "text-error"
                        }`}>
                          {event.status === "completed" ? (locale === "en" ? "Finished" : "सम्पन्न") : (locale === "en" ? "Cancelled" : "रद्द")}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="font-serif text-title-lg text-primary font-semibold hover:underline">
                      {event.title[locale]}
                    </h3>
                    
                    <div className="flex flex-wrap gap-x-gutter gap-y-1 text-xs text-on-surface-variant font-medium">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">location_on</span>
                        {event.location[locale]}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right Column: Month Guide / Calendar Highlight */}
          <div className="space-y-stack-lg">
            <div className="bg-surface-container-low border border-outline-variant rounded-lg p-stack-lg space-y-4 shadow-heritage">
              <h3 className="font-serif text-title-lg text-secondary font-bold border-b border-outline-variant pb-2">
                {locale === "en" ? "Planning Guide" : "कार्यक्रम परिचालन निर्देशिका"}
              </h3>
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                {locale === "en"
                  ? "All events listed here are open to community participation. In case of weather delays or structural safety adjustments, updates will be posted instantly."
                  : "यहाँ सूचीबद्ध सबै कार्यक्रमहरूमा सामुदायिक सहभागिताको स्वागत गरिन्छ। मौसम अवरोध वा अन्य सुरक्षा कारणले कार्यक्रम परिवर्तन भएमा तत्काल जानकारी दिइनेछ।"}
              </p>
              
              <div className="border-l-2 border-primary pl-3 py-1 space-y-1">
                <h4 className="font-sans font-bold text-xs text-on-surface">
                  {locale === "en" ? "Need Event Support?" : "कार्यक्रम सम्बन्धी सहयोग आवश्यक?"}
                </h4>
                <p className="font-sans text-[10px] text-on-surface-variant leading-normal">
                  {locale === "en"
                    ? "Contact our organizing desk or General Secretary's volunteer committee:"
                    : "हाम्रो आयोजक डेस्क वा महासचिवको स्वयंसेवक समितिलाई सम्पर्क गर्नुहोस्:"}{" "}
                  <strong className="text-primary">{siteConfig.contact.phoneFormatted}</strong>
                </p>
              </div>
            </div>
            
            <div className="border border-outline-variant rounded-lg p-stack-lg bg-surface-container-lowest shadow-heritage flex flex-col items-center text-center space-y-3">
              <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>
                calendar_month
              </span>
              <h4 className="font-serif text-title-lg text-primary font-bold">
                {locale === "en" ? "Indra Jatra Countdown" : "इन्द्रजात्रा रथ पर्व गणना"}
              </h4>
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                {locale === "en"
                  ? "Chariot pulling is scheduled for September 24. Volunteer briefing sessions start in early September. Sign up as a marshal today!"
                  : "आगामी असोजमा रथ तान्ने तालिका तय गरिएको छ। स्वयंसेवक ब्रिफिङ कक्षाहरू भदौ अन्तिम साता सुरु हुनेछन्। आजै मार्शलको रूपमा दर्ता हुनुहोस्!"}
              </p>
              <Link
                href={`/${locale}/volunteer`}
                className="bg-primary text-on-primary font-sans text-xs font-bold px-6 py-2.5 rounded hover:opacity-95 transition-opacity inline-block w-full"
              >
                {locale === "en" ? "Register as Chariot Marshal" : "रथ स्वयंसेवक दर्ता"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details Dialog Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-surface border border-outline-variant rounded-lg max-w-lg w-full p-stack-lg shadow-2xl animate-scale-in">
            <div className="flex justify-between items-start gap-4 mb-stack-md">
              <div>
                <Badge variant="secondary" className="mb-2">
                  {selectedEvent.category[locale]}
                </Badge>
                <h2 className="font-serif text-headline-md text-primary font-bold">
                  {selectedEvent.title[locale]}
                </h2>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-on-surface-variant hover:text-primary focus:outline-none"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>

            <div className="space-y-4 font-sans text-xs text-on-surface-variant border-y border-outline-variant/60 py-stack-md my-stack-md">
              <div className="flex justify-between items-center pb-2 border-b border-outline-variant/30">
                <span className="font-bold text-on-surface">{locale === "en" ? "Date" : "मिति"}</span>
                <span>{new Date(selectedEvent.date).toLocaleDateString(locale, { dateStyle: "long" })}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-outline-variant/30">
                <span className="font-bold text-on-surface">{locale === "en" ? "Time" : "समय"}</span>
                <span className="font-medium text-primary">{selectedEvent.time}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-outline-variant/30">
                <span className="font-bold text-on-surface">{locale === "en" ? "Location" : "स्थान"}</span>
                <span>{selectedEvent.location[locale]}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-on-surface">{locale === "en" ? "Status" : "अवस्था"}</span>
                <Badge variant={selectedEvent.status === "upcoming" ? "secondary" : "outline"}>
                  {selectedEvent.status === "upcoming" ? (locale === "en" ? "Open for Registration" : "दर्ता खुल्ला") : (locale === "en" ? "Finished" : "सम्पन्न")}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-serif text-sm font-semibold text-secondary">
                {locale === "en" ? "Description" : "विवरण"}
              </h4>
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                {selectedEvent.description[locale]}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-outline-variant/60 flex justify-end gap-stack-md">
              <button
                onClick={() => setSelectedEvent(null)}
                className="border border-outline text-on-surface-variant font-sans text-label-md px-5 py-2.5 rounded hover:bg-surface-container-low transition-colors"
              >
                {t.close}
              </button>
              {selectedEvent.status === "upcoming" && (
                <Link
                  href={`/${locale}/volunteer`}
                  onClick={() => setSelectedEvent(null)}
                  className="bg-primary text-on-primary font-sans text-label-md px-6 py-2.5 rounded hover:opacity-90 transition-opacity"
                >
                  {locale === "en" ? "Sign Up to Participate" : "सहभागिता जनाउनुहोस्"}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
