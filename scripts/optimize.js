#!/usr/bin/env node

'use strict';

const ArgumentParser = require('argparse').ArgumentParser;
const Papa = require('papaparse');
const fs = require('fs');
const Promise = require('bluebird');
const _ = require('lodash');
const assert = require('assert');

Promise.longStackTraces();

const ShipEngine = require('../lib/shipengine');
const ShipImporter = require('../lib/shipimporter');

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


function random_increment_or_decrement_quantity(design) {
	const comp = _.sample(
		_
			.flatMap(design.subsystems, (ss) => ss.components)
			.filter((comp) => comp.is_quantity_configurable)
	);
	const old_quant = comp.quantity;
	const new_quant = _.sample([old_quant - 1, old_quant + 1]);
	comp.quantity = new_quant;
	return [comp, 'quantity_inc/dec', old_quant, new_quant];
};

const target_date = args.year ? new Number(args.year) : 2500;
function parts_filter(part) {
	const converted_year_avail = new Number(part['Year Available (SF)']);
	if (converted_year_avail == Number.NaN) {
		return true;
	} else {
		return converted_year_avail <= target_date;
	};
};

function frames_filter(part) {
	const converted_year_avail = new Number(part['Year Available (SF)']);
	if (converted_year_avail == Number.NaN) {
		return true;
	} else {
		return converted_year_avail <= target_date;
	};
};

function random_new_part(design) {
	const comp = _.sample(
		_
			.flatMap(design.subsystems, (ss) => ss.components)
	);
	const old_part = comp.part;
	const valid_parts = comp
		  .valid_parts
		  .filter(parts_filter);
	const new_part = _.sample(valid_parts)['Name'];
	comp.part = new_part;
	return [comp, 'part_swap', old_part, new_part];
};

function random_new_subframe(design) {
	const ss = _.sample(design.subsystems)
	const old_frame = ss.sub_frame;
	const valid_frames = ss
		  .valid_frames
		  .filter(frames_filter);
	const new_part = _.sample(valid_parts)['Name'];
	comp.part = new_part;
	return [comp, 'part_swap', old_part, new_part];
};


function objective(design) {
	const nerrors = design.errors.length;
	const stats_error = design.stats_raw - args.stats
};


Promise.all([
	readFile(args.parts, 'utf8').then(parseJSON),
	readFile(args.start, 'utf8').then(parseJSON),
]).then(
	function ([parts_json, start_design_json]) {
		const se_db = new ShipEngine.DB(parts_json);
		let se_design = new ShipEngine.Design(se_db, start_design_json);

		let best = _.cloneDeep(se_design.json);
		let best_stats = se_design.stats_raw;

		let current = _.cloneDeep(se_design.json);

		let it = 0;

		while(true) {
			it += 1;
			if (it % 10 == 0) {
				current = best;
			};
			
			let comp, change_type, old_value, new_value;
			do {
				se_design = new ShipEngine.Design(se_db, _.cloneDeep(current));
				let f = _.sample([
					random_increment_or_decrement_quantity,
					random_new_part,
					
				]);
				[comp, change_type, old_value, new_value] = f(se_design);
			} while(se_design.is_invalid);
			current = se_design.json;

			if (se_design.errors.length) {
				console.log("Error!");
				console.log(se_design.errors);
				console.log(se_design.subsystem('Operations').weight_error);
				console.log(se_design.subsystem('Hull').component('Hull System').valid_quantities);
				process.exit(1);
			};

			const delta_stats = se_design.stats_raw.sub(best_stats);
			const net_stats = delta_stats.names.reduce((acc, name) => acc + delta_stats[name], 0);

			if (net_stats > 0) {
				console.log("New best: " + se_design.stats_raw.toFixed(2));
				console.log("    Delta: " + se_design.stats_raw.sub(best_stats).toFixed(2));
				best = _.cloneDeep(se_design.json);
				best_stats = se_design.stats_raw;

				fs.writeFileSync("best_design.json", JSON.stringify(se_design.json));
			};
		};
	}
);
