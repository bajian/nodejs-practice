var fs=require('fs');
var completedTasks=0;
var tasks=[];
var wordCounts={};
var filesDir='./text';

function checkIfComplete(argument) {
	completedTasks++;
	if (completedTasks==tasks.length) {
		for(var index in wordCounts){
			console.log(index+': '+wordCounts[index]);
		}
	}
}

function countWordsIntext(text){
	var words=text.toString()
	.toLowerCase()
	.split(/\W+/)
	.sort();
	for(var index in words){
		var word=words[index];
		if (word) {
			wordCounts[word]=(wordCounts[word])?wordCounts[word]+1:1;
		}
	}
}

fs.readdir(filesDir,function(err,files){
	if (err) throw err;
	for(var index in files){
		var task=(function(file){
			fs.readFile(file,function(err,text){//异步读文件
				if (err) throw err;
				countWordsIntext(text);
				checkIfComplete();
			});
		})(filesDir+'/'+files[index]);
		tasks.push(task);
	}
});