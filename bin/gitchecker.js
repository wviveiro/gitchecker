#!/usr/bin/env node

// Delete the 0 and 1 argument (node and script.js)
var args = process.argv.splice(process.execArgv.length + 2);

// Retrieve the first argument
var path = args[0];

var gitChecker = require('../lib/index.js');

// Displays the text in the console
gitChecker.exec(path);