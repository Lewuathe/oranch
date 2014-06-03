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
Default is cron scheduling.

* `schedule`   : Oranch read logfile at fixed interval decided by this parameter. Written in crontab format.
* `logfile`    : Oranch read this file.
* `task`       : When log matching is induced, this task will be called.
* `jobType`    : If you want to use watch file API, set `watch` or with cron scheduler set `cron`.
* `match`      : Log matching is conditioned by this regular expression.
* `onComplete` : When oranch stops, this function will be called.

These are all required parameters.

If your tracking is unfrequent, you should use watchFile API in node.
watchFile API calls your task funcion in the case of updating logfile.
So it will be more efficient unfrequent case.

In order to start tracking log, please call `start`.
    
```js
oranch.start();
```

When you want to stop oranch log tracking, call `stop`.

```js
oranch.stop();
```

### Example

```js
var Oranch = require('oranch').Oranch;
    var options = {
	'schedule' : '* * * * * *',
	'logfile'  : '/path/to/somelogfile.log',
	'match'    : /WARN/,
	'jobType'  : 'cron',
	'task'     : function (line) {  
        // Write down what you want when WARN log is induced.
    },
    'onComplete' : function () {
        // Write down what you want when Oranch stops
    }		
};

var oranch = new Oranch(options);
oranch.start();
```

### License 

[MIT License](http://opensource.org/license/mit-license.php "MIT License")
