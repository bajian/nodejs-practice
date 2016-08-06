var bcrypt = require('bcryptjs');


exports.bhash = function (str, callback) {
  bcrypt.hash(str, 10, callback);
};

exports.bcompare = function (str, hash, callback) {
  bcrypt.compare(str, hash, callback);
};

exports.bhash('bajian',function(err, hash){
	console.log(hash);
});

//$2a$10$qyXO/8s8jTOG0hNUONIGbuidtY0k5/nPaydxqP1ZNC74sEJwq.zY2
//$2a$10$/hhvOSATumoO3YC2Cgzf5.x3mTy2n1scPUxQQLL0GB16.KyJMikom

exports.bcompare('bajian','$2a$10$qyXO/8s8jTOG0hNUONIGbuidtY0k5/nPaydxqP1ZNC74sEJwq.zY2',function(err, res){
	console.log('1-'+res);
});
exports.bcompare('bajian','$2a$10$/hhvOSATumoO3YC2Cgzf5.x3mTy2n1scPUxQQLL0GB16.KyJMikom',function(err, res){
	console.log('2-'+res);
});
exports.bcompare('bajianERR','$2a$10$/hhvOSATumoO3YC2Cgzf5.x3mTy2n1scPUxQQLL0GB16.KyJMikom',function(err, res){
	console.log('ERR 3-'+res);
});