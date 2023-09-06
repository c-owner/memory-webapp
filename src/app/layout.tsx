import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import LoginButton from '@/components/Login';
import RegisterButton from '@/components/Register';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import layout from './layout.module.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Memory App',
    description: 'Memory Web App',
    icons: {
        icon: '/favicon.ico',
    },
};

const gothic = Inter({ weight: '700', subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Header />
                <main className={`${layout.body}`}>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
