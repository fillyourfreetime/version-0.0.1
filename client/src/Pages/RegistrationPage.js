import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function RegistrationPage() {
  const initialValues = {
    username: "",
    password: "",
  };

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
    birthdate: Yup.string()
      .required(),
    gender: Yup.string()
      .required(),
  });

  const onSubmit = (data) => {
    axios.post(process.env.REACT_APP_REGISTER, data).then(() => {
      console.log(data);
    });
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="(Ex. John123...)"
          />
          <label>Email: </label>
          <ErrorMessage name="email" component="span" />
          <Field
            autocomplete="off"
            type="text"
            id="inputCreatePost"
            name="email"
            placeholder="Your email..."
          />
          <label>Birthdate: </label>
          <ErrorMessage name="birthdate" component="span" />
          <Field
            autocomplete="off"
            type="date"
            id="inputCreatePost"
            name="birthdate"
            placeholder="Your Birthdate..."
          />
          <label>Phonenumber: </label>
          <ErrorMessage name="phonenumber" component="span" />
          <Field
            autocomplete="off"
            type="tel"
            id="inputCreatePost"
            name="phonenumber"
            placeholder="Your Phonenumber..."
          />
          <label>emai: </label>
          <ErrorMessage name="email" component="span" />
          <Field
            autocomplete="off"
            type="email"
            id="inputCreatePost"
            name="passwordrep"
            placeholder="Your Password..."
          />
          <label>gender: </label>
          <ErrorMessage name="email" component="span" />
          <Field as="select" name="color">
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="Transgender Woman">Transgender Woman</option>
            <option value="Transgender Man">Transgender Man</option>
            <option value="Non-Binary">Non-Binary</option>
            <option value="Agender/I don’t identify with any gender ">Agender/I don’t identify with any gender</option>
            <option value="Prefer not to state">Prefer not to state</option>
          </Field>
          <datalist id="gender">
            <option value="male">Male</option>
          </datalist>
          <label>Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            autocomplete="off"
            type="password"
            id="inputCreatePost"
            name="password"
            placeholder="Your Password..."
          />
          <label>Repeat password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            autocomplete="off"
            type="password"
            id="inputCreatePost"
            name="passwordrep"
            placeholder="Your Password..."
          />

          <button type="submit"> Register</button>
        </Form>
      </Formik>
    </div>
  );
}

export default RegistrationPage;
