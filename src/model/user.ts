export type AuthUser = {
    id: string;
    memberEmail: string;
    memberName: string;
    username: string;
    following: [];
    followers: [];
    followersCnt: number;
    followingCnt: number;
    followingStatus: boolean;
    memories: string[];
    accessToken: string;
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

export type HomeUser = {
    id: string; // memberId
    memberEmail: string;
    memberName: string;
    username: string;
    following: [];
    followers: [];
    followersCnt: number;
    followingCnt: number;
    followingStatus: boolean;
    memories: string[];
    accessToken: string;
};

export type SearchUser = {
    id: string; // memberId
    memberEmail: string;
    memberName: string;
    username: string;
    following: [];
    followers: [];
    followersCnt: number;
    followingCnt: number;
    followingStatus: boolean;
    memories: string[];
    accessToken: string;
};

export type ProfileUser = SearchUser & {
    memories: [];
};
