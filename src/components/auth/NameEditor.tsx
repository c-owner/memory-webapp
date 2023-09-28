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
    const [memberName, setMemberName] = useState('');
    const [password, setPassword] = useState('');
    const [nameChange, setNameChange] = useState(false);
    const [passwordChange, setPasswordChange] = useState(false);

    const { updateUser } = useMe();
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState({
        message: '',
        status: 200
    });
    const [isError, setIsError] = useState(false);
    const submitName = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg({
            message: '',
            status: 200
        });

        const { data, isLoading, error, mutate } = await updateUser({
            memberName,
            memberPassword: password
        });
        if (data) {
            if (data.status !== 200) {
                setLoading(false);
                setIsError(true);
                setErrorMsg({
                    message: data.message,
                    status: data.status
                });
            } else {
                onClose();
            }
        }
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
                className={`bg-white relative sm:fixed top-8 sm:top-1/4 overflow-y-auto
                dark:bg-apple-dark-2 rounded-lg shadow-2xl p-3 dark:text-white sm:px-40 sm:py-14
                    ${loading && 'opacity-10'}
                `}
            >
                <h1 className="dark:text-emerald-200 text-center text-2xl ">Update My Info</h1>
                <form onSubmit={submitName} className="w-full h-full text-left pt-3">
                    <div className="flex flex-col gap-4 pb-5">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name">Name</label>
                            <div className="flex items-center justify-center gap-4">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Name"
                                    disabled={!nameChange}
                                    value={memberName}
                                    onChange={(event) => setMemberName(event.target.value)}
                                    className="border border-gray-300 dark:text-black dark:border-neutral-700 rounded-md p-2"
                                />
                                <button
                                    type="button"
                                    onClick={() => setNameChange(!nameChange)}
                                    className="text-sm text-sky-500 border border-sky-500 rounded-md p-2 bg-white dark:bg-apple-dark-2 dark:text-white shadow-md"
                                >
                                    Change Username
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password">Password Change</label>
                            <div className="flex items-center justify-center gap-4">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    disabled={!passwordChange}
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    className="border border-gray-300 dark:text-black dark:border-neutral-700 rounded-md p-2"
                                />
                                <button
                                    type="button"
                                    onClick={() => setPasswordChange(!passwordChange)}
                                    className="text-sm text-sky-500 border border-sky-500 rounded-md p-2 bg-white dark:bg-apple-dark-2 dark:text-white shadow-md"
                                >
                                    Change Password
                                </button>
                            </div>
                        </div>
                    </div>
                    {isError && (
                        <div className="text-center pb-3">
                            <div className="text-lg">Oops!</div>
                            <div className="text-sm text-red-400">{errorMsg.status}</div>
                            <div className="text-md text-red-500">{errorMsg.message}</div>
                        </div>
                    )}
                    <DefaultButton text={'Save'} w_size={'w-full'} onClick={() => submitName} />
                </form>
            </div>
        </section>
    );
}
