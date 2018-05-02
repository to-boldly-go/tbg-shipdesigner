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

function backtracking_search_parts(design, target, remaining_components) {
	if (remaining_components.length == 0) {
		// base case, design fully specified, evaluate
		return evaluate(design);
	} else {
		// not base case, design not yet fully specified.

		// pick off a component. iterate over all valid parts for that
		// component.
	}
}

function backtracking_search_quantities(design, target, remaining_components, state) {
	if (remaining_components.length == 0) {
		const obj_design = Opt.objective(design);
		if (design.is_invalid) {
			return false;
		};

		if (obj_design.dominates(target)) {
			return true;
		} else if (obj_design.dominates(Opt.ZERO_OBJECTIVE)) {
			console.log(chalk.blue(obj_design.toFixed(2)));
			return false;
		} else {
			// console.log(chalk.red(obj_design.toFixed(2)));
			return false;
		}
	} else {
		// not base case, quantities not fully specified. pick a part,
		// iterate over all valid quantities, recurse for each.
		const component = remaining_components[0];
		const next_remaining_components = remaining_components.slice(1);
		let valid_quantities;
		if (component.is_quantity_configurable) {
			valid_quantities = component.valid_quantities;
		} else {
			valid_quantities = [component.quantity];
		}
		// console.log(chalk.green(JSON.stringify(remaining_components.map((comp) => comp.name), null, '  ')));
		// console.log('  ', JSON.stringify(component.valid_quantities, null, '  '));
		valid_quantities.forEach((quant) => {
			// console.log("%ssetting %s (%s) quantity to %d", " ".repeat(depth), component.name, component.part, quant);
			component.set_quantity_no_magic(quant);
			state.count += 1;
			if (backtracking_search_quantities(design, target, next_remaining_components, state)) {
				return true;
			};
			if (state.count % 1e3 == 0) {
				cursor.horizontalAbsolute(0).eraseLine().write(state.count.toString());
			};
		});
		return false;
	};
}

Promise.all([
	CLI.readFile(args.parts, 'utf8').then(CLI.parseJSON),
	CLI.readFile(args.start, 'utf8').then(CLI.parseJSON),
	CLI.readFile(args.targets, 'utf8').then(CLI.parseJSON),
]).then(
	function ([parts_json, start_design_json, targets_json]) {
		const obj_target = new Opt.Objective(targets_json);
			  
		const se_db = new ShipEngine.DB(parts_json);
		let se_design = new ShipEngine.Design(se_db, start_design_json);

		// const comps = _
		// 	  .flatMap(se_design.subsystems, (ss) => ss.components)
		// 	  .filter((comp) => comp.is_quantity_configurable);
		// const res = Opt.backtracking_search_quantities(se_design, obj_target, comps, {count: 0});
		const res = Opt.stochastic_annealing_quantities(se_design, obj_target, 1000, .9999);
		console.log();
		console.log(res);
		console.log(se_design.pretty_summary);
		CLI.writeDesign(se_design, "improved_design.json")
	}
);
