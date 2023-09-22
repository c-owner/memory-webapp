import EmailLogin from '@/components/auth/EmailLogin';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';

export default async function EmailPage() {
    console.log('??????');
    const session = await getServerSession(authOptions);
    if (session) {
        redirect('/');
    }

    return (
        <section className="w-full py-24 grid place-items-center h-full">
            <EmailLogin />
        </section>
    );
}
