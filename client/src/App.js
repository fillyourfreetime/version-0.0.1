//import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import axios from "axios";

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
    axios
      .post("http://localhost:3001/users/editprofile/1", formData, {
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
