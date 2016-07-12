
var net = require('net') ;
var client = net.connect({
    port: 8124
},function(){ // connect¼àÌýÆ÷
  console.log("connected") ;
  client.write('Hello,Baby !\r\n') ;
});
client.on("data", function(data) {
  console.log(data.toString()) ;
  client.end() ;
});
client.on("end", function(){
  console.log("end") ;
}) ;