import model from "wink-eng-lite-web-model";
import winkNLP from "wink-nlp";
import { Comment, Post } from "../reddit/redditData";

const nlp = winkNLP(model, ["sbd", "negation", "sentiment"]);
export class NlpUtils {
    static analyzeSentiment = (text: string) => {
        return Number(nlp.readDoc(text).out(nlp.its.sentiment));
    };

    static analyzePost = (post: Post) => {
        const text = post.data.title;
        if (post.data.selftext !== undefined)
            text.concat(post.data.selftext, ", ");
        return this.analyzeSentiment(text);
    };

    static analyzeComment = (comment: Comment) => {
        return this.analyzeSentiment(comment.data.body);
    };
}
