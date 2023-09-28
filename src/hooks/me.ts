import { HomeUser, OAuthUser, SignUser, UpdateUser } from '@/model/user';
import useSWR from 'swr';
import { useCallback } from 'react';
import { signIn } from 'next-auth/react';

export function register(user: SignUser | OAuthUser) {
    return fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify(user)
    }).then((res) => res.json());
}

export function modifyUser(user: UpdateUser) {
    return fetch('/api/users/me', {
        method: 'PATCH',
        body: JSON.stringify(user)
    }).then((res) => res.json());
}

async function updateFollow(targetId: string) {
    return fetch(`/api/users/follow/${targetId}`, {
        method: 'GET'
    }).then((res) => res.json());
}

async function updateBookmark(id: string) {
    return fetch(`/api/bookmarks/${id}`, {
        method: 'POST'
    }).then((res) => res.json());
}

async function removeBookmark(id: string) {
    return fetch(`/api/bookmarks/${id}`, {
        method: 'DELETE'
    }).then((res) => res.json());
}

export default function useMe() {
    const { data: user, isLoading, error, mutate } = useSWR<HomeUser>(`/api/users/me`);

    const addUser = useCallback(
        async (user: SignUser) => {
            const data = await register(user);
            mutate(data);
            return { data, mutate, isLoading, error };
        },
        [user, mutate]
    );

    const emailLogin = useCallback(
        async (email: string, password: string) => {
            // const data = await login(user);
            const data = await signIn('credentials', {
                redirect: false,
                email,
                password
            });
            const response = {
                ok: data?.ok,
                error: data?.error,
                status: data?.status
            };

            return { response, mutate, isLoading, error };
        },
        [user, mutate]
    );

    const updateUser = useCallback(
        async (users: UpdateUser) => {
            const data = await modifyUser(users);
            await mutate(data);
            return { data, mutate, isLoading, error };
        },
        [user, mutate]
    );

    const toggleFollow = useCallback(
        (targetId: string) => {
            return mutate(updateFollow(targetId), {
                populateCache: false
            });
        },
        [user, mutate]
    );

    const setBookmark = useCallback(
        (memoryId: string) => {
            return mutate(updateBookmark(memoryId), {
                populateCache: false
            });
        },
        [user, mutate]
    );

    const deleteBookmark = useCallback(
        (memoryId: string) => {
            return mutate(removeBookmark(memoryId), {
                populateCache: false
            });
        },
        [user, mutate]
    );

    return {
        user,
        isLoading,
        error,
        mutate,
        addUser,
        emailLogin,
        updateUser,
        toggleFollow,
        setBookmark,
        deleteBookmark
    };
}
