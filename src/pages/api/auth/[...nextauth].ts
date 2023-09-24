import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { newUser } from '@/service/user';

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_OAUTH_ID || '',
            clientSecret: process.env.GOOGLE_OAUTH_SECRET || ''
        })
        // ...add more providers here
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/auth/signin'
    },
    callbacks: {
        async signIn({ user: { email, name, image, id } }) {
            if (!email) {
                return false;
            }

            await newUser({
                id,
                email,
                image
            });

            return true;
        },
        async session({ session, token }) {
            const user = session?.user;

            if (user) {
                session.user = {
                    ...user,
                    name: user.email?.split('@')[0] || ''
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
