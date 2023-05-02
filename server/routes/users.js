const express = require("express");
const fileUpload = require("express-fileupload");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path")

const app = express();

app.use(
  fileUpload({
    limits: {
      fileSize: 10000000,
    },
    abortOnLimit: true,
  })
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/temp')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})


const upload = multer({ storage:storage });

router.post("/register", async (req, res) => {
  const {
    username,
    password,
    passwordrep,
    email,
    age,
    phonenumber,
    gender,
    othergender,
  } = req.body;
  console.log(req.body);
  const usernameiu = await Users.findOne({ where: { username: username } });
  const emailiu = await Users.findOne({ where: { email: email } });

  var phonenumeriu = null;
  if (phonenumber) {
    var phonenumeriu = await Users.findOne({
      where: { phonenumber: phonenumber },
    });
  }
  if (!gender) {
    var genderin = othergender;
  } else {
    var genderin = gender;
  }

  const parts = age.split("-");
  var monthint = parseInt(parts[0]);
  var monthint = monthint + 1;
  const monthstr = monthint.toString();
  parts[0] = monthstr;

  const mydate = new Date(`${parts[2]}/${parts[1]}/${parts[0]}`);

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
  } else if (password != passwordrep) {
    res.json({ error: "passwords are not the same" });
  } else {
    Users.create({
      username: username,
      email: email,
      password: hashpw,
      age: mydate,
      phonenumber: phonenumber,
      emailverification: 1,
      gender: genderin,
    });
    res.json("success");
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  console.log(username);

  const user = await Users.findOne({
    where: { username: username },
  });
  console.log(user);
  const emailuser = await Users.findOne({
    where: { email: username },
  });
  console.log(emailuser);
  if (!user && !emailuser) {
    res.json({ error: "password or username incorrect" });
  }
  if (user) {
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) res.json({ error: "password or username incorrect" });
      else res.json("login succesfull");
    });
  } else if (emailuser) {
    bcrypt.compare(password, emailuser.password).then((match) => {
      if (!match) res.json({ error: "password or username incorrect" });
      else res.json("login succesfull");
    });
  }
});

router.get("/userdata/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);

  const userinfo = await Users.findOne({
    where: { id: id },
    attributes: { exclude: ["password", "emailverification"] },
  });

  res.json(userinfo);
});

router.post("/edituser/:id", async (req, res) => {});

router.post("/editprofile/:id", upload.single('image'),async (req, res) => {
  const id = req.params.id;
  console.log(req.body);

  res.sendStatus(200);
});

module.exports = router;
