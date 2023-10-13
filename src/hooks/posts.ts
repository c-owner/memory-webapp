import { useCacheKeys } from '@/context/CacheKeysContext';
import { Comment, SimplePost } from '@/model/post';
import { useCallback } from 'react';
import useSWRInfinite from 'swr/infinite';
import { useSWRConfig } from 'swr';

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
async function updateBookmark(id: string) {
    return fetch(`/api/bookmarks/${id}`, {
        method: 'POST'
    }).then((res) => res.json());
}

async function updateReaction(id: string, reaction: string) {
    return fetch(`/api/reactions`, {
        method: 'POST',
        body: JSON.stringify({ memoryId: id, reactionStatus: reaction })
    }).then((res) => res.json());
}

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

const PAGE_SIZE = 2;
export default function usePosts(postKey?: string) {
    const getPostKey = (index: number, previousPageData: SimplePost[]) => {
        if (previousPageData && !previousPageData.length) return null;
        return postKey === ''
            ? `/api/posts?page=${index}&size=${PAGE_SIZE}`
            : `/api/bookmarks?page=${index}&size=${PAGE_SIZE}`;
    };
    // const cacheKeys = useCacheKeys();
    // const { data, isLoading, error, mutate } = useSWR<SimplePost[]>(cacheKeys.postsKey);
    const { data, mutate, isLoading, error, size, setSize } = useSWRInfinite(getPostKey, fetcher);

    const isLoadingInitialData = !data && !error;
    const isLoadingMore =
        isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === `undefined`);
    const isEmpty = data?.[0]?.length === 0;
    const hasReachedEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

    const { mutate: globalMutate } = useSWRConfig();

    const postComment = useCallback(
        (post: SimplePost, comment: Comment, type: boolean) => {
            const newPost = {
                ...post,
                comments: [...post.comments, comment]
            };
            const newPosts = data?.flat().map((p) => (p.memoryId === post.memoryId ? newPost : p));
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
        [data, mutate, globalMutate]
    );

    const deleteComment = useCallback(
        (memoryId: string, commentId: string) => {
            const newPosts = data?.flat().map((post) => ({
                ...post,
                comments: post.comments.filter((c: { isDeleted: any }) => c.isDeleted)
            }));
            return mutate(removeComment(memoryId, commentId), {
                optimisticData: newPosts,
                populateCache: false,
                rollbackOnError: true
            });
        },
        [data, mutate, globalMutate]
    );

    const newPost = useCallback(
        (content: string) => {
            const newPosts = data?.flat().map((post) => ({
                ...post
            }));
            return mutate(addPost(content), {
                optimisticData: newPosts,
                populateCache: false,
                rollbackOnError: true
            });
        },
        [data, mutate, globalMutate]
    );

    const modifyPost = useCallback(
        (memoryId: string, content: string) => {
            const newPosts = data?.flat().map((post) => ({
                ...post
            }));
            return mutate(updatePost(memoryId, content), {
                optimisticData: newPosts,
                populateCache: false
            });
        },
        [data, mutate, globalMutate]
    );

    const deletePost = useCallback(
        (memoryId: string) => {
            const newPosts = data?.flat().map((post) => ({
                ...post
            }));
            return mutate(removePost(memoryId), {
                optimisticData: newPosts,
                populateCache: false,
                rollbackOnError: true
            });
        },
        [data, mutate, globalMutate]
    );

    const bookmarkPost = useCallback(() => {
        return mutate(getBookmark(), {
            populateCache: false,
            rollbackOnError: true
        });
    }, [data, mutate, globalMutate]);
    const setBookmark = useCallback(
        (memoryId: string) => {
            const newPosts = data?.flat().map((post) => ({
                ...post,
                isSaved: post.isSaved
            }));
            return mutate(updateBookmark(memoryId), {
                optimisticData: newPosts,
                populateCache: false,
                rollbackOnError: true
            });
        },
        [data, mutate, globalMutate]
    );

    const updateReactionStatus = useCallback(
        (memoryId: string, reaction: string) => {
            const newPosts = data?.flat().map((post) => ({ ...post }));
            return mutate(updateReaction(memoryId, reaction), {
                optimisticData: newPosts,
                populateCache: false,
                rollbackOnError: true
            });
        },
        [data, mutate, globalMutate]
    );
    return {
        data: data?.flat(),
        isLoading,
        error,
        mutate,
        postComment,
        deleteComment,
        newPost,
        modifyPost,
        deletePost,
        bookmarkPost,
        setBookmark,
        updateReactionStatus,
        size,
        setSize,
        isLoadingMore,
        hasReachedEnd
    };
}
