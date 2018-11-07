const Employee = require("../../models/Employee");

const router = require("express").Router();

//@route GET api/employees/getEmployees (body:none)
//@desc Get All Employees
//@access User
router.get("/getEmployees", (req, res) => {
  Employee.find()
    .populate("attendenceRecord")
    //.sort({ hireDate: -1 })
    .then(employees => res.json(employees))
    .catch(err => console.log("error getting employees", err));
});

//@route POST api/employees/addEmployee (body: employee object)
//@desc Add an Employee
//@access public
router.post("/addEmployee", (req, res) => {
  const newEmployee = new Employee({
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile,
    hireDate: req.body.hireDate
  });
  newEmployee
    .save()
    .then(employee => res.json(employee))
    .catch(err => res.status(404).json({ error: err }));
});

//@route DELETE api/employees/deleteEmployee/:id (body:none)
//@desc Delete an Employee
//@access public
router.delete("/deleteEmployee/:id", (req, res) => {
  Employee.findById(req.params.id)
    .then(employee => employee.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ error: err }));
});

//@route PUT api/employees/updateEmployee/:id (body: {object of changes})
//@desc Update an Employee
//@access public
router.put("/updateEmployee/:id", (req, res) => {
  Employee.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, employee) => {
      if (err) return res.status(500).json({ error: err });
      return res.json(employee);
    }
  );
});

//@route POST api/employees/addAttendence/:id (body:attendence object)
//@desc Add an attendence to an employee
//@access public
router.post("/addAttendence/:id", (req, res) => {
  Employee.findById(req.params.id).then(employee =>
    employee
      .addAttendence(employee, {
        workingHours: req.body.workingHours,
        status: req.body.status,
        employee: req.params.id
      })
      .then(() => res.json({ success: true }))
  );
});

module.exports = router;
