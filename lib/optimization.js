const _ = require('lodash');
const ansi = require('ansi');
const cursor = ansi(process.stdout);

const NamedVector = require('../lib/namedvector').NamedVector
const ShipEngine = require('../lib/shipengine');
const ShipImporter = require('../lib/shipimporter');

class Objective extends NamedVector {
	static get shortnames () {
		return Object.assign({}, ShipEngine.Crewline.shortnames, ShipEngine.Statline.shortnames, {
			'br': 'B',
			'sr': 'R',
		});
	};

	constructor(val) {
		super(val, Objective.shortnames);
	};
};

const ZERO_OBJECTIVE = new Objective(0);
ZERO_OBJECTIVE['O'] = -'Infinity'
ZERO_OBJECTIVE['E'] = -'Infinity'
ZERO_OBJECTIVE['T'] = -'Infinity'
ZERO_OBJECTIVE['BR'] = -'Infinity'
ZERO_OBJECTIVE['SR'] = -'Infinity'

function objective(design) {
	// const nerrors = design.errors.length;
	// const stats_error = design.stats_raw - args.stats
	const stats = design.stats_raw;
	const crew = design.cost_crew_raw.mult(-1.0);
	const br = -design.cost_BR_raw;
	const sr = -design.cost_SR_raw;
	return new Objective(Object.assign({}, stats, crew, {br, sr}));
};

function sample_random_component(design) {
	return _.sample(
		_
			.flatMap(design.subsystems, (ss) => ss.components)
			.filter((comp) => comp.is_quantity_configurable)
	);
};

function random_change_quantity(design) {
	const comp = sample_random_component(design);
	const oldQuant = comp.quantity;
	const valids = comp.valid_quantities;
	let newQuant;
	if (valids.length == 0) {
		const delta = Math.random() > 0.5 ? -1 : 1;
		newQuant = oldQuant + delta;
	} else {
		newQuant = _.sample(valids);
	};
	comp.quantity = newQuant;
	return {success: true, comp, oldQuant};
};

function make_parts_filter(target_year) {
	return (part) => {
		const converted_year_avail = new Number(part['Year Available (SF)']);
		if (converted_year_avail == Number.NaN) {
			return true;
		} else {
			return converted_year_avail <= target_year;
		};
	};
};

function make_frames_filter(target_year) {
	return (part) => {
		const converted_year_avail = new Number(part['Year Available (SF)']);
		if (converted_year_avail == Number.NaN) {
			return true;
		} else {
			return converted_year_avail <= target_year;
		};
	};
};

function randomize_parts(design, target_year) {
	_.flatMap(design.subsystems, (ss) => ss.components).forEach((comp) => {
		const old_part = comp.part;
		const valid_parts = comp
			  .valid_parts
			  .filter(make_parts_filter, target_year);
		const new_part = _.sample(valid_parts)['Name'];
		comp.part = new_part;
	});
	return ['random_restart', {}];
}

function random_new_part(design, target_year) {
	const comp = _.sample(
		_.flatMap(design.subsystems, (ss) => ss.components)
	);
	const old_part = comp.part;
	const valid_parts = comp
		  .valid_parts
		  .filter(make_parts_filter(target_year));
	const new_part = _.sample(valid_parts)['Name'];
	comp.part = new_part;
	return ['part_swap', {old_part, new_part}];
};

function random_new_subframe(design, target_year) {
	const ss = _.sample(design.subsystems)
	const old_frame = ss.sub_frame;
	const valid_frames = ss
		  .valid_frames
		  .filter(make_frames_filter(target_year));
	const new_frame = _.sample(valid_frames)['Name'];
	ss.sub_frame = new_frame;
	return ['subframe_swap', {old_frame, new_frame}];
};

function test_satisfaction(design, target) {
	if (design.is_invalid) {
		return false;
	};

	const obj_design = objective(design);
	if (obj_design.dominates(target)) {
		return true;
	} else if (obj_design.dominates(ZERO_OBJECTIVE)) {
		console.log(chalk.blue(obj_design.toFixed(2)));
		return false;
	} else {
		// console.log(chalk.red(obj_design.toFixed(2)));
		return false;
	}
};

function backtracking_search_quantities(design, target, components, state) {
	if (components.length == 0) {
		return test_satisfaction(design, target);
	} else {
		// not base case, quantities not fully specified. pick a part,
		// iterate over all valid quantities, recurse for each.
		const [component, ...remaining_components] = components;
		let valid_quantities;
		if (component.is_quantity_configurable) {
			valid_quantities = component.valid_quantities;
		} else {
			valid_quantities = [component.quantity];
		}
		// console.log(chalk.green(JSON.stringify(components.map((comp) => comp.name), null, '  ')));
		// console.log('  ', JSON.stringify(component.valid_quantities, null, '  '));
		valid_quantities.forEach((quant) => {
			// console.log("%ssetting %s (%s) quantity to %d", " ".repeat(depth), component.name, component.part, quant);
			component.set_quantity_no_magic(quant);
			state.count += 1;
			if (backtracking_search_quantities(design, target, remaining_components, state)) {
				return true;
			};
			if (state.count % 1e3 == 0) {
				cursor.horizontalAbsolute(0).eraseLine().write(state.count.toString());
			};
		});
		return false;
	};
};

function stochastic_annealing_quantities(design, target, its, cooling) {
	let temperature = 1.0;
	let iteration = 0;
	while (iteration++ < its) {
		const origObj = objective(design);
		const {success, comp, oldQuant} = random_change_quantity(design);
		if (!success) {
			continue;
		};
		const newObj = objective(design);
		const down = origObj.countTest(newObj, NamedVector.op_gt);
		const up = origObj.countTest(newObj, NamedVector.op_lt);
		if (newObj.dominates(target)) {
			return true;
		};
		if (design.is_invalid) {
			comp.quantity = oldQuant;
		};
		const reject = (up - down < 0);
		if (reject && (Math.random() > temperature)) {
			comp.quantity = oldQuant;
		};

		cursor.goto(1, 2).horizontalAbsolute(1).eraseLine().write(origObj.toFixed(5));
		cursor.goto(1, 3).horizontalAbsolute(1).eraseLine().write(newObj.toFixed(5));
		cursor.goto(1, 4).horizontalAbsolute(1).eraseLine().write(origObj.op(NamedVector.op_lt, newObj).toString());
		cursor.goto(1, 5).horizontalAbsolute(1).eraseLine().write(origObj.op(NamedVector.op_gt, newObj).toString());
		cursor.goto(1, 6).horizontalAbsolute(1).eraseLine().write(up.toString());
		cursor.goto(1, 7).horizontalAbsolute(1).eraseLine().write(down.toString());
		cursor.goto(1, 8).horizontalAbsolute(1).eraseLine().write(design.is_invalid.toString());
		if (iteration % 1000 == 0) {
			cursor.goto(1, 1).eraseLine().write(iteration.toString());
		};
		// process.exit(0);
	};
	return false;
};

module.exports.Objective = Objective;
module.exports.objective = objective;
module.exports.randomize_parts = randomize_parts;
module.exports.random_new_part = random_new_part;
module.exports.random_change_quantity = random_change_quantity;
module.exports.sample_random_component = sample_random_component;
module.exports.backtracking_search_quantities = backtracking_search_quantities;
module.exports.stochastic_annealing_quantities = stochastic_annealing_quantities;
module.exports.ZERO_OBJECTIVE = ZERO_OBJECTIVE;
