const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const sharp = require("sharp");
const fs = require("fs");
const util = require("util");
const nodemailer = require("nodemailer");
const randtoken = require("rand-token");
const dotenv = require("dotenv").config();
const { sign } = require("jsonwebtoken");

const readFileAsync = util.promisify(fs.readFile);

const sendEmail = (email, token, username) => {
  var email = email;
  var tokens = token;
  var username = username;

  var mail = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_VERIFICATION,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.EMAIL_VERIFICATION,
    to: email,
    subject: "Email verification",
    html: `
      <html ⚡4email>
        <head>
          <meta charset="utf-8">
        </head>
        <body>
        <h1>Dear ${username},</h1>
        <p>You are registered with fillyourfreetime.com with this email adress. Please click the following link to verify this email adress</p>
        <a href="https://localhost:3000/emailverification/${tokens}"> https://localhost:3000/emailverification/${tokens} </a>
        </body>
      </html>`,
  };

  mail.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("not send");
      return 1;
    } else {
      console.log("send");
      return 0;
    }
  });
};

const leeftijd = (age) => {
  console.log(age);
  const parts = age.split("-");
  var monthint = parseInt(parts[1]);
  var monthint = monthint;
  const monthstr = monthint.toString();
  parts[1] = monthstr;
  console.log(parts);
  console.log(parts[2]);
  console.log(parts[1]);
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

  return { agee, mydate };
};

router.post("/register", async (req, res) => {
  const {
    username,
    password,
    passwordrep,
    email,
    birthdate,
    phonenumber,
    gender,
  } = req.body;
  if (
    !username ||
    !password ||
    !passwordrep ||
    !email ||
    !birthdate ||
    !phonenumber
  ) {
    res.json("data missing");
  } else {
    console.log(req.body);
    const usernameiu = await Users.findOne({
      where: { username: username },
    });
    const emailiu = await Users.findOne({
      where: { email: email },
    });

    var phonenumeriu = null;
    if (phonenumber) {
      var phonenumeriu = await Users.findOne({
        where: { phonenumber: phonenumber },
      });
    }

    const { agee, mydate } = leeftijd(birthdate);
    console.log(mydate);
    const token = randtoken.generate(20);
    console.log(token);
    const hashpw = await bcrypt.hash(password, 10);

    if (usernameiu) {
      console.log("no1");
      res.json({ error: "username already in use" });
    } else if (emailiu) {
      console.log("no1");
      res.json({ error: "email already in use" });
    } else if (phonenumeriu) {
      console.log("no1");
      res.json({ error: "phone number already in use" });
    } else if (agee < 13) {
      console.log("no");
      res.json({ error: "you have to be atleast 13 or older to use the app" });
    } else if (password != passwordrep) {
      console.log("no");
      res.json({ error: "passwords are not the same" });
    } else {
      const sent = sendEmail(email, token, username);
      if (sent != 0) {
        Users.create({
          username: username,
          email: email,
          password: hashpw,
          age: mydate,
          phonenumber: phonenumber,
          emailverification: 0,
          gender: gender,
          token: token,
        });
        console.log("check");
        res.json({ succes: "please check your email for verification" });
      } else {
        console.log("no");
        res.json({ error: "please enter valid email" });
      }
    }
  }
});

