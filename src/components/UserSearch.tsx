'use client';

import { FormEvent, useEffect, useState } from 'react';
import useDebounce from '@/hooks/debounce';
import UserCard from '@/components/auth/UserCard';
import useUsers from '@/hooks/users';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PulseLoader } from 'react-spinners';
import { AuthUser, SearchUser } from '@/model/user';
import UserList from '@/components/list/UserList';

type Props = {
    userData: AuthUser;
};
export default function UserSearch(userData: Props) {
    const myInfo = userData?.userData;
    const [keyword, setKeyword] = useState('');
    const debounceKeyword = useDebounce(keyword);

    return (
        <section className="w-full max-w-2xl my-4 flex flex-col items-center mx-3">
            <div className="w-full mb-4 px-2">
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
            </div>
            <UserList myInfo={myInfo} debounceKeyword={debounceKeyword} />
        </section>
    );
}
