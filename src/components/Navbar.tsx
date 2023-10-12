'use client';

import Link from 'next/link';
import SearchIcon from '@/components/ui/icon/SearchIcon';
import ColorButton from '@/components/ui/ColorButton';
import { signIn, signOut, useSession } from 'next-auth/react';
import Avatar from '@/components/Avatar';
import BottomArrowIcon from '@/components/ui/icon/BottomArrowIcon';
import SearchForm from '@/components/SearchForm';
import { redirect, usePathname, useRouter } from 'next/navigation';
import NewIcon from '@/components/ui/icon/NewIcon';
import NewFillIcon from '@/components/ui/icon/NewFillIcon';

export default function Navbar() {
    const { data: session } = useSession();
    const user = session?.user;

    const router = useRouter();
    const pathName = usePathname();
    return (
        <div className="flex justify-between items-center p-4">
            <nav className="w-full flex gap-2 items-center justify-between">
                <h1 className="text-indigo-900 dark:text-indigo-300 text-2xl">
                    <Link key={'memory main'} href="/">
                        Memory
                    </Link>
                </h1>
                <div className="flex items-center justify-center gap-4">
                    <div className="flex items-center justify-center">
                        <Link className="mr-2" href={`/new`}>
                            {pathName === '/new' ? <NewFillIcon /> : <NewIcon />}
                        </Link>
                        <Link className="mr-2" href={`/search`}>
                            <SearchIcon />
                        </Link>
                    </div>

                    {user && (
                        <li>
                            <Link href={`/user/${user.id}`}>
                                <Avatar size="small" highlight image={user.image} />
                            </Link>
                        </li>
                    )}
                    <div>
                        {session ? (
                            <ColorButton text={'Sign out'} onClick={() => signOut()} />
                        ) : (
                            <ColorButton
                                text={'Sign In'}
                                onClick={() => router.push('/auth/signin')}
                            />
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}
