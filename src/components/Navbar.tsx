'use client';

import Link from 'next/link';
import SearchIcon from '@/components/ui/SearchIcon';
import ColorButton from '@/components/ui/ColorButton';
import { signIn, signOut, useSession } from 'next-auth/react';
import Avatar from '@/components/Avatar';
import BottomArrowIcon from '@/components/ui/BottomArrowIcon';
import SearchForm from '@/components/SearchForm';

export default function Navbar() {
    const { data: session } = useSession();
    const user = session?.user;

    return (
        <div className="flex justify-between items-center p-4">
            <nav className="w-full flex gap-2 items-center justify-between">
                <h1 className="text-indigo-900 dark:text-indigo-300 text-2xl">
                    <Link href="/">Memory</Link>
                </h1>
                <div className="hidden items-center justify-center md:flex gap-2">
                    <SearchForm />
                    <Link className="mr-2" href="/search">
                        <SearchIcon />
                    </Link>
                </div>
                <div className="flex items-center justify-center gap-4">
                    <div className="flex items-center justify-center md:hidden">
                        <Link className="mr-2" href={`/search`}>
                            <SearchIcon />
                        </Link>
                    </div>

                    <button type="button" onClick={() => {}} className="block sm:hidden">
                        <BottomArrowIcon />
                    </button>

                    {user && (
                        <li>
                            <Link href={`/user/${user.username}`}>
                                <Avatar size="small" highlight image={user.image} />
                            </Link>
                        </li>
                    )}
                    <div>
                        {session ? (
                            <ColorButton text={'Sign out'} onClick={() => signOut()} />
                        ) : (
                            <ColorButton text={'Sign in'} onClick={() => signIn()} />
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}
