const express = require("express");
const router = express.Router();
const { posts } = require("../models");

router.get('/', () => {
    res.json("hello world")
})