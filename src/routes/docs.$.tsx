import { createFileRoute, notFound } from "@tanstack/react-router";
import { DocPageView } from "@/docs/DocPageView";
import { findDoc, sections } from "@/docs/content";

export const Route = createFileRoute("/docs/$")({
  loader: ({ params }) => {
    const splat = params._splat ?? "";
    const parts = splat.split("/").filter(Boolean);
    // /docs -> redirect-ish: default to first page
    if (parts.length === 0) {
      const first = sections[0].pages[0];
      return { sectionSlug: sections[0].slug, pageSlug: first.slug };
    }
    // /docs/<section> -> first page of section
    if (parts.length === 1) {
      const section = sections.find((s) => s.slug === parts[0]);
      if (!section) throw notFound();
      return { sectionSlug: section.slug, pageSlug: section.pages[0].slug };
    }
    const [sectionSlug, pageSlug] = parts;
    if (!findDoc(sectionSlug, pageSlug)) throw notFound();
    return { sectionSlug, pageSlug };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found — Nexus Wiki" }, { name: "robots", content: "noindex" }] };
    const doc = findDoc(loaderData.sectionSlug, loaderData.pageSlug);
    if (!doc) return { meta: [{ title: "Not found — Nexus Wiki" }] };
    return {
      meta: [
        { title: `${doc.title} — Nexus Wiki` },
        { name: "description", content: doc.description },
        { property: "og:title", content: `${doc.title} — Nexus Wiki` },
        { property: "og:description", content: doc.description },
      ],
    };
  },
  component: DocRoute,
  notFoundComponent: () => (
    <div className="py-24 text-center">
      <h1 className="font-display text-3xl font-bold">Doc not found</h1>
      <p className="mt-2 text-muted-foreground">Try the sidebar or press ⌘K.</p>
    </div>
  ),
});

function DocRoute() {
  const { sectionSlug, pageSlug } = Route.useLoaderData();
  return <DocPageView key={`${sectionSlug}/${pageSlug}`} sectionSlug={sectionSlug} pageSlug={pageSlug} />;
}
