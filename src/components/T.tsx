"use client";

import { useState, useEffect } from "react";
import { useLocale } from "@/providers/LocaleProvider";
import { getCachedTranslation, setCachedTranslations } from "@/lib/translationCache";

const LANG_MAP: Record<string, string> = {
  bn: "bn",
  ar: "ar",
  fil: "tl",
};

export default function T({ children }: { children: string }) {
  const { locale } = useLocale();
  const [text, setText] = useState(children);

  useEffect(() => {
    if (locale === "en" || !children?.trim()) {
      setText(children);
      return;
    }

    const cached = getCachedTranslation(children, locale);
    if (cached) {
      setText(cached);
      return;
    }

    const targetLang = LANG_MAP[locale] || locale;
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(children)}`;

    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        const result = data[0]?.map((item: string[]) => item[0]).join("") || children;
        setCachedTranslations({ [children]: result }, locale);
        setText(result);
      })
      .catch(() => setText(children));
  }, [children, locale]);

  return <>{text}</>;
}
