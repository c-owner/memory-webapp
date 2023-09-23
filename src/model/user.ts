export type AuthUser = {
    email: string;
    name: string;
    username: string;
    image?: string | null;
    password?: string | null;
};

export type OAuthUser = {
    id: string;
    email: string;
    name: string;
    username: string;
    image?: string | null | undefined;
};

export type LoginUser = {
    email: string;
    password: string;
};
