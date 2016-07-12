var Q=require("q");
var deviceId='bajian';

var qGetStudentInfo = Q.denodeify(getStudentInfo);

function getStudentInfo(deviceId,callback){
	console.log('getStudentInfo');
	callback(0,{//参数1是err，为1就不会带第二个参数了，所以这里要填0
		schoolId:0,
		classId:0,
		name:'Unknow'
	});
}

qGetStudentInfo(deviceId).then(function(studentInfo){
	console.log('arguments',arguments);
	console.log('studentInfo',studentInfo);
},function(err){
	console.error('err'+err);
}).done();