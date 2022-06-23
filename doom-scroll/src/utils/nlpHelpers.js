export const analyzePost = (nlp, post) => {
  const title = post.data.title;
  let selftext = null;
  if (post.data.selftext !== undefined) {
    selftext = post.data.selftext;
  }
  const doc = nlp.readDoc(title.concat(". ", selftext));
  return doc.out(nlp.its.sentiment);
};

export const analyzeComment = (nlp, comment) => {
  if (comment.kind === "more") {
    return 0;
  }
  const body = comment.data.body;
  const doc = nlp.readDoc(body);
  return doc.out(nlp.its.sentiment);
};