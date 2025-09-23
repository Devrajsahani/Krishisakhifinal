"use client";
import { useI18n } from "@/lib/i18n";

export const LangName = () => {
  const { lang } = useI18n();
  const map: Record<string, string> = {
    en: "English",
    hi: "हिंदी",
    ml: "മലയാളം",
  };
  return <span>{map[lang] || lang}</span>;
};

export default LangName;