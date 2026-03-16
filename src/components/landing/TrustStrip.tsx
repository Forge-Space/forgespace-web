"use client"

import { Github, Code2, Box, Database, Globe, Server, Cpu, Sparkles } from "lucide-react"

const items = [
  { name: "GitHub", icon: <Github size={14} /> },
  { name: "Next.js", icon: <Globe size={14} /> },
  { name: "TypeScript", icon: <Code2 size={14} /> },
  { name: "Tailwind CSS", icon: <Sparkles size={14} /> },
  { name: "Vercel", icon: <Server size={14} /> },
  { name: "Docker", icon: <Box size={14} /> },
  { name: "Supabase", icon: <Database size={14} /> },
  { name: "Anthropic Claude", icon: <Cpu size={14} /> },
  { name: "OpenAI", icon: <Sparkles size={14} /> },
  { name: "Google Gemini", icon: <Cpu size={14} /> },
  { name: "Node.js", icon: <Server size={14} /> },
  { name: "React", icon: <Code2 size={14} /> },
]

const doubled = [...items, ...items]

export function TrustStrip() {
  return (
    <section className="py-10 border-y border-forge-border overflow-hidden bg-forge-bg-elevated">
      <style>{`
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .animate-marquee { animation: marquee 35s linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }
      `}</style>

      <p className="text-center text-xs font-mono uppercase tracking-[0.2em] text-forge-text-subtle mb-6">
        Open source ecosystem
      </p>

      <div
        className="relative overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="flex animate-marquee" style={{ width: "max-content" }}>
          {doubled.map((item, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-forge-border bg-forge-surface text-sm text-forge-text-muted whitespace-nowrap mx-2"
            >
              {item.icon}
              {item.name}
            </span>
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-forge-text-subtle mt-6">
        MIT Licensed · Works with any Git provider · No vendor lock-in
      </p>
    </section>
  )
}
