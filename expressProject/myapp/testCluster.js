var cluster = require('cluster');
var http = require('http');
var cpuCount = require('os').cpus().length;
cluster.schedulingPolicy = cluster.SCHED_NONE;
console.log('begin '+Date.now());
/*if (isMaster()) {
    for (var i = 0; i < cpuCount; ++i) {
        cluster.fork();
    }
} else {
	console.log(cluster.worker.id+cluster.isMaster)
    http.createServer(function(req, res) {
        res.writeHead(200);
        res.end('hello world\n');
        console.log(cluster.worker.id);
    }).listen(8000);
}

function isMaster(){
	console.log('in');
	return cluster.isMaster;
}

//实现证明，当cluster 被cluster.fork后，后面的子进程会重复执行这个js*/

//test disconnect
if (cluster.isMaster) {
  var worker = cluster.fork();
  var timeout;

  worker.on('listening', (address) => {
    worker.send('shutdown');
    worker.disconnect();
    timeout = setTimeout(() => {
      worker.kill();
    }, 2000);
  });

  worker.on('disconnect', () => {
    console.log('disconnect');
    clearTimeout(timeout);
  });

} else if (cluster.isWorker) {
  const net = require('net');
  var server = net.createServer((socket) => {
    console.log('net.createServer');
    // connections never end
  });

  server.listen(8000);

  process.on('message', (msg) => {
    if (msg === 'shutdown') {
        console.log('shutdown');
      // initiate graceful close of any connections to server
    }
  });
}


//更完善：
var cluster = require('cluster');
var os = require('os');
// 获取CPU 的数量
var numCPUs = os.cpus().length;
var workers = {};
if (cluster.isMaster) {
// 主进程分支
cluster.on('death', function (worker) {
// 当一个工作进程结束时，重启工作进程
delete workers[worker.pid];
worker = cluster.fork();
workers[worker.pid] = worker;
});
// 初始开启与CPU 数量相同的工作进程
for (var i = 0; i < numCPUs; i++) {
var worker = cluster.fork();
workers[worker.pid] = worker;
}
} else {
// 工作进程分支，启动服务器
var app = require('./app');
app.listen(3000);
}
// 当主进程被终止时，关闭所有工作进程
process.on('SIGTERM', function () {
for (var pid in workers) {
process.kill(pid);
}
process.exit(0);
});