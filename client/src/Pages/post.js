import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import('tailwindcss').Config

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_GET__POST}${id}`, {
        headers: {
          serveraccessToken: localStorage.getItem("serveraccessToken"),
        },
      })
      .then((response) => {
        setPostObject(response.data);
      });
  }, []);
  const addComment = () => {
    axios
      .post(process.env.REACT_APP_COMMENT, {
        commentext: newComment,
        postid: id,
      })
      .then((response) => {
        const commentToAdd = { commentext: newComment };
        setComments([...comments, commentToAdd]);
        setNewComment("");
      });
  };

  return (
    <div className="postPage">
      <div className="leftSide">
        <div
          className={postObject.postImage ? "postImage" : "post"}
          id={postObject.postImage ? "individualImage" : "individual"}
        >
          <div className="card-header"> {postObject.posttitle} </div>
          <div className="body">{postObject.posttext}</div>
          {postObject.postImage ? (
            <img
              src={`https://server.fillyourfreetime.com/${postObject.postImage}`}
              class="object-cover"
            />
          ) : (
            <br />
          )}
          <div
            className="footer"
            onClick={() => {
              navigate(`/profile/${postObject.UserId}`);
            }}
          >
            {postObject.username}
          </div>
        </div>
        <div></div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Comment..."
            autoComplete="off"
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
          <button onClick={addComment}> Add comment</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                {" "}
                {comment.commentext}{" "}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;
