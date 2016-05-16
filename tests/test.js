var assert = require('assert'),
	SSpecValidator = require(__dirname + '/../models/validator.js'),
	SSpecParser = require(__dirname + '/../models/parser.js');

describe('Initialization', function () {

	it('Make an instance', function (done) {

		var validator = new SSpecValidator();
		done();

	});

});


describe('Parse & Validation', function () {

	var validator = new SSpecValidator({
		// isDebug: true
	});

	/**
	 * INTEGER
	 */

	it('INTEGER(-255, 255) DEFAULT 0', function (done) {

		var spec = 'INTEGER(-255, 255) DEFAULT 0';

		assert.equal(validator.isValid(spec, 0), true);
		assert.equal(validator.isValid(spec, 'Foo'), false);
		assert.equal(validator.isValid(spec, true), false);
		assert.equal(validator.isValid(spec, 0.01), false, 'Float number should be invalid in INTEGER');
		assert.equal(validator.isValid(spec, '123'), false);

		assert.equal(validator.isValid(spec, 255), true);
		assert.equal(validator.isValid(spec, -255), true);

		assert.equal(validator.isValid(spec, 256), false);
		assert.equal(validator.isValid(spec, -256), false);

		assert.equal(new SSpecParser(spec).getDefaultValue(), 0);

		done();

	});


	it('INTEGER (-255, 255) DEFAULT 0', function (done) {

		var spec = 'INTEGER(-255, 255) DEFAULT 0';

		assert.equal(validator.isValid(spec, 0), true);
		assert.equal(validator.isValid(spec, 'Foo'), false);
		assert.equal(validator.isValid(spec, true), false);
		assert.equal(validator.isValid(spec, 0.01), false);

		assert.equal(validator.isValid(spec, 255), true);
		assert.equal(validator.isValid(spec, -255), true);

		assert.equal(validator.isValid(spec, 256), false);
		assert.equal(validator.isValid(spec, -256), false);

		assert.equal(new SSpecParser(spec).getDefaultValue(), 0);

		done();

	});


	it('INTEGER() DEFAULT 255', function (done) {

		var spec = 'INTEGER() DEFAULT 255';

		assert.equal(validator.isValid(spec, 0), true);
		assert.equal(validator.isValid(spec, 'Foo'), false);
		assert.equal(validator.isValid(spec, true), false);
		assert.equal(validator.isValid(spec, 0.01), false);

		assert.equal(new SSpecParser(spec).getDefaultValue(), 255);

		done();

	});


	it('INTEGER', function (done) {

		var spec = 'INTEGER';

		assert.equal(validator.isValid(spec, 0), true);
		assert.equal(validator.isValid(spec, 'Foo'), false);
		assert.equal(validator.isValid(spec, true), false);
		assert.equal(validator.isValid(spec, 0.01), false);

		assert.equal(new SSpecParser(spec).getDefaultValue(), null);

		done();

	});


	/**
	 * FLOAT
	 */

	it('FLOAT(-255.0, 255.0) DEFAULT 0.01', function (done) {

		var spec = 'FLOAT(-255.0, 255.0) DEFAULT 0.01';

		assert.equal(validator.isValid(spec, 0.0), true);
		assert.equal(validator.isValid(spec, 0), true);
		assert.equal(validator.isValid(spec, 'Foo'), false);
		assert.equal(validator.isValid(spec, true), false);

		assert.equal(validator.isValid(spec, 255.0), true);
		assert.equal(validator.isValid(spec, -255.0), true);

		assert.equal(validator.isValid(spec, 255.1), false);
		assert.equal(validator.isValid(spec, -255.1), false);

		assert.equal(new SSpecParser(spec).getDefaultValue(), 0.01);

		done();

	});

	it('FLOAT()', function (done) {

		var spec = 'FLOAT()';

		assert.equal(validator.isValid(spec, 0.0), true);
		assert.equal(validator.isValid(spec, 0), true);
		assert.equal(validator.isValid(spec, 'Foo'), false);
		assert.equal(validator.isValid(spec, true), false);

		assert.equal(new SSpecParser(spec).getDefaultValue(), null);

		done();

	});


	/**
	 * NUMBER
	 */

	it('NUMBER(-255.0, 255.0) DEFAULT 0.01', function (done) {

		var spec = 'NUMBER(-255.0, 255.0) DEFAULT 0.01';

		assert.equal(validator.isValid(spec, 0), true);
		assert.equal(validator.isValid(spec, 0.0), true);
		assert.equal(validator.isValid(spec, 'Foo'), false);
		assert.equal(validator.isValid(spec, true), false);

		assert.equal(validator.isValid(spec, 255.0), true);
		assert.equal(validator.isValid(spec, -255.0), true);

		assert.equal(validator.isValid(spec, 255.1), false);
		assert.equal(validator.isValid(spec, -255.1), false);

		assert.equal(new SSpecParser(spec).getDefaultValue(), 0.01);

		done();

	});

	it('NUMBER()', function (done) {

		var spec = 'NUMBER()';

		assert.equal(validator.isValid(spec, 0), true);
		assert.equal(validator.isValid(spec, 0.0), true);
		assert.equal(validator.isValid(spec, 'Foo'), false);
		assert.equal(validator.isValid(spec, true), false);

		assert.equal(new SSpecParser(spec).getDefaultValue(), null);

		done();

	});


	/**
	 * STRING
	 */

	it('STRING DEFAULT \'default\' REGEXP \'^[a-z\\\'\\"\\ ]+$\'', function (done) {

		var spec = 'STRING DEFAULT default REGEXP \'^[a-z\\\'\\"\ ]+$\'';

		assert.equal(validator.isValid(spec, 'foo'), true);
		assert.equal(validator.isValid(spec, 'foo bar'), true);
		assert.equal(validator.isValid(spec, '\'foo\' "bar"'), true);

		assert.equal(validator.isValid(spec, '123'), false, 'It should be invalid by RegExp');
		assert.equal(validator.isValid(spec, 'Foo'), false, 'It should be invalid by RegExp');
		assert.equal(validator.isValid(spec, 0), false);
		assert.equal(validator.isValid(spec, true), false);

		assert.equal(new SSpecParser(spec).getDefaultValue(), 'default');

		done();

	});

	it('STRING DEFAULT \'default\'', function (done) {

		var spec = 'STRING DEFAULT default';

		assert.equal(validator.isValid(spec, 'foo'), true);

		assert.equal(validator.isValid(spec, 0), false);
		assert.equal(validator.isValid(spec, true), false);

		assert.equal(new SSpecParser(spec).getDefaultValue(), 'default');

		done();

	});


	it('STRING()', function (done) {

		var spec = 'STRING()';

		assert.equal(validator.isValid(spec, 'foo'), true);

		assert.equal(new SSpecParser(spec).getDefaultValue(), null);

		done();

	});


	/**
	 * BOOLEAN
	 */

	it('BOOLEAN DEFAULT false', function (done) {

		var spec = 'BOOLEAN DEFAULT false';

		assert.equal(validator.isValid(spec, true), true);
		assert.equal(validator.isValid(spec, false), true);

		assert.equal(validator.isValid(spec, 0), false);
		assert.equal(validator.isValid(spec, 'foo'), false);

		assert.equal(new SSpecParser(spec).getDefaultValue(), false);

		done();

	});


	it('BOOLEAN()', function (done) {

		var spec = 'BOOLEAN()';

		assert.equal(validator.isValid(spec, true), true);
		assert.equal(validator.isValid(spec, false), true);

		assert.equal(validator.isValid(spec, 0), false);
		assert.equal(validator.isValid(spec, 'foo'), false);

		assert.equal(new SSpecParser(spec).getDefaultValue(), null);

		done();

	});


	/**
	 * TEXT
	 */

	it('TEXT(2, 10) DEFAULT \'foobar\'', function (done) {

		var spec = 'TEXT(2,10) DEFAULT \'foobar\'';

		assert.equal(validator.isValid(spec, 'ab'), true);
		assert.equal(validator.isValid(spec, 'abcdefghij'), true);

		assert.equal(validator.isValid(spec, 0), false);
		assert.equal(validator.isValid(spec, true), false);
		assert.equal(validator.isValid(spec, 'a'), false, 'String is too short');
		assert.equal(validator.isValid(spec, 'abcdefghijk'), false, 'String is too long');

		assert.equal(new SSpecParser(spec).getDefaultValue(), 'foobar');

		done();

	});


	it('TEXT(10) DEFAULT \'foobar\'', function (done) {

		var spec = 'TEXT(10)';

		assert.equal(validator.isValid(spec, ''), true);
		assert.equal(validator.isValid(spec, 'abcdefghij'), true);

		assert.equal(validator.isValid(spec, 0), false);
		assert.equal(validator.isValid(spec, true), false);
		assert.equal(validator.isValid(spec, 'abcdefghijk'), false, 'String is too long');

		assert.equal(new SSpecParser(spec).getDefaultValue(), null);

		done();

	});


});
