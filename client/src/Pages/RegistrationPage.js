import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function RegistrationPage() {
  const initialValues = {
    username: "",
    password: "",
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
    gender: Yup.string().required(),
    phonenumer: Yup.string()
      .required()
      .matches(phoneRegExp),
  });

  const onSubmit = (data) => {
    axios.post(process.env.REACT_APP_REGISTER, data).then(() => {
      console.log(data);
    });
  };

  return (
    <div class="app">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label class="registerlabel">Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            class="inputregister"
            autocomplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="(Ex. John123...)"
          />
          <br />
          <label class="registerlabel">Email: </label>
          <ErrorMessage name="email" component="span" />
          <Field
            class="inputregister"
            autocomplete="off"
            type="text"
            id="inputCreatePost"
            name="email"
            placeholder="Your email..."
          />
          <br />
          <label class="registerlabel">Birthdate: </label>
          <ErrorMessage name="birthdate" component="span" />
          <Field
            class="inputregister"
            autocomplete="off"
            type="date"
            id="inputCreatePost"
            name="birthdate"
            placeholder="Your Birthdate..."
          />
          <br />
          <label class="registerlabel">Phonenumber: </label>
          <ErrorMessage name="phonenumber" component="span" />
          <Field
            class="inputregister"
            autocomplete="off"
            type="tel"
            id="inputCreatePost"
            name="phonenumber"
            placeholder="Your Phonenumber..."
          />
          <br />
          <label class="registerlabel">emai: </label>
          <ErrorMessage name="email" component="span" />
          <Field
            class="inputregister"
            autocomplete="off"
            type="email"
            id="inputCreatePost"
            name="passwordrep"
            placeholder="Your Password..."
          />
          <br />
          <label class="registerlabel">gender: </label>
          <ErrorMessage name="email" component="span" />
          <Field as="select" name="gender" class = "empty" >
          <option value="" selected disabled>
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
          <label class="registerlabel">Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            class="inputregister"
            autocomplete="off"
            type="password"
            id="inputCreatePost"
            name="password"
            placeholder="Your Password..."
          />
          <br />
          <label class="registerlabel">Repeat password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            class="inputregister"
            autocomplete="off"
            type="password"
            id="inputCreatePost"
            name="passwordrep"
            placeholder="Your Password..."
          />
          <br />
          <button type="submit" class="submit-button">
            {" "}
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default RegistrationPage;
