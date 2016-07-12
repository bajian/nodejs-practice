var Q = require('q');
var fs = require('fs');
var path = require('path');
/**
 * mkdirs
 *
 * @return Q(mkdirs) or null(mkdirs_callback).
 */
exports.mkdirs_callback = function(dirpath, mode,callback) {
console.log(path.dirname(dirpath));
	console.log('mkdirs_callback in');
    fs.exists(dirpath, function(exists) {
        if(exists) {
		console.log('exists'+exists);
            callback();
        } else {
            exports.mkdirs_callback(path.dirname(dirpath), mode, function(){
			console.log('mkdirs_callback in2');
                fs.mkdir(dirpath, mode);
                callback();
            });
        }
    });
};
exports.mkdirs = function(dirpath, mode) {
    var deferred = Q.defer();
    exports.mkdirs_callback(dirpath, mode, function() {
        deferred.resolve();
    });
    return deferred.promise;
};