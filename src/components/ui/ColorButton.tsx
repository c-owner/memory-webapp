type Props = {
    text: string;
    onClick?: () => void;
    size?: 'sm' | 'lg';
};

export default function ColorButton({ text, onClick, size = 'sm' }: Props) {
    return (
        <div
            className={`rounded-md bg-gradient-to-bl from-emerald-600 via-violet-700 to-indigo-300 ${
                size === 'lg' ? 'p-[0.3rem]' : 'p-[0.15rem]'
            } dark:from-emerald-500 dark:via-violet-600 dark:to-indigo-200`}
        >
            <button
                className={`w-full bg-white rounded-sm hover:opacity-90 transition-opacity ${
                    size === 'lg' ? 'p-4 text-2xl' : 'p-[0.3rem] text-base'
                }
                dark:bg-gray-800 dark:text-gray-100`}
                onClick={onClick}
            >
                {text}
            </button>
        </div>
    );
}
