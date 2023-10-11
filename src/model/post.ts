export type Comment = {
    memoryId: string;
    memberId?: string;
    commentId?: string;
    content: string;
    isDeleted?: boolean;
};

export type SimplePost = Omit<FullPost, 'comments'> & {
    comments: Comment[];
};

export type BookmarkPost = {
    memoryId: string;
    memberId: string;
    content: string;
    likeCnt: number;
    angryCnt: number;
    sadCnt: number;
    reactions: [];
    comments: Comment[];
    createdAt: string;
    isSaved: boolean;
    reactionStatus: string;
};

export type FullPost = {
    memoryId: string;
    memberId: string;
    memberName: string;
    userImage: string;
    image: string;
    content: string;
    createdAt: string;
    likeCnt: number;
    sadCnt: number;
    angryCnt: number;
    reactions: [];
    status: string;
    comments: Comment[];
    isSaved: boolean;
    reactionStatus: string;
};

export type Reactions = {
    memberId: string;
    memoryId: string;
    status: string;
};
