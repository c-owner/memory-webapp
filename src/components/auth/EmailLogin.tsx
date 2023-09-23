'use client';

import { useState } from 'react';
import DefaultButton from '@/components/ui/DefaultButton';
import useMe from '@/hooks/me';
import DefaultAlert from '@/components/DefaultAlert';
import ModalPortal from '@/components/ui/ModalPortal';
import { useRouter } from 'next/navigation';

export default function EmailLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [alert, setAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    const { emailLogin } = useMe();
    const router = useRouter();

    const loginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await emailLogin({ email, password }).then(({ data, isLoading, error, mutate }) => {
            setLoading(isLoading);
            if (data && data.accessToken) {
                setAlert(true);
            }
            const timeHandler = setTimeout(() => {
                setAlert(false);
                router.push('/');
                return () => {
                    clearTimeout(timeHandler);
                };
            }, 2000);
        });
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
                        {loading ? (
                            <p className="text-xl font-semibold">Loading...</p>
                        ) : (
                            <p className="text-xl font-semibold">Login Success</p>
                        )}
                    </DefaultAlert>
                </ModalPortal>
            )}
        </form>
    );
}
