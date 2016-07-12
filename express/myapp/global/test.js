require('./global.js');



alert();
//require('./test2.js');


var cluster=require('cluster');
if(cluster.isMaster){
	console.log('is master');
	
	var worker = cluster.fork();
	var worker = cluster.fork();
	var worker = cluster.fork();
	var worker = cluster.fork();
	
	
}else{
	//console.log('is worker');
	global.test('my worker id='+cluster.worker.id);
	global.test('my worker id='+cluster.worker.id);
}
//内存中的global也是独立的
