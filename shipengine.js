// AL6, $AL$6
const SIZE_TO_WEIGHT_CAP_MULTIPLIER = 300

// AL7
const BR_TO_WEIGHT_MULTIPLIER = 10

const SR_COST_ROUND_MAP = {
	'Frigate': 5,
	'Cruiser': 10,
	'EXplorer': 10,
};

const BR_COST_ROUND_MAP = {
	'Frigate': 5,
	'Cruiser': 10,
	'EXplorer': 10,
};

// =IF(DK$18 = 1, "Frigate", IF(DK$18 = 2, "Cruiser", "Explorer"))
const WEIGHT_CLASS_MAP = {
	1: 'Frigate',
	2: 'Cruiser',
	3: 'Explorer',
};

const SUBSYSTEM_NAME_MAP = {
	"Tactical": "Tac Mod",
	"Engineering": "Eng. Mod",
	"Hull": "Hull Mod",
	"Operations": "Ops Mod",
	"Warp Core": "Core Mod",
}

const STAT_SHORTNAMES = {
	'combat': 'C',
	'science': 'S',
	'hull': 'H',
	'shields': 'L',
	'presence': 'P',
	'defense': 'D',
}

// REFACTOR: change the names of these to be less abbreviated
// (effectiveness instead of effect, for example)
let COMPONENT_MODIFIERS = {
	"Primary Phasers": {
		"Effect Qty?": true,
		"combat": 1,
		"Cost Mod": 1,
	},
	"Secondary Phasers": {
		"Effect Qty?": true,
		"combat": 1/4,
		"Cost Mod": 1/4,
	},
	"Torpedo System": {
		"Effect Qty?": true,
		"combat": 1,
		"Cost Mod": 1,
	},
	"Short-Range Sensors": {
		"Effect Qty?": true,
		"combat": 1/2,
		"science": 1/2,
		"Cost Mod": 1,
	},
	"Targeting Computer": {
		"Effect Qty?": true,
		"combat": 1,
		"Cost Mod": 1,
	},
	"Deflector Shields": {
		"Effect Qty?": true,
		"shields": 1,
		"Cost Mod": 1,
	},
	"Backup Deflectors": {
		"Effect Qty?": true,
		"shields": 1/5,
		"Cost Mod": 1/5,
	},
	"Impulse Engine Pwr": {
		"Effect Qty?": true,
		"combat": 1/4,
		"defense": 4/5,
		"Cost Mod": 1,
	},

	"Long-Range Sensors": {
		"Effect Qty?": true,
		"science": 1,
		"Cost Mod": 1,
	},
	"Navigational Sensors": {
		"Effect Qty?": true,
		"science": 1,
		"defense": 1/6,
		"Cost Mod": 1,
	},
	"Survey Sensors": {
		"Effect Qty?": true,
		"science": 1,
		"Cost Mod": 1,
	},
	"Science Labs": {
		"Effect Qty?": true,
		"science": 1,
		"Cost Mod": 1,
	},
	"Computer Core": {
		"Effect Qty?": true,
		"combat": 1/4,
		"science": 1/4,
		"hull": 1/10,
		"shields": 1/7,
		"presence": 1/6,
		"defense": 1/8,
		"Cost Mod": 1,
	},
	"Operating System": {
		"Effect Qty?": true,
		"combat": 1/8,
		"science": 1/8,
		"shields": 1/14,
		"defense": 1/10,
		"Cost Mod": 1,
	},
	"Secondary Core": {
		"Effect Qty?": true,
		"combat": 1/16,
		"science": 1/16,
		"shields": 1/28,
		"defense": 1/40,
		"Cost Mod": 1/2,
	},
	"Diplomatic Package": {
		"Effect Qty?": true,
		"presence": 1,
		"Cost Mod": 1,
	},
	"Recreation Package": {
		"Effect Qty?": true,
		"presence": 1,
		"Cost Mod": 1,
	},
	"Sickbay": {
		"Effect Qty?": true,
		"science": 1/2,
		"presence": 1,
		"Cost Mod": 1,
	},
	
	"Hull System": {
		"Effect Qty?": true,
		"hull": 1,
		"Cost Mod": 1,
		"Scale Wt?": 1,
	},
	
	"Structural Integrity Fields": {
		"Effect Qty?": true,
		"hull": 1,
		"Cost Mod": 1,
	},
	"Navigational Deflector": {
		"Effect Qty?": false,
		"science": 1/3,
		"shields": 1/7,
		"defense": 1,
		"Cost Mod": 1,
	},
	"Nacelle System": {
		"Effect Qty?": true,
		"defense": 1,
		"Cost Mod": 1,
	},
	"Replication Package": {
		"Effect Qty?": true,
		"science": 1/10,
		"presence": 1/4,
		"defense": 1,
		"Cost Mod": 1,
	},
	"Fuel & Matter Stores": {
		"Effect Qty?": false,
		"defense": 1,
		"Cost Mod": 1,
	},
	
	"Warp Core Type": {
		"Effect Qty?": true,
		"Cost Mod": 1,
	},
	"M/AM Injectors": {
		"Effect Qty?": true,
		"Cost Mod": 1,
	},
	"Coolant Systems": {
		"Effect Qty?": true,
		"Cost Mod": 1,
	},
	"EPS Manifold System": {
		"Effect Qty?": false,
		"Cost Mod": 1,
	},
	"Eject System": {
		"Effect Qty?": false,
		"Cost Mod": 1,
	},
};

