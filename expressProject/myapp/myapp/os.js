var os = require('os');

console.log('the os tmpdir is: ' + os.tmpdir());
console.log('the endianness of this os is: ' + os.endianness());
console.log('the hostname of this os is: ' + os.hostname());
console.log('the type of this os is: ' + os.type());
console.log('the platform of this os is: ' + os.platform());
console.log('the arch of this os is: ' + os.arch());
console.log('the release of the os is: ' + os.release());
console.log('the uptime os the os is: ' + os.uptime());


console.log('the end of line of this os is: ' + os.EOL);  //os.EOL：操作系统的换行符
console.log('................................................');
console.log('................................................');
console.log(os.cpus());





function showObj(obj){
    if (obj == null) {
        console.log('error: ' + obj);    
        return false;
    }
    for (var key in obj){
        if (typeof(obj[key]) == 'array' || typeof(obj[key]) == 'object') {
            showObj(obj[key]);    
        } else {
            if (obj[key] != null)
                console.log(key + "=" + obj[key]);    
        }
    }
}