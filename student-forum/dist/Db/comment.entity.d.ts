export declare class Comment {
    id: number;
    text: string;
    createdDate: Date;
    post: number;
    hr: number;
    student: number;
    parentComment: Comment;
    childComments: Comment[];
}
