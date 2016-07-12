var voice=require('./mkdir.js');


voice.mkdirs('bajian/jimi/20160607','0775').then(function(){
	console.log('then');
}).done();