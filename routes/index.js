var express = require("express");
var router = express.Router();
const login = require("../model");

/* GET home page. */
router.post("/login", (req, res, next) => {
  const { name, password } = req.body;
  login.login(name, password).then(ress => {
    res.json(ress);
  });
});
router.post("/register", (req, res, next) => {
  const { name, password } = req.body;
  login.register(name, password).then(ress => {
    res.json(ress);
  });
});
router.get("/checkuser", (req, res, next) => {
  const { name } = req.query;
  login.checkUser(name).then(ress => {
    res.json(ress);
  });
});

module.exports = router;
