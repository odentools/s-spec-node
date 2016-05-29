# s-spec-node
[S-Spec](https://github.com/odentools/s-spec) Parser and Validator for Node.js / io.js.

This project is beta testing phase.

[![Build Status](https://travis-ci.org/odentools/s-spec-node.svg?branch=master)](https://travis-ci.org/odentools/s-spec-node)
[![npm](https://img.shields.io/npm/v/s-spec.svg?maxAge=2592000)](https://www.npmjs.com/package/s-spec)


## Get Started

### On Your Code

```
$ npm install --save s-spec
```
```js
var validator = require('s-spec');

// Validation
console.log(validator.isValid('INTEGER(0,255) DEFAULT 0', 100)); // Okay
console.log(validator.isValid('INTEGER(0,255) DEFAULT 0', 256)); // Out of range

console.log(validator.isValid('TEXT(1,4)', 'okay')); // Okay
console.log(validator.isValid('TEXT(1,4)', '')); // Too short
console.log(validator.isValid('TEXT(1,4)', 'hello')); // Too long

// Get a valid value
console.log(validator.getValidValue('INTEGER(0,255) DEFAULT 100', 255)); // 255
console.log(validator.getValidValue('INTEGER(0,255) DEFAULT 100', 256)); // 100

```

<!--
### On Command (Under construction...)

```
$ git clone https://github.com/odentools/s-spec.git
$ cd s-spec/
$ npm install
$ node sspec.js --spec 'INTEGER(0,255) DEFAULT 0'
100
```-->


## About S-Spec

S-Spec is a specification format for field values.

It can be used to validate the any values using single-line format, but it's powerful.

Examples of the format:
```
INTEGER(0,255) DEFAULT 100
BOOLEAN() DEFAULT false
STRING(0,140) REGEXP '^[a-z\'\" ]+$'
```

See details: https://github.com/odentools/s-spec


## Licenses

```
The MIT License (MIT).
Copyright (c) 2016 OdenTools Project.
```
