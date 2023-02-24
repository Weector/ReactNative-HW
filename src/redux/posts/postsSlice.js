import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  comments: [],
  posts: [],
  ownPosts:[],
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    updateComments: (state, { payload }) => ({
      ...state,
      comments: payload,
    }),
    updatePosts: (state, { payload }) => ({
      ...state,
      posts: payload,
    }),
    updateOwnPosts: (state, { payload }) => ({
      ...state,
      ownPosts: payload,
    }),
  },
});

export const postsReducer = postsSlice.reducer;
export const postsAction = postsSlice.actions;
