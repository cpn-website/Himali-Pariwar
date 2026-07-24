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

  // Programs details list
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

      {/* Programs Grid */}
      <section className="py-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {programsList.map((program) => (
            <Card key={program.id} className="flex flex-col justify-between h-[360px]">
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
    </div>
  );
}
