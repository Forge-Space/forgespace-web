"use client"

const items = [
  "GitHub",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Vercel",
  "Docker",
  "Supabase",
  "Anthropic Claude",
  "OpenAI",
  "Google Gemini",
  "Node.js",
  "React",
]

const doubled = [...items, ...items]

export function TrustStrip() {
  return (
    <div className="py-6 border-y border-forge-border overflow-hidden">
      <style>{`
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .animate-marquee { animation: marquee 44s linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .animate-marquee { animation-play-state: paused; } }
      `}</style>

      <div
        className="relative overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div
          className="flex animate-marquee"
          style={{ width: "max-content" }}
          aria-hidden
        >
          {doubled.map((name, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3.5 py-1 rounded-full border border-forge-border bg-forge-surface text-xs text-forge-text-subtle whitespace-nowrap mx-1.5 font-mono tracking-wide"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      <p className="sr-only">
        Open source ecosystem built on: {items.join(", ")}
      </p>
    </div>
  )
}
