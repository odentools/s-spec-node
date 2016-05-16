/**
 * s-spec validator
 * https://github.com/odentools/s-spec
 * (C) 2016 - OdenTools Released under MIT License.
 */
'use strict';

var Parser = require(__dirname + '/parser'),
	helper = require(__dirname + '/helper');


/**
 * SSpec Validator
 * @param  {Object} options Options for module
 * @return {Object}         Instance
 */
var SSpecValidator = function (options) {

	options = (options == null) ? {} : options;

	this.isDebug = options.isDebug || false;

};


/**
 * Get a whether the value is valid under the specification
 * @param {String} spec_str Specification string - e.g. INTEGER(-255, 255) DEFAULT 0
 * @param {Object} value    Target value
 * @return {Boolean} whether the value is valid
 */
SSpecValidator.prototype.isValid = function (spec_str, value) {

	var self = this;

	var error_str = self.validate(spec_str, value);
	if (error_str) return false;

	return true;

};


/**
 * Get a valid value from the value or the default value of specification
 * @param {String} spec_str Specification string - e.g. INTEGER(-255, 255) DEFAULT 0
 * @param {Object} value    Target value
 * @return {Object} Valid value
 */
SSpecValidator.prototype.getValidValue = function (spec_str, value) {

	var self = this;

	if (self.isValid(spec_str, value)) {
		return value;
	}

	return new Parser(spec_str).getDefaultValue();

};


/**
 * Validate the value with the specified specification
 * @param {String} spec_str Specification string - e.g. INTEGER(-255, 255) DEFAULT 0
 * @param {Object} value    Target object
 * @return {String} Error text
 */
SSpecValidator.prototype.validate = function (spec_str, value) {

	var self = this;

	var spec = new Parser(spec_str);
	if (self.isDebug) console.log('Specification parsed', spec);

	if (spec.type === 'INTEGER' || spec.type === 'FLOAT' || spec.type === 'NUMBER') {

		if (!helper.isType('Number', value)) {
			return 'Value should be Number';
		}

		// Integer check
		if (spec.type === 'INTEGER' && value.toString().indexOf('.') != -1) {
			return 'Value should be integer number.';
		}

		// Range validation
		if (spec.min != null && value < spec.min) {
			return 'Value should be larger than ' + spec.min;
		}
		if (spec.max != null && spec.max < value) {
			return 'Value should be smaller than ' + spec.max;
		}

	} else if (spec.type === 'BOOLEAN') {

		if (!helper.isType('Boolean', value)) {
			return 'Value should be Boolean';
		}

	} else if (spec.type === 'TEXT' || spec.type === 'STRING') {

		if (!helper.isType('String', value)) {
			return 'Value should be String';
		}

		// Length validation
		if (spec.min != null && value.length < spec.min) {
			return 'Value should be longer than ' + spec.min;
		}
		if (spec.max != null && spec.max < value.length) {
			return 'Value should be shorter than ' + spec.min;
		}

		// Validation using Regular Expression
		if (spec.regExp != null && !value.match(spec.regExp)) {
			return 'Value should be matched with regular-expression ' + spec.regExp;
		}

	}

	return null;

};


// ----

module.exports = SSpecValidator;
