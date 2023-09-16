import React, { useEffect, useState } from "react";
import axios from "axios";

function editprofile() {
  const [bio, setBio] = useState();
  const [image, setImage] = useState("");

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("bio", bio);
    if (image) {
      formData.append("image", image);
      console.log(image);
      const filetype = image.name.split(".").pop();
      formData.append("filetype", filetype);
      formData.append("postimage", "yes");
    }
    console.log(localStorage.getItem("useraccessToken"));
    console.log(formData);
    const useraccessToken = localStorage.getItem("useraccessToken");
    axios
      .post(process.env.REACT_APP_EDIT_USERPROFILE, formData, {
        headers: {
          useraccessToken: useraccessToken,
          serveraccessToken: localStorage.getItem("serveraccessToken"),
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.error) {
          setPostObject(response.data.error);
          console.log(response.data.error);
        } else {
          setPostObject(response.data);
        }
      });
  };

  return <div></div>;
}

export default editprofile;
