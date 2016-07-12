var value=require('./value.js');
//cleanCache(require.resolve('./value.js'));//清楚缓存
//var value=require('./value.js');
exports.show=()=>{
	console.log(value);
};

//cleanCache(require.resolve('./TcpServerDealMessage.js'));//使用require.resolve函数来查询某个模块文件的带有完整绝对路径的文件名
function cleanCache (modulePath) {
    var module = require.cache[modulePath];
    if (!module){
        console.log('not module');
        return;
    }
    // remove reference in module.parent
    if (module.parent) {
        module.parent.children.splice(module.parent.children.indexOf(module), 1);
    }
    require.cache[modulePath] = null;
}



