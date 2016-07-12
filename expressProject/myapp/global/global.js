
var count=0;

global.test=function(str){
	count++;
	console.log('[test] '+str+' count='+count);
};

console.log('include golbal.js');

alert=function(){
	console.log('from alert');
}

