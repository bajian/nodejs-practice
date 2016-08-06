

//120.24.49.37:9091
//http://120.24.49.37:9091/
//http://blog.csdn.net/ligang2585116/article/details/51326365
//var urlinfo = require('url').parse('120.24.49.37');//wrong

var urlinfo = require('url').parse('http://120.24.49.37:9091/');
console.log(urlinfo);//correct


//var urlinfo = require('url').parse('http://blog.csdn.net/ligang2585116/article/details/51326365');
//console.log(urlinfo);//CORRECT

//总结 至少带上http
