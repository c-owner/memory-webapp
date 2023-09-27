import { getServerSession } from 'next-auth';
import SideBar from '@/components/SideBar';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import FollowingBar from '@/components/FollowingBar';
import PostList from '@/components/PostList';
import { redirect } from 'next/navigation';

export default async function Home() {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (!user) {
        redirect('/auth/signin');
    }

    return (
        <section className="w-full flex flex-col md:flex-row max-w-[850px] p-4">
            <div className="w-full basis-3/4 min-w-0">
                <FollowingBar />

                <PostList user={user && user} />
            </div>
            <div className="basis-1/4 ml-8">{user && <SideBar user={user} />}</div>
        </section>
    );
}
