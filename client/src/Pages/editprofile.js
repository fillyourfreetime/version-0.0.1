import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function editprofile() {
  const [bio, setBio] = useState();
  const [image, setImage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userdata, setUserdata] = useState("");
  const [Postobject, setPostObject] = useState("");
  let navigate = useNavigate();

  function handleImage(e) {
    console.log(e.target.files);
    setImage(e.target.files[0]);
  }

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("bio", bio);
    if (image) {
      formData.append("image", image);
      console.log(image);
      const filetype = image.name.split(".").pop();
      formData.append("filetype", filetype);
      formData.append("postimage", "yes");
    }
    console.log(localStorage.getItem("useraccessToken"));
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
          setPostObject(response.data.error);
          console.log(response.data.error);
        } else {
          setPostObject(response.data);
        }
      });

    async function isloggedIn() {
      const useraccessToken = localStorage.getItem("useraccessToken");
      if (useraccessToken != null) {
        const response = await axios.get(
          "http://localhost:3001/users/loggedin",
          {
            headers: { useraccessToken: useraccessToken },
          }
        );

        console.log(response.data);
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
    axios
      .get(`${process.env.REACT_APP_GET_INFO}/${userdata.id}`, {
        headers: {
          serveraccessToken: localStorage.getItem("serveraccessToken"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setUserdata(response.data);
      });
  };

  return (
    <div>
      <div className="lefside">
        <Link className="profile" to="/editprofile"> edit profile </Link>
        <Link className="info" to="/editaccountinfo"> edit account info </Link>
      </div>
      <div className="rightSide">
        <form class="form">
          <p id="heading">Edit your profile</p>
          <div class="field">
            <input type="file" name="file" onChange={handleImage} />
          </div>
        </form>
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
            placeholder="Bio"
            class="input-field"
            type={userdata.bio}
            onChange={(event) => {
              setBio(event.target.value);
            }}
          ></input>
        </div>
      </div>
    </div>
  );
}

export default editprofile;
