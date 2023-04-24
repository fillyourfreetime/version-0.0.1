const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const { username, password, passwordrep, email, age, phonenumber } = req.body;
  console.log(req.body);
  const usernameiu = await Users.findOne({ where: { username: username } });
  const emailiu = await Users.findOne({ where: { email: email } });

  var phonenumeriu = null;
  if (phonenumber) {
    var phonenumeriu = await Users.findOne({
      where: { phonenumber: phonenumber },
    });
  }

  const parts = age.split("-");
  var monthint = parseInt(parts[0]);
  var monthint = monthint + 1;
  const monthstr = monthint.toString();
  parts[0] = monthstr;

  console.log(parts[0]);
  const mydate = new Date(`${parts[2]}/${parts[1]}/${parts[0]}`);
  console.log(mydate);

  const leeftijd = (mydate) => {
    var diff_ms = Date.now() - mydate.getTime();
    var age_dt = new Date(diff_ms);
    var year = age_dt.getUTCFullYear();
    return Math.abs(year - 1970);
  };
  const agee = leeftijd(mydate);

  const hashpw = await bcrypt.hash(password, 10);

  if (usernameiu) {
    res.json({ error: "username already in use" });
  } else if (emailiu) {
    res.json({ error: "email already in use" });
  } else if (phonenumeriu) {
    res.json({ error: "phone number already in use" });
  } else if (agee < 13) {
    res.json({ error: "you have to be atleast 13 or older to use the app" });
  } else if (password != password) {
    res.json({ error: "passwords are not the same" });
  } else {
    Users.create({
      username: username,
      email: email,
      password: hashpw,
      age: mydate,
      phonenumber: phonenumber,
      emailverification: 1,
    });
    res.json("success");
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({
    where: {
      $or: [{ username: { $eq: username } }, { email: { $eq: username } }],
    },
  });
  if (!user) {
    res.json({error: "password or username incorrect"})
  }

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) res.json({error: "password or username incorrect"})
  })
});

module.exports = router;
