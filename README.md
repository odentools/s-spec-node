# s-spec-node
[S-Spec](https://github.com/odentools/s-spec) Parser and Validator for Node.js / io.js.

This project is development phase.

[![Build Status](https://travis-ci.org/odentools/s-spec-node.svg?branch=master)](https://travis-ci.org/odentools/s-spec-node)


## Get Started

### On Your Code

```
$ npm install --save https://github.com/odentools/s-spec-node.git
```
```js
var sv = require('s-spec');

// Validation
console.log(sv.isValid('INTEGER(0,255) DEFAULT 0', 100)); // Okay
console.log(sv.isValid('INTEGER(0,255) DEFAULT 0', 256)); // Out of range

console.log(sv.isValid('TEXT(1,4)', 'okay')); // Okay
console.log(sv.isValid('TEXT(1,4)', '')); // Too short
console.log(sv.isValid('TEXT(1,4)', 'hello')); // Too long

// Get a valid value
console.log(sv.getValidValue('INTEGER(0,255) DEFAULT 100', 255)); // 255
console.log(sv.getValidValue('INTEGER(0,255) DEFAULT 100', 256)); // 100

```

### On Command (Under construction...)

```
$ git clone https://github.com/odentools/s-spec.git
$ cd s-spec/
$ npm install
$ node sspec.js --spec 'INTEGER(0,255) DEFAULT 0'
100
```


## Licenses

```
The MIT License (MIT).
Copyright (c) 2016 OdenTools Project.
```
