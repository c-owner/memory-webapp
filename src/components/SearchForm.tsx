'use client';

import { useState } from 'react';

export default function SearchForm() {
    const [search, setSearch] = useState('');
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearch('');
    };

    return (
        <form onSubmit={submitHandler}>
            <input
                type="text"
                className="w-[190px] px-1 h-10 text-sm text-gray-700 placeholder-neutral-300
                                        border rounded-full focus:outline-none focus:border-indigo-300
                                        dark:bg-apple-dark-2 dark:text-white dark:placeholder-neutral-400
                                        "
                placeholder="Search for users or posts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </form>
    );
}
