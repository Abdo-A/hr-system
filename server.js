const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");

const employeeRoutes = require("./routes/api/employee");
const userRoutes = require("./routes/api/user");
const attendenceRoutes = require("./routes/api/attendence");

const app = express();

//BodyParser middleware
app.use(bodyParser.json());

//DB config
const dbURI = require("./config/key").mongodbURI;

mongoose
  .connect(
    dbURI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to mongoDB.."))
  .catch(err => console.log("Can't connect to db", err));

//Routes
app.use("/api/employees", employeeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/attendences", attendenceRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//Listening
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`App is listening at port ${port}`));
