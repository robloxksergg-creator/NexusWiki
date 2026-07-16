import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Book, Github, Languages, Menu, Moon, Search, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DocsSidebar } from "@/docs/DocsSidebar";
import { CommandPalette } from "@/docs/CommandPalette";
import { ReadingProgress } from "@/docs/ReadingProgress";
import { useTheme } from "@/docs/theme";
import { useLocale } from "@/docs/i18n";
import { cn } from "@/lib/utils";

export function DocsLayout({ children }: { children: ReactNode }) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const { locale, setLocale, t } = useLocale();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ReadingProgress />
      <header className="sticky top-0 z-40 border-b border-border/70 glass">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-3 px-4">
          <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto p-0">
              <div className="border-b border-border p-4">
                <BrandMark />
              </div>
              <div className="px-3">
                <DocsSidebar onNavigate={() => setMobileNavOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>

          <Link to="/" className="flex items-center gap-2 shrink-0">
            <BrandMark />
          </Link>

          <nav className="ml-4 hidden items-center gap-1 text-sm md:flex">
            <Link
              to="/docs/$"
              params={{ _splat: "getting-started/about-nexus" }}
              className={cn(
                "rounded-md px-2.5 py-1.5 text-muted-foreground transition-colors hover:text-foreground",
                pathname.startsWith("/docs") && "text-foreground"
              )}
            >
              {t("documentation")}
            </Link>
            <Link
              to="/docs/$"
              params={{ _splat: "development/changelog" }}
              className="rounded-md px-2.5 py-1.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              {t("changelog")}
            </Link>
            <Link
              to="/docs/$"
              params={{ _splat: "development/roadmap" }}
              className="rounded-md px-2.5 py-1.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              {t("roadmap")}
            </Link>
          </nav>

          <div className="flex-1" />

          <button
            onClick={() => setPaletteOpen(true)}
            className="hidden h-9 items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 text-sm text-muted-foreground transition-colors hover:bg-muted md:flex md:w-72"
          >
            <Search className="h-4 w-4" />
            <span>{t("searchDocs")}</span>
            <span className="ml-auto flex items-center gap-1">
              <kbd className="rounded bg-background/60 px-1.5 py-0.5 text-[10px] font-medium">⌘</kbd>
              <kbd className="rounded bg-background/60 px-1.5 py-0.5 text-[10px] font-medium">K</kbd>
            </span>
          </button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setPaletteOpen(true)}>
            <Search className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1.5 px-2 text-xs font-semibold uppercase tracking-wider">
                <Languages className="h-3.5 w-3.5" />
                {locale}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-32">
              <DropdownMenuItem onClick={() => setLocale("en")} className={cn(locale === "en" && "text-primary")}>
                🇬🇧 English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLocale("ru")} className={cn(locale === "ru" && "text-primary")}>
                🇷🇺 Русский
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hidden md:inline-flex">
            <Button variant="ghost" size="icon">
              <Github className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </header>

      {isHome ? (
        <main>{children}</main>
      ) : (
        <div className="mx-auto flex max-w-[1400px] gap-6 px-4">
          <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-y-auto lg:block">
            <DocsSidebar />
          </aside>
          <main className="min-w-0 flex-1 py-8">{children}</main>
        </div>
      )}

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </div>
  );
}

function BrandMark() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded-md bg-gradient-to-br from-primary to-primary-glow shadow-[0_0_20px_-4px_var(--color-primary)]">
        <Book className="h-3.5 w-3.5 text-primary-foreground" />
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-display text-[15px] font-bold tracking-tight">Nexus</span>
        <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">Docs · v2.4</span>
      </div>
    </div>
  );
}
