var fs = require('fs');
var path = require('path');
var encode = 'utf8';

function copy(src, dst, callback) {
    var rs = fs.createReadStream(src);
    var ws = fs.createWriteStream(dst);
    rs.on('data', function(chunk) {
        ws.write(chunk, function() {});
    });
    rs.on('end', function() {
        // replaceHeaderAndFooter(dst);
        // callback(dst)
    });

}

copy(__dirname+'/a.txt',__dirname+'/b.txt')
