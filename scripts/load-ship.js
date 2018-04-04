#!/usr/bin/env node

'use strict';

const ArgumentParser = require('argparse').ArgumentParser;
const Papa = require('papaparse');
const fs = require('fs');
const Promise = require('bluebird');

Promise.longStackTraces();

const ShipEngine = require('../lib/shipengine');
const CLI = require('../lib/cli');

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
	['-d', '--design'],
	{
		help: "The JSON for the design itself",
	}
);

let args = parser.parseArgs();

Promise.all([CLI.readFile(args.parts, 'utf8').then(CLI.parseCSV),
			 CLI.readFile(args.frames, 'utf8').then(CLI.parseCSV),
			 CLI.readFile(args.modules, 'utf8').then(CLI.parseCSV),
			 CLI.readFile(args.design, 'utf8').then(CLI.parseJSON)])
	.then(([parts, frames, modules, design]) => {
		let se_DB = new ShipEngine.DB({
			parts: parts.data,
			frames: frames.data,
			modules: modules.data,
		});
		let se_design = new ShipEngine.Design(se_DB, design);

		// console.log(se_design.stats)
		// console.log(se_design.stats_raw)
		// console.log(se_design.subsystems.map((ss) => [ss.name, ss.stats]));
		// console.log(se_design.subsystems.map((ss) => {
		// 	return ss.components.map((comp) => [comp.name, comp.part_def.Name, comp.stats.toString()])
		// }));

		// console.log(se_design.weight_internal);
		// console.log(se_design.weight_external);
		// console.log(se_design.weight_raw_total);
		// console.log(se_design.weight_total);
		// console.log(se_design.subsystems.map((ss) => [ss.name, ss.weight_internal, ss.weight_external, ss.weight_frame]));
		// console.log(se_design.subsystems.map((ss) => {
		// 	return ss.components.map((comp) => [comp.name, comp.part_def.Name, comp.weight])
		// }));
		// console.log(se_design.module.weight_internal, se_design.module.weight_external);

		// console.log(se_design.cost_BR);
		// console.log(se_design.cost_BR_raw);
		// console.log(se_design.module.cost_BR);
		// console.log(se_design.subsystems.map((ss) => [ss.name, ss.cost_BR]));
		// console.log(se_design.subsystems.map((ss) => {
		// 	return ss.components.map((comp) => [comp.name, comp.part_def.Name, comp.cost_BR])
		// }));
		// console.log(se_design.cost_BR_round)
		// console.log(se_design.weight_class)
		// console.log(se_design.weight_class_raw)

		// console.log(se_design.cost_SR);
		// console.log(se_design.cost_SR_raw);
		// console.log(se_design.module.cost_SR);
		// console.log(se_design.subsystems.map((ss) => [ss.name, ss.cost_SR_mult_raw, ss.design.cost_SR_frame_mult]));
		// console.log(se_design.subsystems.map((ss) => {
		// 	return ss.components.map((comp) => [comp.name, comp.part_def.Name, comp.cost_SR, comp.subsystem.cost_SR_mult])
		// }));
		// console.log(se_design.cost_SR_round)

		// console.log(se_design.cost_power);
		// console.log(se_design.cost_power_raw);
		// console.log(se_design.subsystems.map((ss) => [ss.name, ss.design.cost_power]));
		// console.log(se_design.subsystems.map((ss) => {
		// 	return ss.components.map((comp) => [comp.name, comp.part_def.Name, comp.cost_power_overhead, comp.cost_power_scale])
		// }));

		// console.log(se_design.power_generation);
		// console.log(se_design.power_generation_raw);
		// console.log(se_design.subsystems.map((ss) => [ss.name, ss.power_generation]));
		// console.log(se_design.subsystems.map((ss) => {
		// 	return ss.components.map((comp) => [comp.name, comp.part_def.Name, comp.power_generation])
		// }));

		// console.log(se_design.subsystems.map((ss) => {
		// 	return ss.components.map((comp) => [comp.name, comp.part_def.Name,
		// 										comp.cost_crew.toString(),
		// 										// comp.cost_crew_raw.toString(),
		// 										// comp.subsystem.cost_crew_frame_mult.toString(),
		// 										// comp.subsystem.design.cost_crew_frame_mult.toString(),
		// 										// comp.crew_mod.toString(),
		// 										// comp.cost_crew_quantity_mod,
		// 										// comp.subsystem.design.cost_crew_size_mod,
		// 									   ])
		// }));

		// console.log(se_design.cost_crew.toString());
		// console.log(se_design.cost_crew_raw.toString());
		// console.log(se_design.subsystems.map((ss) => [ss.name, ss.cost_crew.toString()]));
		// console.log(se_design.subsystems.map((ss) => {
		// 	return ss.components.map((comp) => [comp.name, comp.part_def.Name, comp.cost_crew.toString()])
		// }));


		// console.log(se_design.build_time);
		// console.log(se_design.build_time_raw);
		// console.log(se_design.evasion);
		// console.log(se_design.subsystems.map((ss) => [ss.name, ss.evasion]));
		// console.log(se_design.subsystems.map((ss) => {
		// 	return ss.components.map((comp) => [comp.name, comp.part_def.Name, comp.evasion])
		// }));
		// console.log(se_design.warp_core_breach);
		// console.log(se_design.subsystems.map((ss) => [ss.name, ss.warp_core_breach]));

		// console.log(se_design.frame_max_size_raw);
		// console.log(se_design.module.size);
		// console.log(se_design.subsystems.map((ss) => [ss.name, ss.weight_cap]));

		console.log(se_design.pretty_summary)
		console.log(se_design.pretty_sdb_info)
	});
