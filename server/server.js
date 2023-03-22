const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
dotenv.config({ path: "./config.env" });

require("./db/conn");
app.use(cors());
app.use(express.json());

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
