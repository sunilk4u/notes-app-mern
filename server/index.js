require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./Routes/User");
const port = process.env.PORT || 5000;

//Routes
app.use("/api/user", userRouter);

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