router.post("/emailregistration", async (req, res) => {
  const { token } = req.body;

  const userinfo = await Users.findOne({
    where: { token: token },
    attributes: { exclude: ["password", "emailverification"] },
  });

  if (!userinfo) {
    res.json({ error: "invalid link" });
  } else if (userinfo.emailverification == 1) {
    res.json({ error: "email already verified" });
  } else {
    const results = await Users.update(
      { emailverification: 1 },
      { where: { token: token } }
    );
    res.json("success");
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  console.log(username);

  var user = await Users.findOne({
    where: { username: username },
  });
  console.log(user);
  if (user == null) {
    var user = await Users.findOne({
      where: { email: username },
    });
  }
  console.log(user);
  //console.log(emailuser);
  if (!user) {
    res.json({ error: "password or username incorrect" });
  }
  if (user) {
    bcrypt.compare(password, user.password).then((match) => {
      const accessToken = sign(
        { username: user.username, id: user.id },
        process.env.JWT_SECRET
      );
      if (!match) res.json({ error: "password or username incorrect" });
      else if (user.emailverification == 0)
        res.json({ error: "please verify email adress" });
      else res.json({ token: accessToken, username: username, id: user.id });
    });
    // } else if (emailuser) {
    //   bcrypt.compare(password, emailuser.password).then((match) => {
    //     const accessToken = sign(
    //       { username: user.username, id: user.id },
    //       process.env.JWT_SECRET
    //     );
    //     if (!match) res.json({ error: "password or username incorrect" });
    //     else if (emailuser.emailverification == 0)
    //       res.json({ error: "please verify email adress" });
    //     else res.json({ token: accessToken, username: username, id: user.id });
    //   });
  }
});

const getImageBase64 = async (filePath) => {
  const image = await readFileAsync(filePath);
  const buffer = Buffer.from(image);
  return `data:image/png;base64,${buffer.toString("base64")}`;
};

router.get("/userdata/:token", async (req, res) => {
  const token = req.params.token;
  console.log(token);

  const userinfo = await Users.findOne({
    where: { token: token },
    attributes: { exclude: ["password", "emailverification"] },
  });
  console.log(userinfo);
  const imageURI = await getImageBase64(
    path.join(__dirname, "..", userinfo.pfp)
  );

  res.json({
    userInfo: userinfo,
    imageURI: imageURI,
  });
});

router.post("/edituser/:token", async (req, res) => {
  const token = req.params.token;
  const { passwordold, passwordnew, passwordnewrep, newusername, phonenumber } =
    req.body;
  console.log(req.body);

  const userinfo = await Users.findOne({ where: { token: token } });

  if (passwordold) {
    await bcrypt.compare(passwordold, userinfo.password).then((match) => {
      if (!match) {
        res.json({ error: "old password is incorrect" });
      }
    });
    if (passwordnew != passwordnewrep) {
      res.json({ error: "passswors are not the same" });
    } else {
      const hashpw = await bcrypt.hash(passwordnew, 10);
      try {
        var resultpw = await Users.update(
          { password: hashpw },
          { where: { token: token } }
        );
      } catch (err) {
        res.json({ error: err.message });
      }
    }
  }

  if (newusername) {
    const usernameiu = await Users.findOne({
      where: { username: newusername },
    });
    if (!usernameiu) {
      try {
        var resultun = await Users.update(
          { username: newusername },
          { where: { token: token } }
        );
        res.json("success");
      } catch (err) {
        res.json({ error: err.message });
      }
    } else {
      res.json({ error: "username is already in use" });
    }
  }

  if (phonenumber) {
    var phonenumeriu = await Users.findOne({
      where: { phonenumber: phonenumber },
    });

    if (!phonenumeriu) {
      try {
        var resultpn = await Users.update(
          { username: phonenumber },
          { where: { token: token } }
        );
      } catch (err) {
        res.json({ error: err.message });
      }
    } else {
      res.json({ error: "phonenumber is already in use" });
    }
  }

  if (
    (resultpw || !passwordold) &&
    (resultun || !newusername) &&
    (resultpn || !phonenumber)
  ) {
    res.json("success");
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/temp");
  },
  filename: function (req, file, cb) {
    const id = req.params.id;
    const extention = path.extname(file.originalname);
    cb(null, `pfp_${id}` + extention);
  },
});

const upload = multer({ storage: storage });

router.post("/editprofile/:id", upload.single("image"), async (req, res) => {
  const id = req.params.id;
  const { pfp, bio, filetype } = req.body;
  console.log(bio);
  console.log(req.body);
  if (pfp && req.file) {
    var imput = path.join(
      __dirname,
      "..",
      "images/temp",
      "pfp_" + id + "." + filetype
    );
    var output = path.join(__dirname, "..", "images/temp", id + "png.png");
    var newimage = path.join(
      __dirname,
      "..",
      "images/profile_pictures",
      "pfp_" + id + ".png"
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
      var newpfp = "images/profile_pictures/pfp_" + id + ".png";
    } catch (error) {
      console.log(error);
    }
  }
  if (fs.existsSync(newimage)) {
    var newpfp = "images/profile_pictures/pfp_" + id + ".png";
  } else {
    var newpfp = "images/profile_pictures/defualtpfp.jpg";
  }
  if (bio) {
    var newbio = bio;
  } else {
    var oldbio = await Users.findOne({
      where: { id: id },
    });
    var newbio = oldbio.bio;
    console.log(newbio);
  }

  fs.unlink(imput, (err) => {
    if (err) {
      throw err;
    }
  });
  fs.unlink(output, (err) => {
    if (err) {
      throw err;
    }
  });

  try {
    const result = await Users.update(
      { pfp: newpfp, bio: newbio },
      { where: { id: id } }
    );
    res.json("success");
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.post("/settheme/:token", async (req, res) => {
  const token = req.params.token;
  const theme = req.body.theme;

  try {
    const result = await Users.update(
      { theme: theme },
      { where: { token: token } }
    );
    res.json("success");
  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;
