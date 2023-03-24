const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const Authenticate = async (req, res, next) => {
  console.log("middddd");
  try {
    const token = req.cookies.jwtoken;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    //dont need to verify again in database unless you are checking user role or is active
    console.log(verifyToken);
    const rootUser = await User.findOne({
      _id: verifyToken._id,
    });
    if (!rootUser) {
      throw new Error("User Not Found");
    }
    console.log(rootUser);
    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    next();
  } catch (err) {
    res.status(401).json({ success: false, error: "Unauthorized" });
    console.log(err);
  }
};

module.exports = Authenticate;
