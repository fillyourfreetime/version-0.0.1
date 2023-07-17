import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegistrationPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [passwordrep, setPasswordrep] = useState("");
  const [gender, setGender] = useState("");
  const [postObject, setPostObject] = useState({});

  let navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
    email: "",
    phonenumber: "",
    passwordrep: "",
    birthdate: "",
  };
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(8).max(20).required(),
    birthdate: Yup.string().required(),
    phonenumer: Yup.string().required().matches(phoneRegExp),
    passwordrep: Yup.string().required(),
  });

  const onSubmit = () => {
    const data = {
      username: username,
      email: email,
      password: password,
      birthdate: birthdate,
      phonenumber: phonenumber,
      password: password,
      passwordrep: passwordrep,
      gender: "male",
    };
    console.log(data);
    axios
      .post("http://localhost:3001/users/register", data, {
        headers: {
          serveraccessToken: localStorage.getItem("serveraccessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setPostObject(response.data);
          console.log(response.data.error);
        } else {
          setPostObject(response.data);
          navigate("/registrationsuccess");
          console.log(response.data);
        }
      });
  };

  return (
    <div className="app">
      <Formik initialValues={initialValues} validationSchema={validationSchema}>
        <form class="form">
          <label className="registerlabel">Username: </label>
          <ErrorMessage name="username" component="span" />
          <input
            type="text"
            class="input-field"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
          <br />
          <label className="registerlabel">Email: </label>
          <ErrorMessage name="email" component="span" />
          <input
            type="text"
            class="input-field"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <br />
          <label className="registerlabel">Birthdate: </label>
          <ErrorMessage name="birthdate" component="span" />
          <input
            type="date"
            class="input-field"
            onChange={(event) => {
              setBirthdate(event.target.value);
            }}
          />
          <br />
          <label className="registerlabel">Phonenumber: </label>
          <ErrorMessage name="phonenumber" component="span" />
          <input
            type="text"
            class="input-field"
            onChange={(event) => {
              setPhonenumber(event.target.value);
            }}
          />
          <br />
          <label className="registerlabel">Password: </label>
          <ErrorMessage name="password" component="span" />
          <input
            type="password"
            class="input-field"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <br />
          <label className="registerlabel">Repeat password: </label>
          <ErrorMessage name="passwordrep" component="span" />
          <input
            type="password"
            class="input-field"
            onChange={(event) => {
              setPasswordrep(event.target.value);
            }}
          />
          <br />
          <div class="g-recaptcha" data-sitekey="6LdFzisnAAAAAKx8W64RnlCIs3BE_P8zaR5VMmGq"></div>
          <div className="error-message"> {postObject.error} </div>
          <button type="submit" className="submit-button" onClick={onSubmit}>
            Register
          </button>

        </form>
      </Formik>
    </div>
  );
}

export default RegistrationPage;
