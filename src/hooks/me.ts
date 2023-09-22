import { AuthUser, NormalUser } from '@/model/user';
import useSWR from 'swr';

export function register(user: AuthUser) {
    return fetch('/api/users/me', {
        method: 'POST',
        body: JSON.stringify(user)
    }).then((res) => res.json());
}
export default function useMe() {
    const { data: user, isLoading, error, mutate } = useSWR<AuthUser>(`/api/users/me`);

    const addUser = (user: AuthUser) => {
        return mutate(register(user), {
            optimisticData: user,
            revalidate: false,
            rollbackOnError: true
        });
    };

    return { user, isLoading, error, mutate, addUser };
}
