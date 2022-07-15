import { CommentData, ReplyData, ReplyTreeData } from "./redditData";

class ReplyTreeUtils {
    static find = (replyTree: ReplyTreeData, id: number): ReplyData => {
        return replyTree.data[id];
    };

    static push = (
        replyTree: ReplyTreeData,
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

    static remove = (replyTree: ReplyTreeData, id: number) => {
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

export default ReplyTreeUtils;
