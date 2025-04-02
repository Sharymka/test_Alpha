import React from 'react';
import { ReduxProvider } from '@/store/provider';
import '@/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ReduxProvider >
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}