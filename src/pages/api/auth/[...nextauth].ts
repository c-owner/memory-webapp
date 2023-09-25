import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider, { GithubProfile } from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            name: 'Google',
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
            name: '다른 방법으로 로그인',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'your-cool-username'
                },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: 'your-awesome-password'
                }
            },
            async authorize(credentials) {
                if (!credentials) {
                    throw new Error(' 잘못된 입력입니다. ');
                }

                const { email, password } = credentials;
                const exUser = await axios
                    .post(`${process.env.API_DOMAIN}/members/sign-in`, {
                        memberEmail: email,
                        memberPassword: password
                    })
                    .then((res) => {
                        return res;
                    })
                    .catch((err) => {
                        throw new Error(err.response.data.errorMessage);
                    });

                if (exUser) {
                    const user = await axios
                        .get(`${process.env.API_DOMAIN}/members/me`, {
                            headers: {
                                Authorization: `${exUser.data.responseObject.grantType} ${exUser.data.responseObject.accessToken}`
                            }
                        })
                        .then((res) => {
                            return res.data.responseObject;
                        })
                        .catch((err) => {
                            throw new Error(err.response.data.errorMessage);
                        });
                    return {
                        ...user,
                        id: user.memberId,
                        email: user.memberEmail,
                        name: user.memberName,
                        username: user.memberEmail?.split('@')[0] || '',
                        image: user.memberImage
                    };
                }

                return null;
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/api/auth/signin'
    },
    callbacks: {
        // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
        async jwt({ token, user }) {
            if (user) {
                token.email = user.email;
            }
            return token;
        },
        // If you want to use the role in client components
        async session({ session, token }) {
            if (session?.user) {
                session.user = {
                    ...session?.user,
                    id: session.user.id,
                    username: session.user.email?.split('@')[0],
                    image: session.user.image || '',
                    following: session.user.following || [],
                    followers: session.user.followers || []
                };
            }
            return session;
        }
    }
};

export default NextAuth(authOptions);