class Statline {
	static get stats() {
		return [
			'combat',
			'science',
			'hull',
			'shields',
			'presence',
			'defense',
		];
	}

	constructor(val) {
		if ((typeof val) === 'number') {
			Statline.stats.forEach((stat) => {
				this[stat] = val;
			});
		} else {
			Statline.stats.forEach((stat) => {
				this[stat] = val[stat] || 0;
			});
		}
	};

	toString() {
		return '[' + Statline.stats.map((stat) => {
			return STAT_SHORTNAMES[stat].toUpperCase() + this[stat].toString();
		}).join(' ') + ']'
	};

	static op_add(a, b) {
		return a + b;
	};
	static op_mult(a, b) {
		return a * b;
	};

	add(other) {
		return this.op(Statline.op_add, other);
	}
	mult(other) {
		return this.op(Statline.op_mult, other);
	}
	get floor() {
		return new Statline(
			Statline.stats.reduce((acc, stat) => {
				acc[stat] = Math.floor(this[stat]);
				return acc;
			}, {})
		);
	}

	op(fun, other) {
		if ((typeof other) === 'number') {
			return new Statline(
				Statline.stats.reduce((acc, stat) => {
					acc[stat] = fun(this[stat], other);
					return acc;
				}, {})
			);
		} else {
			return new Statline(
				Statline.stats.reduce((acc, stat) => {
					acc[stat] = fun(this[stat], other[stat]);
					return acc;
				}, {})
			);
		};
	};
};

class DesignComponent {
	constructor(db, subsystem, design_component_json) {
		this.db = db;
		this.name = design_component_json['Name'];

		// parent
		this.subsystem = subsystem;

		// CY block
		// statline
		this.component_modifier = COMPONENT_MODIFIERS[this.name];

		// BK column
		// scalar
		this.quantity = design_component_json['Quantity'];

		// BL block
		// statline
		this.part_def = this.db.find_part(design_component_json['Part']);
	};

	// CM column
	get cost_SR() {
		// =CK31 * DO31 * CM$29
		// CM29 is subsystem frame 'SR Cost x'
		// CK31 is weight
		// DO31 is SR Cost x off the part list
		return (this.weight_internal + this.weight_external) * this.cost_SR_mult * this.subsystem.cost_SR_mult;
	};

	// DO31
	get cost_SR_mult() {
		// SR Cost x off the part list
		return this.part_def['SR Cost x'];
	};

	// CL column
	get cost_BR() {
		// total weight divided by br to weight mult
		return (this.weight_internal + this.weight_external) / BR_TO_WEIGHT_MULTIPLIER;
	};

	// CK column
	// scalar
	get weight_internal() {
		// =(DL31 + IF(DF31,DM31*BK$26,DN31)*BK31) * DE31 * DG31
		// DL31 is "Weight O/H", weight overhead, off parts list
		// DF31 is "Scale Wt?" component configuration
		// DM31 is "Scale Weight" off parts list
		// BK$26 is frame size?, BK18+BK25
		// DN31 is "Unit Weight" off parts list
		// BK31 is part quantity
		// DE31 is "Wt Custom" component configuration
		// DG31 is "Cost Mod" component configuration
		switch (this.name) {
		case 'Nacelle System':
			// "Nacelle Distribution" line in spreadsheet
			return this.weight_overhead_raw * this.weight_custom * this.cost_mod;
		default:
			return this.weight_raw * this.weight_custom * this.cost_mod;
		};
	};

