'use client';

import DefaultButton from '@/components/ui/DefaultButton';
import { useState } from 'react';
import usePosts from '@/hooks/posts';
import { useRouter } from 'next/navigation';
import { AuthUser } from '@/model/user';

type Props = {
    user: AuthUser;
};
export default function NewPost({ user: { id, memberName, image } }: Props) {
    const [content, setContent] = useState('');

    const router = useRouter();
    const { newPost, modifyPost } = usePosts();
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await newPost(`### **@${memberName}**\n\n&nbsp;&nbsp; ${content}`);
        setContent('');
        router.push('/');
    };

    return (
        <form onSubmit={submit} className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
                <label htmlFor="content">Content</label>
                <textarea
                    className="border border-gray-300 dark:border-gray-700 rounded-md p-2 resize-none"
                    name="content"
                    id="content"
                    cols={30}
                    rows={10}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
            </div>
            <DefaultButton text={'Post'} />
        </form>
    );
}
