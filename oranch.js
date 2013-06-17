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

function Oranch(schedule, logfile, match, task, bufSize) {
    var self      = this;
	self.schedule = schedule;
	self.logfile  = logfile;
	self.match    = match;
	self.task     = task;
	self.bufSize  = bufSize ? bufSize : 1000;
    self.job      = new cronJob(schedule, self.grabLog, null, false);

    self.job.start();
}

Oranch.prototype.grabLog = function() {
	var self    = this;
	var logfile = self.logfile;
	var match   = self.match;
	var task    = self.task;
	var bufSize = self.bufSize;
    fs.open(logfile, 'r', function(err, fd) {
		var buf = new Buffer(bufSize);
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

