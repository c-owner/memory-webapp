'use client';

import { CacheKeysContext } from '@/context/CacheKeysContext';
import { ProfileUser } from '@/model/user';
import { useState } from 'react';
import BookmarkIcon from '@/components/ui/icon/BookmarkIcon';
import HeartIcon from '@/components/ui/icon/HeartIcon';
import PostIcon from '@/components/ui/icon/PostIcon';
import PostGrid from '@/components/posts/PostGrid';

type Props = {
    user: ProfileUser;
};
const tabs = [
    { type: 'posts', icon: <PostIcon /> },
    { type: 'saved', icon: <BookmarkIcon className="w-3 h-3" /> },
    { type: 'liked', icon: <HeartIcon className="w-3 h-3" /> }
];
export default function UserPosts({ user: { username } }: Props) {
    const [query, setQuery] = useState(tabs[0].type);

    return (
        <section>
            <ul className="flex justify-center uppercase">
                {tabs.map(({ type, icon }) => (
                    <li
                        className={`mx-12 p-4 cursor-pointer border-black ${
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
            <CacheKeysContext.Provider value={{ postsKey: `/api/posts/self` }}>
                <PostGrid />
            </CacheKeysContext.Provider>
        </section>
    );
}
