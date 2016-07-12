
var socketio=require('socket.io');
var io;
var guestNumber=1;
var nickNames=[];
var namesUsed=[];
var currentRoom={};

exports.listen=function(server){
	io=socketio.listen(server);
	io.set('log level',1);

	io.sockets.on('connection',function(socket){
		console.log('connection'+socket.id);
		guestNumber=assignGuestName(socket,guestNumber,nickNames,namesUsed);
		joinRoom(socket,'Lobby');//默认lobby 为romm名字
		handleMessageBroadcasting(socket,nickNames);
		handleNameChangeAttempts(socket,nickNames,namesUsed);
		handleRoomJoining(socket);
		socket.on('room',function(){
			socket.emit('rooms',io.sockets.manager.rooms);
		});
		handleClientDisconnection(socket,nickNames,namesUsed);
	});

	/*
	* 分配一个Guest+数字的名字
	*/
	function assignGuestName(socket,guestNumber,nickNames,namesUsed){
		var name='Guest'+guestNumber;
		nickNames[socket.id]=name;
		socket.emit('nameResult',{
			success:true,
			name:name
		});
		namesUsed.push(name);
		return guestNumber+1;
	}

	function joinRoom(socket,room){
		socket.join(room);
		currentRoom[socket.id]=room;
		socket.emit('joinResult',{room:room});
		socket.broadcast.to(room).emit('message',{
			text:nickNames[socket.id]+' has joined '+room+'.'
		});

		var usersInRoom=io.sockets.clients(room);
		if (usersInRoom.length>1) {
			var usersInRoomSummary='Users currently in '+room+': ';
			for(var index in usersInRoom){
				var userSocketId=usersInRoom[index].id;
				if (userSocketId!=socket.id) {
					if (index>0) {//此处可以优化
						usersInRoomSummary+=', ';
					}
					usersInRoomSummary+=nickNames[userSocketId];
				}
			}
			usersInRoomSummary+='.';
			socket.emit('message',{text:usersInRoomSummary});
		}
	}
//TODO emit可以封装下

	function handleNameChangeAttempts(socket,nickNames,namesUsed){
		socket.on('nameAttempt',function(name){
			console.log(name);
			if (name.indexOf('Guest')==0) {
				socket.emit('nameResult',{
					success:false,
					message:'name cannot begin with Guest.'
				});
			}else{
				if (namesUsed.indexOf(name)==-1) {
					var previousName=nickNames[socket.id];
					var previousNameIndex=nickNames.indexOf(name);
					namesUsed.push(name);
					nickNames[socket.id]=name;
					delete namesUsed[previousNameIndex];
					socket.emit('nameResult',{
						success:true,
						name:name
					});
					socket.broadcast.to(currentRoom[socket.id]).emit(
						'message',
						{
							text:previousName+' is now known as '+name+'.'
						});
					}else{
						socket.emit('nameResult',{
						success:false,
						message:'that name is already in use.'
					});
					}
				}
		});
	}

	function handleMessageBroadcasting(socket){
		socket.on('message',function(message){
			console.log(message+'message'+socket.id);
			socket.broadcast.to(message.room).emit('message',{
				text:nickNames[socket.id]+': '+message.text
			});
		});
	}

	function handleRoomJoining(socket){
		socket.on('join',function(room){
			console.log('join'+socket.id);
			socket.leave(currentRoom[socket.id]);
			joinRoom(socket,room.newRoom);//注意这里的类型
		});
	}

	function handleClientDisconnection(socket){
		socket.on('disconnect',function(){
			console.log('disconnect'+socket.id);
			var nameIndex=namesUsed.indexOf(nickNames[socket.id]);
			delete namesUsed[nameIndex];
			delete nickNames[socket.id];
		});
	}


}