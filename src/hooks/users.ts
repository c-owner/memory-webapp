import useSWR from 'swr';
import { SearchUser } from '@/model/user';
import { useCallback } from 'react';
import useSWRInfinite from 'swr/infinite';

async function updateFollow(targetId: string) {
    return fetch(`/api/users/follow/${targetId}`, {
        method: 'GET'
    }).then((res) => res.json());
}

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

const PAGE_SIZE = 12;
export default function useUsers(keyword?: string) {
    /* const {
        data: users,
        isLoading,
        error,
        mutate
    } = useSWR<SearchUser[]>(`/api/search/${keyword || ''}`); */
    const getSearchKey = (index: number, previousPageData: SearchUser[]) => {
        if (previousPageData && !previousPageData.length) return null;
        return keyword
            ? `/api/search/${keyword}?page=${index}&size=${PAGE_SIZE}`
            : `/api/search?page=${index}&size=${PAGE_SIZE}`;
    };
    const {
        data: users,
        mutate,
        isLoading,
        error,
        size,
        setSize
    } = useSWRInfinite(getSearchKey, fetcher);

    const isLoadingInitialData = !users && !error;
    const isLoadingMore =
        isLoadingInitialData || (size > 0 && users && typeof users[size - 1] === `undefined`);
    const isEmpty = users?.[0]?.length === 0;
    const hasReachedEnd = isEmpty || (users && users[users.length - 1]?.length < PAGE_SIZE);

    const toggleFollow = useCallback(
        (targetId: string) => {
            const newUsers = users?.flat().map((user) => {
                if (user.id === targetId) {
                    return { ...user, followingStatus: !user.followingStatus };
                }
                return user;
            });
            return mutate(updateFollow(targetId), {
                optimisticData: newUsers,
                populateCache: false,
                rollbackOnError: true
            });
        },
        [users, mutate]
    );

    return {
        users: users?.flat(),
        isLoading,
        error,
        mutate,
        size,
        setSize,
        isLoadingMore,
        hasReachedEnd,
        toggleFollow
    };
}
