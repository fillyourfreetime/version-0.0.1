import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useParams } from "react-router-dom"

function EmailVerification() {
    const [postObject, setPostObject] = useState({});
    let token = useParams();
    console.log(token)
    useEffect(() => {
        axios.post("http://localhost:3001/users/emailregistration", token, {headers: { serveraccessToken: localStorage.getItem("serveraccessToken")}}).then((response) => {
          console.log(response.data);
          if (response.data.error){
            setPostObject(response.data);
            console.log(response.data.error)
          }else{setPostObject(response.data);}
          
        }); 
      }, []);
    return (
        <div>
          {postObject.error &&  <div class="error">{postObject.error}</div>}
          {postObject.success &&  <div class="success">{postObject.success}</div>}
        </div>
    )
}

export default EmailVerification;
