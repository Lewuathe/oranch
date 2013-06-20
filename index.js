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

function Oranch(options) {
	var self        = this;
	self.schedule   = options.schedule;
	self.logfile    = options.logfile;
	self.match      = options.match ? options.match : /.*/;
	self.task       = options.task;
	self.bufSize    = options.bufSize ? options.bufSize : 1000;
	self.onComplete = options.onComplete;
	self.job        = new cronJob(self.schedule, grabLog, self.onComplete, false);
	self.job.oranch = self;
}

Oranch.prototype.start = function() {
	var self = this;
	self.job.start();
}

Oranch.prototype.stop = function() {
	var self = this;
	self.job.stop();
}

function grabLog() {
	var self    = this;
	var oranch  = self.oranch;
	var logfile = oranch.logfile;
	var match   = oranch.match;
	var task    = oranch.task;
	var bufSize = oranch.bufSize;
    fs.open(logfile, 'r', function(err, fd) {
		if (err) {
			return err;
		}
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

