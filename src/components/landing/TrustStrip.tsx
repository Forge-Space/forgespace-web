"use client"

import { Github, Code2, Box, Database, Globe, Server, Cpu, Sparkles } from "lucide-react"

const items = [
  { name: "GitHub", icon: <Github size={13} /> },
  { name: "Next.js", icon: <Globe size={13} /> },
  { name: "TypeScript", icon: <Code2 size={13} /> },
  { name: "Tailwind CSS", icon: <Sparkles size={13} /> },
  { name: "Vercel", icon: <Server size={13} /> },
  { name: "Docker", icon: <Box size={13} /> },
  { name: "Supabase", icon: <Database size={13} /> },
  { name: "Anthropic Claude", icon: <Cpu size={13} /> },
  { name: "OpenAI", icon: <Sparkles size={13} /> },
  { name: "Google Gemini", icon: <Cpu size={13} /> },
  { name: "Node.js", icon: <Server size={13} /> },
  { name: "React", icon: <Code2 size={13} /> },
]

const doubled = [...items, ...items]

export function TrustStrip() {
  return (
    <div className="py-8 border-y border-forge-border overflow-hidden bg-forge-bg-elevated">
      <style>{`
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .animate-marquee { animation: marquee 40s linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .animate-marquee { animation-play-state: paused; } }
      `}</style>

      <div
        className="relative overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div
          className="flex animate-marquee"
          style={{ width: "max-content" }}
          aria-hidden
        >
          {doubled.map((item, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-forge-border bg-forge-surface text-xs text-forge-text-muted whitespace-nowrap mx-1.5"
            >
              {item.icon}
              {item.name}
            </span>
          ))}
        </div>
      </div>

      <p className="sr-only">
        Open source ecosystem: {items.map((i) => i.name).join(", ")}
      </p>
    </div>
  )
}
