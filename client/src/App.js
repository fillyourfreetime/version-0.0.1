//import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./Pages/loginpage";
import React, { useEffect, useState } from "react";
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
import Registration from "./Pages/RegistrationPage";
import EmailVerification from "./Pages/EmailVerification";
import EmailToken from "./Pages/EmailToken";
import CreatePost from "./Pages/CreatePost";
import Error404 from "./Pages/Error404";
import axios from "axios";
import { AuthContext } from "./helpers/AuthContext";
require("dotenv").config();

function App() {
  const [authState, setAuthState] = useState(false);
  useEffect(() => {
    const data = { pw: process.env.REACT_APP_PW };
    axios.post(process.env.REACT_APP_GETOKEN, data).then((response) => {
      console.log(response);
      localStorage.setItem("serveraccessToken", response.data);
    });
  }, []);

  useEffect(() => {
    const useraccessToken = localStorage.getItem("useraccessToken");
    if (useraccessToken != "undefined") {
      axios
        .get("http://localhost:3001/users/loggedin", {
          headers: { useraccessToken: useraccessToken },
        })
        .then((response) => {
          if (!response.data.error) {
            setAuthState(true);
          } else {
            console.log("gadfgafd");
            setAuthState(false);
          }
        });
    } else {
      setAuthState(false);
    }

    
  }, []);

  const logout = () => {
    localStorage.removeItem("useraccessToken");
    setAuthState(false);
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <BrowserRouter>
          <div className="navbar">
            <Link to="/"> HomePage</Link>
            {authState && <Link to="/createpost">Create a post</Link>}
            {!authState ? (
              <div>
                <Link to="/login"> Login </Link>
                <Link to="/registration"> Registration </Link>
              </div>
            ) : (
              <button onClick={logout}> Log out</button>
            )}
          </div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/registration" element={<Registration />} />
            <Route
              path="/emailverification/:token"
              element={<EmailVerification />}
            />
            <Route path="/registrationsuccess" element={<EmailToken />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
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
