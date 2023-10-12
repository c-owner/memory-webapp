'use client';

import { useState } from 'react';
import SmileIcon from '@/components/ui/icon/SmileIcon';
import { FaSadTear, FaSmileBeam } from 'react-icons/fa';
import { FaFaceAngry } from 'react-icons/fa6';

type Props = {
    onPostComment: (comment: string) => void;
    handlerReaction?: (reaction: string) => void;
};

export default function CommentForm({ onPostComment, handlerReaction }: Props) {
    const [comment, setComment] = useState('');
    const [openEmoji, setOpenEmoji] = useState(false);
    const buttonDisabled = comment.length === 0;
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onPostComment(comment);
        setComment('');
    };

    const activeReaction = (reaction: string) => {
        if (handlerReaction) {
            handlerReaction(reaction);
        }
        setOpenEmoji(false);
    };

    return (
        <section>
            <form
                onSubmit={handleSubmit}
                className="relative flex items-center px-3 border-t border-neutral-300 dark:text-white dark:border-neutral-800 dark:bg-apple-dark-2 "
            >
                {openEmoji && <div></div>}
                <button type="button" onClick={() => setOpenEmoji(!openEmoji)}>
                    <SmileIcon />
                </button>
                {openEmoji && (
                    <section className="absolute top-[-50px] bg-apple-dark-2 rounded dark:text-neutral-100">
                        <div className="relative basis-3/5 p-4 grid">
                            <div className="flex justify-center items-end gap-x-12">
                                <button
                                    type="button"
                                    className="hover:scale-150"
                                    onClick={() => activeReaction('LIKE')}
                                >
                                    <FaSmileBeam
                                        className="text-emerald-500 scale-125"
                                        fontSize="1.5em"
                                    />
                                </button>
                                <button
                                    type="button"
                                    className="hover:scale-150"
                                    onClick={() => activeReaction('SAD')}
                                >
                                    <FaSadTear
                                        color="yellow"
                                        className="scale-125"
                                        fontSize="1.5em"
                                    />
                                </button>
                                <button
                                    type="button"
                                    className="hover:scale-150"
                                    onClick={() => activeReaction('ANGRY')}
                                >
                                    <FaFaceAngry
                                        color="red"
                                        className="scale-125"
                                        fontSize="1.5em"
                                    />
                                </button>
                            </div>
                        </div>
                    </section>
                )}
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
        </section>
    );
}
