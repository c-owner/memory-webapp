'use client';

import useSWR from 'swr';
import { FormEvent, useEffect, useState } from 'react';
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
                    className="w-full text-xl p-3 outline-none border border-gray-400 rounded-lg"
                    autoFocus
                    placeholder="Search for a username"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </form>
            {error && <div>Failed to load</div>}
            {loading && <GridSpinner />}
            {!loading && !error && users?.length === 0 && (
                <p>
                    Nothing found for <strong>{keyword}</strong>
                </p>
            )}
            <ul className="w-full p-4">
                {users &&
                    !loading &&
                    users?.map(
                        (user) =>
                            user.memberName !== myInfo?.memberName && (
                                <li key={user.memberName}>
                                    <UserCard user={user} />
                                </li>
                            )
                    )}
            </ul>
        </section>
    );
}
