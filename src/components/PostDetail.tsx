import { BookmarkPost, Comment, FullPost, SimplePost } from '@/model/post';
import GridSpinner from '@/components/ui/GridSpinner';
import useFullPost from '@/hooks/post';
import MarkdownViewer from '@/components/MarkdownViewer';
import ActionBar from '@/components/ActionBar';
import PostUserAvatar from '@/components/PostUserAvatar';
import Avatar from '@/components/Avatar';
import EditorButton from '@/components/EditorButton';
import DeleteButton from '@/components/DeleteButton';
import { useSession } from 'next-auth/react';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
    post: BookmarkPost | SimplePost;
};
export default function PostDetail({ post }: Props) {
    const {
        memoryId,
        memberId,
        comments: comment,
        sadCnt,
        content,
        likeCnt,
        angryCnt,
        reactions
    } = post;
    const { post: data, deleteComment, postComment, isLoading, error } = useFullPost(memoryId);
    const comments = data?.comments;
    const session = useSession();
    const { id: userId } = session?.data?.user ?? { id: '' };
    const [modify, setModify] = useState(false);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const handlerDelete = async (commentId: string) => {
        await deleteComment(commentId);
        startTransition(() => {
            router.refresh();
        });
    };

    return (
        <section className="flex w-full h-full dark:bg-apple-dark-2 dark:text-neutral-100">
            <div className="relative basis-3/5 p-4 grid">
                <div className="flex justify-center items-start">
                    <MarkdownViewer content={content} />
                </div>
                {reactions?.map((reaction, index) => (
                    <div className="flex justify-center items-center" key={index}>
                        {reaction}
                    </div>
                ))}
                <div className="flex justify-center items-end gap-x-12">
                    <span> 😊: {likeCnt}</span>
                    <span> 😢: {sadCnt}</span>
                    <span> 😡: {angryCnt}</span>
                </div>
            </div>
            <div className="w-full basis-2/5 flex flex-col">
                <PostUserAvatar image={''} memberName={memberId} />
                <ul className="border-t border-gray-200 h-full overflow-y-auto p-4 mb-1">
                    {isLoading && <GridSpinner />}
                    {comments &&
                        comments.map(({ commentId, content, memberId }, index) => (
                            <li key={index} className="flex items-center mb-1">
                                <div className="basis-1/12">
                                    <Avatar
                                        image={''}
                                        size="small"
                                        highlight={memberId === commentId}
                                    />
                                </div>
                                <div className="ml-2 w-full">
                                    <span className="font-bold mr-1">id: {memberId} - </span>
                                    <p className="font-normal break-words">{content}</p>
                                    {userId === memberId && (
                                        <div className="flex items-center justify-end ">
                                            <EditorButton
                                                size={'w-4 h-4 text-sm'}
                                                text={''}
                                                onClick={() => setModify(!modify)}
                                            />
                                            <DeleteButton
                                                size={'w-4 h-4 text-sm'}
                                                text={''}
                                                onClick={() => handlerDelete(commentId || '')}
                                            />
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))}
                </ul>
                <ActionBar post={post} onComment={postComment} />
            </div>
        </section>
    );
}
