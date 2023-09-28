'use client';

import GridSpinner from '@/components/ui/GridSpinner';
import usePosts from '@/hooks/posts';
import PostListCard from '@/components/PostListCard';
import { AuthUser } from '@/model/user';
import PostGridCard from '@/components/posts/PostGridCard';

type Props = {
    user: AuthUser;
};
export default function PostGrid({ user }: Props) {
    const { data: posts, isLoading } = usePosts();

    return (
        <div className="w-full text-center">
            {isLoading || (!posts && <GridSpinner />)}
            <ul className="grid grid-cols-3 gap-4 py-4 px-8">
                {posts &&
                    posts.map((post, index) => (
                        <li key={index}>
                            <PostGridCard post={post} />
                        </li>
                    ))}
            </ul>
        </div>
    );
}
