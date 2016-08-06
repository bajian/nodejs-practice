var httpUtil=require('./lib/httpUtil.js');

/*
 var postData = {
 	'name': "szu",
 	'password': "szu123"
 };
*/
 // var opts = {
 // 	hostname: 'http://bxjtest.snewfly.com',
 // 	path: '/jxhd/user/login',
 // 	method: 'POST'
 // };
 
//  var postData = {
//  	'start': "0",
//  	'limit': "2"
//  };

//  //to set cookie
//  var opts = {
//  method: 'POST',
//  	hostname: 'bxjtest.snewfly.com',
//  	path: '/jxhd/school/teacher/query',
//  	headers:{
//  		'Cookie': ' _ga=GA1.2.508302645.1457440461; PHPSESSID=nov8e0grvusj2vvtkahjfflid0; session=eyJpdiI6IjBuYUR3eE5rS2FxTWVVSWxJMkgrMlE9PSIsInZhbHVlIjoiT0JaeVVjNFRoMjlCNTZ1bFV0VTZsNVwvTlJWR01jZnFPMVFDS3Fsbmo0MUdZcnl6dTQ3Zlg5MFRZZHA3bDBNV1c3WHFxbkdsM285TEwxMHJCWXlcL1V6UT09IiwibWFjIjoiY2ZhNjhkYTNkNmRiYmJiYTJmNGY4NGFiYjVlYjE4ZDcyZTA1Y2VjNTEzMWMwYTFhM2Y0ZThmMGM3YWYyZTU1MiJ9'
//  	}
//  };
//  var i=0;
//  var onSucc=function(data){
//  i++;
// 	console.log('onSucc'+data);
//  }
 
//  var onErr=function(data){
// 	console.log('onErr'+data);
//  }

// httpUtil.http_request(opts,postData,onSucc,onErr);

// http://api.cellocation.com/cell/?mcc=460&mnc=0&output=json&lac=09370&ci=03713
var getFromCellocation=function(lac,cid){
       var url='http://api.cellocation.com/cell/',
        opts = {
        hostname: 'api.cellocation.com',
        path: '/cell/'
        },
    postData = {
        mcc: "460",
        mnc: "0",
        output:'json',
        lac:lac,
        ci:cid
    };
    httpUtil.http_request(opts,postData,function(data){
    	console.log(data);
    },function(err){

    });

};

getFromCellocation('09370','03713');