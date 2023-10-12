'use client';

import PostListCard from '@/components/PostListCard';
import { FullPost, SimplePost } from '@/model/post';
import { AuthUser, SearchUser } from '@/model/user';
import { PulseLoader } from 'react-spinners';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState, useTransition } from 'react';

type Props = {
    user: AuthUser;
};

export default function PostList({ user }: Props) {
    const [currentPage, setCurrentPage] = useState(0);
    const size = 2;
    const [hasMore, setHasMore] = useState(true);

    const [postList, setPostList] = useState<FullPost[]>([]);

    useEffect(() => {
        onFetchMoreList().then((r) => r);
    }, []);
    const onFetchMoreList = async () => {
        const current = currentPage;
        // const data = posts.slice(currentPage * size, (currentPage + 1) * size);
        const query = `size=${size}&page=${current}`;
        const res = await fetch(`/api/posts?${query}`, {
            method: 'GET'
        }).then((res) => res.json());
        if (res.length === 0) {
            setHasMore(false);
            return false;
        }

        setPostList([...postList, ...res]);
        setCurrentPage(current + 1);
    };
    return (
        <section className="w-full h-full">
            {postList && (
                <ul id="postList" className="w-full h-full">
                    <InfiniteScroll
                        dataLength={currentPage * 5 || 0}
                        next={onFetchMoreList}
                        hasMore={hasMore}
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
                            postList?.map((post: SimplePost, index: number) => (
                                <li key={post.memoryId} className="mb-4">
                                    <PostListCard post={post} user={user} />
                                </li>
                            ))}
                    </InfiniteScroll>
                </ul>
            )}
        </section>
    );
}
