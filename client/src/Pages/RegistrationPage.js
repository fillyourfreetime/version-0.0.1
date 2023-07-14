import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegistrationPage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [birthdate, setBirthdate] = useState("")
  const [phonenumber, setPhonenumber] = useState("")
  const [passwordrep, setPasswordrep] = useState("")
  const [gender, setGender] = useState("")
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
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3)
      .max(15)
      .required(),
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string()
      .min(8)
      .max(20)
      .required(),
    birthdate: Yup.string().required(), 
    phonenumer: Yup.string()
      .required()
      .matches(phoneRegExp),
    passwordrep: Yup.string().required()
  });


  const onSubmit = () => {
    const data = {username:username, email:email, password:password, birthdate:birthdate, phonenumber: phonenumber,password: password, passwordrep: passwordrep, gender: "male"};
    console.log(data)
    axios.post("http://localhost:3001/users/register", data, {headers: { serveraccessToken: localStorage.getItem("serveraccessToken") }}).then((response) => {
      if (response.data.error){
        setPostObject(response.data);
        console.log(response.data.error);
      }else{setPostObject(response.data)
        navigate("/registrationsuccess");
      console.log(response.data);}
    });
  };

  return (
    <div className="app">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label className="registerlabel">Username: </label>
          <ErrorMessage name="username" component="span" />
          <input
            type="text"
            onChange={(event) => {
              setUsername(event.target.value)
            }}
          />
          <br />
          <label className="registerlabel">Email: </label>
          <ErrorMessage name="email" component="span" />
          <input
            type="text"
            onChange={(event) => {
              setEmail(event.target.value)
            }}
          />
          <br />
          <label className="registerlabel">Birthdate: </label>
          <ErrorMessage name="birthdate" component="span" />
          <input
             type="date"
            onChange={(event) => {
              setBirthdate(event.target.value)
            }}
          />
          <br />
          <label className="registerlabel">Phonenumber: </label>
          <ErrorMessage name="phonenumber" component="span" />
          <input
            type="text"
            onChange={(event) => {
              setPhonenumber(event.target.value)
            }}
          />
          <br />
          <label className="registerlabel">Password: </label>
          <ErrorMessage name="password" component="span" />
          <input
            type="password"
            onChange={(event) => {
              setPassword(event.target.value)
            }}
          />
          <br />
          <label className="registerlabel">Repeat password: </label>
          <ErrorMessage name="passwordrep" component="span" />
          <input
             type="password"
            onChange={(event) => {
              setPasswordrep(event.target.value)
            }}
          />
          <br />
          <div className="error-message"> {postObject.error} </div>
          <button type="submit" className="submit-button" onClick={onSubmit}>Register</button>
        </Form>
      </Formik>
    </div>
  );
}

export default RegistrationPage;
