import Link from 'next/link';

const menus = [
    {
        name: 'Home',
        path: '/'
    },
    {
        name: 'Search',
        path: '/search'
    },
    {
        name: 'Sign In',
        path: '/auth/signin'
    }
];
export default function Lnb() {
    return (
        <div className="w-64 h-screen bg-white dark:bg-gray-800 fixed top-0 left-0 transition duration-500 ease-in-out">
            <div className="flex items-center justify-center mt-10">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Memory</h1>
            </div>
            <nav className="mt-10">
                {menus.map((menu) => (
                    <Link
                        className="flex items-center mt-4 py-2 px-6 bg-gray-700 bg-opacity-25 text-gray-600 dark:text-gray-100"
                        href={menu.path}
                        key={menu.name}
                    >
                        <span className="mx-3">{menu.name}</span>
                    </Link>
                ))}
            </nav>
        </div>
    );
}
