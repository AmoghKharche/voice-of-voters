const express = require("express");
const router = express.Router();
const User = require("../model/userSchema");
const Voter = require("../model/voterSchema");
const Complaints = require("../model/complaintSchema");
const Corporator = require("../model/corporatorSchema");
const ShortUniqueId = require("short-unique-id");
const uid = new ShortUniqueId({ length: 6 });
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/Authenticate");
// const multer = require("multer");
const fs = require("fs");
const Image = require("../model/imageSchema");

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

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

    if (!user) {
      return res.status(401).json({ message: "Invalid voterid or password" });
    }
    token = await user.generateAuthToken();
    console.log(token);
    return res
      .cookie("jwtoken", token)
      .status(200)
      .json({ message: "Login successful" });
  } catch (error) {
    // If there's an error, return a server error message
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

//complaint route

router.post("/api/register-complaint", async (req, res) => {
  console.log(req.body);
  // const { complaint, address, name, ward, tag } = req.body;
  // const { image } = req.file;
  console.log(req.files);
  console.log(req.file);
  // if (!name || !complaint || !tag || !ward) {
  //   return res.status(422).json({ error: "Please fill all the details" });
  // }
  // let ticketId = await uid();
  // const existingComplaint = await Complaints.findOne({ ticketId });
  // if (existingComplaint) {
  //   ticketId = await uid();
  // }

  // const complaints = await Complaints.create({
  //   name,
  //   complaint,
  //   ward,
  //   tag,
  //   address,
  //   ticketId,
  // });
  // await Image.create({
  //   ticketId,
  //   data: image.data,
  //   contentType: image.mimetype,
  // });
  try {
    return res.status(201).json({
      success: true,
      message: "Complaint Registered succesfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/api/image/:ticketId", async (req, res) => {
  const { ticketId } = req.params;
  const { contentType, data } = await Image.findOne({
    ticketId,
  });
  res.contentType(contentType).send(data);
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
        .cookie("jwtoken", token, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
        })
        .status(401)
        .json({ message: "Invalid email, password or ward." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/corporator-status", async (req, res) => {
  const { text } = req.body;
  console.log(req.body);
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
  //middleware stuff
  router.get("/announcements", authenticate, (req, res) => {
    console.log("Hello");
    res.send(req.rootUser);
  });
});

// await Complaints.findOneAndUpdate(
//   { ticketId: ticketId },
//   { status: "Resolved" }
// );

module.exports = router;
