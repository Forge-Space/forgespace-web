import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Nav } from '@/components/layout/Nav';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe('Nav', () => {
  it('renders the brand name', () => {
    render(<Nav />);
    expect(screen.getByText('FORGE SPACE')).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    render(<Nav />);
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Ecosystem')).toBeInTheDocument();
    expect(screen.getByText('How It Works')).toBeInTheDocument();
    expect(screen.getByText('Docs')).toBeInTheDocument();
    expect(screen.getByText('Enterprise')).toBeInTheDocument();
  });

  it('renders CTA buttons', () => {
    render(<Nav />);
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByText('Get started')).toBeInTheDocument();
  });

  it('links to correct internal routes', () => {
    render(<Nav />);
    expect(screen.getByText('Features').closest('a')).toHaveAttribute('href', '/features');
    expect(screen.getByText('Ecosystem').closest('a')).toHaveAttribute('href', '/ecosystem');
    expect(screen.getByText('How It Works').closest('a')).toHaveAttribute('href', '/how-it-works');
  });

  it('external links have security attributes', () => {
    render(<Nav />);
    const signIn = screen.getByText('Sign in').closest('a');
    expect(signIn).toHaveAttribute('target', '_blank');
    expect(signIn).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('brand links to home', () => {
    render(<Nav />);
    expect(screen.getByText('FORGE SPACE').closest('a')).toHaveAttribute('href', '/');
  });
});
