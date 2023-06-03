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
    const username = req.params.username;
    const extention = path.extname(file.originalname);
    cb(null, `imagepicture${username}` + extention);
  },
});

const upload = multer({ storage: storage });

router.post("/newpost:username", validateToken,upload.single("image"), async (req, res) => {
  const { posttitle, posttext, postimage } = req.body;
  const username = req.user.username;
  const UserId = req.user.id;
  try {
    await Posts.create({
      posttitle: posttitle,
      posttext: posttext,
      username: username,
      UserId: UserId,
    });
    const metadata = await sharp(imput).metadata();
      if (metadata.format != "png") {
        await sharp(imput).toFormat("png", { palette: true }).toFile(output);
      } else {
        await sharp(imput).toFile(output);
      }
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
