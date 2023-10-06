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
    setImage(e.target.files[0]);
  }
  let navigate = useNavigate();
  const initialValues = {
    posttitle: "",
    posttext: ""
  };
  const validFileExtensions = { image: ["jpg", "png", "jpeg"] };
  function isValidFileType(fileName, fileType) {
    return (
      fileName &&
      validFileExtensions[fileType].indexOf(fileName.split(".").pop()) > -1
    );
  }

  const validationSchema = Yup.object().shape({
    posttitle: Yup.string().required("You must have a title"),
    posttext: Yup.string().required("You must have a text"),
  });

  const onSubmit = (values) => {
    const formData = new FormData();
    formData.append("posttitle", values.posttitle);
    formData.append("posttext", values.posttext);
    const id = "temp";
    if (image) {
      formData.append("image", image);
      const filetype = image.name.split(".").pop();
      formData.append("filetype", filetype);
      formData.append("postimage", "yes");
    }
    const useraccessToken = localStorage.getItem("useraccessToken");
    console.log(formData)
    axios
      .post(`${process.env.REACT_APP_CREATE_POST}${id}`, formData, {
        headers: {
          useraccessToken: useraccessToken,
          serveraccessToken: localStorage.getItem("serveraccessToken"),
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data.error) {
          setPostObject(response.data.error);
        } else {
          console.log(response.data);
          setPostObject(response.data);
          navigate("/");
        }
        console.log(response.data);
        setPostObject(response.data);
        navigate("/");
      });
    navigate("/");
  };

  return (
    <div className="app">
      {postObject.error && <div class="error">{postObject.error}</div>}
      {postObject.success && <div class="success">{postObject.success}</div>}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form class="form">
          <p id="heading">create post</p>
          <ErrorMessage name="posttitle" component="span" />
          <Field
            name="posttitle"
            type="text"
            autocomplete="off"
            class="input-field"
            placeholder="(Ex. Title...)"
          />
          <ErrorMessage name="posttext" component="span" />
          <Field
            type="text"
            autocomplete="off"
            class="input-field"
            name="posttext" 
            placeholder="(Ex. Post...)"
          />
          <ErrorMessage name="file" component="span" />
          <Field type="file" name="file" accept="image/*" onChange={handleImage} />
          <button type="submit" className="submit-button">
            Create post
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
