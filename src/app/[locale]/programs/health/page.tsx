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
    title: t.health + " | " + siteConfig.name[locale as Locale],
    description: "Read about our community health clinic, emergency first-responder mobilization, and the historical log of our 2015 earthquake response.",
  };
}

export default async function HealthProgramPage({ params }: PageProps) {
  const resolvedParams = await params;
  const locale = (resolvedParams.locale || "en") as Locale;
  const t = translations[locale];

  // Mock list of health features
  const healthServices = [
    {
      title: { en: "Community Clinic Clinics", ne: "सामुदायिक निःशुल्क क्लिनिक" },
      desc: { en: "Bi-weekly clinics offering free basic health screenings, glucose monitoring, and consultation for elderly residents.", ne: "ज्येष्ठ नागरिकहरूका लागि पाक्षिक रूपमा सञ्चालन हुने निःशुल्क स्वास्थ्य जाँच, मधुमेह परीक्षण तथा परामर्श सेवा।" },
      icon: "local_hospital",
    },
    {
      title: { en: "First Responder Network", ne: "आपतकालीन प्राथमिक उद्धार टोली" },
      desc: { en: "A trained youth team equipped with emergency stretchers and first aid kits, prepared for local disaster response.", ne: "आपतकालीन उद्धारका लागि प्राथमिक उपचार किट र स्ट्रेचर सहित तालिमप्राप्त स्थानीय युवाहरूको सक्रिय समूह।" },
      icon: "medical_services",
    },
    {
      title: { en: "Blood Donor Database", ne: "रक्तदाता डिजिटल लख" },
      desc: { en: "A localized digital roster linking community members ready to donate blood with patients in nearby hospitals.", ne: "नजिकैका अस्पतालहरूमा रगत आवश्यक पर्ने बिरामीहरूका लागि आकस्मिक रूपमा रगत दान गर्न तयार स्थानीय दाताहरूको अभिलेख।" },
      icon: "bloodtype",
    },
  ];

  return (
    <div className="flex flex-col flex-grow">
      {/* Page Header Banner */}
      <section className="bg-surface-container-low py-16 px-margin-mobile md:px-margin-desktop border-b border-outline-variant">
        <div className="max-w-container-max mx-auto text-center">
          <Badge variant="secondary" className="mb-stack-md">
            {locale === "en" ? "Health & Emergency Care" : "स्वास्थ्य र आपतकालीन सहायता"}
          </Badge>
          <h1 className="font-serif text-display-lg-mobile md:text-display-lg text-primary mb-stack-lg max-w-4xl mx-auto leading-tight font-bold">
            {locale === "en" ? "Ready When Jaishidewal Needs Us" : "जैसीदेवल आपतकालमा हामी तयार छौं"}
          </h1>
          <p className="font-sans text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            {locale === "en"
              ? "Since our founding, and profoundly proven during the 2015 earthquake response, our community has stood resilient."
              : "क्लबको स्थापना कालदेखि र विशेष गरी २०१५ को विनाशकारी भूकम्पको समयमा हाम्रा स्वयंसेवकहरूले देखाएको लचिलोपन नै हाम्रो बल हो।"}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {healthServices.map((service, idx) => (
            <Card key={idx} hoverEffect className="flex flex-col items-start p-stack-lg">
              <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center mb-stack-md text-on-secondary-fixed-variant">
                <span className="material-symbols-outlined text-2xl">{service.icon}</span>
              </div>
              <h3 className="font-serif text-title-lg text-on-surface mb-stack-sm font-semibold">
                {service.title[locale]}
              </h3>
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                {service.desc[locale]}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Historical Response Log (2015) */}
      <section className="py-section-gap bg-surface-container-lowest border-y border-outline-variant">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid md:grid-cols-2 gap-margin-desktop items-center">
          <div className="space-y-stack-md">
            <Badge variant="primary">
              {locale === "en" ? "Historical Milestones" : "ऐतिहासिक सेवा कार्य"}
            </Badge>
            <h2 className="font-serif text-headline-md text-primary font-bold">
              {locale === "en" ? "The 2015 Earthquake Response" : "२०७२ सालको भूकम्प प्रतिकार्य"}
            </h2>
            <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
              {locale === "en"
                ? "Hours after the initial shaking on April 25, 2015, club members converted the Jaishidewal compound into an emergency shelter. Over the following three weeks, our volunteers distributed over 2,500 food kits, coordinated triage with municipal medical officers, and secured the temple ruins to salvage precious historical wooden carvings."
                : "२०७२ वैशाख १२ को भूकम्प गएको केही घण्टाभित्रै, क्लबका सदस्यहरूले जैसीदेवल परिसरमा आपतकालीन पाल शिविर स्थापना गरे। तीन हप्ताको अवधिमा हाम्रा स्वयंसेवकहरूले २५०० भन्दा बढी राहत प्याकेटहरू वितरण गरे, स्वास्थ्यकर्मीहरूसँग मिलेर प्राथमिक उपचार टोली खटाए र भत्किएका मन्दिरका बहुमूल्य टुँडालहरू सुरक्षित रूपमा संकलन गरे।"}
            </p>
            <blockquote className="border-l-4 border-secondary pl-4 italic text-on-surface-variant font-medium text-xs py-1">
              {locale === "en"
                ? '"Himali Pariwar was the first to arrive with water and medical tents. Without their prompt youth coordination, many historic structures would have been lost during clearing operations."'
                : '"हिमाली परिवार पानी र मेडिकल पालहरू लिएर घटनास्थलमा आइपुग्ने पहिलो संस्था थियो। युवाहरूको शीघ्र समन्वय नभएको भए सफाइका क्रममा धेरै ऐतिहासिक कलाकृतिहरू नष्ट हुने थिए।"'}
              <span className="block text-[10px] uppercase font-bold tracking-wider mt-2 not-italic text-secondary">
                — Ward 21 Relief Committee Report (2015)
              </span>
            </blockquote>
          </div>
          <div className="bg-surface-container-low border border-outline-variant rounded-lg p-stack-lg space-y-stack-md shadow-heritage">
            <h3 className="font-serif text-title-lg text-primary font-bold border-b border-outline-variant pb-2">
              {locale === "en" ? "Emergency Hotline Contacts" : "आकस्मिक सम्पर्क नम्बरहरू"}
            </h3>
            <p className="font-sans text-xs text-on-surface-variant leading-relaxed mb-4">
              {locale === "en"
                ? "If you require emergency medical first responder dispatch or want to volunteer for the database, contact:"
                : "यदि तपाईंलाई आकस्मिक प्राथमिक उपचार टोली आवश्यक परेमा वा रक्तदाताको रूपमा दर्ता हुन चाहनुहुन्छ भने:"}
            </p>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs pb-2 border-b border-outline-variant/60">
                <span className="font-sans font-bold text-on-surface">
                  {locale === "en" ? "First Responder Dispatch" : "प्राथमिक उपचार टोली प्रमुख"}
                </span>
                <span className="text-primary font-bold">{siteConfig.contact.phoneFormatted}</span>
              </div>
              <div className="flex justify-between items-center text-xs pb-2 border-b border-outline-variant/60">
                <span className="font-sans font-bold text-on-surface">
                  {locale === "en" ? "Blood Donor Hotline" : "रक्तदान समन्वय अधिकारी"}
                </span>
                <span className="text-secondary font-bold">{siteConfig.contact.phoneFormatted}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-sans font-bold text-on-surface">
                  {locale === "en" ? "Official Office Email" : "आधिकारिक कार्यालय इमेल"}
                </span>
                <span className="text-on-surface-variant font-semibold">{siteConfig.contact.email}</span>
              </div>
            </div>
            <div className="pt-4 text-center">
              <Link
                href={`/${locale}/contact`}
                className="bg-primary text-on-primary font-sans text-xs font-bold px-6 py-2.5 rounded hover:opacity-95 transition-opacity inline-block w-full"
              >
                {locale === "en" ? "Submit Health Inquiry Form" : "स्वास्थ्य सोधपुछ फारम बुझाउनुहोस्"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
