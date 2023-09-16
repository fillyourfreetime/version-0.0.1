import React, { useEffect, useState } from "react";
import axios from "axios";

function editpassword() {
  const [passwordnew, setPasswordnew] = useState;
  const [passwordold, setPasswordold] = useState;
  const [passwordnewrep, setPasswordnewrep] = useState;
  const [newusername, setnewusername] = useState;
  const [phonenumber, setphonenumber] = useState;

  const onSubmit = () => {
    const data = {
      passwordnew: passwordnew,
      passwordold: passwordold,
      passwordnewrep: passwordnewrep,
      newusername: newusername,
      phonenumber: phonenumber,
    };

    axios
      .post(process.env.REACT_APP_EDIT_PROFILE , data, {
        headers: {
          serveraccessToken: localStorage.getItem("serveraccessToken"),
          useraccessToken: localStorage.getItem("useraccessToken")
        },
      })
      .then((response) => {
        if (response.data.error) {
          setPostObject(response.data);
          console.log(response.data.error);
        } else {
          setPostObject(response.data);
          console.log(response.data);
        }
      });
  };

  return <div></div>;
}

export default editpassword;
