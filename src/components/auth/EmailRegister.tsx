'use client';

import { useState } from 'react';
import DefaultButton from '@/components/ui/DefaultButton';
import useMe from '@/hooks/me';
import ModalPortal from '@/components/ui/ModalPortal';
import DefaultAlert from '@/components/DefaultAlert';
import { useRouter } from 'next/navigation';
import GridSpinner from '@/components/ui/GridSpinner';

export default function EmailRegister() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const { addUser } = useMe();

    const [alert, setAlert] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const registerSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            setAlert(true);
            setMessage('비밀번호가 일치하지 않습니다.');
        }
        await addUser({ email, password }).then(({ data, isLoading, mutate }) => {
            setLoading(isLoading);
            if (data) {
                setAlert(true);
                setMessage(
                    data?.successMessage || data?.errorMessage || '회원가입에 실패했습니다.'
                );
                mutate();

                if (data?.successMessage) {
                    const timeHandler = setTimeout(() => {
                        setAlert(false);
                        router.push('/');
                        return () => {
                            clearTimeout(timeHandler);
                        };
                    }, 2000);
                }
            }
        });
    };
    return (
        <form onSubmit={registerSubmit} className="flex flex-col gap-4 px-14 w-full">
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
            <label htmlFor={'passwordConfirm'} className="text-xl font-semibold">
                Password Confirm
            </label>
            <input
                id="passwordConfirm"
                name="passwordConfirm"
                type={'password'}
                placeholder="Password Confirm"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                minLength={7}
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
                        ) : (
                            <div className="text-xl font-semibold">
                                <h1 className="text-xl font-bold">알림</h1>
                                <p className="text-md text-emerald-700">{message}</p>
                            </div>
                        )}
                    </DefaultAlert>
                </ModalPortal>
            )}
        </form>
    );
}
