import { AuthUser, NormalUser } from '@/model/user';
import useSWR from 'swr';

export function addNormarUser(user: NormalUser) {
    console.log(user);
    return fetch('/api/users/me', {
        method: 'POST',
        body: JSON.stringify(user)
    }).then((res) => res.json());
}
export default function useMe() {
    const { data: user, isLoading, error, mutate } = useSWR<AuthUser>(``);
}
