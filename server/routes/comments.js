const express = require("express");
const router = express.Router();
const { comments } = require("../models");
const { verifyuser, verifyserver } = require("../middlewares/AuthMiddleware");
const { Posts, Users } = require("../models");


router.post("/createcomment", verifyuser, verifyserver, async (req, res) => {
  console.log(req.body);
  const { commentext, postid } = req.body;
  const UserId = req.user.id;
  await comments.create({
    commentext: commentext,
    PostId: postid,
    UserId: UserId,
  });
  res.json(commentext);
});

router.get("/listofcomments:postid", verifyserver, async (req, res) => {
  postid = req.params.postid;
  var itemsProcessed = 0;
  console.log(postid);
  try {
    const commentpost = await comments.findAll({ where: { postid: postid } });
    await commentpost.forEach(async (posts) => {
        var user = await Users.findByPk(posts.dataValues.UserId);
        posts.dataValues.username = user.username;
        itemsProcessed++;
        if (itemsProcessed == commentpost.length) {
          res.json(commentpost);
        }
      });
  } catch (err) {
    console.log(err);
    res.json({ errors: "something went wrong" });
  }
});

module.exports = router;
