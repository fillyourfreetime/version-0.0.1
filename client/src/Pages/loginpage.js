import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import { useNavigate } from "react-router-dom";

function Loginpage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [postObject, setPostObject] = useState({});
  const { setAuthState } = useContext(AuthContext);

  let navigate = useNavigate();

  const login = () => {
    const data = { username: username, password: password };
    setAuthState(false);
    console.log(data);
    axios
      .post(process.env.REACT_APP_LOGIN, data, {
        headers: {
          serveraccessToken: localStorage.getItem("serveraccessToken"),
        },
      })
      .then((response) => {
        console.log(response);
        if (response.data.succes) {
          console.log(response.data.succes);
          localStorage.setItem("useraccessToken", response.data.succes.token);
          setAuthState(true);
          navigate("/");
        } else {
          setPostObject(response.data);
          console.log(response.data.error);
        }
        console.log(response.data);
      });
  };
  return (
    <div>
      <form className="formContainer">
        <label>Username</label>
        <input
          type="text"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <label>password</label>
        <input
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <div className="error-message"> {postObject.error} </div>
        <button  onClick={login} type="button"> Login </button>
      </form>
    </div>
  );
}

export default Loginpage;
