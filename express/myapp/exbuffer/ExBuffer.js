/*!
 * ExBuffer
 * yoyo 2012 https://github.com/play175/ExBuffer
 * new BSD Licensed
 */
var util = require(process.binding('natives').util ? 'util': 'sys');

/*
* ���췽��
* @param bufferLength ���������ȣ�Ĭ��512 byte
*/
var ExBuffer = function (bufferLength) {
	var self = this;
    process.EventEmitter.call(this);//�̳��¼���
    var _headLen = 2;
    var _endian = 'B';
    var _buffer = new Buffer(bufferLength || 512);//Buffer����8kb ��ʹ��slowBuffer��Ч�ʵ�
    var _readOffset = 0;
    var _putOffset = 0;
    var _dlen = 0;

    /*
    * ָ��������uint32��(Ĭ����ushort��)
    */
    this.uint32Head = function(){
        _headLen = 4;
        return this;
    };

    /*
    * ָ��������ushort��(Ĭ����ushort��)
    */
    this.ushortHead = function(){
        _headLen = 2;
        return this;
    };

    /*
    * ָ���ֽ��� ΪLittle Endian (Ĭ�ϣ�Big Endian)
    */
    this.littleEndian = function(){
       _endian = 'L';
        return this;
    };

    /*
    * ָ���ֽ��� ΪBig Endian (Ĭ�ϣ�Big Endian)
    */
    this.bigEndian = function(){
       _endian = 'B';
        return this;
    };

     /*
    * ����һ��Buffer
    */
    this.put = function(buffer,offset,len){
        if(offset == undefined)offset = 0;
        if(len == undefined)len = buffer.length - offset;
        //buf.copy(targetBuffer, [targetStart], [sourceStart], [sourceEnd])
        //��ǰ�������Ѿ������������������
        if(len + getLen() > _buffer.length){
            var ex = Math.ceil((len + getLen())/(1024));//ÿ����չ1kb
            var tmp = new Buffer(ex * 1024);
            var exlen = tmp.length - _buffer.length;
            _buffer.copy(tmp);
            //fix bug : superzheng
            if (_putOffset < _readOffset) {
                if (_putOffset <= exlen) {
                    tmp.copy(tmp, _buffer.length, 0, _putOffset);
                    _putOffset += _buffer.length;
                } else {
                    //fix bug : superzheng
                    tmp.copy(tmp, _buffer.length, 0, exlen);
                    tmp.copy(tmp, 0, exlen, _putOffset);
                    _putOffset -= exlen;
                }
            }
            _buffer = tmp;
        }
        if(getLen() == 0){
            _putOffset = _readOffset = 0;
        }
        //�ж��Ƿ�����_bufferβ��
        if((_putOffset + len) > _buffer.length){
            //�����δ� һ���ִ������ݺ��� һ���ִ�������ǰ��
            var len1 = _buffer.length - _putOffset;
            if (len1 > 0) {
                buffer.copy(_buffer,_putOffset,offset,offset + len1);
                offset += len1;
            }
            
            var len2 = len - len1;
            buffer.copy(_buffer,0,offset,offset + len2);
            _putOffset = len2;
        }else{
            buffer.copy(_buffer,_putOffset,offset,offset + len);
            _putOffset += len;
        }
        proc();
    };

    function proc() {
        var count = 0;
        while(true){
            //console.log('_readOffset:'+_readOffset);
            //console.log('_putOffset:'+_putOffset);
            //console.log(_buffer);
            count++;
            if(count>1000)break;//1000�λ�û����??
            if(_dlen == 0){
                if(getLen() < _headLen){
                    break;//����ͷ��������
                }
                if(_buffer.length - _readOffset >= _headLen){
                    _dlen = _buffer['readUInt' + (8*_headLen) + ''+ _endian +'E'](_readOffset);
                    _readOffset += _headLen;
                }else {//
                    var hbuf = new Buffer(_headLen);
                    var rlen = 0;
                    for(var i = 0;i<(_buffer.length - _readOffset);i++){
                        hbuf[i] = _buffer[_readOffset++];
                        rlen++;
                    }
                    _readOffset = 0;
                    for(var i = 0;i<(_headLen - rlen);i++){
                        hbuf[rlen+i] = _buffer[_readOffset++];
                    }
                    _dlen = hbuf['readUInt' + (8*_headLen) + ''+ _endian +'E'](0);
                }
            }

            //console.log('_dlen:'+_dlen + ',unreadLen:'+getLen());

            if(getLen() >= _dlen){
                var dbuff = new Buffer(_dlen);
                if(_readOffset + _dlen > _buffer.length){
                    var len1 = _buffer.length - _readOffset;
                    if (len1 > 0) {
                        _buffer.copy(dbuff,0,_readOffset,_readOffset + len1);
                    }

                    _readOffset = 0;
                    var len2 = _dlen - len1;
                    _buffer.copy(dbuff,len1,_readOffset,_readOffset += len2);
                }else {
                    _buffer.copy(dbuff,0,_readOffset,_readOffset += _dlen);
                }
                try {
                    _dlen = 0;
                    self.emit("data", dbuff);
                    if (_readOffset === _putOffset) {
                        break;
                    }
                } catch(e) {
                    self.emit("error", e);
                }
            }else {
                break;
            }
        }
    }
    
    //��ȡ���ڵ����ݳ���
    function getLen() {
        if(_putOffset>= _readOffset){ // ------******-------
            return _putOffset -  _readOffset;
        }
        return _buffer.length - _readOffset + _putOffset; //***-------*********
    }
};

util.inherits(ExBuffer, process.EventEmitter);//�̳��¼���

module.exports = exports = ExBuffer;


/****************************************************************
//����һ��ExBuffer������4���ֽڣ�uint32�޷������ͣ���ʾ������������little endian �ֽ���
var exBuffer = new ExBuffer().uint32Head().littleEndian();
//���߹���һ��ExBuffer������2���ֽڣ�ushort�ͣ���ʾ������������big endian �ֽ��� (Ĭ��)
var exBuffer = new ExBuffer().ushortHead().bigEndian();
//ֻҪ�յ�����İ��ͻᴥ���¼�
exBuffer.on('data',function(buffer){
    console.log('>> receive data,length:'+buffer.length);
    console.log(buffer);
});
//����һ��9�ֽڳ������ݣ��ֶ��put ����Ӧ��TCP�еķְ��������
exBuffer.put(new Buffer([0,9]));
exBuffer.put(new Buffer([1,2,3,4,5,6,7]));
exBuffer.put(new Buffer([8,9]));
//����һ��3���ֽڵ����ݺ�һ��6���ֽڵ����ݣ�һ��put����Ӧ��TCP�е�ճ���������
exBuffer.put(new Buffer([0,3,1,2,3,0,6,1,2,3,4,5,6]));
****************************************************************/