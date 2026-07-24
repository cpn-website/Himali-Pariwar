"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Locale, translations } from "@/data/translations";
import { siteConfig } from "@/config/siteConfig";

interface HeaderProps {
  locale: Locale;
}

export const Header: React.FC<HeaderProps> = ({ locale }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const t = translations[locale];

  // Helper to check if a route is active
  const isActive = (path: string) => {
    // path is something like "/about"
    const targetPath = `/${locale}${path === "/" ? "" : path}`;
    if (path === "/") {
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return pathname.startsWith(targetPath);
  };

  // Switch locale
  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === locale) return;

    // Persist locale in cookie
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}`;

    // Replace the locale in the pathname
    const pathParts = pathname.split("/"); // e.g. ["", "en", "about"]
    pathParts[1] = newLocale;
    const newPath = pathParts.join("/");
    router.push(newPath);
  };

  // Nav links definitions
  const navLinks = [
    { label: t.home, path: "/" },
    { label: t.about, path: "/about" },
    { label: t.heritage, path: "/heritage" },
    { label: t.programs, path: "/programs" },
    { label: t.events, path: "/events" },
    { label: t.volunteer, path: "/volunteer" },
  ];

  return (
    <>
      <header className="bg-surface border-b border-outline-variant fixed top-0 w-full z-50 transition-all duration-300">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex justify-between items-center h-20">
          {/* Brand Name */}
          <Link
            href={`/${locale}`}
            className="font-serif text-title-lg font-bold text-primary tracking-tight hover:opacity-90 transition-opacity"
          >
            {siteConfig.name[locale]}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-gutter items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={`/${locale}${link.path === "/" ? "" : link.path}`}
                className={`font-sans text-label-md transition-colors duration-200 py-2 border-b-2 ${
                  isActive(link.path)
                    ? "border-primary text-primary font-bold"
                    : "border-transparent text-on-surface-variant hover:text-primary hover:border-outline-variant"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-stack-md">
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="text-on-surface-variant hover:text-primary transition-colors focus:outline-none"
              aria-label="Search"
            >
              <span className="material-symbols-outlined">search</span>
            </button>

            {/* Verification Icons */}
            <div className="flex space-x-stack-sm text-primary/80">
              <span className="material-symbols-outlined" title="Verified NGO">verified</span>
              <span className="material-symbols-outlined" title="Official Community Portal">account_balance</span>
            </div>

            {/* Language Switcher */}
            <div className="flex border border-outline-variant rounded-md overflow-hidden text-xs font-semibold">
              <button
                onClick={() => handleLocaleChange("en")}
                className={`px-3 py-1.5 transition-colors ${
                  locale === "en" ? "bg-primary text-on-primary" : "bg-surface hover:bg-surface-container-low text-on-surface-variant"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => handleLocaleChange("ne")}
                className={`px-3 py-1.5 transition-colors ${
                  locale === "ne" ? "bg-primary text-on-primary" : "bg-surface hover:bg-surface-container-low text-on-surface-variant"
                }`}
              >
                नेपाली
              </button>
            </div>

            {/* CTA */}
            <Link
              href={`/${locale}/volunteer`}
              className="bg-primary text-on-primary font-sans text-label-md px-5 py-2.5 rounded hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-[0_2px_10px_rgba(139,0,0,0.1)]"
            >
              {t.joinUs}
            </Link>
          </div>

          {/* Mobile Actions Menu Toggle */}
          <div className="flex items-center space-x-stack-md lg:hidden">
            {/* Search Icon */}
            <button
              onClick={() => setSearchOpen(true)}
              className="text-on-surface-variant hover:text-primary transition-colors focus:outline-none"
            >
              <span className="material-symbols-outlined">search</span>
            </button>

            {/* Mobile Lang Switch */}
            <button
              onClick={() => handleLocaleChange(locale === "en" ? "ne" : "en")}
              className="border border-outline-variant rounded px-2.5 py-1 text-xs font-bold text-primary bg-surface-container-lowest"
            >
              {locale === "en" ? "नेपाली" : "EN"}
            </button>

            {/* Drawer Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-on-surface-variant hover:text-primary transition-colors focus:outline-none"
              aria-label="Menu"
            >
              <span className="material-symbols-outlined">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-outline-variant bg-surface animate-fade-in shadow-lg">
            <div className="px-margin-mobile py-stack-md flex flex-col space-y-stack-md">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={`/${locale}${link.path === "/" ? "" : link.path}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-sans text-body-md py-2 border-l-4 pl-3 ${
                    isActive(link.path)
                      ? "border-primary text-primary font-bold bg-surface-container-low"
                      : "border-transparent text-on-surface-variant hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center justify-between pt-stack-md border-t border-outline-variant">
                <div className="flex space-x-stack-sm text-primary/80">
                  <span className="material-symbols-outlined">verified</span>
                  <span className="material-symbols-outlined">account_balance</span>
                </div>
                <Link
                  href={`/${locale}/volunteer`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-primary text-on-primary font-sans text-label-md px-5 py-2.5 rounded text-center w-36 hover:opacity-90 transition-opacity"
                >
                  {t.joinUs}
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Dialog Modal */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-24 px-4">
          <div className="bg-surface border border-outline-variant rounded-lg max-w-xl w-full p-stack-md shadow-2xl animate-scale-in">
            <div className="flex justify-between items-center mb-stack-md">
              <h3 className="font-serif text-title-lg text-primary font-semibold">
                {t.search}
              </h3>
              <button
                onClick={() => setSearchOpen(false)}
                className="text-on-surface-variant hover:text-primary focus:outline-none"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.search}
                className="w-full bg-surface-container-low border border-outline-variant text-on-surface rounded py-3 px-4 focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none font-sans text-body-md"
                autoFocus
              />
              {searchQuery.trim() !== "" && (
                <div className="absolute right-3 top-3.5 text-xs text-on-surface-variant font-medium">
                  Press Enter
                </div>
              )}
            </div>
            {/* Mock search results prompt */}
            <div className="mt-stack-md text-xs text-on-surface-variant">
              Type to search events, news, and heritage restoration logs.
            </div>
          </div>
        </div>
      )}
    </>
  );
};
