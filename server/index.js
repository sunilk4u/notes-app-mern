require("dotenv").config();
const express = require("express");
const app = express();
var cors = require("cors");
var cookieParser = require("cookie-parser");
const reqLogger = require("./Middlewares/RequestLogger");
const db_connect = require("./Configs/db_config");
const userRouter = require("./Routes/User");
const textRouter = require("./Routes/Text");
const port = process.env.PORT || 5000;

//connect to database
db_connect();

//middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(reqLogger);

//Routes
app.use("/api/user", userRouter);
app.use("/api/text", textRouter);

//base api endpoint
app.get("/api", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "all resources are online",
  });
});

//no resource found
app.all("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "no resource found with this endpoint",
  });
});

//server listening at port
app.listen(port, (err) => {
  if (err) throw err;

  console.log(`server listening at port ${port}`);
});
