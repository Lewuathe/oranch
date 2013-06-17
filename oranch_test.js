var Oranch = require('./oranch.js').Oranch;

function testTask(line) {
	console.log(line);
}

var o = new Oranch('*/5 * * * * *', './sample.log', /DEBUG/, testTask, 1000);

