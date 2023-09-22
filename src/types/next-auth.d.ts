import { OAuthUser } from '@/model/user';

declare module 'next-auth' {
    interface Session {
        user: OAuthUser;
    }
}
