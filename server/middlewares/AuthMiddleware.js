const { verify } = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const verifyuser = (req, res, next) => {
  const accessToken = req.header("useraccessToken");
  console.log(accessToken)
  if (!accessToken) return res.json({ error: "User not logged in!" });

  try {
    const validToken = verify(accessToken, process.env.JWT_SECRET_USER);
    req.user = validToken;
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};


const verifyserver = (req, res, next) => {
  const accessTokenserver = req.header("serveraccessToken");
  console.log(accessTokenserver);
  if (!accessTokenserver) return res.json({ error: "You're not using the api please do not continue." });

  try {
    const validToken = verify(accessTokenserver, process.env.JWT_SECRET_SERVER);
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { verifyuser, verifyserver };