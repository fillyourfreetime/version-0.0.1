import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_EDIT_USERPROFILE}${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios.get(`${process.env.REACT_APP_GET_COMMENT}${id}`).then((response) => {
      setComments(response.data);
    });
  }, []);

  const addComment = () => {
    axios.post(process.env.REACT_APP_COMMENT, {commentext: newComment, postid: id}).then((response) => {
      const commentToAdd = {commentext: newComment}
      setComments([...comments, commentToAdd]);
      setNewComment("")
    })
  }

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title"> {postObject.posttitle} </div>
          <div className="body">{postObject.posttext}</div>
          <div className="footer">{postObject.UserId}</div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer"> 
          <input type="text" placeholder="Comment..." autoComplete="off" value={newComment} onChange={(event) => { setNewComment(event.target.value)}}/>
          <button onClick={addComment}> Add comment</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return <div key={key} className="comment"> {comment.commentext} </div>
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;
