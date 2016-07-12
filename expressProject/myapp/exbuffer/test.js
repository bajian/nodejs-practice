var ExBuffer = require('./ExBuffer');

/*************************��������****************************/

//����һ��ExBuffer������4���ֽڣ�uint32�޷������ͣ���ʾ������������little endian �ֽ���
var exBuffer = new ExBuffer().uint32Head().littleEndian();
//���߹���һ��ExBuffer������2���ֽڣ�ushort�ͣ���ʾ������������big endian �ֽ��� (Ĭ��)
var exBuffer = new ExBuffer().ushortHead().bigEndian();

//ֻҪ�յ�����İ��ͻᴥ���¼�
exBuffer.on('data',function(buffer){
    console.log('>> receive data,length:'+buffer.length);
    console.log(buffer);
});

//this.put = function(buffer,offset,len)
//����һ��9�ֽڳ������ݣ��ֶ��put ����Ӧ��TCP�еķְ��������
exBuffer.put(new Buffer([0,9]));
exBuffer.put(new Buffer([1,2,3,4,5,6,7]));
exBuffer.put(new Buffer([8,9]));

//����һ��3���ֽڵ����ݺ�һ��6���ֽڵ����ݣ�һ��put����Ӧ��TCP�е�ճ���������
exBuffer.put(new Buffer([0,3,1,2,3,0,6,1,2,3,4,5,6]));


//�����ݴ������ (20MB)
var exBuffer = new ExBuffer().uint32Head().bigEndian();
exBuffer.on('data',function(buffer){
    console.log('20MB>> receive data,length:'+buffer.length);
    console.log(buffer);
});
var sbuf = new Buffer(4);
sbuf.writeUInt32BE(1024*1024*20,0);//д�����
exBuffer.put(sbuf);
exBuffer.put(new Buffer(1024*1024*20));


/*************************��socket�е�Ӧ��****************************/

console.log('-----------------------use in socket------------------------');

var net = require('net');

//���Է����
var server = net.createServer(function(socket) {
  console.log('client connected');
  new Connection(socket);//�пͻ�������ʱ
});
server.listen(8124);

//�������ӳ��ͻ��˵���
function Connection(socket) {
    var exBuffer = new ExBuffer();
    exBuffer.on('data',onReceivePackData);

    socket.on('data', function(data) {
        exBuffer.put(data);//ֻҪ�յ����ݾ���ExBuffer����put
    });

    //��������յ������İ�ʱ
    function onReceivePackData(buffer){
        console.log('>> server receive data,length:'+buffer.length);
        console.log(buffer.toString());

        var data = 'wellcom, I am server';
        var len = Buffer.byteLength(data);

        //д��2���ֽڱ�ʾ���ΰ���
        var headBuf = new Buffer(2);
        headBuf.writeUInt16BE(len, 0)
        socket.write(headBuf);

        var bodyBuf = new Buffer(len);
        bodyBuf.write(data);
        socket.write(bodyBuf);
    }
}

//���Կͻ���
var exBuffer = new ExBuffer();
var client = net.connect(8124, function() {

  var data = 'hello I am client';
  var len = Buffer.byteLength(data);

  //д��2���ֽڱ�ʾ���ΰ���
  var headBuf = new Buffer(2);
  headBuf.writeUInt16BE(len, 0)
  client.write(headBuf);

  var bodyBuf = new Buffer(len);
  bodyBuf.write(data);
  client.write(bodyBuf);

});

client.on('data', function(data) {
  exBuffer.put(data);//ֻҪ�յ����ݾ���ExBuffer����put
});

//���ͻ����յ����������ݰ�ʱ
exBuffer.on('data', function(buffer) {
    console.log('>> client receive data,length:'+buffer.length);
    console.log(buffer.toString());
});


function buf_to_string(buf) {
    var six={0:'0',1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9',10:'a',11:'b',12:'c',13:'d',14:'e',15:'f'};
    var string='<Buffer ';
    for (var i = 0; i < buf.length; i++) {
        string+=six[parseInt(buf[i]/16)]+six[buf[i]%16]+' ';
    };
    string+='>';
    return string;
}