	// CK column
	// scalar
	get weight_external() {
		// =(DL31 + IF(DF31,DM31*BK$26,DN31)*BK31) * DE31 * DG31
		// DL31 is "Weight O/H", weight overhead, off parts list
		// DF31 is "Scale Wt?" component configuration
		// DM31 is "Scale Weight" off parts list
		// BK$26 is frame size?, BK18+BK25
		// DN31 is "Unit Weight" off parts list
		// BK31 is part quantity
		// DE31 is "Wt Custom" component configuration
		// DG31 is "Cost Mod" component configuration
		switch (this.name) {
		case 'Nacelle System':
			// "Nacelle System" line in spreadsheet
			// DN70 * BK70 * DE70 * DG70
			return this.weight_unit_raw * this.quantity * this.weight_custom * this.cost_mod;
		default:
			return 0;
		};
	};

	// (DL31 + IF(DF31,DM31*BK$26,DN31)*BK31)
	// scalar
	//
	// the weight of the component before component and size modifiers
	// are applied
	get weight_raw() {
		return this.weight_overhead_raw + (this.weight_per_unit * this.quantity);
	}

	get cost_mod() {
		return this.component_modifier['Cost Mod'] || 1;
	};

	// IF(DF31,
	// DM31*BK$26,
	// DN31)
	get weight_per_unit() {
		if (this.component_modifier['Scale Wt?']) {
			return this.weight_scale_raw * this.subsystem.design.size;
		} else {
			return this.weight_unit_raw;
		};
	}

	// DL31
	get weight_overhead_raw() {
		return this.part_def['Weight O/H'];
	};

	// DM31
	get weight_scale_raw() {
		return this.part_def['Scale Weight'];
	};

	// DN31
	get weight_unit_raw() {
		return this.part_def['Unit Weight'];
	};

	// DK column
	// scalar
	get raw_effect() {
		return this.part_def['Effect'];
	};

	// CE block
	// statline
	get stats() {
		// CD column * CY block * CE$29 row
		//
		// effect for this part * frame effect multiplier * the
		// component's statline modifier
		return new Statline(this.component_modifier).mult(this.effect * this.subsystem.stats_multiplier);
	};

	// CD column
	// scalar
	get effect() {
		// =DK31 * IF(CX31,1+3.5*log10(0.7*BK31+0.3),1) * CW31
		//
		// raw effect from parts list * quantity multiplier * custom effect
		return this.raw_effect * this.effect_custom * this.qty_mult;
	};

	// IF(CX31,
	// 1 + 3.5 * log10(0.7 * BK31 + 0.3)
	// ,1)
	//
	// scalar
	get qty_mult() {
		if (this.uses_effect_qty) {
			return 1 + (3.5 * Math.log((0.7 * this.quantity) + 0.3) / Math.log(10));
		} else {
			return 1;
		};
	};

	// boolean
	get uses_effect_qty() {
		return this.component_modifier['Effect Qty?'];
	};

	// DE column
	// scalar
	//
	// Additional custom multiplier on weight (and thus also BR/SR) -
	// can be formula as long as it doesn't reference any cell on this
	// row
	get weight_custom() {
		if (this.name === 'Primary Phasers') {
			return this.setting_phaser_array_weight_multiplier;
		}
		if (this.name === 'Secondary Phasers') {
			return this.setting_phaser_array_weight_multiplier;
		}
		if (this.name === 'Torpedo System') {
			return this.setting_burst_launcher_weight_multiplier;
		}
		return 1;
	};

	// CW column
	//
	// scalar
	// 
	// comment on sheet: Additional custom multiplier on effect - can
	// be formula as long as it doesn't reference any cell on this row
	get effect_custom () {
		if (this.name === 'Primary Phasers') {
			// =(1-(BK$26/100)) * IF($D$33,2,1)
			// BK$26 = BK18 + BK25
			// BK18 is design size

			// $D$33 is "phaser arrays Y/N"

			// AL6 is size to weight multiplier

			// return (0.97 / 2) * ;

			return this.phaser_size_mult * this.setting_phaser_array_combat_multiplier;
		}
		if (this.name === 'Secondary Phasers') {
			return this.phaser_size_mult * this.setting_phaser_array_combat_multiplier;
		}
		if (this.name === 'Torpedo System') {
			// =IF($D$35, 1.5, 1)
			// $D$35 is burst launchers Y/N
			return this.setting_burst_launcher_combat_multiplier;
		}
		// if nothing else, no change
		return 1;
	};

