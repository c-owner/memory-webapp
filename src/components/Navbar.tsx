'use client';

import Link from 'next/link';
import { useState } from 'react';
import SearchIcon from '@/components/ui/SearchIcon';
import SearchForm from '@/components/SearchForm';
import ColorButton from '@/components/ui/ColorButton';
import { signIn, signOut, useSession } from 'next-auth/react';
import Avatar from '@/components/Avatar';

export default function Navbar() {
    const { data: session } = useSession();
    const user = session?.user;

    const [lnb, setLnb] = useState(false);

    const [screenSize, setScreenSize] = useState((window && window.innerWidth) || 0);
    if (window) {
        window.addEventListener('resize', () => {
            setScreenSize(window.innerWidth);
        });
    }
    const lnbChange = () => {
        setLnb(!lnb);
        console.log('lnb : ', lnb);
    };

    return (
        <>
            <div className="flex justify-between items-center p-4">
                <nav className="w-full flex items-center justify-between">
                    <h1 className="text-indigo-900 dark:text-indigo-300 text-3xl">
                        <Link href="/">Memory</Link>
                    </h1>
                    <div className="flex items-center justify-center">
                        {screenSize > 468 ? (
                            <SearchForm />
                        ) : (
                            <Link className="mr-2" href="/search">
                                <SearchIcon />
                            </Link>
                        )}
                    </div>
                    <div className="flex items-center justify-center gap-4">
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
                        {user && (
                            <li>
                                <Link href={`/user/${user.username}`}>
                                    <Avatar size="small" highlight image={user.image} />
                                </Link>
                            </li>
                        )}
                        {session ? (
                            <ColorButton text={'Sign out'} onClick={() => signOut()} />
                        ) : (
                            <ColorButton text={'Sign in'} onClick={() => signIn()} />
                        )}
                    </div>
                </nav>
            </div>
        </>
    );
}
