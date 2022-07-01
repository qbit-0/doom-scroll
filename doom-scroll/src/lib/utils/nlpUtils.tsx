import model from "wink-eng-lite-web-model";
import winkNLP from "wink-nlp";

import {
    CommentData,
    PostData,
    ReplyData,
    ReplyTreeData,
} from "../reddit/redditData";

const nlp = winkNLP(model, ["sbd", "negation", "sentiment"]);
export class NlpUtils {
    static analyzeSentiment = (text: string) => {
        return Number(nlp.readDoc(text).out(nlp.its.sentiment));
    };

    static analyzePost = (post: PostData) => {
        let text = post.data["title"];
        if (post.data["selftext"] !== undefined)
            text = text.concat(post.data["selftext"], ", ");
        return this.analyzeSentiment(text);
    };

    static analyzeComment = (comment: CommentData) => {
        return this.analyzeSentiment(comment.data["body"]);
    };

    static analyzePostComments = (replyTree: ReplyTreeData) => {
        let text = "";

        Object.values(replyTree.data).forEach((reply: ReplyData) => {
            if (reply.kind === "comment") {
                const comment = reply as CommentData;
                text = text.concat(comment.data["body"], ". ");
            }
        });

        return this.analyzeSentiment(text);
    };
}
