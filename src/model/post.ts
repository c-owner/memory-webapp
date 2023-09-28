export type Comment = {
    memoryId: string;
    memberId?: string;
    commentId?: string;
    content: string;
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
};
