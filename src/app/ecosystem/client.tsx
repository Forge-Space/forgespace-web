"use client";

import { motion } from "motion/react";
import { Layers, ExternalLink, CalendarClock, Tag } from "lucide-react";
import { EASE_SIZA } from "@/lib/constants";
import {
  type EcosystemSnapshot,
  type EcosystemRepo,
  type RepoGroup,
} from "@/lib/ecosystem-data";
import { FORGE_CTA_EVENTS } from "@/lib/analytics/ga4";
import { Section } from "@/components/ui/Section";
import { CTASection } from "@/components/landing/CTASection";

interface EcosystemPageProps {
  snapshot: EcosystemSnapshot;
}

const GROUP_ORDER: RepoGroup[] = [
  "Generation Engine",
  "Governance & Quality",
  "Design & Brand",
];

function buildGroups(repos: EcosystemRepo[]): Array<{ title: RepoGroup; repos: EcosystemRepo[] }> {
  return GROUP_ORDER.map((title) => ({
    title,
    repos: repos.filter((repo) => repo.group === title),
  })).filter((group) => group.repos.length > 0);
}

function ArchitectureOverview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: EASE_SIZA }}
      className="mb-14"
    >
      <p className="mb-3 text-center text-[10px] font-mono uppercase tracking-[0.18em] text-forge-text-subtle">
        Architecture
      </p>
      <div className="mx-auto max-w-sm rounded-xl border border-forge-border bg-[#0d0d0f] p-6 font-mono text-sm">
        <div className="flex flex-col items-center gap-0 text-center">
          <div className="rounded-lg border border-forge-border/70 bg-forge-surface/60 px-5 py-2 text-foreground">
            Your App
          </div>
          <div className="py-1 text-forge-text-subtle">↓</div>
          <div className="flex w-full items-start justify-center gap-6">
            <div className="flex flex-col items-center gap-0">
              <div className="rounded-lg border border-forge-primary/40 bg-forge-primary/10 px-4 py-2 text-forge-primary">
                mcp-gateway
              </div>
              <div className="py-1 text-forge-text-subtle">↓</div>
              <div className="rounded-lg border border-forge-border/70 bg-forge-surface/60 px-4 py-2 text-forge-text-muted">
                branding-mcp
              </div>
              <div className="py-1 text-forge-text-subtle">↓</div>
              <div className="rounded-lg border border-forge-border/70 bg-forge-surface/60 px-4 py-2 text-foreground">
                Your Output
              </div>
            </div>
            <div className="pt-[2.75rem] text-forge-text-subtle">→</div>
            <div className="flex flex-col items-center gap-0">
              <div className="rounded-lg border border-forge-primary/40 bg-forge-primary/10 px-4 py-2 text-forge-primary">
                siza-gen
              </div>
              <div className="py-1 text-forge-text-subtle">↓</div>
              <div className="rounded-lg border border-forge-border/70 bg-forge-surface/60 px-4 py-2 text-forge-text-muted">
                forge-ai-action
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function GroupHeader({ title }: { title: string }) {
  return (
    <div className="relative mb-6 flex items-center gap-4">
      <div className="flex-1 border-t border-forge-border/60" />
      <span className="shrink-0 text-[10px] font-mono uppercase tracking-[0.18em] text-forge-text-subtle">
        {title}
      </span>
      <div className="flex-1 border-t border-forge-border/60" />
    </div>
  );
}

