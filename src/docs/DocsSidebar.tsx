import { Link, useRouterState } from "@tanstack/react-router";
import { getSections } from "@/docs/content";
import { BookOpen, Building2, ChevronRight, Code2, Landmark, Rocket, Shield, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/docs/i18n";

const ICONS = { Rocket, Users, Landmark, Building2, Shield, BookOpen, Code2 } as const;

export function DocsSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { locale } = useLocale();
  const sections = useMemo(() => getSections(locale), [locale]);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const activeSection = useMemo(() => pathname.split("/")[2], [pathname]);
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(sections.map((s) => [s.slug, true]))
  );

  return (
    <nav className="flex flex-col gap-1 py-6 pr-2 text-sm">
      {sections.map((section) => {
        const Icon = (ICONS as Record<string, typeof Rocket>)[section.icon] ?? Rocket;
        const isOpen = open[section.slug] ?? true;
        const isActiveSection = activeSection === section.slug;
        return (
          <div key={section.slug} className="mb-1">
            <button
              onClick={() => setOpen((o) => ({ ...o, [section.slug]: !isOpen }))}
              className={cn(
                "group flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left font-medium transition-colors",
                isActiveSection ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span className={cn(
                "grid h-6 w-6 shrink-0 place-items-center rounded-md border transition-colors",
                isActiveSection ? "border-primary/40 bg-primary/10 text-primary" : "border-border bg-muted/40"
              )}>
                <Icon className="h-3.5 w-3.5" />
              </span>
              <span className="flex-1 truncate">{section.title}</span>
              <ChevronRight className={cn("h-3.5 w-3.5 transition-transform", isOpen && "rotate-90")} />
            </button>
            {isOpen && (
              <ul className="ml-3 mt-1 flex flex-col gap-0.5 border-l border-border/70 pl-3">
                {section.pages.map((page) => {
                  const to = `/docs/${section.slug}/${page.slug}`;
                  const active = pathname === to;
                  return (
                    <li key={page.slug}>
                      <Link
                        to="/docs/$"
                        params={{ _splat: `${section.slug}/${page.slug}` }}
                        onClick={onNavigate}
                        className={cn(
                          "block rounded-md px-2.5 py-1.5 text-[13px] leading-tight transition-colors",
                          active
                            ? "bg-primary/10 font-medium text-primary"
                            : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                        )}
                      >
                        {page.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </nav>
  );
}
