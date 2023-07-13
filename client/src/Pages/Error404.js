import React from "react";
import { Link } from "react-router-dom";

function Error404() {
    return (
        <div className="error">
            <h1>Page not found</h1>
            <br></br>
            <h3>The page you are looking for does not exist or another error occurred.</h3>
            <h3>Go to the homepage: <Link to="/"> HomePage</Link> Or head over to fillyourfreetime.com to choose a new direction.</h3>
        </div>
    )
}

export default Error404