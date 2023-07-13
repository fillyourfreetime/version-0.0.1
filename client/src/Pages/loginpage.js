import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext"
import { useNavigate } from "react-router-dom"

function Loginpage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  let navigate = useNavigate();

  const login = () => {
    const data = { username: username, password: password };
    console.log(data);
    axios.post(process.env.REACT_APP_LOGIN, data,{headers: { serveraccessToken: localStorage.getItem("serveraccessToken") }}).then((response) => {
      localStorage.setItem("useraccessToken", response.data.token);
      setAuthState(true);
      navigate("/");
      console.log(response.data);
    });
  };
  return (
    <div>
      <input
        type="text"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <button onClick={login}> Login </button>
    </div>
  );
}

export default Loginpage;
