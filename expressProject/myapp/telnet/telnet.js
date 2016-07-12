var net =require('net');


//测试用事件回调会不会阻塞
var events = require('events');
var util = require('util');
function ExBuf(){
    events.EventEmitter.call(this);
}
util.inherits(ExBuf, events.EventEmitter);





var server = require('net').createServer(function(socket){
    var dev_address=socket.remoteAddress+':'+socket.remotePort;
    console.log("new client : "+dev_address);
	var ex=new ExBuf();
	
	ex.on('put',function(data){
		console.log('put'+data);
		ex.emit("deal", data );
	});

	ex.on('deal',function(data){//实践证明一个样deal end 才会接收下个包
		console.log('deal');
		for(var i=0;i<9999999999;i++){}
		console.log('deal end');
	});
	
	
	
    socket.on('data', function(data){
		console.log(data);
		//进行复杂长时间运算，看看会不会阻塞其他用户数据包
		//for(var i=0;i<9999999999;i++){}//实践证明是会的，后续的包会按顺序响应，不过得当前包的响应完成。也就会照成卡顿
		ex.emit("put", data );
		write(socket,'receive->'+data);
    });
    socket.on('error', function (err){
		console.log(err);
    });
    socket.on('end', function() {
		console.log('end')
    });
}).listen(9091,'0.0.0.0');

var write=function(socket,data){
	socket.write(data);
}
