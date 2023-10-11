import UserSearch from '@/components/UserSearch';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'User Search',
    description: 'Search users to follow'
};
export default async function SearchPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        redirect('/auth/signin');
    }

    return <UserSearch userData={session?.user} />;
}
