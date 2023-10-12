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
                className="w-full text-xl p-3 outline-none border border-gray-400 rounded-lg shadow-md
                    dark:placeholder-gray-300 dark:bg-apple-dark-2 dark:text-neutral-200 dark:border-neutral-700
                    "
                placeholder="Search for posts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </form>
    );
}
