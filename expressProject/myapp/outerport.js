var http =require('http');
var cluster=require('cluster');
var i=0;


if (cluster.isMaster) {
	if(require("tty").isatty(1))
		console.log('isatty');
	else
		console.log('not isatty');//通过supervisor启动
	console.log('I am master');
	cluster.fork();//可以根据os核心数来设置
	cluster.fork();
	cluster.fork();
	cluster.fork();
} else if (cluster.isWorker) {
	http.createServer(function(req,res){
		console.log(req.url);
		var msg='';
		if (cluster.isMaster)
			console.log('isMaster');
		else
			msg=' isWorker:'+cluster.worker.id;
			// console.log('isWorker:'+cluster.worker.id);
		res.writeHead(200,{
				'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
			});
	res.write(' write content..'+msg);//实现证明，需要supervisor> restart outerport 重启才能更新成功
	res.end(' bajian '+(i++));
}).listen(9091,'0.0.0.0');

	// setInterval(function(){
	// 	for(var i=0;i<100;i++){
	// 		(function(i){

	// 			setTimeout(function(){
	// 				for(var j=0;j<100000000;j++){
	// 				}
	// 				console.log('haha..'+i);
	// 			},500);
	// 		})(i);
	// 	}

	// },1000);//单线程阻塞
}

