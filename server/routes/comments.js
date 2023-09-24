const express = require("express");
const router = express.Router();
const { comments } = require("../models");
const { verifyuser } = require("../middlewares/AuthMiddleware");

router.post("/createcomment", verifyuser, async (req, res) => {
    const comment = req.body
    const UserId= req.user.id
    comment.UserId = UserId
    await comments.create(comment)
    res.json(comment)
})

router.get("/listofcomments:postid", async (req, res) => {
    postid = req.params.postid
    console.log(postid)
    try {
        const commentpost = await comments.findAll({where: { postid: postid }})
        res.json(commentpost)
    } 
    catch (err) {
        console.log(err)
        res.json({errors: "something went wrong"})
    }
}) 

module.exports = router;
