'use client';

import { AuthUser } from '@/model/user';
import ColorButton from '@/components/ui/ColorButton';
import DefaultButton from '@/components/ui/DefaultButton';
import { useState } from 'react';
import useMe from '@/hooks/me';
import { GridLoader } from 'react-spinners';
import GridSpinner from '@/components/ui/GridSpinner';

type Props = {
    username: AuthUser['username'];
    onClose: () => void;
};
export default function NameEditor({ username, onClose }: Props) {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [password, setPassword] = useState('');
    const { changeName } = useMe();
    const [loading, setLoading] = useState(false);
    const submitName = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const data = await changeName({
            name,
            image,
            password
        });
        console.log('data...', data);
        setLoading(false);
    };

    return (
        <section
            role="presentation"
            className="fixed top-0 left-0 flex flex-col items-center w-full h-full z-40 bg-neutral-900/70"
            onClick={(event) => {
                if (event.target === event.currentTarget) {
                    // 브라우저API, 외부 섹션 태그를 클릭했을 경우 모달을 닫는다.
                    onClose();
                }
            }}
        >
            {loading && (
                <div className="text-center absolute right-1/2 left-1/2 bottom-1/2">
                    <GridSpinner />
                </div>
            )}
            <div
                className={`bg-white fixed top-1/3 dark:bg-apple-dark-2 rounded-lg shadow-2xl p-3 dark:text-white px-40 py-14
                    ${loading && 'opacity-10'}
                `}
            >
                <h1 className="dark:text-emerald-200 text-center text-2xl ">닉네임 변경</h1>
                <form onSubmit={submitName} className="w-full h-full text-left pt-3">
                    <div className="flex flex-col gap-4 pb-5">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                className="border border-gray-300 dark:text-black dark:border-neutral-700 rounded-md p-2"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password">Password Change</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                className="border border-gray-300 dark:text-black dark:border-neutral-700 rounded-md p-2"
                            />
                        </div>
                    </div>

                    <DefaultButton text={'Save'} w_size={'w-full'} onClick={() => submitName} />
                </form>
            </div>
        </section>
    );
}
