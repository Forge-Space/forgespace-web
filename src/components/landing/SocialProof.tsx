import { type EcosystemSnapshot } from "@/lib/ecosystem-data";

interface SocialProofProps {
  snapshot: EcosystemSnapshot;
}

export function SocialProof({ snapshot }: SocialProofProps) {
  const stats = [
    { value: String(snapshot.repoCount), label: "Product Repos" },
    { value: String(snapshot.releasedRepoCount), label: "Repos With Releases" },
    { value: String(snapshot.stats.updatedLast30d), label: "Updated in 30 Days" },
    { value: "MIT", label: "Open Source License" },
  ];

  return (
    <section className="border-y border-forge-border bg-forge-bg-elevated py-16">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="mb-1 font-display text-3xl font-bold text-foreground sm:text-4xl">
                {stat.value}
              </p>
              <p className="text-sm text-forge-text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
