#!/usr/bin/env node

'use strict';

const ArgumentParser = require('argparse').ArgumentParser;
const Papa = require('papaparse');
const fs = require('fs');
const Promise = require('bluebird');

Promise.longStackTraces();

const ShipEngine = require('./shipengine');
const ShipImporter = require('./importer');

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
	['-m', '--modules'],
	{
		help: "The CSV for the modules list",
	}
);

parser.addArgument(
	['-c', '--designcsv'],
	{
		help: "The CSV for the design to import and validate the engine against",
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
			 readFile(args.modules, 'utf8').then(Papa.parsePromise),
			 readFile(args.designcsv, 'utf8')])
	.then(([parts, frames, modules, design]) => {
		let se_DB = new ShipEngine.DB({parts, frames, modules});
		let se_json = ShipImporter.import_design(design);
		let se_design = new ShipEngine.Design(se_DB, se_json);

		fs.writeFileSync('output.json', JSON.stringify(se_json));

		console.log(se_design.pretty_summary)
		console.log(se_design.pretty_sdb_info)
	});
