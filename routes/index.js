var express = require("express");
var router = express.Router();
const login = require("../model");

/* GET home page. */
router.post("/update", (req, res, next) => {
  const { name, id } = req.body;
  login.update(name, id).then(ress => {
    res.json(ress);
  });
});

module.exports = router;
