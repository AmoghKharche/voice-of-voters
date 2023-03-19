const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
require("../db/conn");
const User = require("../model/userSchema");
const Voter = require("../model/voterSchema");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { name, email, voterid, password, cpassword } = req.body;
  if (!name || !email || !voterid || !password) {
    return res.status(422).json({ error: "Please Fill All the Details" });
  }

  try {
    const voter = await Voter.findOne({ voterid });
    if (!voter) {
      return res
        .status(404)
        .json({ success: false, error: "Voter id not found" });
    }
    if (voter.name != name) {
      return res
        .status(400)
        .json({ success: false, error: "Voter id not match" });
    }
    const user = await User.create({
      name,
      email,
      voterid,
      password,
      ward: voter.ward,
    });
    return res.status(201).json({ success: true, user });
    res.status(201).json({ sucess: true, message: "Registered" });
  } catch (err) {
    console.log(err);
  }
});

//login route

router.post("/login", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;

    if (!voterid || !password) {
      return res.status(400).json({ error: "Please Fill in valid details" });
    }

    const userLogin = await User.findOne({ voterid: Voter.voterid });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      token = await userLogin.generateAuthToken();
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 2592000000),
        httpOnly: true,
      });

      if (!isMatch) {
        res.json({ error: "Invalid Credentials" });
      } else {
        res.json({ message: "User Logged in successfully" });
      }
    } else {
      res.json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
