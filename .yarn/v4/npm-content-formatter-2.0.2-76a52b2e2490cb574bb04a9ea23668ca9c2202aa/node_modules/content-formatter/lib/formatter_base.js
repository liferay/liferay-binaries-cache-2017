'use strict';

var _ = require('lodash');

var EventEmitter = require('drip').EnhancedEmitter;

class Formatter extends EventEmitter {
	constructor(file, logger, flags) {
		super();

		file = file || '<input>';

		this.file = file;
		this.logger = logger || Formatter.LOGGER;

		this.flags = flags || {};

		if (_.isFunction(this.init)) {
			this.init.apply(this, arguments);
		}

		Formatter.emit('init', this);
	}

	format(contents) {
		return contents;
	}

	log(line, msg, type, props) {
		this.logger.log(line, msg, this.file, type, props);
	}
}

_.assign(Formatter, EventEmitter.prototype);

EventEmitter.call(Formatter);

Formatter.LOGGER = console;

Formatter._registered = {};

Formatter.create = function(obj) {
	if (!_.isObject(obj)) {
		throw Error('You must pass an object to Formatter.create');
	}

	var constructor = Formatter._getConstructor(obj);

	var proto = Object.create(Formatter.prototype);

	var customProto = obj.prototype;

	delete obj.prototype;

	_.assign(proto, customProto);

	proto.constructor = constructor;

	_.assign(constructor.prototype, proto);

	Formatter._verifyId(obj);
	Formatter._verifyExtensions(obj);

	_.assign(constructor, obj);

	Formatter._registered[obj.id] = constructor;

	return constructor;
};

Formatter._getConstructor = function(obj) {
	var constructor;

	if (obj.hasOwnProperty('constructor')) {
		constructor = obj.constructor;

		delete obj.constructor;
	}
	else {
		constructor = class extends Formatter {
		};
	}

	return constructor;
};

Formatter._verifyId = function(obj) {
	var id = obj.id;

	if (!id || Formatter._registered.hasOwnProperty(id)) {
		var errMsg = `The id: "${id}" is already taken`;

		if (!id) {
			errMsg = 'You must give this formatter an id with the id property';
		}

		throw Error(errMsg);
	}
};

Formatter._verifyExtensions = function(obj) {
	var includes = obj.includes;

	if (!_.isRegExp(includes)) {
		throw Error('The includes property must be a RegExp Object');
	}
};

module.exports = Formatter;