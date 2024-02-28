import React from 'react';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

import Providers from '~app/providers';

import { NavigationHeader } from '~widgets/navigation/header/ui/NavigationHeader';

import '~app/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'F1 App',
    description: 'F1 Next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={'dark'}>
            <body className={`${inter.className} bg-white p-4 dark:bg-slate-950`}>
                <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                    <Providers>
                        <NavigationHeader />
                        <section className={'mt-20'}>{children}</section>
                    </Providers>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
