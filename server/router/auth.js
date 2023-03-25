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
const CorporatorLogin = require("../model/CorporatorLoginSchema");

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
    const user = await User.findOne({
      voterid: voterid,
      password: password,
    }).exec();
    if (!user) {
      return res.status(401).json({ message: "Invalid voterid or password" });
    }
    let token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
    console.log(token);
    res
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

router.post("/register-complaint", authenticate, async (req, res) => {
  const { complaint, address, name, ward, tag, status } = req.body;
  //const { image } = req.file || {};

  if (!name || !complaint || !tag || !ward) {
    return res.status(422).json({ error: "Please fill all the details" });
  }

  let ticketId = await uid();

  try {
    const existingComplaint = await Complaints.findOne({ ticketId });
    if (existingComplaint) {
      ticketId = await uid();
    }

    const complaints = await Complaints.create({
      name,
      complaint,
      ward,
      tag,
      address,
    });
    console.log(
      "🚀 ~ file: auth.js:107 ~ router.post ~ complaints:",
      complaints
    );

    // await Image.create({
    //   ticketId,
    //   data: image.data,
    //   contentType: image.mimetype,
    // });

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
    const corporator = await Corporator.findOne({ ward });
    if (!corporator) {
      return res.status(404).json({ success: false, error: "Ward not found" });
    }
    if (corporator.name != name) {
      return res
        .status(400)
        .json({ success: false, error: "Name did not match" });
    }
    if (corporator.ward != ward) {
      return res
        .status(400)
        .json({ success: false, error: "Ward did not match" });
    }
    const corporatorLogin = await CorporatorLogin.create({
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
  const { email, password, ward } = req.body;

  try {
    const corporatorLogin = await CorporatorLogin.findOne({
      email: email,
      ward: ward,
      password: password,
    }).exec();

    if (corporatorLogin) {
      return res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid email, password or ward." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

// middleware
router.get("/home", (req, res) => {
  console.log("Hello");
  res.send("Hello0 aboutt World");
});
router.get("/register-complaint", (req, res) => {
  console.log("Hello");
  res.send(req.rootUser);
});
router.get("/track-complaint", (req, res) => {
  console.log("Hello");
  res.send(req.rootUser);
  //middleware stuff
});

//its a independent route.
//localhost:5000/announcements
//if you put it another route it will hold trailing endpoint

router.get("/announcements", authenticate, (req, res) => {
  console.log("Hello");
  res.send(req.rootUser);
});
router.get("/complaints", (req, res) => {});
router.post("/complaints/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Update the status of the complaint with the given ID in the database
  // ...

  // Send a status update to the user who filed the complaint
  // ...

  res.sendStatus(200);
});

// await Complaints.findOneAndUpdate(
//   { ticketId: ticketId },
//   { status: "Resolved" }
// );

// Faiyaz's codes
router.get("/api/complaints/:ticketId", async (req, res) => {
  if (!req.params.ticketId) {
    return res
      .status(400)
      .json({ error: "Bad request. Please attach ticketId on the url" });
  }

  try {
    const { ticketId } = req.params;
    const complaint = await Complaints.findOne({ ticketId: ticketId });
    if (!complaint) {
      return res
        .status(404)
        .json({ error: "No Complaint Found with this Ticket Id" });
    }

    return res.status(200).json(complaint);
  } catch (error) {}
});

router.patch("/api/complaint-status-update/:ticketId", async (req, res) => {
  try {
    if (!req.body.status || !req.params.ticketId) {
      return res
        .status(400)
        .json({ error: "Bad request. Please send proper resource" });
    }

    const { status } = req.body;
    const { ticketId } = req.params;

    const complaint = await Complaints.findOne({ ticketId: ticketId });
    if (!complaint) {
      return res
        .status(404)
        .json({ error: "No Complaint Found with this Ticket Id" });
    }

    complaint.status = status;
    await complaint.save();

    return res.status(200).json("Status updated successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/api/complaints", async (req, res) => {
  try {
    const complaints = await Complaints.find({}).select(
      "ticketId name complaint ward tag status"
    );
    return res.status(200).json(complaints);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/logout", (req, res) => {
  console.log("Logout User");
  res.cookie("jwtoken", "none", {
    expires: new Date(Date.now() + 10 * 1000),
  });
  res.status(200).send("User Logout");
});

module.exports = router;
