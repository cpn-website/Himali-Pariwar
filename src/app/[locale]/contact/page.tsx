"use client";

import React, { useState, use } from "react";
import { Locale, translations } from "@/data/translations";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { siteConfig } from "@/config/siteConfig";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default function ContactPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const locale = (resolvedParams.locale || "en") as Locale;
  const t = translations[locale];

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [inquiryType, setInquiryType] = useState("general");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState(""); // hidden spam trap
  
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
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
          name,
          email,
          phone,
          inquiryType,
          message,
          honeypot,
          type: "contact",
        }),
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        setSuccess(true);
        // Clear fields
        setName("");
        setEmail("");
        setPhone("");
        setInquiryType("general");
        setMessage("");
      } else {
        setSuccess(false);
        setErrorMsg(data.error || t.formErrorMsg);
      }
    } catch (err) {
      setSuccess(false);
      setErrorMsg(t.formErrorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col flex-grow">
      {/* Page Header */}
      <section className="bg-surface-container-low py-12 px-margin-mobile md:px-margin-desktop border-b border-outline-variant">
        <div className="max-w-container-max mx-auto text-center">
          <p className="font-sans text-label-sm text-on-surface-variant mb-stack-md tracking-wider uppercase">
            {t.home} / {t.contact}
          </p>
          <h1 className="font-serif text-display-lg-mobile md:text-display-lg text-primary mb-stack-lg font-bold">
            {locale === "en" ? "Visit Us in Jaishidewal" : " जैसीदेवलमा सम्पर्क कार्यालय"}
          </h1>
          <p className="font-sans text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            {locale === "en"
              ? "Connect with our community. Whether you have an inquiry, wish to volunteer, or need assistance, our doors are open."
              : "हाम्रो समुदायसँग जोडिनुहोस्। सोधपुछ गर्न, स्वयंसेवक बन्न वा सहयोग आवश्यक परेमा हाम्रो ढोका सदैव खुला छ।"}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-margin-desktop">
          
          {/* Left Column: Contact Form */}
          <div>
            <Card hoverEffect={false} className="shadow-lg border border-outline">
              <h2 className="font-serif text-title-lg text-primary font-bold border-b border-outline-variant pb-2 mb-stack-md">
                {locale === "en" ? "Send an Inquiry" : "सन्देश पठाउनुहोस्"}
              </h2>
              
              {success === true && (
                <div className="bg-secondary/10 border border-secondary/20 rounded p-stack-md text-xs text-secondary font-medium mb-stack-md">
                  {t.formSuccessMsg}
                </div>
              )}

              {success === false && (
                <div className="bg-error/10 border border-error/20 rounded p-stack-md text-xs text-error font-medium mb-stack-md">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-stack-md text-xs">
                {/* Honeypot Spam Trap (Visually Hidden) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="hp-contact">Leave this blank</label>
                  <input
                    id="hp-contact"
                    type="text"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div>
                  <label className="block font-sans font-bold text-on-surface mb-unit" htmlFor="contact-type">
                    {t.inquiryType} <span className="text-error">*</span>
                  </label>
                  <select
                    id="contact-type"
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full bg-surface border border-outline-variant text-on-surface rounded p-3 focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none font-medium text-xs"
                  >
                    <option value="general">{t.generalInfo}</option>
                    <option value="volunteer">{t.volunteerOps}</option>
                    <option value="events">{t.eventReg}</option>
                    <option value="heritage">{t.heritageProj}</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-stack-md">
                  <div>
                    <label className="block font-sans font-bold text-on-surface mb-unit" htmlFor="contact-name">
                      {t.fullName} <span className="text-error">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-surface border border-outline-variant text-on-surface rounded p-3 focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none"
                      placeholder="Gita Maharjan"
                    />
                  </div>
                  <div>
                    <label className="block font-sans font-bold text-on-surface mb-unit" htmlFor="contact-phone">
                      {t.phone}
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-surface border border-outline-variant text-on-surface rounded p-3 focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none"
                      placeholder="98XXXXXXXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-sans font-bold text-on-surface mb-unit" htmlFor="contact-email">
                    {t.email} <span className="text-error">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-surface border border-outline-variant text-on-surface rounded p-3 focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none"
                    placeholder="name@email.com"
                  />
                </div>

                <div>
                  <label className="block font-sans font-bold text-on-surface mb-unit" htmlFor="contact-msg">
                    {t.message} <span className="text-error">*</span>
                  </label>
                  <textarea
                    id="contact-msg"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-surface border border-outline-variant text-on-surface rounded p-3 focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none"
                    placeholder={locale === "en" ? "Type your inquiry details..." : "सोधपुछको विस्तृत विवरण लेख्नुहोस्..."}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary text-on-primary font-sans text-label-md py-3 rounded-md hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm disabled:opacity-50"
                >
                  {submitting ? t.loading : t.send}
                </button>
              </form>
            </Card>
          </div>

          {/* Right Column: Maps and Location details */}
          <div className="space-y-stack-lg">
            {/* Real Google Maps embed */}
            <div className="rounded-lg overflow-hidden border border-outline-variant shadow-heritage h-72 bg-surface-container-high relative">
              <iframe
                title="Himali Pariwar Club Jaishidewal Location Map"
                src={siteConfig.googleMapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="bg-surface-container-low border border-outline-variant rounded-lg p-stack-lg space-y-4 text-xs">
              <h3 className="font-serif text-title-lg text-secondary font-bold border-b border-outline-variant pb-2">
                {locale === "en" ? "Office Location Details" : "सम्पर्क ठेगाना विवरण"}
              </h3>
              
              <div className="space-y-3 font-sans text-on-surface-variant font-medium">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-sm mt-0.5">location_on</span>
                  <div>
                    <strong>{t.addressLabel}:</strong>
                    <p className="mt-0.5">{siteConfig.contact.address[locale]}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-sm mt-0.5">call</span>
                  <div>
                    <strong>{locale === "en" ? "General Office Phone:" : "कार्यालय फोन नम्बर:"}</strong>
                    <p className="mt-0.5">{siteConfig.contact.phoneFormatted}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-sm mt-0.5">mail</span>
                  <div>
                    <strong>{t.emailLabel}:</strong>
                    <p className="mt-0.5">{siteConfig.contact.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-sm mt-0.5">schedule</span>
                  <div>
                    <strong>{t.hoursLabel}:</strong>
                    <p className="mt-0.5">{siteConfig.contact.hours[locale]}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
