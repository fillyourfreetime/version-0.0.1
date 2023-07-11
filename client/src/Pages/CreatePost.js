import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function CreatePost() {
    const initialValues= {
        posttitle: "",
        posttext: "",
        postImage: "",
    };

    const validationSchema = Yup.object().shape({
        posttitle: Yup.string().required("You must have a title"),
        posttext: Yup.string().required("You must have a text"),
        postImage: Yup.string().min(3).max(15).required("You must have a username")
    });

    const onSubmit = (data) => {
        console.log(data);
        axios.post("http://localhost:3001/posts/newpost:username", data).then((response) => {
            console.log("KONTJES!!!!!!!!!!!");
        });
    };

  return (
    <div className="createPostpage">
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
