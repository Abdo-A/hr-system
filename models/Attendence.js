const mongoose = require("mongoose");

const AttendenceSchema = new mongoose.Schema({
  day: {
    type: Date,
    default: Date.now
  },
  workingHours: {
    type: Number
  },
  status: {
    type: String
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee"
  }
});

module.exports = Attendence = mongoose.model("Attendence", AttendenceSchema);
