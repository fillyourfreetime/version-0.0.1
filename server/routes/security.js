const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

router.post('/maketoken', async (req, res) => {
    const {pw} = req.body
    if (pw == process.env.PW_FOR_SECRET) {
        let servertoken = jwt.sign({pw: req.body.pw}, process.env.JWT_SECRET_SERVER, { expiresIn: 129600 });
    } else {
        res.json({error: "please do not hack"})
    }
});

module.exports = router;