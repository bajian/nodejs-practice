function divEscapedContentElement(message){
	return $('<div></div>').text(message);
}

function divSystemContentElement(message){
	return $('<div></div>').html('<i>'+message+'</i>');
}

function processUserInput(chatApp,socket){
	var $sendMsg=$('#send-message');
	var message=$sendMsg.val();
	var systemMessage;
	var $msgObj=$('#message');

	if (message.chatAt(0)=='/') {//command
		systemMessage=chatApp.processCommand(message);
		if (systemMessage) {
			$msgObj.append(divSystemContentElement(systemMessage));
		}
		
	}else{
		chatApp.sendMessage($('#room').text(),message);

		$msgObj.append(divEscapedContentElement(message))
		.scrollTop($msgObj.prop('scrollHeight'));
	}
	$sendMsg.val('');
}

//client init
var socket=io.commect();

$(function(){
	var chatApp=new Chat(socket);

	socket.on('nameResult',function(result){
		var message;

		if (result.success) {
			message='u r known as '+result.name+'.';
		}else{
			message=result.message;
		}
		$('#messages').append(divSystemContentElement(message));
	});

	socket.on('joinResult',function(result){
		$('#room').text(result.room);
		$('#messages').append(divSystemContentElement('Room change.'));
	});

	socket.on('message',function(message){
		var newElement=$('<div></div>').text(message.text);
		$('#messages').append(newElement);
	});

	socket.on('rooms',function(rooms){
		$('#room-list').empty();

		for(var room in rooms){
			room =room.substring(1,room.length);
			if (room!='') {
				$('#room-list').append(divEscapedContentElement(room));
			}
		}
	});

	$('#room-list div').click(function(){
		chatApp.processCommand('/join '+$(this).text());
		$('#send-message').focus();
	});
});

setInterval(function(){
	socket.emit('rooms');
},1000);

$('#send-message').focus();

$('#send-form').submit(function(){
	processUserInput(chatApp,socket);
	return false;
});