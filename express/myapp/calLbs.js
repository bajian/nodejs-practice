// var Q = require('q');

var cells_str='4823,9368,33,562,43,0,460:4822,9368,30,590,11,0,460:3661,9369,30,56,6,0,460:4333,9368,29,54,11,0,460:3913,9368,23,78,24,0,460:3983,9368,20,574,10,0,460:4821,9368,18,559,6,0,460,50';
var load_lbs_location_info=function (cells_str){
// 4823,9368,33,562,43,0,460
// 4822,9368,30,590,11,0,460
// 3661,9369,30,56,6,0,460
// 4333,9368,29,54,11,0,460
// 3913,9368,23,78,24,0,460
// 3983,9368,20,574,10,0,460
// 4821,9368,18,559,6,0,460,50
    var cells=cells_str.split(':');
    var sql='';
    for (var i in cells) {
        var cell=cells[i].split(',');//cid, lac, rssi, arfcn,bsic,mnc,mcc
        var cid='00000'+cell[0];
            cid=cid.substr('-5');
        var lac='00000'+cell[1];
            lac=lac.substr('-5');
        var rssi=cell[2];
        var arfcn=cell[3];
        var bsic=cell[4];
        var mcc='000'+cell[6];
            mcc=mcc.substr('-3');
        var mnc='000'+cell[5];
            mnc=mnc.substr('-2');
        var id=mcc+mnc+lac+cid;
        console.log(id);
        sql+='(SELECT * FROM m_bs where ID='+id+' OR ( not exists (select ID from m_bs where ID='+id+') AND ID > '+id.substr(0,id.length-1)+'0 AND ID <'+(parseInt(id.substr(0,id.length-1))+1)+'0 )  LIMIT 1)';
        if (i!=cells.length-1)
            sql+=' UNION ';
    };
    console.log(sql);
};

load_lbs_location_info(cells_str);