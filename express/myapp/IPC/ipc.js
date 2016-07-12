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
						//�����̲�����
	//process.send({type:'DOWN_TASK', content:2});
						
	worker_process[3].send({
                            type:'DOWN_TASK',
                            content:3
                        });
						
						console.log('end');
	},1000);

}else{
//���߳̿���
process.send({type:'DOWN_TASK', content:2});

process.on('message',function(msg){

console.log(process.env['index']+' process msg '+JSON.stringify(msg));
});
}

//ʵ��֤������������д���ӽ��̼�������Ҫ���ӽ��̷���process.send
//�ӽ���д�ļ�������Ҫ��������дworker_process[3].send
