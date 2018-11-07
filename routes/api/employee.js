const Employee = require("../../models/Employee");

const router = require("express").Router();

//@route GET api/employees/getEmployees
//@desc Get All Employees
//@access User
router.get("/getEmployees", (req, res) => {
  Employee.find()
    .populate("Attendence")
    //.sort({ hireDate: -1 })
    .then(employees => res.json(employees))
    .catch(err => console.log("error getting employees", err));
});

//@route POST api/employees/addEmployee
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

//@route DELETE api/employees/deleteEmployee/:id
//@desc Delete an Employee
//@access public
router.delete("/deleteEmployee/:id", (req, res) => {
  Employee.findById(req.params.id)
    .then(employee => employee.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ error: err }));
});

//@route PUT api/employees/updateEmployee/:id
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

module.exports = router;
