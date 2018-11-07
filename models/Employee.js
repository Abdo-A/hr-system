const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  mobile: {
    type: String
  },
  hireDate: {
    type: Date,
    default: Date.now
  },
  attendenceRecord: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attendence"
    }
  ]
});

module.exports = Employee = mongoose.model("Employee", EmployeeSchema);
