require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(morgan("dev"));

const { HTTP_PORT } = process.env;
app.listen(HTTP_PORT, () => console.log("Listening on port", HTTP_PORT));

sequelize model:generate --name book --attributes title:string,description:string,author:string,publisher:string
sequelize model:generate --name user --attributes username:string,password:string