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
const authenticate = require("../middleware/Authenticate");
const multer = require("multer");
const fs = require("fs");
const cookie = require("cookie-parser");
// // image upload

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./router/uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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

    if (user) {
      token = await user.generateAuthToken();
      console.log(token);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 2592000000),
        httpOnly: true,
      });

      return res.status(200).json({ message: "Login successful" });
    } else {
      return res.status(401).json({ message: "Invalid voterid or password" });
    }
  } catch (error) {
    // If there's an error, return a server error message
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

//complaint route

router.post("/register-complaint", upload.single("image"), async (req, res) => {
  const { complaint, address, name, ward, tag, image } = req.body;
  console.log(req.body);
  if (!name || !complaint || !tag || !ward) {
    return res.status(422).json({ error: "Please fill all the details" });
  }
  // image
  console.log(req.file);
  try {
    let imageUploadObject = {
      file: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
      fileName: req.file.originalname,
    };

    console.log(imageUploadObject);
  } catch (error) {
    // const uploadObject = new Upload(imageUploadObject);
    // console.log(uploadObject);
    // saving the object into the database
    // const uploadProcess = await uploadObject.save();
    console.error(error);
    // res.status(500).send("Server Error");
    // res.status(500).send("Server Error");
  } //

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
  const complaints = await Complaints.create({
    name,
    complaint,
    ward,
    tag,
    address,
    ticketId,
    image,
  });
  try {
    return res.status(201).json({
      success: true,
      message: "Complaint Registered succesfully",
      ticketId,
    });
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

module.exports = router;
