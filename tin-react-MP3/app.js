var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const customerRouter = require('./routes/customerRoute');
const bookingRouter = require('./routes/bookingRoute');
const roomRouter = require('./routes/roomRoute');

const customerApiRouter = require('./routes/api/CustomerApiRoute');
const bookingApiRouter = require('./routes/api/BookingApiRoute');
const roomApiRouter = require('./routes/api/RoomApiRoute');

const sequelizeInit = require('./config/sequelize/init');
sequelizeInit()
    .catch(err => {
      console.log(err);
    });

  const i18n = require('i18n');
i18n.configure({
    locales: ['pl', 'en'], // languages available in the application. Create a separate dictionary for each of them
    directory: path.join(__dirname, 'locales'), // path to the directory where the dictionaries are located
    objectNotation: true, // enables the use of nested keys in object notation
    cookie: 'lang', //the name of the cookie that our application will use to store information about the language curre
  });

const authUtils = require('./util/authUtils');

var app = express();

// add session
const session = require('express-session');
app.use(session({
  secret: 'my_secret_password',
  resave: false,
  saveUninitialized: false,
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret'));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  if (!res.locals.lang) {
    const currentLang = req.cookies['lang'];
    res.locals.lang = currentLang;
  }
  next();
});

app.use((req,res,next)=>{
  const loggedUser= req.session.loggedUser;
  res.locals.loggedUser = loggedUser;
  if(!res.locals.loginError){
    res.locals.loginError = undefined;
  }
  next();
});

app.use(i18n.init);

app.use('/', indexRouter);
app.use('/customers',authUtils.permitAuthenticatedUser, customerRouter);
app.use('/booking',authUtils.permitAuthenticatedUser, bookingRouter);
app.use('/rooms',authUtils.permitAuthenticatedUser, roomRouter);


app.use('/api/customers', customerApiRouter);
app.use('/api/bookings', bookingApiRouter);
app.use('/api/rooms', roomApiRouter);




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
