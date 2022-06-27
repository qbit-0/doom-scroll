import { Comment, Reply, ReplyTree } from "./redditData";

export default class ReplyTreeUtils {
    static find = (replyTree: ReplyTree, id: number): Reply => {
        return replyTree.data[id];
    };

    static push = (replyTree: ReplyTree, reply: Reply, parentId: number) => {
        const id = replyTree.currId;

        reply.id = id;
        replyTree.data[id] = reply;

        if (parentId !== -1) {
            const parentComment = this.find(replyTree, parentId) as Comment;
            parentComment.childrenIds.push(id);
        }

        replyTree.currId++;
    };

    static remove = (replyTree: ReplyTree, id: number) => {
        const reply = this.find(replyTree, id);
        const parentComment: Comment = this.find(
            replyTree,
            reply.parentId
        ) as Comment;

        delete replyTree.data[id];

        parentComment.childrenIds = parentComment.childrenIds.filter(
            (childId) => childId !== id
        );
    };
}
