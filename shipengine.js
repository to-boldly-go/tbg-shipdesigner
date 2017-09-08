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
	},
	"Secondary Phasers": {
		"Effect Qty?": true,
		"combat": 1/4,
	},
	"Torpedo System": {
		"Effect Qty?": true,
		"combat": 1,
	},
	"Short-Range Sensors": {
		"Effect Qty?": true,
		"combat": 1/2,
		"science": 1/2,
	},
	"Targeting Computer": {
		"Effect Qty?": true,
		"combat": 1,
	},
	"Deflector Shields": {
		"Effect Qty?": true,
		"shields": 1,
	},
	"Backup Deflectors": {
		"Effect Qty?": true,
		"shields": 1/5,
	},
	"Impulse Engine Pwr": {
		"Effect Qty?": true,
		"combat": 1/4,
		"defense": 4/5,
	},

	"Long-Range Sensors": {
		"Effect Qty?": true,
		"science": 1,
	},
	"Navigational Sensors": {
		"Effect Qty?": true,
		"science": 1,
		"defense": 1/6,
	},
	"Survey Sensors": {
		"Effect Qty?": true,
		"science": 1,
	},
	"Science Labs": {
		"Effect Qty?": true,
		"science": 1,
	},
	"Computer Core": {
		"Effect Qty?": true,
		"combat": 1/4,
		"science": 1/4,
		"hull": 1/10,
		"shields": 1/7,
		"presence": 1/6,
		"defense": 1/8,
	},
	"Operating System": {
		"Effect Qty?": true,
		"combat": 1/8,
		"science": 1/8,
		"shields": 1/14,
		"defense": 1/10,
	},
	"Secondary Core": {
		"Effect Qty?": true,
		"combat": 1/16,
		"science": 1/16,
		"shields": 1/28,
		"defense": 1/40,
	},
	"Diplomatic Package": {
		"Effect Qty?": true,
		"presence": 1,
	},
	"Recreation Package": {
		"Effect Qty?": true,
		"presence": 1,
	},
	"Sickbay": {
		"Effect Qty?": true,
		"science": 1/2,
		"presence": 1,
	},
	
	"Hull System": {
		"Effect Qty?": true,
		"hull": 1,
	},
	
	"Structural Integrity Fields": {
		"Effect Qty?": true,
		"hull": 1,
	},
	"Navigational Deflector": {
		"Effect Qty?": false,
		"science": 1/3,
		"shields": 1/7,
		"defense": 1,
	},
	"Nacelle System": {
		"Effect Qty?": true,
		"defense": 1,
	},
	"Replication Package": {
		"Effect Qty?": true,
		"science": 1/10,
		"presence": 1/4,
		"defense": 1,
	},
	"Fuel & Matter Stores": {
		"Effect Qty?": false,
		"defense": 1,
	},
	
	"Warp Core Type": {
		"Effect Qty?": true,
	},
	"Safety/Performance": {
		"Effect Qty?": false,
	},
	"M/AM Injectors": {
		"Effect Qty?": true,
	},
	"Coolant Systems": {
		"Effect Qty?": true,
	},
	"EPS Manifold System": {
		"Effect Qty?": false,
	},
	"Eject System": {
		"Effect Qty?": false,
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
		return new Statline(this.component_modifier).mult(this.effect * this.subsystem.multiplier);
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
			// BK18 = $CV18 / $AL$6
			// $CV18 = weight cap, DL18, equal principal frame MaxSz
			// $AL$6 = "Size-To-Weight-Cap Multiplier", constant 300
			// BK25 = rollbar size?, BK88
			// BK88 = rollbar size? = $CV88 / $AL$6
			// $CV88 = DL88 = module weight cap? = module weight cap from "Weight Cap" element of module
			// $D$33 is "phaser arrays Y/N"
			// return (0.97 / 2) * this.setting_phaser_array_combat_multiplier;
			return 0.97;
		}
		if (this.name === 'Secondary Phasers') {
			// return (0.97 / 2) * this.setting_phaser_array_combat_multiplier;
			return 0.97;
		}
		if (this.name === 'Torpedo System') {
			// =IF($D$35, 1.5, 1)
			// $D$35 is burst launchers Y/N
			return this.setting_burst_launcher_combat_multiplier;
		}
		// if nothing else, no change
		return 1;
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
	
	// [CE41 row;CE57 row;CE63 row] block
	get stats() {
		return this
			.components
			.map((comp) => comp.stats)
			.reduce((sum, value) => sum.add(value), new Statline({}));
	};

	// CE29, CD29, DO29
	get multiplier() {
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
		return this.raw_stats.floor
	};

	// BL26, CE26 row
	get raw_stats() {
		return this
			.subsystems
			.map((ss) => ss.stats)
			.reduce((sum, value) => sum.add(value), new Statline({}));
	};
};

class DB {
	constructor({parts, frames}) {
		this.parts = parts;
		this.frames = frames;
	};

	find_part(name) {
		let result = this.parts.data.find((elem) => (elem['Name'].trim() === name.trim()));
		return result;
	};

	find_frame(name) {
		return this.frames.data.find((elem) => (elem['Name'].trim() === name.trim()));
	};
};

module.exports.Design = Design;
module.exports.DB = DB;
module.exports.Statline = Statline;
