import { AuthUser } from '@/model/user';

declare module 'next-auth' {
    interface Session {
        user: AuthUser;
    }
    interface JWT {
        // 위 코드예시에서 name과 email을 보낸것들에 대한 값에 대해 타입설정을 해준다
        user?: {
            name?: string | undefined | null;
            email?: string | undefined | null;
        };
    }
}
