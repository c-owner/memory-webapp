export type AuthUser = {
    id: string;
    email: string;
    memberName: string;
    username: string;
    image?: string | null | undefined;
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

export type UpdateUser = {
    memberName?: string;
    memberPassword?: string;
};

export type SimpleUser = Pick<AuthUser, 'id' | 'memberName' | 'image'>;

export type HomeUser = AuthUser & {
    following: SimpleUser[];
    followers: SimpleUser[];
};

export type SearchUser = {
    id: string; // memberId
    memberEmail: string;
    memberName: string;
    following: [];
    followers: [];
    followersCnt: number;
    followingCnt: number;
    followingStatus: boolean;
};

export type ProfileUser = SearchUser & {
    posts: number;
};
