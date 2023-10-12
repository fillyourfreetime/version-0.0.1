import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

function editpassword() {
  const [passwordnew, setPasswordnew] = useState("");
  const [passwordold, setPasswordold] = useState("");
  const [passwordnewrep, setPasswordnewrep] = useState("");
  const [newusername, setNewusername] = useState("");
  const [Postobject, setPostObject] = useState("");
  const [userdata, setUserdata] = useState("");
  const initialValues = {
    username: "",
    password: "",
    passwordrep: "",
    phonenumber: "",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15),
    password: Yup.string().min(8),
    passwordrep: Yup.string(),
  });
  let navigate = useNavigate();

  const onSubmit = () => {
    const data = {
      passwordnew: passwordnew,
      passwordold: passwordold,
      passwordnewrep: passwordnewrep,
      newusername: newusername,
    };

    axios
      .post(process.env.REACT_APP_EDIT_PROFILE, data, {
        headers: {
          serveraccessToken: localStorage.getItem("serveraccessToken"),
          useraccessToken: localStorage.getItem("useraccessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setPostObject(response.data);
        } else {
          setPostObject(response.data);
          window.location.reload(false);
        }
      });

    async function isloggedIn() {
      const useraccessToken = localStorage.getItem("useraccessToken");
      if (useraccessToken != null) {
        const response = await axios.get(process.env.REACT_APP_LOGGED_IN, {
          headers: { useraccessToken: useraccessToken },
        });
        if (response.data.error) {
          navigate("/");
        } else {
          setUserdata(response.data);
        }
      } else {
        navigate("/");
      }
    }
    isloggedIn();
  };

  return (
    <div className="postPage">
      <div className="lefsideprof">
        <Link className="profile" to="/editprofile">
          {" "}
          edit profile{" "}
        </Link>
        <Link className="info" to="/editaccountinfo">
          {" "}
          edit account info{" "}
        </Link>
      </div>
      <div className="rightsideprof">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form class="form">
            <p id="heading">Edit your profile</p>
            <div class="field">
              <svg
                class="input-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
              </svg>
              <input
                autoComplete="off"
                placeholder="Username"
                class="input-field"
                type="text"
                onChange={(event) => {
                  setNewusername(event.target.value);
                }}
              ></input>
            </div>
            <div class="field">
              <svg
                class="input-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
              </svg>
              <input
                placeholder="old password"
                class="input-field"
                type="password"
                onChange={(event) => {
                  setPasswordold(event.target.value);
                }}
              ></input>
            </div>
            <div class="field">
              <svg
                class="input-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
              </svg>
              <input
                placeholder="new password"
                class="input-field"
                type="password"
              ></input>
            </div>
            <div class="field">
              <svg
                class="input-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
              </svg>
              <input
                placeholder="repeat new password"
                class="input-field"
                type="password"
              ></input>
            </div>
            <button type="submit" className="submit-button">
              edit account info
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default editpassword;
