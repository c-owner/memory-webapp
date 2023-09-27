export type Comment = {
    content: string;
    memberName: string;
    image?: string | undefined;
};

export type SimplePost = Omit<FullPost, 'comments'> & {
    comments: number;
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
