const express = require("express");
const router = express.Router();

router.get("/register", async(req, res) => {
    const {username, password, email, age, phonenumber} = req.body
    const usernameiu = await Users.findOne({ where: { username: username } });
    const emailiu = await Users.findOne({ where: { email: email } });
    const phonenumeriu = await Users.findOne({ where: { phonenumber: phonenumeriu } });

    if (usernameiu) {
        res.json({error: "username already in use"})
    }else if (emailiu) {
        res.json({error: "email already in use"})
    }else if (phonenumeriu){
        res.json({error: "phone number already in use"})
    } else if (age){
        
    }
})