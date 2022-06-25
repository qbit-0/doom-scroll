import { WinkMethods } from "wink-nlp";

export const analyzeSentiment = (nlp: WinkMethods, text: string) => {
  return Number(nlp.readDoc(text).out(nlp.its.sentiment));
}