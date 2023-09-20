type Props = {
    text: string;
    onClick: () => void;
    size?: 'sm' | 'lg';
};

export default function ColorButton({ text, onClick, size = 'sm' }: Props) {
    return (
        <div
            className={`rounded-md bg-gradient-to-bl from-emerald-600 via-violet-700 to-indigo-300 ${
                size === 'lg' ? 'p-[0.3rem]' : 'p-[0.15rem]'
            }`}
        >
            <button
                className={`bg-white rounded-sm hover:opacity-90 transition-opacity ${
                    size === 'lg' ? 'p-4 text-2xl' : 'p-[0.3rem] text-base'
                }`}
                onClick={onClick}
            >
                {text}
            </button>
        </div>
    );
}
