'use client';

import DefaultButton from '@/components/ui/DefaultButton';
import { useState } from 'react';
import usePosts from '@/hooks/posts';
import { useRouter } from 'next/navigation';
import { AuthUser } from '@/model/user';

export default function NewPost() {
    const [content, setContent] = useState('');

    const router = useRouter();
    const { newPost, modifyPost } = usePosts();
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await newPost(content);
        setContent('');
        router.push('/');
    };

    return (
        <form onSubmit={submit} className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
                <label htmlFor="content">새 글 작성</label>
                <textarea
                    className="shadow-md dark:border-gray-700 dark:bg-apple-dark-1 rounded-md p-2 resize-none"
                    name="content"
                    id="content"
                    cols={30}
                    rows={10}
                    value={content}
                    maxLength={91}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
            </div>
            <DefaultButton text={'Post'} />
        </form>
    );
}
