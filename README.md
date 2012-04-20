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

trace-js lets you add debug statements that you can keep in your code:

``` js
function SampleObject() {
  this.RunSampleA = function RunSampleA() {
    this._debug("RunSampleA debug");
    this._warn("RunSampleA warn");
  };
  this.RunSampleB = function RunSampleB() {
    this._debug("RunSampleB debug");
  };
}


var test = new SampleObject();
setInterval(function() {
  test.RunSampleA();
  test.RunSampleB();
  _debug("This won't show up!");
}, 1000);
```

When you want to watch the appropriate events, just run _watch in the console.

``` js
//Only watch RunSampleB events
_watch(1, "RunSampleB");

//Watch all warnings on SampleObject.
_watch("warn", "SampleObject");

```


How do I get started?
---------------------

The quickest way is to include trace-js in your JS, like this:
``` html
<script src="something"></script>
```

Developer's Reference
====================
There are five functions to know.

*_debug, _info, _warn(message[, tags])*: These are the tracing functions. Put them everywhere to log events - they won't turn on until you watch them.

*_watch, _unwatch(traceLevel[, objectToWatch, [tagToWatch]])*: Call these functions from anywhere to start logging the appropriate events.