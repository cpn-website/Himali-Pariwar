import { LocalizedString } from "./news";

export interface GalleryItem {
  id: string;
  url: string;
  caption: LocalizedString;
  category: LocalizedString;
}

export const galleryData: GalleryItem[] = [
  {
    id: "woodcarver-craft",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAygFvbbqJB_fa_V2A_Fl4SHw-rgNMKLfLbmE00LGYCSdmiLxCTlgJeRjOiwygNqC-SAnxoQkzmW4p6O_hNoG-p9kygr5if7-fLVGMAaPxFFsXyEJyVe4PsdtK48G0Op-6vREhdjhOLZmFT-Fz9lX9-sVpDR4lug3Cn_CcNEBxPPPPDetQLhMhaFj2QV2KUbKqoEN1Dc-eA6iWA8Ih4EDgOwtybSpjJgs1ImdKFVbA_b1GmeclbIqNm97AI3aoF84yNuBPW01Z5kOE",
    caption: {
      en: "Master craftsmen carving intricate patterns on wooden temple struts.",
      ne: "काष्ठकलाकारहरू मन्दिरको टुँडालमा परम्परागत बुट्टा कुँद्दै।",
    },
    category: {
      en: "Heritage Restoration",
      ne: "सम्पदा पुनर्निर्माण",
    },
  },
  {
    id: "dhime-drum-training",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFbs7ocvoUlU_f8VD_g59yvH85O6IjI78bI4eVxWm9MBmOHHcPH_88UB_8ew6z7bv4SYsFha7Pz6ft6J3T-6rcv6ggTNpV2tH_m-89LgkMxTYQbQZcgDZqGY1tWlSTGh_HBIQSngGgpcmGmIFtO0kRXMJAf2SGapWnSBHF_VcqFNyrZ7mVyfIlRbNtvDUh3wghbbrLkr5vOmU3EUugtyIrNxciorVATJkSOONKE9J1x-V5CJbhV45aWGA1zHf91yM6ziJ9HV4yOVY",
    caption: {
      en: "Guru training young boys and girls in traditional Dhime playing.",
      ne: "गुरुद्वारा बालबालिकाहरूलाई धिमे बाजा बजाउन सिकाउँदै।",
    },
    category: {
      en: "Cultural Programs",
      ne: "सांस्कृतिक कार्यक्रम",
    },
  },
  {
    id: "jatra-preparation-audit",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAj4zQU8ZwLqEIRiJJ1b96l6mz6HUeDOfVON_bYYRLnfklTR2kfJowWZWHkLY5d912s-ri7oUtlrw3xXM4G0AEzHcVktJfWo_nl7chvtNzG_aT7EsK3U0Hu9L9Um9Hp3REjydzfGV9emR9hzrbKsQ7GE3H0FIUoHk-sKfPj9WnRrbFHZ2UL-DRakqRfv7IW-kTkbaFxJTeJHx878kz35loywWiFIkL7MEBW3W8uiQPc5pds8GLirB727lyjhQ9gJIMx7W-WXSKXqs",
    caption: {
      en: "Jatra management committee review maps and volunteer rosters.",
      ne: "जात्रा व्यवस्थापन समिति नक्सा र स्वयंसेवक नामावली समीक्षा गर्दै।",
    },
    category: {
      en: "Meetings",
      ne: "बैठकहरू",
    },
  },
  {
    id: "historical-founding-charter",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCnLqby_l-RTe2nfiNGseduAiH3iW141iokax0GP4pRjJXHYoVa-ZBCPHL0zLDDDpvMcB_qnzhE-_vzt6Omc8HAyXVb_B0kvYFh29QDqHV6VB2vmDviprKWrGEIem0xDafE0Sz5a28BFba24Ngby5LjLQQoEGUyNjByPkX7szSxU9Fr_n4OzlQJ3FdvRwrMACECsrpOWWFWmZY-zJ4LJVHwOGWrOhlDpTMS5dnKW4DPmK-c2w7zpiA_VG-MQ7etNG_EuhzRvpUoCo",
    caption: {
      en: "Founding charter members gathered outside Jaishidewal Temple in 1979.",
      ne: "सन् १९७९ मा जैसीदेवल मन्दिर बाहिर भेला भएका संस्थापक सदस्यहरू।",
    },
    category: {
      en: "Archives",
      ne: "ऐतिहासिक अभिलेख",
    },
  },
  {
    id: "map-kathmandu-heritage",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBq9WKTw8mydS-RQ96vYvcRpGk4mZXyqbf4O1KUx2OxXja4h42iZklPJ1NCnA_ow6_GcvnsBjidjJ2A-uvRUKUitbZ0uSC1dG-KPy8HnPDad-SEbyuATK1w7v2jtSU8cgWdkLUrEEcjlC0ykx74z6mJyyt6WXN_Hb766TzzKCyXTWIioweJcqRxxuTftVnT6V5LSmh5ZmWS3h828a-Nf9WPf0eVdThwucULPBRQO8yb0Shn2Ao8YXcDMHbIBiJsDLzK-Ie73lGq064",
    caption: {
      en: "Digital recreation map highlighting monument pathways in Ward 21.",
      ne: "काठमाडौँ वडा २१ का सम्पदा मार्गहरू देखाउने डिजिटल नक्सा।",
    },
    category: {
      en: "Archives",
      ne: "नक्सा तथा रेखाचित्र",
    },
  },
];
