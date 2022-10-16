require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const router = require("./src/routes/index");
const app = express();
const { HTTP_PORT } = process.env;

app.use(express.json());
app.use(morgan("dev"));
app.use(router);

app.get("/show", (req, res) => {
  res.send("Hello World!");
});

// 404 handler
app.use((req, res, next) => {
  return res.status(404).json({
    status: false,
    message: "Are you lost?",
  });
});

// 500 handler
app.use((err, req, res, next) => {
  console.log(err);
  return res.status(500).json({
    status: false,
    message: err.message,
  });
});

app.listen(HTTP_PORT, () => console.log("Listening on port", HTTP_PORT));

// sequelize model:generate --name book --attributes title:string,description:string,author:string,publisher:string
// sequelize model:generate --name user --attributes username:string,password:string
