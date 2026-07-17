import { render, screen } from '@testing-library/react';
import { Badge } from '@/components/ui/badge';

describe('Badge', () => {
  it('renders with default variant', () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  it('renders with gold variant', () => {
    render(<Badge variant="gold">Gold Badge</Badge>);
    const badge = screen.getByText('Gold Badge');
    expect(badge).toBeInTheDocument();
    expect(badge.className).toContain('champion-gold');
  });

  it('renders with success variant', () => {
    render(<Badge variant="success">Success</Badge>);
    expect(screen.getByText('Success')).toBeInTheDocument();
  });
});
