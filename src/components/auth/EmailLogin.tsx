'use client';

export default function EmailLogin() {
    return (
        <form className="flex flex-col gap-4 px-32 w-full">
            <label htmlFor="email" className="text-xl font-semibold">
                Email
            </label>
            <input
                id="email"
                name="email"
                type={'email'}
                placeholder="Email"
                className="w-full p-2 rounded-md bg-gray-100
                focus:outline-none focus:ring-2 focus:ring-emerald-500
                dark:focus:ring-emerald-400
                dark:bg-gray-800 dark:text-gray-100"
            />
            <label htmlFor="password" className="text-xl font-semibold">
                Password
            </label>
            <input
                id="password"
                name="password"
                type={'password'}
                placeholder="Password"
                className="w-full p-2 rounded-md bg-gray-100
                focus:outline-none focus:ring-2 focus:ring-emerald-500
                dark:focus:ring-emerald-400
                dark:bg-gray-800 dark:text-gray-100"
            />
            <button
                type="submit"
                className="w-full p-2 rounded-md bg-gradient-to-bl from-emerald-600 via-violet-700 to-indigo-300
            hover:opacity-90 transition-opacity text-white font-semibold text-xl
            focus:outline-none focus:ring-2 focus:ring-emerald-500
            dark:focus:ring-emerald-400
            dark:from-emerald-500 dark:via-violet-600 dark:to-indigo-200"
            >
                Sign In
            </button>
        </form>
    );
}
