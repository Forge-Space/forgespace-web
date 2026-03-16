import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

export type OGTemplateProps = {
  title: string;
  subtitle: string;
  badge?: string;
};

export function ogTemplate({ title, subtitle, badge }: OGTemplateProps) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "64px 72px",
          background: "#121214",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background radial glow */}
        <div
          style={{
            position: "absolute",
            top: "-200px",
            left: "-100px",
            width: "800px",
            height: "800px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)",
          }}
        />

        {/* Grid dots pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(124,58,237,0.15) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            opacity: 0.4,
          }}
        />

        {/* Top border accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background:
              "linear-gradient(90deg, transparent, #7c3aed, transparent)",
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            position: "absolute",
            top: "48px",
            left: "72px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "3px",
            }}
          >
            <div
              style={{
                width: "20px",
                height: "6px",
                background: "#7c3aed",
                borderRadius: "2px",
              }}
            />
            <div
              style={{
                width: "14px",
                height: "6px",
                background: "#7c3aed",
                borderRadius: "2px",
                opacity: 0.6,
              }}
            />
            <div
              style={{
                width: "17px",
                height: "6px",
                background: "#7c3aed",
                borderRadius: "2px",
                opacity: 0.35,
              }}
            />
          </div>
          <span
            style={{
              color: "#e8e8ec",
              fontSize: "18px",
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
          >
            Forge Space
          </span>
        </div>

        {/* Badge */}
        {badge && (
          <div
            style={{
              display: "flex",
              marginBottom: "20px",
              padding: "6px 14px",
              background: "rgba(124,58,237,0.15)",
              border: "1px solid rgba(124,58,237,0.3)",
              borderRadius: "100px",
              color: "#a78bfa",
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            {badge}
          </div>
        )}

        {/* Title */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: "20px",
            background: "linear-gradient(135deg, #e8e8ec 0%, #a78bfa 100%)",
            backgroundClip: "text",
            color: "transparent",
            maxWidth: "900px",
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "22px",
            color: "#9494a0",
            lineHeight: 1.5,
            maxWidth: "700px",
            marginBottom: "48px",
          }}
        >
          {subtitle}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <span
            style={{
              fontSize: "14px",
              color: "#5a5a68",
              fontFamily: "monospace",
              letterSpacing: "0.05em",
            }}
          >
            forgespace.co
          </span>
          <span style={{ color: "#333338", fontSize: "14px" }}>·</span>
          <span
            style={{
              fontSize: "14px",
              color: "#5a5a68",
              fontFamily: "monospace",
              letterSpacing: "0.05em",
            }}
          >
            MIT Licensed
          </span>
          <span style={{ color: "#333338", fontSize: "14px" }}>·</span>
          <span
            style={{
              fontSize: "14px",
              color: "#5a5a68",
              fontFamily: "monospace",
              letterSpacing: "0.05em",
            }}
          >
            Open Source
          </span>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
    }
  );
}
