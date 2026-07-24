import React from "react";
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
    title: t.governance + " | " + siteConfig.name[locale as Locale],
    description: "Access our organizational charter, audited financial statements, annual reports, and donor policies to review our transparency standards.",
  };
}

export default async function GovernancePage({ params }: PageProps) {
  const resolvedParams = await params;
  const locale = (resolvedParams.locale || "en") as Locale;
  const t = translations[locale];

  // Mock list of recent financial details
  const financialSummaries = [
    {
      title: { en: "Monsoon Health Camp Funding", ne: "वर्षाकालीन स्वास्थ्य शिविर बजेट" },
      amount: "NPR 1,45,000",
      status: { en: "Fully Funded by Local Donors", ne: "स्थानीय दाताहरूबाट पूर्ण आर्थिक सहयोग" },
    },
    {
      title: { en: "Jaishidewal Pati Wooden Beam Repair", ne: "जैसीदेवल पाटी काठको थाम मर्मत" },
      amount: "NPR 3,20,000",
      status: { en: "Funded via Community Heritage Fund", ne: "सामुदायिक सम्पदा कोषबाट निकासा" },
    },
    {
      title: { en: "Annual Indra Jatra Feast & Music", ne: "वार्षिक इन्द्रजात्रा भोज तथा सांस्कृतिक बाजा" },
      amount: "NPR 2,10,000",
      status: { en: "Club Members & Trust Grants", ne: "क्लबका सदस्य र गुठी अनुदान" },
    },
  ];

  return (
    <div className="flex flex-col flex-grow">
      {/* Page Header */}
      <section className="bg-surface-container-low py-16 px-margin-mobile md:px-margin-desktop border-b border-outline-variant">
        <div className="max-w-container-max mx-auto text-center">
          <p className="font-sans text-label-sm text-on-surface-variant mb-stack-md tracking-wider uppercase">
            {t.home} / {t.about} / {locale === "en" ? "Governance" : "सुशासन"}
          </p>
          <h1 className="font-serif text-display-lg-mobile md:text-display-lg text-primary mb-stack-lg max-w-4xl mx-auto">
            {t.governance}
          </h1>
          <p className="font-sans text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            {locale === "en"
              ? "We believe that public trust is built on absolute financial accountability and open information access."
              : "हामी विश्वास गर्छौं कि सार्वजनिक विश्वास पूर्ण वित्तीय जवाफदेहिता र सूचनाको खुला पहुँचबाट मात्र सम्भव हुन्छ।"}
          </p>
        </div>
      </section>

      {/* Main Governance Content */}
      <section className="py-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-margin-desktop">
          {/* Left Columns: Policies & Financial Reports */}
          <div className="lg:col-span-2 space-y-stack-lg">
            <div className="space-y-stack-md">
              <h2 className="font-serif text-headline-md text-primary font-bold">
                {locale === "en" ? "Transparency Standards" : "हाम्रो पारदर्शिता मापदण्डहरू"}
              </h2>
              <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
                {locale === "en"
                  ? "As a registered non-profit organization in Nepal, Himali Pariwar Club complies with all municipal, district, and national audit requirements. Every rupee donated to our heritage restoration campaigns or emergency dispatch systems is tracked, recorded, and audited by a licensed independent auditor annually."
                  : "नेपाल सरकारमा दर्ता भएको संस्थाको रूपमा, हिमाली परिवार क्लबले सबै सरकारी लेखापरीक्षण नियमहरूको पालना गर्दछ। हाम्रा सम्पदा संरक्षण अभियान वा आपतकालीन स्वास्थ्य सेवा कोषमा जम्मा हुने प्रत्येक रुपैयाँको पारदर्शी हिसाब राखिन्छ।"}
              </p>
              <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
                {locale === "en"
                  ? "We publish our audited statements, project breakdown ledgers, and general committee minutes at the end of each fiscal year (Shrawan). Below you can download our legal and financial documents."
                  : "हामी प्रत्येक आर्थिक वर्षको अन्त्यमा हाम्रो लेखापरीक्षण विवरण, परियोजना खर्चको विस्तृत विवरण र साधारण सभाको माइन्युट सार्वजनिक गर्दछौं। प्रमुख कागजातहरू यहाँबाट डाउनलोड गर्न सक्नुहुन्छ।"}
              </p>
            </div>

            {/* Document Downloads Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter pt-4">
              <Card hoverEffect className="flex flex-col justify-between h-44">
                <div>
                  <Badge variant="primary" className="mb-stack-sm">
                    {locale === "en" ? "Legal Charter" : "विधान"}
                  </Badge>
                  <h3 className="font-serif text-title-lg text-on-surface font-semibold mb-2">
                    {locale === "en" ? "Club Charter" : "क्लबको विधान"}
                  </h3>
                  <p className="font-sans text-xs text-on-surface-variant line-clamp-2">
                    {locale === "en" ? "Founding constitution and legal standing document approved in 1979." : "१९७९ मा स्वीकृत संस्थाको उद्देश्य र नियम समेटिएको विधान।"}
                  </p>
                </div>
                <a
                  href={siteConfig.documents.charter}
                  download
                  className="text-primary font-sans text-xs font-bold flex items-center gap-1 hover:underline mt-4"
                >
                  <span className="material-symbols-outlined text-[16px]">download</span>
                  {t.download}
                </a>
              </Card>

              <Card hoverEffect className="flex flex-col justify-between h-44">
                <div>
                  <Badge variant="secondary" className="mb-stack-sm">
                    {locale === "en" ? "Financial Report" : "वित्तीय प्रतिवेदन"}
                  </Badge>
                  <h3 className="font-serif text-title-lg text-on-surface font-semibold mb-2">
                    {locale === "en" ? "Annual Audit 2025" : "लेखापरीक्षण प्रतिवेदन २०२५"}
                  </h3>
                  <p className="font-sans text-xs text-on-surface-variant line-clamp-2">
                    {locale === "en" ? "Audited balance sheet and project expenses log for fiscal year 2081/2082 BS." : "आर्थिक वर्ष २०८१/८२ को पूर्ण खर्च र आम्दानीको लेखापरीक्षण विवरण।"}
                  </p>
                </div>
                <a
                  href={siteConfig.documents.audit2025}
                  download
                  className="text-primary font-sans text-xs font-bold flex items-center gap-1 hover:underline mt-4"
                >
                  <span className="material-symbols-outlined text-[16px]">download</span>
                  {t.download}
                </a>
              </Card>
            </div>
          </div>

          {/* Right Column: Recent Allocations & Stat Sidebar */}
          <div className="space-y-stack-lg">
            <div className="bg-surface-container-low border border-outline-variant rounded-lg p-stack-lg space-y-stack-md shadow-heritage">
              <h3 className="font-serif text-title-lg text-primary font-bold border-b border-outline-variant pb-2">
                {locale === "en" ? "Recent Allocations" : "भर्खरको बजेट खर्च विवरण"}
              </h3>
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                {locale === "en"
                  ? "Real-time updates on active program expenditures approved by the executive board:"
                  : "कार्यसमितिद्वारा स्वीकृत वर्तमान कार्यक्रमका खर्चहरू:"}
              </p>
              
              <div className="space-y-3">
                {financialSummaries.map((item, idx) => (
                  <div key={idx} className="text-xs border-b border-outline-variant/60 pb-3 last:border-b-0 last:pb-0">
                    <h4 className="font-sans font-bold text-on-surface mb-1">
                      {item.title[locale]}
                    </h4>
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-primary font-semibold">{item.amount}</span>
                      <span className="text-on-surface-variant">{item.status[locale]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-stack-lg text-center space-y-stack-sm">
              <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                security
              </span>
              <h4 className="font-serif text-title-lg text-primary font-bold">
                {locale === "en" ? "Zero Overhead Policy" : "शून्य प्रशासनिक खर्च नीति"}
              </h4>
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                {locale === "en"
                  ? "100% of community donations directly fund heritage materials, sports equipment, and emergency medical kits. Staff overhead is supported by independent trust dividends."
                  : "हामीलाई प्राप्त हुने दानहरूको शतप्रतिशत रकम मर्मत सम्भार सामग्री, आपतकालीन चिकित्सा किट र खेलकुद सामग्रीमा सोझै लगानी गरिन्छ।"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
