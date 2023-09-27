import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Link from 'next/link';
import NewPost from '@/components/posts/NewPost';
import { notFound } from 'next/navigation';

type Props = { params: { memoryId: string } };
export default async function UserPage({ params: { memoryId } }: Props) {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const getPost = async () => {
        const res = await fetch(`/api/posts/${memoryId}`);
        const data = await res.json();
        return data;
    };
    if (!getPost) {
        notFound();
    }

    const post = {
        content: 'test'
    };

    if (!user) {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <h1 className="text-2xl">You need to sign in to view this page</h1>
                <Link href={`/auth/signin`}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Sign in
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className="py-5 px-5 w-full flex flex-col gap-3">
            <h1 className="text-2xl">Memory</h1>
            <NewPost user={user} />
        </div>
    );
}
