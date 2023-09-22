'use client';

import { useState } from 'react';
import DefaultButton from '@/components/ui/DefaultButton';

export default function EmailRegister() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        return false;
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
                minLength={8}
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
                minLength={8}
                className="w-full p-2 rounded-md bg-gray-100
                focus:outline-none focus:ring-2 focus:ring-emerald-500
                dark:focus:ring-emerald-400
                dark:bg-gray-800 dark:text-gray-100"
            />

            <DefaultButton text={`OK`} />
        </form>
    );
}
