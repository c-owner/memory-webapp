export type AuthUser = {
    email: string;
    name: string;
    image?: string | null;
    password?: string | null;
};

export type OAuthUser = {
    email: string;
    name: string;
    image?: string | null | undefined;
};

export type NormalUser = {
    email: string;
    password: string;
    image?: string | null;
};

/*

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
}; */
