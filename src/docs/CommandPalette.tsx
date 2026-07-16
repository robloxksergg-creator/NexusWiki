import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { getFlatDocs, getSections } from "@/docs/content";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { FileText, Hash } from "lucide-react";
import { useLocale } from "@/docs/i18n";

export function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const navigate = useNavigate();
  const { locale, t } = useLocale();
  const [query, setQuery] = useState("");
  const sections = useMemo(() => getSections(locale), [locale]);
  const flat = useMemo(() => getFlatDocs(locale), [locale]);

  useEffect(() => { if (!open) setQuery(""); }, [open]);

  const go = (path: string) => {
    onOpenChange(false);
    const splat = path.replace(/^\/docs\//, "");
    navigate({ to: "/docs/$", params: { _splat: splat } });
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder={t("searchPlaceholder")} value={query} onValueChange={setQuery} />
      <CommandList>
        <CommandEmpty>{t("noResults")}</CommandEmpty>
        {sections.map((section) => (
          <CommandGroup key={section.slug} heading={section.title}>
            {section.pages.map((page) => {
              const path = `/docs/${section.slug}/${page.slug}`;
              return (
                <CommandItem key={path} value={`${section.title} ${page.title} ${page.description}`} onSelect={() => go(path)}>
                  <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div className="flex flex-col">
                    <span>{page.title}</span>
                    <span className="text-xs text-muted-foreground">{page.description}</span>
                  </div>
                </CommandItem>
              );
            })}
          </CommandGroup>
        ))}
        {query.length > 1 && (
          <CommandGroup heading={t("fullText")}>
            {flat
              .filter((d) => d.body.toLowerCase().includes(query.toLowerCase()))
              .slice(0, 6)
              .map((d) => (
                <CommandItem key={`ft-${d.path}`} value={`ft ${d.path} ${d.title}`} onSelect={() => go(d.path)}>
                  <Hash className="mr-2 h-4 w-4 text-primary" />
                  <span>{d.sectionTitle} › {d.title}</span>
                </CommandItem>
              ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}
