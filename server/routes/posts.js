const express = require("express");
const router = express.Router();
const { Posts } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/temp");
  },
  filename: function (req, file, cb) {
    const id = req.params.id;
    const extention = path.extname(file.originalname);
    cb(null, `iamgepicture${id}` + extention);
  },
});

const upload = multer({ storage: storage });

router.post("/newpost", validateToken,upload.single("image"), async (req, res) => {
  const { posttitle, posttext, postimage } = req.body;
  const username = req.user.username;
  const UserId = req.user.id;
  if (postimage) {

  }
  try {
    await Posts.create({
      posttitle: posttitle,
      posttext: posttext,
      username: username,
      UserId: UserId,
    });
    res.json("post created successfully");
  } catch (err) {
    res.json({ error: "something went wrong" });
  }
});

router.get("/allposts", async (req, res) => {
  try {
    const listofposts = await Posts.findAll();
    res.json(listofposts);
  } catch (err) {
    res.json({ error: "something went wrong" });
  }
});

router.get("/onepost:id", async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Posts.findOne({ where: { id: id } });
    if (post) {
      res.json(post);
    } else {
      res.json({ error: "post not found" });
    }
  } catch (err) {
    res.json({ error: "something went wrong" });
  }
});

module.exports = router;
