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

async function addPost(content: string) {
    return fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ content })
    }).then((res) => res.json());
}

async function updatePost(memoryId: string, content: string) {
    return fetch(`/api/posts/${memoryId}`, {
        method: 'PATCH',
        body: JSON.stringify({ content })
    }).then((res) => res.json());
}

async function removePost(memoryId: string) {
    return fetch(`/api/posts/${memoryId}`, {
        method: 'DELETE'
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

    const newPost = useCallback(
        (content: string) => {
            return mutate(addPost(content));
        },
        [data, mutate]
    );

    const modifyPost = useCallback(
        (memoryId: string, content: string) => {
            return mutate(updatePost(memoryId, content));
        },
        [data, mutate]
    );

    const deletePost = useCallback(
        (memoryId: string) => {
            return mutate(removePost(memoryId));
        },
        [data, mutate]
    );

    return { data, isLoading, error, postComment, newPost, modifyPost, deletePost };
}
