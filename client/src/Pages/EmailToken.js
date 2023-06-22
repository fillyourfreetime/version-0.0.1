import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useParams } from "react-router-dom"

function EmailToken() {
    const [setPostObject] = useState({});
    let { token } = useParams();
    useEffect(() => {
        axios.get("https://localhost:3001/users/emailregistration", token).then((response) => {
          setPostObject(response.token);
        });
      }, []);
    return (
        <div>
    
        </div>
    )
}

export default EmailToken
