var cronJob = require('cron').CronJob;
var fs = require('fs');

var alreadyRead = 0;

// Confirm this line is whether end of file or not
function isEnd(line) {
	if (line.trim() == '') {
		return true;
	}
	else {
		return false;
	}
}

// Initialization of buffer of null character
function initBuffer(buf, size) {
	for (var i = 0; i < size; i++) {
		buf[i] = '\0';
	}
}

function Oranch(schedule, logfile, match, task, bufSize) {
    var self      = this;
	self.schedule = schedule;
	self.logfile  = logfile;
	self.match    = match;
	self.task     = task;
	self.bufSize  = bufSize ? bufSize : 1000;
    self.job      = new cronJob(schedule, grabLog, null, false);
	self.job.oranch = self;

    self.job.start();
}


function grabLog() {
	var self    = this;
	var oranch  = self.oranch;
	var logfile = oranch.logfile;
	var match   = oranch.match;
	var task    = oranch.task;
	var bufSize = oranch.bufSize;
    fs.open(logfile, 'r', function(err, fd) {
		var buf = new Buffer(bufSize);
		initBuffer(buf, bufSize);
		var offset = 0;
		fs.read(fd, buf, offset, bufSize, alreadyRead, function(err, bytesRead, buffer) {
			var lines = buffer.toString().split('\n');
			for( var lineIndex = 0; lineIndex < lines.length-1; lineIndex++ ) {
				var curLine = lines[lineIndex];
				if (isEnd(curLine)) {
					break;
				}
				if (curLine.match(match)) {
					task(curLine);
				}
				alreadyRead += lines[lineIndex].length + 1;
			}
		});
	});
}



exports.Oranch = Oranch;

