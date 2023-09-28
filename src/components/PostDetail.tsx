import { BookmarkPost, Comment, FullPost, SimplePost } from '@/model/post';
import Image from 'next/image';
import userSWR from 'swr';
import useMe from '@/hooks/me';
import GridSpinner from '@/components/ui/GridSpinner';
import useFullPost from '@/hooks/post';
import Avatar from './Avatar';
import PostUserAvatar from './PostUserAvatar';

type Props = {
    post: BookmarkPost;
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
    const { post: data, postComment, isLoading, error } = useFullPost(memoryId);
    const comments = data?.comments;

    return (
        <section className="flex w-full h-full">
            <div className="relative basis-3/5">
                <div>{content}</div>
                {reactions?.map((reaction, index) => <div key={index}>{reaction}</div>)}
                <div>
                    <span>{likeCnt}</span>
                    <span>{sadCnt}</span>
                    <span>{angryCnt}</span>
                </div>
                <div>{comment.length < 1 ?? 0}</div>
            </div>
            <div className="w-full basis-2/5 flex flex-col">
                <PostUserAvatar image={''} memberName={memberId} />
                <ul className="border-t border-gray-200 h-full overflow-y-auto p-4 mb-1">
                    {isLoading && <GridSpinner />}
                    {comments &&
                        comments.map(({ memberId, commentId, content, memoryId }, index) => (
                            <li key={index} className="flex items-center mb-1">
                                <Avatar
                                    image={''}
                                    size="small"
                                    highlight={memberId === commentId}
                                />
                                <div className="ml-2">
                                    <span className="font-bold mr-1">{commentId}</span>
                                    <span>{content}</span>
                                </div>
                            </li>
                        ))}
                </ul>
            </div>
        </section>
    );
}
