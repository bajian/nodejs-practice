var express = require('express');
var app = express();

app.use(function(req,res,next){
	console.log('middleware');
	next();
});
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/bajian', function (req, res) {
  res.send('bajian!');
  console.log('header send? '+res.headersSent?'yes ':'no');//yes
});
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});