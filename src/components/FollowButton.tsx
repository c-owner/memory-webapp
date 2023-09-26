'use client';

import useMe from '@/hooks/me';
import { ProfileUser } from '@/model/user';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { PulseLoader } from 'react-spinners';
import Button from './ui/Button';

type Props = {
    user: ProfileUser;
};
export default function FollowButton({ user }: Props) {
    const { name } = user;
    const { user: loggedInUser, toggleFollow } = useMe();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [isFetching, setIsFetching] = useState(false);
    const isUpdating = isPending || isFetching;

    const showButton = loggedInUser && loggedInUser.name !== name;
    const following = loggedInUser && loggedInUser.following.find((item) => item.name === name);

    const text = following ? 'Unfollow' : 'Follow';

    const handleFollow = async () => {
        setIsFetching(true);
        await toggleFollow(user.id, !following);
        setIsFetching(false);
        startTransition(() => {
            router.refresh();
        });
    };

    return (
        <>
            {showButton && (
                <div className="relative">
                    {isUpdating && (
                        <div className="absolute inset-0 z-20 flex justify-center items-center">
                            <PulseLoader size={6} />
                        </div>
                    )}
                    <Button
                        disabled={isUpdating}
                        text={text}
                        onClick={handleFollow}
                        red={text === 'Unfollow'}
                    />
                </div>
            )}
        </>
    );
}
