import { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PostList } from "../store/post-list-store";
const CreatePost = () => {
  const navigate = useNavigate();
  const { addPost } = useContext(PostList);
  const userID = useRef();
  const postTitle = useRef();
  const postBody = useRef();
  const reactions = useRef();
  const tags = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: Date.now(),
        title: postTitle.current.value,
        body: postBody.current.value,
        reactions: reactions.current.value,
        userId: userID.current.value,
        tags: tags.current.value.split(" "),
      }),
    })
      .then((res) => res.json())
      .then((post) => {
        addPost(post);
        navigate("/");
      });

    userID.current.value = " ";
    postTitle.current.value = " ";
    postBody.current.value = " ";
    reactions.current.value = " ";
    tags.current.value = " ";
  };
  return (
    <form className="create-post" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="userId" className="form-label">
          User ID
        </label>
        <input
          ref={userID}
          type="text"
          className="form-control"
          id="userId"
          placeholder="Your User Id"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Post Title
        </label>
        <input
          ref={postTitle}
          type="text"
          className="form-control"
          id="title"
          placeholder="How are you feeling today...."
        />
      </div>
      <div className="mb-3">
        <label htmlFor="body" className="form-label">
          Post Content
        </label>
        <textarea
          ref={postBody}
          rows="4"
          type="text"
          className="form-control"
          id="body"
          placeholder="Tell us more about it"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="reaction" className="form-label">
          Number of reaction
        </label>
        <input
          ref={reactions}
          type="text"
          className="form-control"
          id="reaction"
          placeholder="How many people reacted"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tags" className="form-label">
          Enter Hashtags
        </label>
        <input
          ref={tags}
          type="text"
          className="form-control"
          id="tags"
          placeholder="Please enter the tags"
        />
      </div>
      <div className="col-auto">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
};
export default CreatePost;
