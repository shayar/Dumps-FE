import { render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import BreadCrumb from '@dumps/components/breadCrumb';

// Mock dependencies
vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock('@dumps/components/layouts/Layout', () => ({
  getSidebarState: () => ({
    showSidebar: false,
    setShowSidebar: vi.fn(),
  }),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom'); // Retain actual exports

  return {
    ...actual, // Spread the actual exports
    useNavigate: vi.fn(), // Mock useNavigate if necessary
  };
});

describe('BreadCrumb', () => {
  const items = [
    { name: 'Item 1', route: '/item1' },
    { name: 'Item 2', route: '/item2' },
  ];

  it('renders breadcrumb items and title correctly', () => {
    render(
      <MemoryRouter>
        <BreadCrumb items={items} />
      </MemoryRouter>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });
});