	get phaser_size_mult() {
		return 1 - (this.subsystem.design.size / 100.0);
	};

	get setting_phaser_array_weight_multiplier() {
		if (this.subsystem.settings['Phaser Arrays']) {
			return 1.5;
		} else {
			return 1.0;
		};
	};
	
	get setting_phaser_array_combat_multiplier() {
		if (this.subsystem.settings['Phaser Arrays']) {
			return 2.0;
		} else {
			return 1.0;
		};
	};

	get setting_burst_launcher_combat_multiplier() {
		if (this.subsystem.settings['Burst Launchers']) {
			return 1.5;
		} else {
			return 1.0;
		};
	};

	get setting_burst_launcher_weight_multiplier() {
		if (this.subsystem.settings['Burst Launchers']) {
			return 1.5;
		} else {
			return 1.0;
		};
	};
};

class DesignSubsystem {
	constructor(db, design, design_subsystem_json) {
		this.db = db;
		this.name = design_subsystem_json['Name'];
		this.design = design;
		this.settings = design_subsystem_json['Settings'];
		this.sub_frame_def = this.db.find_frame(design_subsystem_json['Sub-Frame']);
		this.components = design_subsystem_json['Components'].map(
			(comp_json) => new DesignComponent(this.db, this, comp_json)
		);
	};

	// CM column, 29 etc
	get cost_SR_mult() {
		// =CM18 * DU29
		// CM18 is principal frame SR cost
		// DU29 is 'SR-Mod' straight off part list
		return this.cost_SR_mult_raw * this.design.cost_SR_frame_mult;
	};

	get cost_SR_mult_raw() {
		return this.sub_frame_def['SR-Mod'];
	};

	// CM column, 20:24, 41 etc
	get cost_SR() {
		// straight sum of component costs
		return this
			.components
			.map((comp) => comp.cost_SR)
			.reduce((sum, value) => sum + value, 0);
	};

	// sum of component costs plus the frame cost
	get cost_BR() {
		return this.cost_BR_components + this.cost_BR_frame;
	};

	// CL column
	// CK column / br to weight mult
	get cost_BR_frame() {
		return this.weight_frame / BR_TO_WEIGHT_MULTIPLIER;
	};

	get cost_BR_components() {
		return this
			.components
			.map((comp) => comp.cost_BR)
			.reduce((sum, value) => sum + value, 0);
	};

	// CK20:CK25 column, [CK41, CK57, CK63, ...]
	// scalar
	get weight_external() {
		// =SUM(CK31:CK40)+CK29
		return this.weight_components_external;
	};

	// CK20:CK25 column, [CK41, CK57, CK63, ...]
	// scalar
	get weight_internal() {
		// =SUM(CK31:CK40)+CK29
		return this.weight_frame + this.weight_components_internal;
	};

	// CK29, DM29 if populated, DM29 is weight straight off frames list
	// scalar
	get weight_frame() {
		return this.sub_frame_def['Wt'] || 0;
	};

	// =SUM(CK31:CK40)
	// scalar
	get weight_components_external() {
		return this
			.components
			.map((comp) => comp.weight_external)
			.reduce((sum, value) => sum + value, 0);
	};

	// =SUM(CK31:CK40)
	// scalar
	get weight_components_internal() {
		return this
			.components
			.map((comp) => comp.weight_internal)
			.reduce((sum, value) => sum + value, 0);
	};

	// get weight_multiplier() {
	// 	return this.sub_frame_def[''] || 0;
	// };
	
	// [CE41 row;CE57 row;CE63 row] block
	get stats() {
		return this
			.components
			.map((comp) => comp.stats)
			.reduce((sum, value) => sum.add(value), new Statline({}));
	};

	// CE29, CD29, DO29
	get stats_multiplier() {
		// =IF(BI29="",0,DGET('[C8] Frames'!$A:$R,DO$28,{"Type","Name";"="&$AJ29,"="&BI29}))
		// BI29 is frame name
		// if no frame, then 0
		// if frame, then look up "tac mod" field in frames list
		if (this.sub_frame_def) {
			return this.sub_frame_def[SUBSYSTEM_NAME_MAP[this.name]];
		} else {
			return 0;
		};
	};
};

