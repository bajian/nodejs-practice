var net = require('net');
var server = net.createServer(function(c) { // Connection������
  console.log("connected ");
  c.on("end", function() {
    console.log("end ");
  }) ;
  c.write("Hello,Bigbear !\r\n");
  c.pipe(c);
});
server.listen(8124, function() { // Listening������
  console.log("bind 8124");
});