/** @type {import('@lhci/cli').LighthouseRcConfig} */
module.exports = {
  ci: {
    collect: {
      // Run against built Next.js server
      startServerCommand: 'npm run start',
      startServerReadyPattern: 'Ready in',
      startServerReadyTimeout: 30000,
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/features',
        'http://localhost:3000/pricing',
        'http://localhost:3000/startups',
        'http://localhost:3000/ecosystem',
        'http://localhost:3000/roadmap',
        'http://localhost:3000/enterprise',
      ],
      numberOfRuns: 1,
      settings: {
        // Chrome flags for CI environment
        chromeFlags: '--no-sandbox --headless --disable-gpu',
        // Skip throttling in CI for consistency
        throttlingMethod: 'simulate',
        // Desktop form factor for consistency
        formFactor: 'desktop',
        screenEmulation: {
          mobile: false,
          width: 1350,
          height: 940,
          deviceScaleFactor: 1,
          disabled: false,
        },
      },
    },
    assert: {
      preset: 'lighthouse:no-pwa',
      assertions: {
        // Performance: warn on score drops (informational, not blocking)
        'categories:performance': ['warn', { minScore: 0.7 }],
        // Accessibility: block on failures (we fixed a11y issues)
        'categories:accessibility': ['error', { minScore: 0.9 }],
        // Best Practices: warn
        'categories:best-practices': ['warn', { minScore: 0.8 }],
        // SEO: block on failures
        'categories:seo': ['error', { minScore: 0.9 }],

        // Core Web Vitals (informational in CI, not blocking)
        'first-contentful-paint': ['warn', { maxNumericValue: 3000 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 4000 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['warn', { maxNumericValue: 500 }],

        // Specific audits to enforce
        'color-contrast': 'warn',
        'image-alt': 'error',
        'link-name': 'error',
        'button-name': 'error',
        'document-title': 'error',
        'html-has-lang': 'error',
        'meta-description': 'error',
        'heading-order': 'warn',
        'link-in-text-block': 'warn',

        // Environment-sensitive audits: keep visible but non-blocking in CI
        'errors-in-console': 'warn',
        'inspector-issues': 'warn',
        'third-party-cookies': 'warn',
        'unused-javascript': 'warn',
        'uses-rel-preconnect': 'warn',

        // Avoid false-negative failures when audits do not return values
        'lcp-lazy-loaded': 'off',
        'non-composited-animations': 'off',
        'prioritize-lcp-image': 'off',

        'canonical': 'warn',

        // Suppress audits not relevant to this stack
        'uses-http2': 'off',
        'uses-long-cache-ttl': 'off',
        'render-blocking-resources': 'off',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
