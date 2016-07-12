cluster = require('cluster');

if (cluster.isMaster) {
var worker_process=[];

for (var i = 0; i < 4; i++) {
        var worker = cluster.fork({index:i});
        worker_process[i]=worker;
        worker.on('message', function(msg) {
            console.log(msg);
        }); 
    }
	//console.log('cluster.workers.length '+cluster.workers);
	Object.keys(cluster.workers).forEach((id) => {
	console.log('ID '+id);
    //cluster.workers[id].on('message', messageHandler);
  });

	setTimeout(function(){
		
	worker_process[0].send({
                            type:'DOWN_TASK',
                            content:0
                        });
						
	worker_process[1].send({
                            type:'DOWN_TASK',
                            content:1
                        });
						//主进程不能用
	//process.send({type:'DOWN_TASK', content:2});
						
	worker_process[3].send({
                            type:'DOWN_TASK',
                            content:3
                        });
						
						console.log('end');
	},1000);

}else{
//子线程可以
process.send({type:'DOWN_TASK', content:2});

process.on('message',function(msg){

console.log(process.env['index']+' process msg '+JSON.stringify(msg));
});
}

//实践证明，主进程里写的子进程监听，需要在子进程发送process.send
//子进程写的监听，需要在主进程写worker_process[3].send
