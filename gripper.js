var cronJob = require('cron').CronJob;
var fs = require('fs');
var readline = require('readline');

var alreadyRead = 0;

var times = 0;

function isEnd(line){
    if ( line.trim() == '' ) {
	return true;
    }
    else {
	return false;
    }
}


function grip () {
    fs.open('sample.log', 'r', function(err, fd){
	    var buf = new Buffer(100);
	    var offset = 0;
	    fs.read(fd, buf, offset, 100, alreadyRead, function( err, bytesRead, buffer ) {
		    var lines = buffer.toString().split('\n');
		    for ( var lineIndex = 0 ; lineIndex < lines.length-1 ; lineIndex++ ) {
			if ( isEnd(lines[lineIndex]) ) {
			    break;
			}
			console.log(lineIndex + ": " + lines[lineIndex]);
			alreadyRead += lines[lineIndex].length + 1;
		    }
		    console.log('AlreadyRead: ' + alreadyRead + '\n');

		});
				
	});
}

	
var job = new cronJob('*/5 * * * * *', function(){
	grip();
	if( times ++ > 2 ) {
	    job.stop();
	}
    }, function(){
	console.log('After complete');
    }, true);





