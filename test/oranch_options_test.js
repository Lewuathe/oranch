var vows = require('vows');
var assert = require('assert');
var Oranch = require('../index.js').Oranch;

var outs = {};
function testTask(outName) {
	return function(line) {
		outs[outName] += line + '\n';
	};
}

vows.describe('Oranch options test').addBatch({

	'Unset matching options': {
		topic : function () {
			outs['unsetmatch_test'] = '';
			var options = {};
			options.schedule = '* * * * * *';
			options.logfile  = __dirname + '/unsetmatch_test.log';
			options.task     = testTask('unsetmatch_test');
            options.jobType  = 'cron';
			options.onComplete = this.callback;
			var o = new Oranch(options);
			o.start();
			setTimeout(function () {
				o.stop();
			}, 2000);
		},
		'grab all log' : function () {
			var expect = 'Mon Jun 10 2013 11:16:55 GMT+0900 (JST): [INFO] - log1\nMon Jun 10 2013 11:16:55 GMT+0900 (JST): [INFO] - log2\nMon Jun 10 2013 11:16:55 GMT+0900 (JST): [INFO] - log3\nMon Jun 10 2013 11:16:55 GMT+0900 (JST): [INFO] - log4\nMon Jun 10 2013 11:16:55 GMT+0900 (JST): [INFO] - log5\nMon Jun 10 2013 11:16:55 GMT+0900 (JST): [INFO] - log6\nMon Jun 10 2013 11:16:55 GMT+0900 (JST): [INFO] - log7\nMon Jun 10 2013 11:16:55 GMT+0900 (JST): [INFO] - log8\nMon Jun 10 2013 11:16:55 GMT+0900 (JST): [DEBUG] - log9\nMon Jun 10 2013 11:16:55 GMT+0900 (JST): [INFO] - log10\nMon Jun 10 2013 11:16:55 GMT+0900 (JST): [INFO] - log11\nMon Jun 10 2013 11:16:55 GMT+0900 (JST): [INFO] - log12\nMon Jun 10 2013 11:16:55 GMT+0900 (JST): [INFO] - log13\nMon Jun 10 2013 11:16:55 GMT+0900 (JST): [INFO] - log14\nMon Jun 10 2013 11:16:55 GMT+0900 (JST): [DEBUG] - log15\n';
			assert.equal(expect, outs['unsetmatch_test']);
		}
	},

	'No schedule' : {
		topic : function () {
			outs['noschedule_test'] = '';
			var options = {};
			//options.schedule = '* * * * * *';
			options.logfile  = __dirname + '/noschedule.log';
			options.match    = /DEBUG/;
			options.task     = testTask('noschedule_test');
            options.jobType  = 'cron';
			//options.onComplete = this.callback;
			return new Oranch(options);
		},
		'schedule object' : function (topic) {
			assert.throws(function () { 
				topic.start();
			}, Error);
		}
	},

    'offset zero': {
        topic: function() {
            outs['offset_zero_test'] = '';
            var options = {};
            options.schedule = '* * * * * *';
            options.logfile = __dirname + '/offset_zero_test.log',
            options.task    = testTask('offset_zero_test');
            options.onComplete = this.callback;
            options.offset = 776;
            options.jobType = 'cron';
            var o = new Oranch(options);
            o.start();
            setTimeout(function() {
                o.stop();
            }, 2000);
        },

        'alreadyRead is zero' : function() {
            var expect = 'Mon Jun 10 2013 11:16:55 GMT+0900 (JST): [DEBUG] - log15\n';
            assert.equal(expect, outs['offset_zero_test']);     
        }
    }
}).export(module);