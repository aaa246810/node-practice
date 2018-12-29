const UserSchema = require("../schema");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const path = require("path");

class Login {
  constructor() {}
  register(name, password, age, date) {
    return new Promise(reslove => {
      const user = new UserSchema({
        name: name,
        password: password,
        age: age,
        loginDate: date
      });
      UserSchema.findOne({ name: name }, (err, res) => {
        if (err) return;
        if (res) {
          reslove({
            code: 3,
            message: "用户名已存在"
          });
        } else {
          user.save((err, res) => {
            if (err) {
              console.log("Error:" + err);
              return null;
            }
            reslove({
              code: 1,
              message: "注册成功"
            });
          });
        }
      });
    });
  }
  generateToken(data) {
    let created = Math.floor(Date.now() / 1000);
    let cert = fs.readFileSync(
      path.join(__dirname, "../config/rsa_private_key.pem")
    );
    let token = jwt.sign(
      {
        data,
        exp: created + 3600 * 24
      },
      cert,
      { algorithm: "RS256" }
    );
    return token;
  }
  login(name, password) {
    return new Promise(reslove => {
      UserSchema.findOne({ name: name }, (err, res) => {
        if (err) return;
        if (res) {
          if (res.password === password) {
            let id = res._id;
            let token = this.generateToken(id);
            reslove({
              code: 1,
              message: "登录成功",
              data: {
                name: res.name,
                id: id,
                token: token
              }
            });
          } else {
            reslove({
              code: 2,
              message: "密码错误"
            });
          }
        } else {
          reslove({
            code: 4,
            message: "用户不存在"
          });
        }
      });
    });
  }
  update(name, id) {
    return new Promise(reslove => {
      UserSchema.update({ _id: id }, { $set: { name: name } }, (err, res) => {
        if (err) return;
        reslove({
          code: 1,
          message: "修改成功"
        });
      });
    });
  }
  checkUser(name) {
    return new Promise(reslove => {
      UserSchema.findOne({ name: name }, (err, res) => {
        if (err) return;
        if (res) {
          reslove({
            code: 3,
            message: "用户已存在"
          });
        } else {
          reslove({
            code: 4,
            message: "用户不存在"
          });
        }
      });
    });
  }
  getuser(id) {
    return new Promise(reslove => {
      UserSchema.findOne({ _id: id }, (err, res) => {
        if (err) {
          return null;
        }
        reslove(res);
      });
    });
  }
}
module.exports = new Login();
