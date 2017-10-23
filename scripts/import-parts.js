#!/usr/bin/env node

'use strict';

const _ = require('lodash');
const ArgumentParser = require('argparse').ArgumentParser;
const Papa = require('papaparse');
const fs = require('fs');
const Promise = require('bluebird');

Promise.longStackTraces();

let parser = new ArgumentParser({
	version: '0.0.1',
	addHelp: true,
	description: 'Read CSV parts list into a json parts list',
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
	'name',
	{
		help: "The name of the json parts lists to create.",
	}
);

let args = parser.parseArgs();

const DEFAULT_PARTS_SCHEMA = [
	{
		name: 'Type Sort',
		id: 'type-sort',
		edit_type: 'number',
		fixed: 0,
		width: 30,
		align: 'right',
	},
	{
		name: 'Type',
		id: 'type',
		edit_type: 'string',
		width: 162,
		align: 'left',
	},
	{
		name: 'Tier',
		id: 'tier',
		edit_type: 'number',
		fixed: 0,
		width: 26,
		align: 'right',
	},
	{
		name: 'Size Sort',
		id: 'size-sort',
		edit_type: 'number',
		fixed: 0,
		width: 30,
		align: 'right',
	},
	{
		name: 'Size Class',
		id: 'size-class',
		edit_type: 'string',
		width: 68,
		align: 'left',
	},
	{
		name: 'Name',
		id: 'name',
		edit_type: 'string',
		width: 345,
		align: 'left',
	},
	{
		name: 'Effect',
		id: 'effect',
		edit_type: 'number',
		fixed: 3,
		width: 56,
		align: 'right',
		style: 'fixed',
	},
	{
		name: 'Weight O/H',
		id: 'weightoh',
		edit_type: 'number',
		width: 40,
		fixed: 0,
		align: 'right',
		style: 'fixed',
	},
	{
		name: 'Scale Weight',
		id: 'scaleweight',
		edit_type: 'number',
		width: 40,
		align: 'right',
		style: 'fixed',
	},
	{
		name: 'Unit Weight',
		id: 'unitweight',
		edit_type: 'number',
		fixed: 2,
		width: 40,
		align: 'right',
		style: 'fixed',
	},
	{
		name: 'SR Cost x',
		id: 'srcostx',
		edit_type: 'number',
		fixed: 5,
		width: 65,
		align: 'right',
		style: 'fixed',
	},
	{
		name: 'Pwr O/H',
		id: 'poweroh',
		edit_type: 'number',
		fixed: 3,
		width: 54,
		align: 'right',
		style: 'fixed',
	},
	{
		name: 'Scale Pwr',
		id: 'scalepower',
		edit_type: 'number',
		fixed: 3,
		width: 40,
		align: 'right',
		style: 'fixed',
	},
	{
		name: 'Unit Power',
		id: 'unitpower',
		edit_type: 'number',
		fixed: 2,
		width: 40,
		align: 'right',
		style: 'fixed',
	},
	{
		name: 'O',
		id: 'ocost',
		edit_type: 'number',
		fixed: 3,
		width: 51,
		align: 'right',
		style: 'fixed',
	},
	{
		name: 'E',
		id: 'ecost',
		edit_type: 'number',
		fixed: 3,
		width: 51,
		align: 'right',
		style: 'fixed',
	},
	{
		name: 'T',
		id: 'tcost',
		edit_type: 'number',
		fixed: 3,
		width: 44,
		align: 'right',
		style: 'fixed',
	},
	{
		name: 'Reliability',
		id: 'reliability',
		edit_type: 'number',
		fixed: 7,
		width: 66,
		align: 'right',
		style: 'fixed',
	},
	{
		name: 'Year Available (SF)',
		id: 'year',
		edit_type: 'string',
		width: 123,
		align: 'right',
	},
];

const DEFAULT_MODULES_SCHEMA = [
	{
		name: "Type",
		id: 'type',
		edit_type: 'string',
		width: 151,
		align: 'right',
	},
	{
		name: "Weight Cap",
		id: 'weightcap',
		edit_type: 'number',
		fixed: 0,
		width: 72,
		align: 'right',
	},
	{
		name: "Variant",
		id: 'variant',
		edit_type: 'string',
		width: 70,
		align: 'right',
	},
	{
		name: "Tier",
		id: 'tier',
		edit_type: 'number',
		fixed: 0,
		width: 24,
		align: 'right',
	},
	{
		name: "Build Time",
		id: 'buildtime',
		edit_type: 'number',
		fixed: 2,
		width: 70,
		align: 'right',
	},
	{
		name: "C",
		id: 'combat',
		edit_type: 'number',
		fixed: 1,
		width: 19,
		align: 'right',
	},
	{
		name: "S",
		id: 'science',
		edit_type: 'number',
		fixed: 1,
		width: 19,
		align: 'right',
	},
	{
		name: "H",
		id: 'hull',
		edit_type: 'number',
		fixed: 1,
		width: 19,
		align: 'right',
	},
	{
		name: "L",
		id: 'shields',
		edit_type: 'number',
		fixed: 1,
		width: 19,
		align: 'right',
	},
	{
		name: "P",
		id: 'presence',
		edit_type: 'number',
		fixed: 1,
		width: 19,
		align: 'right',
	},
	{
		name: "D",
		id: 'defense',
		edit_type: 'number',
		fixed: 1,
		width: 19,
		align: 'right',
	},
	{
		name: "Weight",
		id: 'weight',
		edit_type: 'number',
		fixed: 0,
		width: 47,
		align: 'right',
	},
	{
		name: "SR Cost",
		id: 'srcost',
		edit_type: 'number',
		fixed: 0,
		width: 54,
		align: 'right',
	},
	{
		name: "Power Cost",
		id: 'powercost',
		edit_type: 'number',
		fixed: 0,
		width: 75,
		align: 'right',
	},
	{
		name: "O",
		id: 'ocost',
		edit_type: 'number',
		fixed: 2,
		width: 30,
		align: 'right',
	},
	{
		name: "E",
		id: 'ecost',
		edit_type: 'number',
		fixed: 2,
		width: 30,
		align: 'right',
	},
	{
		name: "T",
		id: 'tcost',
		edit_type: 'number',
		fixed: 2,
		width: 30,
		align: 'right',
	},
	{
		name: "Reliability",
		id: 'reliability',
		edit_type: 'number',
		fixed: 7,
		width: 62,
		align: 'right',
	},
];

const DEFAULT_FRAMES_SCHEMA = [
	{
		name: 'Type Sort',
		id: 'type-sort',
		edit_type: 'number',
		fixed: 0,
		width: 59,
		align: 'right',
	},
	{
		name: 'Type',
		id: 'type',
		edit_type: 'string',
		width: 73,
		align: 'right',
	},
	{
		name: 'Tier',
		id: 'tier',
		edit_type: 'number',
		width: 27,
		align: 'right',
	},
	{
		name: 'Weight Class',
		id: 'weightclass',
		edit_type: 'number',
		width: 85,
		align: 'right',
	},
	{
		name: 'Size Class',
		id: 'sizeclass',
		edit_type: 'number',
		width: 68,
		align: 'right',
	},
	{
		name: 'Name',
		id: 'name',
		edit_type: 'string',
		width: 261,
		align: 'right',
	},
	{
		name: 'MaxSz',
		id: 'maxsz',
		edit_type: 'number',
		width: 44,
		align: 'right',
	},
	{
		name: 'Wt',
		id: 'wt',
		edit_type: 'number',
		width: 25,
		align: 'right',
	},
	{
		name: 'Build Time',
		id: 'buildtime',
		edit_type: 'string',
		width: 70,
		align: 'right',
	},
	{
		name: 'Tac Mod',
		id: 'tacmod',
		edit_type: 'number',
		width: 55,
		align: 'right',
	},
	{
		name: 'Ops Mod',
		id: 'opsmod',
		edit_type: 'number',
		width: 59,
		align: 'right',
	},
	{
		name: 'Hull Mod',
		id: 'hullmod',
		edit_type: 'number',
		width: 58,
		align: 'right',
	},
	{
		name: 'Eng. Mod',
		id: 'engmod',
		edit_type: 'number',
		width: 62,
		align: 'right',
	},
	{
		name: 'Core Mod',
		id: 'coremod',
		edit_type: 'number',
		width: 63,
		align: 'right',
	},
	{
		name: 'O-Mod',
		id: 'omod',
		edit_type: 'number',
		width: 45,
		align: 'right',
	},
	{
		name: 'E-Mod',
		id: 'emod',
		edit_type: 'number',
		width: 45,
		align: 'right',
	},
	{
		name: 'T-Mod',
		id: 'tmod',
		edit_type: 'number',
		width: 42,
		align: 'right',
	},
	{
		name: 'SR-Mod',
		id: 'srmod',
		edit_type: 'number',
		width: 53,
		align: 'right',
	},
	{
		name: 'Year Available (SF)',
		id: 'year',
		edit_type: 'string',
		width: 120,
		align: 'right',
	},
];

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


Promise.all([readFile(args.parts, 'utf8').then(Papa.parsePromise),
			 readFile(args.frames, 'utf8').then(Papa.parsePromise),
			 readFile(args.modules, 'utf8').then(Papa.parsePromise)])
	.then(([parts, frames, modules]) => {
		console.log(JSON.stringify({
			name: args.name,
			timestamp: new Date().toISOString(),
			parts: {
				records: parts.data.filter((row) => _.size(row) > 2),
				schema: DEFAULT_PARTS_SCHEMA,
			},
			modules: {
				records: modules.data.filter((row) => _.size(row) > 2),
				schema: DEFAULT_MODULES_SCHEMA,
			},
			frames: {
				records: frames.data.filter((row) => _.size(row) > 2),
				schema: DEFAULT_FRAMES_SCHEMA,
			},
		}));
	});
