import './globals.css';
import type { Metadata } from 'next';
import { Nanum_Gothic } from 'next/font/google';
import AuthContext from '@/context/AuthContext';
import dynamic from 'next/dynamic';
import Lnb from '@/components/Lnb';

export const metadata: Metadata = {
    title: {
        default: 'Baby Memory',
        template: '%s | Baby Memory'
    },
    description: 'Memory Board'
};

const gothic = Nanum_Gothic({ weight: '700', subsets: ['latin'] });

const NavbarComponent = dynamic(() => import('@/components/Navbar'), {
    ssr: false
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={gothic.className}>
            <body className="flex flex-col w-full mx-auto">
                <AuthContext>
                    <header className="sticky top-0 bg-white z-10 border-b">
                        <div className="max-w-screen-xl mx-auto">
                            <NavbarComponent />
                        </div>
                    </header>
                    <main className="w-full flex justify-center max-w-screen-xl mx-auto">
                        {children}
                    </main>
                </AuthContext>
                <div id="portal" />
            </body>
        </html>
    );
}
