import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [postObject, setPostObject] = useState({});
  let navigate = useNavigate();
  const initialValues = {
    posttitle: "",
    posttext: "",
    postImage: "",
  };

  const validationSchema = Yup.object().shape({
    posttitle: Yup.string().required("You must have a title"),
    posttext: Yup.string().required("You must have a text"),
    postImage: Yup.string().min(3).max(15).required("You must have a username"),
  });

  const onSubmit = (data) => {
    const id = "temp";
    console.log(localStorage.getItem("useraccessToken"));
    const useraccessToken = localStorage.getItem("useraccessToken");
    axios
      .post(`${process.env.REACT_APP_CREATE_POST}${id}`, data, {
        headers: {
          useraccessToken: useraccessToken,
          serveraccessToken: localStorage.getItem("serveraccessToken"),
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.error) {
          setPostObject(response.data.error);
          console.log(response.data.error);
        } else {
          setPostObject(response.data);
          navigate("/");
        }
      });
  };

  return (
    <div className="createPostpage">
      {postObject.error &&  <div class="error">{postObject.error}</div>}
        {postObject.success &&  <div class="success">{postObject.success}</div>}
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Title: </label>
          <ErrorMessage name="posttitle" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="posttitle"
            placeholder="(Ex. Title...)"
          />
          <label>Post: </label>
          <ErrorMessage name="posttext" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="posttext"
            placeholder="(Ex. Post...)"
          />
          <label>Username: </label>
          <ErrorMessage name="postImage" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="postImage"
            placeholder="(Ex. Steve1999...)"
          />

          <button type="submit">Create post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
