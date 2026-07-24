import React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Locale } from "@/data/translations";
import "../globals.css";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: {
    default: "Himali Pariwar Club - Jaishidewal, Kathmandu",
    template: "%s | Himali Pariwar Club",
  },
  description: "Preserving cultural heritage, supporting health care, and empowering youth in Jaishidewal, Kathmandu since 1979.",
  metadataBase: new URL("https://himalipariwar.org"),
  keywords: ["NGO", "Kathmandu", "Jaishidewal", "Heritage Preservation", "Nepal", "Community NGO"],
};

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const resolvedParams = await params;
  const locale = (resolvedParams.locale || "en") as Locale;

  return (
    <html lang={locale} className="h-full antialiased">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col pt-20">
        <Header locale={locale} />
        <main className="flex-grow flex flex-col">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
