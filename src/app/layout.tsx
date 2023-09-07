import './globals.css';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'Memory App',
    description: 'Memory Web App',
    icons: {
        icon: '/favicon.ico',
    },
};

const sans = Open_Sans({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={sans.className}>
            <body className="flex flex-col w-full mx-auto">
                <Header />
                <main className="grow">{children}</main>
                {/* <Footer /> */}
            </body>
        </html>
        /* <html lang="en">}
            <body className={inter.className}>
                <Header />
                <main className={`${layout.body}`}>{children}</main>
                {/!* <Footer /> *!/}
            </body>
        </html> */
    );
}
