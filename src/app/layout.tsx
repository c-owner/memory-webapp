import './globals.css';
import type { Metadata } from 'next';
import { Nanum_Gothic } from 'next/font/google';
import AuthContext from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import SWRConfigContext from '@/context/SWRConfigContext';

export const metadata: Metadata = {
    title: {
        default: 'Memory',
        template: '%s | Memory'
    },
    description: 'Memory Board'
};

const gothic = Nanum_Gothic({ weight: '700', subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={gothic.className}>
            <body className={`flex flex-col w-full mx-auto dark:bg-apple-dark-2`}>
                <AuthContext>
                    <header className="sticky top-0 bg-white z-10 border-b shadow-lg dark:border-b-neutral-800  dark:bg-apple-dark-1">
                        <div className="max-w-screen-xl mx-auto dark:text-white">
                            <Navbar />
                        </div>
                    </header>
                    <main className="w-full flex justify-center max-w-screen-xl mx-auto dark:text-white">
                        <SWRConfigContext>{children}</SWRConfigContext>
                    </main>
                </AuthContext>
                <div id="portal" />
            </body>
        </html>
    );
}
