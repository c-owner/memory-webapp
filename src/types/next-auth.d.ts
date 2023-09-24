import { AuthUser } from '@/model/user';
import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
    /* interface Session {
        user: AuthUser;
    } */
    interface Session {
        user: {
            id: string;
            email: string;
            name: string;
            username: string;
            image?: string | null | undefined;
        } & DefaultSession;
    }

    interface User extends AuthUser, DefaultUser {
        email: string;
        name: string;
        image?: string | undefined | null;
    }
}

declare module 'next-auth/jwt' {
    interface JWT extends DefaultJWT {
        email: string;
    }
}
