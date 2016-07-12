
var Q=require('q');
var path = require('path');
var fs = require('fs');

exports.appendfile = function (path_filename,buffer){
    var path_name=path.dirname(path_filename);
    var deferred = Q.defer();
    return exports.mkdirs(path_name,'0775').then(function(){
        return Q.nfcall(fs.open,path_filename+'.download', 'a');
    }).then(function(fd){
        return Q.nfcall(fs.write,fd, buffer, 0, buffer.length);
    });
}

/**
 * mkdirs
 *
 * @return Q(mkdirs) or null(mkdirs_callback).
 */
exports.mkdirs_callback = function(dirpath, mode,callback) {
    fs.exists(dirpath, function(exists) {
        if(exists) {
            callback();
        } else {
            exports.mkdirs_callback(path.dirname(dirpath), mode, function(){
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


exports.appendfile('bajian.txt',new Buffer('bajianx '));
exports.appendfile('bajian.txt',new Buffer('bajianx '));
exports.appendfile('bajian.txt',new Buffer('bajianx '));
