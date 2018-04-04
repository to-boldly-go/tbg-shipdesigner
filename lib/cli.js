'use strict';

const _ = require('lodash');

const Papa = require('papaparse');
const fs = require('fs');
const Promise = require('bluebird');
const assert = require('assert');

Promise.longStackTraces();

function readFile(filename, enc) {
	return new Promise(function(complete, error) {
		fs.readFile(filename, enc, function(err, result) {
			if (err) {
				error(err);
			} else {
				complete(result);
			};
		});
	});
};

function parseJSON(data) {
	return new Promise(function(complete, error) {
		complete(JSON.parse(data));
	});
};

function parseCSV(data) {
	return new Promise(function(complete, error) {
		Papa.parse(data, {
			header: true,
			dynamicTyping: true,
			complete,
			error
		});
	});
};

function writeDesign(se_design, filename) {
	fs.writeFileSync(filename, JSON.stringify(se_design.json));
};

module.exports.readFile = readFile;
module.exports.parseJSON = parseJSON;
module.exports.parseCSV = parseCSV;
module.exports.writeDesign = writeDesign;
