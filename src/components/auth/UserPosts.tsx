'use client';

import { CacheKeysContext } from '@/context/CacheKeysContext';
import { ProfileUser } from '@/model/user';
import { useState } from 'react';
import BookmarkIcon from '@/components/ui/icon/BookmarkIcon';
import HeartIcon from '@/components/ui/icon/HeartIcon';
import PostIcon from '@/components/ui/icon/PostIcon';
import PostGrid from '@/components/posts/PostGrid';
import PostList from '@/components/PostList';
import SideBar from '@/components/SideBar';

type Props = {
    user: ProfileUser;
};
const tabs = [
    { type: 'posts', icon: <PostIcon /> },
    { type: 'saved', icon: <BookmarkIcon className="w-3 h-3" /> }
];
export default function UserPosts({ user }: Props) {
    const [query, setQuery] = useState(tabs[0].type);
    // 나의 멤버아이디와
    return (
        <section>
            <ul className="flex justify-center uppercase">
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
