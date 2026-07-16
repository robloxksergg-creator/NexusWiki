import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Clock, Link2, PencilLine } from "lucide-react";
import { findDocLocalized, getFlatDocs, getPrevNextLocalized, getSections, readingTimeMinutes } from "@/docs/content";
import { TableOfContents, extractToc, type TocItem } from "@/docs/TableOfContents";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useLocale } from "@/docs/i18n";

export function DocPageView({ sectionSlug, pageSlug }: { sectionSlug: string; pageSlug: string }) {
  const { locale, t } = useLocale();
  const doc = useMemo(() => findDocLocalized(sectionSlug, pageSlug, locale), [sectionSlug, pageSlug, locale]);
  const contentRef = useRef<HTMLDivElement>(null);
  const [toc, setToc] = useState<TocItem[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!doc) return;
    const timer = setTimeout(() => {
      const items = extractToc(contentRef.current);
      setToc(items);
      contentRef.current?.querySelectorAll("h2, h3").forEach((h) => {
        const el = h as HTMLElement;
        if (el.querySelector("[data-anchor-btn]")) return;
        const btn = document.createElement("button");
        btn.setAttribute("data-anchor-btn", "");
        btn.className = "ml-2 inline-flex align-middle opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-primary";
        btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 1 1 0 10h-2"/><line x1="8" x2="16" y1="12" y2="12"/></svg>';
        btn.onclick = () => {
          const url = `${window.location.origin}${window.location.pathname}#${el.id}`;
          navigator.clipboard.writeText(url);
          toast.success(t("copiedHeading"));
        };
        el.classList.add("group");
        el.appendChild(btn);
      });
    }, 30);
    return () => clearTimeout(timer);
  }, [doc, locale, t]);

  if (!doc) return <NotFoundBlock />;

  const { prev, next } = getPrevNextLocalized(doc, locale);
  const section = getSections(locale).find((s) => s.slug === doc.sectionSlug)!;
  const minutes = readingTimeMinutes(doc.body);
  const updated = new Date(doc.updated).toLocaleDateString(locale === "ru" ? "ru-RU" : undefined, { year: "numeric", month: "short", day: "numeric" });

  const copyPageLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success(t("copiedLink"));
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="flex gap-10">
      <article className="min-w-0 flex-1">
        <nav className="mb-6 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">{t("home")}</Link>
          <ChevronRight className="h-3 w-3" />
          <span>{t("docs")}</span>
          <ChevronRight className="h-3 w-3" />
          <Link
            to="/docs/$"
            params={{ _splat: `${section.slug}/${section.pages[0].slug}` }}
            className="hover:text-foreground"
          >
            {section.title}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{doc.title}</span>
        </nav>

        <header className="mb-8">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="border-primary/40 text-primary">{section.title}</Badge>
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" /> {minutes} {t("minRead")}
            </span>
            <span className="text-xs text-muted-foreground">· {t("updated")} {updated}</span>
          </div>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">{doc.title}</h1>
              {doc.description && <p className="mt-3 text-lg text-muted-foreground">{doc.description}</p>}
            </div>
            <div className="flex gap-2">
              <button
                onClick={copyPageLink}
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card/50 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Link2 className="h-3.5 w-3.5" />}
                {t("copyLink")}
              </button>
              <a
                href={`https://github.com/`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card/50 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                <PencilLine className="h-3.5 w-3.5" /> {t("edit")}
              </a>
            </div>
          </div>
        </header>

        <div ref={contentRef} className="prose-doc">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSlug]}
            components={{
              a: ({ href = "", children, ...rest }) => {
                if (href.startsWith("/docs/")) {
                  const splat = href.replace(/^\/docs\//, "");
                  return (
                    <Link to="/docs/$" params={{ _splat: splat }} {...(rest as object)}>
                      {children}
                    </Link>
                  );
                }
                return <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" {...rest}>{children}</a>;
              },
            }}
          >
            {doc.body}
          </ReactMarkdown>
        </div>

        <div className="mt-14 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
          {prev ? (
            <Link
              to="/docs/$"
              params={{ _splat: `${prev.sectionSlug}/${prev.slug}` }}
              className="group flex flex-col rounded-xl border border-border bg-card/40 p-4 transition-all hover:border-primary/40 hover:bg-card"
            >
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <ChevronLeft className="h-3 w-3" /> {t("previous")}
              </span>
              <span className="mt-1 font-medium text-foreground group-hover:text-primary">{prev.title}</span>
            </Link>
          ) : <div />}
          {next ? (
            <Link
              to="/docs/$"
              params={{ _splat: `${next.sectionSlug}/${next.slug}` }}
              className="group flex flex-col items-end rounded-xl border border-border bg-card/40 p-4 text-right transition-all hover:border-primary/40 hover:bg-card"
            >
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                {t("next")} <ChevronRight className="h-3 w-3" />
              </span>
              <span className="mt-1 font-medium text-foreground group-hover:text-primary">{next.title}</span>
            </Link>
          ) : <div />}
        </div>
      </article>

      <aside className="sticky top-20 hidden h-[calc(100vh-6rem)] w-56 shrink-0 overflow-y-auto xl:block">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}

function NotFoundBlock() {
  const { locale, t } = useLocale();
  const suggestions = useMemo(() => getFlatDocs(locale).slice(0, 6), [locale]);
  return (
    <div className="mx-auto max-w-lg py-24 text-center">
      <h1 className="font-display text-3xl font-bold">{t("notFoundTitle")}</h1>
      <p className="mt-2 text-muted-foreground">{t("notFoundSub")}</p>
      <div className="mt-6">
        <Link to="/" className="text-primary hover:underline">{t("backHome")}</Link>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-2 text-left">
        {suggestions.map((d) => (
          <Link key={d.path} to="/docs/$" params={{ _splat: `${d.sectionSlug}/${d.slug}` }} className="rounded-md border border-border p-3 text-sm hover:border-primary/40">
            <div className="text-xs text-muted-foreground">{d.sectionTitle}</div>
            <div className="font-medium">{d.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
