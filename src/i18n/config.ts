export const locales = ["en", "es", "de", "fr", "ru", "pl"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const countryToLocale: Record<string, Locale> = {
  // Spanish-speaking
  ES: "es", MX: "es", AR: "es", CO: "es", CL: "es", PE: "es",
  VE: "es", EC: "es", GT: "es", CU: "es", BO: "es", DO: "es",
  HN: "es", PY: "es", SV: "es", NI: "es", CR: "es", PA: "es",
  UY: "es", PR: "es",
  // German-speaking
  DE: "de", AT: "de", CH: "de",
  // French-speaking
  FR: "fr", BE: "fr", LU: "fr", MC: "fr", SN: "fr", CI: "fr",
  // Russian-speaking
  RU: "ru", BY: "ru", KZ: "ru", KG: "ru",
  // Polish
  PL: "pl",
};

export const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Espanol",
  de: "Deutsch",
  fr: "Francais",
  ru: "Русский",
  pl: "Polski",
};
