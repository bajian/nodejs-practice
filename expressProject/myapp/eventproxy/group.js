var eventproxy = require('eventproxy');
var fs = require('fs');


  var ep = new eventproxy();
  ep.fail(console.error);

  ep.all('has_read_messages', 'hasnot_read_messages', function (has_read_messages, hasnot_read_messages) {
    console.log('conp');
    console.log(arguments);
    //{ '0': [ '1txt', '2txt' ], '1': [ '3txt', '4txt' ] }竟然不用闭包
  });


    [['1.txt','2.txt'], ['3.txt','4.txt']].forEach(function (msgs, idx) {
      var epfill = new eventproxy();
      epfill.fail(console.error);

      epfill.after('got_file', msgs.length, function (docs) {
        console.log('doc'+docs);
        ep.emit(idx === 0 ? 'has_read_messages' : 'hasnot_read_messages', docs);
      });

      msgs.forEach(function (fileName) {
        fs.readFile(fileName, 'utf-8', epfill.group('got_file'));
        // Message.getMessageRelations(doc, epfill.group('message_ready'));
      });


    });