var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var calculatorRouter = require('./routes/calculator');
var resistorConfigurationRouter = require('./routes/resistorCofiguration');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200
}))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/calculator', calculatorRouter);
app.use('/resistor/configuration', resistorConfigurationRouter);

module.exports = app;
