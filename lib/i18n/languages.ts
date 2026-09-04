export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  region?: string;
  direction?: "ltr" | "rtl";
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: "en", name: "English", nativeName: "English", region: "United States" },
  { code: "es", name: "Spanish", nativeName: "Español", region: "Spain / Latin America" },
  { code: "fr", name: "French", nativeName: "Français", region: "France" },
  { code: "de", name: "German", nativeName: "Deutsch", region: "Germany" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", region: "India" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", region: "India / Sri Lanka / Singapore" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", region: "India" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", region: "India / Bangladesh" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം", region: "India" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", region: "India" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", region: "India" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", region: "India" },
  { code: "zh", name: "Chinese (Simplified)", nativeName: "简体中文", region: "China" },
  { code: "zh-TW", name: "Chinese (Traditional)", nativeName: "繁體中文", region: "Taiwan / Hong Kong" },
  { code: "ja", name: "Japanese", nativeName: "日本語", region: "Japan" },
  { code: "ko", name: "Korean", nativeName: "한국어", region: "South Korea" },
  { code: "ar", name: "Arabic", nativeName: "العربية", region: "Middle East", direction: "rtl" },
  { code: "ru", name: "Russian", nativeName: "Русский", region: "Russia" },
  { code: "pt", name: "Portuguese", nativeName: "Português", region: "Brazil / Portugal" },
  { code: "it", name: "Italian", nativeName: "Italiano", region: "Italy" },
  { code: "nl", name: "Dutch", nativeName: "Nederlands", region: "Netherlands" },
  { code: "pl", name: "Polish", nativeName: "Polski", region: "Poland" },
  { code: "tr", name: "Turkish", nativeName: "Türkçe", region: "Turkey" },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt", region: "Vietnam" },
  { code: "th", name: "Thai", nativeName: "ไทย", region: "Thailand" },
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", region: "Indonesia" },
  { code: "ms", name: "Malay", nativeName: "Bahasa Melayu", region: "Malaysia" },
  { code: "sv", name: "Swedish", nativeName: "Svenska", region: "Sweden" },
  { code: "uk", name: "Ukrainian", nativeName: "Українська", region: "Ukraine" },
  { code: "el", name: "Greek", nativeName: "Ελληνικά", region: "Greece" },
  { code: "he", name: "Hebrew", nativeName: "עברית", region: "Israel", direction: "rtl" },
  { code: "fa", name: "Persian", nativeName: "فارسی", region: "Iran", direction: "rtl" },
  { code: "ur", name: "Urdu", nativeName: "اردو", region: "Pakistan / India", direction: "rtl" },
];

export const DEFAULT_LANGUAGE = "en";
export const LANGUAGE_STORAGE_KEY = "app_selected_language";
