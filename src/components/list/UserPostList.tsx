import { ProfileUser } from '@/model/user';
import { Memories, SimplePost } from '@/model/post';
import { PulseLoader } from 'react-spinners';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostListCard from '@/components/PostListCard';
import useSelfPost from '@/hooks/post';
import { useEffect, useState } from 'react';

type Props = {
    user: ProfileUser;
    id: string;
    posts: Memories[];
};
export default function UserPostList({ user, id, posts }: Props) {
    const [postList, setPostList] = useState(posts);
    const {
        data,
        size,
        setSize,
        hasReachedEnd,
        isLoadingMore,
        isLoading,
        mutate,
        updateReactionStatus,
        setBookmark,
        postComment,
        deleteComment,
        modifyPost,
        deletePost
    } = useSelfPost(id);
    return (
        <section className="w-full h-full">
            {!postList && (
                <div className="flex justify-center items-center">
                    <PulseLoader color={'indigo'} size={10} />
                </div>
            )}
            {postList && (
                <ul className="w-full h-full">
                    <InfiniteScroll
                        dataLength={postList.length || 0}
                        next={() => setSize((size) => size + 1)}
                        hasMore={!hasReachedEnd}
                        scrollableTarget="body"
                        loader={
                            <div className="flex justify-center items-center">
                                <PulseLoader color={'indigo'} size={10} />
                            </div>
                        }
                        endMessage={
                            <>
                                <hr className="border-neutral-600 my-3" />
                                <h4 className="text-center">더 이상 불러올것이 없습니다.</h4>
                            </>
                        }
                    >
                        {postList.length > 0 &&
                            Object.keys(postList).length > 0 &&
                            postList?.map((post: Memories, index: number) => (
                                <li key={post?.memoryId} className="mb-4">
                                    <PostListCard
                                        post={post}
                                        user={user}
                                        usePosts={{
                                            setPostList,
                                            isLoading,
                                            setBookmark,
                                            updateReactionStatus,
                                            postComment,
                                            deleteComment,
                                            modifyPost,
                                            deletePost
                                        }}
                                    />
                                </li>
                            ))}
                    </InfiniteScroll>
                </ul>
            )}
        </section>
    );
}
