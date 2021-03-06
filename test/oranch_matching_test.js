var vows = require('vows');
var assert = require('assert');
var Oranch = require('../index.js').Oranch;

var outs = {};
function testTask(outName) {
	return function(line) {
		outs[outName] += line + '\n';
	};
}

vows.describe('Oranch matching test').addBatch({

	'Matching test' : { 
		topic : function () {
			outs['match_test'] = '';
			var options = {};
			options.schedule = '* * * * * *';
			options.logfile  = __dirname + '/match_test.log';
			options.match    = /DEBUG/;
            options.jobType  = "cron";
			options.task     = testTask('match_test');
			options.onComplete = this.callback;
			var o = new Oranch(options);
			o.start();
			setTimeout(function() {
				o.stop();
			}, 2000);
		},
		'can grab DEBUG log' : function () {
			var expect = "Mon Jun 10 2013 11:16:55 GMT+0900 (JST): [DEBUG] - log9\nMon Jun 10 2013 11:16:55 GMT+0900 (JST): [DEBUG] - log15\n";
			assert.equal(expect, outs['match_test']);
		}
	},


	'No matching test' : {
		topic : function () {
			outs['nomatch_test'] = '';
			var options = {};
			options.schedule = '* * * * * *';
			options.logfile  = __dirname + '/nomatch_test.log';
			options.match    = /DEBUG/;
			options.task     = testTask('nomatch_test');
            options.jobType  = 'cron';
			options.onComplete = this.callback;
			var o = new Oranch(options);
			o.start();
			setTimeout(function () {
				o.stop();
			}, 2000);
		},
		'cannot grab DEBUG log' : function () {
			var expect = '';
			assert.equal(expect, outs['nomatch_test']);
		}
	},

    'Initial task' : {
		topic : function () {
			outs['initial_task_test'] = '';
			var options = {};
			options.schedule = '* * * * * *';
			options.logfile  = __dirname + '/initial_task_test.log';
			options.match    = /DEBUG/;
			options.task     = testTask('initial_task_test');
            options.jobType  = 'cron';
			options.onComplete = this.callback;
			var o = new Oranch(options);
			o.start();
			setTimeout(function () {
				o.stop();
			}, 2000);
		},
		'should get first logs' : function () {
			var expect = 'Mon Jun 10 2013 11:16:55 GMT+0900 (JST): [DEBUG] - log15\n';
			assert.equal(expect, outs['initial_task_test']);
		}
    },

    'OnComplete task': {
        topic: function () {
            outs['oncomplete_task_test'] = '';
            var options = {};
            options.schedule = '* * * * * *';
            options.logfile = __dirname + '/oncomplete_task_test.log';
            options.match   = /DEBUG/;
            options.endMatch = /END/;
            options.task    = testTask('oncomplete_task_test');
            options.jobType = 'cron';
            options.onComplete = this.callback;
            var o = new Oranch(options);
            o.start();
        },

        'should end automatically with end match': function() {
            var expect = 'Mon Jun 10 2013 11:16:55 GMT+0900 (JST): [DEBUG] - log15\n';
            console.log('----------');
            console.log(outs['oncomplete_task_test']);
            console.log('----------');
            assert.equal(expect, outs['oncomplete_task_test']);
        }
    }

}).export(module);




