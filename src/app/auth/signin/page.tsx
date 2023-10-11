import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { getProviders } from 'next-auth/react';
import { Metadata } from 'next';
import OAuth from '@/components/auth/OAuth';
import ColorButton from '@/components/ui/ColorButton';
import Link from 'next/link';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

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
    const providers = (await getProviders()) ?? {};

    if (session) {
        redirect('/');
    }

    return (
        <section className="flex flex-col gap-10 justify-center my-5 sm:my-24">
            <h1 className="text-4xl font-bold text-center">Sign In</h1>

            <OAuth providers={providers} callbackUrl={callbackUrl ?? '/'} />

            <div className="border-b border-2 w-full"></div>
            <Link href="/auth/signin/email">
                <ColorButton text={'Sign In With Email'} size="md" />
            </Link>
            <Link href="/auth/signup">
                <span className="dark:text-sky-300 text-sky-700 dark:hover:text-sky-500 hover:text-sky-700">
                    회원가입이 필요하십니까?
                </span>
            </Link>
        </section>
    );
}
