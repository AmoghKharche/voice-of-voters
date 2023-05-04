const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
dotenv.config({ path: "./config.env" });
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
require("./db/conn");
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());
app.use(fileUpload());
app.use(express.static(path.join(__dirname + "/public")));
app.use(require("./router/auth"));

// app.get('/about', middleware, (req, res)=>{
//     console.log("Hello")
//     res.send("Hello0 aboutt World");
// });
// app.get('/contact', (req, res)=>{
//     console.log("Hello")
//     res.send("Hello0 aboutt World");
// })

app.listen(5000, () => {
  console.log("Server is running at 5000");
});
