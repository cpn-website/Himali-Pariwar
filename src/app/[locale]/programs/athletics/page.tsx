import React from "react";
import Link from "next/link";
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
    title: t.athletics + " | " + siteConfig.name[locale as Locale],
    description: "Discover our youth athletics programs, annual tournaments, training schedules, and sports trophy records in Jaishidewal.",
  };
}

export default async function AthleticsProgramPage({ params }: PageProps) {
  const resolvedParams = await params;
  const locale = (resolvedParams.locale || "en") as Locale;
  const t = translations[locale];

  // Sports disciplines list
  const sports = [
    {
      title: { en: "Himali Football Cup", ne: "हिमाली फुटबल कप" },
      desc: {
        en: "Our flagship annual tournament mobilizing over 16 local clubs across Kathmandu to compete in friendly neighborhood matches.",
        ne: "काठमाडौंका १६ भन्दा बढी क्लबहरूको सहभागितामा वर्षेनी आयोजना हुने जैसीदेवलकै प्रतिष्ठित फुटबल प्रतियोगिता।",
      },
      meta: { en: "Annual Tournament", ne: "वार्षिक प्रतियोगिता" },
    },
    {
      title: { en: "Table Tennis Training", ne: "टेबल टेनिस तालिम" },
      desc: {
        en: "Free afternoon coaching sessions for students at our clubhouse arena, encouraging active routines and discipline.",
        ne: "विद्यार्थीहरूका लागि क्लबको आफ्नै कभर्ड हलमा अपराह्न सञ्चालन हुने निःशुल्क टेबल टेनिस प्रशिक्षण।",
      },
      meta: { en: "Daily Classes", ne: "दैनिक प्रशिक्षण" },
    },
    {
      title: { en: "Fitness & Wellness Runs", ne: "दौड तथा तन्दुरुस्ती" },
      desc: {
        en: "Weekly morning group runs around Kathmandu Durbar Square to promote aerobic fitness and community bonds.",
        ne: "शारीरिक तन्दुरुस्ती र सामुदायिक एकता अभिवृद्धिका लागि प्रत्येक शनिबार बिहान Durbar Square क्षेत्रमा हुने सामूहिक दौड।",
      },
      meta: { en: "Every Saturday", ne: "प्रत्येक शनिबार बिहान" },
    },
  ];

  // Trophy log
  const trophies = [
    { year: "2080 BS", title: { en: "Ward 21 Inter-Club Cup", ne: "वडा २१ अन्तर-क्लब कप" }, position: { en: "Winner", ne: "प्रथम" } },
    { year: "2079 BS", title: { en: "Kathmandu District Youth League", ne: "काठमाडौं जिल्ला युवा लिग" }, position: { en: "Runner Up", ne: "द्वितीय" } },
    { year: "2077 BS", title: { en: "Indra Jatra Tournament", ne: "इन्द्रजात्रा मैत्रीपूर्ण कप" }, position: { en: "Winner", ne: "प्रथम" } },
  ];

  return (
    <div className="flex flex-col flex-grow">
      {/* Page Header */}
      <section className="bg-surface-container-low py-16 px-margin-mobile md:px-margin-desktop border-b border-outline-variant">
        <div className="max-w-container-max mx-auto text-center">
          <Badge variant="secondary" className="mb-stack-md">
            {locale === "en" ? "Youth Development" : "युवा विकास तथा खेलकुद"}
          </Badge>
          <h1 className="font-serif text-display-lg-mobile md:text-display-lg text-primary mb-stack-lg max-w-4xl mx-auto leading-tight font-bold">
            {locale === "en" ? "Empowering Youth Through Sports" : "खेलकुद मार्फत युवा सशक्तीकरण"}
          </h1>
          <p className="font-sans text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            {locale === "en"
              ? "Building discipline, physical wellness, and inter-neighborhood solidarity since 1979."
              : "१९७९ देखि जैसीदेवलमा अनुशासन, शारीरिक तन्दुरुस्ती र आपसी सामुदायिक एकता अभिवृद्धिका लागि खेलकुदका कार्यक्रम।"}
          </p>
        </div>
      </section>

      {/* Disciplines Grid */}
      <section className="py-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {sports.map((sport, idx) => (
            <Card key={idx} hoverEffect className="flex flex-col justify-between h-[300px] p-stack-lg">
              <div className="space-y-stack-md">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-2xl">sports_soccer</span>
                  </div>
                  <Badge variant="outline" className="text-[10px]">
                    {sport.meta[locale]}
                  </Badge>
                </div>
                <h3 className="font-serif text-title-lg text-on-surface font-semibold pt-2">
                  {sport.title[locale]}
                </h3>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                  {sport.desc[locale]}
                </p>
              </div>
              <Link
                href={`/${locale}/contact`}
                className="text-primary font-sans text-xs font-bold inline-flex items-center gap-1 hover:underline mt-4"
              >
                {locale === "en" ? "Join Training" : "तालिममा सहभागी हुनुहोस्"}
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* Trophy & Honors Board */}
      <section className="py-section-gap bg-surface-container-lowest border-y border-outline-variant">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid md:grid-cols-2 gap-margin-desktop items-center">
          <div className="space-y-stack-md">
            <Badge variant="primary">
              {locale === "en" ? "Trophy Cabinet" : "पुरस्कार तथा सम्मान"}
            </Badge>
            <h2 className="font-serif text-headline-md text-primary font-bold">
              {locale === "en" ? "Athletic Record & Honors" : "हाम्रो खेल इतिहास र सम्मान"}
            </h2>
            <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
              {locale === "en"
                ? "Himali Pariwar Club's youth teams have consistently represented our neighborhood in local Kathmandu leagues. Our senior football squad holds several key titles, proving the effectiveness of our grassroots athletics support."
                : "हिमाली परिवार क्लबको युवा खेलकुद टोलीले काठमाडौंका स्थानीय लिगहरूमा जैसीदेवल क्षेत्रको गरिमामय प्रतिनिधित्व गर्दै आएको छ। हाम्रो सिनियर फुटबल टोलीले थुप्रै उपाधि जिती ग्रासरुट स्तरको खेलकुद विकासको महत्व सावित गरेको छ।"}
            </p>
          </div>
          
          <div className="bg-surface border border-outline-variant rounded-lg p-stack-lg shadow-heritage">
            <h3 className="font-serif text-title-lg text-primary font-bold border-b border-outline-variant pb-2 mb-4">
              {locale === "en" ? "Recent Honors Log" : "हालैका मुख्य उपाधिहरू"}
            </h3>
            
            <div className="space-y-3">
              {trophies.map((trophy, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs pb-3 border-b border-outline-variant/60 last:border-b-0 last:pb-0">
                  <div className="flex items-center gap-2">
                    <span className="font-sans font-bold text-on-surface">{trophy.year}</span>
                    <span className="text-on-surface-variant">{trophy.title[locale]}</span>
                  </div>
                  <Badge variant="secondary" className="font-bold">
                    {trophy.position[locale]}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
