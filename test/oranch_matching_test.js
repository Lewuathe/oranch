var vows = require('vows');
var assert = require('assert');
var Oranch = require('../oranch.js').Oranch;

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
	}

}).export(module);




