var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/voting-management')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

// var apiRouter = require('./routes/book');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist/votingManagement')));
app.use('/', express.static(path.join(__dirname, 'dist/votingManagement')));
app.use('/login', express.static(path.join(__dirname, 'dist/votingManagement')));
// app.use('/api', apiRouter);

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
  res.send(err.status);
});

var server = app.listen( process.env.PORT || 3000, function(){
  console.log('Listening on port ' + server.address().port);
});

module.exports = app;