class Module {
	constructor(db, design, design_module_json) {
		this.db = db;
		this.design = design;
		this.module_def = this.db.find_module(design_module_json['Type'], design_module_json['Variant']);
	};

	// CM25, CM88, DO88
	// straight off parts list
	get cost_SR() {
		return this.module_def['SR Cost']
	};

	// CL25, CL88
	get cost_BR() {
		// CK88 / AL7
		// CK88 is weight
		// AL7 is the br to weight constant
		return this.weight_total / BR_TO_WEIGHT_MULTIPLIER;
	};

	// CE88 row, CY88 row
	// statline
	get stats() {
		// pulled straight out of module definition
		const map = [['combat','C'],
					 ['science','S'],
					 ['hull','H'],
					 ['shields','L'],
					 ['presence','P'],
					 ['defense','D']];
		let stat_block = map.reduce((res, [longname, shortname]) => { res[longname] = this.module_def[shortname]; return res; }, {});
		return new Statline(stat_block);
	};

	// CK25, CK88, DM88
	// scalar
	// "Weight" value off module definition
	get weight_total() {
		return this.weight_internal + this.weight_external;
	};

	get weight_internal() {
		return 0;
	};

	get weight_external() {
		return this.module_def['Weight'];
	};

	// BK25, BK88
	// scalar
	get size() {
		// BK25 = rollbar size?, BK88
		// BK88 = rollbar size? = $CV88 / $AL$6
		return this.size_raw / SIZE_TO_WEIGHT_CAP_MULTIPLIER;
	};

	// CV88, DL88
	// scalar
	get size_raw() {
		// $CV88 = DL88 = module weight cap? = module weight cap from "Weight Cap" element of module
		return this.module_def['Weight Cap'];
	};
};


class Design {
	constructor(db, design_json) {
		this.db = db;
		this.name = design_json['Name'];
		this.princ_frame_def = this.db.find_frame(design_json['Principal Frame']);
		this.subsystems = design_json['Subsystems'].map(
			(ss_json) => new DesignSubsystem(this.db, this, ss_json)
		);
		this.module = new Module(db, this, design_json['Module']);
	};
	
	// CE27 row
	get stats() {
		return this.stats_raw.floor
	};

	// BL26, CE26 row
	get stats_raw() {
		return this.stats_components + this.stats_module;
	};

	get stats_components() {
		return this
			.subsystems
			.map((ss) => ss.stats)
			.reduce((sum, value) => sum.add(value), new Statline({}));
	};

	get stats_module() {
		return this.module.stats;
	};

	// O3, CK27
	// scalar
	get weight_total() {
		return Math.floor(this.weight_raw_total);
	};

	// O2, CK26
	// scalar
	get weight_external() {
		// =SUM(CK20:CK25)+CK$18
		return this.weight_subsystems_external + this.module.weight_external;
	};

	// O2, CK26
	// scalar
	get weight_internal() {
		// =SUM(CK20:CK25)+CK$18
		return this.weight_frame + this.weight_subsystems_internal + this.module.weight_internal;
	};

	// O2, CK26
	// scalar
	get weight_raw_total() {
		// =SUM(CK20:CK25)+CK$18
		return this.weight_external + this.weight_internal;
	};

	// CK26
	get weight_subsystems_internal() {
		// =SUM(CK20:CK25)
		// CK20:24 is subsystem weights
		// CK25 is module weight
		return this.subsystems
			.map((ss) => ss.weight_internal)
			.reduce((sum, value) => sum + value, 0);
	};

	// CK26
	get weight_subsystems_external() {
		// =SUM(CK20:CK25)
		// CK20:24 is subsystem weights
		// CK25 is module weight
		return this.subsystems
			.map((ss) => ss.weight_external)
			.reduce((sum, value) => sum + value, 0);
	};

	// CK$18, DM18
	// part frame weight
	get weight_frame() {
		return this.princ_frame_def['Wt'];
	};

	// P3, CL27
	get cost_BR() {
		// =CEILING(CL26,INDEX($AL$6:$AL$16,MATCH("BR Cost Round - "&$CD$9,$AJ$6:$AJ$16,0)))
		// ceiling(CL16, cost_BR_round)
		// round raw BR cost to next integer multiple of the rounding interval
		return Math.ceil(this.cost_BR_raw / this.cost_BR_round) * this.cost_BR_round;
	};

