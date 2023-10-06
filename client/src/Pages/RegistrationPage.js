import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegistrationPage() {
  const [postObject, setPostObject] = useState({});

  let navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
    email: "",
    phonenumber: "",
    passwordrep: "",
    birthdate: "",
    tos: false,
  };
  const phoneRegExp =
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(8).required(),
    birthdate: Yup.string().required(),
    phonenumber: Yup.string()
      .required()
      .matches(phoneRegExp, "not a valid phone number"),
    passwordrep: Yup.string().required(),
    tos: Yup.bool().oneOf(
      [true],
      "You need to accept the terms and conditions"
    ),
  });

  const onSubmit = (data) => {
    axios
      .post(process.env.REACT_APP_REGISTER, data, {
        headers: {
          serveraccessToken: localStorage.getItem("serveraccessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setPostObject(response.data);
          console.log(response.data)
        } else {
          setPostObject(response.data);
          navigate("/registrationsuccess");
        }
      });
  };

  const tos = () => {
    fetch("FillYourFreeTime_TOS.pdf").then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "FillYourFreeTime_TOS.pdf";
        alink.click();
      });
    });
  };

  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  if (localStorage.getItem("useraccessToken")) {
    navigate("/");
  }

  return (
    <div className="app">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form class="form">
          <p id="heading">registration</p>
          <ErrorMessage name="username" component="span" />
          <div class="field">
            <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
            <Field
              id="username"
              type="text"
              placeholder="username"
              class="input-field"
              name="username"
            />
          </div>
          <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
          <br />
          <ErrorMessage name="email" component="span" />
          <div class="field">
            <Field
              type="text"
              class="input-field"
              placeholder="email"
              name="email"
            />
          </div>
          <br />
          <ErrorMessage name="birthdate" component="span" />
          <div class="field">
            <Field
              name="birthdate"
              placeholder="Birthdate"
              type="text"
              onFocus={(e) => {
                e.currentTarget.type = "date";
                e.currentTarget.focus();
              }}
              onBlur={(e) => {
                e.currentTarget.type = "text";
                e.currentTarget.blur();
                e.currentTarget.placeholder = "Birthdate";
              }}
              class="input-field"
            />
          </div>
          <br />
          <ErrorMessage name="phonenumber" component="span" />
          <div class="field">
            <Field
              name="phonenumber"
              placeholder="phonenumber"
              type="text"
              class="input-field"
            />
          </div>
          <br />
          <ErrorMessage name="password" component="span" />
          <div class="field">
            <Field
              name="password"
              placeholder="password"
              type="password"
              class="input-field"
            />
          </div>
          <br />
          <ErrorMessage name="passwordrep" component="span" />
          <div class="field">
            <Field
              name="passwordrep"
              type="password"
              placeholder="repeat password"
              class="input-field"
            />
          </div>
          <br />
          <div className="error-message"> {postObject.error} </div>
          <ErrorMessage name="tos" component="span" />
          <label className="term">
            <Field type="checkbox" name="tos"/>
            By clicking here, I state that I have read and understood the
            <a href="#" onClick={tos}>
              {" "}
              terms and conditions.{" "}
            </a>
          </label>
          
          <br />
          <button type="submit" className="submit-button">
            register
          </button>
        </Form>
      </Formik>
      <br></br>
      <br/>
      <br/>
    </div>
  );
}

export default RegistrationPage;
