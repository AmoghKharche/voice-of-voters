const express = require("express");
const router = express.Router();
require("../db/conn");
const User = require("../model/userSchema");
const Voter = require("../model/voterSchema");
const Complaints = require("../model/complaintSchema");
const Corporator = require("../model/corporatorSchema");

router.post("/register", async (req, res) => {
  const { name, email, voterid, password, ward } = req.body;
  if (!name || !email || !voterid || !password || !ward) {
    return res.status(422).json({ error: "Please fill all the details" });
  }

  try {
    const voter = await Voter.findOne({ voterid });
    if (!voter) {
      return res
        .status(404)
        .json({ success: false, error: "Voter Id not found" });
    }
    if (voter.name != name) {
      return res
        .status(400)
        .json({ success: false, error: "Voter Id did not match" });
    }
    if (voter.ward != ward) {
      return res
        .status(400)
        .json({ success: false, error: "Voter's Ward did not match" });
    }

    const existingUser = await User.findOne({ voterid });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, error: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      voterid,
      password,
      ward: voter.ward,
    });
    return res.status(201).json({ success: true, message: "Registered" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, error: "Server error" });
  }
});

//login route

router.post("/login", async (req, res) => {
  const { voterid, password } = req.body;

  try {
    const user = await User.findOne({
      voterid: voterid,
      password: password,
    }).exec();

    if (user) {
      // If a matching user is found, return a success message
      return res.status(200).json({ message: "Login successful" });
    } else {
      // If no matching user is found, return an error message
      return res.status(401).json({ message: "Invalid voterid or password" });
    }
  } catch (error) {
    // If there's an error, return a server error message
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

//complaint route

router.post("/register-complaint", async (req, res) => {
  const { complaint, name, ward, tag } = req.body;
  if (!name || !complaint || !tag || !ward) {
    return res.status(422).json({ error: "Please fill all the details" });
  }
  try {
    const complaints = await Complaints.create({
      name,
      complaint,
      ward,
      tag,
    });
    return res
      .status(201)
      .json({ success: true, message: "Complaint Registered succesfully" });
  } catch (error) {
    console.log(error);
  }
});

//corporator route

router.post("/corporator/register", async (req, res) => {
  const { name, email, password, ward } = req.body;
  if (!name || !email || !password || !ward) {
    return res.status(422).json({ error: "Please fill all the details" });
  }
  try {
    const corporator = await Corporator.create({
      name,
      email,
      password,
      ward,
    });
    return res.status(201).json({ success: true, message: "Registered" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, error: "Server error" });
  }
});

router.post("/corporator/login", async (req, res) => {
  const { name, email, password, ward } = req.body;

  try {
    const corporator = await Corporator.findOne({
      email: email,
      ward: ward,
      password: password,
    }).exec();

    if (corporator) {
      return res.status(200).json({ message: "Login successful" });
    } else {
      return res
        .status(401)
        .json({ message: "Invalid email, password or ward." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
