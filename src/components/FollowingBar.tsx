'use client';

import useMe from '@/hooks/me';
import Link from 'next/link';
import { PropagateLoader } from 'react-spinners';
import Avatar from './Avatar';
import ScrollableBar from './ui/ScrollableBar';

export default function FollowingBar() {
    const { user, isLoading: loading, error } = useMe();
    const users = user?.following;
    return (
        <section className="w-full flex justify-center items-center p-4 shadow-sm shadow-neutral-300 mb-4 rounded-lg min-h-[90px] overflow-x-auto relative z-0">
            {loading ? (
                <PropagateLoader size={8} color="red" />
            ) : (
                (!users || users.length === 0) && <p>{`You don't have following`}</p>
            )}
            {users && users.length > 0 && (
                <ScrollableBar>
                    {users.map(({ image, memberName }) => (
                        <Link
                            key={memberName}
                            className="flex flex-col items-center w-20"
                            href={`/user/${memberName}`}
                        >
                            <Avatar image={image} highlight />
                            <p className="w-full text-sm text-center text-ellipsis overflow-hidden">
                                {memberName}
                            </p>
                        </Link>
                    ))}
                </ScrollableBar>
            )}
        </section>
    );
}
