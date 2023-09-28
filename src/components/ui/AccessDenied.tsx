import Link from 'next/link';
import DefaultButton from '@/components/ui/DefaultButton';
import { signIn } from 'next-auth/react';

export default function AccessDenied() {
    /* 이전 페이지로 갈 함수 구현  */
    /* if (window) {
        const { history } = window;
    }
    const path = history.length > 2 ? history.go(-1) : '/'; */

    return (
        <div
            className="m-auto py-5 px-5 w-full flex flex-col gap-3 justify-center items-center
        bg-gradient-to-r from-blue-400 to-purple-500 text-white
        dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 dark:text-gray-100
         h-[calc(100vh-65px)]"
        >
            <h1 className="text-2xl text-red-800 dark:text-red-500">
                <code>Access Denied</code>
            </h1>
            <hr className="w-1/2" />
            <h3 className="text-xl text-center break-words text-neutral-800 dark:text-fuchsia-700">
                You dont have permission to view this site.
            </h3>
            <h3 className="w3-center w3-animate-zoom touch-pinch-zoom hover:cursor-zoom-in">
                🚫🚫🚫🚫
            </h3>
            <h6 className="text-red-700 border-b border-red-400">error code:403 forbidden</h6>
            <DefaultButton
                text="Sign In?"
                w_size="w-auto shadow-md dark:hover:text-sky-500 hover:text-sky-700"
                onClick={() => signIn()}
            />
        </div>
    );
}
