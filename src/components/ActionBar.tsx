'use client';

import { parseDate } from '@/util/date';
import { Comment, SimplePost } from '@/model/post';
import usePosts from '@/hooks/posts';
import useMe from '@/hooks/me';
import CommentForm from '@/components/CommentForm';
import HeartIcon from '@/components/ui/icon/HeartIcon';
import HeartFillIcon from '@/components/ui/icon/HeartFillIcon';
import BookmarkFillIcon from '@/components/ui/icon/BookmarkFillIcon';
import BookmarkIcon from '@/components/ui/icon/BookmarkIcon';
import ToggleButton from '@/components/ui/ToggleButton';

type Props = {
    post: SimplePost;
    children?: React.ReactNode;
    onComment: (comment: Comment) => void;
};
export default function ActionBar({ post, children, onComment }: Props) {
    const { memberName, memberId, content, likeCnt, memoryId, createdAt } = post;
    const { user, setBookmark } = useMe();

    console.log('user', user);

    // const bookmarked = user?.bookmarks.includes(memberId) ?? false;

    const handleBookmark = (bookmarked: boolean) => {
        if (user) setBookmark(memoryId);
    };

    const handleComment = (content: string) => {
        return user && onComment({ content, memberName });
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
                <p className="text-sm font-bold mb-2">{`${likeCnt < 1 ?? 0} ${
                    likeCnt > 1 ? 'likes' : 'like'
                }`}</p>
                {children}
                <p className="text-xs text-neutral-500 uppercase my-2">{parseDate(createdAt)}</p>
            </div>
            <CommentForm onPostComment={handleComment} />
        </>
    );
}
