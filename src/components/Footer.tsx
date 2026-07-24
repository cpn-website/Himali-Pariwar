import React from "react";
import Link from "next/link";
import { Locale, translations } from "@/data/translations";
import { siteConfig } from "@/config/siteConfig";

interface FooterProps {
  locale: Locale;
}

export const Footer: React.FC<FooterProps> = ({ locale }) => {
  const t = translations[locale];

  return (
    <footer className="bg-surface-bright border-t border-outline-variant w-full py-8 mt-auto">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop space-y-6">
        
        {/* Main Footer Row */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 pb-6 border-b border-outline-variant/30">
          
          {/* Left: Brand Logo & Title */}
          <div className="flex items-center gap-3">
            {/* Visual Red Ornamental Circle mimicking the logo in screenshot */}
            <div className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center text-primary font-bold font-serif text-sm bg-primary-fixed/20">
              HPC
            </div>
            <div>
              <Link
                href={`/${locale}`}
                className="font-serif text-sm font-bold text-primary tracking-tight hover:opacity-90 block leading-none"
              >
                {siteConfig.name[locale]}
              </Link>
              <span className="text-[10px] text-on-surface-variant font-medium mt-1 block">
                {siteConfig.tagline[locale]} (Est. 1979)
              </span>
            </div>
          </div>

          {/* Center/Right: Horizontal Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[10px] font-sans font-bold text-secondary tracking-widest uppercase">
            <Link href={`/${locale}`} className="hover:text-primary transition-colors">
              {t.home}
            </Link>
            <Link href={`/${locale}/about`} className="hover:text-primary transition-colors">
              {t.about}
            </Link>
            <Link href={`/${locale}/heritage`} className="hover:text-primary transition-colors">
              {t.heritage}
            </Link>
            <Link href={`/${locale}/programs`} className="hover:text-primary transition-colors">
              {t.programs}
            </Link>
            <Link href={`/${locale}/events`} className="hover:text-primary transition-colors">
              {t.events}
            </Link>
            <Link href={`/${locale}/news`} className="hover:text-primary transition-colors">
              {t.news}
            </Link>
            <Link href={`/${locale}/gallery`} className="hover:text-primary transition-colors">
              {t.gallery}
            </Link>
            <Link href={`/${locale}/contact`} className="hover:text-primary hover:underline transition-colors text-primary font-extrabold">
              {t.contact}
            </Link>
          </nav>

          {/* Right: Rounded Outline Action Button (Mimicking the screenshot button) */}
          <div className="flex-shrink-0">
            <Link
              href={`/${locale}/volunteer`}
              className="inline-block px-5 py-2.5 border border-secondary text-secondary font-sans text-xs font-bold rounded-full hover:bg-secondary hover:text-on-secondary transition-all duration-300 tracking-wider hover:scale-[1.03]"
            >
              {locale === "en" ? "JOIN OUR CAUSE" : "हाम्रो अभियानमा जोडिनुहोस्"}
            </Link>
          </div>

        </div>

        {/* Bottom Sub-row: Copyright & Contact Details */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] text-on-surface-variant font-medium gap-2">
          <div>
            {t.copyright}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center text-on-surface-variant">
            <span>{t.phoneLabel}: <strong>{siteConfig.contact.phoneFormatted}</strong></span>
            <span>{t.emailLabel}: <strong>{siteConfig.contact.email}</strong></span>
            <span>{siteConfig.contact.address[locale]}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
