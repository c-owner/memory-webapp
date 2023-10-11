'use client';

import { parseDate } from '@/util/date';
import { BookmarkPost, Comment, SimplePost } from '@/model/post';
import useMe from '@/hooks/me';
import BookmarkFillIcon from '@/components/ui/icon/BookmarkFillIcon';
import BookmarkIcon from '@/components/ui/icon/BookmarkIcon';
import ToggleButton from '@/components/ui/ToggleButton';
import CommentForm from '@/components/posts/CommentForm';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import usePosts from '@/hooks/posts';
import { FaSadTear, FaSmileBeam } from 'react-icons/fa';
import { FaFaceAngry } from 'react-icons/fa6';

type Props = {
    post: SimplePost | BookmarkPost;
    children?: React.ReactNode;
    onComment: (comment: Comment) => void;
};
export default function ActionBar({ post, children, onComment }: Props) {
    const { memoryId, createdAt, isSaved, reactionStatus, likeCnt, angryCnt, sadCnt } = post;
    const { user } = useMe();
    const { data, setBookmark, updateReactionStatus } = usePosts();
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const bookmarked = isSaved;

    const handleBookmark = async (bookmarked: boolean) => {
        if (user) await setBookmark(memoryId);
        startTransition(() => {
            router.refresh();
        });
    };

    const handleComment = (comment: string) => {
        return user && onComment({ content: comment, memoryId });
    };
    const handlerReaction = async (reaction: string) => {
        await updateReactionStatus(memoryId, reaction);
        startTransition(() => {
            router.refresh();
        });
    };
    return (
        <>
            <div className="px-4">
                <div className="flex justify-between my-2">
                    <ToggleButton
                        toggled={bookmarked}
                        onToggle={handleBookmark}
                        onIcon={<BookmarkFillIcon />}
                        offIcon={<BookmarkIcon />}
                    />
                    <div className="flex justify-center items-end gap-x-12">
                        <div className="flex flex-col items-center">
                            <FaSmileBeam className="text-emerald-500 scale-125" fontSize="1.5em" />
                            <span className="text-sm/[17px]">{likeCnt}</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <FaSadTear color="yellow" className="scale-125" fontSize="1.5em" />
                            <span className="text-sm/[17px]">{sadCnt}</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <FaFaceAngry color="red" className="scale-125" fontSize="1.5em" />
                            <span className="text-sm/[17px]">{angryCnt}</span>
                        </div>
                    </div>
                </div>
                <div className="py-1">{children}</div>
                <p className="text-xs text-neutral-500 uppercase my-2">{parseDate(createdAt)}</p>
            </div>

            <CommentForm handlerReaction={handlerReaction} onPostComment={handleComment} />
        </>
    );
}
