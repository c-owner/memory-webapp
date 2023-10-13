export type Comment = {
    memoryId: string;
    memberId?: string;
    commentId?: string;
    content: string;
    isDeleted?: boolean;
};
export type Memories = {
    memoryId: string;
    memberId: string;
    memberName: string;
    content: string;
    comments: Comment[];
    likeCnt: number;
    sadCnt: number;
    angryCnt: number;
    reactionStatus: string;
    isSaved: boolean;
    createdAt: string;
};
export type SimplePost = {
    memoryId: string;
    memberId: string;
    memberName: string;
    content: string;
    createdAt: string;
    likeCnt: number;
    sadCnt: number;
    angryCnt: number;
    status: string;
    comments: Comment[];
    isSaved: boolean;
    isDeleted: boolean;
    reactionStatus: string;
};

export type BookmarkPost = {
    memoryId: string;
    memberId: string;
    content: string;
    likeCnt: number;
    angryCnt: number;
    sadCnt: number;
    comments: Comment[];
    createdAt: string;
    isSaved: boolean;
    isDeleted: boolean;
    reactionStatus: string;
};

export type FullPost = {
    memoryId: string;
    memberId: string;
    memberName: string;
    content: string;
    createdAt: string;
    likeCnt: number;
    sadCnt: number;
    angryCnt: number;
    status: string;
    comments: Comment[];
    isSaved: boolean;
    isDeleted: boolean;
    reactionStatus: string;
};

export type Reactions = {
    memberId: string;
    memoryId: string;
    status: string;
};
