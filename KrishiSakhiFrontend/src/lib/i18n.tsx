"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "en" | "hi" | "ml";

type Dict = Record<string, string>;

type I18nContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextType | null>(null);

const dictionaries: Record<Lang, Dict> = {
  en: {
    // Navbar
    nav_home: "Home",
    nav_dashboard: "Dashboard",
    nav_chat: "Chat",
    nav_news: "News",
    nav_get_started: "Get started",
    nav_ask_ai: "Ask AI",
    nav_profile: "Profile",
    // Dashboard - focus
    focus_title: "Today's Focus",
    weather: "Weather",
    market_price: "Market Price",
    government_alert: "Government Alert",
    // Diagnosis
    diagnosis_title: "Suffering from a disease?",
    diagnosis_desc: "Upload a photo of the affected leaf, and our AI will diagnose the issue in seconds.",
    upload_and_diagnose: "Upload Photo & Diagnose",
    ai_diagnosis: "AI Diagnosis",
    unsure_ask: "Unsure? Ask a Krishi Officer",
    // Activities
    what_did_you_do: "What did you do today?",
    keep_record_desc: "Keep a digital record of your activities to get better advice and access scheme benefits.",
    log_irrigation: "Log Irrigation",
    log_fertilizing: "Log Fertilizing",
    log_pest: "Log Pest Control",
    log_other_voice: "Log Other (Use Voice)",
    recent: "Recent",
    write_note: "Write another note…",
    save_note: "Save Note",
    greeting: "Greeting",
    welcome_back: "Welcome back, Rajan Pillai.",
    primary_crop: "Primary Crop",
    managing_pepper: "Managing Pepper",
    last_logged_activity: "Last Logged Activity",
    // Chat
    chat_title: "Chat with Krishi Sakhi",
    chat_subtitle: "Ask in Malayalam, English, or Hindi. Voice supported.",
    // Onboarding
    onboarding_get_started: "Get Started",
    onboarding_title: "Set up your Krishi Sakhi profile",
    onboarding_subtitle: "Tell us your name and main crop. We'll personalize your dashboard and advice for your farm.",
    onboarding_why_title: "Why we ask",
    onboarding_why_desc: "With your primary crop, we surface the right advisories, disease detection hints, and market price updates.",
    onboarding_next_title: "Next steps",
    onboarding_next_desc: "After onboarding, explore Today's Focus, diagnose leaf issues, and log farm activities from your dashboard.",
    // News
    news_pill: "Latest Schemes • Mandi Prices • Alerts",
    news_title: "Krishi News & Updates",
    news_subtitle: "Stay informed about government programs, local mandi prices, and important advisories.",
    news_ticker_1: "New subsidy available for solar-powered water pumps. Click here to learn more...",
    news_ticker_2: "PM-KISAN eKYC deadline is approaching. Update now...",
    news_ticker_3: "Whitefly advisory issued for Ernakulam district. Inspect crops early morning.",
    news_card1_title: "Government Scheme",
    news_card1_item: "Solar Pump Subsidy (MNRE)",
    news_card1_desc: "Up to 60% subsidy for solar-powered irrigation pumps. Farmers can apply via the official portal.",
    news_card2_title: "Market Price",
    news_card2_item: "Pepper (Kochi Mandi)",
    news_card2_desc: "₹645/kg • Stable trend today",
    news_card3_title: "Pest Alert",
    news_card3_item: "Whitefly Alert: High",
    news_card3_desc: "Use yellow sticky traps and inspect underside of leaves. Early action recommended.",
    news_spices: "Spices",
    news_advisory: "Advisory",
    common_open: "Open",
    // Profile
    profile_title: "Your Profile",
    profile_name: "Name",
    profile_primary_crop_label: "Primary Crop",
    profile_location: "Location",
    profile_phone: "Phone",
    profile_language: "Language",
  },
  hi: {
    // Navbar
    nav_home: "होम",
    nav_dashboard: "डैशबोर्ड",
    nav_chat: "चैट",
    nav_news: "समाचार",
    nav_get_started: "शुरू करें",
    nav_ask_ai: "एआई से पूछें",
    nav_profile: "प्रोफ़ाइल",
    // Dashboard - focus
    focus_title: "आज का फोकस",
    weather: "मौसम",
    market_price: "बाज़ार भाव",
    government_alert: "सरकारी चेतावनी",
    // Diagnosis
    diagnosis_title: "किसी रोग से परेशान?",
    diagnosis_desc: "प्रभावित पत्ती की फोटो अपलोड करें, हमारा एआई कुछ सेकंड में निदान करेगा।",
    upload_and_diagnose: "फोटो अपलोड करें और निदान करें",
    ai_diagnosis: "एआई निदान",
    unsure_ask: "संदेह है? कृषि अधिकारी से पूछें",
    // Activities
    what_did_you_do: "आज आपने क्या किया?",
    keep_record_desc: "अपनी गतिविधियों का डिजिटल रिकॉर्ड रखें ताकि बेहतर सलाह और योजना लाभ मिल सकें।",
    log_irrigation: "सिंचाई दर्ज करें",
    log_fertilizing: "उर्वरीकरण दर्ज करें",
    log_pest: "कीट नियंत्रण दर्ज करें",
    log_other_voice: "अन्य दर्ज करें (आवाज़)",
    recent: "हाल की",
    write_note: "एक और नोट लिखें…",
    save_note: "नोट सहेजें",
    greeting: "अभिवादन",
    welcome_back: "वापसी पर स्वागत है, राजन पिल्लई।",
    primary_crop: "मुख्य फसल",
    managing_pepper: "काली मिर्च प्रबंधन",
    last_logged_activity: "अंतिम दर्ज गतिविधि",
    // Chat
    chat_title: "कृषि सखी से चैट करें",
    chat_subtitle: "मलयालम, अंग्रेज़ी या हिंदी में पूछें। वॉइस सपोर्टेड।",
    // Onboarding
    onboarding_get_started: "शुरू करें",
    onboarding_title: "अपनी कृषि सखी प्रोफ़ाइल सेट करें",
    onboarding_subtitle: "अपना नाम और मुख्य फसल बताएं। हम आपके फ़ार्म के लिए डैशबोर्ड और सलाह को व्यक्तिगत बनाएँगे।",
    onboarding_why_title: "हम क्यों पूछते हैं",
    onboarding_why_desc: "आपकी मुख्य फसल से हम सही सलाह, रोग पहचान संकेत और बाज़ार भाव अपडेट दिखाते हैं।",
    onboarding_next_title: "अगले कदम",
    onboarding_next_desc: "ऑनबोर्डिंग के बाद, आज का फ़ोकस देखें, पत्तियों की समस्याओं का निदान करें, और डैशबोर्ड से गतिविधियाँ लॉग करें।",
    // News
    news_pill: "नवीन योजनाएँ • मंडी भाव • चेतावनियाँ",
    news_title: "कृषि समाचार और अपडेट",
    news_subtitle: "सरकारी कार्यक्रमों, स्थानीय मंडी भाव और महत्वपूर्ण परामर्शों से अपडेट रहें।",
    news_ticker_1: "सौर जल पंपों के लिए नई सब्सिडी उपलब्ध। अधिक जानने के लिए क्लिक करें...",
    news_ticker_2: "पीएम-किसान eKYC की अंतिम तिथि नज़दीक है। अभी अपडेट करें...",
    news_ticker_3: "एर्नाकुलम ज़िले के लिए सफ़ेद मक्खी सलाह जारी। सुबह पत्तियाँ जांचें।",
    news_card1_title: "सरकारी योजना",
    news_card1_item: "सोलर पंप सब्सिडी (MNRE)",
    news_card1_desc: "सौर चालित सिंचाई पंपों पर 60% तक सब्सिडी। किसान आधिकारिक पोर्टल से आवेदन कर सकते हैं।",
    news_card2_title: "बाज़ार भाव",
    news_card2_item: "काली मिर्च (कोच्चि मंडी)",
    news_card2_desc: "₹645/किग्रा • आज रुझान स्थिर",
    news_card3_title: "कीट अलर्ट",
    news_card3_item: "सफ़ेद मक्खी अलर्ट: उच्च",
    news_card3_desc: "पीले स्टिकी ट्रैप्स लगाएँ और पत्तियों की निचली सतह जांचें। जल्द कार्रवाई करें।",
    news_spices: "मसाले",
    news_advisory: "परामर्श",
    common_open: "खुला",
    // Profile
    profile_title: "आपकी प्रोफ़ाइल",
    profile_name: "नाम",
    profile_primary_crop_label: "मुख्य फसल",
    profile_location: "स्थान",
    profile_phone: "फ़ोन",
    profile_language: "भाषा",
  },
  ml: {
    // Navbar
    nav_home: "ഹോം",
    nav_dashboard: "ഡാഷ്ബോർഡ്",
    nav_chat: "ചാറ്റ്",
    nav_news: "വാർത്ത",
    nav_get_started: "തുടങ്ങുക",
    nav_ask_ai: "എഐയോട് ചോദിക്കുക",
    nav_profile: "പ്രൊഫൈൽ",
    // Dashboard - focus
    focus_title: "ഇന്നത്തെ ശ്രദ്ധ",
    weather: "കാലാവസ്ഥ",
    market_price: "വിപണി വില",
    government_alert: "സർക്കാർ മുന്നറിയിപ്പ്",
    // Diagnosis
    diagnosis_title: "രോഗം ബുദ്ധിമുട്ടുണ്ടോ?",
    diagnosis_desc: "ബാധിച്ച ഇലയുടെ ചിത്രം അപ്ലോഡ് ചെയ്യൂ, നമ്മുടെ എഐ ചില സെക്കൻഡിനുള്ളിൽ നിർണയം ചെയ്യും.",
    upload_and_diagnose: "ഫോട്ടോ അപ്ലോഡ് ചെയ്യുക & നിർണയം",
    ai_diagnosis: "എഐ നിർണയം",
    unsure_ask: "സംശയം ഉണ്ടോ? കൃഷി ഓഫിസറെ ചോദിക്കുക",
    // Activities
    what_did_you_do: "ഇന്ന് നിങ്ങൾ എന്ത് ചെയ്തു?",
    keep_record_desc: "നിങ്ങളുടെ പ്രവർത്തനങ്ങളുടെ ഡിജിറ്റൽ രേഖ സൂക്ഷിക്കുക; മികച്ച ഉപദേശവും പദ്ധതി ആനുകൂല്യങ്ങളും ലഭിക്കും.",
    log_irrigation: "ജലസേചനം രേഖപ്പെടുത്തുക",
    log_fertilizing: "വളപ്രയോഗം രേഖപ്പെടുത്തുക",
    log_pest: "കീടനിയന്ത്രണം രേഖപ്പെടുത്തുക",
    log_other_voice: "മറ്റ് രേഖ (വോയ്സ്)",
    recent: "സമീപകാലം",
    write_note: "മറ്റൊരു കുറിപ്പ് എഴുതൂ…",
    save_note: "കുറിപ്പ് സംരക്ഷിക്കുക",
    greeting: "വന്ദനം",
    welcome_back: "തിരികെ സ്വാഗതം, രാജൻ പിള്ളൈ.",
    primary_crop: "പ്രധാന വിള",
    managing_pepper: "കുരുമുളക് പരിപാലനം",
    last_logged_activity: "അവസാന രേഖപ്പെടുത്തിയ പ്രവർത്തനം",
    // Chat
    chat_title: "കൃഷി സഖിയുമായി ചാറ്റ് ചെയ്യൂ",
    chat_subtitle: "മലയാളം, ഇംഗ്ലീഷ്, ഹിന്ദി—ഏതിലും ചോദിക്കൂ. വോയ്സ് പിന്തുണയുണ്ട്.",
    // Onboarding
    onboarding_get_started: "തുടങ്ങുക",
    onboarding_title: "നിങ്ങളുടെ കൃഷി സഖി പ്രൊഫൈൽ സജ്ജമാക്കൂ",
    onboarding_subtitle: "പേറും പ്രധാന വിളയും പറയൂ. നിങ്ങളുടെ ഫാമിന് അനുയോജ്യമായി ഡാഷ്ബോർഡും ഉപദേശവും ഒരുക്കാം.",
    onboarding_why_title: "എന്തിന് ചോദിക്കുന്നു",
    onboarding_why_desc: "പ്രധാന വിള അറിയുന്നതിലൂടെ ശരിയായ ഉപദേശങ്ങളും രോഗനിർണയ സൂചനകളും വിപണി വില അപ്പ്‌ഡേറ്റുകളും കാണിക്കാം.",
    onboarding_next_title: "അടുത്ത ഘട്ടങ്ങൾ",
    onboarding_next_desc: "ഓൺബോർഡിംഗിന് ശേഷം ഇന്നത്തെ ശ്രദ്ധ കാണൂ, ഇല പ്രശ്നങ്ങൾ നിർണയിക്കൂ, ഡാഷ്ബോർഡിൽ നിന്ന് പ്രവർത്തനങ്ങൾ രേഖപ്പെടുത്തൂ.",
    // News
    news_pill: "പുതിയ പദ്ധതികൾ • മണ്ഡി വില • അലർട്ടുകൾ",
    news_title: "കൃഷി വാർത്തകളും അപ്‌ഡേറ്റുകളും",
    news_subtitle: "സർക്കാർ പദ്ധതികൾ, ലോക്കൽ മണ്ഡി വിലകളും പ്രധാന നിർദ്ദേശങ്ങളും അറിയാം.",
    news_ticker_1: "സോളാർ പമ്പുകൾക്ക് പുതിയ സബ്സിഡി. കൂടുതൽ അറിയാൻ ഇവിടെ ക്ലിക്ക് ചെയ്യൂ...",
    news_ticker_2: "പി.എം-കിസാൻ eKYC അവസാന തീയതി അടുത്ത്. ഇപ്പോൾ അപ്‌ഡേറ്റ് ചെയ്യൂ...",
    news_ticker_3: "എറണാകുളം ജില്ലയ്ക്ക് വൈറ്റ്‌ഫ്ലൈ നിർദ്ദേശം. പുലർച്ചെ വിളകൾ പരിശോധിക്കുക.",
    news_card1_title: "സർക്കാർ പദ്ധതി",
    news_card1_item: "സോളാർ പമ്പ് സബ്സിഡി (MNRE)",
    news_card1_desc: "സോളാർ ജലസേചന പമ്പുകൾക്ക് 60% വരെ സബ്സിഡി. ഔദ്യോഗിക പോർട്ടലിലൂടെ അപേക്ഷിക്കാം.",
    news_card2_title: "വിപണി വില",
    news_card2_item: "കുരുമുളക് (കൊച്ചി മണ്ഡി)",
    news_card2_desc: "₹645/കി.ഗ്രാം • ഇന്ന് സ്ഥിരം പ്രവണതി",
    news_card3_title: "കീട മുന്നറിയിപ്പ്",
    news_card3_item: "വൈറ്റ്‌ഫ്ലൈ അലർട്ട്: ഉയരം",
    news_card3_desc: "മഞ്ഞ സ്റ്റിക്കി ട്രാപുകൾ ഉപയോഗിക്കൂ, ഇലകളുടെ അടിഭാഗം പരിശോധിക്കൂ. വേഗത്തിൽ നടപടി സ്വീകരിക്കൂ.",
    news_spices: "മസാൽസ്",
    news_advisory: "അഡ്വൈസറി",
    common_open: "തുറന്നു",
    // Profile
    profile_title: "നിങ്ങളുടെ പ്രൊഫൈൽ",
    profile_name: "പേര്",
    profile_primary_crop_label: "പ്രധാന വിള",
    profile_location: "സ്ഥലം",
    profile_phone: "ഫോൺ",
    profile_language: "ഭാഷ",
  },
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && (localStorage.getItem("lang") as Lang | null)) || null;
    if (saved) setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("lang", l); } catch {}
  };

  const t = useMemo(() => {
    const dict = dictionaries[lang] || dictionaries.en;
    return (key: string) => dict[key] ?? key;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
};