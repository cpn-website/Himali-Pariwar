import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Locale, translations } from "@/data/translations";
import { Card } from "@/components/ui/Card";
import { HeritageDivider } from "@/components/ui/HeritageDivider";
import { siteConfig } from "@/config/siteConfig";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = translations[locale as Locale];
  return {
    title: t.story + " | " + siteConfig.name[locale as Locale],
    description: "Learn about the history, founding charter, mission, and vision of Himali Pariwar Club in Jaishidewal since 1979.",
  };
}

export default async function AboutStoryPage({ params }: PageProps) {
  const resolvedParams = await params;
  const locale = (resolvedParams.locale || "en") as Locale;
  const t = translations[locale];

  return (
    <div className="flex flex-col flex-grow">
      {/* Page Header */}
      <section className="bg-surface-container-low py-16 px-margin-mobile md:px-margin-desktop border-b border-outline-variant">
        <div className="max-w-container-max mx-auto text-center">
          <p className="font-sans text-label-sm text-on-surface-variant mb-stack-md tracking-wider uppercase">
            {t.home} / {t.about}
          </p>
          <h1 className="font-serif text-display-lg-mobile md:text-display-lg text-primary mb-stack-lg max-w-4xl mx-auto">
            {locale === "en" ? "Four Decades of Service to Jaishidewal" : "जैसीदेवलको सेवामा चार दशकको यात्रा"}
          </h1>
          <p className="font-sans text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            {locale === "en"
              ? "Preserving our heritage, strengthening our community, and building a foundation for future generations since 1979."
              : "१९७९ देखि हाम्रो सम्पदाको संरक्षण गर्दै, समुदायलाई सशक्त बनाउँदै र भावी पुस्ताका लागि बलियो जग निर्माण गर्दै।"}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid md:grid-cols-2 gap-margin-desktop items-center">
          {/* Left Column: Story Text */}
          <div className="space-y-stack-md">
            <h2 className="font-serif text-headline-md text-primary font-bold">
              {locale === "en" ? "The Genesis of the Club" : "क्लबको उत्पत्ति र इतिहास"}
            </h2>
            <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
              {locale === "en"
                ? "In the late 1970s, as urban expansion began to pressure the historic core of Kathmandu, a group of local elders and passionate youth recognized the urgent need to formalize their preservation efforts. What began as informal gatherings under the eaves of the Jaishidewal temple soon crystallized into a structured organization."
                : "१९७० को दशकको अन्त्यतिर, काठमाडौंको शहरी विस्तारले ऐतिहासिक कोर क्षेत्रहरूमा प्रभाव पार्न थालेपछि, स्थानीय बुद्धिजीवी र जोशिला युवाहरूले आफ्नो संरक्षण प्रयासलाई संस्थागत गर्ने आवश्यकता महसुस गरे। जैसीदेवल मन्दिरको छहारीमुनि अनौपचारिक भेलाबाट सुरु भएको यो अभियान चाँडै नै एउटा संगठित संस्थाको रूपमा स्थापित भयो।"}
            </p>
            <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
              {locale === "en"
                ? "Since then, we have expanded our reach to address emergency health services, youth athletic development, and education. Today, we are proud to stand as a vital anchor of community life in Ward 21, protecting both the architectural monuments and the cultural heartbeat of Kathmandu."
                : "त्यस समयदेखि, हामीले आपतकालीन स्वास्थ्य सेवा, युवा खेलकुद विकास र शिक्षा क्षेत्रहरूमा पनि हाम्रो सक्रियता बढाएका छौं। आज, हामी वडा २१ को सामुदायिक जीवनको एक महत्त्वपूर्ण आधार स्तम्भको रूपमा खडा हुन पाउँदा गर्व गर्छौं।"}
            </p>

            <div className="border-l-4 border-primary pl-stack-md my-stack-lg bg-surface-container-low/50 py-2 pr-2 rounded-r">
              <p className="font-serif text-body-lg text-on-background italic">
                {locale === "en"
                  ? '"We realized that if we did not anchor our traditions in an institution, they would wash away with the tide of modernity. The club was our anchor."'
                  : '"हामीले महसुस गर्यौं कि यदि हामीले हाम्रा परम्पराहरूलाई संस्थागत रूपमा बलियो बनाएनौं भने, ती आधुनिकताको बहावमा हराउनेछन्। यो क्लब नै हाम्रो मुख्य आधार हो।"'}
              </p>
              <p className="font-sans text-label-sm text-on-surface-variant mt-stack-sm uppercase tracking-wider font-bold">
                — {locale === "en" ? "Founding Charter, 1979" : "संस्थापक घोषणापत्र, १९७९"}
              </p>
            </div>
          </div>

          {/* Right Column: Historical Photo */}
          <div className="relative w-full h-[450px] rounded-lg overflow-hidden border border-outline-variant shadow-heritage group">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCnLqby_l-RTe2nfiNGseduAiH3iW141iokax0GP4pRjJXHYoVa-ZBCPHL0zLDDDpvMcB_qnzhE-_vzt6Omc8HAyXVb_B0kvYFh29QDqHV6VB2vmDviprKWrGEIem0xDafE0Sz5a28BFba24Ngby5LjLQQoEGUyNjByPkX7szSxU9Fr_n4OzlQJ3FdvRwrMACECsrpOWWFWmZY-zJ4LJVHwOGWrOhlDpTMS5dnKW4DPmK-c2w7zpiA_VG-MQ7etNG_EuhzRvpUoCo"
              alt="Himali Pariwar Club Founding Charter Members, 1979"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-103 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* Leadership & Org Structure */}
      <section className="bg-surface-container-low py-section-gap border-y border-outline-variant">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center max-w-2xl mx-auto mb-stack-lg">
            <h2 className="font-serif text-headline-md text-secondary font-bold">
              {locale === "en" ? "Leadership & Structure" : "नेतृत्व र संगठनात्मक संरचना"}
            </h2>
            <p className="font-sans text-body-md text-on-surface-variant mt-2">
              {locale === "en"
                ? "Our executive committee is democratically elected every three years, ensuring community representation and transparent oversight."
                : "हाम्रो कार्यसमिति प्रत्येक तीन वर्षमा लोकतान्त्रिक रूपमा निर्वाचित हुन्छ, जसले सामुदायिक प्रतिनिधित्व र पारदर्शी नेतृत्व सुनिश्चित गर्दछ।"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
            <Card hoverEffect={false} className="text-center flex flex-col items-center">
              <span className="material-symbols-outlined text-4xl text-primary mb-2">account_circle</span>
              <h3 className="font-serif text-title-lg text-on-surface font-semibold">Gopal Krishna Shrestha</h3>
              <p className="font-sans text-xs text-primary font-bold uppercase tracking-wider mb-2">
                {locale === "en" ? "President" : "अध्यक्ष"}
              </p>
              <p className="font-sans text-xs text-on-surface-variant">
                {locale === "en"
                  ? "Over 25 years of social service in Ward 21. Oversees structural preservation partnerships."
                  : "वडा २१ मा २५ वर्षभन्दा बढी सामाजिक सेवाको अनुभव। सम्पदा संरक्षण कार्यक्रमहरूको रेखदेख।"}
              </p>
            </Card>

            <Card hoverEffect={false} className="text-center flex flex-col items-center">
              <span className="material-symbols-outlined text-4xl text-primary mb-2">account_circle</span>
              <h3 className="font-serif text-title-lg text-on-surface font-semibold">Anjana Maharjan</h3>
              <p className="font-sans text-xs text-primary font-bold uppercase tracking-wider mb-2">
                {locale === "en" ? "Vice President & Program Lead" : "उपाध्यक्ष तथा कार्यक्रम प्रमुख"}
              </p>
              <p className="font-sans text-xs text-on-surface-variant">
                {locale === "en"
                  ? "Specializes in intangible heritage education and managing summer youth workshops."
                  : "अमूर्त सम्पदा शिक्षा र ग्रीष्मकालीन युवा कार्यशाला व्यवस्थापनमा विशेषज्ञ।"}
              </p>
            </Card>

            <Card hoverEffect={false} className="text-center flex flex-col items-center">
              <span className="material-symbols-outlined text-4xl text-primary mb-2">account_circle</span>
              <h3 className="font-serif text-title-lg text-on-surface font-semibold">Ramesh Kumar Dangol</h3>
              <p className="font-sans text-xs text-primary font-bold uppercase tracking-wider mb-2">
                {locale === "en" ? "General Secretary" : "महासचिव"}
              </p>
              <p className="font-sans text-xs text-on-surface-variant">
                {locale === "en"
                  ? "Coordinates emergency health dispatch volunteers and handles institutional communications."
                  : "आपतकालीन स्वास्थ्य सेवा स्वयंसेवकहरूको समन्वय र संस्थागत सञ्चारको व्यवस्थापन।"}
              </p>
            </Card>
          </div>

          <div className="text-center mt-stack-lg">
            <Link
              href={`/${locale}/about/governance`}
              className="bg-transparent border border-primary text-primary font-sans text-label-md px-6 py-3 rounded hover:bg-primary hover:text-on-primary transition-colors inline-block"
            >
              {t.governance}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
