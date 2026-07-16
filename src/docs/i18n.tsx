import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Locale = "en" | "ru";

type Ctx = { locale: Locale; setLocale: (l: Locale) => void; t: (k: keyof typeof UI["en"]) => string };
const LocaleContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "nexus-locale";

export const UI = {
  en: {
    documentation: "Documentation",
    changelog: "Changelog",
    roadmap: "Roadmap",
    searchDocs: "Search docs…",
    searchPlaceholder: "Search documentation…  (try: PvP, elections, radiation)",
    noResults: "No results. Try a different keyword.",
    fullText: "Full-text matches",
    onThisPage: "On this page",
    previous: "Previous",
    next: "Next",
    copyLink: "Copy link",
    copiedLink: "Page link copied",
    copiedHeading: "Heading link copied",
    edit: "Edit",
    minRead: "min read",
    updated: "Updated",
    home: "Home",
    docs: "Docs",
    notFoundTitle: "Page not found",
    notFoundSub: "This doc doesn't exist yet. Try the sidebar or press ⌘K to search.",
    backHome: "Back to home",
    // Home
    heroBadge: "Nexus Wiki · v2.4 · Living document",
    heroLine1: "The knowledge base of a",
    heroLine2: "serious Minecraft world",
    heroSub: "Every rule, every institution, every piece of lore that keeps the Nexus political survival server alive — documented like the software it is.",
    readDocs: "Read the docs",
    searchWiki: "Search wiki",
    statSections: "Sections",
    statPages: "Pages",
    statVersion: "Version",
    exploreEyebrow: "Explore",
    exploreTitle: "Start with a section",
    allDocs: "All docs →",
    pagesCount: "pages",
    pageCount: "page",
    recentlyUpdated: "Recently updated",
    powerUser: "Power user",
    shortcuts: "Keyboard shortcuts",
    kbdPalette: "Command palette",
    kbdSearch: "Quick search",
    kbdHeading: "Copy heading link",
    hoverHeading: "hover heading",
    footer: "Nexus Wiki · Community-maintained documentation · Built with TanStack Start",
  },
  ru: {
    documentation: "Документация",
    changelog: "История изменений",
    roadmap: "Дорожная карта",
    searchDocs: "Поиск по документации…",
    searchPlaceholder: "Поиск по документации…  (например: PvP, выборы, радиация)",
    noResults: "Ничего не найдено. Попробуйте другой запрос.",
    fullText: "Полнотекстовый поиск",
    onThisPage: "На этой странице",
    previous: "Назад",
    next: "Далее",
    copyLink: "Копировать ссылку",
    copiedLink: "Ссылка скопирована",
    copiedHeading: "Ссылка на заголовок скопирована",
    edit: "Редактировать",
    minRead: "мин чтения",
    updated: "Обновлено",
    home: "Главная",
    docs: "Документация",
    notFoundTitle: "Страница не найдена",
    notFoundSub: "Такой страницы пока нет. Воспользуйтесь боковым меню или нажмите ⌘K.",
    backHome: "На главную",
    heroBadge: "Nexus Wiki · v2.4 · Живой документ",
    heroLine1: "База знаний",
    heroLine2: "серьёзного мира Minecraft",
    heroSub: "Каждое правило, каждый институт и каждая крупица лора, поддерживающие политический сервер выживания Nexus — задокументированы как настоящий продукт.",
    readDocs: "Открыть документацию",
    searchWiki: "Поиск по вики",
    statSections: "Разделов",
    statPages: "Страниц",
    statVersion: "Версия",
    exploreEyebrow: "Обзор",
    exploreTitle: "Начните с раздела",
    allDocs: "Вся документация →",
    pagesCount: "страниц",
    pageCount: "страница",
    recentlyUpdated: "Недавно обновлено",
    powerUser: "Для опытных",
    shortcuts: "Горячие клавиши",
    kbdPalette: "Командная палитра",
    kbdSearch: "Быстрый поиск",
    kbdHeading: "Копировать ссылку на заголовок",
    hoverHeading: "наведите на заголовок",
    footer: "Nexus Wiki · Документация поддерживается сообществом · Собрано на TanStack Start",
  },
} as const;

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (stored === "ru" || stored === "en") setLocaleState(stored);
      else {
        const nav = typeof navigator !== "undefined" ? navigator.language : "";
        if (nav.toLowerCase().startsWith("ru")) setLocaleState("ru");
      }
    } catch { /* noop */ }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch { /* noop */ }
    if (typeof document !== "undefined") document.documentElement.lang = l;
  }, []);

  const t = useCallback((k: keyof typeof UI["en"]) => UI[locale][k], [locale]);

  return <LocaleContext.Provider value={{ locale, setLocale, t }}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Ctx {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
