import { AuthUser } from '@/model/user';

declare module 'next-auth' {
    interface Session {
        user: AuthUser;
    }
    interface JWT {
        user?: {
            name?: string | undefined | null;
            email?: string | undefined | null;
            accessToken?: string | undefined | null;
        };
    }
}
