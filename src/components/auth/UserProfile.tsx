import { SearchUser } from '@/model/user';
import Avatar from '@/components/Avatar';
import FollowButton from '@/components/ui/FollowButton';

type Props = {
    user: SearchUser;
};
export default function UserProfile({ user }: Props) {
    const { memberName, followers, following, followingCnt, followersCnt } = user;
    const info = [
        { title: 'followers', data: followersCnt },
        { title: 'following', data: followingCnt }
    ];

    return (
        <section className="w-full flex flex-col md:flex-row items-center justify-center py-12 border-b border-neutral-300 dark:border-neutral-500">
            <Avatar image={''} highlight size="xlarge" />
            <div className="md:ml-10 basis-1/3">
                <div className="flex flex-col items-center md:flex-row">
                    <h1 className="text-2xl md:mr-8 my-2 md:mb-0">{memberName}</h1>
                    <FollowButton user={user} />
                </div>
                <ul className="my-4 flex gap-4">
                    {info.map(({ title, data }, index) => (
                        <li key={index}>
                            <span className="font-bold mr-1">{data}</span>
                            {title}
                        </li>
                    ))}
                </ul>
                <p className="text-xl font-bold text-center md:text-start">@{memberName}</p>
            </div>
        </section>
    );
}
