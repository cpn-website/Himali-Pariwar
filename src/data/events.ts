import { LocalizedString } from "./news";

export interface EventItem {
  id: string;
  date: string; // YYYY-MM-DD
  time: string;
  category: LocalizedString;
  title: LocalizedString;
  location: LocalizedString;
  status: "upcoming" | "completed" | "cancelled";
  description: LocalizedString;
}

export const eventsData: EventItem[] = [
  {
    id: "indra-jatra-chariot",
    date: "2026-09-24",
    time: "2:00 PM - 8:00 PM",
    category: {
      en: "Festival",
      ne: "जात्रा/पर्व",
    },
    title: {
      en: "Indra Jatra Chariot Preparation Meeting",
      ne: "इन्द्रजात्रा रथ तयारी बैठक",
    },
    location: {
      en: "Jaishidewal Temple Courtyard",
      ne: "जैसीदेवल मन्दिर परिसर",
    },
    status: "upcoming",
    description: {
      en: "Annual logistics and coordination meeting for the chariot pulling routes, volunteer assignments, and temple lighting.",
      ne: "रथ तान्ने मार्ग, स्वयंसेवक खटनपटन र मन्दिरको सजावट सम्बन्धी वार्षिक व्यवस्थापकीय बैठक।",
    },
  },
  {
    id: "blood-donation-drive",
    date: "2026-08-12",
    time: "8:00 AM - 2:00 PM",
    category: {
      en: "Health Care",
      ne: "स्वास्थ्य सेवा",
    },
    title: {
      en: "Monsoon Health & Blood Donation Camp",
      ne: "वर्षाकालीन स्वास्थ्य तथा रक्तदान शिविर",
    },
    location: {
      en: "Himali Pariwar Club House Hall",
      ne: "हिमाली परिवार क्लब कार्यालय हल",
    },
    status: "upcoming",
    description: {
      en: "A community health camp offering free checkups, combined with a blood donation drive in partnership with Nepal Red Cross.",
      ne: "नेपाल रेडक्रस सोसाइटीको सहकार्यमा निःशुल्क स्वास्थ्य शिविर तथा रक्तदान कार्यक्रम।",
    },
  },
  {
    id: "heritage-youth-walk",
    date: "2026-07-30",
    time: "7:00 AM - 10:00 AM",
    category: {
      en: "Heritage Education",
      ne: "सम्पदा सचेतना",
    },
    title: {
      en: "Jaishidewal Heritage Walk for Schools",
      ne: "विद्यालयहरूका लागि जैसीदेवल सम्पदा पदयात्रा",
    },
    location: {
      en: "Starting point: Club House Main Gate",
      ne: "प्रस्थान बिन्दु: क्लब भवनको मुख्य ढोका",
    },
    status: "upcoming",
    description: {
      en: "Guided tour for local students to explore the historical stone inscriptions, water spouts (Hitis), and structural design of temples in our ward.",
      ne: "स्थानीय विद्यार्थीहरूका लागि ऐतिहासिक ढुङ्गे धारा, शिलालेख र जैसीदेवल क्षेत्रका मन्दिरहरूको भ्रमण गराई सम्पदा बारे बुझाउने पदयात्रा।",
    },
  },
  {
    id: "restoration-bricklaying-vol",
    date: "2026-07-10",
    time: "9:00 AM - 1:00 PM",
    category: {
      en: "Restoration",
      ne: "पुनर्निर्माण",
    },
    title: {
      en: "Community Bricklaying & Site Cleanup",
      ne: "सामुदायिक इँटा छाउने तथा मन्दिर सरसफाई",
    },
    location: {
      en: "Jaishidewal Temple Courtyard",
      ne: "जैसीदेवल मन्दिर परिसर",
    },
    status: "completed",
    description: {
      en: "Over 50 community members gathered to clean the restored bricks and pave the northern walkway of the temple.",
      ne: "५० भन्दा बढी स्थानीय बासिन्दाहरूको सहभागितामा मन्दिरको उत्तरी बाटो सफा गरी इँटा बिछ्याउने कार्य सम्पन्न भयो।",
    },
  },
];
