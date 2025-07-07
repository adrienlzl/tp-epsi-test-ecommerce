// __tests__/client-wrapper.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import ClientWrapper from '@/app/client-wrapper';
import { usePathname } from 'next/navigation';

// 🔌 Mock usePathname
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

// 🔌 Mock Header (sinon test dépend trop de son contenu réel)
jest.mock('@/components/layout/header', () => ({
  Header: () => <div data-testid="header">Mock Header</div>,
}));

describe('ClientWrapper', () => {
  const mockUsePathname = usePathname as jest.Mock;

  const ChildComponent = () => <div>Contenu enfant</div>;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('rend le Header quand le pathname ne commence pas par /api-doc', () => {
    mockUsePathname.mockReturnValue('/home');

    render(
      <ClientWrapper>
        <ChildComponent />
      </ClientWrapper>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByText('Contenu enfant')).toBeInTheDocument();
  });

  it('ne rend pas le Header quand le pathname commence par /api-doc', () => {
    mockUsePathname.mockReturnValue('/api-doc');

    render(
      <ClientWrapper>
        <ChildComponent />
      </ClientWrapper>
    );

    expect(screen.queryByTestId('header')).not.toBeInTheDocument();
    expect(screen.getByText('Contenu enfant')).toBeInTheDocument();
  });
});
