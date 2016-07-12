var Q = require('q');
var path = require('path');
var fs = require('fs');
 
function readFile(previous, fileName) {
    return Q.promise(function (resolve, reject) {
        fs.readFile(path.join(process.cwd(), fileName),
            function (error, text) {
			//console.log('text '+text.toString());
                if (error) {
                    reject(new Error(error));
                } else {
                    resolve(previous + text.toString(),99);//只能传一个参数
                }
            });
    });
}

//readFile('', '1.txt')
//    .then(function (previous,sec) {
	//console.log('sec'+sec);//undefined
//        return readFile(previous, '2.txt');
//   })
//    .then(function (finalText) {
//        console.log(finalText);
//    })
//    .catch(function (error) {
//        console.log(error);
//    })
//    .done();
 //可以看出，thenable函数的链式调用总是能将上一个Promise.resolve的结果做为参数传入。
 
console.log('test Q.all');
function fs_readFile (file, encoding) {
  var deferred = Q.defer()
  fs.readFile(file, encoding, function (err, data) {
    if (err) deferred.reject(err) // rejects the promise with `er` as the reason
    else deferred.resolve(data.toString()) // fulfills the promise with `data` as the value
  })
  return deferred.promise // the promise is returned
}

var allPromise = Q.all([ fs_readFile('1.txt'), fs_readFile('2.txt')]);
//allPromise.then(console.log, console.error)//数组
allPromise.spread(console.log);//展开每个的结果,相当于下面的，log参数是str1,str2
//allPromise.spread(function(str1,str2){
//	console.log('spread '+str1+'-'+str2);
//});//展开每个的结果

//不得不强调一下，promise在模仿函数。函数只有一个返回值。当传给Q.all两个成功完成的promises时，调用onFulfilled只会有一个参数（一个包含两个结果的数组）。
//你可能会对此感到吃惊；然而跟同步保持一致是promise的一个重要保证。如果你想把结果展开成多个参数，可以用Q.spread。

