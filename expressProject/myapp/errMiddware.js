
var express=require('express');
var app = express();
var fs = require('fs');


// ·�ɺ;������(�м��ϵͳ)������ָ�� /user/:id �� GET ����
app.get('/user/:id', function (req, res, next) {

// Windows and FreeBSD
fs.open('BAJIAN.TXT', 'ax+', (err, fd) => {
  // => null, <fd>
  console.log(err);
  if(err){
	next(err);
  }
  res.send('good!');
  
})
});
//'ax+' - Like 'a+' but fails if path exists.


//����ע������м��ע���˳�򣡣���������������������������������
app.use(function(err, req, res, next) {
 // console.error(err.stack);
  res.status(500).send('Something broke!');
});

var server = app.listen(3001, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
