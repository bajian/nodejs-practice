var http=require('http');
var fs=require('fs');
var mime=require('mime');
var path=require('path');

var cache={};





function send404(response){
 response.writeHead(404,{
 	'Content-type':'text/plain'
 });
 response.write('Error 404:resource not found.');
 response.end();
}

function sendFile(response,filePath,fileContents){
	response.writeHead(200,{
		'Content-type':mime.lookup(path.basename(filePath))
	});
	response.end(fileContents);
}

function serveStatic(response,cache,absPath){

	console.log('serveStatic '+absPath);
	if (cache[absPath]) {
	console.log('cache ');
		sendFile(response,absPath,cache[absPath]);
	}else{
		fs.exists(absPath,function(exists){
			if (exists) {
				fs.readFile(absPath,function(err,data){
					if (err) {
						send404(response);
					}else{
						cache[absPath]=data;
						sendFile(response,absPath,data);
					}
				})
			}else{
				send404(response);
			}
		})
	}

}

var server=http.createServer(function(request,response){
	var filePath=false;
	if (request.url=='/') {
		filePath='public/index.html';
	}else{
		filePath='public'+request.url;
	}
	var absPath='./'+filePath;
	serveStatic(response,cache,absPath);
});

server.listen(3000,function(){
	console.log('Server listening on port 3000.');
})
	console.log('run');

var chatServer=require('./lib/chat_server');
chatServer.listen(server);
//console.log('guestNumber'+guestNumber);//报错的