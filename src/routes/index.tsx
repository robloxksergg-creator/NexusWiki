import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { ArrowRight, BookOpen, Building2, Code2, Command, Compass, Landmark, Rocket, Search, Shield, Sparkles, Users } from "lucide-react";
import { getFlatDocs, getSections } from "@/docs/content";
import { useLocale } from "@/docs/i18n";

export const Route = createFileRoute("/")({
  component: Home,
});

const ICONS = { Rocket, Users, Landmark, Building2, Shield, BookOpen, Code2 } as const;

function Home() {
  const { locale, t } = useLocale();
  const sections = useMemo(() => getSections(locale), [locale]);
  const flat = useMemo(() => getFlatDocs(locale), [locale]);
  const recentlyUpdated = useMemo(
    () => [...flat].sort((a, b) => (a.updated < b.updated ? 1 : -1)).slice(0, 4),
    [flat]
  );

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border/70">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[900px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative mx-auto max-w-[1400px] px-6 py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3 w-3" /> {t("heroBadge")}
            </div>
            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
              {t("heroLine1")}{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                {t("heroLine2")}
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">{t("heroSub")}</p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/docs/$"
                params={{ _splat: "getting-started/about-nexus" }}
                className="group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_30px_-6px_var(--color-primary)] transition-transform hover:-translate-y-0.5"
              >
                {t("readDocs")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <button
                onClick={() => {
                  const e = new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true });
                  window.dispatchEvent(e);
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/60 px-5 py-3 text-sm font-medium text-foreground backdrop-blur transition-colors hover:border-primary/40"
              >
                <Search className="h-4 w-4" />
                {t("searchWiki")}
                <span className="ml-2 flex items-center gap-1">
                  <kbd className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium">⌘</kbd>
                  <kbd className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium">K</kbd>
                </span>
              </button>
            </div>

            <div className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-6 text-left">
              {[
                { label: t("statSections"), value: sections.length },
                { label: t("statPages"), value: flat.length },
                { label: t("statVersion"), value: "2.4" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-border bg-card/40 p-4 text-center backdrop-blur">
                  <div className="font-display text-2xl font-bold text-primary">{s.value}</div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary">
              <Compass className="h-3.5 w-3.5" /> {t("exploreEyebrow")}
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{t("exploreTitle")}</h2>
          </div>
          <Link
            to="/docs/$"
            params={{ _splat: "getting-started/about-nexus" }}
            className="hidden text-sm text-muted-foreground hover:text-foreground md:inline-flex"
          >
            {t("allDocs")}
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map((s) => {
            const Icon = (ICONS as Record<string, typeof Rocket>)[s.icon] ?? Rocket;
            return (
              <Link
                key={s.slug}
                to="/docs/$"
                params={{ _splat: `${s.slug}/${s.pages[0].slug}` }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card/40 p-5 transition-all hover:-translate-y-1 hover:border-primary/40 hover:bg-card hover:shadow-[0_20px_50px_-20px_var(--color-primary)]"
              >
                <div className="mb-4 grid h-10 w-10 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary transition-transform group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {s.pages.length} {s.pages.length === 1 ? t("pageCount") : t("pagesCount")}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {s.pages.slice(0, 3).map((p) => (
                    <span key={p.slug} className="rounded-md bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                      {p.title}
                    </span>
                  ))}
                  {s.pages.length > 3 && (
                    <span className="rounded-md bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                      +{s.pages.length - 3}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-24">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="mb-6 font-display text-2xl font-bold tracking-tight">{t("recentlyUpdated")}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {recentlyUpdated.map((d) => (
                <Link
                  key={d.path}
                  to="/docs/$"
                  params={{ _splat: `${d.sectionSlug}/${d.slug}` }}
                  className="group rounded-xl border border-border bg-card/40 p-4 transition-colors hover:border-primary/40 hover:bg-card"
                >
                  <div className="text-xs uppercase tracking-wider text-primary">{d.sectionTitle}</div>
                  <div className="mt-1 font-medium">{d.title}</div>
                  <div className="mt-1 line-clamp-2 text-xs text-muted-foreground">{d.description}</div>
                  <div className="mt-3 text-[11px] text-muted-foreground">
                    {t("updated")} {new Date(d.updated).toLocaleDateString(locale === "ru" ? "ru-RU" : undefined, { month: "short", day: "numeric", year: "numeric" })}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <aside className="rounded-2xl border border-border bg-card/40 p-6">
            <div className="mb-2 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary">
              <Command className="h-3.5 w-3.5" /> {t("powerUser")}
            </div>
            <h3 className="font-display text-xl font-semibold">{t("shortcuts")}</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">{t("kbdPalette")}</span>
                <span className="flex gap-1">
                  <kbd className="rounded bg-muted px-1.5 py-0.5 text-[11px]">⌘</kbd>
                  <kbd className="rounded bg-muted px-1.5 py-0.5 text-[11px]">K</kbd>
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">{t("kbdSearch")}</span>
                <kbd className="rounded bg-muted px-1.5 py-0.5 text-[11px]">/</kbd>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">{t("kbdHeading")}</span>
                <span className="text-xs text-muted-foreground">{t("hoverHeading")}</span>
              </li>
            </ul>
          </aside>
        </div>
      </section>

      <footer className="border-t border-border/70 py-8 text-center text-xs text-muted-foreground">{t("footer")}</footer>
    </div>
  );
}
