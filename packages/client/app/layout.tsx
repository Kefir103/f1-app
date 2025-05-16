import React from 'react';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

import Providers from '~next/app/providers';

import { AppHeader } from '~app/layout/header';

import '~next/app/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'F1 App',
    description: 'F1 Next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang={'en'} suppressHydrationWarning>
            <body className={`${inter.className}`}>
                <NextThemesProvider
                    attribute={'class'}
                    defaultTheme={'system'}
                    enableSystem
                    disableTransitionOnChange
                >
                    <Providers>
                        <AppHeader />
                        <section className={'mt-16'}>{children}</section>
                    </Providers>
                </NextThemesProvider>
            </body>
        </html>
    );
}
