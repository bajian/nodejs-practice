// ���� events ģ��
var events = require('events');
// ���� eventEmitter ����
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