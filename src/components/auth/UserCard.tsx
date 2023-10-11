import { SearchUser } from '@/model/user';
import Link from 'next/link';
import Avatar from '@/components/Avatar';
import FollowButton from '@/components/FollowButton';

type Props = {
    user: SearchUser;
};
export default function UserCard({ user }: Props) {
    const { id, memberName, memberEmail, followersCnt, followingCnt } = user;

    return (
        <div
            className="items-center justify-between flex max-sm:flex-wrap
            dark:bg-neutral-800 dark:hover:bg-neutral-700
            dark:border-neutral-700
        w-full rounded-sm border border-neutral-300 mb-2 p-4 bg-white hover:bg-neutral-50"
        >
            <Link className="flex items-center" href={`/user/${id}`}>
                <Avatar image={''} />
                <div className="text-neutral-500 min-w-[170px] pl-3">
                    <p className="dark:text-neutral-300 text-black font-bold leading-4">
                        {memberName}
                    </p>
                    <p className="dark:text-neutral-500 my-1 text-sm text-ellipsis overflow-x-hidden w-[90%]">
                        {memberEmail}
                    </p>
                    <p className="dark:text-neutral-500 text-sm leading-4">{`${followersCnt} followers ${followingCnt} following`}</p>
                </div>
            </Link>
            <div className="font-sm text-sm md:text-md">
                <FollowButton user={user} />
            </div>
        </div>
    );
}
