import {
    AuthUser,
    HomeUser,
    OAuthUser,
    ProfileUser,
    SearchUser,
    SignUser,
    UpdateUser
} from '@/model/user';
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
        async (users: UpdateUser | AuthUser | HomeUser) => {
            const data = await modifyUser(users);
            if (typeof data === 'string') {
                return { data, newUser: null, mutate, isLoading, error };
            }
            const newUser = <HomeUser>{
                ...user,
                memberName: users.memberName || ''
            };
            await mutate(newUser, {
                optimisticData: newUser,
                rollbackOnError: true
            });
            return { data, newUser, mutate, isLoading, error };
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
        updateUser
    };
}
