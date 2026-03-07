'use client';

import { forgeTokens } from '@/styles/design-tokens';

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
              padding: '0.5rem 1rem',
              backgroundColor: forgeTokens.primary,
              color: 'white',
              border: 'none',
              borderRadius: forgeTokens.radiusMd,
              cursor: 'pointer',
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
