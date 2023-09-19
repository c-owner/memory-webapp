import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_OAUTH_ID || '',
            clientSecret: process.env.GOOGLE_OAUTH_SECRET || ''
        })
        // ...add more providers here
    ],
    pages: {
        signIn: '/auth/signin'
    },
    callbacks: {
        async signIn({ user: { id, name, image, email } }) {
            if (!email) {
                return false;
            }

            return true;
        },
        async session({ session, token }) {
            const user = session?.user;
            if (user) {
                session.user = {
                    ...user,
                    username: user.email?.split('@')[0] || '',
                    id: token.id as string
                };
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        }
    }
};

export default NextAuth(authOptions);
