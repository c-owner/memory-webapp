import { useCacheKeys } from '@/context/CacheKeysContext';
import useSWR from 'swr';
import { Comment, SimplePost } from '@/model/post';
import { useCallback } from 'react';

async function addComment(id: string, content: string) {
    return fetch(`/api/posts/${id}/comments`, {
        method: 'POST',
        body: JSON.stringify({ content })
    }).then((res) => res.json());
}

async function modifyComment(id: string, comment: Comment) {
    return fetch(`/api/posts/${id}/comments`, {
        method: 'PATCH',
        body: JSON.stringify(comment)
    }).then((res) => res.json());
}

async function removeComment(id: string, commentId: string) {
    return fetch(`/api/posts/${id}/comments`, {
        method: 'DELETE',
        body: JSON.stringify({ commentId })
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

async function getBookmark() {
    return fetch(`/api/bookmarks`, {
        method: 'GET'
    }).then((res) => res.json());
}

export default function usePosts() {
    const cacheKeys = useCacheKeys();
    const { data, isLoading, error, mutate } = useSWR<SimplePost[]>(cacheKeys.postsKey);

    const postComment = useCallback(
        (post: SimplePost, comment: Comment, type: boolean) => {
            const newPost = {
                ...post,
                comments: [...post.comments, comment]
            };
            const newPosts = data?.map((p) => (p.memoryId === post.memoryId ? newPost : p));
            const content = comment?.content;

            if (type) {
                // modify comment
                return mutate(modifyComment(post.memoryId, comment), {
                    optimisticData: newPosts,
                    populateCache: false,
                    rollbackOnError: true
                });
            }

            return mutate(addComment(post.memoryId, content), {
                optimisticData: newPosts,
                populateCache: false,
                rollbackOnError: true
            });
        },
        [data, mutate]
    );

    const deleteComment = useCallback(
        (memoryId: string, commentId: string) => {
            const newPosts = data?.map((post) => ({
                ...post,
                comments: post.comments.filter((c) => c.isDeleted)
            }));
            return mutate(removeComment(memoryId, commentId), {
                optimisticData: newPosts,
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

    const bookmarkPost = useCallback(() => {
        return mutate(getBookmark());
    }, [data, mutate]);

    return {
        data,
        isLoading,
        error,
        postComment,
        deleteComment,
        newPost,
        modifyPost,
        deletePost,
        bookmarkPost
    };
}
