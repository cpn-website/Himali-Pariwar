"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { Locale, translations } from "@/data/translations";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { eventsData, EventItem } from "@/data/events";

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

  // Map categories to material icons
  const getEventIcon = (categoryEn: string) => {
    switch (categoryEn.toLowerCase()) {
      case "heritage care":
      case "heritage preservation":
        return "architecture";
      case "health care":
      case "emergency care":
        return "medical_services";
      case "festival":
      case "cultural programs":
        return "celebration";
      case "meetings":
        return "groups";
      default:
        return "calendar_month";
    }
  };

  // Symmetrical highlights for the right-column list (Core Achievements style)
  const impactHighlights = [
    {
      num: "01",
      title: { en: "Disaster Preparedness", ne: "विपद् पूर्वतयारी परिचालन" },
      desc: {
        en: "Mobilizing over 120 trained first responders during major public gatherings and earthquake rescue mock drills.",
        ne: "स्थानीय जात्रा र सार्वजनिक सभाहरूमा १२० भन्दा बढी तालिमप्राप्त स्वयंसेवकहरूलाई प्राथमिक उपचार र उद्धार टोलीमा परिचालन।"
      }
    },
    {
      num: "02",
      title: { en: "Apprenticeship Paving", ne: "परम्परागत शिल्पको पुस्तान्तरण" },
      desc: {
        en: "Successfully trained 35 local youth apprentices under senior stone carvers during the Jaishidewal courtyard rebuilding phase.",
        ne: "जैसीदेवल चोक पुनर्निर्माणको चरणमा ३५ भन्दा बढी युवा सिकारुहरूलाई वरिष्ठ शिल्पीहरू मातहत परम्परागत काष्ठकला प्रशिक्षण।"
      }
    },
    {
      num: "03",
      title: { en: "Health Campaign Reach", ne: "निःशुल्क स्वास्थ्य सेवा पहुँच" },
      desc: {
        en: "Provided free diagnostics and baseline medicines to over 850 neighborhood elders through seasonal health clinics.",
        ne: "मौसमी स्वास्थ्य शिविरहरू मार्फत जैसीदेवलका ८५० भन्दा बढी जेष्ठ नागरिकहरूलाई निःशुल्क स्वास्थ्य परीक्षण र औषधि वितरण।"
      }
    },
    {
      num: "04",
      title: { en: "Bilingual Coordination", ne: "द्विभाषिक सामुदायिक सम्पर्क" },
      desc: {
        en: "Conducting transparent ward assemblies in both Nepali and English to record municipal complaints and budget allocations.",
        ne: "स्थानीय गुनासो सुन्न र बजेट बाँडफाँड छलफल गर्न नेपाली र अंग्रेजी दुवै भाषामा पारदर्शी सामुदायिक भेला सञ्चालन।"
      }
    }
  ];

  return (
    <div className="flex flex-col flex-grow">
      {/* Page Header */}
      <section className="bg-surface-container-low py-12 px-margin-mobile md:px-margin-desktop border-b border-outline-variant">
        <div className="max-w-container-max mx-auto text-center animate-fade-in-up">
          <p className="font-sans text-label-sm text-on-surface-variant mb-stack-md tracking-wider uppercase">
            {t.home} / {t.events}
          </p>
          <h1 className="font-serif text-display-lg-mobile md:text-display-lg text-primary mb-stack-lg font-bold">
            {locale === "en" ? "Community Events & Timeline" : "सामुदायिक कार्यक्रम तथा जात्रा तालिका"}
          </h1>
          <p className="font-sans text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            {locale === "en"
              ? "Track our upcoming assemblies, cultural festivals, health clinics, and physical training schedules."
              : "जैसीदेवल क्षेत्रमा आयोजना हुने सरसफाई, स्वास्थ्य शिविर, जात्रा रथ तान्ने तालिकाहरू र बैठकहरूको विवरण।"}
          </p>
        </div>
      </section>

      {/* Main Content Split Layout */}
      <section className="py-stack-lg max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full flex-grow">
        {/* Category Filters Bar */}
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

        {/* Timeline vs Achievements Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-margin-desktop items-start">
          
          {/* Left Column (2/3 width): Resume-Style Timeline */}
          <div className="lg:col-span-2 relative pl-8 border-l-2 border-outline-variant space-y-12 py-2">
            {filteredEvents.length === 0 ? (
              <div className="text-center py-12 text-on-surface-variant text-sm font-medium">
                {locale === "en" ? "No events scheduled in this category." : "यस विधामा कुनै कार्यक्रम तय गरिएको छैन।"}
              </div>
            ) : (
              filteredEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className="relative group cursor-pointer animate-fade-in-up"
                >
                  {/* Timeline Node Badge Icon */}
                  <div className="absolute -left-[50px] top-1.5 w-9 h-9 rounded-full bg-surface border-2 border-primary flex items-center justify-center text-primary shadow-sm transition-transform duration-300 group-hover:scale-110">
                    <span className="material-symbols-outlined text-sm font-bold">
                      {getEventIcon(event.category.en)}
                    </span>
                  </div>

                  {/* Event Time Label (Resume-style top date) */}
                  <div className="text-[10px] font-sans font-bold text-secondary uppercase tracking-widest mb-1.5 flex items-center gap-2">
                    <span>
                      {new Date(event.date).toLocaleDateString(locale, { year: "numeric", month: "short", day: "numeric" })}
                    </span>
                    <span>&bull;</span>
                    <span className="text-primary">{event.time}</span>
                  </div>

                  {/* Main Event Card Content */}
                  <Card hoverEffect className="p-stack-md bg-surface-container-lowest border border-outline-variant transition-all hover:shadow-lg">
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <h3 className="font-serif text-title-lg text-primary font-bold group-hover:underline">
                        {event.title[locale]}
                      </h3>
                      <Badge variant="outline" className="text-[9px] uppercase">
                        {event.category[locale]}
                      </Badge>
                    </div>

                    <p className="font-sans text-xs text-on-surface-variant leading-relaxed line-clamp-2 mb-3">
                      {event.description[locale]}
                    </p>

                    <div className="flex flex-wrap gap-x-gutter gap-y-1 text-[10px] font-sans font-semibold text-secondary">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">location_on</span>
                        {event.location[locale]}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">event_available</span>
                        <span className="capitalize">{event.status === "upcoming" ? (locale === "en" ? "Register Open" : "दर्ता खुल्ला") : (locale === "en" ? "Completed" : "सम्पन्न")}</span>
                      </span>
                    </div>
                  </Card>
                </div>
              ))
            )}
          </div>

          {/* Right Column (1/3 width): CORE ACHIEVEMENTS & IMPACT Card (From user screenshot) */}
          <div className="space-y-stack-lg">
            <div className="bg-surface-container-low border border-outline-variant rounded-lg p-stack-lg shadow-heritage animate-fade-in-up">
              <h3 className="font-serif text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-6 border-b border-outline-variant/60 pb-2">
                {locale === "en" ? "CORE ACHIEVEMENTS & IMPACT" : "मुख्य उपलब्धि तथा सामुदायिक प्रभाव"}
              </h3>
              
              <div className="space-y-6">
                {impactHighlights.map((highlight, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    {/* Big Gold/Amber Numbers matching screenshot */}
                    <span className="font-serif text-2xl font-bold text-primary/80 leading-none">
                      {highlight.num}
                    </span>
                    <div className="space-y-1">
                      <h4 className="font-serif text-xs font-bold text-secondary">
                        {highlight.title[locale]}
                      </h4>
                      <p className="font-sans text-[10px] text-on-surface-variant leading-relaxed">
                        {highlight.desc[locale]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick RSVP CTA card */}
            <div className="border border-outline-variant rounded-lg p-stack-lg bg-surface-container-lowest shadow-heritage flex flex-col items-center text-center space-y-3">
              <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>
                verified
              </span>
              <h4 className="font-serif text-title-lg text-primary font-bold">
                {locale === "en" ? "Volunteer Verification" : "स्वयंसेवक प्रमाणीकरण व्यवस्था"}
              </h4>
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                {locale === "en"
                  ? "Participated in one of our community events? Request a formal certificate of appreciation signed by the General Secretary."
                  : "के तपाईंले हाम्रा कार्यक्रमहरूमा भाग लिनुभएको छ? महासचिवद्वारा हस्ताक्षरित औपचारिक स्वयंसेवक प्रशंसापत्र अनुरोध गर्नुहोस्।"}
              </p>
              <Link
                href={`/${locale}/volunteer`}
                className="bg-primary text-on-primary font-sans text-xs font-bold px-6 py-2.5 rounded hover:opacity-95 transition-opacity inline-block w-full"
              >
                {locale === "en" ? "Apply for Certificate" : "प्रशंसापत्रका लागि दर्ता"}
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
