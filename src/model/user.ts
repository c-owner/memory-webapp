export type AuthUser = {
    id: string;
    name: string;
    username: string;
    email: string;
    image?: string;
    password?: string;
};

export type OAuthUser = {
    id: string;
    email: string;
    name: string;
    username: string;
    image?: string | null;
};

export type NormalUser = {
    email: string;
    password: string;
    image?: string | null;
};

/*
export type SimpleUser = Pick<AuthUser, 'username' | 'image'>;

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
