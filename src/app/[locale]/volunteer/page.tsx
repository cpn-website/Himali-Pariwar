"use client";

import React, { useState, use } from "react";
import { Locale, translations } from "@/data/translations";
import { Card } from "@/components/ui/Card";

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
    } catch {
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
        <div className="max-w-container-max mx-auto text-center animate-fade-in-up">
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
          <div className="space-y-stack-lg animate-fade-in-up">
            <div className="space-y-stack-md">
              <h2 className="font-serif text-headline-md text-primary font-bold">
                {locale === "en" ? "Why Volunteer with Us?" : "हामीसँग किन आबद्ध हुने?"}
              </h2>
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                {locale === "en"
                  ? "For over four decades, our members have been at the frontlines of protecting Ward 21's historic temples and supporting families through emergency health programs. As a volunteer, you gain hands-on training and make a direct local impact."
                  : "४० वर्षभन्दा बढी समयदेखि जैसीदेवलका बासिन्दाहरूको हितमा क्रियाशील यस क्लबमा स्वयंसेवक बन्दा तपाईंले प्रत्यक्ष सामुदायिक प्रभाव पार्न र परम्परागत कला सिक्ने अवसर पाउनुहुनेछ।"}
              </p>
            </div>

            <div className="space-y-stack-md border-t border-outline-variant/65 pt-6">
              <h3 className="font-serif text-title-lg text-secondary font-bold">
                {locale === "en" ? "Volunteer Benefits" : "आबद्ध हुनुका फाइदाहरू"}
              </h3>
              
              <ul className="space-y-3 font-sans text-xs text-on-surface-variant font-medium">
                <li className="flex gap-2 items-start">
                  <span className="material-symbols-outlined text-primary text-sm mt-0.5">verified</span>
                  <div>
                    <strong>{locale === "en" ? "Official Appreciation Certificate:" : "स्वयंसेवक प्रमाणपत्र:"}</strong>
                    <p className="mt-0.5">{locale === "en" ? "Receive an official signed certificate documenting your service hours for your resume." : "क्लबद्वारा प्रदान गरिने औपचारिक सेवा प्रमाणपत्र प्राप्त गर्नुहोस्।"}</p>
                  </div>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="material-symbols-outlined text-primary text-sm mt-0.5">engineering</span>
                  <div>
                    <strong>{locale === "en" ? "Skills Training Workshops:" : "शिल्प र कौशल तालिम:"}</strong>
                    <p className="mt-0.5">{locale === "en" ? "Free access to traditional woodcarving workshops, music modules, and first-aid drills." : "धिमे बाजा, चर्या नृत्य र विपद् व्यवस्थापन सम्बन्धी निःशुल्क प्रशिक्षणमा सहभागिता।"}</p>
                  </div>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="material-symbols-outlined text-primary text-sm mt-0.5">diversity_3</span>
                  <div>
                    <strong>{locale === "en" ? "Community Support Network:" : "सामुदायिक सम्बन्ध:"}</strong>
                    <p className="mt-0.5">{locale === "en" ? "Join a network of 150+ active members dedicated to cultural pride and mutual help." : "जैसीदेवलका १५०+ सक्रिय स्वयंसेवकहरूको सञ्जालमा जोडिनुहोस्।"}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Volunteer Form */}
          <div className="animate-fade-in-up">
            <Card hoverEffect={false} className="shadow-lg border border-outline rounded-xl p-stack-lg">
              <h2 className="font-serif text-title-lg text-primary font-bold border-b border-outline-variant pb-2 mb-stack-md">
                {locale === "en" ? "Volunteer Application Form" : "आवेदन फारम"}
              </h2>
              
              {success === true && (
                <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-stack-md text-xs text-secondary font-medium mb-stack-md animate-spring-in">
                  {t.formSuccessMsg}
                </div>
              )}

              {success === false && (
                <div className="bg-error/10 border border-error/20 rounded-lg p-stack-md text-xs text-error font-medium mb-stack-md animate-shake">
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
                    className="w-full bg-surface border border-outline-variant text-on-surface rounded-lg p-3 focus:ring-2 focus:ring-primary focus:outline-none"
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
                      className="w-full bg-surface border border-outline-variant text-on-surface rounded-lg p-3 focus:ring-2 focus:ring-primary focus:outline-none"
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
                      className="w-full bg-surface border border-outline-variant text-on-surface rounded-lg p-3 focus:ring-2 focus:ring-primary focus:outline-none"
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
                    className="w-full bg-surface border border-outline-variant text-on-surface rounded-lg p-3 focus:ring-2 focus:ring-primary focus:outline-none font-medium"
                  >
                    <option value="heritage">{locale === "en" ? "Heritage Preservation" : "सम्पदा संरक्षण"}</option>
                    <option value="health">{locale === "en" ? "Health & Emergency Responders" : "आपतकालीन स्वास्थ्य टोली"}</option>
                    <option value="sports">{locale === "en" ? "Youth Sports & Athletics" : "खेलकुद तथा युवा तालिम"}</option>
                    <option value="general">{t.generalInfo}</option>
                  </select>
                </div>

                <div>
                  <label className="block font-sans font-bold text-on-surface mb-unit" htmlFor="vol-msg">
                    {locale === "en" ? "Statement of Motivation" : "प्रेरित हुनुको मुख्य कारण"} <span className="text-error">*</span>
                  </label>
                  <textarea
                    id="vol-msg"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-surface border border-outline-variant text-on-surface rounded-lg p-3 focus:ring-2 focus:ring-primary focus:outline-none"
                    placeholder={locale === "en" ? "Briefly explain why you want to volunteer or join..." : "हामीसँग आबद्ध हुन चाहनुको छोटो कारण..."}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary text-on-primary font-sans text-label-md py-3 rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-all hover:scale-[1.01] shadow-md disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
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
