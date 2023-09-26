import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { notFound, redirect } from 'next/navigation';

type Props = { params: { username: string } };
export default async function UserPage({ params: { username } }: Props) {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
        notFound();
    }

    if (!session) {
        redirect('/auth/signin');
    }

    return <>UserDetailPage</>;
}
