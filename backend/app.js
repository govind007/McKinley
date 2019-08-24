const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const config = require('./config');
const db = require('./config/db');
const app = express();

// view engine setup
app.set('port', config.port);
app.use(cors());
app.use(helmet());
app.use(logger('dev'));
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(config.root, 'public')));
require('./routes/index')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
});

const listen = () => {
    app.listen(app.get('port'));
    console.log('Express app is started on port ', app.get('port'));
};

db.on('error', console.log)
    .once('open', listen)
    .on('disconnected', () => {
        console.log('mongo disconnected');
    });

module.exports = app;
