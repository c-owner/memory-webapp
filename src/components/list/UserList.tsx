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
    const { users, error, isLoading, size, setSize, isLoadingMore, mutate, hasReachedEnd } =
        useUsers(debounceKeyword);

    return (
        <>
            <ul className="w-full h-full ">
                {isLoading && (
                    <div className="flex justify-center items-center">
                        <PulseLoader color={'indigo'} size={10} />
                    </div>
                )}
                {users && (
                    <InfiniteScroll
                        dataLength={users.length || 0}
                        next={() => setSize((size) => size + 1)}
                        hasMore={!hasReachedEnd}
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
                        {users?.map((user, index) =>
                            user.memberName !== myInfo.memberName || users.length > 2 ? (
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
                                    {users.length === 1 && user.id === myInfo.id && (
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
