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

export function updateName(user: UpdateUser) {
    return fetch('/api/users/me', {
        method: 'PATCH',
        body: JSON.stringify({
            name: user?.memberName || '',
            image: user?.image || '',
            password: user?.password || ''
        })
    }).then((res) => res.json());
}

async function updateFollow(targetId: string, follow: boolean) {
    return fetch('/api/follow', {
        method: 'POST',
        body: JSON.stringify({ id: targetId, follow })
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

    const changeName = useCallback(
        async (user: UpdateUser) => {
            const data = await updateName(user);
            mutate(data);
            return { data, mutate, isLoading, error };
        },
        [user, mutate]
    );

    const toggleFollow = useCallback(
        (targetId: string, follow: boolean) => {
            return mutate(updateFollow(targetId, follow), {
                populateCache: false
            });
        },
        [mutate]
    );
    return { user, isLoading, error, mutate, addUser, emailLogin, changeName, toggleFollow };
}
