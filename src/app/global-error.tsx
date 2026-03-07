'use client';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0f] text-white font-sans">
        <div className="flex flex-1 flex-col items-center justify-center min-h-screen px-6">
          <h1 className="text-4xl font-bold mb-2">Something went wrong</h1>
          <p className="text-gray-400 mb-6">An unexpected error occurred.</p>
          <button
            onClick={() => reset()}
            className="text-violet-400 hover:text-violet-300 transition-colors"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
