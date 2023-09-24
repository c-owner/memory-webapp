export type AuthUser = {
    email: string;
    name: string;
    username: string;
    image?: string | null | undefined;
};

export type OAuthUser = {
    email: string;
    name: string;
    image?: string | null | undefined;
};

export type SignUser = {
    email: string;
    password: string;
};

export type SimpleUser = Pick<AuthUser, 'name' | 'image'>;

export type HomeUser = AuthUser & {
    following: SimpleUser[];
    followers: SimpleUser[];
    bookmarks: string[];
};

export type SearchUser = AuthUser & {
    following: number;
    followers: number;
};

export type ProfileUser = SearchUser & {
    posts: number;
};
