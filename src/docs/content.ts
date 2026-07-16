// Auto-registered documentation content for the Nexus wiki.
// Each section auto-generates a sidebar group; each page is addressable at
// /docs/<section-slug>/<page-slug>.

export type DocPage = {
  slug: string;
  title: string;
  description: string;
  updated: string;
  body: string;
};

export type DocSection = {
  slug: string;
  title: string;
  icon: string; // lucide icon name key (mapped in Sidebar)
  pages: DocPage[];
};

const stub = (title: string, blurb: string) => `# ${title}

${blurb}

> This page is part of the living Nexus documentation. Content is expanded continuously by staff and community editors.

## Overview

${title} covers the essential rules, conventions and processes that shape this part of the Nexus experience. Every subsection below is a stable, citeable rule — staff decisions will reference these exact clauses.

## Key points

- Clear, unambiguous rules that scale to hundreds of players.
- Written to be enforced consistently regardless of who is on duty.
- Versioned so historical decisions can always be justified.

## Section 1 — Scope

This document applies to every player on the Nexus main server unless a more specific rule is defined elsewhere in the wiki. When two rules appear to conflict, the more specific one wins.

## Section 2 — Definitions

**Player** — any account connected to the Nexus network.
**Staff** — moderators, administrators and system operators listed on the [Administration](/docs/administration/staff-rules) page.
**State** — a recognized in-game political entity as defined in [Creating a State](/docs/governments/creating-a-state).

## Section 3 — Enforcement

Violations are handled through the standard [Punishments](/docs/players/punishments) ladder. Appeals go through the [Appeals](/docs/administration/appeals) process.

## See also

- [General Rules](/docs/players/general-rules)
- [Philosophy](/docs/getting-started/philosophy)
- [FAQ](/docs/getting-started/faq)
`;

