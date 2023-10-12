import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

function editprofile() {
  const [image, setImage] = useState("");
  const [userdata, setUserdata] = useState("");
  const [Postobject, setPostObject] = useState("");
  const [errorclass, seterrorclass] = useState("");
  let navigate = useNavigate();
  const initialValues = {
    bio: "",
  };

  function handleImage(e) {
    setImage(e.target.files[0]);
  }
  useEffect(() => {
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
  }, []);
  const onSubmit = (values) => {
    const formData = new FormData();
    formData.append("bio", values.bio);
    console.log(values.bio);
    if (image) {
      formData.append("pfp", image);
      const filetype = image.name.split(".").pop();
      formData.append("filetype", filetype);
    }
    console.log(formData);
    const useraccessToken = localStorage.getItem("useraccessToken");
    axios
      .post(process.env.REACT_APP_EDIT_USERPROFILE, formData, {
        headers: {
          useraccessToken: useraccessToken,
          serveraccessToken: localStorage.getItem("serveraccessToken"),
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.error) {
          seterrorclass("error-message");
          setPostObject(response.data.error);
        } else {
          seterrorclass("success-message");
          setPostObject(response.data);
        }
      });
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
      <div className="rightSideprof">
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form class="form">
            <p id="heading">Edit your profile</p>
            <div class="field">
              <Field type="file" name="image" onChange={handleImage} />
            </div>
            <div class="field">
              <Field
                autoComplete="off"
                placeholder={userdata.bio}
                class="input-field"
                type="text"
                name="bio"
              />
            </div>
            <div className={errorclass}> {Postobject} </div>
            <button type="submit" className="submit-button">
              edit profile
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default editprofile;
