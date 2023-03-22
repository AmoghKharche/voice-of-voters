const express = require("express");
const router = express.Router();
require("../db/conn");
const User = require("../model/userSchema");
const Voter = require("../model/voterSchema");
const Complaints = require("../model/complaintSchema");
const Corporator = require("../model/corporatorSchema");
const ShortUniqueId = require("short-unique-id");
const uid = new ShortUniqueId({ length: 6 });
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");

//register

router.post("/signup", async (req, res) => {
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
    let token;
    const user = await User.findOne({
      voterid: voterid,
      password: password,
    }).exec();

    token = await user.generateAuthToken();
    console.log(token);

    res.cookie("jwtoken", token, {
      expires: new Date(Date.now() + 2592000000),
      httpOnly: true,
    });

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
  const { complaint, address, name, ward, tag } = req.body;
  if (!name || !complaint || !tag || !ward || !file) {
    return res.status(422).json({ error: "Please fill all the details" });
  }

  let ticketId = null;
  while (!ticketId) {
    try {
      ticketId = uid();
      const existingComplaint = await Complaints.findOne({ ticketId });
      if (existingComplaint) {
        ticketId = null;
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  try {
    const complaints = await Complaints.create({
      name,
      complaint,
      ward,
      tag,
      address,
      ticketId,
      file,
    });

    return res
      .status(201)
      .json({ success: true, message: "Complaint Registered succesfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
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

// middleware
router.get("/home", authenticate, (req, res) => {
  console.log("Hello");
  res.send("Hello0 aboutt World");
});
router.get("/register-complaint", authenticate, (req, res) => {
  console.log("Hello");
  res.send("Hello0 aboutt World");
});
router.get("/track-complaint", authenticate, (req, res) => {
  console.log("Hello");
  res.send("Hello0 aboutt World");
});
router.get("/announcements", authenticate, (req, res) => {
  console.log("Hello");
  res.send(re);
});
module.exports = router;
