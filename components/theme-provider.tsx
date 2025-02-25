// components/theme-provider.tsx
'use client';

import { useEffect, useState } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Cleanup de elementos de extensões
    const cleanup = () => {
      document.getElementById('extwaiokist')?.remove();
    };
    
    setMounted(true);
    cleanup();
    
    return () => cleanup();
  }, []);

  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
      storageKey="carepulse-theme"
    >
      {children}
    </NextThemesProvider>
  );
}