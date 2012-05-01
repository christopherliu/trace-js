/**
 * @name TraceJS
 * @version 0.2 (c) 2012 Christopher Liu
 * 
 * TraceJS is freely distributable under the MIT license. For all details and
 * documentation: https://github.com/christopherliu/trace-js
 * 
 * Requires JSON support.
 * 
 * @example <code>
var debug = TraceJS.GetLogger("debug", "StoryEditor");
debug("load");
debug("Model_PageList.OnGetPageTree", pageTree);

//To watch all events tagged as "StoryEditor", run this in the console
TraceJS("StoryEditor", true);
</code>
 */
(function() {
	"use strict";

	// ------------------------------------------------------------------------
	// Local state
	var includeStack = false;
	var self = watch;
	var watchingNow = "start";

	// ------------------------------------------------------------------------
	// Private functions
	function load() {
		if (typeof sessionStorage !== "undefined") {
			watchingNow =
				JSON.parse(sessionStorage.getItem("jsTrace-watchingNow") || "false");
			includeStack =
				JSON.parse(sessionStorage.getItem("jsTrace-includeStack") || "false");
		}
	}
	function save() {
		if (typeof sessionStorage !== "undefined") {
			sessionStorage.setItem("jsTrace-watchingNow", JSON.stringify(watchingNow));
			sessionStorage.setItem("jsTrace-includeStack", JSON.stringify(includeStack));
		}
	}
	function isArray(someVar) {
		return Object.prototype.toString.call(someVar) === '[object Array]';
	}
	function generateLoggingFunction(logLevel) {
		/**
		 * @param {String[]}
		 *            tags An array of tags that are being recorded
		 */
		return function debug(tags, message) {
			function isBeingWatched(test) {
				if (test) {
					if (isArray(watchingNow)) {
						return watchingNow.some(function(wn) {
							return (wn == test || (test.indexOf && test
							.indexOf(wn) != -1));
						});
					}
					else {
						return (watchingNow == test || (test.indexOf && test
							.indexOf(watchingNow) != -1));
					}
				}
				return false;
			}
			if (!tags.some(isBeingWatched)) {
				return false;
			}

			// invalid in strict mode: console.log([this,
			// arguments.callee.caller.arguments]);
			if (tags.length > 0)
				console[logLevel](tags);
			if (message)
				console[logLevel](message);
			if (includeStack)
				console.trace();
		};
	}

	var debug = generateLoggingFunction("log");
	var warn = generateLoggingFunction("warn");
	var info = generateLoggingFunction("info");

	// --------------------------------------------------------------------
	// Public functions
	/**
	 * @param type
	 *            debug, info, or warn.
	 * @param {String|String[]}
	 *            commonTags (optional) Tags to attach to logger, either many
	 *            (Array) or one (String)
	 * @return {function(tagOrTags, message)} logging function
	 * @example <code>
	var debug = TraceJS.GetLogger("debug", "StoryEditor");
	</code>
	 */
	self.GetLogger =
		function(type, commonTags) {
			var log = { debug : debug, info : info, warn : warn }[type];
			var arTags =
				(commonTags ? (isArray(commonTags) ? commonTags
					: [ commonTags ]) : []);
			return function(tagOrTags, message) {
				var arNewTags =
					(tagOrTags ? (isArray(tagOrTags) ? arTags.concat(tagOrTags)
						: arTags.concat([ tagOrTags ])) : arTags);
				log(arNewTags, message);
			};
		};
	// TODO enable watching arrays
	/**
	 * @param {string}
	 *            watchThis Tag to watch; any tag matching this will be shown.
	 * @param {boolean}
	 *            pIncludeStack Show stack trace
	 */
	function watch(watchThis, pIncludeStack) {
		watchingNow = watchThis || false;
		includeStack = pIncludeStack || false;
		save();
	}

	// ------------------------------------------------------------------------
	// Initialization
	load();

	this.TraceJS = self;
	return self;
}).call(this);