
var extend=function(oldObj,newObj){
	for(var key in newObj){
		oldObj[key]=newObj[key];
	}
	return oldObj;
}

console.log(extend({
	name:'bajian',
	money:11
},{
	money:99,
	method:'POST',
	f:'ffff'
}
));