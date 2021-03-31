var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const Product = require('./models/product');
// const { nextTick } = require('process');

//loading routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let productsRouter = require('./routes/products');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//connect to mongodb
const dbURI = 'mongodb+srv://henryJones:goodPassword@nodetuts.bowg5.mongodb.net/nodeTutsDB?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewurlParser: true, useUnifiedTopology: true }) // this is asynchronous and returns something similar to a promise. can add .then()
    .then((result) => {app.listen(process.env.PORT || 5000); console.log('connected to db')})
    .catch((err) => console.log('there was an error:', err))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//linking to routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

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


//whispering-island-90314
//https://whispering-island-90314.herokuapp.com/ | https://git.heroku.com/whispering-island-90314.git
