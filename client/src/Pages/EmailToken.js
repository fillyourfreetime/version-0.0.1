import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useParams } from "react-router-dom"

function EmailToken() {
    return (
        <div>
          <p className="mail">please check your email to verify your email</p>
        </div>
    )
}

export default EmailToken