	get cost_BR_round() {
		// selects the appropriate interval to round BR to based on the class of the ship
		// INDEX($AL$6:$AL$16,MATCH("BR Cost Round - "&$CD$9,$AJ$6:$AJ$16,0))
		//
		// from the list of constants in AL, select the one in the row
		// that has concat("BR cost round", CD9) in AJ
		//
		// CD9 is weight class
		return BR_COST_ROUND_MAP[this.weight_class];
	};

	// CD9
	get weight_class() {
		// =IF(DK$18 = 1, "Frigate", IF(DK$18 = 2, "Cruiser", "Explorer"))
		return WEIGHT_CLASS_MAP[this.weight_class_raw];
	};

	// DK18
	get weight_class_raw() {
		// "Weight Class" value off of principal frame definition
		// integer in [1, 3]
		return this.princ_frame_def['Weight Class'];
	};

	// P2, CL26
	get cost_BR_raw() {
		// sum(subsystem BR costs) + module cost + frame cost
		return this.cost_BR_components + this.module.cost_BR + this.cost_BR_frame;
	};

	get cost_BR_components() {
		return this.subsystems
			.map((ss) => ss.cost_BR)
			.reduce((sum, value) => sum + value, 0);
	};

	// CL18
	// scalar
	get cost_BR_frame() {
		// CK18 / $AL$7
		// CK18 = DM18
		// DM18 is frame "Wt" value
		return this.weight_frame / BR_TO_WEIGHT_MULTIPLIER;
	};

	// CM18, DU18
	get cost_SR_frame_mult() {
		return this.princ_frame_def['SR-Mod'];
	};

	// Q2, CM27
	get cost_SR() {
		// =CEILING(CL26,INDEX($AL$6:$AL$16,MATCH("BR Cost Round - "&$CD$9,$AJ$6:$AJ$16,0)))
		// ceiling(CL16, cost_BR_round)
		// round raw BR cost to next integer multiple of the rounding interval
		return Math.ceil(this.cost_SR_raw / this.cost_SR_round) * this.cost_SR_round;
	};

	// Q3, CM26
	get cost_SR_raw() {
		// sum of subsystems plus module
		return this.cost_SR_subsystems + this.module.cost_SR;
	};

	get cost_SR_subsystems() {
		return this.subsystems
			.map((ss) => ss.cost_SR)
			.reduce((sum, value) => sum + value, 0);
	};

	get cost_SR_round() {
		// same as BR, basically
		return BR_COST_ROUND_MAP[this.weight_class];
	};

	// R2, CN27
	get cost_power() {
		return Math.floor(this.cost_power_raw());
	};

	// R3, CN26
	get cost_power_raw() {

	};

	// BK26
	get size() {
		// BK18 + BK88
		return this.frame_size + this.module.size;
	};

	// BK18, "Size"
	get frame_size() {
		// BK18 = $CV18 / $AL$6
		// $CV18 = weight cap, DL18, equal principal frame MaxSz
		// $AL$6 = "Size-To-Weight-Cap Multiplier", constant 300
		return this.frame_max_size_raw / SIZE_TO_WEIGHT_CAP_MULTIPLIER;
	};

	get frame_max_size_raw() {
		return this.princ_frame_def['MaxSz'];
	};
};

class DB {
	constructor({parts, frames, modules}) {
		this.parts = parts;
		this.frames = frames;
		this.modules = modules;
	};

	find_module(type, variant) {
		return this.modules.data.find(
			(elem) => (
				(elem['Type'].trim() === type.trim()) &&
					(elem['Variant'] === variant.trim()))
		);
	};

	find_part(name) {
		return this.parts.data.find((elem) => (elem['Name'].trim() === name.trim()));
	};

	find_frame(name) {
		return this.frames.data.find((elem) => (elem['Name'].trim() === name.trim()));
	};
};

module.exports.Design = Design;
module.exports.DB = DB;
module.exports.Statline = Statline;



// CK71, "nacelle distribution", only has weight, SR+BR cost, and power cost.
// CK71== DL70 * DE70 * DG70
// DL70 is "Weight O/H" straight off hte parts list
// DE70 is Wt Custom
// DG70 is Cost Mod from component modifiers

