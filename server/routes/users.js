const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const sharp = require("sharp");
const fs = require("fs")

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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/temp");
  },
  filename: function (req, file, cb) {
    cb(null, req.params.id + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post("/editprofile/:id", upload.single("image"), async (req, res) => {
  const id = req.params.id;
  const { pfp, bio, filetype } = req.body;
  console.log(bio)
  console.log(req.body);
  if (pfp) {
    const typetemp = filetype.split("/");
    const type = typetemp[typetemp.length - 1];

    var imput = path.join(__dirname, "..", "images/temp", id + "." + type);
    var output = path.join(__dirname, "..", "images/temp", id + "png.png");
    var newimage = path.join(
      __dirname,
      "..",
      "images/profile_pictures",
      id + ".png"
    );

    try {
      const metadata = await sharp(imput).metadata();
      if (metadata.format != "png") {
        await sharp(imput).toFormat("png", { palette: true }).toFile(output);
      } else {
        await sharp(imput).toFile(output);
      }
      if (metadata.height > metadata.width) {
        var topcut = Math.round((metadata.height - metadata.width) / 2);
        await sharp(imput)
          .extract({
            width: metadata.width,
            height: metadata.width,
            left: 0,
            top: topcut,
          })
          .toFile(newimage);
      } else if (metadata.height < metadata.width) {
        var leftcut = Math.round((metadata.width - metadata.height) / 2);
        console.log(leftcut);
        await sharp(imput)
          .extract({
            width: metadata.height,
            height: metadata.height,
            left: leftcut,
            top: 0,
          })
          .toFile(newimage);
      }
      const metadatanew = await sharp(newimage).metadata();
      console.log(metadatanew);
      var newpfp = id + ".png";
    } catch (error) {
      console.log(error);
    }
  }
  if (fs.existsSync(newimage)) {
    var newpfp = id + ".png";
  } else {
    var newpfp = defualtpfp.jpg;
  }
  if (bio){
    var newbio = bio
  }else {
    var oldbio = await Users.findOne({
      where: { id: id },
    });
    var newbio = oldbio.bio
    console.log(newbio)
  }

  try {
    const result = await Users.update(
       {pfp: newpfp,
       bio: newbio },
       { where: { id: id },},
       
      
    );
    res.json("success");
  } catch (err) {
    res.json({error: err.message});
  }
});

module.exports = router;
