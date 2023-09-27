'use client';

import { Comment, SimplePost } from '@/model/post';
import { useState } from 'react';
import ModalPortal from '@/components/ui/ModalPortal';
import usePosts from '@/hooks/posts';
import PostModal from '@/components/PostModal';
import PostUserAvatar from '@/components/PostUserAvatar';
import PostDetail from '@/components/PostDetail';

type Props = {
    post: SimplePost;
    priority?: boolean;
};
export default function PostListCard({ post, priority = false }: Props) {
    const { memoryId, memberId, content, likeCnt, comments, memberName, userImage } = post;
    const [openModal, setOpenModal] = useState(false);

    const { postComment } = usePosts();
    const handlePostComment = (comment: Comment) => {
        postComment(post, comment);
    };
    return (
        <article className="rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center">
                <PostUserAvatar image={userImage} memberName={memberName} />
                <span className="font-bold mr-1">No.{memoryId}</span>
            </div>
            <p className="px-5 py-3">{content}</p>

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
