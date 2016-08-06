var Q = require('q');
var fs = require('fs');
var httpUtil = require('./httpUtil.js');


var getContentByUrl=function(url){
	var deferred = Q.defer(),
	opts = {
		hostname: url,
		path: '/jxhd/user/login'
	},
	postData = {
	};
	httpUtil.http_request(opts,postData,function(data){
		deferred.resolve(data);
	},function(err){
		deferred.reject(err);
	});
	return deferred.promise;
}

var task=[];
for (var i = 0; i < 5; i++) {
	task.push(getContentByUrl('test.wechat.hzsb365.com'));
	task.push(getContentByUrl('cnodejs.org'));
}
// Q.all(task)
// .spread(function(){
// 	// console.log(success);
// 	console.log(arguments);
// },function(err){
// 	console.log(err);
//     }); //控制台打印按顺序的参数排序

Q.all(task)
    .then(function(success){
        console.log(success);
        console.log(typeof success);
    },function(err){
console.log(err);
    }); //全部结束后，控制台打印按顺序的参数排序

// then的数量其实是没有限制的。当然，then的数量过多，要手动把他们链接起来是很麻烦的。
// 这时我们需要用代码来动态制造promise链
/*var funcs = [foo,bar,baz,qux]
var result = Q(initialVal)
funcs.forEach(function(func){
    result = result.then(func)
})
return result
当然，我们可以再简洁一点

var funcs = [foo,bar,baz,qux]
funcs.reduce(function(pre,current),Q(initialVal){
    return pre.then(current)
})


*/

