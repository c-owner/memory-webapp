'use client';

import DeleteIcon from '@/components/ui/icon/DeleteIcon';

type Props = {
    onClick: () => void;
};
export default function DeleteButton({ onClick }: Props) {
    return (
        <button type="button" onClick={onClick} className="flex items-center">
            <DeleteIcon styleName={'text-red-400 dark:text-red-400'} />
            <span className="text-sm text-red-500 dark:text-red-400 ml-1">Delete</span>
        </button>
    );
}
