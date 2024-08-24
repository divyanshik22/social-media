import React, { createContext, useReducer, useState, useEffect } from "react";

export const PostList = createContext({
  postList: [],
  fetching: false,
  addPost: () => {},
  deletePost: () => {},
});
const PostListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type == "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postid
    );
  } else if (action.type == "ADD_POST") {
    newPostList = [action.payload, ...currPostList];
  } else if (action.type == "ADD_INITIAL_POST") {
    newPostList = action.payload.posts;
  }
  return newPostList;
};
const PostListProvider = ({ children }) => {
  const [fetching, setFetching] = useState(false);
  const addPost = (post) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: post,
    });
  };
  const addInitialPosts = (posts) => {
    dispatchPostList({
      type: "ADD_INITIAL_POST",
      payload: {
        posts,
      },
    });
  };
  const deletePost = (postid) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postid,
      },
    });
  };
  const [postList, dispatchPostList] = useReducer(PostListReducer, []);

  useEffect(() => {
    setFetching(true);

    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        addInitialPosts(data.posts);
        setFetching(false);
      });
  }, []);
  return (
    <PostList.Provider value={{ postList, addPost, fetching, deletePost }}>
      {children}
    </PostList.Provider>
  );
};
// const DEFAULT_POST_LIST = [
//   {
//     id: "1",
//     title: "Mumbai",
//     body: "Going",
//     reactions: 9,
//     userId: "user-12",
//     tags: ["Vacations", "Holiday", "outing"],
//   },
//   {
//     id: "2",
//     title: "Mumbai",
//     body: "Going to visit my realtive out of town",
//     reactions: 2,
//     userId: "user-22",
//     tags: ["Vacations", "Visting", "Going"],
//   },
// ];
export default PostListProvider;
