'use client';

import { useState } from 'react';
import DefaultButton from '@/components/ui/DefaultButton';
import useMe from '@/hooks/me';
import DefaultAlert from '@/components/DefaultAlert';
import ModalPortal from '@/components/ui/ModalPortal';
import { useRouter } from 'next/navigation';
import GridSpinner from '@/components/ui/GridSpinner';

export default function EmailLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [alert, setAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successType, setSuccessType] = useState(false);
    const [message, setMessage] = useState({
        title: '',
        content: ''
    });
    const { emailLogin } = useMe();
    const router = useRouter();

    const loginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const result = await emailLogin(email, password).then(
            ({ response: data, isLoading, error, mutate }) => {
                setAlert(true);
                setLoading(isLoading);
                if (data && !data.ok) {
                    setSuccessType(false);
                    setLoading(false);
                    setMessage({
                        title: '로그인 실패',
                        content: data.error || '로그인에 실패했습니다.'
                    });
                    return false;
                }
                if (data && data.ok) {
                    setSuccessType(true);
                    setLoading(false);
                    setMessage({
                        title: '로그인 성공',
                        content: '로그인에 성공했습니다.'
                    });
                    submitAfter();
                    return true;
                }
            }
        );
    };
    const submitAfter = () => {
        setLoading(true);
        const timeHandler = setTimeout(() => {
            setAlert(false);
            router.push('/');
            return () => {
                clearTimeout(timeHandler);
            };
        }, 2200);
    };

    return (
        <form onSubmit={loginSubmit} className="flex flex-col gap-4 px-14 w-full">
            <label htmlFor="email" className="text-xl font-semibold">
                Email
            </label>
            <input
                id="email"
                name="email"
                type={'email'}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                minLength={7}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded-md bg-gray-100
                focus:outline-none focus:ring-2 focus:ring-emerald-500
                dark:focus:ring-emerald-400
                dark:bg-gray-800 dark:text-gray-100"
            />
            <DefaultButton text={`OK`} />
            {alert && (
                <ModalPortal>
                    <DefaultAlert onClose={() => setAlert(false)}>
                        {/* eslint-disable-next-line no-nested-ternary */}
                        {loading ? (
                            <div className="text-center">
                                <GridSpinner />
                            </div>
                        ) : successType ? (
                            <div className="flex items-center justify-center flex-col gap-3">
                                <div className="text-2xl font-bold absolute top-4">
                                    {message.title}
                                </div>
                                <div className="pt-3 text-md text-emerald-700">
                                    {message.content}
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center flex-col gap-3 w-full">
                                <div className="text-xl font-bold absolute top-4">
                                    {message.title}
                                </div>
                                <div className="px-3 text-md text-red-500 break-keep max-h-32 overflow-y-auto">
                                    {message.content}
                                </div>
                            </div>
                        )}
                    </DefaultAlert>
                </ModalPortal>
            )}
        </form>
    );
}
