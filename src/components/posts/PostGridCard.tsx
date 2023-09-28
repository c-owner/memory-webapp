'use client';

import { BookmarkPost, SimplePost } from '@/model/post';
import { useState } from 'react';
import ModalPortal from '@/components/ui/ModalPortal';
import PostModal from '@/components/PostModal';
import PostDetail from '@/components/PostDetail';
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';
import MarkdownViewer from '@/components/MarkdownViewer';

type Props = {
    post: BookmarkPost;
};
export default function PostGridCard({ post }: Props) {
    const [openModal, setOpenModal] = useState(false);
    const { memoryId } = post;
    const { data: session } = useSession();
    const handleOpenPost = (): void => {
        if (!session?.user) {
            signIn();
        }
        setOpenModal(true);
    };

    return (
        <div className="relative w-full aspect-square">
            <button
                className="max-h-full shadow-2xl rounded-md p-3 bg-neutral-200 dark:bg-apple-dark-2 cursor-pointer"
                onClick={handleOpenPost}
            >
                <div className="">
                    <span>{memoryId}</span>
                    <MarkdownViewer content={post.content} />
                </div>
            </button>
            {openModal && (
                <ModalPortal>
                    <PostModal onClose={() => setOpenModal(false)}>
                        <PostDetail post={post} />
                    </PostModal>
                </ModalPortal>
            )}
        </div>
    );
}
