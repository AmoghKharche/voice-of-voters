const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

dotenv.config({ path: "./config.env" });

require("./db/conn");

app.use(express.json());
// app.get("/", (req, res) => {
//   res.send("Hello0 about World");
// });
app.use(require("./router/auth"));

// const middleware = (req, res, next) => {
//   console.log("Hello to my MiddleWare");
//   next();
// };

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
