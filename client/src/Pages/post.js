import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Image } from "react-native";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AuthContext } from "../helpers/AuthContext";
// import('tailwindcss').Config

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { setAuthState, authState } = useContext(AuthContext);

  let navigate = useNavigate();
  const initialValues = {
    newComment: "",
  };
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
    axios
      .get(`${process.env.REACT_APP_GET_COMMENT}${id}`, {
        headers: {
          serveraccessToken: localStorage.getItem("serveraccessToken"),
        },
      })
      .then((response) => {
        console.log(response);
        setComments(response.data);
      });
  }, []);
  const onSubmit = (values) => {
    console.log(values);
    axios
      .post(
        process.env.REACT_APP_COMMENT,
        {
          commentext: values.newComment,
          postid: id,
        },
        {
          headers: {
            serveraccessToken: localStorage.getItem("serveraccessToken"),
            useraccessToken: localStorage.getItem("useraccessToken"),
          },
        }
      )
      .then((response) => {
        console.log(response);
        const commentToAdd = { commentext: newComment };
        setComments([...comments, commentToAdd]);
        setNewComment("");
        window.location.reload(false);
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
            <Image
              style={{ width: "100%", height: 200 }}
              source={{
                uri: `https://server.fillyourfreetime.com/${postObject.postImage}`,
              }}
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
        {!authState.status ? (
          <div></div>
        ) : (
          <div>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              <Form class="form">
                <Field
                  type="text"
                  placeholder="Comment..."
                  autoComplete="off"
                  name="newComment"
                />
                <button type="submit" className="submit-button">
                  new Comment
                </button>
              </Form>
            </Formik>
          </div>
        )}
        <div className="listOfComments">
          {[...comments].reverse().map((comment, key) => {
            return (
              <div>
              <div key={key} className="comment">
                <div class="commentuser"> {comment.username} </div>
                <div class="commenttext"> {comment.commentext} </div>
              </div>
              <br />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;
