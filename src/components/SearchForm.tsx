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
                                        border rounded-full focus:outline-none focus:border-indigo-300"
                placeholder="Search for users or posts..."
                value={search}
            />
        </form>
    );
}
