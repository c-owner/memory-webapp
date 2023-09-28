import useSWR, { useSWRConfig } from 'swr';
import { Comment, FullPost } from '@/model/post';
import { useCallback } from 'react';

async function addComment(id: string, comment: string) {
    return fetch(`/api/posts/${id}/comments`, {
        method: 'POST',
        body: JSON.stringify({ content: comment })
    }).then((res) => res.json());
}

async function removeComment(id: string, commentId: string) {
    return fetch(`/api/posts/${id}/comments`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ commentId })
    }).then((res) => res.json());
}

export default function useFullPost(postId: string) {
    const { data: post, isLoading, error, mutate } = useSWR<FullPost>(`/api/posts/${postId}`);

    const { mutate: globalMutate } = useSWRConfig();
    const postComment = useCallback(
        (comment: Comment) => {
            if (!post) return;

            const newPost = {
                ...post,
                comments: [...post.comments, comment]
            };

            return mutate(addComment(comment.memoryId, comment.content), {
                optimisticData: newPost,
                populateCache: false,
                revalidate: false,
                rollbackOnError: true
            }).then(() => globalMutate('/api/posts'));
        },
        [post, mutate, globalMutate]
    );

    const deleteComment = useCallback(
        (commentId: string) => {
            if (!post) return;

            const newPost = {
                ...post,
                comments: post.comments.filter((c) => c.commentId !== commentId)
            };

            return mutate(removeComment(post.memoryId, commentId), {
                optimisticData: newPost,
                populateCache: false,
                revalidate: false,
                rollbackOnError: true
            }).then(() => globalMutate(`/api/posts/${post.memoryId}`));
        },
        [post, mutate, globalMutate]
    );

    return { post, isLoading, error, postComment, deleteComment };
}
