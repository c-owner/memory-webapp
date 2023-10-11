'use client';

import { FormEvent, useEffect, useState } from 'react';
import useDebounce from '@/hooks/debounce';
import UserCard from '@/components/auth/UserCard';
import useUsers from '@/hooks/users';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PulseLoader } from 'react-spinners';
import { AuthUser, SearchUser } from '@/model/user';

type Props = {
    userData: SearchUser;
};
export default function UserSearch(userData: Props) {
    const myInfo = userData?.userData;
    const [keyword, setKeyword] = useState('');
    const debounceKeyword = useDebounce(keyword);
    const { users, isLoading: loading, error, mutate } = useUsers(debounceKeyword);

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const [userList, setUserList] = useState<SearchUser[]>([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        if (users) {
            if (currentPage === 1) {
                setUserList(users?.slice(0, pageSize));
            }
        }
    }, [users]);
    const onFetchMoreList = async () => {
        const current = currentPage;
        if (users) {
            const originalLength = userList.length;
            if (originalLength >= users?.length) {
                setHasMore(false);
            }
            const data = users.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
            if (data.length === 0) {
                setHasMore(false);
                return false;
            }
            setUserList([...userList, ...data]);
            setCurrentPage(current + 1);
        }
    };

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
            {error && <div>Failed to load</div>}
            <ul
                className="w-full h-full p-4 overflow-auto"
                id="userList"
                style={{ height: 'calc(100% - 150px)', overflowY: 'auto' }}
            >
                {userList && (
                    <InfiniteScroll
                        dataLength={currentPage * 5 || 0}
                        next={onFetchMoreList}
                        hasMore={hasMore}
                        scrollableTarget="userList"
                        loader={
                            <div className="flex justify-center items-center">
                                <PulseLoader color={'indigo'} size={10} />
                            </div>
                        }
                        endMessage={
                            <>
                                <hr className="border-neutral-600 my-3" />
                                <h4 className="text-center">더 이상 불러올것이 없습니다.</h4>
                            </>
                        }
                    >
                        {userList?.map((user, index) =>
                            user.memberName !== myInfo.memberName || userList.length > 2 ? (
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
                                    {userList.length === 1 && user.id === myInfo.id && (
                                        <>
                                            <UserCard user={user} />
                                            <p className="text-center text-xl font-bold">
                                                This is you!
                                            </p>
                                        </>
                                    )}
                                </li>
                            )
                        )}
                    </InfiniteScroll>
                )}
            </ul>
        </section>
    );
}
