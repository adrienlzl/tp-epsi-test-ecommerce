'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/header';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isSwagger = pathname.startsWith('/api-doc');

  return (
    <>
      {!isSwagger && <Header />}
      {children}
    </>
  );
}
