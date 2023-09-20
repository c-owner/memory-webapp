import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { getProviders } from 'next-auth/react';
import { Metadata } from 'next';
import Signin from '@/components/Signin';
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
    if (session) {
        redirect('/');
    }
    const providers = (await getProviders()) ?? {};
    return (
        <section className="flex justify-center mt-24">
            <Signin providers={providers} callbackUrl={callbackUrl ?? '/'} />
        </section>
    );
}
