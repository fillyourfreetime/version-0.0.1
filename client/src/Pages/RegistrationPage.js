import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function RegistrationPage() {
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


  const onSubmit = (data) => {
    axios.post("http://localhost:3001/users/register", data).then(() => {
      console.log(data);
    });
  };

  return (
    <div className="app">
      <Formik
        initialValues={initialValues}
        //onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label className="registerlabel">Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            className="inputregister"
            autoComplete="off"
            id="username"
            name="username"
            placeholder="(Ex. John123...)"
          />
          <br />
          <label className="registerlabel">Email: </label>
          <ErrorMessage name="email" component="span" />
          <Field
            className="inputregister"
            autoComplete="off"
            type="text"
            id="email"
            name="email"
            placeholder="Your email..."
          />
          <br />
          <label className="registerlabel">Birthdate: </label>
          <ErrorMessage name="birthdate" component="span" />
          <Field
            className="inputregister"
            autoComplete="off"
            type="date"
            id="birthdate"
            name="birthdate"
            placeholder="Your Birthdate..."
          />
          <br />
          <label className="registerlabel">Phonenumber: </label>
          <ErrorMessage name="phonenumber" component="span" />
          <Field
            className="inputregister"
            autoComplete="off"
            type="tel"
            id="inputCreatePost"
            name="phonenumber"
            placeholder="Your Phonenumber..."
          />
          <br />
          <label className="registerlabel">gender: </label>
          <ErrorMessage name="email" component="span" />
          <Field as="select" name="gender" className="inputregister">
            <option value="" defaultValue>
              gender
            </option>
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="Transgender Woman">Transgender Woman</option>
            <option value="Transgender Man">Transgender Man</option>
            <option value="Non-Binary">Non-Binary</option>
            <option value="Agender/I don’t identify with any gender ">
              Agender/I don’t identify with any gender
            </option>
            <option value="Prefer not to state">Prefer not to state</option>
          </Field>
          <br />
          <label className="registerlabel">Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            className="inputregister"
            autoComplete="off"
            type="password"
            id="password"
            name="password"
            placeholder="Your Password..."
          />
          <br />
          <label className="registerlabel">Repeat password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            className="inputregister"
            autoComplete="off"
            type="password"
            id="passwordrep"
            name="passwordrep"
            placeholder="Your Password..."
          />
          <br />
          <button type="submit" onClick={onSubmit}>Register</button>
        </Form>
      </Formik>
    </div>
  );
}

export default RegistrationPage;
