import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import LoginButton from '@/components/Login'
import RegisterButton from '@/components/Register'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Memory App',
    description: 'Memory Web App',
    icons: {
        icon: '/favicon.ico',
    },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <header className="p-3 flex justify-between items-center">
                    <h1 className="text-indigo-900 dark:text-indigo-300 font-mono text-3xl">Memory</h1>
                    <div className="flex items-center justify-center">
                        <div className="mr-3">
                            <LoginButton />
                        </div>
                        <RegisterButton />
                    </div>
                </header>
                {children}
                <footer className="p-3 flex justify-center items-center">
                    <p className="text-indigo-900 dark:text-indigo-300">Memory</p>
                </footer>
            </body>
        </html>
    )
}
