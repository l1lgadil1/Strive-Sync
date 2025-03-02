import React from 'react';
import { Header } from './header';
import { Footer } from './footer';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: React.ReactNode;
  notCenter?: boolean;
}

export function MainLayout({ children, notCenter = false }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className={cn("flex-1", )}>{children}</main>
      <Footer />
    </div>
  );
} 