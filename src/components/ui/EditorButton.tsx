'use client';

import EditIcon from '@/components/ui/icon/EditIcon';

type Props = {
    size?: string;
    text?: string;
    onClick: () => void;
};
export default function EditorButton({ onClick, size = '', text = 'Edit' }: Props) {
    return (
        <button type="button" onClick={onClick} className={`flex items-center ${size}`}>
            <EditIcon styleName={'dark:text-neutral-400'} />
            <span className="text-sm text-neutral-500 dark:text-neutral-400 ml-1">{text}</span>
        </button>
    );
}
