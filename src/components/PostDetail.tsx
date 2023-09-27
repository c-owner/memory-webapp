import { Comment, FullPost, SimplePost } from '@/model/post';
import Image from 'next/image';
import userSWR from 'swr';
import useMe from '@/hooks/me';
import GridSpinner from '@/components/ui/GridSpinner';
import useFullPost from '@/hooks/post';
import Avatar from './Avatar';
import PostUserAvatar from './PostUserAvatar';

type Props = {
    post: SimplePost;
};
export default function PostDetail({ post }: Props) {
    const { memoryId, userImage, memberName, image } = post;
    const { post: data, postComment, isLoading, error } = useFullPost(memoryId);
    const comments = data?.comments;

    return (
        <section className="flex w-full h-full">
            <div className="relative basis-3/5">
                <Image
                    className="object-cover"
                    src={image}
                    alt={`photo by ${memberName}`}
                    priority
                    fill
                    sizes="650px"
                />
            </div>
            <div className="w-full basis-2/5 flex flex-col">
                <PostUserAvatar image={userImage} memberName={memberName} />
                <ul className="border-t border-gray-200 h-full overflow-y-auto p-4 mb-1">
                    {isLoading && <GridSpinner />}
                    {comments &&
                        comments.map(({ image, memberName: commentUsername, content }, index) => (
                            <li key={index} className="flex items-center mb-1">
                                <Avatar
                                    image={image}
                                    size="small"
                                    highlight={commentUsername === memberName}
                                />
                                <div className="ml-2">
                                    <span className="font-bold mr-1">{commentUsername}</span>
                                    <span>{content}</span>
                                </div>
                            </li>
                        ))}
                </ul>
            </div>
        </section>
    );
}
