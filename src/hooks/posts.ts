import { useCacheKeys } from '@/context/CacheKeysContext';
import useSWR from 'swr';
import { Comment, SimplePost } from '@/model/post';
import { useCallback } from 'react';

async function addComment(id: string, content: string) {
    return fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ id, content })
    }).then((res) => res.json());
}

export default function usePosts() {
    const cacheKeys = useCacheKeys();
    const { data, isLoading, error, mutate } = useSWR<SimplePost[]>(cacheKeys.postsKey);

    const postComment = useCallback(
        (post: SimplePost, comment: Comment) => {
            const newPost = {
                ...post,
                comments: post.comments === 0 ? 1 : +1
            };
            const newPosts = data?.map((p) => (p.memoryId === post.memoryId ? newPost : p));
            const content = comment?.content;
            return mutate(addComment(post.memoryId, content), {
                optimisticData: newPosts,
                populateCache: false,
                revalidate: false,
                rollbackOnError: true
            });
        },
        [data, mutate]
    );
    return { data, isLoading, error, postComment };
}
