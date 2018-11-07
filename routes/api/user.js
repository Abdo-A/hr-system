const User = require("../../models/User");

const router = require("express").Router();

//@route GET api/users/getUsers
//@desc Get All Users
//@access User
router.get("/getUsers", (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => console.log("error getting users", err));
});

//@route POST api/users/addUser
//@desc Add a User
//@access public
router.post("/addUser", (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  newUser
    .save()
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ error: err }));
});

//@route DELETE api/users/deleteUser/:id
//@desc Delete a User
//@access none
router.delete("/deleteUser/:id", (req, res) => {
  User.findById(req.params.id)
    .then(user => user.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ error: err }));
});

//@route PUT api/users/updateUser/:id
//@desc Update a User
//@access none
router.put("/updateUser/:id", (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, user) => {
      if (err) return res.status(500).json({ error: err });
      return res.json(user);
    }
  );
});

module.exports = router;
