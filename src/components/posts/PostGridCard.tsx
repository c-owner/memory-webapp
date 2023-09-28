'use client';

import { SimplePost } from '@/model/post';
import { useState } from 'react';
import ModalPortal from '@/components/ui/ModalPortal';
import PostModal from '@/components/PostModal';
import PostDetail from '@/components/PostDetail';
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';

type Props = {
    post: SimplePost;
    priority?: boolean;
};
export default function PostGridCard({ post, priority = false }: Props) {
    const [openModal, setOpenModal] = useState(false);
    const { image, memberName } = post;
    const { data: session } = useSession();
    const handleOpenPost = (): void => {
        if (!session?.user) {
            signIn();
        }
        setOpenModal(true);
    };

    return (
        <div className="relative w-full aspect-square">
            <Image
                className="object-cover"
                src={image}
                alt={`photo by ${memberName}`}
                sizes="650px"
                fill
                priority={priority}
                onClick={handleOpenPost}
            />
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
