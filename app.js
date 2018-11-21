var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs')
const jwt = require('jsonwebtoken')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

function verifyToken(token){
  let cert = fs.readFileSync(path.join(__dirname, './config/rsa_public_key.pem'));//公钥
  try{
      let result = jwt.verify(token, cert, {algorithms: ['RS256']}) || {};
      let {exp = 0} = result,current = Math.floor(Date.now()/1000);
      if(current <= exp){
          res = result.data || {};
      }
  }catch(e){
  
  }
  return res;
  
}

var app = express();
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  if(req.method=="OPTIONS") res.send(200);
  else  next();
});
app.all('*', (req, res, next) => {
  console.log('auth', req)
  console.log('result', verifyToken('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNWJlZDRhN2Q2OGZjMGYxYjk4ODQ1ZjZjIiwiZXhwIjoxNTQyNDIzOTg5LCJpYXQiOjE1NDIzMzc1ODl9.P82TnCtLdwpf3FvgQpU2bqIBQNA2nZ090OEiJn_6bi26-HneuTl4bBwG_0zwldNiraT8f2da4Nhn5ajxALNfBq_Q5nXt74FtpjM7pLe0m6gkz4mEEDgzjxj0WY5ByyBhPdounBeFij0-t6z7obOdC1hHEXZPMQc1QprMiDhWpCJGqA5xDKiy_nz-8XXWYJSHm_Ic_ikPNZsU2oQXu1OyYnK2ROXkC-oo1tFZDZlJtsGmoho8tPzY5yt_Xp16VYc_Cy4D17CR0gaY2E12iKE5UUKV3KAPd9IMqkiOTdX_cibA8GnbNmg1e3x6hMWV4Yfv7x6my6biQ0dODJ_E0l03DQ'))
  
  next()
})
// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
