import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [postObject, setPostObject] = useState({});
  const [image, setImage] = useState("");
  const [posttitle, setPosttitle] = useState("");
  const [posttext, setPosttext] = useState("");

  function handleImage(e) {
    console.log(e.target.files);
    setImage(e.target.files[0]);
  }
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

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("posttitle", posttitle);
    formData.append("posttext", posttext);
    const id = "temp";
    if (image) {
      formData.append("image", image);
      console.log(image);
      const filetype = image.name.split(".").pop();
      formData.append("filetype", filetype);
      formData.append("postimage", "yes");
    }
    console.log(localStorage.getItem("useraccessToken"));
    console.log(formData);
    const useraccessToken = localStorage.getItem("useraccessToken");
    axios
      .post(`${process.env.REACT_APP_CREATE_POST}${id}`, formData, {
        headers: {
          useraccessToken: useraccessToken,
          serveraccessToken: localStorage.getItem("serveraccessToken"),
          "Content-Type": "multipart/form-data",
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
    <div className="app">
      {postObject.error && <div class="error">{postObject.error}</div>}
      {postObject.success && <div class="success">{postObject.success}</div>}
      <Formik initialValues={initialValues} validationSchema={validationSchema}>
        <Form class="form">
          <p id="heading">create post</p>
          <ErrorMessage name="posttitle" component="span" />

          <input
            type="text"
            autocomplete="off"
            class="input-field"
            name="posttitle"
            placeholder="(Ex. Title...)"
            onChange={(event) => {
              setPosttitle(event.target.value);
            }}
          />
          <ErrorMessage name="posttext" component="span" />
          <br />
          <input
            type="text"
            autocomplete="off"
            class="input-field"
            name="posttext"
            placeholder="(Ex. Post...)"
            onChange={(event) => {
              setPosttext(event.target.value);
            }}
          />
          <br />
          <input type="file" name="file" onChange={handleImage} />
          <button type="button" className="submit-button" onClick={onSubmit}>
            Create post
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