function ReleaseBadge({ tag }: { tag: string | null }) {
  if (tag) {
    return (
      <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-mono text-emerald-400">
        Released
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-forge-surface px-2 py-0.5 text-[10px] font-mono text-forge-text-subtle">
      Pre-release
    </span>
  );
}

function RepoCard({ repo }: { repo: EcosystemRepo }) {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      data-fs-cta-event={
        repo.url.includes("github.com") ? FORGE_CTA_EVENTS.GITHUB : undefined
      }
      data-fs-cta-target={repo.url.includes("github.com") ? "github" : undefined}
      data-fs-cta-location={`ecosystem_repo_${repo.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")}`}
      className="group relative overflow-hidden rounded-xl border border-forge-border bg-forge-surface/40 transition-all duration-200 hover:border-forge-primary/40 hover:shadow-[var(--forge-glow-primary-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forge-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--forge-bg)]"
    >
      {/* Top gradient stripe */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-forge-primary/40 to-transparent" />

      <div className="p-6">
        {/* Header row */}
        <div className="mb-3 flex items-center gap-2">
          <Layers className="h-4 w-4 shrink-0 text-forge-primary" />
          <h4 className="font-mono text-base font-semibold text-foreground">
            {repo.name}
          </h4>
          <ReleaseBadge tag={repo.latestReleaseTag} />
          {repo.npm && (
            <span className="ml-auto shrink-0 rounded bg-forge-surface px-1.5 py-0.5 text-[10px] font-mono text-forge-text-subtle">
              {repo.npm}
            </span>
          )}
          <ExternalLink
            className={`h-3 w-3 shrink-0 text-forge-text-subtle opacity-0 transition-opacity group-hover:opacity-100 ${repo.npm ? "" : "ml-auto"}`}
          />
        </div>

        {/* Description */}
        <p className="mb-4 text-sm leading-relaxed text-forge-text-muted">
          {repo.description}
        </p>

        {/* Highlights */}
        <ul className="mb-4 space-y-1">
          {repo.highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex items-start gap-2 text-xs text-forge-text-subtle"
            >
              <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-forge-primary/50" />
              {highlight}
            </li>
          ))}
        </ul>

        {/* Bottom metadata */}
        <div className="flex flex-wrap gap-2 text-[10px] font-mono text-forge-text-subtle">
          <span className="inline-flex items-center gap-1 rounded bg-forge-surface px-2 py-1">
            <Tag className="h-3 w-3" />
            <span className={repo.latestReleaseTag ? "text-forge-primary/80" : ""}>
              {repo.latestReleaseTag ?? "No tagged release"}
            </span>
          </span>
          <span className="inline-flex items-center gap-1 rounded bg-forge-surface px-2 py-1">
            <CalendarClock className="h-3 w-3" />
            Updated {repo.updatedAtLabel}
          </span>
        </div>
      </div>
    </a>
  );
}

export default function EcosystemPage({ snapshot }: EcosystemPageProps) {
  const groups = buildGroups(snapshot.repos);

  return (
    <main
      id="main-content"
      className="min-h-screen bg-background font-sans text-foreground"
    >
      <Section
        variant="gradient"
        label="Ecosystem"
        title={`${snapshot.repoCount} repos. One platform.`}
        subtitle="Live GitHub metadata synced every 6 hours with resilient fallback snapshots."
      >
        {/* Stat Pills */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          <span className="inline-flex items-center rounded-full border border-forge-border bg-forge-surface/60 px-4 py-1.5 text-sm text-forge-text-muted">
            {snapshot.repoCount} Repositories
          </span>
          <span className="inline-flex items-center rounded-full border border-forge-border bg-forge-surface/60 px-4 py-1.5 text-sm text-forge-text-muted">
            {snapshot.releasedRepoCount} Tagged Releases
          </span>
          <span className="inline-flex items-center rounded-full border border-forge-border bg-forge-surface/60 px-4 py-1.5 text-sm text-forge-text-muted">
            Last synced: {snapshot.lastSyncedAtLabel}
          </span>
        </div>

        {/* Architecture Overview */}
        <ArchitectureOverview />

        {/* Repo Groups */}
        <div className="space-y-14">
          {groups.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                ease: EASE_SIZA,
                delay: groupIndex * 0.1,
              }}
            >
              <GroupHeader title={group.title} />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {group.repos.map((repo) => (
                  <RepoCard key={repo.name} repo={repo} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
      <CTASection />
    </main>
  );
}
