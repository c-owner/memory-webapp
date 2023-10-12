import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider, { GithubProfile } from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        /* GoogleProvider({
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
                    memberName: profile.id.toString(),
                    username: profile.email?.split('@')[0] || '',
                    image: profile.avatar_url,
                    grantType: '',
                    accessToken: ''
                };
            },
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }), */
        // ...add more providers here
        CredentialsProvider({
            name: '다른 방법으로 로그인',
            async authorize(credentials) {
                if (!credentials) {
                    throw new Error(' 잘못된 입력입니다. ');
                }

                const { email, password } = credentials;

                if (!email || !password) {
                    return null;
                } else {
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
                            id: user.id,
                            memberEmail: user.memberEmail,
                            memberName: user.memberName,
                            username: user.memberEmail?.split('@')[0] || '',
                            image: user.memberImage,
                            following: user.following || [],
                            followers: user.followers || [],
                            accessToken: `${exUser.data.responseObject.grantType} ${exUser.data.responseObject.accessToken}`
                        };
                    }
                }

                return null;
            },
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
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    /* pages: {
        signIn: '/api/auth/signin'
    }, */
    session: {
        strategy: 'jwt',
        // 1 day
        maxAge: 1 * 23 * 60 * 60
        // 30 min in seconds
        // updateAge: 30 * 60
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.type === 'oauth' && profile) {
                const { email, name } = profile;
                // const res = await registerUserProfile(email, 'a12345678');
                // console.log(res);
                return true;
            }
            return true;
        },
        // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.accessToken = user.accessToken;
            }
            return token;
        },
        // If you want to use the role in client components
        async session({ session, token }) {
            if (session?.user) {
                const user = await axios
                    .get(`${process.env.API_DOMAIN}/members/me`, {
                        headers: {
                            Authorization: token.accessToken
                        }
                    })
                    .then((res) => {
                        return res.data.responseObject;
                    })
                    .catch((err) => {
                        // console.log('session error', err);
                        return null;
                    });
                session.user = {
                    ...user,
                    id: user.id,
                    email: user.memberEmail,
                    memberName: user.memberName,
                    username: user.memberEmail?.split('@')[0] || '',
                    image: user.memberImage,
                    following: user.following || [],
                    followers: user.followers || [],
                    accessToken: token.accessToken
                };
            }
            return session;
        }
    }
};

export default NextAuth(authOptions);
