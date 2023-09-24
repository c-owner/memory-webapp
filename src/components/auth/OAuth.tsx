'use client';

import { ClientSafeProvider, signIn } from 'next-auth/react';
import ColorButton from '@/components/ui/ColorButton';

type Props = {
    providers: Record<string, ClientSafeProvider>;
    callbackUrl: string;
};
export default function OAuth({ providers, callbackUrl }: Props) {
    return (
        <>
            {Object.values(providers).map(({ id, name }) => (
                <ColorButton
                    key={id}
                    text={`${name}`}
                    size="md"
                    onClick={() => signIn(id, { callbackUrl })}
                />
            ))}
        </>
    );
}
