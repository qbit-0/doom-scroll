import { CommentData, ReplyData, ReplyTree } from "./redditData";

export default class ReplyTreeUtils {
    static find = (replyTree: ReplyTree, id: number): ReplyData => {
        return replyTree.data[id];
    };

    static push = (
        replyTree: ReplyTree,
        reply: ReplyData,
        parentId: number
    ) => {
        const id = replyTree.currId;

        reply.id = id;
        replyTree.data[id] = reply;

        if (parentId !== -1) {
            const parentComment = this.find(replyTree, parentId) as CommentData;
            parentComment.childrenIds.push(id);
        }

        replyTree.currId++;
    };

    static remove = (replyTree: ReplyTree, id: number) => {
        const reply = this.find(replyTree, id);
        delete replyTree.data[id];

        if (reply.parentId !== -1) {
            const parentComment: CommentData = this.find(
                replyTree,
                reply.parentId
            ) as CommentData;

            parentComment.childrenIds = parentComment.childrenIds.filter(
                (childId) => childId !== id
            );
        }
    };
}
