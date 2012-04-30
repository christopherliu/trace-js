trace-js
========

No more constantly commenting and uncommenting console.log statements!

What is it?
-----------
trace-js is a minimalist tracing library for JavaScript. It currently works for FF and Chrome.

Why trace-js?
-------------
Sometimes we want a snapshot of what's happening, without pausing execution. If you've ever debugged a JS app with a million files, you know what I mean. If you've ever tried to debug a hover event, you _really_ know what I mean. :)

Constantly commenting and uncommenting console.log statements and reloading the page is hardly a satisfying answer.

How do I use it?
----------------

trace-js lets you add debug statements that *you can keep in your code*:

``` js

function SampleObject() {
  var debug = TraceJS.GetLogger("debug", "SampleObject");
  var warn = TraceJS.GetLogger("warn", "SampleObject");
  this.RunSampleA = function RunSampleA() {
    debug("RunSampleA", "debug test");
    warn(["RunSampleA", "banana"], "warn test");
  };
  this.RunSampleB = function RunSampleB() {
    debug("RunSampleB", "debug test");
  };
}


var test = new SampleObject();
var debug = TraceJS.GetLogger("debug");
setInterval(function() {
  test.RunSampleA();
  test.RunSampleB();
  debug(false, "This won't show up in the other tests!");
}, 1000);
```

When you want to watch the appropriate events, just run TraceJS in the console. You'll only see *the objects you filter out*.

``` js
//Only watch RunSampleB events
TraceJS("RunSampleB");

//Watch all warnings on SampleObject.
TraceJS("RunSampleB");

//Watch just events tagged banana
TraceJS("banana");

//Stop watching everything
TraceJS();
```


How do I get started?
---------------------

The quickest way is to include trace-js in your JS, like this:
``` html
<script src="trace-js.js"></script>
```

Developer's Reference
====================
There are two functions to know.

*[var x = ] TraceJS.GetLogger(type, commonTags)*: This returns a tracing function.

*x(tags, description): Once you have a tracing function, put it everywhere to log events - they won't turn on unless you watch them.

*TraceJS(watchThis[, includeStack])*: Call this functions from anywhere to start tapping into the appropriate events.