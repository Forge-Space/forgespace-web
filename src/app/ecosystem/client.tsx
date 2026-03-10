"use client";

import { motion } from "motion/react";
import { Layers, ExternalLink, CalendarClock, Tag } from "lucide-react";
import { EASE_SIZA } from "@/lib/constants";
import {
  type EcosystemSnapshot,
  type EcosystemRepo,
  type RepoGroup,
} from "@/lib/ecosystem-data";
import { Section } from "@/components/ui/Section";

interface EcosystemPageProps {
  snapshot: EcosystemSnapshot;
}

const GROUP_ORDER: RepoGroup[] = [
  "Generation Engine",
  "Governance & Quality",
  "Design & Brand",
];

function formatDate(iso: string | null): string {
  if (!iso) return "No release";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(iso));
}

function buildGroups(repos: EcosystemRepo[]): Array<{ title: RepoGroup; repos: EcosystemRepo[] }> {
  return GROUP_ORDER.map((title) => ({
    title,
    repos: repos.filter((repo) => repo.group === title),
  })).filter((group) => group.repos.length > 0);
}

export default function EcosystemPage({ snapshot }: EcosystemPageProps) {
  const groups = buildGroups(snapshot.repos);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Section
        variant="gradient"
        label="Ecosystem"
        title={`${snapshot.repoCount} repos. One platform.`}
        subtitle="Live GitHub metadata synced every 6 hours with resilient fallback snapshots."
      >
        <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-forge-border bg-forge-surface/40 p-4">
            <p className="text-xs font-mono uppercase tracking-[0.15em] text-forge-text-subtle">
              Product Repos
            </p>
            <p className="mt-2 text-2xl font-display font-bold text-foreground">
              {snapshot.repoCount}
            </p>
          </div>
          <div className="rounded-lg border border-forge-border bg-forge-surface/40 p-4">
            <p className="text-xs font-mono uppercase tracking-[0.15em] text-forge-text-subtle">
              Tagged Releases
            </p>
            <p className="mt-2 text-2xl font-display font-bold text-foreground">
              {snapshot.releasedRepoCount}
            </p>
          </div>
          <div className="rounded-lg border border-forge-border bg-forge-surface/40 p-4">
            <p className="text-xs font-mono uppercase tracking-[0.15em] text-forge-text-subtle">
              Last Synced
            </p>
            <p className="mt-2 text-sm font-medium text-forge-text-muted">
              {formatDate(snapshot.lastSyncedAt)}
            </p>
          </div>
        </div>

        <div className="space-y-12">
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
              <h3 className="mb-4 text-xs font-mono uppercase tracking-[0.15em] text-forge-text-subtle">
                {group.title}
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {group.repos.map((repo) => (
                  <a
                    key={repo.name}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-xl border border-forge-border bg-forge-surface/40 p-6 transition-all duration-200 hover:border-forge-primary/40 hover:shadow-[var(--forge-glow-primary-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forge-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--forge-bg)]"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <Layers className="h-4 w-4 text-forge-primary" />
                      <h4 className="font-mono text-sm font-semibold text-foreground">
                        {repo.name}
                      </h4>
                      {repo.npm && (
                        <span className="rounded bg-forge-surface px-1.5 py-0.5 text-[10px] font-mono text-forge-text-subtle">
                          {repo.npm}
                        </span>
                      )}
                      <ExternalLink className="ml-auto h-3 w-3 text-forge-text-subtle opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>

                    <p className="mb-3 text-sm leading-relaxed text-forge-text-muted">
                      {repo.description}
                    </p>

                    <div className="mb-3 flex flex-wrap gap-2 text-[10px] font-mono text-forge-text-subtle">
                      <span className="inline-flex items-center gap-1 rounded bg-forge-surface px-2 py-1">
                        <Tag className="h-3 w-3" />
                        {repo.latestReleaseTag ?? "No tagged release"}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded bg-forge-surface px-2 py-1">
                        <CalendarClock className="h-3 w-3" />
                        Updated {formatDate(repo.updatedAt)}
                      </span>
                    </div>

                    <ul className="space-y-1">
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
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
}
