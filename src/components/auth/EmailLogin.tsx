'use client';

import { useState } from 'react';
import DefaultButton from '@/components/ui/DefaultButton';
import useMe from '@/hooks/me';
import DefaultAlert from '@/components/DefaultAlert';
import ModalPortal from '@/components/ui/ModalPortal';
import { useRouter } from 'next/navigation';
import GridSpinner from '@/components/ui/GridSpinner';
import { signIn } from 'next-auth/react';

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

        const result = await signIn('credentials', {
            // 로그인 실패 시 새로고침 여부
            redirect: false,
            email,
            password
        });

        console.log(result);

        if (result?.error) {
            setAlert(true);
            setSuccessType(false);
            setMessage({
                title: '로그인 실패',
                content: result.error
            });
        } else {
            setSuccessType(true);
            setMessage({
                title: '로그인 성공',
                content: '로그인에 성공했습니다.'
            });
            const timeHandler = setTimeout(() => {
                setAlert(false);
                router.push('/');
                return () => {
                    clearTimeout(timeHandler);
                };
            }, 2000);
        }

        /* await emailLogin({ email, password }).then(({ data, isLoading, error, mutate }) => {
            setLoading(isLoading);
            setAlert(true);
            if (data && data.errorCode) {
                setSuccessType(false);
                setMessage({
                    title: '로그인 실패',
                    content: data.errorMessage
                });
            }
            if (data && data.responseObject) {
                setSuccessType(true);
                setMessage({
                    title: '로그인 성공',
                    content: '로그인에 성공했습니다.'
                });
                mutate();
                const timeHandler = setTimeout(() => {
                    setAlert(false);
                    router.push('/');
                    return () => {
                        clearTimeout(timeHandler);
                    };
                }, 2000);
            } else {
                setSuccessType(false);
                setMessage({
                    title: '로그인 실패',
                    content: '로그인에 실패했습니다.'
                });
            }
        }); */
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
                                <div className="text-2xl font-bold">{message.title}</div>
                                <div className="pt-3 text-md text-emerald-700">
                                    {message.content}
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center flex-col gap-3">
                                <div className="text-xl font-bold">{message.title}</div>
                                <span className="pt-3 text-md text-red-500">{message.content}</span>
                            </div>
                        )}
                    </DefaultAlert>
                </ModalPortal>
            )}
        </form>
    );
}
