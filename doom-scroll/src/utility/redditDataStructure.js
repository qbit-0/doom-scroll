export const flattenCommentTree = (commentTree) => {
  switch (commentTree.kind) {
    case "Listing": {
      const children = commentTree.data.children;
      const flattened = [];
      children.forEach((child) => {
        flattened.push(...flattenCommentTree(child));
      });
      return flattened;
    }
    case "more": {
      return [commentTree];
    }
    case "t1": {
      const replies = commentTree.data.replies;
      if (replies === "") {
        return [commentTree];
      }
      const flattened = [commentTree];
      flattened.push(...flattenCommentTree(replies));
      return flattened;
    }
    default: {
      throw Error("Illegal kind");
    }
  }
};
