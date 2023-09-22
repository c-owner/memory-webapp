type Props = {
    text: string;
};
export default function DefaultButton({ text }: Props) {
    return (
        <button
            type="submit"
            className="w-full uppercase p-2 rounded-md bg-gradient-to-bl from-emerald-600 via-violet-700 to-indigo-300
            hover:opacity-90 transition-opacity text-white font-semibold text-xl
            focus:outline-none focus:ring-2 focus:ring-emerald-500
            dark:focus:ring-emerald-400
            dark:from-emerald-500 dark:via-violet-600 dark:to-indigo-200"
        >
            {text}
        </button>
    );
}
