import { describe, it, expect } from 'vitest';
import { forgeTokens } from '@/styles/design-tokens';
import { EASE_SIZA } from '@/lib/constants';

describe('Design Tokens', () => {
  it('should have all required token properties', () => {
    expect(forgeTokens).toHaveProperty('bg');
    expect(forgeTokens).toHaveProperty('text');
    expect(forgeTokens).toHaveProperty('textMuted');
    expect(forgeTokens).toHaveProperty('primary');
    expect(forgeTokens).toHaveProperty('primaryHover');
    expect(forgeTokens).toHaveProperty('radiusMd');
  });

  it('should use valid hex colors', () => {
    const hexRegex = /^#[0-9A-Fa-f]{6}$/;
    expect(forgeTokens.bg).toMatch(hexRegex);
    expect(forgeTokens.text).toMatch(hexRegex);
    expect(forgeTokens.textMuted).toMatch(hexRegex);
    expect(forgeTokens.primary).toMatch(hexRegex);
    expect(forgeTokens.primaryHover).toMatch(hexRegex);
  });

  it('should use brand purple as primary', () => {
    expect(forgeTokens.primary).toBe('#8B5CF6');
  });

  it('should have dark background', () => {
    expect(forgeTokens.bg).toBe('#121214');
  });
});

describe('Animation Constants', () => {
  it('should define cubic bezier easing with 4 values', () => {
    expect(EASE_SIZA).toHaveLength(4);
    EASE_SIZA.forEach((v) => {
      expect(typeof v).toBe('number');
    });
  });
});
