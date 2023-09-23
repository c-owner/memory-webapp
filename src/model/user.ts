export type AuthUser = {
    email: string;
    memberName: string;
    image?: string | null;
};

export type OAuthUser = {
    email: string;
    memberName: string;
    image?: string | null | undefined;
};

export type SignUser = {
    email: string;
    password: string;
};
