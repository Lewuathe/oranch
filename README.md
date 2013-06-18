oranch
======

Log file tracker using in node.

# Caution
Sorry, this package is now under development.
Please wait for some time. Thank you.


## Get starting

### Install

    $ npm install oranch

### Usage

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