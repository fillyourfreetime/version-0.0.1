const express = require("express");
const router = express.Router();
const { Posts, Users } = require("../models");
const { verifyuser, verifyserver } = require("../middlewares/AuthMiddleware");
const multer = require("multer");
const sharp = require("sharp");
var cors = require("cors");
const path = require("path");
const fs = require("fs");
const util = require("util");
var app = express();

app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/temp");
  },
  filename: async function (req, file, cb) {
    const UserId = req.user.id;
    const extention = path.extname(file.originalname);
    const numberofposts = await Users.findOne({
      where: { id: UserId },
      atributes: ["numberofpost"],
    });
    cb(null, `postimage` + extention);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/newpost:username",
  verifyuser,
  verifyserver,
  upload.single("image"),
  async (req, res) => {
    console.log(req.body);
    const { posttitle, posttext, postimage, filetype } = req.body;
    console.log(filetype);
    const username = req.user.username;
    const UserId = req.user.id;
    var numberofposts = await Users.findOne({
      where: { id: UserId },
    });
    console.log(numberofposts.numberofposts);
    const newNumberOfPosts = (numberofposts.numberofposts += 1);
    if (postimage) {
      var imput = path.join(
        __dirname,
        "..",
        "images/temp",
        "postimage" + "." + filetype
      );
      var output = path.join(
        __dirname,
        "..",
        "images/post_images",
        `postimage_ ${newNumberOfPosts}_${UserId}.jpg.jpg`
      );
      if (filetype != "jpg") {
        console.log(imput);
        await sharp(imput).toFormat("jpg", { palette: true }).toFile(output);
      } else {
        await sharp(imput).toFile(output);
      }
    }

    try {
      await Users.update(
        { numberofposts: newNumberOfPosts },
        { where: { id: UserId } }
      );

      if (postimage) {
        await Posts.create({
          posttitle: posttitle,
          posttext: posttext,
          username: username,
          UserId: UserId,
          postImage: `post_images/postimage_ ${newNumberOfPosts}_${UserId}.jpg.jpg`,
          numberofposts: newNumberOfPosts,
        });
      } else {
        await Posts.create({
          posttitle: posttitle,
          posttext: posttext,
          username: username,
          UserId: UserId,
          Username: username,
        });
        res.json({ succses: "post successfully created" });
      }
    } catch (err) {
      res.json({ error: "something went wrong" });
    }
  }
);

const readFileAsync = util.promisify(fs.readFile);

const getImageBase64 = async (filePath) => {
  const image = await readFileAsync(filePath);
  const buffer = Buffer.from(image);
  return `data:image/png;base64,${buffer.toString("base64")}`;
};

router.get("/allposts", verifyserver, async (req, res) => {
  var itemsProcessed = 0;
  try {
    const listofposts = await Posts.findAll();
    await listofposts.forEach(async (posts) => {
      var user = await Users.findByPk(posts.dataValues.UserId);
      posts.dataValues.username = user.username;
      if (posts.dataValues.postImage) {
        console.log("post.postimage");
        const imageURI = await getImageBase64(
          path.join(__dirname, "..", posts.dataValues.postImage)
        );
        posts.dataValues.image = imageURI
      }
      itemsProcessed++;
      if (itemsProcessed == listofposts.length) {
        res.json(listofposts);
      }
    });
  } catch (err) {
    res.json({ error: "something went wrong" });
  }
});

router.get("/onepost:id", verifyserver, async (req, res) => {
  const id = req.params.id;
  console.log(id);

  try {
    const post = await Posts.findByPk(id);
    if (post) {
      var user = await Users.findByPk(post.UserId);
      post.dataValues.username = user.username;
      if (post.postImage) {
        console.log("post.postimage");
        const imageURI = await getImageBase64(
          path.join(__dirname, "..", post.postImage)
        );
        post.dataValues.image = imageURI
        res.json(post.dataValues);
      } else {
        console.log(post);
        res.json(post.dataValues);
      }
    } else {
      res.json({ error: "post not found" });
    }
  } catch (err) {
    console.log(err);
    res.json({ error: "something went wrong" });
  }
});

router.get("/personposts/:id", verifyserver, async (req, res) => {
  var itemsProcessed = 0;
  const id = req.params.id;
  console.log(id);
  try {
    const post = await Posts.findAll({ where: { UserId: id } });
    if (post) {
      await post.forEach(async (posts) => {
        var user = await Users.findByPk(posts.dataValues.UserId);
        posts.dataValues.username = user.username;
        if (posts.dataValues.postImage) {
          console.log("post.postimage");
          const imageURI = await getImageBase64(
            path.join(__dirname, "..", posts.dataValues.postImage)
          );
          posts.dataValues.image = imageURI
        }
        itemsProcessed++;
        if (itemsProcessed == post.length) {
          console.log("success!");
          res.json(post);
        }
      });
    } else {
      console.log("succses");
      res.json({ error: "post not found" });
    }
  } catch (err) {
    console.log(err);
    res.json({ error: "something went wrong" });
  }
});
module.exports = router;
