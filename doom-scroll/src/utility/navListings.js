export const navListings = (listings, path) => {
  let curr = listings;
  path.forEach((index) => {
    if (Array.isArray(curr)) {
      curr = curr[index];
    } else {
      switch (curr.kind) {
        case "Listing":
          curr = curr.data.children[index];
          break;
        case "t1":
          curr = curr.data.replies;
          break;
        default:
          break;
      }
    }
  });
  return curr;
};
