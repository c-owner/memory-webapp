type Props = {
    text: string;
    onClick?: () => void;
    size?: 'sm' | 'md' | 'lg';
};

function getSizeStyle(size: string) {
    switch (size) {
        case 'sm':
            return 'p-[0.15rem] text-sm';
        case 'md':
            return 'p-[0.3rem] text-md';
        case 'lg':
            return 'p-4 text-lg';
        default:
            throw new Error('Invalid size');
    }
}
export default function ColorButton({ text, onClick, size = 'sm' }: Props) {
    return (
        <div
            className={`rounded-md bg-gradient-to-bl from-emerald-600 via-violet-700 to-indigo-300 ${getSizeStyle(
                size
            )} dark:from-emerald-500 dark:via-violet-600 dark:to-indigo-200`}
        >
            <button
                className={`w-full bg-white rounded-sm hover:opacity-90 transition-opacity ${getSizeStyle(
                    size
                )}
                dark:bg-gray-800 dark:text-gray-100`}
                onClick={onClick}
            >
                {text}
            </button>
        </div>
    );
}
