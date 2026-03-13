import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EcosystemCard } from '@/components/shared/EcosystemCard';
import { Zap } from 'lucide-react';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => {
      const rest = { ...(props as Record<string, unknown>) };
      delete rest.whileHover;
      delete rest.whileTap;
      delete rest.transition;
      return <div {...rest}>{children}</div>;
    },
  },
  useReducedMotion: () => false,
}));

describe('EcosystemCard', () => {
  const defaultProps = {
    icon: Zap,
    title: 'Test Card',
    description: 'A test description',
  };

  it('renders title and description', () => {
    render(<EcosystemCard {...defaultProps} />);
    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.getByText('A test description')).toBeInTheDocument();
  });

  it('renders as static card without href', () => {
    const { container } = render(<EcosystemCard {...defaultProps} />);
    expect(container.querySelector('a')).toBeNull();
  });

  it('renders internal link with href', () => {
    render(<EcosystemCard {...defaultProps} href="/features" />);
    const link = screen.getByText('Test Card').closest('a');
    expect(link).toHaveAttribute('href', '/features');
    expect(link).not.toHaveAttribute('target');
  });

  it('renders external link with security attributes', () => {
    render(<EcosystemCard {...defaultProps} href="https://example.com" external />);
    const link = screen.getByText('Test Card').closest('a');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(link).toHaveAttribute('href', 'https://example.com');
  });
});
