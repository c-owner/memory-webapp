import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';
import SideBar from '@/components/SideBar';

export default async function Home() {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
        redirect('/auth/signin');
    }

    return (
        <section className="w-full flex flex-col md:flex-row max-w-[850px] p-4">
            <div className="w-full basis-3/4 min-w-0">
                <div>팔로잉 바</div>

                <>카드 리스트</>
            </div>
            <div className="basis-1/4 ml-8">
                <SideBar user={user} />
            </div>
        </section>
    );
}
