import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Image } from "react-native";

require("dotenv").config();

function HomePage() {
  const [listOfPosts, setListOfPosts] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    async function getposts() {
      axios
        .get(process.env.REACT_APP_GET_ALL_POSTS, {
          headers: {
            serveraccessToken: localStorage.getItem("serveraccessToken"),
          },
        })
        .then((response) => {
          if (response.error) {
          } else {
            setListOfPosts(response.data);
          }
        });
    }
    getposts();
  }, []);
  return (
    <div>
      {[...listOfPosts].reverse().map((value, key) => {
        return (
          <div
            className={value.postImage ? "postImage" : "post"}
            onClick={() => {
              navigate(`/post/${value.id}`);
            }}
          >
            <div className="card-header"> {value.posttitle} </div>
            <div className="body">{value.posttext}</div>
            {value.postImage ? (
              <Image
                style={{ width: "100%", height: 200 }}
                source={{
                  uri: `https://server.fillyourfreetime.com/${value.postImage}`,
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
  );
}

export default HomePage;
