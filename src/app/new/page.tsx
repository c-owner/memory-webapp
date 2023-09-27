import NewPost from '@/components/posts/NewPost';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Link from 'next/link';
import { getServerSession } from 'next-auth';

export default async function NewPage() {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (!user) {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <h1 className="text-2xl">You need to sign in to create a post</h1>
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
            <NewPost user={user && user} />
        </div>
    );
}
