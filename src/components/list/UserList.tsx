'use client';

import InfiniteScroll from 'react-infinite-scroll-component';
import { PulseLoader } from 'react-spinners';
import UserCard from '@/components/auth/UserCard';
import { useEffect, useState } from 'react';
import { AuthUser, SearchUser } from '@/model/user';
import useUsers from '@/hooks/users';

type Props = {
    myInfo: AuthUser;
    debounceKeyword: string;
};
export default function UserList({ myInfo, debounceKeyword }: Props) {
    const [currentPage, setCurrentPage] = useState(0);
    const size = 5;
    const [hasMore, setHasMore] = useState(true);
    const [userList, setUserList] = useState<SearchUser[]>([]);

    useEffect(() => {
        onFetchMoreList();
    }, []);

    const onFetchMoreList = async () => {
        const current = currentPage;
        const query = `size=${size}&page=${current}`;

        const res = await fetch(`/api/search/${debounceKeyword}?${query}`, {
            method: 'GET'
        }).then((res) => res.json());

        if (res.length === 0) {
            setHasMore(false);
            return false;
        }

        setUserList([...userList, ...res]);
        setCurrentPage(current + 1);
    };

    return (
        <>
            <ul className="w-full h-full ">
                {userList && (
                    <InfiniteScroll
                        dataLength={currentPage * 5 || 0}
                        next={onFetchMoreList}
                        hasMore={hasMore}
                        scrollableTarget="body"
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
                                            Nothing found for <strong>{debounceKeyword}</strong>
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
        </>
    );
}
