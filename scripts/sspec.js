/**
 * s-spec - Single line specification for field values
 * https://github.com/odentools/s-spec
 * (C) 2016 - OdenTools Released under MIT License.
 */
'use strict';

var argv = require('argv'),
	reader = require('readline').createInterface({
		input: process.stdin,
		output: process.stdout
	});

var SSpecParser = require(__dirname + '/models/parser'),
	SSpecValidator = require(__dirname + '/models/validator');


// Definition of options
argv.option({
	name: 'spec',
	short: 's',
	type : 'string',
	description :'Specification string',
	example: '\'script --spec=value\' or \'script -s value\''
});


// ----


var arg = argv.run();
var options = arg.options;
if (options.spec == null) {
	console.error('spec parameter is required.\n');
	argv.help();
	process.exit(255);
}

// Check the specification string
try {
	var parser = new SSpecParser(options.spec);
} catch (e) {
	console.error('spec parameter is invalid: ' + options.spec + '\n\n' + e.toString());
	process.exit(255);
}

// Validate
var validator = new SSpecValidator();

reader.on('line', function (line) {

	var error_str = validator.validate(options.spec, line);
	if (error_str != null) {
		console.error(new Error(error_str));
	}

});

reader.on('close', function () {

	process.exit(0);

});
