var Q = require('q');
var path = require('path');
var fs = require('fs');

 function fs_readFile (file, encoding) {
  var deferred = Q.defer()
  fs.readFile(file, encoding, function (err, data) {
    if (err) deferred.reject(err) // rejects the promise with `er` as the reason
    else deferred.resolve(data.toString()) // fulfills the promise with `data` as the value
  });
  return deferred.promise // the promise is returned
}

exports.fs_readFile=fs_readFile;