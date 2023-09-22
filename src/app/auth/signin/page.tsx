import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { getProviders } from 'next-auth/react';
import { Metadata } from 'next';
import OAuth from '@/components/auth/OAuth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import ColorButton from '@/components/ui/ColorButton';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Sign In',
    description: 'Signup or Login to Memory'
};

type Props = {
    searchParams: {
        callbackUrl: string;
    };
};

export default async function SignInPage({ searchParams: { callbackUrl } }: Props) {
    const session = await getServerSession(authOptions);
    if (session) {
        redirect('/');
    }
    const providers = (await getProviders()) ?? {};

    return (
        <section className="flex flex-col gap-10 justify-center mt-24">
            <h1 className="text-4xl font-bold text-center">Sign In</h1>

            <OAuth providers={providers} callbackUrl={callbackUrl ?? '/'} />
            <Link href="/auth/signin/email">
                <ColorButton text={'Sign In With Email'} size="lg" />
            </Link>
            <Link href="/auth/signup">
                <span className="dark:text-sky-300 text-sky-700 dark:hover:text-sky-500 hover:text-sky-700">
                    회원가입이 필요하십니까?
                </span>
            </Link>
        </section>
    );
}
