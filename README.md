oranch  [![Build Status](https://secure.travis-ci.org/Lewuathe/oranch.png)](http://travis-ci.org/Lewuathe/oranch)
======

Log file tracker using in node. 
Installing and using easily as npm module. [npm](https://npmjs.org/package/oranch "npm")


## Get starting

### Install

    $ npm install oranch

### Usage

### Create oranch object
To create oranch object, you should give some options as below.

* `schedule`   : Oranch read logfile at fixed interval decided by this parameter. Written in crontab format.
* `logfile`    : Oranch read this file.
* `task`       : When log matching is induced, this task will be called.
* `match`      : Log matching is conditioned by this regular expression.
* `onComplete` : When oranch stops, this function will be called.

In order to start tracking log, please call `start`.
    
    oranch.start();
    
When you want to stop oranch log tracking, call `stop`.

    oranch.stop();
    

### Example

    var Oranch = require('oranch').Oranch;
	var options = {
	    'schedule' : '* * * * * *',
		'logfile'  : '/path/to/somelogfile.log',
		'match'    : /WARN/,
		'task'     : function () {  
		    // Write down what you want when WARN log is induced.
		},
		'onComplete' : function () {
		    // Write down what you want when Oranch stops
		}
    };

	var oranch = new Oranch(options);
	oranch.start();


### License 

[MIT License](http://opensource.org/license/mit-license.php "MIT License")
