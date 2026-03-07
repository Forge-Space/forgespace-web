import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PageSection } from '@/components/layout/PageSection';

describe('PageSection', () => {
  it('renders title and children', () => {
    render(
      <PageSection title="Test Title">
        <p>Content</p>
      </PageSection>
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders optional label', () => {
    render(
      <PageSection label="Section Label" title="Title">
        <p>Content</p>
      </PageSection>
    );
    expect(screen.getByText('Section Label')).toBeInTheDocument();
  });

  it('renders optional subtitle', () => {
    render(
      <PageSection title="Title" subtitle="A subtitle">
        <p>Content</p>
      </PageSection>
    );
    expect(screen.getByText('A subtitle')).toBeInTheDocument();
  });

  it('omits label and subtitle when not provided', () => {
    const { container } = render(
      <PageSection title="Title Only">
        <p>Content</p>
      </PageSection>
    );
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs).toHaveLength(1);
  });

  it('applies custom className', () => {
    const { container } = render(
      <PageSection title="Title" className="custom-class">
        <p>Content</p>
      </PageSection>
    );
    expect(container.querySelector('section')).toHaveClass('custom-class');
  });
});
