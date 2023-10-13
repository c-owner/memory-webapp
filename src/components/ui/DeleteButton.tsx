'use client';

import DeleteIcon from '@/components/ui/icon/DeleteIcon';

type Props = {
    size?: string;
    text?: string;
    onClick: () => void;
};
export default function DeleteButton({ onClick, size = '', text = 'Delete' }: Props) {
    return (
        <button type="button" onClick={onClick} className={`flex items-center ${size}`}>
            <DeleteIcon styleName={'text-red-400 dark:text-red-400'} />
            <span className="text-sm text-red-500 dark:text-red-400 ml-1">{text}</span>
        </button>
    );
}
