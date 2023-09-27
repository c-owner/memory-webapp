'use client';

import EditIcon from '@/components/ui/icon/EditIcon';

type Props = {
    onClick: () => void;
};
export default function EditorButton({ onClick }: Props) {
    return (
        <button type="button" onClick={onClick} className="flex items-center">
            <EditIcon styleName={'dark:text-neutral-400'} />
            <span className="text-sm text-neutral-500 dark:text-neutral-400 ml-1">Edit</span>
        </button>
    );
}
