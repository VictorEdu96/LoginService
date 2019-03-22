const path = require("path");

const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();

const User = require("../models/user");

router.get("/", (req, res) => {
  res.redirect("/login");
});

router.get("/login", (req, res) => {
	console.log(req.session.isLoggedIn);
  res.sendFile(path.join(__dirname, "..", "views", "login.html"));
});

router.post("/login", (req, res) => {
  User.findOne({ username: req.body.username }, (err, query) => {
    bcrypt.compare(req.body.password, query.password, (err, result) => {
      if (result == true) {
		req.session.isLoggedIn = true
        res.redirect("/dashboard");
      } else {
        res.redirect("/login");
      }
    });
  });
});

router.get("/dashboard", (req, res) => {
	if (!req.session.isLoggedIn) {
		return res.redirect('/login');
	} else {
		res.sendFile(path.join(__dirname, "..", "views", "dashboard.html"));
	}
  
});

// ******** For registering a user *********

//   bcrypt.hash(req.body.password, 10).then(function(hash) {
//       const newUser = new User({
//           username: req.body.username,
//           password: hash
//       });
//       newUser.save(function(err) {
//         if (err) throw err;
//       });
//   });

module.exports = router;
