var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const config = require('config');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/api/users');
var notesRouter = require('./routes/api/notes');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/note', notesRouter);

module.exports = app;
