// AL6, $AL$6
const SIZE_TO_WEIGHT_CAP_MULTIPLIER = 300

const BR_TO_WEIGHT_MULTIPLIER = 10

const BR_COST_ROUND_FRIGATE = 5
const BR_COST_ROUND_CRUISER = 10
const BR_COST_ROUND_EXPLORER = 10

const SR_COST_ROUND_FRIGATE = 5
const SR_COST_ROUND_CRUISER = 5
const SR_COST_ROUND_EXPLORER = 10

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

	// CK column
	// scalar
	get weight() {
		// =(DL31 + IF(DF31,DM31*BK$26,DN31)*BK31) * DE31 * DG31
		// DL31 is "Weight O/H", weight overhead, off parts list
		// DF31 is "Scale Wt?" component configuration
		// DM31 is "Scale Weight" off parts list
		// BK$26 is frame size?, BK18+BK25
		// DN31 is "Unit Weight" off parts list
		// BK31 is part quantity
		// DE31 is "Wt Custom" component configuration
		// DG31 is "Cost Mod" component configuration
		return this.weight_raw * this.weight_custom * this.cost_mod;
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

	// CK20:CK25 column, [CK41, CK57, CK63, ...]
	// scalar
	get weight() {
		// =SUM(CK31:CK40)+CK29
		return this.weight_frame + this.weight_components;
	};

	// CK29, DM29 if populated, DM29 is weight straight off frames list
	// scalar
	get weight_frame() {
		return this.sub_frame_def['Wt'] || 0;
	};

	// =SUM(CK31:CK40)
	// scalar
	get weight_components() {
		return this
			.components
			.map((comp) => comp.weight)
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
	get weight() {
		return Math.ceil(this.weight_raw);
	};

	// O2, CK26
	// scalar
	get weight_raw() {
		// =SUM(CK20:CK25)+CK$18
		return this.weight_frame + this.weight_subsystems
	};

	// CK26
	get weight_subsystems() {
		// =SUM(CK20:CK25)
		// CK20:25 is subsystem weights
		return this.subsystems
			.map((ss) => ss.weight)
			.reduce((sum, value) => sum + value, 0);
	};

	// CK$18, DM18
	// part frame weight
	get weight_frame() {
		return this.princ_frame_def['Wt'];
	};

	// P3, CL27
	get cost_BR() {
		return Math.floor(this.cost_BR_raw());
	};

	// P2, CL26
	get cost_BR_raw() {

	};

	// Q2, CM27
	get cost_SR() {
		return Math.floor(this.cost_SR_raw());
	};

	// Q3, CM26
	get cost_SR_raw() {

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
