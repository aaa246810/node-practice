var express = require("express");
var router = express.Router();
const list = require("../model/list");
const car = require("../model/car");

/* GET home page. */
router.post("/update", (req, res, next) => {
  const { name, id } = req.body;
  login.update(name, id).then(ress => {
    res.json(ress);
  });
});
router.get("/queryList", (req, res, next) => {
  const { page, limit, str } = req.query;
  let offset = (page - 1) * limit;
  let size = Number(limit);
  list.queryList(offset, size, str).then(ress => {
    res.json(ress);
  });
});
router.get("/querya", (req, res, next) => {
  const { id } = req.query;
  list.querya(id).then(ress => {
    res.json(ress);
  });
});
router.get("/querycara", (req, res, next) => {
  const { id } = req.query;
  car.querya(id).then(ress => {
    console.log("res", ress);
    res.json(ress);
  });
});
router.get("/queryCar", (req, res, next) => {
  const { page, limit, id } = req.query;
  let offset = (page - 1) * limit;
  let size = Number(limit);
  car.queryList(offset, size, id).then(ress => {
    res.json(ress);
  });
});

module.exports = router;
