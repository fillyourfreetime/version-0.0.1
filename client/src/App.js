//import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import axios from "axios";
require('dotenv').config()

function App() {
  const [image, setImage] = useState("");
  function handleImage(e) {
    console.log(e.target.files);
    setImage(e.target.files[0]);
  }
  function handleApi() {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("pfp", "yes");
    const filetype = image.name.split('.').pop();

    formData.append("filetype", filetype )
    console.log('hello')
    console.log(image)
    console.log(formData)
    console.log(process.env.EDIT_USERPROFILE)
    axios
      .post(`${process.env.EDIT_USERPROFILE}/1`, formData, {  
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
      });
  }
  return (
    <div>
      <input type="file" name="file" onChange={handleImage} />
      <button onClick={handleApi}>submit</button>
    </div>
  );
}

export default App;
