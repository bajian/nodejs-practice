var Q = require('q');
var path = require('path');
var func=require('./func.js');
var fs = require('fs');

func.fs_readFile('qqq.txt').then(function(txt){
	console.log('then '+txt);
	var deferred = Q.defer();
	
	if(txt==='123'){
	console.log(' in if ');
	deferred.resolve(txt);
	}else{
	fs.readFile('qqq2.txt', function (err, data) {
    if (err) deferred.reject(err) // rejects the promise with `er` as the reason
    else deferred.resolve(data.toString()) // fulfills the promise with `data` as the value
  });
  }
		
  
  return deferred.promise;
}).done(function(txt){
	console.log('done '+txt);
});



