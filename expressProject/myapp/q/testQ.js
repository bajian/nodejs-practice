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
                    resolve(previous + text.toString(),99);//ֻ�ܴ�һ������
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
 //���Կ�����thenable��������ʽ���������ܽ���һ��Promise.resolve�Ľ����Ϊ�������롣
 
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
//allPromise.then(console.log, console.error)//����
allPromise.spread(console.log);//չ��ÿ���Ľ��,�൱������ģ�log������str1,str2
//allPromise.spread(function(str1,str2){
//	console.log('spread '+str1+'-'+str2);
//});//չ��ÿ���Ľ��

//���ò�ǿ��һ�£�promise��ģ�º���������ֻ��һ������ֵ��������Q.all�����ɹ���ɵ�promisesʱ������onFulfilledֻ����һ��������һ������������������飩��
//����ܻ�Դ˸е��Ծ���Ȼ����ͬ������һ����promise��һ����Ҫ��֤���������ѽ��չ���ɶ��������������Q.spread��

