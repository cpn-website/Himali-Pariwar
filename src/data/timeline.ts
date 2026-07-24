import { LocalizedString } from "./news";

export interface TimelineItem {
  year: string;
  title: LocalizedString;
  description: LocalizedString;
}

export const timelineData: TimelineItem[] = [
  {
    year: "1977",
    title: {
      en: "Foundation & First Gatherings",
      ne: "स्थापना र पहिलो जमघट",
    },
    description: {
      en: "Himali Pariwar Club is established as an informal youth assembly under the eaves of Jaishidewal Temple, aiming to organize local sports and clean-up drives.",
      ne: "स्थानीय खेलकुद र सरसफाई अभियान सञ्चालन गर्ने उद्देश्यका साथ जैसीदेवल मन्दिरको छहारीमुनि हिमाली परिवार क्लबको स्थापना भएको हो।",
    },
  },
  {
    year: "1979",
    title: {
      en: "Official Registration & Charter",
      ne: "आधिकारिक दर्ता र विधान",
    },
    description: {
      en: "The club is officially registered. The founding charter is signed, focusing on preserving the cultural heritage of Jaishidewal and surrounding neighborhoods.",
      ne: "क्लब आधिकारिक रूपमा दर्ता भई जैसीदेवल र वरपरका क्षेत्रहरूको सांस्कृतिक सम्पदा संरक्षणमा केन्द्रित भएर ऐतिहासिक पहिलो विधानमा हस्ताक्षर गरियो।",
    },
  },
  {
    year: "1982",
    title: {
      en: "First Community Pati Restoration",
      ne: "पहिलो जैसीदेवल पाटी पुनर्निर्माण",
    },
    description: {
      en: "In partnership with local stone carvers and carpenters, the club leads the structural restoration of the public resting place (Pati) facing the main temple courtyard.",
      ne: "स्थानीय मूर्तिकार र सिकर्मीहरूसँगको सहकार्यमा, क्लबले मन्दिरको मुख्य चोकमा अवस्थित सार्वजनिक विश्रामस्थल (पाटी) को पुनर्निर्माणको नेतृत्व गर्दछ।",
    },
  },
  {
    year: "1995",
    title: {
      en: "Oral History & Archiving Initiative",
      ne: "मौखिक इतिहास र अभिलेखीकरण",
    },
    description: {
      en: "Launch of a project to collect and archive oral stories, traditional songs, and historical memories from community elders in Jaishidewal.",
      ne: "जैसीदेवलका ज्येष्ठ नागरिकहरूबाट मौखिक कथाहरू, परम्परागत गीतहरू र ऐतिहासिक संस्मरणहरू संकलन र अभिलेखीकरण गर्ने परियोजनाको सुरुवात।",
    },
  },
  {
    year: "2015",
    title: {
      en: "Earthquake Emergency Dispatch",
      ne: "भूकम्प आपतकालीन उद्धार तथा पुनस्र्थापना",
    },
    description: {
      en: "Following the devastating April earthquake, the club converts its facilities into a relief shelter, dispatching food, medical aid, and leading monument salvage works.",
      ne: "विनाशकारी वैशाखको भूकम्पपछि, क्लबले आफ्नो कार्यालयलाई राहत शिविरमा परिणत गरी खाद्यान्न, चिकित्सा सहायता वितरण र क्षतिग्रस्त सम्पदा सामग्री संकलन कार्यको नेतृत्व गर्दछ।",
    },
  },
  {
    year: "2020",
    title: {
      en: "Heritage Preservation Digitization",
      ne: "डिजिटल सम्पदा संरक्षण अभियान",
    },
    description: {
      en: "Digitization of historical archives, local temple maps, and publication of the digital Jaishidewal heritage guide map.",
      ne: "ऐतिहासिक अभिलेखहरू, जैसीदेवल मन्दिरका पुराना नक्साहरूको डिजिटलीकरण र जैसीदेवल सम्पदा डिजिटल नक्साको प्रकाशन।",
    },
  },
];
