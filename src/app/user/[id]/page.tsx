import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { cache } from 'react';
import { getUserForProfile } from '@/service/user';
import UserProfile from '@/components/auth/UserProfile';
import UserPosts from '@/components/auth/UserPosts';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

type Props = { params: { id: string } };

const getUser = cache(async (id: string) => getUserForProfile(id));

export default async function UserPage({ params: { id } }: Props) {
    const user = await getUser(id);
    const memories = user?.memories;
    const session = await getServerSession(authOptions);

    if (!user) {
        notFound();
    }
    if (!session) {
        redirect('/auth/signin');
    }

    return (
        <section className="w-full">
            <UserProfile user={user} />
            <UserPosts user={user} mySession={session && session?.user} />
        </section>
    );
}

export async function generateMetadata({ params: { id } }: Props): Promise<Metadata> {
    const user = await getUser(id);
    const session = await getServerSession(authOptions);
    return {
        title: `${session?.user?.memberName} (@${session?.user?.username}) · Instantgram Photos`,
        description: `${session?.user?.memberName}'s all Instantgram posts`
    };
}
