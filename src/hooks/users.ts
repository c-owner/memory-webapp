import useSWR from 'swr';
import { HomeUser, SearchUser } from '@/model/user';
import { useCallback } from 'react';

async function updateFollow(targetId: string) {
    return fetch(`/api/users/follow/${targetId}`, {
        method: 'GET'
    }).then((res) => res.json());
}
export default function useUsers(keyword?: string) {
    const {
        data: users,
        isLoading,
        error,
        mutate
    } = useSWR<SearchUser[]>(`/api/search/${keyword || ''}`);

    const toggleFollow = useCallback(
        (targetId: string) => {
            const newUsers = users?.map((user) => {
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
        users,
        isLoading,
        error,
        mutate,
        toggleFollow
    };
}
