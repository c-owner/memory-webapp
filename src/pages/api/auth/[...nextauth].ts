import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider, { GithubProfile } from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_OAUTH_ID || '',
            clientSecret: process.env.GOOGLE_OAUTH_SECRET || ''
        }),
        GithubProvider({
            profile(profile: GithubProfile) {
                // console.log(profile)
                return {
                    ...profile,
                    id: profile.id.toString(),
                    email: profile.email ?? '',
                    name: profile.id.toString(),
                    username: profile.email?.split('@')[0] || '',
                    image: profile.avatar_url
                };
            },
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        // ...add more providers here
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'your-cool-username'
                },
                username: {
                    label: 'Username',
                    type: 'text',
                    placeholder: 'your-cool-username'
                },
                name: {
                    label: 'name',
                    type: 'text',
                    placeholder: 'your-cool-username'
                },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: 'your-awesome-password'
                }
            },
            async authorize(credentials) {
                // This is where you need to retrieve user data
                // to verify with credentials
                // Docs: https://next-auth.js.org/configuration/providers/credentials
                console.log(credentials);
                const user = {
                    id: '1',
                    email: 'test@t.ts',
                    name: 'test',
                    username: '',
                    password: 'nextauth',
                    image: ''
                };

                if (
                    credentials?.email === user.email &&
                    credentials?.password === user.password &&
                    credentials?.name === user.name &&
                    credentials?.username === user.username
                ) {
                    return user;
                } else {
                    return null;
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    /* pages: {
        signIn: '/auth/signin'
    }, */
    callbacks: {
        // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
        async jwt({ token, user }) {
            console.log('user: ', user);
            console.log('token: ', token);
            if (user) token.email = user.email;
            return token;
        },
        // If you want to use the role in client components
        async session({ session, token }) {
            if (session?.user) {
                session.user = {
                    ...session?.user,
                    username: session.user.email?.split('@')[0]
                };
            }
            return session;
        }
    }
};

export default NextAuth(authOptions);
