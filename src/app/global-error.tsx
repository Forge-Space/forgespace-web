'use client';

const forgeTokens = {
  bg: '#0a0a0f',
  text: '#f4f4f5',
  textMuted: '#a1a1aa',
  accent: '#8b5cf6',
  accentHover: '#a78bfa',
};

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <head />
      <body
        style={{
          fontFamily: '"DM Sans", system-ui, sans-serif',
          margin: 0,
          minHeight: '100vh',
        }}
      >
        <div
          style={{
            fontFamily: '"DM Sans", system-ui, sans-serif',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            backgroundColor: forgeTokens.bg,
            color: forgeTokens.text,
          }}
        >
          <h2
            style={{
              fontFamily: '"Sora", system-ui, sans-serif',
              fontSize: '1.25rem',
              marginBottom: '1rem',
            }}
          >
            Something went wrong
          </h2>
          {process.env.NODE_ENV === 'development' && error?.message && (
            <p
              style={{
                fontSize: '0.875rem',
                color: forgeTokens.textMuted,
                marginTop: '0.5rem',
                marginBottom: '1rem',
                maxWidth: '32rem',
                textAlign: 'center',
              }}
            >
              {error.message}
            </p>
          )}
          <button
            onClick={() => reset()}
            style={{
              color: forgeTokens.accent,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
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
