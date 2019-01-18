const CarSchema = require("../schema/car");

class Car {
  constructor() {}
  querya(id) {
    return new Promise(reslove => {
      CarSchema.findOne({ _id: id }).exec((err, res) => {
        if (err) return;
        reslove({ code: 1, data: res });
      });
    });
  }
  addStep(id, des, date) {
    return new Promise(reslove => {});
  }
  queryList(page, limit, id) {
    return new Promise(reslove => {
      let total;
      CarSchema.find().count((err, res) => {
        total = res;
      });
      CarSchema.find({ business: id })
        .skip(page)
        .limit(limit)
        .exec((err, res) => {
          if (err) return;
          if (res) {
            reslove({
              code: 1,
              data: res,
              total: total
            });
          }
        });
    });
  }
}
module.exports = new Car();
