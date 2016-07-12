//00 00 00 00 00 5f ab ac bd 3b
//node stringHex2Dec.js "00 00 00 00 00 5f ab bd 3b"
var str=process.argv[2];
console.log(str);
str=str.replace(/ /g,'');
console.log(parseInt(str,16));


function buf_to_string(buf) {
    var six={0:'0',1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9',10:'a',11:'b',12:'c',13:'d',14:'e',15:'f'};
    var string='<Buffer ';
    for (var i = 0; i < buf.length; i++) {
        string+=six[parseInt(buf[i]/16)]+six[buf[i]%16]+' ';
    };
    string+='>';
    return string;
}