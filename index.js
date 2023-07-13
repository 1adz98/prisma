const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();

// regular middlewares

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// cookie middleware
app.use(cookieParser());
// router middleware
app.use("/api", require("./router/user.router"));
app.use("/api", require("./router/post.router"));

app.listen(5000, () => {
  console.log("Server running at port 5000");
});
