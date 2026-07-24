export interface LocalizedString {
  en: string;
  ne: string;
}

export interface NewsItem {
  id: string;
  date: string;
  category: LocalizedString;
  title: LocalizedString;
  summary: LocalizedString;
  content: LocalizedString;
  image: string;
}

export const newsData: NewsItem[] = [
  {
    id: "restoration-phase-3",
    date: "2026-07-15",
    category: {
      en: "Restoration",
      ne: "पुनर्निर्माण",
    },
    title: {
      en: "Jaishidewal Temple Restoration Enters Phase 3",
      ne: "जैसीदेवल मन्दिर पुनर्निर्माण तेस्रो चरणमा प्रवेश",
    },
    summary: {
      en: "The ongoing effort to restore the wooden carvings and structural pillars of the main temple complex moves into its final phase.",
      ne: "जैसीदेवल मन्दिरको काष्ठकला र काठका स्तम्भहरूको संरक्षण गर्ने अभियान अन्तिम चरणमा पुगेको छ।",
    },
    content: {
      en: "We are pleased to announce that after months of work by traditional Kathmandu wood carvers, the structural supports are secured. In this final phase, local artisans will apply protective natural oils to the carvings and restore the brick base platform. Volunteer sessions for site management are open on weekends.",
      ne: "काठमाडौंका परम्परागत काष्ठकलाकारहरूको अथक प्रयासपछि मुख्य संरचना सुरक्षित भएको घोषणा गर्न पाउँदा हामीलाई खुसी लागेको छ। यस अन्तिम चरणमा, कलाकारहरूले काष्ठकलाहरूमा सुरक्षात्मक तेल लगाउने र इँटाको आधार मञ्चलाई पुनःस्थापित गर्नेछन्। शनिबार र आइतबार स्वयंसेवा गर्न चाहनेका लागि दर्ता खुल्ला गरिएको छ।",
    },
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAygFvbbqJB_fa_V2A_Fl4SHw-rgNMKLfLbmE00LGYCSdmiLxCTlgJeRjOiwygNqC-SAnxoQkzmW4p6O_hNoG-p9kygr5if7-fLVGMAaPxFFsXyEJyVe4PsdtK48G0Op-6vREhdjhOLZmFT-Fz9lX9-sVpDR4lug3Cn_CcNEBxPPPPDetQLhMhaFj2QV2KUbKqoEN1Dc-eA6iWA8Ih4EDgOwtybSpjJgs1ImdKFVbA_b1GmeclbIqNm97AI3aoF84yNuBPW01Z5kOE",
  },
  {
    id: "dhime-classes-started",
    date: "2026-06-20",
    category: {
      en: "Youth Program",
      ne: "युवा कार्यक्रम",
    },
    title: {
      en: "Summer Dhime & Charya Dance Classes Begin",
      ne: "धिमे तथा चर्या नृत्यको ग्रीष्मकालीन कक्षा सुरु",
    },
    summary: {
      en: "Over 40 neighborhood children gathered in the temple courtyard to learn traditional instruments and dances from community masters.",
      ne: "मन्दिरको आँगनमा ४० भन्दा बढी बालबालिकाहरू जम्मा भई परम्परागत बाजा र नृत्य सिक्न सुरु गरेका छन्।",
    },
    content: {
      en: "Preserving local music is crucial to the intangible heritage of Jaishidewal. Under the guidance of Guru Madan Bahadur and our volunteer trainers, our summer batch is practicing daily. The classes run every morning from 7:00 AM to 9:00 AM. A public performance will be hosted during the upcoming Indra Jatra festival.",
      ne: "परम्परागत सङ्गीतको संरक्षण जैसीदेवलको अमूर्त सम्पदाको मुख्य स्तम्भ हो। गुरु मदन बहादुर र स्वयंसेवक प्रशिक्षकहरूको रेखदेखमा ग्रीष्मकालीन समूहले दैनिक अभ्यास गरिरहेको छ। कक्षाहरू प्रत्येक बिहान ७:०० देखि ९:०० बजेसम्म सञ्चालन हुन्छन्। आगामी इन्द्रजात्राको अवसरमा उनीहरूले आफ्नो कला प्रदर्शन गर्नेछन्।",
    },
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFbs7ocvoUlU_f8VD_g59yvH85O6IjI78bI4eVxWm9MBmOHHcPH_88UB_8ew6z7bv4SYsFha7Pz6ft6J3T-6rcv6ggTNpV2tH_m-89LgkMxTYQbQZcgDZqGY1tWlSTGh_HBIQSngGgpcmGmIFtO0kRXMJAf2SGapWnSBHF_VcqFNyrZ7mVyfIlRbNtvDUh3wghbbrLkr5vOmU3EUugtyIrNxciorVATJkSOONKE9J1x-V5CJbhV45aWGA1zHf91yM6ziJ9HV4yOVY",
  },
  {
    id: "annual-governance-report",
    date: "2026-05-30",
    category: {
      en: "Governance",
      ne: "सुशासन",
    },
    title: {
      en: "Annual Governance Report & Financial Audit Released",
      ne: "वार्षिक सुशासन प्रतिवेदन तथा वित्तीय लेखापरीक्षण सार्वजनिक",
    },
    summary: {
      en: "In line with our commitment to transparency, our audited statements and program impact logs for 2025/2026 are now available.",
      ne: "हाम्रो पारदर्शिता प्रतिको प्रतिबद्धता अनुरूप, वर्ष २०२५/२०२६ को लेखापरीक्षण विवरण र कार्यक्रम प्रभाव प्रतिवेदन सार्वजनिक गरिएको छ।",
    },
    content: {
      en: "Transparency is our pride. The executive committee has published the complete audit details, listing all donations received, itemized project expenditures, and volunteer logs. The PDF report is free to download in our governance portal, and printed copies are available at the club house library.",
      ne: "पारदर्शिता नै हाम्रो गौरव हो। कार्यसमितिले प्राप्त भएका सम्पूर्ण दानहरू, आय-व्यय र स्वयंसेवक अभिलेखहरूको पूर्ण विवरण सार्वजनिक गरेको छ। विस्तृत जानकारीका लागि सुशासन पृष्ठबाट पीडीएफ प्रतिवेदन डाउनलोड गर्न सकिन्छ। प्रिन्ट कपी आवश्यक परेमा कार्यालयको पुस्तकालयमा उपलब्ध छ।",
    },
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAj4zQU8ZwLqEIRiJJ1b96l6mz6HUeDOfVON_bYYRLnfklTR2kfJowWZWHkLY5d912s-ri7oUtlrw3xXM4G0AEzHcVktJfWo_nl7chvtNzG_aT7EsK3U0Hu9L9Um9Hp3REjydzfGV9emR9hzrbKsQ7GE3H0FIUoHk-sKfPj9WnRrbFHZ2UL-DRakqRfv7IW-kTkbaFxJTeJHx878kz35loywWiFIkL7MEBW3W8uiQPc5pds8GLirB727lyjhQ9gJIMx7W-WXSKXqs",
  },
];
