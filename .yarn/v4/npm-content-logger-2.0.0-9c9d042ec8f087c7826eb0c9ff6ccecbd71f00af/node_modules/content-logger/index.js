'use strict';

var _ = require('lodash');
var Handlebars = require('content-logger-handlebars-helpers')();

var fs = require('fs');
var path = require('path');
var util = require('util');

var EventEmitter = require('drip').EnhancedEmitter;

var getLineNumber = function(error) {
	var line = error.line;

	if (Array.isArray(line)) {
		line = line[0];
	}

	return line;
};

var sortErrors = function(a, b) {
	var aNum = getLineNumber(a);
	var bNum = getLineNumber(b);

	var retVal = 0;

	if (aNum < bNum) {
		retVal = -1;
	}
	else if (aNum > bNum) {
		retVal = 1;
	}

	return retVal;
};

var REGEX_NON_SPACE = /\S/;

class Logger extends EventEmitter {
	constructor() {
		super();

		this.TPL_PATH = path.join(__dirname, 'tpl/cli.tpl');

		this.fileErrors = {};

		this.verboseDetails = {};

		if (_.isFunction(this.init)) {
			this.init();
		}
	}

	getErrors(file) {
			var fileErrors;

			if (_.isUndefined(file)) {
				fileErrors = this.fileErrors;
			}
			else {
				fileErrors = this.fileErrors[file];

				if (!fileErrors) {
					fileErrors = [];

					fileErrors.errorMap = {};

					this.fileErrors[file] = fileErrors;
				}
			}

			return fileErrors;
		}

		log(line, msg, file, type, props) {
			var errors = this.getErrors(file);

			var errorMap = errors.errorMap;

			var errorKey = line + msg;

			if (!errorMap[errorKey]) {
				var error = {
					line: line,
					msg: msg,
					type: type
				};

				if (_.isObject(props)) {
					_.defaults(error, props);
				}

				errors.push(error);
				errorMap[errorKey] = true;

				this.emit('add', error);
			}
		}

		render(file, config) {
			config = config || {};

			var logTpl = this._getTPL();

			var errors = this.getErrors(file);

			var out = '';

			if (errors.length > 0) {
				errors.sort(sortErrors);
	
				var tplContext = {
					errors: errors,
					file: this._getFilePath(file, config),
					showBanner: errors.length || !config.showBanner,
					showColumns: config.showColumns,
					showLintIds: config.showLintIds
				};
	
				var out = logTpl(tplContext);
	
				if (!REGEX_NON_SPACE.test(out)) {
					out = '';
				}
			}

			this.emit('render', errors);

			return out;
		}

		renderFileNames(file, config) {
			config = config || {};

			var errors = this.getErrors(file);

			var out = '';

			if (errors.length) {
				out = this._getFilePath(file, config);

				this.emit('renderFileName', out);
			}

			return out;
		}

		_getFilePath(file, config) {
			var relative = config.relative;

			if (relative) {
				file = path.relative(relative, file);
			}

			return file;
		}

		_getTPL() {
			var tplFn = this.TPL_FN;

			if (!tplFn) {
				var tplContent = this._getTPLContent();

				tplFn = Handlebars.compile(tplContent);

				this.TPL_FN = tplFn;
			}

			return tplFn;
		}

		_getTPLContent() {
			var tpl = this.TPL;

			if (!tpl) {
				tpl = fs.readFileSync(this.TPL_PATH, 'utf-8');

				this.TPL = tpl;
			}

			return tpl;
		}
}

Logger.create = function(obj) {
	if (!_.isObject(obj)) {
		throw Error('You must pass an object to Logger.create');
	}

	var constructor = Logger._getConstructor(obj);

	var proto = Object.create(Logger.prototype);

	var customProto = obj.prototype;

	delete obj.prototype;

	_.assign(proto, customProto);

	proto.constructor = constructor;

	_.assign(constructor.prototype, proto);

	_.assign(constructor, obj);

	return constructor;
};

Logger._getConstructor = function(obj) {
	var constructor;

	if (obj.hasOwnProperty('constructor')) {
		constructor = obj.constructor;

		delete obj.constructor;
	}
	else {
		constructor = class extends Logger {
		};
	}

	return constructor;
};

Object.defineProperty(
	Logger.prototype,
	'TPL',
	{
		get: function() {
			return this._TPL;
		},
		set: function(val) {
			this._TPL = val;

			this.TPL_FN = null;
		}
	}
);

Object.defineProperty(
	Logger.prototype,
	'TPL_PATH',
	{
		get: function() {
			return this._TPL_PATH;
		},
		set: function(val) {
			this._TPL_PATH = val;

			this.TPL = null;
		}
	}
);

module.exports = Logger;