let createError = require('http-errors');
let express = require('express');
let session = require('express-session');
let path = require('path');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let Db = require("./database.js");

let indexRouter = require('./routes/index');
let loginRouter = require('./routes/login');
let booksRouter = require('./routes/books');
let userApiRouter = require('./routes/api/user');
let bookApiRouter = require('./routes/api/book');
let booksApiRouter = require('./routes/api/books');

let app = express();

const sessionConfig = {
  'secret': require('./secret/sessionSecret.json').secret,
  'saveUninitialized': true,
  'resave': true
};


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.locals.db = new Db();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session(sessionConfig));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/books', booksRouter);
app.use('/api/user', userApiRouter);
app.use('/api/book', bookApiRouter);
app.use('/api/books', booksApiRouter);

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
