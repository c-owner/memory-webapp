'use client';

import { Comment, SimplePost } from '@/model/post';
import { useState } from 'react';
import ModalPortal from '@/components/ui/ModalPortal';
import usePosts from '@/hooks/posts';
import PostModal from '@/components/PostModal';
import PostUserAvatar from '@/components/PostUserAvatar';
import PostDetail from '@/components/PostDetail';
import EditorButton from '@/components/EditorButton';
import { useRouter } from 'next/navigation';
import DefaultButton from '@/components/ui/DefaultButton';
import { PulseLoader } from 'react-spinners';
import { AuthUser } from '@/model/user';
import MarkdownViewer from '@/components/MarkdownViewer';
import DeleteButton from '@/components/DeleteButton';

type Props = {
    post: SimplePost;
    priority?: boolean;
    user: AuthUser;
};
export default function PostListCard({ post, priority = false, user }: Props) {
    const {
        memoryId,
        memberId,
        content: postContent,
        likeCnt,
        comments,
        memberName,
        userImage
    } = post;
    const { id: userId, memberName: userName } = user;
    const [openModal, setOpenModal] = useState(false);
    const [modify, setModify] = useState(false);
    const [loading, setLoading] = useState(false);

    const { postComment, isLoading, modifyPost, deletePost } = usePosts();
    const router = useRouter();
    const handlePostComment = (comment: Comment) => {
        postComment(post, comment);
    };
    const [content, setContent] = useState(postContent);
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = await modifyPost(memoryId, `### **@${userName}**\n\n&nbsp;&nbsp; ${content}`);
        if (!data) {
            return false;
        }
        setContent(data.content);
        setModify(false);
    };

    const handlerDelete = async (memoryId: string) => {
        await deletePost(memoryId);
    };

    return (
        <article className="rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center justify-between px-5">
                <div className="flex items-center">
                    <PostUserAvatar image={userImage} memberName={memberName} />
                    <span className="text-neutral-400 text-sm mr-1">No.{memoryId}</span>
                </div>
                {userId === memberId && (
                    <div className="flex items-center justify-center gap-4">
                        <EditorButton onClick={() => setModify(!modify)} />
                        <DeleteButton onClick={() => handlerDelete(memoryId)} />
                    </div>
                )}
            </div>

            {modify ? (
                <div className="py-5 px-5 w-full flex flex-col gap-3">
                    <form onSubmit={submit} className="flex flex-col gap-4 w-full">
                        <div className="flex flex-col gap-2 relative">
                            <label htmlFor="content">Content</label>
                            <textarea
                                className="border border-gray-300 dark:border-gray-700 rounded-md p-2 resize-none"
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
                <div className="relative prose lg:prose-xl max-w-none">
                    <div className="px-5 py-3 whitespace-pre-wrap">
                        <MarkdownViewer content={postContent} />
                    </div>
                </div>
            )}

            {openModal && (
                <ModalPortal>
                    <PostModal onClose={() => setOpenModal(false)}>
                        <PostDetail post={post} />
                    </PostModal>
                </ModalPortal>
            )}
        </article>
    );
}
