const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");

const employeeRoutes = require("./routes/api/employee");

const app = express();

//BodyParser middleware
app.use(bodyParser.json());

//DB config
const dbURI = require("./config/key").mongodbURI;

mongoose
  .connect(dbURI)
  .then(() => console.log("Connected to mongoDB.."))
  .catch(err => console.log("Can't connect to db", err));

//Routes
app.use("/api/employees", employeeRoutes);

//Listening
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`App is listening at port ${port}`));
