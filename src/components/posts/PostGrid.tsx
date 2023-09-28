'use client';

import GridSpinner from '@/components/ui/GridSpinner';
import usePosts from '@/hooks/posts';
import PostGridCard from '@/components/posts/PostGridCard';

export default function PostGrid() {
    const { data: posts, isLoading } = usePosts();

    return (
        <div className="w-full text-center">
            {isLoading || (!posts && <GridSpinner />)}
            <ul className="grid grid-cols-3 gap-4 py-4 px-8">
                {posts &&
                    posts.map((post, index) => (
                        <li key={post.memoryId}>
                            <PostGridCard post={post} priority={index < 6} />
                        </li>
                    ))}
            </ul>
        </div>
    );
}
