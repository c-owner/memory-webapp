'use client';

import useMe from '@/hooks/me';
import { ProfileUser, SearchUser } from '@/model/user';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { PulseLoader } from 'react-spinners';
import useUsers from '@/hooks/users';
import Button from './ui/Button';

type Props = {
    user: ProfileUser | SearchUser;
};
export default function FollowButton({ user }: Props) {
    const { memberName, id: targetId, followingStatus } = user;
    const { user: loggedInUser } = useMe();
    const { toggleFollow, users } = useUsers();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [isFetching, setIsFetching] = useState(false);
    const isUpdating = isPending || isFetching;

    const showButton = loggedInUser && loggedInUser.memberName !== memberName;

    const text = followingStatus ? 'Unfollow' : 'Follow';
    const handleFollow = async () => {
        setIsFetching(true);
        await toggleFollow(targetId);
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
