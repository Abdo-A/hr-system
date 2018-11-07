const Attendence = require("../../models/Attendence");

const router = require("express").Router();

//@route GET api/attendences/getAttendences
//@desc Get All Attendences
//@access User
router.get("/getAttendences", (req, res) => {
  Attendence.find()
    .populate("employee")
    .then(attendences => res.json(attendences))
    .catch(err => console.log("error getting attendences", err));
});

module.exports = router;
