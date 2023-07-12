const express = require("express");
const router = express.Router();
const { Posts, users } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const multer = require("multer");
var cors = require('cors');
var app = express(); 
app.use(cors());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/temp");
  },
  filename: async function (req, file, cb) {
    const username = req.params.username;
    const extention = path.extname(file.originalname);
    const numberofposts = await users.findOne({
      where: { id: UserId },
      atributes: ["numberofpost"],
    });
    cb(null, `postimage_${numberofposts}` + extention);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/newpost:username",
  validateToken,
  upload.single("image"),
  async (req, res) => {
    const { posttitle, posttext, postimage, filetype } = req.body;
    const username = req.user.username;
    const UserId = req.user.id;
    const numberofposts = await users.findOne({
      where: { id: UserId },
      atributes: ["numberofpost"],
    });
    if (postimage) {
      var imput = path.join(
        __dirname,
        "..",
        "images/temp",
        "postimage_" + numberofposts + "." + filetype
      );
      var output = path.join(
        __dirname,
        "..",
        "images/post_images",
        `postimage_ ${numberofposts}_${UserId}.png.png`
      );
    }
    if (filetype != "png") {
      await sharp(imput).toFormat("png", { palette: true }).toFile(output);
    } else {
      await sharp(imput).toFile(output);
    }

    const newNumberOfPosts = (numberofposts += 1);
    try {
      await users.update(
        { numberofposts: newNumberOfPosts },
        { where: { id: UserId } }
      );

      if (postimage) {
        await Posts.create({
          posttitle: posttitle,
          posttext: posttext,
          username: username,
          UserId: UserId,
          postimage: `postimage_ ${numberofposts}_${UserId}.png.png`,
        });
      } else {
        await Posts.create({
          posttitle: posttitle,
          posttext: posttext,
          username: username,
          UserId: UserId,
        });
      }
    } catch (err) {
      res.json({ error: "something went wrong" });
    }
  }
);

const getImageBase64 = async (filePath) => {
  const image = await readFileAsync(filePath);
  const buffer = Buffer.from(image);
  return `data:image/png;base64,${buffer.toString("base64")}`;
};

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
  console.log(id);
  try {
    const post = await Posts.findByPk(id);
    if (post) {
      if (post.postimage) {
        const imageURI = await getImageBase64(
          path.join(__dirname, "..", post.postimage)
        );
        res.json({
          post: post,
          imageURI: imageURI,
        });
      } else {
        res.json(post);
      }
    } else {
      res.json({ error: "post not found" });
    }
  } catch (err) {
    res.json({ error: "something went wrong" });
  }
});

module.exports = router;
