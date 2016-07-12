// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var ee = new events.EventEmitter();
die=false;
ee.on('die',function(){
	die=true;
});

setTimeout(function(){
 console.log('in?!')
	ee.emit('die');
},100);

while(!die){
	
}

console.log('test');