'use client';

import GridSpinner from '@/components/ui/GridSpinner';
import usePosts from '@/hooks/posts';
import PostListCard from '@/components/PostListCard';
import { SimplePost } from '@/model/post';
import { AuthUser } from '@/model/user';

type Props = {
    user: AuthUser;
};

export default function PostList({ user }: Props) {
    const { data, isLoading: loading } = usePosts();
    const posts = data;

    return (
        <section>
            {loading && (
                <div className="text-center mt-32 mb-32">
                    <GridSpinner color="red" />
                </div>
            )}
            {posts && (
                <ul>
                    {posts.length > 0 &&
                        Object.keys(posts).length > 0 &&
                        posts?.map((post: SimplePost, index: number) => (
                            <li key={post.memoryId} className="mb-4">
                                <PostListCard post={post} priority={index < 2} user={user} />
                            </li>
                        ))}
                </ul>
            )}
        </section>
    );
}
