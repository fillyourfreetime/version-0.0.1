import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useParams } from "react-router-dom"

function EmailVerification() {
    const [postObject, setPostObject] = useState({});
    let token = useParams();
    useEffect(() => {
        axios.post(process.env.REACT_APP_EMAILREGISTRATION, token, {headers: { serveraccessToken: localStorage.getItem("serveraccessToken")}}).then((response) => {
          if (response.data.error){
            setPostObject(response.data);
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
