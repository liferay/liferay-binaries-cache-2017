var chai = require('chai');
var path = require('path');
var sinon = require('sinon');
var _ = require('lodash');

var Logger = require('../');

chai.use(require('chai-string'));

var assert = chai.assert;

describe(
	'Logger',
	function() {
		var MAP_RULE_PROPS = {
			ruleId: 'rule-name'
		};

		var sandbox;

		beforeEach(
			function() {
				sandbox = sinon.sandbox.create();
			}
		);

		afterEach(
			function() {
				sandbox.restore();
			}
		);

		it(
			'should render file names properly',
			function() {
				var logger = new Logger();

				var out = logger.renderFileNames('foo.js');

				assert.equal(out, '');

				logger.log(1, 'Has error', 'foo.js', 'error', MAP_RULE_PROPS);

				out = logger.renderFileNames('foo.js');

				assert.equal(out, 'foo.js');

				out = logger.renderFileNames('foo.js');

				assert.equal(out, 'foo.js');

				out = logger.renderFileNames(
					'foo.js',
					{
						relative: __dirname
					}
				);

				assert.equal(out, path.relative(__dirname, 'foo.js'));
			}
		);

		it(
			'should render TPL properly',
			function() {
				var logger = new Logger();

				logger.log(1, 'Has error', 'foo.js', 'error', MAP_RULE_PROPS);

				logger.TPL = 'File:{{{file}}}';

				var out = logger.render('foo.js');

				assert.equal(out, 'File:foo.js');
			}
		);

		it(
			'should render TPL_PATH properly',
			function() {
				var logger = new Logger();

				logger.log(1, 'Has error', 'foo.js', 'error', MAP_RULE_PROPS);

				logger.TPL_PATH = path.join(__dirname, 'fixture', 'logger.tpl');

				var out = logger.render('foo.js');

				assert.isAbove(out.length, 0);

				assert.equal(out, 'File:foo.js\nLine 1:Has error\n');

				out = logger.render(
					'foo.js',
					{
						showLintIds: true
					}
				);

				assert.equal(out, 'File:foo.js\nLine 1:Has error\nruleId:rule-name');

				out = logger.render('noop.js');

				assert.equal(out, '');

				out = logger.render(
					'noop.js',
					{
						showBanner: true
					}
				);

				assert.equal(out, '');
			}
		);

		it(
			'should log errors properly',
			function() {
				var logger = new Logger();

				logger.log(1, 'Has error', 'foo.js', 'error', MAP_RULE_PROPS);

				assert.property(logger.fileErrors, 'foo.js');
				assert.isArray(logger.fileErrors['foo.js']);
			}
		);

		it(
			'should get logged errors properly',
			function() {
				var logger = new Logger();

				logger.log(1, 'Has error', 'foo.js', 'error', MAP_RULE_PROPS);

				var loggedErrors = logger.getErrors('foo.js');

				assert.lengthOf(loggedErrors, 1);

				var loggedError = loggedErrors[0];

				assert.isObject(loggedError);
				assert.equal(loggedError.msg, 'Has error');
				assert.equal(loggedError.line, 1);
				assert.equal(loggedError.type, 'error');
				assert.equal(loggedError.ruleId, 'rule-name');

				var unLoggedErrors = logger.getErrors('foo.txt');

				assert.lengthOf(unLoggedErrors, 0);

				var fileErrors = logger.getErrors();

				assert.isObject(fileErrors);
				assert.equal(fileErrors, logger.fileErrors);
			}
		);

		it(
			'should sort errors',
			function() {
				var logger = new Logger();

				logger.log(3, 'Has error', 'foo.js');
				logger.log([1, 5], 'Has error', 'foo.js');
				logger.log(1, 'Has error', 'foo.js');
				logger.log(2, 'Has error', 'foo.js');

				logger.TPL = '{{#errors}}{{line}}\n{{/errors}}';

				var out = logger.render('foo.js');

				assert.equal(out, 'Lines 1-5\nLine 1\nLine 2\nLine 3\n');
			}
		);

		it(
			'should not add duplicate errors',
			function() {
				var logger = new Logger();

				logger.log(3, 'Has error', 'foo.js');
				logger.log(3, 'Has error', 'foo.js');

				var errors = logger.getErrors('foo.js');

				assert.equal(errors.length, 1);
			}
		);

		it(
			'should throw an error when called without arguments',
			function() {
				assert.throws(
					Logger.create,
					'You must pass an object to Logger.create'
				);
			}
		);

		it(
			'should use a custom constructor',
			function() {
				var constructor = sandbox.spy();

				var FooCustom1 = Logger.create(
					{
						constructor: constructor
					}
				);

				new FooCustom1();

				assert.isTrue(constructor.called);
			}
		);

		it(
			'should use a custom constructor',
			function() {
				var constructor = sandbox.spy();

				var FooCustom1 = Logger.create(
					{
						constructor: constructor
					}
				);

				new FooCustom1();

				assert.isTrue(constructor.called);
			}
		);

		it(
			'allow a custom init',
			function() {
				var init = sandbox.spy();

				var loggerExt = Logger.create(
					{
						prototype: {
							init: init
						}
					}
				);

				var logger = new loggerExt();

				assert.isTrue(init.called);
			}
		);
	}
);