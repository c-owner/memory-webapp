import NewPost from '@/components/posts/NewPost';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import AccessDenied from '@/components/ui/AccessDenied';

export default async function NewPage() {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (!user) {
        return <AccessDenied />;
    }
    return (
        <div className="py-5 px-5 w-full flex flex-col gap-3">
            <h1 className="text-2xl">Memory</h1>
            <NewPost />
        </div>
    );
}
