'use client';

import layout from '@/app/layout.module.css';
import Link from 'next/link';
import { Nanum_Gothic } from 'next/font/google';
import { useState } from 'react';
import Lnb from '@/components/Lnb';

const gothic = Nanum_Gothic({ weight: '700', subsets: ['latin'] });

export default function Header() {
    const [lnb, setLnb] = useState(false);
    const lnbChange = () => {
        setLnb(!lnb);
        console.log(lnb);
    };

    /*  if 768px 이상이면 LNB true 감지  */
    if (window !== undefined) {
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                setLnb(true);
            } else {
                setLnb(false);
            }
        });
    }

    return (
        <>
            <header className={`${layout.header} shadow-2xl w-full p-3 flex justify-between items-center`}>
                <nav className="w-full flex items-center justify-between">
                    <h1 className={`${gothic.className} text-indigo-900 dark:text-indigo-300 text-3xl`}>
                        <Link href="/">Memory</Link>
                    </h1>
                    <div className="flex items-center justify-center">
                        {/* search input */}
                        <input
                            type="text"
                            className="w-64 h-10 px-3 pr-10 text-sm text-gray-700
                                placeholder-gray-600 border rounded-full focus:outline-none focus:border-indigo-900"
                            placeholder="Search"
                        />

                        {/*     햄버거 메뉴 */}
                        <button
                            onClick={lnbChange}
                            className={
                                'md:hidden flex items-center justify-center w-10 h-10 rounded-full text-indigo-900 dark:text-indigo-300'
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </nav>
            </header>
            {lnb && <Lnb />}
        </>
    );
}
