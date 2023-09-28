import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { getUserForProfile } from '@/service/user';
import UserProfile from '@/components/auth/UserProfile';
import UserPosts from '@/components/auth/UserPosts';

type Props = { params: { id: string } };

const getUser = cache(async (id: string) => getUserForProfile(id));

export default async function UserPage({ params: { id } }: Props) {
    const user = await getUser(id);

    console.log(user);
    if (!user) {
        notFound();
    }

    return (
        <section className="w-full">
            <UserProfile user={user} />
            <UserPosts user={user} />
        </section>
    );
}

export async function generateMetadata({ params: { id } }: Props): Promise<Metadata> {
    const user = await getUser(id);
    return {
        title: `${user?.name} (@${user?.memberName}) · Instantgram Photos`,
        description: `${user?.name}'s all Instantgram posts`
    };
}
