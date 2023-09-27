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
        <div className="flex items-center justify-between w-full rounded-sm border border-neutral-300 mb-2 p-4 bg-white hover:bg-neutral-50">
            <Link className="flex items-center" href={`/user/${memberName}`}>
                <Avatar image={image} />
                <div className="text-neutral-500">
                    <p className="text-black font-bold leading-4">{memberName}</p>
                    <p className="my-1 text-sm">{memberEmail}</p>
                    <p className="text-sm leading-4">{`${followersCnt} followers ${followingCnt} following`}</p>
                </div>
            </Link>
            <FollowButton user={user} />
        </div>
    );
}
