import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { newUser } from '@/service/user';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_OAUTH_ID || '',
            clientSecret: process.env.GOOGLE_OAUTH_SECRET || ''
        }),
        // ...add more providers here
        CredentialsProvider({
            name: 'Test',
            credentials: {
                accessToken: { label: 'accessToken', type: 'text' }
            },
            async authorize(credentials) {
                if (!credentials?.accessToken) return null;
                const { accessToken } = credentials;

                const session = await axios.get(`${process.env.API_DOMAIN}/members/me`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

                console.log(session);

                return null;
            }
        })
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
