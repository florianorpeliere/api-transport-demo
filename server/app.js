var express = require('express');

var app = express();

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
 
app.use('/', indexRouter);
app.use('/api', apiRouter);

app.listen(8080);