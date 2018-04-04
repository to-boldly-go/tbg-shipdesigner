#!/usr/bin/env node

'use strict';

const ArgumentParser = require('argparse').ArgumentParser;
const Papa = require('papaparse');
const fs = require('fs');
const Promise = require('bluebird');
const _ = require('lodash');
const assert = require('assert');
const clc = require('cli-color');

Promise.longStackTraces();

const NamedVector = require('../lib/namedvector').NamedVector
const ShipEngine = require('../lib/shipengine');
const ShipImporter = require('../lib/shipimporter');
const Opt = require('../lib/optimization');
const CLI = require('../lib/cli');

let parser = new ArgumentParser({
	version: '0.0.1',
	addHelp: true,
	description: 'Read a CSV parts list into a json parts list',
});

parser.addArgument(
	['targets'],
	{
		help: 'The file containing the optimization criteria',
	}
);

parser.addArgument(
	['parts'],
	{
		help: 'The parts list to use',
	}
);

parser.addArgument(
	['start'],
	{
		help: 'The design to start with',
	}
);

parser.addArgument(
	['compare'],
	{
		help: 'The design to compare with the original',
	}
);

let args = parser.parseArgs();

Promise.all([
	CLI.readFile(args.parts, 'utf8').then(CLI.parseJSON),
	CLI.readFile(args.start, 'utf8').then(CLI.parseJSON),
	CLI.readFile(args.compare, 'utf8').then(CLI.parseJSON),
]).then(
	function ([parts_json, start_design_json, comp_design_json]) {
		const se_db = new ShipEngine.DB(parts_json);
		let se_design_orig = new ShipEngine.Design(se_db, start_design_json);
		let se_design_comp = new ShipEngine.Design(se_db, comp_design_json);

		const obj_orig = Opt.objective(se_design_orig);
		const obj_comp = Opt.objective(se_design_comp);
		const delta_obj = obj_comp.sub(obj_orig);

		if (obj_comp.dominates(obj_orig)) {
			console.log(clc.red(args.compare));
			console.log(se_design_orig.pretty_summary);
			console.log(se_design_comp.pretty_summary);
			console.log(delta_obj.toFixed(2));
			console.log(se_design_comp.errors);
		}
	}
);
