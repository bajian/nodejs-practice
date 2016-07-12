//测试执行超过设置间隔会怎么样
setInterval(function(){
	console.log('setInterval begin');
	var start=Date.now();
	
	for(var i=0;i<999999999;i++){
		j=Math.random();
	}
	
	var end=Date.now();
	var cost=(end-start)/1000;
	console.log('end cost'+cost);
},1000);
//setInterval begin
//end cost42.707
//setInterval begin
//实践发现会一直卡在前一个上，知道运行完毕才会执行下一次Interval，和settimeout一样单线程