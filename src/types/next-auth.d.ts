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
            memberEmail: string;
            memberName: string;
            username: string;
            // image?: string | null | undefined;
            following: [];
            followers: [];
            followingCnt: number;
            followersCnt: number;
            followingStatus: boolean;
            memories: string[];
            accessToken: string;
        } & DefaultSession;
    }

    interface User extends AuthUser, DefaultUser {
        image?: string | undefined | null;
        id: string;
        accessToken: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT extends DefaultJWT {
        id: string;
        accessToken: string;
    }
}
