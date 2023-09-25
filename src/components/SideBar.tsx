'use client';

import Avatar from '@/components/Avatar';
import { AuthUser } from '@/model/user';
import EditorButton from '@/components/EditorButton';
import { useState } from 'react';
import ModalPortal from '@/components/ui/ModalPortal';
import NameEditor from '@/components/auth/NameEditor';

type Props = {
    user: AuthUser;
};
export default function SideBar({ user: { image, name, username } }: Props) {
    const [editor, setEditor] = useState(false);

    return (
        <>
            <div className="flex items-center">
                <Avatar image={image} />
                <div className="flex flex-col gap-2 ml-4">
                    <p className="font-bold">{name}</p>
                    <p className="text-lg text-neutral-500 leading-4">@{username}</p>
                    <EditorButton
                        onClick={() => {
                            setEditor(true);
                        }}
                    />
                </div>
            </div>
            <p className="text-sm text-neutral-500 mt-8">
                About • Help • Privacy • Terms • Location • Language
            </p>
            <p className="font-bold text-sm mt-8 text-neutral-500">©Copyright MEMORY, Inc.</p>
            {editor && (
                <ModalPortal>
                    <NameEditor username={username} onClose={() => setEditor(false)} />
                </ModalPortal>
            )}
        </>
    );
}
