const ListSchema = require("../schema/list");

class List {
  constructor() {}
  querya(id) {
    return new Promise(reslove => {
      ListSchema.findOne({ _id: id }).exec((err, res) => {
        if (err) return;
        console.log("res", res);
        reslove({ code: 1, data: res });
      });
    });
  }
  queryList(page, limit, val) {
    return new Promise(reslove => {
      let total;
      ListSchema.find().count((err, res) => {
        total = res;
      });
      ListSchema.find(val ? { name: { $regex: `${val}` } } : {})
        .skip(page)
        .limit(limit)
        .exec((err, res) => {
          console.log(err);
          if (err) return;
          if (res) {
            console.log(res);
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
module.exports = new List();
