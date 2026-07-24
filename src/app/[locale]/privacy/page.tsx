import React from "react";
import { Metadata } from "next";
import { Locale } from "@/data/translations";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: (locale === "en" ? "Privacy Policy" : "गोपनीयता नीति") + " | Himali Pariwar Club",
  };
}

export default async function PrivacyPage({ params }: PageProps) {
  const resolvedParams = await params;
  const locale = (resolvedParams.locale || "en") as Locale;

  return (
    <div className="flex-grow bg-surface-container-lowest py-16 px-margin-mobile md:px-margin-desktop">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="font-serif text-4xl md:text-5xl text-primary font-bold">
          {locale === "en" ? "Privacy Policy" : "गोपनीयता नीति"}
        </h1>
        <p className="font-sans text-xs text-on-surface-variant font-medium">
          {locale === "en" ? "Last updated: July 2026" : "अन्तिम अपडेट: जुलाई २०२६"}
        </p>
        
        <div className="prose prose-sm max-w-none font-sans text-xs text-on-surface-variant leading-relaxed space-y-4 pt-4 border-t border-outline-variant/60">
          <p>
            {locale === "en"
              ? "At Himali Pariwar Club, we respect your privacy and are committed to protecting any personal data you share with us through our volunteer forms, contact inquiry systems, or email newsletter signups."
              : "हिमाली परिवार क्लबमा, हामी तपाईंको गोपनीयताको सम्मान गर्छौं र तपाईंले स्वयंसेवक फारम वा इमेल दर्ता मार्फत उपलब्ध गराउनुभएको विवरण सुरक्षित राख्न प्रतिबद्ध छौं।"}
          </p>
          <h2 className="font-serif text-lg font-bold text-secondary pt-2">
            {locale === "en" ? "1. Data Collection" : "१. संकलित विवरणहरू"}
          </h2>
          <p>
            {locale === "en"
              ? "We only collect information that you explicitly submit, such as your full name, phone number, email address, and inquiry details. We do not use trackers, analytics cookies, or share your contact data with third parties."
              : "हामी केवल तपाईंले स्वेच्छाले बुझाउनुभएको विवरणहरू जस्तै नाम, फोन नम्बर र इमेल मात्र संकलन गर्दछौं। हामी तेस्रो पक्षसँग विवरण साझा गर्दैनौं।"}
          </p>
          <h2 className="font-serif text-lg font-bold text-secondary pt-2">
            {locale === "en" ? "2. Use of Information" : "२. विवरणको प्रयोग"}
          </h2>
          <p>
            {locale === "en"
              ? "Your data is used solely to respond to your queries, register you for athletic and heritage programs, or deliver our organization's circular announcements. You can request data removal at any time."
              : "संकलित विवरणहरू केवल तपाईंको सोधपुछको जवाफ दिन, स्वयंसेवक दर्ता गर्न र क्लबका सूचनाहरू पठाउन मात्र प्रयोग गरिन्छ।"}
          </p>
        </div>
      </div>
    </div>
  );
}
