import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_EDIT_USERPROFILE}${id}`).then((response) => {
      setPostObject(response.data);
    });
  }, []);
  console.log(postObject);
  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title"> {postObject.posttitle} </div>
          <div className="body">{postObject.posttext}</div>
          <div className="footer">{postObject.UserId}</div>
        </div>
      </div>
    </div>
  );
}

export default Post;
