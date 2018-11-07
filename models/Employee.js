const mongoose = require("mongoose");

const Attendence = require("./Attendence");

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

EmployeeSchema.methods.addAttendence = (employee, obj) => {
  const newAttendence = new Attendence(obj);
  newAttendence.save();
  employee.attendenceRecord.push(newAttendence);
  return employee.save();
};

module.exports = Employee = mongoose.model("Employee", EmployeeSchema);
