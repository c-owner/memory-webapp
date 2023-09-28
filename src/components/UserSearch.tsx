'use client';

import useSWR from 'swr';
import { FormEvent, useState } from 'react';
import { SearchUser } from '@/model/user';
import GridSpinner from '@/components/ui/GridSpinner';
import useDebounce from '@/hooks/debounce';
import UserCard from '@/components/auth/UserCard';
import useMe from '@/hooks/me';
import { useSession } from 'next-auth/react';
import AccessDenied from '@/components/ui/AccessDenied';

export default function UserSearch() {
    const [keyword, setKeyword] = useState('');
    const debounceKeyword = useDebounce(keyword);

    const {
        data: users,
        isLoading: loading,
        error
    } = useSWR<SearchUser[]>(`/api/search/${debounceKeyword}`);

    const myInfoData = useMe();
    const myInfo = myInfoData.user;

    const { data: mySession } = useSession();

    if (!mySession) {
        return <AccessDenied />;
    }

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
    };
    return (
        <section className="w-full max-w-2xl my-4 flex flex-col items-center mx-3">
            <form onSubmit={onSubmit} className="w-full mb-4 px-2">
                <input
                    type="text"
                    className="w-full text-xl p-3 outline-none border border-gray-400 rounded-lg shadow-md
                    dark:placeholder-gray-300 dark:bg-apple-dark-2 dark:text-neutral-200 dark:border-neutral-700
                    "
                    autoFocus
                    placeholder="Search for a username or id"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </form>
            {error && <div>Failed to load</div>}
            {loading && <GridSpinner />}
            <ul className="w-full p-4">
                {users &&
                    users.map((user, index) =>
                        user.memberName !== myInfo?.memberName || users.length === 1 ? (
                            <li key={`${user.memberName}_${index}`}>
                                {typeof user === 'string' ? (
                                    <p className="text-center">
                                        Nothing found for <strong>{keyword}</strong>
                                    </p>
                                ) : (
                                    <UserCard user={user} />
                                )}
                            </li>
                        ) : (
                            <li key={index}>
                                {users.length === 1 ? (
                                    <>
                                        <UserCard user={user} />
                                        <p className="text-center text-xl font-bold">
                                            This is you!
                                        </p>
                                    </>
                                ) : (
                                    <UserCard user={user} />
                                )}
                            </li>
                        )
                    )}
            </ul>
        </section>
    );
}
