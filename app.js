var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");
const fs = require("fs");
const jwt = require("jsonwebtoken");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

function verifyToken(token) {
  let res = null;
  let cert = fs.readFileSync(
    path.join(__dirname, "./config/rsa_public_key.pem")
  ); //公钥
  try {
    let result = jwt.verify(token, cert, { algorithms: ["RS256"] }) || {};
    let { exp = 0 } = result,
      current = Math.floor(Date.now() / 1000);
    if (current <= exp) {
      res = result.data || {};
    }
  } catch (e) {}
  return res;
}

var app = express();
app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  if (req.method == "OPTIONS") res.send(200);
  else next();
});
app.all("*", (req, res, next) => {
  if (req.path.indexOf("/users") > -1) {
    next();
  } else {
    console.log(req);
    if (req.headers.authorization) {
      if (verifyToken(req.headers.authorization.split(" ")[1])) {
        next();
      } else {
        res.status(401);
        res.json({
          code: -1,
          message: "请登录"
        });
      }
    } else {
      res.status(401);
      res.json({
        code: -1,
        message: "请登录"
      });
    }
  }
});
// view engine setup

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
