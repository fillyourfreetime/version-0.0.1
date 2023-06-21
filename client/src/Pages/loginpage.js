import React, { useState } from "react";
import axios from "axios";

function Loginpage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    const data = {username: username, password: password}
    axios.post(process.env.REACT_APP_LOGIN, data).then((response) => {
        console.log(response.data);
    })
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
