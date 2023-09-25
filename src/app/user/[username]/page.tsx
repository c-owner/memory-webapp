import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';

export default async function UserDetailPage() {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!session) {
        redirect('/auth/signin');
    }

    return <>UserDetailPage</>;
}
