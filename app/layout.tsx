// app/layout.tsx
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import '../lib/css/specificClasses.css';
import {Providers} from "@/components/layout/providers";
import ClientWrapper from './client-wrapper';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Votre Boutique',
    description: 'Mon super e-shop',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="fr">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Providers>
                    <ClientWrapper>{children}</ClientWrapper>
                </Providers>
            </body>
        </html>
    )
}
