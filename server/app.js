const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');


const goodsRouter = require('./routes/goods');
const usersRouter = require('./routes/users');

const app = express();

// connect to mongoose
mongoose.connect('mongodb://127.0.0.1:27017/online-mall', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("connected", function () {
  console.log("MongoDB connected success.")
});

mongoose.connection.on("error", function () {
  console.log("MongoDB connected fail.")
});

mongoose.connection.on("disconnected", function () {
  console.log("MongoDB connected disconnected.")
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  if (req.cookies.userId) {
    next();
  } else if (req.originalUrl === "/users/login" || req.originalUrl.indexOf("/goods/list") > -1) {
    next();  
  } else {
    res.json({
      status: "102",
      msg: "未登录",
      result: ""
    })
  }
})

app.use('/goods', goodsRouter);
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
