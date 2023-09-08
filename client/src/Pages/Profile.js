import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Image } from "react-native";

function Profile() {
  let { id } = useParams();
  const [username, setUsername] = useState("");
  const [listOfPosts, setListOfposts] = useState([]);
  const useraccessToken = localStorage.getItem("useraccessToken");
  const [Useracc, setUseracc] = useState()

  let navigate = useNavigate();

  useEffect( () => {
    axios
      .get(`${process.env.REACT_APP_GET_INFO}/${id}`, {
        headers: {
          serveraccessToken: localStorage.getItem("serveraccessToken"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setUsername(response.data);
      });
    axios
      .get(`${process.env.REACT_APP_PROFILE_PAGE}/${id}`, {
        headers: {
          serveraccessToken: localStorage.getItem("serveraccessToken"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setListOfposts(response.data);
      });
      if (useraccessToken != null) {
         axios
          .get("http://localhost:3001/users/loggedin", {
            headers: { useraccessToken: useraccessToken },
          })
          .then((response) => {
            console.log(response.data);
            if (!response.data.error) {
              if(response.data.id == id) {
                setUseracc(true)
              }
            } 
          });
      }
  }, []);
  return (
    <div>
      <div className="profilePageContainer">
        <div className="info">
          <h1> Username: {username.username} </h1>
          <Image
            style={{ width: 400, height: 200 }}
            source={{
              uri: username.pfp,
            }}
          />
          {Useracc? <button onClick={() => {navigate('/')}}>edit profile</button> : <div></div>}
        </div>
      </div>
      <div className="listOfPosts">
        {listOfPosts.reverse().map((value, key) => {
          return (
            <div
            className={value.image ? "postImage" : "post"}
              onClick={() => {
                navigate(`/post/${value.id}`);
              }}
            >
              <div className="card-header"> {value.posttitle} </div>
              <div className="body">{value.posttext}</div>
              {value.image ? (
                <Image
                  style={{ width: 400, height: 200 }}
                  source={{
                    uri: value.image,
                  }}
                />
              ) : (
                <div></div>
              )}
              <div className="footer">{value.username}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
