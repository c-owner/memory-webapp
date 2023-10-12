'use client';

import { CacheKeysContext } from '@/context/CacheKeysContext';
import { AuthUser, ProfileUser, SearchUser } from '@/model/user';
import { useState } from 'react';
import BookmarkIcon from '@/components/ui/icon/BookmarkIcon';
import PostIcon from '@/components/ui/icon/PostIcon';
import PostList from '@/components/list/PostList';
import SideBar from '@/components/SideBar';

type Props = {
    user: ProfileUser;
    mySession: AuthUser;
};
const tabs = [
    { type: 'posts', icon: <PostIcon /> },
    { type: 'saved', icon: <BookmarkIcon className="w-3 h-3" /> }
];
export default function UserPosts({ user, mySession }: Props) {
    const [query, setQuery] = useState(tabs[0].type);
    // TODO :: 해당 유저의 게시물이 나와야함
    // TODO :: 나의 멤버아이디와 유저아이디가 다르면 나의 게시물이 아님
    return (
        <section>
            <ul className="flex justify-center uppercase">
                {user.id !== mySession.id ? (
                    <li className="mx-12 p-4 cursor-pointer border-black dark:border-white font-bold border-t">
                        <button className="scale-150 md:scale-100">{tabs[0].icon}</button>
                        <span className="hidden md:inline">{tabs[0].type}</span>
                    </li>
                ) : (
                    <>
                        {tabs.map(({ type, icon }) => (
                            <li
                                className={`mx-12 p-4 cursor-pointer border-black dark:border-white ${
                                    type === query && 'font-bold border-t'
                                }`}
                                key={type}
                                onClick={() => setQuery(type)}
                            >
                                <button className="scale-150 md:scale-100">{icon}</button>
                                <span className="hidden md:inline">{type}</span>
                            </li>
                        ))}
                    </>
                )}
            </ul>
            <CacheKeysContext.Provider
                value={{
                    postsKey: query === 'posts' ? `/api/posts/self` : `/api/bookmarks`
                }}
            >
                <section className="w-full flex flex-col md:flex-row max-w-[850px] p-4 mx-auto">
                    <div className="w-full basis-3/4 min-w-0">
                        <PostList user={user} />
                    </div>
                    <div className="basis-1/4 ml-8">{user && <SideBar user={user} />}</div>
                </section>
            </CacheKeysContext.Provider>
        </section>
    );
}
