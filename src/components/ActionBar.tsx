'use client';

import { parseDate } from '@/util/date';
import { BookmarkPost, Comment, SimplePost } from '@/model/post';
import usePosts from '@/hooks/posts';
import useMe from '@/hooks/me';
import HeartIcon from '@/components/ui/icon/HeartIcon';
import HeartFillIcon from '@/components/ui/icon/HeartFillIcon';
import BookmarkFillIcon from '@/components/ui/icon/BookmarkFillIcon';
import BookmarkIcon from '@/components/ui/icon/BookmarkIcon';
import ToggleButton from '@/components/ui/ToggleButton';
import CommentForm from '@/components/posts/CommentForm';

type Props = {
    post: SimplePost | BookmarkPost;
    children?: React.ReactNode;
    onComment: (comment: Comment) => void;
};
export default function ActionBar({ post, children, onComment }: Props) {
    const { memberId, content, likeCnt, memoryId, angryCnt, sadCnt, comments, reactions } = post;
    const { user, setBookmark } = useMe();

    // const bookmarked = user?.bookmarks.includes(memberId) ?? false;

    const handleBookmark = (bookmarked: boolean) => {
        if (user) setBookmark(memoryId);
    };

    const handleComment = (content: string) => {
        return user && onComment({ memoryId, content });
    };
    return (
        <>
            <div className="flex justify-between my-2 px-4">
                <ToggleButton
                    toggled={false}
                    onToggle={handleBookmark}
                    onIcon={<BookmarkFillIcon />}
                    offIcon={<BookmarkIcon />}
                />
            </div>
            <div className="px-4 py-1">
                <p className="text-sm font-bold mb-2">{`${likeCnt < 1 && 0} ${
                    likeCnt > 1 ? 'likes' : 'like'
                }`}</p>
                {children}
                <p className="text-xs text-neutral-500 uppercase my-2">{parseDate('')}</p>
            </div>
            <CommentForm onPostComment={handleComment} />
        </>
    );
}
