"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Locale, translations } from "@/data/translations";
import { siteConfig } from "@/config/siteConfig";
import { Logo } from "@/components/Logo";

interface FooterProps {
  locale: Locale;
}

export const Footer: React.FC<FooterProps> = ({ locale }) => {
  const t = translations[locale];
  const pathname = usePathname();
  const router = useRouter();

  // Newsletter Form State
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(null);
    setErrorMsg("");

    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Newsletter Subscriber",
          email,
          message: "Subscription request for Himali Pariwar newsletter (footer)",
          type: "contact",
          inquiryType: "newsletter",
          honeypot,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(true);
        setEmail("");
      } else {
        setSuccess(false);
        setErrorMsg(data.error || "Subscription failed.");
      }
    } catch {
      setSuccess(false);
      setErrorMsg("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === locale) return;
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}`;
    const pathParts = pathname.split("/");
    pathParts[1] = newLocale;
    const newPath = pathParts.join("/");
    router.push(newPath);
  };

  return (
    <footer className="relative bg-[#111111] text-white/90 w-full pt-16 pb-8 mt-auto border-t border-transparent bg-gradient-to-r from-amber-500 via-primary to-amber-500 bg-[length:100%_3px] bg-no-repeat shadow-[0_-20px_50px_rgba(0,0,0,0.35)]">
      
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[130px] pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[130px] pointer-events-none translate-y-1/2"></div>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 space-y-12">
        
        {/* Four Column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-margin-desktop items-start">
          
          {/* Column 1: Identity & Credentials */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/5 border border-white/10 shadow-inner group">
                <Logo className="w-10 h-10 text-primary-fixed-dim group-hover:scale-108 transition-transform duration-500" />
              </div>
              <div>
                <Link
                  href={`/${locale}`}
                  className="font-serif text-lg font-bold tracking-tight text-white hover:text-primary-fixed-dim transition-colors block leading-none"
                >
                  {siteConfig.name[locale]}
                </Link>
                <span className="text-[10px] text-white/50 font-medium mt-1.5 block">
                  {siteConfig.tagline[locale]}
                </span>
              </div>
            </div>

            <p className="font-sans text-xs text-white/60 leading-relaxed">
              {locale === "en" 
                ? "Preserving tangible and intangible heritage, empowering youth, and supporting the community in Jaishidewal since 1979."
                : " जैसीदेवल क्षेत्रको मूर्त र अमूर्त सांस्कृतिक धरोहर संरक्षण गर्न, युवाहरूलाई सबल बनाउन र सामाजिक कल्याणका लागि क्रियाशील संस्था।"}
            </p>

            {/* SWC Affiliation Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 border border-white/10 text-[10px] font-sans text-white/70 font-semibold shadow-sm">
              <span className="material-symbols-outlined text-amber-500 text-sm">verified</span>
              <span>SWC Affiliated No. 8</span>
            </div>
            
            {/* Social Icons row */}
            <div className="flex space-x-2.5 pt-2">
              {Object.entries(siteConfig.socials).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-primary hover:border-primary transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                  aria-label={platform}
                >
                  <span className="material-symbols-outlined text-base">
                    {platform === "facebook" && "facebook"}
                    {platform === "twitter" && "share"}
                    {platform === "instagram" && "photo_camera"}
                    {platform === "youtube" && "play_arrow"}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Sitemap Links (Two-column grid) */}
          <div className="space-y-4">
            <h4 className="font-serif text-xs font-bold text-amber-500 tracking-widest uppercase">
              {t.quickLinks}
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs text-white/70 font-medium">
              <Link href={`/${locale}`} className="hover-underline-expand hover:text-white pb-0.5 block">
                {t.home}
              </Link>
              <Link href={`/${locale}/about`} className="hover-underline-expand hover:text-white pb-0.5 block">
                {t.story}
              </Link>
              <Link href={`/${locale}/about/governance`} className="hover-underline-expand hover:text-white pb-0.5 block">
                {t.governance}
              </Link>
              <Link href={`/${locale}/heritage`} className="hover-underline-expand hover:text-white pb-0.5 block">
                {t.heritage}
              </Link>
              <Link href={`/${locale}/programs`} className="hover-underline-expand hover:text-white pb-0.5 block">
                {t.programs}
              </Link>
              <Link href={`/${locale}/events`} className="hover-underline-expand hover:text-white pb-0.5 block">
                {t.events}
              </Link>
              <Link href={`/${locale}/volunteer`} className="hover-underline-expand hover:text-white pb-0.5 block">
                {t.volunteer}
              </Link>
              <Link href={`/${locale}/gallery`} className="hover-underline-expand hover:text-white pb-0.5 block">
                {t.gallery}
              </Link>
              <Link href={`/${locale}/news`} className="hover-underline-expand hover:text-white pb-0.5 block">
                {t.news}
              </Link>
              <Link href={`/${locale}/contact`} className="hover-underline-expand hover:text-white pb-0.5 block">
                {t.contact}
              </Link>
            </div>
          </div>

          {/* Column 3: Emergency Contacts (Tap-to-call chips) */}
          <div className="space-y-4">
            <h4 className="font-serif text-xs font-bold text-amber-500 tracking-widest uppercase">
              {locale === "en" ? "EMERGENCY CONTACTS" : "आकस्मिक सम्पर्कहरू"}
            </h4>
            <div className="space-y-3 font-sans text-xs">
              
              {/* Phone contact chip */}
              <a
                href={`tel:${siteConfig.contact.phoneFormatted}`}
                className="flex items-center gap-3 p-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-white/80 hover:text-white"
              >
                <span className="material-symbols-outlined text-amber-500 text-lg">call</span>
                <div>
                  <span className="text-[10px] text-white/50 block font-semibold leading-none mb-1">
                    {locale === "en" ? "GENERAL HELPLINE" : "मुख्य हेल्पलाइन"}
                  </span>
                  <span className="font-bold tracking-wide">{siteConfig.contact.phoneFormatted}</span>
                </div>
              </a>

              {/* Emergency coordinator chip */}
              <a
                href="tel:+9779851000000"
                className="flex items-center gap-3 p-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-white/80 hover:text-white"
              >
                <span className="material-symbols-outlined text-amber-500 text-lg">volunteer_activism</span>
                <div>
                  <span className="text-[10px] text-white/50 block font-semibold leading-none mb-1">
                    {locale === "en" ? "BLOOD DONATION DIRECTORY" : "रक्तदाता समन्वय"}
                  </span>
                  <span className="font-bold tracking-wide">+977 98510-00000</span>
                </div>
              </a>

              {/* Email contact chip */}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-3 p-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-white/80 hover:text-white"
              >
                <span className="material-symbols-outlined text-amber-500 text-lg">mail</span>
                <div>
                  <span className="text-[10px] text-white/50 block font-semibold leading-none mb-1">
                    {locale === "en" ? "GENERAL EMAIL" : "इमेल सम्पर्क"}
                  </span>
                  <span className="font-medium truncate">{siteConfig.contact.email}</span>
                </div>
              </a>

            </div>
          </div>

          {/* Column 4: Newsletter & Action Hub */}
          <div className="space-y-5">
            <h4 className="font-serif text-xs font-bold text-amber-500 tracking-widest uppercase">
              {locale === "en" ? "GET INVOLVED" : "हामीसँग जोडिनुहोस्"}
            </h4>

            {/* Newsletter input form */}
            <form onSubmit={handleSubscribe} className="space-y-2">
              <span className="text-[10px] text-white/50 font-bold block">
                {locale === "en" ? "Subscribe to Heritage Circular" : "सम्पदा साप्ताहिक बुलेटिन दर्ता"}
              </span>
              
              {/* Honeypot spam trap */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="relative flex items-center">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={locale === "en" ? "Enter your email" : "आफ्नो इमेल लेख्नुहोस्"}
                  className="w-full bg-white/5 border border-white/10 text-white rounded-full py-2.5 pl-4 pr-12 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:outline-none font-sans text-xs transition-all placeholder-white/35"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="absolute right-1 top-1 bg-primary hover:bg-primary-container text-white w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 disabled:opacity-50"
                  aria-label="Subscribe"
                >
                  <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                </button>
              </div>

              {success === true && (
                <p className="text-[10px] text-amber-400 font-bold animate-spring-in pl-2">
                  {locale === "en" ? "Successfully Subscribed!" : "सफलतापूर्वक दर्ता गरियो!"}
                </p>
              )}
              {success === false && (
                <p className="text-[10px] text-red-500 font-bold animate-shake pl-2">
                  {errorMsg}
                </p>
              )}
            </form>

            {/* Support Us / Donate Direct Button */}
            <div className="space-y-3 pt-1">
              <Link
                href={`/${locale}/volunteer`}
                className="w-full text-center bg-primary hover:bg-primary-container text-white font-sans text-xs font-bold py-2.5 px-4 rounded-full block transition-colors shadow-md hover:scale-[1.02] active:scale-95 duration-200"
              >
                {locale === "en" ? "Support Our Cause" : "हाम्रो अभियानलाई सहयोग"}
              </Link>

              {/* Mirrored Language Switcher */}
              <div className="flex gap-2 justify-center items-center pt-2">
                <span className="text-[10px] text-white/45 font-bold uppercase tracking-wider">
                  {locale === "en" ? "Language:" : "भाषा छनोट:"}
                </span>
                <button
                  onClick={() => handleLocaleChange("en")}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    locale === "en" ? "bg-amber-500 text-[#111111]" : "bg-white/5 text-white/60 hover:text-white"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => handleLocaleChange("ne")}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    locale === "ne" ? "bg-amber-500 text-[#111111]" : "bg-white/5 text-white/60 hover:text-white"
                  }`}
                >
                  नेपाली
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar Details */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[10px] text-white/40 gap-4">
          <div className="space-y-1 text-center md:text-left">
            <div>
              &copy; {new Date().getFullYear()} Himali Pariwar Club. All rights reserved.
            </div>
            <div>
              Registered with Social Welfare Council, Nepal (Reg. No. 124/036 Kathmandu).
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <div className="flex gap-2">
              <Link href={`/${locale}/privacy`} className="hover:text-white transition-colors">
                {locale === "en" ? "Privacy Policy" : "गोपनीयता नीति"}
              </Link>
              <span>&bull;</span>
              <Link href={`/${locale}/terms`} className="hover:text-white transition-colors">
                {locale === "en" ? "Terms of Service" : "सेवाका सर्तहरू"}
              </Link>
            </div>
            <span className="hidden md:inline">&bull;</span>
            <span className="italic text-white/30">Built with care for Jaishidewal</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
