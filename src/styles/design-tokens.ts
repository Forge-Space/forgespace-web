/**
 * Raw design token values for contexts where CSS variables are unavailable
 * (e.g. global-error.tsx). Keep in sync with globals.css.
 */
export const forgeTokens = {
  bg: '#121214',
  text: '#fafafa',
  textMuted: '#a1a1aa',
  primary: '#8B5CF6',
  primaryHover: '#A78BFA',
  radiusMd: '10px',
  gradientButton: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
  gradientCard: 'linear-gradient(180deg, rgba(139, 92, 246, 0.12) 0%, rgba(34, 34, 38, 0.85) 100%)',
  shadowSm: '0 4px 14px rgba(139, 92, 246, 0.2)',
  shadowMd: '0 10px 30px rgba(139, 92, 246, 0.28)',
  shadowLg: '0 18px 44px rgba(139, 92, 246, 0.36)',
} as const;
