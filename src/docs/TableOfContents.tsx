import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type TocItem = { id: string; text: string; depth: number };

export function extractToc(container: HTMLElement | null): TocItem[] {
  if (!container) return [];
  const nodes = container.querySelectorAll("h2, h3");
  const items: TocItem[] = [];
  nodes.forEach((n) => {
    const el = n as HTMLElement;
    const text = el.textContent?.replace(/#\s*$/, "").trim() ?? "";
    if (!el.id) {
      el.id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    }
    items.push({ id: el.id, text, depth: el.tagName === "H2" ? 2 : 3 });
  });
  return items;
}

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!items.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <div className="text-sm">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">On this page</p>
      <ul className="flex flex-col gap-1 border-l border-border/70">
        {items.map((it) => (
          <li key={it.id} style={{ paddingLeft: it.depth === 3 ? 20 : 12 }}>
            <a
              href={`#${it.id}`}
              className={cn(
                "-ml-px block border-l-2 py-1 pl-3 text-[13px] leading-tight transition-colors",
                active === it.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
              )}
            >
              {it.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
