"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: '"DM Sans", system-ui, sans-serif',
          margin: 0,
          minHeight: "100vh",
          backgroundColor: "#0a0a0f",
          color: "#e4e4e7",
        }}
      >
        <div
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <h2
            style={{
              fontFamily: '"Sora", system-ui, sans-serif',
              fontSize: "1.25rem",
              marginBottom: "1rem",
            }}
          >
            Something went wrong
          </h2>
          <button
            onClick={() => reset()}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#8b5cf6",
              color: "white",
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer",
              fontFamily: '"DM Sans", system-ui, sans-serif',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
