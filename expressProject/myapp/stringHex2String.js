//00 00 00 00 00 5f ab ac bd 3b
//node stringHex2String.js "61"
var str=process.argv[2];
if(!str) return console.log('args null');
arr=str.split(' ');
hexArr=[];
for(var i=0,len=arr.length;i<len;i++){
	hexArr.push(parseInt(arr[i],16));
}
console.log(new Buffer(hexArr).toString());

function buf_to_string(buf) {
    var six={0:'0',1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9',10:'a',11:'b',12:'c',13:'d',14:'e',15:'f'};
    var string='<Buffer ';
    for (var i = 0; i < buf.length; i++) {
        string+=six[parseInt(buf[i]/16)]+six[buf[i]%16]+' ';
    };
    string+='>';
    return string;
}