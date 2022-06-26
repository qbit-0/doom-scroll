import model from "wink-eng-lite-web-model";
import winkNLP from "wink-nlp";

const nlp = winkNLP(model, ["sbd", "negation", "sentiment"]);

export const analyzeSentiment = (text: string) => {
    return Number(nlp.readDoc(text).out(nlp.its.sentiment));
};
