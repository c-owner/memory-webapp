import EmailLogin from '@/components/auth/EmailLogin';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function EmailPage() {
    const session = await getServerSession(authOptions);
    if (session) {
        redirect('/');
    }

    return (
        <section className="w-full py-24 grid place-items-center h-full">
            <h1 className={'text-3xl font-semibold'}>Login</h1>
            <EmailLogin />
        </section>
    );
}
