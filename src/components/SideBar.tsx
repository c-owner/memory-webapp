'use client';

import Avatar from '@/components/Avatar';
import EditorButton from '@/components/EditorButton';
import { useState } from 'react';
import ModalPortal from '@/components/ui/ModalPortal';
import NameEditor from '@/components/auth/NameEditor';
import useMe from '@/hooks/me';

export default function SideBar() {
    const { user, updateUser, mutate, isLoading, error } = useMe();
    const { memberName, id } = user || { memberName: '', id: '' };
    const [editor, setEditor] = useState(false);

    return (
        <>
            <div className="flex items-center">
                <Avatar image={''} />
                <div className="flex flex-col gap-2 ml-4">
                    <p className="font-bold">{memberName}</p>
                    <p className="text-lg text-neutral-500 leading-4">@{id}</p>
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
                    <NameEditor
                        useMe={{ updateUser, mutate, isLoading, error }}
                        memberName={memberName}
                        onClose={() => setEditor(false)}
                    />
                </ModalPortal>
            )}
        </>
    );
}
