//import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./Pages/loginpage";
import React from "react";
//import axios from "axios"; 
import {
  //BrowserRouter as Router,
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Post from "./Pages/post";
import Registration from "./Pages/RegistrationPage"
require("dotenv").config();

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="navbar">
          <Link to="/"> HomePage</Link>
          <Link to="/login"> Login </Link>
          <Link to="/registration"> Registration </Link>
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/post/:id" element={<Post/>} />
          <Route path="/registration" element={<Registration/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );

  // voor uploaden van afbeeldingen
  // const [image, setImage] = useState("");
  // function handleImage(e) {
  //   console.log(e.target.files);
  //   setImage(e.target.files[0]);
  // }
  // function handleApi() {
  //   const formData = new FormData();
  //   formData.append("image", image);
  //   formData.append("pfp", "yes");
  //   const filetype = image.name.split('.').pop();

  //   formData.append("filetype", filetype )
  //   console.log('hello')
  //   console.log(image)
  //   console.log(formData)
  //   console.log(process.env.REACT_APP_EDIT_USERPROFILE)
  //   axios
  //     .post(`${process.env.REACT_APP_EDIT_USERPROFILE}/1`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //     });
  // }
  // return (
  //   <div>
  //     <input type="file" name="file" onChange={handleImage} />
  //     <button onClick={handleApi}>submit</button>
  //   </div>
  // );
}

export default App;
