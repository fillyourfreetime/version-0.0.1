import React, { useEffect , useState} from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
require('dotenv').config()

function HomePage() {
  const [listOfPosts, setListOfPosts] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get(process.env.REACT_APP_GET_ALL_POSTS).then((response) => {
      setListOfPosts(response.data);
    });
    
  }, []);
  return (
    <div>
      {listOfPosts.map((value, key) => {
        return (
          <div
            className="post"
            onClick={() => {
              navigate(`/post/${value.id}`);
            }}
          >
            <div className="card-header"> {value.posttitle} </div>
            <div className="body">{value.posttext}</div>
            <div className="footer">{value.UserId}</div>
          </div>
        );
      })}
    </div>
  );
}

export default HomePage;