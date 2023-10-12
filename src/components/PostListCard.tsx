'use client';

import { Comment, Reactions, SimplePost } from '@/model/post';
import { useState, useTransition } from 'react';
import usePosts from '@/hooks/posts';
import PostUserAvatar from '@/components/PostUserAvatar';
import EditorButton from '@/components/EditorButton';
import { useRouter } from 'next/navigation';
import DefaultButton from '@/components/ui/DefaultButton';
import { PulseLoader } from 'react-spinners';
import { AuthUser } from '@/model/user';
import MarkdownViewer from '@/components/MarkdownViewer';
import DeleteButton from '@/components/DeleteButton';
import ActionBar from '@/components/ActionBar';
import { FcLike } from 'react-icons/fc';
import { FaSadTear, FaSmileBeam } from 'react-icons/fa';
import { FaFaceAngry } from 'react-icons/fa6';

type Props = {
    post: SimplePost;
    user: AuthUser;
};
export default function PostListCard({ post, user }: Props) {
    const { memoryId, memberId, content: postContent, comments, memberName, userImage } = post;

    const { id: userId, memberName: userName } = user;
    const [modify, setModify] = useState(false);
    const [commentModify, setCommentModify] = useState('');
    const [commentText, setCommentText] = useState('');

    const { postComment, deleteComment, isLoading, modifyPost, deletePost } = usePosts();
    const router = useRouter();
    const [content, setContent] = useState(postContent);
    const [isPending, startTransition] = useTransition();
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = await modifyPost(memoryId, content);
        if (!data) {
            return false;
        }
        setContent(data.content);
        setModify(false);
        startTransition(() => {
            router.refresh();
        });
    };

    const handlerDeletePost = async (memoryId: string) => {
        await deletePost(memoryId);
        startTransition(() => {
            router.refresh();
        });
    };

    const [moreComment, setMoreComment] = useState(false);
    const handleContentHide = () => {
        if (commentModify) {
            setCommentModify('');
        }
        setMoreComment(!moreComment);
    };

    const onComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const commentId = commentModify;
        await handleModifyComment({ content: commentText, memoryId, commentId });
    };

    const handleModifyComment = async (comment: Comment) => {
        await postComment(post, comment, true);
        setCommentModify('');

        startTransition(() => {
            router.refresh();
        });
    };
    const handlePostComment = async (comment: Comment) => {
        await postComment(post, comment, false);
        startTransition(() => {
            router.refresh();
        });
    };

    const handlerDeleteComment = async (memoryId: string, commentId: string) => {
        await deleteComment(memoryId, commentId);
        startTransition(() => {
            router.refresh();
        });
    };

    const [moreContent, setMoreContent] = useState(false);

    const handleMoreContent = () => {
        setMoreContent(!moreContent);
    };
    return (
        <article className="rounded-lg shadow-md border border-gray-200 dark:border-gray-600 relative">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <PostUserAvatar image={userImage} memberName={memberName} />
                    <span className="text-neutral-400 text-sm mr-1">No.{memoryId}</span>
                </div>
                {userId === memberId && (
                    <div className="flex items-center justify-center gap-4">
                        <EditorButton onClick={() => setModify(!modify)} />
                        <DeleteButton onClick={() => handlerDeletePost(memoryId)} />
                    </div>
                )}
            </div>

            {isPending && (
                <div className="w-full absolute top-1/2 left-1/2 right-1/2 inset-0 z-20">
                    <PulseLoader color={'indigo'} size={10} />
                </div>
            )}

            {modify ? (
                <div className="py-5 px-5 w-full flex flex-col gap-3">
                    <form onSubmit={submit} className="flex flex-col gap-4 w-full">
                        <div className="flex flex-col gap-2 relative">
                            <label htmlFor="content">Content</label>
                            <textarea
                                className="border border-gray-300 dark:border-gray-700 dark:text-black
                                rounded-md p-2 resize-none"
                                name="content"
                                id="content"
                                cols={30}
                                rows={10}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                disabled={isLoading}
                            ></textarea>
                            {isLoading && (
                                <div className="mx-auto absolute top-1/2 right-1/3">
                                    <PulseLoader />
                                </div>
                            )}
                        </div>
                        <DefaultButton text={'Update'} />
                    </form>
                </div>
            ) : (
                <>
                    {moreContent ? (
                        <div className="relative max-h-40 overflow-y-auto px-4">
                            <div className="py-3 whitespace-pre-wrap overflow-auto">
                                <MarkdownViewer content={postContent} />
                            </div>
                        </div>
                    ) : (
                        <div className="relative max-h-40 px-4">
                            <div className="py-3 whitespace-pre-wrap overflow-hidden max-h-[100px]">
                                <MarkdownViewer content={postContent} />
                            </div>
                        </div>
                    )}
                    <div className="text-right mr-3">
                        <button
                            type="button"
                            onClick={() => handleMoreContent()}
                            className="text-sky-600"
                        >
                            {!moreContent ? '더보기' : '접기'}
                        </button>
                    </div>
                </>
            )}
            <ActionBar post={post} onComment={handlePostComment}>
                {comments.length >= 1 && !moreComment && (
                    <button
                        className="font-bold my-2 text-sky-500"
                        onClick={() => handleContentHide()}
                    >{`View all ${comments.length} comments`}</button>
                )}
                {comments.length < 1 && (
                    <div className="flex items-center">
                        <span className="text-neutral-500">댓글이 없습니다.</span>
                    </div>
                )}
                {moreComment && (
                    <div className="relative max-h-40 overflow-y-auto">
                        <div className="py-3 whitespace-pre-wrap overflow-auto flex flex-col-reverse">
                            {comments.map(
                                ({ content, memberId, commentId, memoryId, isDeleted }, index) => (
                                    <div key={index}>
                                        {index === comments.length - 1 && (
                                            <div>
                                                <button
                                                    className="font-bold my-2 text-sky-500"
                                                    onClick={() => handleContentHide()}
                                                >
                                                    {`View less`}
                                                </button>
                                            </div>
                                        )}
                                        <div className="flex justify-between">
                                            <div className="flex items-center w-full">
                                                <span className="text-neutral-500 mr-1">
                                                    {memberId}
                                                </span>
                                                {commentModify === commentId ? (
                                                    <form
                                                        onSubmit={onComment}
                                                        className="w-full flex gap-4 items-center justify-between"
                                                    >
                                                        <input
                                                            className="w-full ml-2 border-none outline-none p-3 dark:bg-apple-dark-2 shadow-md dark:text-neutral-200"
                                                            type="text"
                                                            placeholder="Modify a comment..."
                                                            maxLength={50}
                                                            required
                                                            value={commentText}
                                                            onChange={(e) =>
                                                                setCommentText(e.target.value)
                                                            }
                                                        />
                                                        <button
                                                            type="submit"
                                                            onClick={() => onComment}
                                                            disabled={commentText.length === 0}
                                                            className="text-sm text-sky-600 dark:text-sky-300 w-10"
                                                        >
                                                            SAVE
                                                        </button>
                                                    </form>
                                                ) : (
                                                    <div>
                                                        {isDeleted ? (
                                                            <span className="line-through text-neutral-500">
                                                                삭제된 댓글입니다.
                                                            </span>
                                                        ) : (
                                                            <span>{content}</span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                            {userId === memberId && !isDeleted && (
                                                <div className="flex items-center justify-end ">
                                                    {commentId !== commentModify ? (
                                                        <EditorButton
                                                            size={'w-4 h-4 text-sm hover:scale-150'}
                                                            text={''}
                                                            onClick={() => {
                                                                setCommentModify(commentId || '');
                                                                setCommentText(content);
                                                            }}
                                                        />
                                                    ) : (
                                                        <button
                                                            type="button"
                                                            className="text-sm hover:scale-150 dark:text-white w-10"
                                                            onClick={() => setCommentModify('')}
                                                        >
                                                            취소
                                                        </button>
                                                    )}
                                                    <DeleteButton
                                                        size={'w-4 h-4 text-sm hover:scale-150'}
                                                        text={''}
                                                        onClick={() =>
                                                            handlerDeleteComment(
                                                                memoryId,
                                                                commentId || ''
                                                            )
                                                        }
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                )}
            </ActionBar>

        </article>
    );
}
