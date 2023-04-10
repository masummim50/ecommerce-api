const express = require("express");
const cors = require("cors");
const UserModel = require("./models/user");
const authRouter = require("./router/auth.router");
const sellerRouter = require("./router/seller.router");
const publicRouter = require("./router/public.router");

const app = express();

app.use(express.json());
app.use(cors());

// to be able to serve static files such as html and css
app.use(express.static(__dirname));

// write all the routers down here in that format
// app.use("/", somerouter)
app.use("/", authRouter)
app.use("/", sellerRouter)
app.use("/", publicRouter)

app.get("/", (req, res) => {
  try {
    // since it is inside a trycatch block, it should automatically resolve to serving the index.html file it finds, but its good to send file path like this
    const filePath = path.join(__dirname, "./index.html");
    res.sendFile(filePath);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error");
  }
});



module.exports = app;
