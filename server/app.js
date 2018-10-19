var express = require('express');

var app = express();

const indexRouter = require('./routes/index');
 
app.use('/', indexRouter);

app.listen(8080);