import { AuthUser, OAuthUser, SignUser } from '@/model/user';
import useSWR from 'swr';
import { useCallback } from 'react';

export function register(user: SignUser | OAuthUser) {
    return fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify(user)
    }).then((res) => res.json());
}

export function login(user: SignUser) {
    return fetch('/api/users/signin', {
        method: 'POST',
        body: JSON.stringify(user)
    }).then((res) => {
        return res.json();
    });
}
export default function useMe() {
    const { data: user, isLoading, error, mutate } = useSWR<AuthUser>(`/api/users/me`);

    const addUser = useCallback(
        async (user: SignUser) => {
            const data = await register(user);
            mutate(data);
            return { data, mutate, isLoading, error };
        },
        [user, mutate]
    );

    const emailLogin = useCallback(
        async (user: SignUser) => {
            const data = await login(user);
            mutate(data);
            return { data, mutate, isLoading, error };
        },
        [user, mutate]
    );

    return { user, isLoading, error, mutate, addUser, emailLogin };
}
