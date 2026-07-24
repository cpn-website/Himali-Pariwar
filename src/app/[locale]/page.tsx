import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Locale, translations } from "@/data/translations";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { HeritageDivider } from "@/components/ui/HeritageDivider";
import { StatStrip } from "@/components/ui/StatStrip";
import { newsData } from "@/data/news";
import { eventsData } from "@/data/events";
import { siteConfig } from "@/config/siteConfig";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = translations[locale as Locale];
  return {
    title: t.home + " | " + siteConfig.name[locale as Locale],
    description: t.heroSubtitle,
  };
}

export default async function HomePage({ params }: PageProps) {
  const resolvedParams = await params;
  const locale = (resolvedParams.locale || "en") as Locale;
  const t = translations[locale];

  // Get active upcoming events (max 3 - Symmetric)
  const upcomingEvents = eventsData
    .filter((e) => e.status === "upcoming")
    .slice(0, 3);

  // Get latest news (max 3 - Symmetric)
  const latestNews = newsData.slice(0, 3);

  // Stats definition
  const stats = [
    { value: "1979", label: t.statsEst, icon: "schedule" },
    { value: "150+", label: t.statsMembers, icon: "groups" },
    { value: "12", label: t.statsRestored, icon: "architecture" },
    { value: "5", label: t.statsInitiatives, icon: "volunteer_activism" },
  ];

  // Core pillars detailed for "20+ years experience" informative level
  const detailedPillars = [
    {
      id: "culture",
      title: t.culture,
      icon: "architecture",
      bulletPoints: {
        en: [
          "Restoring 17th-century pagodas and traditional woodcraft.",
          "Weekly classes for Dhime drumming, flute playing, and Charya dance.",
          "Mobilizing the annual Indra Jatra chariot construction marshals.",
        ],
        ne: [
          "१७ औं शताब्दीका प्यागोडा र परम्परागत काष्ठकलाको पुनरुत्थान।",
          "धिमे बाजा, बाँसुरी र चर्या नृत्यको साप्ताहिक प्रशिक्षण कक्षाहरू।",
          "वार्षिक इन्द्रजात्रा रथ निर्माण र स्वयंसेवक परिचालन समन्वय।",
        ],
      },
    },
    {
      id: "health",
      title: t.health,
      icon: "volunteer_activism",
      bulletPoints: {
        en: [
          "Free health clinics and medicine distribution for neighborhood elders.",
          "Instant blood donor database matching patients with local donors.",
          "First-responder training to handle municipal disaster scenarios.",
        ],
        ne: [
          "स्थानीय जेष्ठ नागरिकहरूका लागि निःशुल्क क्लिनिक तथा औषधि वितरण।",
          "अस्पतालमा रगत आवश्यक परेका बिरामीका लागि आकस्मिक रक्तदाता मिलान।",
          "आपतकालीन विपद् व्यवस्थापन र प्राथमिक उद्धार सम्बन्धी युवा तालिम।",
        ],
      },
    },
    {
      id: "athletics",
      title: t.athletics,
      icon: "sports_soccer",
      bulletPoints: {
        en: [
          "Youth football training leagues promoting physical fitness.",
          "Covered clubhouse table tennis championships every season.",
          "Weekly community runs and physical wellness programs.",
        ],
        ne: [
          "शारीरिक तन्दुरुस्तीका लागि नियमित फुटबल प्रशिक्षण र स्थानीय लिगहरू।",
          "क्लबको कभर्ड हलमा प्रत्येक सिजन टेबल टेनिस प्रतियोगिताहरू।",
          "साप्ताहिक सामुदायिक दौड र सामूहिक शारीरिक व्यायाम कक्षाहरू।",
        ],
      },
    },
  ];

  // Testimonials section to make the site look extremely professional
  const testimonials = [
    {
      quote: {
        en: "The club has been the backbone of Jaishidewal. They protected our temples in 2015 and kept our traditional drum beats alive in our youth.",
        ne: "हिमाली परिवार क्लब जैसीदेवलको मेरुदण्ड हो। उनीहरूले भूकम्पको बेला मन्दिर जोगाए र हाम्रा युवाहरूमा परम्परागत बाजा जोगाए।",
      },
      author: "Krishna Lal Maharjan",
      role: { en: "Community Elder (Age 74)", ne: "स्थानीय जेष्ठ नागरिक (७४ वर्ष)" },
    },
    {
      quote: {
        en: "Volunteering with the first-responder network gave me the training and purpose to serve Kathmandu in times of emergency.",
        ne: "प्राथमिक उद्धार टोलीमा स्वयंसेवा गर्दा मैले विपद्को समयमा काठमाडौंको सेवा गर्ने अवसर र उद्देश्य पाएँ।",
      },
      author: "Pooja Shrestha",
      role: { en: "Youth Volunteer", ne: "युवा स्वयंसेवक" },
    },
  ];

  return (
    <div className="flex flex-col flex-grow">
      
      {/* 1. Hero Section (Cinematic height & massive scale) */}
      <section className="relative overflow-hidden h-[calc(100vh-80px)] border-b border-outline-variant bg-black flex flex-col justify-center">
        {/* Full-width Heritage Backdrop Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAygFvbbqJB_fa_V2A_Fl4SHw-rgNMKLfLbmE00LGYCSdmiLxCTlgJeRjOiwygNqC-SAnxoQkzmW4p6O_hNoG-p9kygr5if7-fLVGMAaPxFFsXyEJyVe4PsdtK48G0Op-6vREhdjhOLZmFT-Fz9lX9-sVpDR4lug3Cn_CcNEBxPPPPDetQLhMhaFj2QV2KUbKqoEN1Dc-eA6iWA8Ih4EDgOwtybSpjJgs1ImdKFVbA_b1GmeclbIqNm97AI3aoF84yNuBPW01Z5kOE"
            alt="Jaishidewal Temple Backdrop"
            fill
            sizes="100vw"
            priority
            className="object-cover opacity-45 transform scale-102 transition-transform duration-[15000ms] hover:scale-105"
          />
          {/* Deep dark crimson gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-primary/45"></div>
        </div>

        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 text-center space-y-6">
          <Badge variant="secondary" className="mb-stack-sm tracking-widest text-primary bg-primary-fixed border border-primary-fixed-dim py-1 px-4 animate-fade-in">
            {siteConfig.established[locale]}
          </Badge>
          
          {/* Massive, bold header title */}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-stack-lg max-w-5xl mx-auto leading-none font-black tracking-tight drop-shadow-2xl animate-fade-in-up [animation-delay:200ms]">
            {t.heroTitle}
          </h1>
          
          <p className="font-sans text-sm md:text-xl text-white/90 max-w-3xl mx-auto mb-stack-lg leading-relaxed drop-shadow animate-fade-in-up [animation-delay:400ms]">
            {t.heroSubtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-stack-md pt-6 animate-fade-in-up [animation-delay:600ms]">
            <Link
              href={`/${locale}/volunteer`}
              className="bg-primary text-on-primary font-sans text-label-md px-10 py-4.5 rounded-full hover:opacity-95 transition-all duration-300 shadow-xl w-full sm:w-auto text-center hover:scale-105 bg-gradient-animate tracking-wide"
            >
              {t.becomeMember}
            </Link>
            <Link
              href={`/${locale}/about`}
              className="border border-white/40 text-white bg-white/10 backdrop-blur-sm font-sans text-label-md px-10 py-4.5 rounded-full hover:bg-white/20 transition-all duration-300 w-full sm:w-auto text-center hover:scale-105 tracking-wide"
            >
              {t.learnMore}
            </Link>
          </div>
        </div>

        {/* Bouncing Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-75 animate-bounce">
          <span className="text-[10px] font-sans tracking-widest text-white/70 uppercase font-bold">
            {locale === "en" ? "Scroll Down" : "तल स्क्रोल गर्नुहोस्"}
          </span>
          <span className="material-symbols-outlined text-white text-lg font-bold">expand_more</span>
        </div>
      </section>

      {/* 2. Animated Stat Strip (Only shows count up when scrolled into view) */}
      <StatStrip stats={stats} />

      {/* 3. Who We Are Section (Split visual & text) */}
      <section className="py-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid md:grid-cols-2 gap-margin-desktop items-center">
          <div className="relative aspect-square w-full rounded-lg overflow-hidden border border-outline-variant shadow-heritage group hover:border-primary/50 transition-colors duration-500">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCnLqby_l-RTe2nfiNGseduAiH3iW141iokax0GP4pRjJXHYoVa-ZBCPHL0zLDDDpvMcB_qnzhE-_vzt6Omc8HAyXVb_B0kvYFh29QDqHV6VB2vmDviprKWrGEIem0xDafE0Sz5a28BFba24Ngby5LjLQQoEGUyNjByPkX7szSxU9Fr_n4OzlQJ3FdvRwrMACECsrpOWWFWmZY-zJ4LJVHwOGWrOhlDpTMS5dnKW4DPmK-c2w7zpiA_VG-MQ7etNG_EuhzRvpUoCo"
              alt="Archival team photo 1979"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="space-y-stack-md animate-fade-in-up">
            <Badge variant="secondary">
              {locale === "en" ? "Our Heritage & Guardianship" : "हाम्रो सम्पदा र अभिभावकत्व"}
            </Badge>
            <h2 className="font-serif text-4xl md:text-5xl text-primary font-bold leading-tight">
              {locale === "en" ? "Over Forty Years of Grassroots Community Action" : "सामुदायिक सेवाको ४० वर्षभन्दा bढीको इतिहास"}
            </h2>
            <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
              {locale === "en"
                ? "Himali Pariwar Club was founded in 1979 by local visionaries who realized that Kathmandu's fast modernization was threatening historical monuments and local customs. What started as neighborhood gatherings under the temples of Jaishidewal quickly grew into a formally chartered institution protecting both tangible monuments and municipal welfare systems."
                : "जैसीदेवल मन्दिरको छहारीमुनि अनौपचारिक भेलाबाट सुरु भएको यो संस्थाले जैसीदेवल क्षेत्रको मूर्त र अमूर्त सांस्कृतिक धरोहर संरक्षणमा अतुलनीय भूमिका खेल्दै आएको छ।"}
            </p>
            <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
              {locale === "en"
                ? "Today, we run comprehensive programs spanning traditional arts training, public clinics, local disaster responder databases, and athletic leagues."
                : "आज हामी परम्परागत कला सिकाउने कार्यशाला, स्वास्थ्य शिविर, प्राथमिक उपचार टोली र खेलकुद क्लबहरू सञ्चालन गरिरहेका छौं।"}
            </p>
            <div className="pt-2">
              <Link
                href={`/${locale}/about`}
                className="text-primary font-sans text-label-md font-bold inline-flex items-center gap-1 hover:underline transition-all"
              >
                {locale === "en" ? "Read Our Complete Story" : "हाम्रो इतिहास पढ्नुहोस्"}{" "}
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Immersive Legacy of Ward 21 Section (Symmetric Grid of 3 Cards) */}
      <section className="bg-surface-container-low py-section-gap border-y border-outline-variant">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop space-y-stack-lg">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <Badge variant="primary">{locale === "en" ? "MUNICIPAL IMPACT" : "सामुदायिक प्रभाव विवरण"}</Badge>
            <h2 className="font-serif text-3xl md:text-5xl text-primary font-bold">
              {locale === "en" ? "The Historical Fabric of Ward 21" : "जैसीदेवल तथा वडा २१ को सम्पदा मार्ग"}
            </h2>
            <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
              {locale === "en"
                ? "Our conservation operations are embedded directly within the core heritage zone of Kathmandu municipality."
                : "हाम्रा सम्पदा संरक्षण कार्यक्रमहरू काठमाडौँ महानगरपालिकाको ऐतिहासिक वडा २१ क्षेत्र भित्र प्रत्यक्ष परिचालन गरिएका छन्।"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter pt-6">
            <Card hoverEffect={false} className="card-hover-lift bg-surface-bright p-stack-lg flex flex-col justify-between h-[300px] border border-outline-variant/60 shadow-heritage animate-fade-in-up">
              <div className="space-y-stack-md">
                <span className="material-symbols-outlined text-4xl text-primary">temple_hindu</span>
                <h4 className="font-serif text-title-lg text-secondary font-bold">
                  {locale === "en" ? "Jaishidewal Temple Care" : "जैसीदेवल मन्दिर संरक्षण"}
                </h4>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                  {locale === "en"
                    ? "Direct supervision of the 1685 AD pagoda struts, stone paving maintenance, and cleaning campaigns."
                    : "सन् १६८५ मा निर्मित प्यागोडा टुँडालहरूको रेखदेख, ढुङ्गे मार्ग मर्मत र नियमित सरसफाई अभियान।"}
                </p>
              </div>
            </Card>

            <Card hoverEffect={false} className="card-hover-lift bg-surface-bright p-stack-lg flex flex-col justify-between h-[300px] border border-outline-variant/60 shadow-heritage animate-fade-in-up [animation-delay:150ms]">
              <div className="space-y-stack-md">
                <span className="material-symbols-outlined text-4xl text-primary">diversity_1</span>
                <h4 className="font-serif text-title-lg text-secondary font-bold">
                  {locale === "en" ? "Local Guthis Support" : "गुठी तथा परम्परागत सहकार्य"}
                </h4>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                  {locale === "en"
                    ? "Providing financial aid, venue spaces, and coordination for traditional Newar guthi assemblies."
                    : "स्थानीय नेवार समुदायका गुठी बैठकहरूका लागि आर्थिक सहायता, स्थान र समन्वय सेवा प्रदान।"}
                </p>
              </div>
            </Card>

            <Card hoverEffect={false} className="card-hover-lift bg-surface-bright p-stack-lg flex flex-col justify-between h-[300px] border border-outline-variant/60 shadow-heritage animate-fade-in-up [animation-delay:300ms]">
              <div className="space-y-stack-md">
                <span className="material-symbols-outlined text-4xl text-primary">volunteer_activism</span>
                <h4 className="font-serif text-title-lg text-secondary font-bold">
                  {locale === "en" ? "First Responder Base" : "आपतकालीन स्वास्थ्य शिविर"}
                </h4>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                  {locale === "en"
                    ? "Maintaining emergency oxygen reserves, donor lists, and dispatching medical escorts for elders."
                    : "आपतकालीन अक्सिजन भण्डारण, आकस्मिक रक्तदाता सूची र बुढापाकाका लागि स्वास्थ्य सहायता टोली परिचालन।"}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 5. Detailed Informative Programs Grid */}
      <section className="py-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center max-w-2xl mx-auto mb-stack-lg">
          <Badge variant="primary">{locale === "en" ? "WHAT WE DO" : "हाम्रा मुख्य कार्यहरू"}</Badge>
          <h2 className="font-serif text-3xl md:text-5xl text-primary font-bold mt-2">
            {locale === "en" ? "Our Active Core Programs" : "हाम्रा सक्रिय मुख्य कार्यक्रमहरू"}
          </h2>
          <p className="font-sans text-body-md text-on-surface-variant mt-2 leading-relaxed">
            {locale === "en"
              ? "Explore the detailed structures of our local community operations, funded directly by transparent donations."
              : "हाम्रा स्थानीय कार्यक्रमहरूको विस्तृत रूपरेखा, जुन पारदर्शी चन्दाबाट सञ्चालन गरिन्छ।"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {detailedPillars.map((pillar, idx) => (
            <Card key={pillar.id} className="card-hover-lift flex flex-col justify-between p-stack-lg bg-surface-container-low h-[430px] border border-outline-variant/60 shadow-heritage">
              <div className="space-y-stack-md">
                <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary mb-2 shadow-sm">
                  <span className="material-symbols-outlined text-2xl">{pillar.icon}</span>
                </div>
                <h3 className="font-serif text-title-lg text-on-surface font-semibold pt-2">
                  {pillar.title}
                </h3>
                <ul className="space-y-2 text-xs text-on-surface-variant font-medium pt-2">
                  {pillar.bulletPoints[locale].map((point, idx) => (
                    <li key={idx} className="flex gap-2 items-start">
                      <span className="material-symbols-outlined text-primary text-[14px] mt-0.5">check_circle</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={`/${locale}/programs/${pillar.id}`}
                className="text-secondary font-sans text-xs font-bold inline-flex items-center gap-1 hover:text-primary transition-colors mt-6 pt-3 border-t border-outline-variant/60"
              >
                {t.viewDetails}
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* 6. Featured Heritage Restoration */}
      <section className="py-section-gap bg-surface-container-low border-y border-outline-variant">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid md:grid-cols-2 gap-margin-desktop items-center">
          <div className="space-y-stack-md animate-fade-in-up">
            <Badge variant="secondary">
              {locale === "en" ? "Active Monument Care" : "सक्रिय सम्पदा संरक्षण"}
            </Badge>
            <h2 className="font-serif text-3xl md:text-5xl text-primary font-bold leading-tight">
              {locale === "en" ? "Restoring the Pagoda Struts of Jaishidewal" : "जैसीदेवलको टुँडाल तथा काष्ठकलाको जीर्णोद्धार"}
            </h2>
            <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
              {locale === "en"
                ? "Our physical restoration campaigns are conducted under strict guidelines from the Department of Archaeology. Himali Pariwar Club coordinates master carpenters, woodcarvers, and community apprentices to reconstruct historic pagoda elements damaged by weather and earthquakes. Absolutely no modern cement or concrete is used."
                : "हाम्रा भौतिक सम्पदा पुनर्निर्माण अभियानहरू पुरातत्व विभागको कडा मापदण्ड अन्तर्गत सञ्चालन हुन्छन्। मर्मत कार्यमा परम्परागत चुना-सुर्की र इँटाहरूको प्रयोग सुनिश्चित गरिएको छ।"}
            </p>
            <div className="pt-2">
              <Link
                href={`/${locale}/programs/culture`}
                className="text-primary font-sans text-label-md font-bold inline-flex items-center gap-1 hover:underline transition-all"
              >
                {locale === "en" ? "Explore Cultural Programs" : "सांस्कृतिक कार्यक्रम हेर्नुहोस्"}{" "}
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
          <div className="relative aspect-video rounded-lg overflow-hidden border border-outline-variant shadow-heritage group">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAygFvbbqJB_fa_V2A_Fl4SHw-rgNMKLfLbmE00LGYCSdmiLxCTlgJeRjOiwygNqC-SAnxoQkzmW4p6O_hNoG-p9kygr5if7-fLVGMAaPxFFsXyEJyVe4PsdtK48G0Op-6vREhdjhOLZmFT-Fz9lX9-sVpDR4lug3Cn_CcNEBxPPPPDetQLhMhaFj2QV2KUbKqoEN1Dc-eA6iWA8Ih4EDgOwtybSpjJgs1ImdKFVbA_b1GmeclbIqNm97AI3aoF84yNuBPW01Z5kOE"
              alt="Jaishidewal woodcarving"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* 7. Official President's Welcome Segment (Highly Informative addition) */}
      <section className="py-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="bg-surface-container-low/40 border border-outline-variant rounded-2xl p-8 md:p-12 grid md:grid-cols-3 gap-8 items-center shadow-lg">
          <div className="md:col-span-1 flex flex-col items-center text-center space-y-4">
            <div className="w-32 h-32 rounded-full border-4 border-primary/20 overflow-hidden relative shadow-md">
              <div className="absolute inset-0 bg-primary/10 flex items-center justify-center text-primary font-bold font-serif text-3xl">
                RM
              </div>
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-primary">Rajesh Maharjan</h4>
              <p className="font-sans text-[10px] text-on-surface-variant font-medium uppercase tracking-wider mt-0.5">
                {locale === "en" ? "President, Himali Pariwar" : "अध्यक्ष, हिमाली परिवार क्लब"}
              </p>
            </div>
          </div>

          <div className="md:col-span-2 space-y-4">
            <Badge variant="primary">{locale === "en" ? "President's Message" : "अध्यक्षको मन्तव्य"}</Badge>
            <h3 className="font-serif text-2xl md:text-3xl text-secondary font-bold">
              {locale === "en" ? "Guardians of Our Living Memory" : "हाम्रो इतिहास र संस्कृतिको संरक्षण"}
            </h3>
            <p className="font-sans text-xs md:text-sm text-on-surface-variant italic leading-relaxed">
              &ldquo;{locale === "en"
                ? "Our ancestors carved their souls into the timber of Jaishidewal. Himali Pariwar Club is here to ensure that as Kathmandu strides into the future, the sound of our drums, the legacy of our craftsmanship, and the mutual solidarity of our neighborhood remain unbreakable."
                : "हाम्रा पूर्वजहरूले जैसीदेवलका काष्ठकलामा आफ्नो कला र आत्मा भरेका छन्। काठमाडौँ आधुनिकता तर्फ अघि बढ्दै गर्दा हाम्रो परम्परागत बाजा र सामुदायिक एकता अक्षुण्ण रहोस् भन्ने नै हाम्रो ध्येय हो। 9"}</p>
          </div>
        </div>
      </section>

      {/* 8. Testimonials Section */}
      <section className="py-section-gap bg-surface-container-low border-t border-b border-outline-variant">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <h2 className="font-serif text-3xl md:text-4xl text-primary font-bold text-center mb-stack-lg">
            {locale === "en" ? "Voices from Jaishidewal" : "जैसीदेवलवासीका आवाजहरू"}
          </h2>
          <div className="grid md:grid-cols-2 gap-gutter">
            {testimonials.map((test, idx) => (
              <Card key={idx} hoverEffect={false} className="card-hover-lift bg-surface-bright flex flex-col justify-between py-6 px-8 border-l-4 border-primary shadow-sm border border-outline-variant/40">
                <p className="font-serif text-sm text-on-surface-variant italic leading-relaxed">
                  &ldquo;{test.quote[locale]}&rdquo;
                </p>
                <div className="mt-4 pt-3 border-t border-outline-variant/40">
                  <span className="font-sans font-bold text-on-surface text-xs block">{test.author}</span>
                  <span className="font-sans text-[10px] text-on-surface-variant font-medium">{test.role[locale]}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Upcoming Events & News Preview */}
      <section className="py-section-gap bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid md:grid-cols-2 gap-margin-desktop">
          
          {/* Upcoming Events (Symmetric 3 items) */}
          <div className="space-y-stack-lg">
            <div className="flex justify-between items-end border-b border-outline-variant pb-2">
              <h3 className="font-serif text-headline-md text-secondary font-bold">
                {t.upcomingEvents}
              </h3>
              <Link href={`/${locale}/events`} className="font-sans text-xs text-secondary hover:text-primary font-semibold">
                {t.viewAllEvents}
              </Link>
            </div>
            
            <div className="space-y-stack-md">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex gap-4 p-4 rounded-lg bg-surface border border-outline-variant/60 shadow-heritage hover:border-secondary/60 transition-colors duration-300">
                  <div className="flex-shrink-0 w-12 h-14 bg-secondary-fixed text-on-secondary-fixed-variant rounded flex flex-col items-center justify-center font-bold">
                    <span className="text-sm leading-none">{event.date.split("-")[2]}</span>
                    <span className="text-[10px] uppercase tracking-wider mt-1">
                      {new Date(event.date).toLocaleString(locale, { month: "short" })}
                    </span>
                  </div>
                  <div className="flex-grow space-y-1">
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0.5">
                      {event.category[locale]}
                    </Badge>
                    <h4 className="font-serif text-title-lg text-on-surface font-semibold">
                      {event.title[locale]}
                    </h4>
                    <p className="font-sans text-xs text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">location_on</span>
                      {event.location[locale]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Latest News (Symmetric 3 items) */}
          <div className="space-y-stack-lg">
            <div className="flex justify-between items-end border-b border-outline-variant pb-2">
              <h3 className="font-serif text-headline-md text-primary font-bold">
                {t.latestNews}
              </h3>
              <Link href={`/${locale}/news`} className="font-sans text-xs text-primary hover:opacity-80 font-semibold">
                {t.viewAllNews}
              </Link>
            </div>
            
            <div className="space-y-stack-md">
              {latestNews.map((news) => (
                <div key={news.id} className="grid grid-cols-3 gap-4 items-center">
                  <div className="relative aspect-video rounded border border-outline-variant overflow-hidden">
                    <Image
                      src={news.image}
                      alt={news.title[locale]}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="col-span-2 space-y-1">
                    <span className="font-sans text-[10px] text-on-surface-variant font-medium">
                      {new Date(news.date).toLocaleDateString(locale, { dateStyle: "medium" })}
                    </span>
                    <h4 className="font-serif text-title-lg text-primary font-semibold line-clamp-1 hover:underline">
                      <Link href={`/${locale}/news#${news.id}`}>
                        {news.title[locale]}
                      </Link>
                    </h4>
                    <p className="font-sans text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                      {news.summary[locale]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 10. Call to Action Section */}
      <section className="py-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center space-y-4">
        <HeritageDivider withOrnament className="mb-stack-lg" />
        <h2 className="font-serif text-4xl text-primary font-bold">
          {locale === "en" ? "Support Our Heritage Guard" : "हाम्रो सम्पदा संरक्षण अभियानलाई सहयोग गर्नुहोस्"}
        </h2>
        <p className="font-sans text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-stack-lg leading-relaxed">
          {locale === "en"
            ? "Your participation ensures traditional arts, local youth training, and community disaster response systems remain funded. Stand with जैसीदेवल."
            : "तपाईंको सहभागिताले परम्परागत कला, स्थानीय युवा तालिम र सामुदायिक आपतकालीन स्वास्थ्य सेवा प्रणाली सञ्चालन गर्न मद्दत गर्नेछ। जैसीदेवलसँग उभिनुहोस्।"}
        </p>
        <Link
          href={`/${locale}/volunteer`}
          className="bg-primary text-on-primary font-sans text-label-md px-10 py-4.5 rounded-full hover:opacity-95 transition-all duration-300 shadow-xl inline-block hover:scale-105 bg-gradient-animate tracking-wide"
        >
          {t.joinUs}
        </Link>
      </section>
    </div>
  );
}
