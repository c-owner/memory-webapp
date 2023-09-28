import { BookmarkPost, Comment, FullPost, SimplePost } from '@/model/post';
import GridSpinner from '@/components/ui/GridSpinner';
import useFullPost from '@/hooks/post';
import MarkdownViewer from '@/components/MarkdownViewer';
import ActionBar from '@/components/ActionBar';
import PostUserAvatar from '@/components/PostUserAvatar';
import Avatar from '@/components/Avatar';

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
    const { post: data, postComment, isLoading, error } = useFullPost(memoryId);
    const comments = data?.comments;
    const handlePostComment = (memoryId: string, content: string) => {
        return postComment({ memoryId, content });
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
                <ActionBar post={post} onComment={postComment} />
            </div>
        </section>
    );
}
