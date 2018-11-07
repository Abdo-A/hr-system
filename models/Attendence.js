const mongoose = require("mongoose");

const AttendenceSchema = new mongoose.Schema({
  day: {
    type: Date,
    default: Date.now
  },
  workingHours: {
    type: String
  },
  status: {
    type: String
  }
});

module.exports = Attendence = mongoose.model("Attendence", AttendenceSchema);
