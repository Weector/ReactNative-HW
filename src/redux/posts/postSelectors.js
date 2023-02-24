const getComments = (state) => state.posts.comments;
const getPosts = (state) => state.posts.posts;
const getOwnPosts = (state) => state.posts.ownPosts;

export const postsSelector = {
  getComments,
  getPosts,
  getOwnPosts
};
