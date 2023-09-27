import { SearchUser } from '@/model/user';
import Link from 'next/link';
import Avatar from '@/components/Avatar';
import FollowButton from '@/components/FollowButton';

type Props = {
    user: SearchUser;
};
export default function UserCard({ user }: Props) {
    const { memberName, image, memberEmail, followersCnt, followingCnt } = user;

    return (
        <div
            className="items-center justify-between flex max-sm:flex-wrap
        w-full rounded-sm border border-neutral-300 mb-2 p-4 bg-white hover:bg-neutral-50"
        >
            <Link className="flex items-center" href={`/user/${memberName}`}>
                <Avatar image={image} />
                <div className="text-neutral-500 min-w-[170px]">
                    <p className="text-black font-bold leading-4">{memberName}</p>
                    <p className="my-1 text-sm text-ellipsis overflow-x-hidden w-[90%]">
                        {memberEmail}
                    </p>
                    <p className="text-sm leading-4">{`${followersCnt} followers ${followingCnt} following`}</p>
                </div>
            </Link>
            <div className="font-sm text-sm md:text-md">
                <FollowButton user={user} />
            </div>
        </div>
    );
}