export const sections: DocSection[] = [
  {
    slug: "getting-started",
    title: "Getting Started",
    icon: "Rocket",
    pages: [
      {
        slug: "about-nexus",
        title: "About Nexus",
        description: "What Nexus is, who it's for, and what makes it different.",
        updated: "2026-07-01",
        body: `# About Nexus

**Nexus** is a long-form political survival server for Minecraft where nations, economies, and stories are built by players — not scripts. There are no forced factions, no artificial win conditions, no reset timers. What exists on the map is what players choose to build, defend, and govern.

## What kind of server is this?

Nexus sits at the intersection of three things Minecraft rarely combines well:

1. **Survival** — vanilla resource pressure, real distances, real consequences.
2. **Politics** — states with constitutions, elected governments, treaties, and wars.
3. **Roleplay** — a persistent post-collapse world with radiation, factions, and lore that reacts to player actions.

If you have played on a "faction" server, forget most of what you know. Nexus is closer to a slow, systemic sandbox than to a PvP arena.

## Who is Nexus for?

- Players who enjoy **building institutions**, not just bases.
- Writers, diplomats, lawyers, journalists, engineers — every kind of player finds a role.
- People who value **fair, documented rules** over "vibes-based" moderation.

## What Nexus is **not**

- Not a pay-to-win server. Nothing that affects gameplay balance is sold.
- Not a hardcore PvP grinder. PvP exists, but it is regulated and consequential.
- Not a lawless anarchy server. Rules are enforced consistently and transparently.

## Where to go next

- Read the [Philosophy](/docs/getting-started/philosophy) to understand *why* the server is designed this way.
- Skim the [General Rules](/docs/players/general-rules) before joining.
- If a term confuses you, the [Terminology](/docs/getting-started/terminology) page is the single source of truth.
`,
      },
      {
        slug: "philosophy",
        title: "Philosophy",
        description: "The design principles behind every rule and system on Nexus.",
        updated: "2026-06-28",
        body: `# Philosophy

Every rule in this wiki descends from a small number of principles. When a situation is not explicitly covered, staff decisions are guided by these — in order.

## 1. Player agency is sacred

The server exists to let players make meaningful decisions. Rules that reduce agency exist only to protect other players' agency.

## 2. Consequences must be legible

If an action can get you punished, the punishment must be findable in this wiki *before* you take the action. Staff never invent rules retroactively.

## 3. Politics beats mechanics

Whenever a system *could* be mechanical (a plugin that auto-resolves a war) or *political* (players negotiate through their governments), Nexus picks political. Mechanics exist to enable politics, not replace them.

## 4. The world persists

There are no map resets. A building you make today can still stand in three years. This shapes every decision — griefing rules, territory rules, punishment severity — because damage is permanent.

## 5. Roleplay is opt-in, but the world isn't

You are never required to write in-character. But the world *around* you is always in-character: NPC factions act, radiation zones shift, elections happen. You can ignore lore, you cannot break it.

## 6. Staff serve the rules, not the other way around

Staff have no in-game advantage. They enforce this document; they do not overwrite it. See [Staff Rules](/docs/administration/staff-rules).
`,
      },
      {
        slug: "faq",
        title: "FAQ",
        description: "Quick answers to the questions new players ask most.",
        updated: "2026-07-10",
        body: `# Frequently Asked Questions

## Is Nexus free to play?

Yes. Access requires a legitimate Minecraft Java Edition account. Donations exist but grant only cosmetic perks — see [About Nexus](/docs/getting-started/about-nexus).

## What version does the server run?

Latest stable Minecraft Java release, with a small set of quality-of-life plugins. The [Changelog](/docs/development/changelog) tracks every version bump.

## Can I play solo?

Absolutely. You can live your entire time on Nexus without joining a state. Many players do.

## Can I found my own country?

Yes — see [Creating a State](/docs/governments/creating-a-state). There is a minimum population and territory requirement.

## Is there PvP?

Yes, but regulated. Read [PvP](/docs/players/pvp) before engaging.

## How do appeals work?

Every punishment can be appealed. See [Appeals](/docs/administration/appeals).

## Where do I report a bug?

Post it in the DevBlog thread or open a ticket in-game. See [DevBlog](/docs/development/devblog).
`,
      },
      {
        slug: "terminology",
        title: "Terminology",
        description: "Every Nexus-specific term, defined once.",
        updated: "2026-06-15",
        body: `# Terminology

When a term is used in a rule, it means exactly what this page says it means.

| Term | Definition |
| --- | --- |
| **State** | A player-recognized political entity meeting the requirements of [Creating a State](/docs/governments/creating-a-state). |
| **Territory** | A contiguous area claimed by a state under the [Territories](/docs/players/territories) system. |
| **Citizen** | A player registered to a state's citizenship list. |
| **Faction** | An in-lore group of NPCs — not a player state. See [Factions](/docs/lore/factions). |
| **Zone** | A radiation-classified area of the map. See [Radiation](/docs/lore/radiation). |
| **Incident** | Any staff-logged event that may lead to a punishment. |
| **PMC** | Private Military Company — a licensed player organization. See [PMCs](/docs/organizations/pmcs). |
| **Warrant** | A judicial order issued by a state's [Judiciary](/docs/governments/judiciary). |
`,
      },
    ],
  },
  {
    slug: "players",
    title: "Players",
    icon: "Users",
    pages: [
      {
        slug: "general-rules",
        title: "General Rules",
        description: "The foundational rules every Nexus player must follow.",
        updated: "2026-07-05",
        body: `# General Rules

These rules apply to every player, every state, every situation. Nothing in the rest of this wiki overrides them.

## 1. Respect other players

Real-world harassment, hate speech, sexual content involving minors, doxxing, and threats of violence are permanent bans. No appeals.

## 2. No cheating

Any client modification that gives a mechanical advantage — X-ray, fly, killaura, autoclickers above 10 CPS, packet manipulation — is a permanent ban on first offense.

## 3. No exploiting

Duplication bugs, chunk-loading exploits, and mechanic abuse must be reported. Using them is punishable even if the bug is not yet patched.

## 4. One account per person

Alternate accounts are allowed only when explicitly registered with staff. Ban evasion via alts extends the original ban to every linked account.

## 5. English or Russian in global chat

Local, state, and private chats can be in any language. Global chat is bilingual to keep moderation possible.

## 6. Respect the world

The world does not reset. Griefing outside of a declared war is treated as vandalism — see [Punishments](/docs/players/punishments).

## 7. Rules can change

This document is versioned. Changes take effect **48 hours after** they are announced in the [Changelog](/docs/development/changelog). Old versions are archived.
`,
      },
      { slug: "communication-rules", title: "Communication Rules", description: "How to speak, when to whisper, and what never to say.", updated: "2026-07-02", body: stub("Communication Rules", "Chat channels, tone, advertising, and what counts as harassment.") },
      { slug: "gameplay", title: "Gameplay", description: "Server-wide gameplay conventions and limits.", updated: "2026-06-28", body: stub("Gameplay", "Farming, redstone, mob farms, AFK policies, and the general shape of survival on Nexus.") },
      { slug: "building", title: "Building", description: "Rules for construction, aesthetics, and structural integrity.", updated: "2026-06-25", body: stub("Building", "Style guidelines, protected biomes, minimum quality standards, and abandonment.") },
      { slug: "territories", title: "Territories", description: "Claiming, defending, and losing land.", updated: "2026-07-01", body: stub("Territories", "How land is claimed, how borders are enforced, and how territory changes hands.") },
      { slug: "pvp", title: "PvP", description: "When you can fight, where, and with what consequences.", updated: "2026-07-08", body: stub("PvP", "Consent, safe zones, war zones, and the ledger of legitimate combat.") },
      { slug: "economy", title: "Economy", description: "Currency, trade, banks, and price stability.", updated: "2026-06-20", body: stub("Economy", "How the Nexus currency works, what backs it, and how markets are regulated.") },
      { slug: "punishments", title: "Punishments", description: "The complete ladder from warning to permanent ban.", updated: "2026-07-09", body: stub("Punishments", "Every infraction, its default penalty, and the escalation ladder staff must follow.") },
      { slug: "content-creators", title: "Content Creators", description: "Rules and perks for streamers, YouTubers, and journalists.", updated: "2026-06-10", body: stub("Content Creators", "How to register as a content creator, what you get, and what you owe the community.") },
    ],
  },
  {
    slug: "governments",
    title: "Governments",
    icon: "Landmark",
    pages: [
      { slug: "creating-a-state", title: "Creating a State", description: "Requirements, paperwork, and the founding ceremony.", updated: "2026-07-04", body: stub("Creating a State", "Minimum citizens, territorial claim process, and constitutional filing.") },
      { slug: "constitution", title: "Constitution", description: "What a Nexus constitution must contain to be recognized.", updated: "2026-06-30", body: stub("Constitution", "Mandatory clauses, optional structures, and how amendments work.") },
      { slug: "government", title: "Government", description: "Executive, legislative, and administrative structures.", updated: "2026-06-27", body: stub("Government", "Common government forms, ministries, and how power is distributed.") },
      { slug: "elections", title: "Elections", description: "Scheduling, voting, and certifying results.", updated: "2026-07-06", body: stub("Elections", "Ballot design, voting periods, staff oversight, and dispute resolution.") },
      { slug: "diplomacy", title: "Diplomacy", description: "Treaties, embassies, and recognition.", updated: "2026-06-22", body: stub("Diplomacy", "How states formally interact — from recognition to trade pacts.") },
      { slug: "alliances", title: "Alliances", description: "Building and dissolving military and economic blocs.", updated: "2026-06-18", body: stub("Alliances", "Alliance charters, mutual defense, and the responsibilities of membership.") },
      { slug: "wars", title: "Wars", description: "Declaring, waging, and ending wars legally.", updated: "2026-07-07", body: stub("Wars", "Casus belli, declaration formalities, rules of engagement, and peace treaties.") },
      { slug: "judiciary", title: "Judiciary", description: "Courts, warrants, and due process.", updated: "2026-06-24", body: stub("Judiciary", "How states structure courts, issue warrants, and try citizens.") },
      { slug: "economy", title: "Economy", description: "State budgets, taxation, and central banking.", updated: "2026-06-21", body: stub("State Economy", "Budgets, taxation systems, and how states interact with the Nexus market.") },
    ],
  },
  {
    slug: "organizations",
    title: "Organizations",
    icon: "Building2",
    pages: [
      { slug: "companies", title: "Companies", description: "Founding and running a chartered company.", updated: "2026-06-15", body: stub("Companies", "Legal structure, employees, contracts, and dissolution.") },
      { slug: "media", title: "Media", description: "Newspapers, radio stations, and journalistic ethics.", updated: "2026-06-12", body: stub("Media", "Press freedom, source protection, and libel on Nexus.") },
      { slug: "universities", title: "Universities", description: "Academic institutions, research, and accreditation.", updated: "2026-06-10", body: stub("Universities", "How to found a university and what accreditation gets you.") },
      { slug: "pmcs", title: "PMCs", description: "Private Military Companies — licensing and limits.", updated: "2026-07-03", body: stub("PMCs", "Licensing, contract restrictions, and the rules of engagement.") },
      { slug: "non-profit-organizations", title: "Non-profit Organizations", description: "NGOs, charities, and humanitarian groups.", updated: "2026-06-08", body: stub("Non-profit Organizations", "Registration, funding, and neutrality obligations.") },
    ],
  },
  {
    slug: "administration",
    title: "Administration",
    icon: "Shield",
    pages: [
      { slug: "staff-rules", title: "Staff Rules", description: "The rules staff hold themselves to.", updated: "2026-07-05", body: stub("Staff Rules", "Conflict of interest, transparency, and the limits of staff power.") },
      { slug: "responsibilities", title: "Responsibilities", description: "What each staff role owns.", updated: "2026-06-20", body: stub("Responsibilities", "Moderator, administrator, and operator role definitions.") },
      { slug: "appeals", title: "Appeals", description: "How to appeal a punishment and what to expect.", updated: "2026-07-06", body: stub("Appeals", "Submission process, response windows, and escalation.") },
      { slug: "internal-regulations", title: "Internal Regulations", description: "Staff-only procedures and workflows.", updated: "2026-06-18", body: stub("Internal Regulations", "Public-facing summary of staff workflows.") },
    ],
  },
  {
    slug: "lore",
    title: "Lore",
    icon: "BookOpen",
    pages: [
      { slug: "world-history", title: "World History", description: "The collapse, the interregnum, and the present.", updated: "2026-06-30", body: stub("World History", "The narrative arc of the Nexus world from the Collapse to now.") },
      { slug: "timeline", title: "Timeline", description: "Every canonical date in one place.", updated: "2026-07-01", body: stub("Timeline", "A dated ledger of every canonical event.") },
      { slug: "radiation", title: "Radiation", description: "Zones, doses, and the science of the wasteland.", updated: "2026-06-28", body: stub("Radiation", "Zone classifications, exposure mechanics, and treatment.") },
      { slug: "diseases", title: "Diseases", description: "Endemic and pandemic threats.", updated: "2026-06-25", body: stub("Diseases", "Vectors, symptoms, and treatments.") },
      { slug: "mutations", title: "Mutations", description: "Flora, fauna, and rare human variants.", updated: "2026-06-22", body: stub("Mutations", "What has changed, and how it changed.") },
      { slug: "technologies", title: "Technologies", description: "Pre-collapse and post-collapse tech tiers.", updated: "2026-06-20", body: stub("Technologies", "What survives, what was rebuilt, and what is lost.") },
      { slug: "laboratories", title: "Laboratories", description: "Named research sites and their history.", updated: "2026-06-15", body: stub("Laboratories", "The sealed and unsealed research facilities of the old world.") },
      { slug: "factions", title: "Factions", description: "Every NPC faction, ranked by influence.", updated: "2026-07-02", body: stub("Factions", "Named NPC groups, their goals, and how players can interact with them.") },
    ],
  },
  {
    slug: "development",
    title: "Development",
    icon: "Code2",
    pages: [
      {
        slug: "changelog",
        title: "Changelog",
        description: "Every server change, dated and attributed.",
        updated: "2026-07-11",
        body: `# Changelog

## v2.4.0 — 2026-07-11

- Added: state central bank framework — see [State Economy](/docs/governments/economy).
- Changed: PvP consent now defaults to *off* outside declared war zones.
- Fixed: territory claim overlap edge case at diagonal chunk borders.

## v2.3.0 — 2026-06-20

- Added: PMC licensing tier system.
- Added: media outlet registration.
- Changed: election period standardized to 7 days.

## v2.2.0 — 2026-05-30

- Added: radiation zone recomputation on server tick.
- Removed: legacy /warp system.

## v2.1.0 — 2026-05-10

- Nexus 2 launch. Full ruleset rewrite.
`,
      },
      {
        slug: "roadmap",
        title: "Roadmap",
        description: "What's shipping next, and when.",
        updated: "2026-07-08",
        body: `# Roadmap

## Q3 2026

- Judicial appeals module (in-game court UI).
- Central bank reserve tracking.
- Automatic constitutional compliance checker.

## Q4 2026

- Diplomatic action replay viewer.
- Faction reputation rework.
- Lore compendium in-game item.

## 2027

- Second continent opens.
- Cross-continent trade routes.

Roadmap items are directional, not promises. See [DevBlog](/docs/development/devblog) for weekly progress.
`,
      },
      { slug: "devblog", title: "DevBlog", description: "Weekly notes from the dev team.", updated: "2026-07-10", body: stub("DevBlog", "Weekly notes from the dev team about what shipped, what broke, and what's next.") },
    ],
  },
];

