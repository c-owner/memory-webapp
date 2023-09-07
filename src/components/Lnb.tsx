import Link from 'next/link';

export default function Lnb() {
    // tailwindcss transition으로 애니메이션 효과 넣기
    return (
        <div className="w-64 h-screen bg-white dark:bg-gray-800 fixed top-0 left-0 transition duration-500 ease-in-out">
            <div className="flex items-center justify-center mt-10">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Memory</h1>
            </div>
            <nav className="mt-10">
                <Link
                    href="/"
                    className="flex items-center mt-4 py-2 px-6 bg-gray-700 bg-opacity-25 text-gray-600 dark:text-gray-100"
                >
                    <span className="mx-3">Home</span>
                </Link>
            </nav>
        </div>
    );
}
