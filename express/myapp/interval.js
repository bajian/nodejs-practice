//����ִ�г������ü������ô��
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
//ʵ�����ֻ�һֱ����ǰһ���ϣ�֪��������ϲŻ�ִ����һ��Interval����settimeoutһ�����߳