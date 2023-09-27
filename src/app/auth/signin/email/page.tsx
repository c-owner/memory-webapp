import EmailLogin from '@/components/auth/EmailLogin';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Link from 'next/link';

export default async function EmailPage() {
    const session = await getServerSession(authOptions);

    return (
        <section className="w-full py-24 grid place-items-center h-full gap-3">
            <h1 className={'text-3xl font-semibold'}>Login</h1>
            <EmailLogin />
            <Link href="/auth/signup">
                <span className="dark:text-sky-300 text-sky-700 dark:hover:text-sky-500 hover:text-sky-700">
                    회원가입이 필요하십니까?
                </span>
            </Link>
        </section>
    );
}