export type FlatDoc = DocPage & { sectionSlug: string; sectionTitle: string; path: string };

export const flatDocs: FlatDoc[] = sections.flatMap((s) =>
  s.pages.map((p) => ({
    ...p,
    sectionSlug: s.slug,
    sectionTitle: s.title,
    path: `/docs/${s.slug}/${p.slug}`,
  }))
);

export function findDoc(sectionSlug: string, pageSlug: string): FlatDoc | undefined {
  return flatDocs.find((d) => d.sectionSlug === sectionSlug && d.slug === pageSlug);
}

export function getPrevNext(current: FlatDoc): { prev?: FlatDoc; next?: FlatDoc } {
  const idx = flatDocs.findIndex((d) => d.path === current.path);
  return { prev: idx > 0 ? flatDocs[idx - 1] : undefined, next: idx < flatDocs.length - 1 ? flatDocs[idx + 1] : undefined };
}

export function readingTimeMinutes(body: string): number {
  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

// --- Locale-aware accessors ----------------------------------------------
import { localizeSection } from "@/docs/translations";
import type { Locale } from "@/docs/i18n";

export function getSections(locale: Locale): DocSection[] {
  if (locale === "ru") return sections.map(localizeSection);
  return sections;
}

export function getFlatDocs(locale: Locale): FlatDoc[] {
  return getSections(locale).flatMap((s) =>
    s.pages.map((p) => ({ ...p, sectionSlug: s.slug, sectionTitle: s.title, path: `/docs/${s.slug}/${p.slug}` }))
  );
}

export function findDocLocalized(sectionSlug: string, pageSlug: string, locale: Locale): FlatDoc | undefined {
  return getFlatDocs(locale).find((d) => d.sectionSlug === sectionSlug && d.slug === pageSlug);
}

export function getPrevNextLocalized(current: FlatDoc, locale: Locale): { prev?: FlatDoc; next?: FlatDoc } {
  const list = getFlatDocs(locale);
  const idx = list.findIndex((d) => d.path === current.path);
  return { prev: idx > 0 ? list[idx - 1] : undefined, next: idx < list.length - 1 ? list[idx + 1] : undefined };
}
