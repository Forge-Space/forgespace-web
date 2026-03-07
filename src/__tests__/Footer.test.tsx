import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/layout/Footer';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe('Footer', () => {
  it('renders footer links', () => {
    render(<Footer />);
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('Siza')).toBeInTheDocument();
    expect(screen.getByText('Docs')).toBeInTheDocument();
    expect(screen.getByText('Ecosystem')).toBeInTheDocument();
    expect(screen.getByText('Governance')).toBeInTheDocument();
  });

  it('displays copyright with current year', () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(`© ${year} Forge Space.`)).toBeInTheDocument();
  });

  it('external links open in new tab', () => {
    render(<Footer />);
    const github = screen.getByText('GitHub').closest('a');
    expect(github).toHaveAttribute('target', '_blank');
    expect(github).toHaveAttribute('rel', 'noopener noreferrer');
    expect(github).toHaveAttribute('href', 'https://github.com/Forge-Space');
  });

  it('internal links point to correct routes', () => {
    render(<Footer />);
    expect(screen.getByText('Docs').closest('a')).toHaveAttribute('href', '/protocol');
    expect(screen.getByText('Ecosystem').closest('a')).toHaveAttribute('href', '/ecosystem');
    expect(screen.getByText('Governance').closest('a')).toHaveAttribute('href', '/governance');
  });
});
