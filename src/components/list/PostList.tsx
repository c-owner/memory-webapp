'use client';

import PostListCard from '@/components/PostListCard';
import { SimplePost } from '@/model/post';
import { AuthUser } from '@/model/user';
import { PulseLoader } from 'react-spinners';
import usePosts from '@/hooks/posts';
import InfiniteScroll from 'react-infinite-scroll-component';
import { mutate } from 'swr';

type Props = {
    user: AuthUser;
};
export default function PostList({ user }: Props) {
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
    } = usePosts();

    return (
        <section className="w-full h-full">
            {isLoading && (
                <div className="flex justify-center items-center">
                    <PulseLoader color={'indigo'} size={10} />
                </div>
            )}
            {data && (
                <ul className="w-full h-full">
                    <InfiniteScroll
                        dataLength={data.length || 0}
                        next={() => setSize((size) => size + 1)}
                        hasMore={!hasReachedEnd}
                        scrollableTarget="body"
                        loader={
                            isLoadingMore && (
                                <div className="flex justify-center items-center">
                                    <PulseLoader color={'indigo'} size={10} />
                                </div>
                            )
                        }
                        endMessage={
                            <>
                                <hr className="border-neutral-600 my-3" />
                                <h4 className="text-center">더 이상 불러올것이 없습니다.</h4>
                            </>
                        }
                    >
                        {data.length > 0 &&
                            Object.keys(data).length > 0 &&
                            data?.map((post: SimplePost, index: number) => (
                                <li key={post?.memoryId || index} className="mb-4">
                                    <PostListCard
                                        post={post}
                                        user={user}
                                        usePosts={{
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
