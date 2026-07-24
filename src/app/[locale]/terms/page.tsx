import React from "react";
import { Metadata } from "next";
import { Locale } from "@/data/translations";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: (locale === "en" ? "Terms of Service" : "सेवाका सर्तहरू") + " | Himali Pariwar Club",
  };
}

export default async function TermsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const locale = (resolvedParams.locale || "en") as Locale;

  return (
    <div className="flex-grow bg-surface-container-lowest py-16 px-margin-mobile md:px-margin-desktop">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="font-serif text-4xl md:text-5xl text-primary font-bold">
          {locale === "en" ? "Terms of Service" : "सेवाका सर्तहरू"}
        </h1>
        <p className="font-sans text-xs text-on-surface-variant font-medium">
          {locale === "en" ? "Last updated: July 2026" : "अन्तिम अपडेट: जुलाई २०२६"}
        </p>
        
        <div className="prose prose-sm max-w-none font-sans text-xs text-on-surface-variant leading-relaxed space-y-4 pt-4 border-t border-outline-variant/60">
          <p>
            {locale === "en"
              ? "Welcome to the official online portal of Himali Pariwar Club. By accessing our website, you agree to comply with the terms outlined below."
              : "हिमाली परिवार क्लबको वेबसाइटमा यहाँलाई स्वागत छ। यस वेबसाइटको प्रयोग गर्दा यहाँ उल्लेखित सर्तहरूको पालना गर्नुपर्नेछ।"}
          </p>
          <h2 className="font-serif text-lg font-bold text-secondary pt-2">
            {locale === "en" ? "1. Acceptable Use" : "१. प्रयोगको सीमा"}
          </h2>
          <p>
            {locale === "en"
              ? "This site is created to share heritage conservation work, coordinate local welfare, and register volunteers. You agree to use the submission forms truthfully and avoid submitting spam."
              : "यो वेबसाइट हाम्रा संरक्षण र सामाजिक सेवाहरू बाँड्न र स्वयंसेवक समन्वय गर्न बनाइएको हो। सोधपुछ फारमहरू भर्दा सही विवरण पेश गर्न अनुरोध छ।"}
          </p>
          <h2 className="font-serif text-lg font-bold text-secondary pt-2">
            {locale === "en" ? "2. Intellectual Property" : "२. बौद्धिक सम्पत्ति अधिकार"}
          </h2>
          <p>
            {locale === "en"
              ? "The logos, branding marks, and historical photo archives displayed here belong to Himali Pariwar Club. Text descriptions may be shared for educational purposes with proper attribution."
              : "यस वेबसाइटमा राखिएका तस्विरहरू, लोगो र ऐतिहासिक विवरणहरू क्लबको सम्पत्ति हुन्। शैक्षिक कार्यका लागि उद्धरण सहित सामग्रीहरू साझा गर्न सकिनेछ।"}
          </p>
        </div>
      </div>
    </div>
  );
}
