hex0=new Buffer([0x3E,0x7D,0x0D,0x0A]);
hex1=new Buffer([0x0a,0x0d])
console.log(hex0.toString());//>}

console.log('hex1='+hex1.toString()+'end');//\r\n
console.log(new Buffer("\r\n"));//

console.log(module.paths);