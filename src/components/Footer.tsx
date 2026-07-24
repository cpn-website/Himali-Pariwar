"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Locale, translations } from "@/data/translations";
import { siteConfig } from "@/config/siteConfig";
import { Logo } from "@/components/Logo";

interface FooterProps {
  locale: Locale;
}

export const Footer: React.FC<FooterProps> = ({ locale }) => {
  const t = translations[locale];
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="relative bg-[#111111] text-white/90 w-full pt-16 pb-8 mt-auto border-t border-transparent bg-gradient-to-r from-amber-500 via-primary to-amber-500 bg-[length:100%_2px] bg-no-repeat shadow-[0_-20px_50px_rgba(0,0,0,0.3)]">
      
      {/* Subtle background ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] pointer-events-none translate-y-1/2"></div>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 space-y-12">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-margin-desktop">
          
          {/* Column 1: Brand & Newsletter */}
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
                ? "Join our circle. Receive weekly heritage logs, emergency relief schedules, and restoration milestones directly."
                : "हाम्रो सूचना अभियानमा जोडिनुहोस्। सम्पदा संरक्षण, स्वास्थ्य शिविर र जात्रा सम्बन्धी जानकारी प्राप्त गर्नुहोस्।"}
            </p>

            {/* Sexy Newsletter Input */}
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative flex items-center">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={locale === "en" ? "Enter your email" : "आफ्नो इमेल लेख्नुहोस्"}
                  className="w-full bg-white/5 border border-white/10 text-white rounded-full py-2.5 pl-4 pr-12 focus:ring-1 focus:ring-amber-500 focus:border-amber-500 focus:outline-none font-sans text-xs transition-all placeholder-white/35"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bg-primary hover:bg-primary-container text-white w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none"
                >
                  <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                </button>
              </div>
              {subscribed && (
                <p className="text-[10px] text-amber-400 font-bold animate-fade-in pl-2">
                  {locale === "en" ? "Successfully Subscribed!" : "सफलतापूर्वक दर्ता गरियो!"}
                </p>
              )}
            </form>
          </div>

          {/* Column 2: Navigation Links (Sexy List) */}
          <div className="space-y-4">
            <h4 className="font-serif text-xs font-bold text-amber-500 tracking-widest uppercase">
              {t.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70 font-medium">
              <li>
                <Link href={`/${locale}`} className="hover-underline-expand hover:text-white pb-0.5 inline-block">
                  {t.home}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} className="hover-underline-expand hover:text-white pb-0.5 inline-block">
                  {t.story}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about/governance`} className="hover-underline-expand hover:text-white pb-0.5 inline-block">
                  {t.governance}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/heritage`} className="hover-underline-expand hover:text-white pb-0.5 inline-block">
                  {t.heritage}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Pillars & Details */}
          <div className="space-y-4">
            <h4 className="font-serif text-xs font-bold text-amber-500 tracking-widest uppercase">
              {t.programs}
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70 font-medium">
              <li>
                <Link href={`/${locale}/programs/culture`} className="hover-underline-expand hover:text-white pb-0.5 inline-block">
                  {t.culture}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/programs/health`} className="hover-underline-expand hover:text-white pb-0.5 inline-block">
                  {t.health}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/programs/athletics`} className="hover-underline-expand hover:text-white pb-0.5 inline-block">
                  {t.athletics}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/gallery`} className="hover-underline-expand hover:text-white pb-0.5 inline-block">
                  {t.gallery}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Social Connect */}
          <div className="space-y-5">
            <h4 className="font-serif text-xs font-bold text-amber-500 tracking-widest uppercase">
              {locale === "en" ? "CONTACT INFO" : "सम्पर्क विवरण"}
            </h4>
            
            <div className="space-y-3 font-sans text-xs text-white/70">
              <p className="leading-relaxed">
                {siteConfig.contact.address[locale]}
              </p>
              
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-500 text-sm">call</span>
                <a href={`tel:${siteConfig.contact.phoneFormatted}`} className="text-white font-bold hover:underline">
                  {siteConfig.contact.phoneFormatted}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-500 text-sm">mail</span>
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:underline">
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>

            {/* Sexy Social Icons */}
            <div className="flex space-x-2 pt-2">
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

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[10px] text-white/40 gap-4">
          <div>
            &copy; {new Date().getFullYear()} Himali Pariwar Club. All rights reserved.
          </div>
          <div className="flex gap-4">
            <Link href={`/${locale}/about/governance`} className="hover:text-white transition-colors">
              {locale === "en" ? "Audited Accounts" : "लेखापरीक्षण विवरण"}
            </Link>
            <span>&bull;</span>
            <span>Reg. No. 124/036 Kathmandu</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
