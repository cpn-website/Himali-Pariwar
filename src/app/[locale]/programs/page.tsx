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
    title: t.programs + " | " + siteConfig.name[locale as Locale],
    description: "Explore the core pillars of community support at Himali Pariwar Club, including Cultural Preservation, Health & Emergency Care, and Youth Athletics.",
  };
}

export default async function ProgramsPortalPage({ params }: PageProps) {
  const resolvedParams = await params;
  const locale = (resolvedParams.locale || "en") as Locale;
  const t = translations[locale];

  // Programs details list (3 items - Symmetric)
  const programsList = [
    {
      id: "culture",
      title: t.culture,
      badge: { en: "Heritage Preservation", ne: "सम्पदा संरक्षण" },
      icon: "architecture",
      desc: {
        en: "Documenting oral histories, teaching traditional instruments (Dhime), and conducting brick-and-mortar restoration works.",
        ne: "परम्परागत सङ्गीत (धिमे), चर्या नृत्य प्रशिक्षण र जैसीदेवल मन्दिरका सम्पदाहरूको भौतिक पुनर्निर्माण सम्बन्धी कामहरू।",
      },
    },
    {
      id: "health",
      title: t.health,
      badge: { en: "Community Support", ne: "सामुदायिक सेवा" },
      icon: "volunteer_activism",
      desc: {
        en: "Bedrock of local emergency response. Serving the community with free health clinics, blood donations, and emergency mobilization.",
        ne: "स्थानीय स्वास्थ्य शिविर, आकस्मिक रक्तदान कार्यक्रम र विपद् आपतकालीन उद्धार कार्य।",
      },
    },
    {
      id: "athletics",
      title: t.athletics,
      badge: { en: "Youth Sports", ne: "खेलकुद" },
      icon: "sports_soccer",
      desc: {
        en: "Mobilizing neighborhood youth through sports training, annual football leagues, and physical wellness programs.",
        ne: "युवाहरूलाई सक्रिय राख्न खेलकुद तालिम, फुटबल प्रतियोगिता र शारीरिक तन्दुरुस्ती कार्यक्रमहरू।",
      },
    },
  ];

  return (
    <div className="flex flex-col flex-grow">
      {/* Page Header */}
      <section className="bg-surface-container-low py-16 px-margin-mobile md:px-margin-desktop border-b border-outline-variant">
        <div className="max-w-container-max mx-auto text-center">
          <p className="font-sans text-label-sm text-on-surface-variant mb-stack-md tracking-wider uppercase">
            {t.home} / {t.programs}
          </p>
          <h1 className="font-serif text-display-lg-mobile md:text-display-lg text-primary mb-stack-lg max-w-4xl mx-auto">
            {locale === "en" ? "Pillars of Community Action" : "सामुदायिक सेवाका स्तम्भहरू"}
          </h1>
          <p className="font-sans text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            {locale === "en"
              ? "For over 40 years, our programs have responded directly to the cultural, physical, and emergency needs of Jaishidewal residents."
              : "४० वर्षभन्दा बढी समयदेखि जैसीदेवलका बासिन्दाहरूको सांस्कृतिक, शारीरिक र आपतकालीन आवश्यकता सम्बोधन गर्ने हाम्रा कार्यक्रमहरू।"}
          </p>
        </div>
      </section>

      {/* 1. Core Programs Grid (3 Items) */}
      <section className="py-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {programsList.map((program) => (
            <Card key={program.id} hoverEffect className="flex flex-col justify-between h-[360px] p-stack-lg">
              <div className="space-y-stack-md">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-2xl">{program.icon}</span>
                  </div>
                  <Badge variant="primary" className="text-[10px]">
                    {program.badge[locale]}
                  </Badge>
                </div>
                
                <h3 className="font-serif text-title-lg text-on-surface font-semibold pt-2">
                  {program.title}
                </h3>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                  {program.desc[locale]}
                </p>
              </div>

              <Link
                href={`/${locale}/programs/${program.id}`}
                className="text-primary font-sans text-xs font-bold inline-flex items-center gap-1 hover:underline mt-6"
              >
                {t.viewDetails}
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* 2. Impact Methodology Section (Symmetric Grid of 3 Cards) */}
      <section className="bg-surface-container-low py-section-gap border-t border-b border-outline-variant">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center max-w-2xl mx-auto mb-stack-lg">
            <Badge variant="secondary">
              {locale === "en" ? "How We Work" : "हाम्रो कार्यविधि"}
            </Badge>
            <h2 className="font-serif text-3xl md:text-4xl text-primary font-bold mt-2">
              {locale === "en" ? "The Grassroots Empowerment Model" : "सामुदायिक परिचालन र सशक्तीकरण"}
            </h2>
            <p className="font-sans text-body-md text-on-surface-variant mt-2 leading-relaxed">
              {locale === "en"
                ? "Our three-pronged operational structure ensures maximum accountability, preservation of traditional crafts, and immediate mutual aid."
                : "हाम्रो तीन-पक्षीय परिचालन ढाँचाले अधिकतम उत्तरदायित्व, परम्परागत शिल्पको संरक्षण र तत्काल पारस्परिक सहयोग सुनिश्चित गर्दछ।"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mt-8">
            <Card hoverEffect={false} className="bg-surface-bright p-stack-lg flex flex-col h-[280px] justify-between border border-outline-variant/65">
              <div className="space-y-stack-md">
                <span className="material-symbols-outlined text-3xl text-primary">groups</span>
                <h4 className="font-serif text-title-lg text-secondary font-bold">
                  {locale === "en" ? "Community Mobilization" : "सामुदायिक परिचालन"}
                </h4>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                  {locale === "en"
                    ? "We train neighborhood youths as heritage marshals and emergency first responders, creating a resilient local rescue net."
                    : "हामी टोलका युवाहरूलाई सम्पदा मार्शल र आपतकालीन उद्धारकर्ताको रूपमा तालिम दिन्छौं, जसले गर्दा तत्काल उद्धार सञ्जाल तयार हुन्छ।"}
                </p>
              </div>
            </Card>

            <Card hoverEffect={false} className="bg-surface-bright p-stack-lg flex flex-col h-[280px] justify-between border border-outline-variant/65">
              <div className="space-y-stack-md">
                <span className="material-symbols-outlined text-3xl text-primary">history_edu</span>
                <h4 className="font-serif text-title-lg text-secondary font-bold">
                  {locale === "en" ? "Apprentice-Led Preservation" : "सिकारु-नेतृत्व संरक्षण"}
                </h4>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                  {locale === "en"
                    ? "Traditional pagoda timber joins and brick paving crafts are taught directly from elders to apprentices on active job sites."
                    : "टुँडाल निर्माण र परम्परागत इँट्टा विछ्याउने कला बुढापाकाबाट युवा सिकारुहरूलाई कामकै क्रममा सिकाइन्छ।"}
                </p>
              </div>
            </Card>

            <Card hoverEffect={false} className="bg-surface-bright p-stack-lg flex flex-col h-[280px] justify-between border border-outline-variant/65">
              <div className="space-y-stack-md">
                <span className="material-symbols-outlined text-3xl text-primary">monitoring</span>
                <h4 className="font-serif text-title-lg text-secondary font-bold">
                  {locale === "en" ? "Radical Transparency" : "पूर्ण वित्तीय पारदर्शिता"}
                </h4>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                  {locale === "en"
                    ? "Every rupee donated is recorded, audited annually, and published publicly in our governance logs to ensure zero leakage."
                    : "प्राप्त हुने प्रत्येक रुपैयाँको अभिलेख राखिन्छ, वार्षिक लेखापरीक्षण गरिन्छ र संस्थागत सुशासन प्रतिवेदनमा सार्वजनिक गरिन्छ।"}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
