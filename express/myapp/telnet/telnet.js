var net =require('net');


//�������¼��ص��᲻������
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

	ex.on('deal',function(data){//ʵ��֤��һ����deal end �Ż�����¸���
		console.log('deal');
		for(var i=0;i<9999999999;i++){}
		console.log('deal end');
	});
	
	
	
    socket.on('data', function(data){
		console.log(data);
		//���и��ӳ�ʱ�����㣬�����᲻�����������û����ݰ�
		//for(var i=0;i<9999999999;i++){}//ʵ��֤���ǻ�ģ������İ��ᰴ˳����Ӧ�������õ�ǰ������Ӧ��ɡ�Ҳ�ͻ��ճɿ���
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
