#!/usr/bin/env node

'use strict';

const ArgumentParser = require('argparse').ArgumentParser;
const Papa = require('papaparse');
const fs = require('fs');
const Promise = require('bluebird');
const _ = require('lodash');
const assert = require('assert');

Promise.longStackTraces();

const NamedVector = require('../lib/namedvector').NamedVector
const ShipEngine = require('../lib/shipengine');
const ShipImporter = require('../lib/shipimporter');
const Opt = require('../lib/optimization');
const CLI = require('../lib/cli');
const ansi = require('ansi');
const cursor = ansi(process.stdout);
const chalk = require('chalk');

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
		help: 'The design to use subframes from',
	}
);

let args = parser.parseArgs();

const target_year = args.year ? new Number(args.year) : 2500;

Promise.all([
	CLI.readFile(args.parts, 'utf8').then(CLI.parseJSON),
	CLI.readFile(args.start, 'utf8').then(CLI.parseJSON),
	CLI.readFile(args.targets, 'utf8').then(CLI.parseJSON),
]).then(
	function ([parts_json, start_design_json, targets_json]) {
		const obj_target = new Opt.Objective(targets_json);
			  
		const se_db = new ShipEngine.DB(parts_json);
		let se_design = new ShipEngine.Design(se_db, start_design_json);

		const comps = _
			  .flatMap(se_design.subsystems, (ss) => ss.components)
			  .filter((comp) => comp.is_quantity_configurable);
		const res = Opt.backtracking_search_quantities(se_design, obj_target, comps, {count: 0});
		console.log(res);
		console.log(se_design.pretty_summary);
		CLI.writeDesign(se_design, "improved_design.json")
	}
);
