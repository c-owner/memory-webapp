'use client';

import { useState } from 'react';
import DefaultButton from '@/components/ui/DefaultButton';
import useMe from '@/hooks/me';

export default function EmailRegister() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const { addUser } = useMe();

    /* 6자리의 랜덤 번호 */
    const randomNum = Math.floor(Math.random() * 1000000);

    const name = `익명 -${randomNum}`;
    const loginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            alert('비밀번호가 일치하지 않습니다.');
        }
        await addUser({ email, password, name, image: '' });
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
        </form>
    );
}
