#!/usr/bin/env node

'use strict';

const ArgumentParser = require('argparse').ArgumentParser;
const Papa = require('papaparse');
const fs = require('fs');
const Promise = require('bluebird');

Promise.longStackTraces();

const ShipEngine = require('./shipengine');

let parser = new ArgumentParser({
	version: '0.0.1',
	addHelp: true,
	description: 'Read a CSV parts list into a json parts list',
});

parser.addArgument(
	['-p', '--parts'],
	{
		help: "The CSV for the parts list",
	}
);

parser.addArgument(
	['-f', '--frames'],
	{
		help: "The CSV for the frames list",
	}
);

parser.addArgument(
	['-d', '--design'],
	{
		help: "The JSON for the design itself",
	}
);

let args = parser.parseArgs();

Papa.parsePromise = function(file) {
	return new Promise(function(complete, error) {
		Papa.parse(file, {
			header: true,
			dynamicTyping: true,
			complete,
			error
		});
	});
};

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

Promise.all([readFile(args.parts, 'utf8').then(Papa.parsePromise),
			 readFile(args.frames, 'utf8').then(Papa.parsePromise),
			 readFile(args.design, 'utf8').then(parseJSON)])
	.then(([parts, frames, design]) => {
		let se_DB = new ShipEngine.DB({parts, frames});
		let se_design = new ShipEngine.Design(se_DB, design);
		console.log(se_design.raw_stats)
		console.log(se_design.subsystems.map((ss) => [ss.name, ss.stats]));
		console.log(se_design.subsystems.map((ss) => {
			return ss.components.map((comp) => [comp.name, comp.part_def.Name, comp.stats.toString()])
		}));
	});
