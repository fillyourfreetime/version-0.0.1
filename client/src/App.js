import "./App.css";
import LoginPage from "./Pages/loginpage";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useRouteLoaderData,
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
import Profile from "./Pages/Profile";
import { Image } from "react-native";
require("dotenv").config();

const checkservertoken = async (pw) => {
  await axios.post(process.env.REACT_APP_GETOKEN, pw).then((response) => {
    if (response.error) {
      console.log("server error");
    } else {
      localStorage.setItem("serveraccessToken", response.data);
    }
  });
};

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  const [Userdata, setUserdata] = useState();

  useEffect(() => {
    const data = { pw: process.env.REACT_APP_PW };
    const serverAccessToken = localStorage.getItem("serveraccessToken");
    if (!serverAccessToken) {
      checkservertoken(data);
    }
  }, []);

  useEffect(() => {
    async function isloggedIn() {
      const useraccessToken = localStorage.getItem("useraccessToken");
      if (useraccessToken != null) {
        const response = await axios
          .get("http://localhost:3001/users/loggedin", {
            headers: { useraccessToken: useraccessToken },
          })
          
            console.log(response.data);
            if (response.data.error) {
              setAuthState({ ...authState, status: false });
            } else {
              setAuthState({
                status: true,
              });
              setUserdata(response.data);
            }
      } else {
        setAuthState({ ...authState, status: false });
      }
    }
    isloggedIn();
  }, []);

  const logout = () => {
    localStorage.removeItem("useraccessToken");
    setAuthState(false);
    window.location.reload(false);
  };

  return (
    <div className="App">
      <AuthContext.Provider
        value={{ authState, setAuthState, Userdata, setUserdata }}
      >
        <BrowserRouter>
          <div className="navbar">
            {!authState.status ? (
              <div>
                <div class="leftbar">
                  <Link to="/login"> Login </Link>
                  <Link to="/registration"> Registration </Link>
                </div>
                <div class="rightbar"></div>
              </div>
            ) : (
              <div>
                <div class="lefttbar">
                  <Link to="/"> HomePage</Link>
                  <Link to="/createpost">Create a post</Link>
                </div>
                <div class="rightbar">
                  {Userdata ? (<div class="dropdown">
                    <button class="dropbtn">
                      <Image
                        style={{ width: 35, height: 35, borderRadius: "50%" }}
                        source={{
                          uri: Userdata.pfp,
                        }}
                      />{" "}
                      {Userdata.username}
                    </button>

                    <div class="dropdown-content">
                      <Link to={`/profile/${Userdata.id}`}>profile</Link>
                      <Link to="/">edit profile</Link>
                      <Link onClick={logout}>logout</Link>
                    </div>
                  </div>):(<div></div>)}
                </div>
              </div>
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
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </BrowserRouter>
        <div class="footer">
          <p class="footertext">&#169; 2023 fillourfreetime. All Rights Reserved </p>
        </div>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
