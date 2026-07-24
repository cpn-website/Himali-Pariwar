import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Locale, translations } from "@/data/translations";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { siteConfig } from "@/config/siteConfig";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = translations[locale as Locale];
  return {
    title: t.culture + " | " + siteConfig.name[locale as Locale],
    description: "Learn about our heritage preservation initiatives, including woodcraft restoration, traditional instruments classes, and Indra Jatra organization.",
  };
}

export default async function CultureProgramPage({ params }: PageProps) {
  const resolvedParams = await params;
  const locale = (resolvedParams.locale || "en") as Locale;
  const t = translations[locale];

  // Specific projects
  const projects = [
    {
      title: { en: "Temple Restoration", ne: "मन्दिर जीर्णोद्धार" },
      badge: { en: "Active Project", ne: "सक्रिय आयोजना" },
      desc: {
        en: "Restoring the 17th-century woodcraft and structural integrity of the Jaishidewal temple complex using traditional materials and techniques.",
        ne: "परम्परागत प्रविधि तथा सामग्रीको प्रयोग गरी जैसीदेवल मन्दिर परिसरको १७ औं शताब्दीको काष्ठकला र काठका स्तम्भहरूको मर्मत सम्भार।",
      },
      meta: { en: "Jaishidewal Complex", ne: "जैसीदेवल परिसर" },
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAygFvbbqJB_fa_V2A_Fl4SHw-rgNMKLfLbmE00LGYCSdmiLxCTlgJeRjOiwygNqC-SAnxoQkzmW4p6O_hNoG-p9kygr5if7-fLVGMAaPxFFsXyEJyVe4PsdtK48G0Op-6vREhdjhOLZmFT-Fz9lX9-sVpDR4lug3Cn_CcNEBxPPPPDetQLhMhaFj2QV2KUbKqoEN1Dc-eA6iWA8Ih4EDgOwtybSpjJgs1ImdKFVbA_b1GmeclbIqNm97AI3aoF84yNuBPW01Z5kOE",
    },
    {
      title: { en: "Music & Dance Classes", ne: "सङ्गीत तथा नृत्य प्रशिक्षण" },
      badge: { en: "Weekly Sessions", ne: "साप्ताहिक प्रशिक्षण" },
      desc: {
        en: "Weekly workshops passing down the intricate rhythms of Dhime and traditional Charya dance to the youth of the community.",
        ne: "समुदायका बालबालिका तथा युवाहरूका लागि साप्ताहिक रूपमा सञ्चालन गरिने धिमे बाजा र परम्परागत चर्या नृत्य तालिम।",
      },
      meta: { en: "Every Saturday", ne: "प्रत्येक शनिबार" },
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFbs7ocvoUlU_f8VD_g59yvH85O6IjI78bI4eVxWm9MBmOHHcPH_88UB_8ew6z7bv4SYsFha7Pz6ft6J3T-6rcv6ggTNpV2tH_m-89LgkMxTYQbQZcgDZqGY1tWlSTGh_HBIQSngGgpcmGmIFtO0kRXMJAf2SGapWnSBHF_VcqFNyrZ7mVyfIlRbNtvDUh3wghbbrLkr5vOmU3EUugtyIrNxciorVATJkSOONKE9J1x-V5CJbhV45aWGA1zHf91yM6ziJ9HV4yOVY",
    },
    {
      title: { en: "Jatra Committee Support", ne: "जात्रा व्यवस्थापन सहयोग" },
      badge: { en: "45 Active Members", ne: "४५ सक्रिय सदस्य" },
      desc: {
        en: "Organizing and funding the logistics, chariot construction, and community feasts for the annual local festivals including Indra Jatra.",
        ne: "इन्द्रजात्रा लगायतका वार्षिक स्थानीय चाडपर्वहरूका लागि रथ निर्माण, आर्थिक व्यवस्थापन र स्वयंसेवक परिचालन कार्य।",
      },
      meta: { en: "Indra Jatra", ne: "इन्द्रजात्रा" },
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAj4zQU8ZwLqEIRiJJ1b96l6mz6HUeDOfVON_bYYRLnfklTR2kfJowWZWHkLY5d912s-ri7oUtlrw3xXM4G0AEzHcVktJfWo_nl7chvtNzG_aT7EsK3U0Hu9L9Um9Hp3REjydzfGV9emR9hzrbKsQ7GE3H0FIUoHk-sKfPj9WnRrbFHZ2UL-DRakqRfv7IW-kTkbaFxJTeJHx878kz35loywWiFIkL7MEBW3W8uiQPc5pds8GLirB727lyjhQ9gJIMx7W-WXSKXqs",
    },
  ];

  return (
    <div className="flex flex-col flex-grow">
      {/* Page Header Banner */}
      <header className="relative w-full py-20 bg-tertiary-fixed border-b border-outline-variant overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "radial-gradient(#8e706b 1px, transparent 1px)", backgroundSize: "24px 24px" }}></div>
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 text-center">
          <Badge variant="primary" className="mb-stack-md">
            {locale === "en" ? "Programs & Initiatives" : "कार्यक्रम तथा पहलहरू"}
          </Badge>
          <h1 className="font-serif text-display-lg-mobile md:text-display-lg text-tertiary mb-stack-md max-w-4xl mx-auto leading-tight font-bold">
            {locale === "en" ? "Guardians of Newari Tradition" : "नेवारी सांस्कृतिक परम्पराको संरक्षक"}
          </h1>
          <p className="font-sans text-body-lg text-tertiary/90 max-w-2xl mx-auto">
            {locale === "en"
              ? "Committed to the preservation, education, and celebration of our cultural heritage for future generations."
              : "भावी पुस्ताका लागि हाम्रो सांस्कृतिक सम्पदाको संरक्षण, शिक्षा र उत्सवप्रति पूर्ण प्रतिबद्ध।"}
          </p>
        </div>
      </header>

      {/* Projects Grid */}
      <section className="py-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex justify-between items-end mb-stack-lg border-b border-outline-variant pb-2">
          <h2 className="font-serif text-headline-md text-primary font-bold">
            {locale === "en" ? "Preservation Projects" : "हाम्रा संरक्षण अभियानहरू"}
          </h2>
          <Link
            href={`/${locale}/gallery`}
            className="font-sans text-label-md text-secondary hover:text-primary transition-colors flex items-center gap-1 font-semibold"
          >
            {locale === "en" ? "View Photo Archives" : "फोटो ग्यालरी हेर्नुहोस्"}{" "}
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="bg-surface-container-lowest border border-outline-variant p-stack-md rounded-lg flex flex-col group hover:-translate-y-1 transition-all duration-300 shadow-heritage"
            >
              <div className="aspect-video mb-stack-md overflow-hidden bg-surface-variant relative rounded">
                <Image
                  src={project.image}
                  alt={project.title[locale]}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-surface/95 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary border border-outline-variant rounded">
                  {project.badge[locale]}
                </div>
              </div>
              
              <h3 className="font-serif text-title-lg text-on-surface mb-stack-sm font-semibold">
                {project.title[locale]}
              </h3>
              <p className="font-sans text-xs text-on-surface-variant mb-stack-md leading-relaxed flex-grow">
                {project.desc[locale]}
              </p>
              
              <div className="flex items-center justify-between pt-2 border-t border-outline-variant/60 mt-auto">
                <span className="font-sans text-[10px] text-on-surface-variant font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">schedule</span>
                  {project.meta[locale]}
                </span>
                <Link
                  href={`/${locale}/contact`}
                  className="text-primary hover:opacity-85 font-sans text-xs font-bold transition-opacity"
                >
                  {locale === "en" ? "Get Involved" : "सहभागी हुनुहोस्"}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-section-gap bg-surface-container-low border-t border-b border-outline-variant">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center space-y-stack-md">
          <span className="material-symbols-outlined text-primary text-4xl block" style={{ fontVariationSettings: "'FILL' 1" }}>
            volunteer_activism
          </span>
          <h2 className="font-serif text-headline-md text-on-surface font-bold">
            {locale === "en" ? "Support Our Heritage" : "सम्पदा संरक्षण कोषमा सहयोग"}
          </h2>
          <p className="font-sans text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-stack-lg leading-relaxed">
            {locale === "en"
              ? "Your contribution ensures that our architectural treasures are restored and our cultural practices are passed on to the next generation."
              : "तपाईंको सहयोगले हाम्रा ऐतिहासिक स्मारकहरूको भौतिक जीर्णोद्धार र सांस्कृतिक परम्पराहरूलाई अर्को पुस्तामा हस्तान्तरण गर्न प्रत्यक्ष मद्दत गर्नेछ।"}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-stack-md pt-2">
            <Link
              href={`/${locale}/volunteer`}
              className="bg-primary text-on-primary font-sans text-label-md px-8 py-4 rounded hover:opacity-90 transition-opacity text-center shadow-sm"
            >
              {locale === "en" ? "Donate to Restoration" : "कोषमा आर्थिक सहयोग"}
            </Link>
            <Link
              href={`/${locale}/volunteer`}
              className="bg-transparent border border-secondary text-secondary font-sans text-label-md px-8 py-4 rounded hover:bg-secondary-container hover:text-on-secondary-container transition-colors text-center"
            >
              {t.becomeMember}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
