'use client';

import { useState } from 'react';
import SmileIcon from '@/components/ui/icon/SmileIcon';

type Props = {
    onPostComment: (comment: string) => void;
};

export default function CommentForm({ onPostComment }: Props) {
    const [comment, setComment] = useState('');
    const buttonDisabled = comment.length === 0;
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onPostComment(comment);
        setComment('');
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex items-center px-3 border-t border-neutral-300 dark:border-neutral-800"
        >
            <SmileIcon />
            <input
                className="w-full ml-2 border-none outline-none p-3 dark:bg-apple-dark-2 dark:text-neutral-200"
                type="text"
                placeholder="Add a comment..."
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <button
                disabled={buttonDisabled}
                className={`font-bold ml-2 ${
                    buttonDisabled ? 'text-sky-300 cursor-not-allowed' : 'text-sky-500'
                }`}
            >
                Post
            </button>
        </form>
    );
}
