var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var notFoundHandler = require('./handlers/notFoundHandler');

var indexRouter = require('./routes/index');
var calculatorRouter = require('./routes/calculator');
var resistorConfigurationRouter = require('./routes/resistorConfiguration');
var colorSelectorConfigurationRouter = require('./routes/colorSelectorConfiguration');

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
app.use('/calculator', calculatorRouter);
app.use('/resistor/configuration', resistorConfigurationRouter);
app.use('/colorselector/configuration', colorSelectorConfigurationRouter);
app.use('*', notFoundHandler.handle);

module.exports = app;
