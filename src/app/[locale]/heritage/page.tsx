import React from "react";
import { Metadata } from "next";
import { Locale, translations } from "@/data/translations";
import { Timeline } from "@/components/ui/Timeline";
import { timelineData } from "@/data/timeline";
import { siteConfig } from "@/config/siteConfig";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = translations[locale as Locale];
  return {
    title: t.heritage + " | " + siteConfig.name[locale as Locale],
    description: "Explore the historical timeline, structural restoration logs, and community preservation achievements of Himali Pariwar Club since 1977.",
  };
}

export default async function HeritagePage({ params }: PageProps) {
  const resolvedParams = await params;
  const locale = (resolvedParams.locale || "en") as Locale;
  const t = translations[locale];

  return (
    <div className="flex flex-col flex-grow">
      {/* Page Header */}
      <section className="bg-surface-container-low py-16 px-margin-mobile md:px-margin-desktop border-b border-outline-variant">
        <div className="max-w-container-max mx-auto text-center">
          <p className="font-sans text-label-sm text-on-surface-variant mb-stack-md tracking-wider uppercase">
            {t.home} / {t.heritage}
          </p>
          <h1 className="font-serif text-display-lg-mobile md:text-display-lg text-primary mb-stack-lg max-w-4xl mx-auto">
            {locale === "en" ? "Preserving Jaishidewal's Living Heritage" : "जैसीदेवलको जीवन्त सम्पदा संरक्षण"}
          </h1>
          <p className="font-sans text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            {locale === "en"
              ? "A testament to community resilience and cultural guardianship spanning generations."
              : "पुस्ताऔं देखि चलिआएको सामुदायिक लचिलोपन र सांस्कृतिक संरक्षणको एक जीवन्त साक्षी।"}
          </p>
        </div>
      </section>
      {/* Historical Overview (Before the Timeline) */}
      <section className="py-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-stack-lg">
          <Badge variant="primary">
            {locale === "en" ? "Historical Narrative" : "ऐतिहासिक पृष्ठभूमि"}
          </Badge>
          <h2 className="font-serif text-3xl md:text-4xl text-primary font-bold">
            {locale === "en" ? "Centuries of Sacred Architecture in Jaishidewal" : "जैसीदेवल: शताब्दीऔं पुरानो सांस्कृतिक केन्द्र"}
          </h2>
          <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
            {locale === "en"
              ? "Jaishidewal is centered around the grand Shiva temple built in 1685 AD by Laxmi Narayan Joshi. Standing on a multi-tiered plinth, this monumental pagoda is a hallmark of Malla-era craftsmanship. Himali Pariwar Club was founded to protect not only this temple, but the entire historical fabric of the neighborhood."
              : "जैसीदेवल शिव मन्दिरको निर्माण सन् १६८५ मा लक्ष्मी नारायण जोशीले गराएका थिए। मल्लकालीन वास्तुकलाको यो उत्कृष्ट नमुना र यसको वरिपरिको ऐतिहासिक परिवेश जोगाउन नै हिमाली परिवार क्लबको स्थापना भएको हो।"}
          </p>
        </div>

        {/* Symmetric 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mt-8">
          <Card hoverEffect={false} className="p-stack-lg flex flex-col justify-between h-[260px] border border-outline-variant/60 bg-surface-container-lowest">
            <div className="space-y-stack-md">
              <span className="material-symbols-outlined text-3xl text-primary">history</span>
              <h4 className="font-serif text-title-lg text-secondary font-bold">
                {locale === "en" ? "Malla Dynasty Origin" : "मल्लकालीन उत्पत्ति"}
              </h4>
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                {locale === "en"
                  ? "Constructed in 1685 AD, the Shiva Pagoda serves as the physical and spiritual anchor of our community."
                  : "सन् १६८५ मा निर्मित यस मन्दिरले जैसीदेवल समुदायको आध्यात्मिक केन्द्रको रूपमा काम गर्दै आएको छ।"}
              </p>
            </div>
          </Card>

          <Card hoverEffect={false} className="p-stack-lg flex flex-col justify-between h-[260px] border border-outline-variant/60 bg-surface-container-lowest">
            <div className="space-y-stack-md">
              <span className="material-symbols-outlined text-3xl text-primary">construction</span>
              <h4 className="font-serif text-title-lg text-secondary font-bold">
                {locale === "en" ? "Post-Earthquake Revival" : "भूकम्प पछिको पुनरुत्थान"}
              </h4>
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                {locale === "en"
                  ? "After the devastating 2015 earthquake, our volunteer network mobilized to salvage carvings and clear debris."
                  : "२०७२ सालको विनाशकारी भूकम्प पछि, मन्दिरका बहुमूल्य काठ बुट्टा जोगाउन हाम्रा स्वयंसेवक तत्काल खटिएका थिए।"}
              </p>
            </div>
          </Card>

          <Card hoverEffect={false} className="p-stack-lg flex flex-col justify-between h-[260px] border border-outline-variant/60 bg-surface-container-lowest">
            <div className="space-y-stack-md">
              <span className="material-symbols-outlined text-3xl text-primary">volunteer_activism</span>
              <h4 className="font-serif text-title-lg text-secondary font-bold">
                {locale === "en" ? "Living Traditions" : "जीवन्त जात्रा परम्परा"}
              </h4>
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                {locale === "en"
                  ? "Preservation extends beyond timber; it lives in the daily drumming, chariot pulling, and devotional dances."
                  : "संरक्षण केवल इँट्टा र काठमा मात्र सीमित छैन; यो यहाँको दैनिक भजन, धिमे बाजा र इन्द्रजात्रामा जीवित छ।"}
              </p>
            </div>
          </Card>
        </div>
      </section>
      {/* Timeline Section */}
      <section className="py-section-gap bg-surface-container-lowest border-b border-outline-variant">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <h2 className="font-serif text-headline-md text-secondary mb-stack-lg text-center font-bold">
            {locale === "en" ? "Institutional Journey" : "संस्थागत विकासक्रमको रूपरेखा"}
          </h2>
          <Timeline items={timelineData} locale={locale} />
        </div>
      </section>

      {/* Historical Context Details */}
      <section className="py-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="max-w-3xl mx-auto space-y-stack-md">
          <h3 className="font-serif text-headline-md text-primary font-bold">
            {locale === "en" ? "Guardians of Intangible Traditions" : "अमूर्त परम्पराका रक्षकहरू"}
          </h3>
          <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
            {locale === "en"
              ? "While the physical temples and rest houses (Patis) are central to the landscape, the club places equal emphasis on intangible heritage. Our annual chariot logistics, Dhime drum mentorship programs, and local festival coordination ensure that the heritage remains lived rather than merely curated."
              : "जैसीदेवलका मन्दिर र पाटीहरू जैसीदेवलको भौतिक परिचय हुन् भने, क्लबले यहाँका अमूर्त परम्पराहरूलाई पनि उत्तिकै प्राथमिकता दिन्छ। हाम्रा वार्षिक रथ जात्रा, धिमे बाजा प्रशिक्षण र स्थानीय चाडपर्वहरूको व्यवस्थापनले यो सम्पदा केवल इतिहासमा सीमित नरही व्यवहारमा पनि जीवन्त रहने सुनिश्चित गर्दछ।"}
          </p>
          <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
            {locale === "en"
              ? "Each restoration project is conducted in partnership with the Department of Archaeology, ensuring all repairs adhere strictly to traditional materials specifications. Concrete and modern bindings are prohibited in our work area."
              : "हरेक संरक्षण परियोजना पुरातत्व विभागसँगको सहकार्यमा सञ्चालन गरिन्छ। मर्मत कार्यमा आधुनिक कंक्रिट वा सिमेन्ट प्रयोग गर्न पूर्ण निषेध गरिएको छ।"}
          </p>
        </div>
      </section>
    </div>
  );
}
