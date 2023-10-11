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

type Props = {
    post: SimplePost | BookmarkPost;
    children?: React.ReactNode;
    onComment: (comment: Comment) => void;
};
export default function ActionBar({ post, children, onComment }: Props) {
    const { memoryId, createdAt, isSaved } = post;
    const { user } = useMe();
    const { data, setBookmark } = usePosts();
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
                </div>
                <div className="py-1">{children}</div>
                <p className="text-xs text-neutral-500 uppercase my-2">{parseDate(createdAt)}</p>
            </div>

            <CommentForm onPostComment={handleComment} />
        </>
    );
}
