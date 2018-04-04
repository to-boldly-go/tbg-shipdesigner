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

let args = parser.parseArgs();

const target_year = args.year ? new Number(args.year) : 2500;

Promise.all([
	CLI.readFile(args.parts, 'utf8').then(CLI.parseJSON),
	CLI.readFile(args.start, 'utf8').then(CLI.parseJSON),
]).then(
	function ([parts_json, start_design_json]) {
		const se_db = new ShipEngine.DB(parts_json);
		let se_design = new ShipEngine.Design(se_db, start_design_json);

		let best = _.cloneDeep(se_design.json);
		let best_obj = Opt.objective(se_design);
		let orig_obj = Opt.objective(se_design);

		let current = _.cloneDeep(se_design.json);

		let it = 0;

		while(true) {
			it += 1;

			se_design = new ShipEngine.Design(se_db, _.cloneDeep(current));

			let f;
			if (it % 100 == 0) {
				f = Opt.randomize_parts;
			} else {
				f = _.sample([
					Opt.random_change_quantity,
					Opt.random_change_quantity,
					Opt.random_change_quantity,
					Opt.random_change_quantity,
					Opt.random_new_part,
				]);
			}

			let [change_type, data] = f(se_design, target_year);

			if (se_design.errors.length) {
				// console.log("Error!");
				// console.log(se_design.errors);
				// console.log(se_design.subsystem('Operations').weight_error);
				// console.log(se_design.subsystem('Hull').component('Hull System').valid_quantities);
				// process.exit(1);
				if (Math.random() < 0.1) {
					current = se_design.json;
				}
			} else {
				current = se_design.json;
			};

			const obj = Opt.objective(se_design);

			if (se_design.is_valid && obj.dominates(best_obj) || best_obj.dominates(obj)) {
				const delta_obj = obj.sub(best_obj);
				console.log(obj.toFixed(2));
				console.log(delta_obj.toFixed(2));
				console.log("obj dominates: ", obj.dominates(best_obj));
				console.log("best dominates: ", best_obj.dominates(obj));
				console.log("errors: ", se_design.errors);
				fs.writeFileSync("best_design." + it + ".json", JSON.stringify(se_design.json));
				// process.exit(0)
			};
			// if (net_stats > 0) {
			// 	console.log("New ship: " + se_design.stats_raw.toFixed(2));
			// 	console.log(" vs orig: " + se_design.stats_raw.sub(orig_stats).toFixed(2));
			// 	// best = _.cloneDeep(se_design.json);
			// 	// best_stats = se_design.stats_raw;

			// };
		};
	}
);
