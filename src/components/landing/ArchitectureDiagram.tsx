"use client";

import { motion } from "motion/react";
import { EASE_SIZA } from "@/lib/constants";

interface ArchitectureDiagramProps {
  repoCount: number;
  releasedRepoCount: number;
}

export function ArchitectureDiagram({ repoCount, releasedRepoCount }: ArchitectureDiagramProps) {
  const nodeY = 120;
  const nodeW = 130;
  const nodeH = 56;
  const half = nodeW / 2;
  const halfH = nodeH / 2;

  const nodes = [
    { cx: 80, label: "Your Codebase", sub: "source", variant: "default" as const },
    { cx: 240, label: "siza scan", sub: "analysis", variant: "violet" as const },
    { cx: 400, label: "JSON Manifest", sub: "output", variant: "default" as const },
    { cx: 560, label: "AI Governance", sub: "policy", variant: "violet" as const },
    { cx: 720, label: "Catalog + CI", sub: "delivery", variant: "success" as const },
  ];

  const fills: Record<string, string> = {
    default: "#222226",
    violet: "#3b1f6e",
    success: "#0d2918",
  };
  const strokes: Record<string, string> = {
    default: "#333338",
    violet: "#7c3aed",
    success: "#059669",
  };

  const arrowColor = (toVariant: string) =>
    toVariant === "violet" ? "#7c3aed" : "#4a4a52";

  const outputY = nodeY + 100;
  const leftOutputCx = 660;
  const rightOutputCx = 780;

  return (
    <section className="py-20 md:py-28 bg-forge-bg-elevated border-y border-forge-border">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE_SIZA }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-xs font-mono uppercase tracking-[0.2em] text-forge-primary">
            Architecture
          </p>
          <h2 className="mb-4 text-3xl font-display font-bold tracking-tight text-foreground sm:text-4xl">
            How Forge Space works
          </h2>
          <p className="text-lg leading-relaxed text-forge-text-muted">
            One scan. A living catalog. Governance built into every step.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_SIZA }}
          className="overflow-x-auto"
        >
          <svg
            viewBox="0 0 900 320"
            width="100%"
            preserveAspectRatio="xMidYMid meet"
            aria-label="Forge Space architecture flow diagram"
          >
            <defs>
              {/* Default arrowhead */}
              <marker
                id="arrow-default"
                markerWidth="8"
                markerHeight="8"
                refX="6"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#4a4a52" />
              </marker>
              {/* Violet arrowhead */}
              <marker
                id="arrow-violet"
                markerWidth="8"
                markerHeight="8"
                refX="6"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#7c3aed" />
              </marker>
              {/* Output arrowhead */}
              <marker
                id="arrow-output"
                markerWidth="8"
                markerHeight="8"
                refX="6"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#4a4a52" />
              </marker>
            </defs>

            {/* Arrows between main nodes */}
            {nodes.slice(0, -1).map((node, i) => {
              const next = nodes[i + 1];
              const x1 = node.cx + half;
              const x2 = next.cx - half;
              const color = arrowColor(next.variant);
              const markerId = next.variant === "violet" ? "arrow-violet" : "arrow-default";
              return (
                <line
                  key={`arrow-${i}`}
                  x1={x1}
                  y1={nodeY}
                  x2={x2 - 4}
                  y2={nodeY}
                  stroke={color}
                  strokeWidth="1.5"
                  markerEnd={`url(#${markerId})`}
                />
              );
            })}

            {/* Folder icon path for node 0 */}
            <g transform={`translate(${nodes[0].cx - 10}, ${nodeY - 22})`} opacity="0.7">
              <path
                d="M0 3 Q0 1 2 1 L5 1 L7 3 L14 3 Q16 3 16 5 L16 13 Q16 15 14 15 L2 15 Q0 15 0 13 Z"
                fill="#a1a1aa"
              />
            </g>

            {/* Main nodes */}
            {nodes.map((node) => (
              <g key={node.cx}>
                <rect
                  x={node.cx - half}
                  y={nodeY - halfH}
                  width={nodeW}
                  height={nodeH}
                  rx="10"
                  fill={fills[node.variant]}
                  stroke={strokes[node.variant]}
                  strokeWidth="1.5"
                />
                <text
                  x={node.cx}
                  y={nodeY - 6}
                  textAnchor="middle"
                  fill="#fafafa"
                  fontSize="12"
                  fontFamily="monospace"
                  fontWeight="600"
                >
                  {node.label}
                </text>
                <text
                  x={node.cx}
                  y={nodeY + 10}
                  textAnchor="middle"
                  fill="#a1a1aa"
                  fontSize="10"
                  fontFamily="monospace"
                >
                  {node.sub}
                </text>
              </g>
            ))}

            {/* Vertical arrow from node5 down-left to catalog */}
            <line
              x1={nodes[4].cx - 30}
              y1={nodeY + halfH}
              x2={leftOutputCx}
              y2={outputY - 18}
              stroke="#4a4a52"
              strokeWidth="1.5"
              markerEnd="url(#arrow-output)"
            />

            {/* Vertical arrow from node5 down-right to ci */}
            <line
              x1={nodes[4].cx + 10}
              y1={nodeY + halfH}
              x2={rightOutputCx}
              y2={outputY - 18}
              stroke="#4a4a52"
              strokeWidth="1.5"
              markerEnd="url(#arrow-output)"
            />

            {/* Output node: catalog */}
            <g>
              <rect
                x={leftOutputCx - 70}
                y={outputY - 18}
                width={140}
                height={46}
                rx="8"
                fill="#1a1025"
                stroke="#7c3aed"
                strokeWidth="1"
                strokeDasharray="4 2"
              />
              <text
                x={leftOutputCx}
                y={outputY + 3}
                textAnchor="middle"
                fill="#fafafa"
                fontSize="11"
                fontFamily="monospace"
                fontWeight="600"
              >
                siza.forgespace.co
              </text>
              <text
                x={leftOutputCx}
                y={outputY + 17}
                textAnchor="middle"
                fill="#a1a1aa"
                fontSize="9"
                fontFamily="monospace"
              >
                catalog
              </text>
            </g>

            {/* Output node: CI gate */}
            <g>
              <rect
                x={rightOutputCx - 60}
                y={outputY - 18}
                width={120}
                height={46}
                rx="8"
                fill="#0d1a0d"
                stroke="#059669"
                strokeWidth="1"
                strokeDasharray="4 2"
              />
              <text
                x={rightOutputCx}
                y={outputY + 3}
                textAnchor="middle"
                fill="#fafafa"
                fontSize="11"
                fontFamily="monospace"
                fontWeight="600"
              >
                GitHub Actions
              </text>
              <text
                x={rightOutputCx}
                y={outputY + 17}
                textAnchor="middle"
                fill="#a1a1aa"
                fontSize="9"
                fontFamily="monospace"
              >
                CI gate
              </text>
            </g>
          </svg>
        </motion.div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-forge-border bg-forge-surface text-sm text-forge-text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-forge-primary" />
            {repoCount} Repos Scanned
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-forge-border bg-forge-surface text-sm text-forge-text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {releasedRepoCount} Published Releases
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-forge-border bg-forge-surface text-sm text-forge-text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
            MIT Licensed
          </span>
        </div>
      </div>
    </section>
  );
}
