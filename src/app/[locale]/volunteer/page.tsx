"use client";

import React, { useState, use } from "react";
import { Locale, translations } from "@/data/translations";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { siteConfig } from "@/config/siteConfig";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default function VolunteerPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const locale = (resolvedParams.locale || "en") as Locale;
  const t = translations[locale];

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interestArea, setInterestArea] = useState("general");
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
          interestArea,
          message,
          honeypot,
          type: "volunteer",
        }),
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        setSuccess(true);
        // Clear fields
        setName("");
        setEmail("");
        setPhone("");
        setInterestArea("general");
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
            {t.home} / {t.volunteer}
          </p>
          <h1 className="font-serif text-display-lg-mobile md:text-display-lg text-primary mb-stack-lg font-bold">
            {locale === "en" ? "Join Himali Pariwar Club" : "सदस्यता तथा स्वयंसेवक आवेदन"}
          </h1>
          <p className="font-sans text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            {locale === "en"
              ? "Become a member or register as a volunteer to support heritage preservation and local rescue networks."
              : "जैसीदेवल क्षेत्रको सम्पदा संरक्षण तथा स्वास्थ्य उद्धार टोलीमा स्वयंसेवक वा सदस्य भई जोडिनुहोस्।"}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-margin-desktop">
          {/* Left Column: Benefits & Testimonials */}
          <div className="space-y-stack-lg">
            <div className="space-y-stack-md">
              <h2 className="font-serif text-headline-md text-primary font-bold">
                {locale === "en" ? "Why Volunteer With Us?" : "किन हामीसँग स्वयंसेवा गर्ने?"}
              </h2>
              <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
                {locale === "en"
                  ? "For over four decades, the strength of Himali Pariwar Club has resided in the hearts of our volunteers. By joining our team, you gain hands-on training from master stonecarvers, participate in organizing major cultural festivals, and receive certification as an emergency first responder."
                  : "४० वर्षभन्दा बढी समयदेखि हाम्रो क्लबको बल हाम्रा स्वयंसेवकहरू नै हुन्। हाम्रो टोलीमा सामेल भएर तपाईंले सम्पदा पुनर्निर्माण सम्बन्धी परम्परागत तालिम पाउनुहुनेछ, जात्राहरूको आयोजनामा भाग लिनुहुनेछ र प्राथमिक स्वास्थ्य उद्धारकर्ताको प्रमाणपत्र प्राप्त गर्नुहुनेछ।"}
              </p>
            </div>

            {/* Testimonial Quote */}
            <Card hoverEffect={false} className="border-l-4 border-secondary/70 bg-secondary/5 py-4 pl-6 pr-4 rounded-r">
              <p className="font-serif text-xs text-on-surface-variant italic leading-relaxed">
                {locale === "en"
                  ? '"Volunteering to document our elders\' oral histories opened my eyes to the depth of Jaishidewal. It is more than just stone and timber; it is the living spirit of our neighborhood."'
                  : '"जेष्ठ नागरिकहरूबाट हाम्रो इतिहास संकलन गर्ने स्वयंसेवा कार्यले मलाई जैसीदेवलको ऐतिहासिक गहराई बुझ्न मद्दत गर्यो। यो केवल मन्दिर मात्र होइन, यो हाम्रो समुदायको मुटु हो। ९"'}
              </p>
              <p className="font-sans text-[10px] text-secondary font-bold uppercase tracking-wider mt-3">
                — Sunita Maharjan, {locale === "en" ? "Volunteer Coordinator" : "स्वयंसेवक संयोजक"}
              </p>
            </Card>

            {/* Membership tiers */}
            <div className="space-y-3">
              <h3 className="font-serif text-title-lg text-secondary font-bold border-b border-outline-variant pb-2">
                {locale === "en" ? "Volunteering Pillars" : "स्वयंसेवाका मुख्य क्षेत्रहरू"}
              </h3>
              
              <div className="space-y-2.5">
                <div className="flex gap-2 items-start text-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span>
                  <div>
                    <strong>{locale === "en" ? "Heritage & Craft:" : "सांस्कृतिक सम्पदा पुनर्निर्माण:"}</strong>{" "}
                    {locale === "en" ? "Assist in paving, brick cleaning, wood oiling, and documenting architecture." : "टुँडाल संरक्षण, सरसफाई र डिजिटल नक्सा निर्माणमा सहयोग।"}
                  </div>
                </div>
                <div className="flex gap-2 items-start text-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span>
                  <div>
                    <strong>{locale === "en" ? "Emergency & Health:" : "आपतकालीन स्वास्थ्य सहायता:"}</strong>{" "}
                    {locale === "en" ? "Join the donor database or first aid marshal teams for public events." : "रक्तदाता लखमा सहभागी हुने वा जात्राहरूमा प्राथमिक उपचार टोलीमा रहने।"}
                  </div>
                </div>
                <div className="flex gap-2 items-start text-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span>
                  <div>
                    <strong>{locale === "en" ? "Youth Mentorship:" : "युवा खेलकुद तथा तालिम:"}</strong>{" "}
                    {locale === "en" ? "Help coordinate local table tennis leagues, runs, and classes." : "फुटबल कप र दैनिक टेबल टेनिस तालिम आयोजनामा सहयोग।"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sign Up Form */}
          <div>
            <Card hoverEffect={false} className="shadow-lg border border-outline bg-surface-container-low/30">
              <h3 className="font-serif text-title-lg text-primary font-bold border-b border-outline-variant pb-2 mb-stack-md">
                {locale === "en" ? "Application Portal" : "आवेदन फारम"}
              </h3>
              
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
                  <label htmlFor="hp-vol">Leave this blank</label>
                  <input
                    id="hp-vol"
                    type="text"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div>
                  <label className="block font-sans font-bold text-on-surface mb-unit" htmlFor="vol-name">
                    {t.fullName} <span className="text-error">*</span>
                  </label>
                  <input
                    id="vol-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-surface border border-outline-variant text-on-surface rounded p-3 focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none"
                    placeholder="e.g. Ram Bahadur Maharjan"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-stack-md">
                  <div>
                    <label className="block font-sans font-bold text-on-surface mb-unit" htmlFor="vol-email">
                      {t.email} <span className="text-error">*</span>
                    </label>
                    <input
                      id="vol-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-surface border border-outline-variant text-on-surface rounded p-3 focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none"
                      placeholder="name@email.com"
                    />
                  </div>
                  <div>
                    <label className="block font-sans font-bold text-on-surface mb-unit" htmlFor="vol-phone">
                      {t.phone}
                    </label>
                    <input
                      id="vol-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-surface border border-outline-variant text-on-surface rounded p-3 focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none"
                      placeholder="98XXXXXXXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-sans font-bold text-on-surface mb-unit" htmlFor="vol-interest">
                    {t.interestArea} <span className="text-error">*</span>
                  </label>
                  <select
                    id="vol-interest"
                    value={interestArea}
                    onChange={(e) => setInterestArea(e.target.value)}
                    className="w-full bg-surface border border-outline-variant text-on-surface rounded p-3 focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none font-medium"
                  >
                    <option value="heritage">{locale === "en" ? "Heritage Preservation" : "सम्पदा संरक्षण"}</option>
                    <option value="health">{locale === "en" ? "Health & Emergency Responders" : "आपतकालीन स्वास्थ्य टोली"}</option>
                    <option value="sports">{locale === "en" ? "Youth Sports & Athletics" : "खेलकुद तथा युवा तालिम"}</option>
                    <option value="general">{t.generalInfo}</option>
                  </select>
                </div>

                <div>
                  <label className="block font-sans font-bold text-on-surface mb-unit" htmlFor="vol-msg">
                    {locale === "en" ? "Statement of Motivation" : "प्ररित हुनुको मुख्य कारण"} <span className="text-error">*</span>
                  </label>
                  <textarea
                    id="vol-msg"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-surface border border-outline-variant text-on-surface rounded p-3 focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none"
                    placeholder={locale === "en" ? "Briefly explain why you want to volunteer or join..." : "हामीसँग आबद्ध हुन चाहनुको छोटो कारण..."}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary text-on-primary font-sans text-label-md py-3 rounded-md hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm disabled:opacity-50"
                >
                  {submitting ? t.loading : t.submit}
                </button>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
