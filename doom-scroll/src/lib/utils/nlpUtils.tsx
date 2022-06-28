import model from "wink-eng-lite-web-model";
import winkNLP from "wink-nlp";
import { Comment, Post, Reply, ReplyTree } from "../reddit/redditData";

const nlp = winkNLP(model, ["sbd", "negation", "sentiment"]);
export class NlpUtils {
    static analyzeSentiment = (text: string) => {
        return Number(nlp.readDoc(text).out(nlp.its.sentiment));
    };

    static analyzePost = (post: Post) => {
        let text = post.data["title"];
        if (post.data["selftext"] !== undefined)
            text = text.concat(post.data["selftext"], ", ");
        return this.analyzeSentiment(text);
    };

    static analyzeComment = (comment: Comment) => {
        return this.analyzeSentiment(comment.data["body"]);
    };

    static analyzePostComments = (replyTree: ReplyTree) => {
        let text = "";

        Object.values(replyTree.data).forEach((reply: Reply) => {
            if (reply.kind === "comment") {
                const comment = reply as Comment;
                text = text.concat(comment.data["body"], ". ");
            }
        });

        return this.analyzeSentiment(text);
    };
}
