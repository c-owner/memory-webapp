'use client';

import { ClientSafeProvider, signIn } from 'next-auth/react';
import ColorButton from '@/components/ui/ColorButton';

type Props = {
    providers: Record<string, ClientSafeProvider>;
    callbackUrl: string;
};
export default function Signin({ providers, callbackUrl }: Props) {
    return (
        <>
            {Object.values(providers).map(({ id, name }) => (
                <ColorButton
                    key={id}
                    text={`Sign In with ${name}`}
                    size="lg"
                    onClick={() => signIn(id, { callbackUrl })}
                />
            ))}
        </>
    );
}
