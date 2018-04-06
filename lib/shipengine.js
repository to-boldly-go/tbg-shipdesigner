import { from_frac } from '../src/ui-functions.js';
import { NamedVector } from './namedvector.js';
import _ from 'lodash';

// AL6, $AL$6
const SIZE_TO_WEIGHT_CAP_MULTIPLIER = 300

// AL7
const BR_TO_WEIGHT_MULTIPLIER = 10

const SUBSYSTEM_SORT_ORDER = {
	"Tactical": 1,
	"Operations": 2,
	"Hull": 3,
	"Engineering": 4,
	"Warp Core": 5,
};

const SR_COST_ROUND_MAP = {
	'Frigate': 5,
	'Cruiser': 10,
	'Explorer': 10,
};

const BR_COST_ROUND_MAP = {
	'Frigate': 5,
	'Cruiser': 10,
	'Explorer': 10,
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

// REFACTOR: change the names of these to be less abbreviated
// (effectiveness instead of effect, for example)
let COMPONENT_MODIFIERS = {
	"Primary Phasers": {
		"Effect Qty?": true,
		"combat": 1,
		"Cost Mod": 1,
		"Crew Mod": 1,
	},
	"Secondary Phasers": {
		"Effect Qty?": true,
		"combat": 1/4,
		"Cost Mod": 1/4,
		"Crew Mod": 1/4,
	},
	"Torpedo System": {
		"Effect Qty?": true,
		"combat": 1,
		"Cost Mod": 1,
		"Crew Mod": 1,
	},
	"Short-Range Sensors": {
		"Effect Qty?": true,
		"combat": 1/2,
		"science": 1/2,
		"Cost Mod": 1,
		"Crew Mod": 1,
	},
	"Targeting Computer": {
		"Effect Qty?": true,
		"combat": 1,
		"Cost Mod": 1,
		"Crew Mod": 1,
	},
	"Deflector Shields": {
		"Effect Qty?": true,
		"shields": 1,
		"Cost Mod": 1,
		"Crew Mod": 1,
	},
	"Backup Deflectors": {
		"Effect Qty?": true,
		"shields": 1/5,
		"Cost Mod": 1/5,
		"Crew Mod": 1/5,
	},
	"Impulse Engine Pwr": {
		"Effect Qty?": true,
		"combat": 1/4,
		"defense": 4/5,
		"Cost Mod": 1,
		"Crew Mod": 1,
	},

	"Long-Range Sensors": {
		"Effect Qty?": true,
		"science": 1,
		"Cost Mod": 1,
		"Crew Mod": 1,
	},
	"Navigational Sensors": {
		"Effect Qty?": true,
		"science": 1,
		"defense": 1/6,
		"Cost Mod": 1,
		"Crew Mod": 1,
	},
	"Survey Sensors": {
		"Effect Qty?": true,
		"science": 1,
		"Cost Mod": 1,
		"Crew Mod": 1,
	},
	"Science Labs": {
		"Effect Qty?": true,
		"science": 1,
		"Cost Mod": 1,
		"Crew Mod": 1,
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
		"Crew Mod": 1,
	},
	"Operating System": {
		"Effect Qty?": true,
		"combat": 1/8,
		"science": 1/8,
		"shields": 1/14,
		"defense": 1/10,
		"Cost Mod": 1,
		"Crew Mod": 1,
	},
	"Secondary Core": {
		"Effect Qty?": true,
		"combat": 1/16,
		"science": 1/16,
		"shields": 1/28,
		"defense": 1/40,
		"Cost Mod": 1/2,
		"Crew Mod": 1/4,
	},
	"Diplomatic Package": {
		"Effect Qty?": true,
		"presence": 1,
		"Cost Mod": 1,
		"Crew Mod": 1,
	},
	"Recreation Package": {
		"Effect Qty?": true,
		"presence": 1,
		"Cost Mod": 1,
		"Crew Mod": 1,
	},
	"Sickbay": {
		"Effect Qty?": true,
		"science": 1/2,
		"presence": 1,
		"Cost Mod": 1,
		"Crew Mod": 1,
	},
	
	"Hull System": {
		"Effect Qty?": true,
		"hull": 1,
		"Cost Mod": 1,
		"Scale Wt?": 1,
		"Crew Mod": 1,
	},
	
	"Structural Integrity Fields": {
		"Effect Qty?": true,
		"hull": 1,
		"Cost Mod": 1,
		"Crew Mod": 1,
	},
	"Navigational Deflector": {
		"Effect Qty?": false,
		"science": 1/3,
		"shields": 1/7,
		"defense": 1,
		"Cost Mod": 1,
		"Crew Mod": 1,
	},
	"Nacelle System": {
		"Effect Qty?": true,
		"defense": 1,
		"Cost Mod": 1,
		"Crew Mod": 1,
	},
	"Replication Package": {
		"Effect Qty?": true,
		"science": 1/10,
		"presence": 1/4,
		"defense": 1,
		"Cost Mod": 1,
		"Crew Mod": 1,
	},
	"Fuel & Matter Stores": {
		"Effect Qty?": false,
		"defense": 1,
		"Cost Mod": 1,
		"Crew Mod": 1,
	},
	
	"Warp Core Type": {
		"Effect Qty?": true,
		"Cost Mod": 1,
		"Crew Mod": 1,
	},
	"M/AM Injectors": {
		"Effect Qty?": true,
		"Cost Mod": 1,
		"Crew Mod": 1,
	},
	"Coolant Systems": {
		"Effect Qty?": true,
		"Cost Mod": 1,
		"Crew Mod": 1,
	},
	"EPS Manifold System": {
		"Effect Qty?": false,
		"Cost Mod": 1,
		"Crew Mod": 1,
	},
	"Eject System": {
		"Effect Qty?": false,
		"Cost Mod": 1,
		"Crew Mod": 1,
	},
};

// AI, AJ, AK block
// GL column onward
const COMPONENT_PART_CLASSIFICATIONS = {
	"Primary Phasers": "Phasers",
	"Secondary Phasers": "Phasers",
	"Torpedo System": "Torpedoes",
	"Short-Range Sensors": "Short-Range Sensors",
	"Targeting Computer": "Targeting Computers",
	"Deflector Shields": "Deflector Shields",
	"Backup Deflectors": "Deflector Shields",
	"Impulse Engine Pwr": "Impulse Engine Power",
	"Long-Range Sensors": "Long-Range Sensors",
	"Navigational Sensors": "Navigational Sensors",
	"Survey Sensors": "Survey Sensors",
	"Science Labs": "Science Labs",
	"Computer Core": "Computer Cores",
	"Operating System": "Operating System",
	"Secondary Core": "Computer Cores",
	"Diplomatic Package": "Diplomatic Packages",
	"Recreation Package": "Recreation Packages",
	"Sickbay": "Sickbays",
	"Hull System": "Hull System",
	"Structural Integrity Fields": "Structural Integrity Fields",
	"Navigational Deflector": "Navigational Deflectors",
	"Nacelle System": "Nacelles",
	"Replication Package": "Replication Packages",
	"Fuel & Matter Stores": "Fuel & Matter Stores",
	"Warp Core Type": "Warp Core Types",
	"M/AM Injectors": "Matter/Anti-Matter Injectors",
	"Coolant Systems": "Coolant Systems",
	"EPS Manifold System": "EPS Manifold System",
	"Eject System": "Eject System",
};

class Crewline extends NamedVector {
	static get shortnames() {
		return {
			'officer': 'O',
			'enlisted': 'E',
			'technician': 'T',
		};
	};
	constructor(val) {
		super(val, Crewline.shortnames);
	};
};

class Statline extends NamedVector {
	static get shortnames() {
		return {
			'combat': 'C',
			'science': 'S',
			'hull': 'H',
			'shields': 'L',
			'presence': 'P',
			'defense': 'D',
		};
	};
	constructor(val) {
		super(val, Statline.shortnames);
	};
};

class DesignComponent {
	constructor(db, subsystem, design_component_json) {
		this.json = design_component_json;

		this.db = db;
		this.name = this.json['Name'];

		// parent
		this.subsystem = subsystem;

		// CY block
		// statline
		this.component_modifier = COMPONENT_MODIFIERS[this.name];

		// BL block
		// statline
		this.part_def = this.db.find_part(this.json['Part']);
		if (!this.part_def) {
			console.log("WARNING: Could not find '" + this.name + "' part named '" + this.json['Part'] + "'");
		}
	};

	get is_loaded() {
		return !!this.part_def;
	}

	get tech_year() {
		return this.part_def['Year Available (SF)'];
	};

	get part() {
		return this.json['Part'];
		if (this.is_no_part) {
			this.quantity_calcs.set(0);
		};
	};

	set part(value) {
		this.json['Part'] = value;
		if (this.is_no_part) {
			this.quantity_calcs.set(parseInt(0));
		};
	};

	get is_no_part() {
		return this.json['Part'].match(/No .+/) !== null;
	};

	// BK column
	// scalar
	get quantity() {
		return this.quantity_calcs.get();
	};

	set quantity(value) {
		if (this.is_quantity_configurable) {
			this.quantity_calcs.set(parseInt(value));
			if (value === 0) {
				const no_part = this.valid_parts.find((part) => part['Name'].match(/No .+/) !== null);
				if (no_part) {
					this.json['Part'] = no_part['Name'];
				};
			};
		};
	};

	get is_quantity_configurable() {
		return this.quantity_calcs.is_configurable() && !this.is_no_part;
	};

	get valid_quantities() {
		if (this.is_quantity_configurable) {
			return this.quantity_calcs.options();
		} else {
			return [];
		};
	};

	get quantity_calcs() {
		switch (this.name) {
		case 'Computer Core':
		case 'Operating System':
		case 'Navigational Deflector':
		case 'Fuel & Matter Stores':
		case 'EPS Manifold System':
			return {
				is_configurable: () => false,
				get: () => {
					return this.subsystem.design.size_round;
				},
			};
			break;
		case 'M/AM Injectors':
		case 'Coolant Systems':
			return {
				is_configurable: () => false,
				get: () => {
					let warp_core_type = this.subsystem.component('Warp Core Type');
					if (!warp_core_type || !warp_core_type.is_loaded) {
						return 0;
					}
					return warp_core_type.quantity;
				},
			};
			break;
		case 'Targeting Computer':
		case 'Nacelle System':
		case 'Eject System':
			return {
				is_configurable: () => false,
				get: () => {
					if (this.is_no_part) {
						return 0;
					} else {
						return 1;
					};
				},
			};
			break;
		default:
			return {
				is_configurable: () => true,
				get: () => {
					return this.json['Quantity'];
				},
				set: (value) => {
					this.json['Quantity'] = value;
				},
				options: () => {
					switch (this.name) {
					case 'Replication Package':
						return [...Array(this.subsystem.design.size_round + 1).keys()];
						break;
					case 'Secondary Core':
						return [0, 1, 2];
						break;
					case 'Structural Integrity Fields':
						let hull_count = this.subsystem.design.subsystem('Hull').component('Hull System').quantity;
						let hull_grade_civilian = this.part.match(/Civilian Grade$/);
						let sif_max_count = hull_count * (hull_grade_civilian ? 1 : 2);
						return [...Array(sif_max_count + 1).keys()];
						break;
					default:
						return [...Array(26).keys()];
					};
				},
			}
			break;
		}
	};

	// Requires H navigational deflector:
	// * Large Frigate Engineering Subframe
	// * Large or Medium Cruiser Engineering Subframe
	// * All Explorer
	get requires_heavy_navigational_deflector () {
		return (this.subsystem.design.weight_class === 'Explorer')
			|| (this.subsystem.design.weight_class === 'Cruiser'
				&& this.subsystem.design.subsystem('Engineering').sub_frame.match(/ Lg | Md /))
			|| (this.subsystem.design.weight_class === 'Frigate'
				&& this.subsystem.design.subsystem('Engineering').sub_frame.match(/ Lg /))
	};

	// Requires L navigational deflector:
	// * Small or Medium Frigate Engineering Subframe
	// * Small Cruiser Engineering Subframe
	get requires_light_navigational_deflector () {
		return (this.subsystem.design.weight_class === 'Cruiser'
				&& this.subsystem.design.subsystem('Engineering').sub_frame.match(/ Sm /))
			|| (this.subsystem.design.weight_class === 'Frigate'
				&& this.subsystem.design.subsystem('Engineering').sub_frame.match(/ Md | Sm /))
	};

	get valid_parts() {
		let parts_of_type = this
			.db
			.find_parts(COMPONENT_PART_CLASSIFICATIONS[this.name])
			.filter((part) => !part['Name'].match(/^x/));

		switch (this.name) {
		case 'Navigational Deflector':
			if (this.requires_heavy_navigational_deflector) {
				parts_of_type = parts_of_type.filter((part) => part['Name'].match(/\[H\]/))
			};
			if (this.requires_light_navigational_deflector) {
				parts_of_type = parts_of_type.filter((part) => part['Name'].match(/\[L\]/))
			};
			break;
		default:
			break;
		};
		return parts_of_type;
	};

	get evasion() {
		if (this.name === 'Impulse Engine Pwr') {
			// (1+((CJ$40/DD$40*10)/100))
			//
			// that's the effect with the component modifer divided
			// out and some junk to convert it to a probability
			//
			const evasion_effect = this.effect * this.subsystem.stats_multiplier;
			return 1 + (evasion_effect / 10);
		} else {
			return false;
		};
	};

	get warp_core_breach() {
		if (this.name === 'Eject System') {
			return this.part_def['Reliability'];
		} else {
			return false;
		};
	};

	// CP-CR block
	// crewline
	get cost_crew() {
		// =DS31 * IF(VALUE($BK31)=0,1,(1+(LOG($BK31))*2)) * ($BK$26^0.7 / 2) * CP$29 * $DH31
		//
		// DS31 is officer cost off sheet
		// $BK31 is quantity
		//
		// $BK$26 is design size
		//
		// CP$29 is subsystem officer multiplier
		// $DH31 is component crew modifier
		return [
			this.cost_crew_raw,
			this.subsystem.cost_crew_frame_mult,
			this.crew_mod,

			this.cost_crew_quantity_mod,
			this.subsystem.design.cost_crew_size_mod,
		].reduce((sum, value) => sum.mult(value), new Crewline(1));
		return 
	};

	// IF(VALUE($BK31)=0,
	// 1,
	// (1+(LOG($BK31))*2))
	// crewline
	get cost_crew_quantity_mod() {
		if (this.quantity) {
			return 1 + (2 * Math.log(this.quantity) / Math.log(10));
		} else {
			return 1;
		};
	};

	get cost_crew_raw() {
		const map = [['officer','O'],
					 ['enlisted','E'],
					 ['technician','T']];
		let crew_block = map.reduce((res, [longname, shortname]) => { res[longname] = this.part_def[shortname]; return res; }, {});
		return new Crewline(crew_block);
	};

	get crew_mod() {
		return new Crewline(this.component_modifier['Crew Mod'] || 1);
	};

	get power_generation() {
		if (this.name === 'Warp Core Type') {
			// CD79
			// CD is effect
			return this.effect;
		}
		let warp_core_type = this.subsystem.component('Warp Core Type');
		if (!warp_core_type || !warp_core_type.is_loaded) {
			return 0;
		}
		switch (this.name) {
		case "M/AM Injectors":
			// =1 + (CD81 / 100 * CO$79)
			// CD is effect
			// CD$79 is the effect for the "Warp Core Type" component
			return 1 + (this.effect * warp_core_type.effect / 100.0);
		case "Coolant Systems":
			// =1 + (CD82 / 100 * CO$79)
			return 1 + (this.effect * warp_core_type.effect / 100.0);
		case "EPS Manifold System":
			// =1 + (CD83 / 100 * CO$79)
			return 1 + (this.effect * warp_core_type.effect / 100.0);
		default:
			return 0;
		};
	};

	// CN column
	get cost_power() {
		// =(DP31 + DQ31*BK$26 + DR31*BK31) * DG31
		// DP is 'Pwr O/H' column off parts sheet

		// DQ is 'Scale Pwr' column off parts sheet
		// BK$26 is design size

		// DR is 'Unit Power' column off parts sheet
		// BK is part quantity

		// DG is 'Cost Mod' column off COMPONENT_MODIFIERS

		// the two Nacelle lines look like this:
		// =(DP70 + DR70*BK70) * DG70
		// =DQ70 * BK$26 * DG70
		// these sum together to the same as the normal case, so need
		// not be special-cased!

		return (this.cost_power_overhead
				+ this.cost_power_scale * this.subsystem.design.size
				+ this.cost_power_unit * this.quantity) * this.cost_mod
	};

	// DP column
	get cost_power_overhead() {
		return this.part_def['Pwr O/H'];
	};

	// DQ
	get cost_power_scale() {
		return this.part_def['Scale Pwr'];
	};

	// DR
	get cost_power_unit() {
		return this.part_def['Unit Power'];
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
		switch (this.subsystem.name) {
		case 'Warp Core':
			// =DK79 * IF(CX79,1+3.5*log10(0.7*BK79+0.3),1) * CW79 * CD$77
			//
			// raw effect * quantity mult * custom effect * frame effect modifier
			return this.raw_effect * this.effect_custom * this.qty_mult * this.subsystem.stats_multiplier;
		default:
			// =DK31 * IF(CX31,1+3.5*log10(0.7*BK31+0.3),1) * CW31
			//
			// raw effect from parts list * quantity multiplier * custom effect
			return this.raw_effect * this.effect_custom * this.qty_mult;
		};
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
		if (this.subsystem.get_setting('Phaser Arrays')) {
			return 1.5;
		} else {
			return 1.0;
		};
	};
	
	get setting_phaser_array_combat_multiplier() {
		if (this.subsystem.get_setting('Phaser Arrays')) {
			return 2.0;
		} else {
			return 1.0;
		};
	};

	get setting_burst_launcher_combat_multiplier() {
		if (this.subsystem.get_setting('Burst Launchers')) {
			return 1.5;
		} else {
			return 1.0;
		};
	};

	get setting_burst_launcher_weight_multiplier() {
		if (this.subsystem.get_setting('Burst Launchers')) {
			return 1.5;
		} else {
			return 1.0;
		};
	};
};

class DesignSubsystem {
	constructor(db, design, design_subsystem_json) {
		this.json = design_subsystem_json;
		this.db = db;
		this.name = this.json['Name'];
		this.design = design;
		this.settings = this.json['Settings'];
		this.sub_frame_def = this.db.find_frame(this.json['Sub-Frame']);
		if (!this.sub_frame_def) {
			console.log("WARNING: Could not find '" + this.name + "' subframe named '" + this.json['Sub-Frame'] + "'");
		}
		this.components = this.json['Components'].map(
			(comp_json) => new DesignComponent(this.db, this, comp_json)
		);
	};

	get is_loaded() {
		return !!this.sub_frame_def;
	}

	get tech_year_frame() {
		return this.sub_frame_def['Year Available (SF)'];
	};

	get tech_year_max() {
		const years = _.chain(this.components)
			.filter(comp => comp.is_loaded)
			.map((comp) => Number(comp.tech_year))
			.filter((n) => n)
			.value();
		let max = _.max(years);
		if (!max) {
			return this.tech_year_frame;
		}
		if (!Number(this.tech_year_frame)) {
			return max;
		}
		return Math.max(max, this.tech_year_frame);
	};

	get_setting(key) {
		return this.settings.find((elem) => elem['Name'] === key)['Value'];
	};

	get sub_frame() {
		return this.json['Sub-Frame'];
	};

	set sub_frame(value) {
		this.json['Sub-Frame'] = value;
	};

	get valid_frames() {
		return this
			.db
			.find_frames(this.name)
			.filter((frame) => frame['Weight Class'] == this.design.weight_class_raw)
			.filter((frame) => !frame['Name'].match(/^x/));
	};

	// CV20, CV41
	get weight_cap() {
		// sum of CV31-40 plus CV29
		return this.weight_cap_components + this.weight_cap_frame;
	};

	// CV column
	get weight_cap_components() {
		// these can't be filled in the C8 sheet
		return 0;
	};

	// CV29
	get weight_cap_frame() {
		// =(DL29/100) * CV$18
		return this.max_size_frame * this.design.frame_max_size_raw / 100;
	};

	get max_size_frame() {
		// "MaxSz" off frame def
		return this.sub_frame_def['MaxSz'];
	};

	get warp_core_breach() {
		return this.components
			.filter(comp => comp.is_loaded)
			.map((comp) => comp.warp_core_breach)
			.filter((val) => (val !== false))
			.reduce((sum, value) => 1 - ((1 - sum) * (1 - value)), 0);
	};

	get evasion() {
		// CJ40 is D value for Impulse Engine Pwr
		// DD40 D mod for Impulse Engine Pwr
		return this.components
			.filter(comp => comp.is_loaded)
			.map((comp) => comp.evasion)
			.filter((val) => (val !== false))
			.reduce((sum, value) => 1 - ((1 - sum) * (1 - value)), 0);
	};

	// CT column, subsystems
	get build_time() {
		// =SUM(CT31:CT40)+CT29
		//
		// but the component values are all blank - no way for them to
		// be filled, and parts don't have build times - so this is
		// just CT29
		//
		// CT29 is DN29 is the build time value straight off the
		// frames list
		return from_frac(this.sub_frame_def['Build Time']);
	};

	// DS31-DSU31 row
	// crewline
	get cost_crew_frame_mult() {
		// CP$18 * DR29
		// CP$18 is DR18 is design principal frame 'O-Mod' off parts list
		// DR29 is subframe 'O-Mod' off parts list
		return this.cost_crew_frame_mult_raw.mult(this.design.cost_crew_frame_mult);
	};

	// DR29 is subframe 'O-Mod' off parts list
	// crewline
	get cost_crew_frame_mult_raw() {
		const map = [['officer','O-Mod'],
					 ['enlisted','E-Mod'],
					 ['technician','T-Mod']];
		let crew_block = map.reduce((res, [longname, shortname]) => { res[longname] = this.sub_frame_def[shortname]; return res; }, {});
		return new Crewline(crew_block);
	};

	// CP, CQ, CR block
	// crewline
	get cost_crew() {
		// straight sum of components
		return this.components
			.filter(comp => comp.is_loaded)
			.map((comp) => comp.cost_crew)
			.reduce((sum, value) => sum.add(value), new Crewline({}));
	};

	// CO column
	// scalar
	get power_generation() {
		switch (this.name) {
		case 'Warp Core':
			return this.power_generation_components + this.setting_safety_performance;
		default:
			return this.power_generation_components;
		};
	};

	get power_generation_components() {
		return this.components
			.filter(comp => comp.is_loaded)
			.map((comp) => comp.power_generation)
			.reduce((sum, value) => sum + value, 0);
	};

	get setting_safety_performance() {
		// =-BK80 * POWER(2,(ABS(BK80)/2)) / 100 * CO$79
		// BK80 is D80 is Safety/Performance slider value
		// CD$79 is warp core effect
		let warp_core_type = this.component('Warp Core Type');
		if (!warp_core_type || !warp_core_type.is_loaded) {
			return 0;
		}
		return -this.get_setting('Safety/Performance')
			* warp_core_type.effect
			* Math.pow(2.0, Math.abs(this.get_setting('Safety/Performance')) / 2.0)
			/ 100.0;
	};

	component(component_name) {
		return this.components.find((comp) => (comp.name === component_name));
	};

	// CN column, 29 etc
	get cost_power() {
		return this.cost_power_components;
	};

	get cost_power_components() {
		return this.components
			.filter(comp => comp.is_loaded)
			.map((comp) => comp.cost_power)
			.reduce((sum, value) => sum + value, 0);
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
		return this.components
			.filter(comp => comp.is_loaded)
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
		return this.components
			.filter(comp => comp.is_loaded)
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
		return this.components
			.filter(comp => comp.is_loaded)
			.map((comp) => comp.weight_external)
			.reduce((sum, value) => sum + value, 0);
	};

	// =SUM(CK31:CK40)
	// scalar
	get weight_components_internal() {
		return this.components
			.filter(comp => comp.is_loaded)
			.map((comp) => comp.weight_internal)
			.reduce((sum, value) => sum + value, 0);
	};

	// get weight_multiplier() {
	// 	return this.sub_frame_def[''] || 0;
	// };
	
	// [CE41 row;CE57 row;CE63 row] block
	get stats() {
		return this.components
			.filter(comp => comp.is_loaded)
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
		this.json = design_module_json;
		this.db = db;
		this.design = design;
		this.module_def = this.db.find_module(this.json['Type'], this.json['Variant']);
		if (!this.module_def) {
			console.log("WARNING: Could not find module of type '" + this.json['Type'] + "' and variant '" + this.json['Variant'] + "'");
		}
	};

	get module_variant () {
		return this.json['Variant'];
	};

	set module_variant (value) {
		this.json['Variant'] = value;
	};

	get valid_variants() {
		return this.db.find_modules(this.module_def['Type']);
	};

	get module_type () {
		return this.json['Type'];
	};

	set module_type (value) {
		this.json['Type'] = value;
	};

	// CT88, DN88
	get build_time() {
		// straight off modules list
		return from_frac(this.module_def['Build Time']);
	};

	// CP-CR 88, DS-DU88
	// crewline
	get cost_crew() {
		// straight off parts list
		const map = [['officer','O'],
					 ['enlisted','E'],
					 ['technician','T']];
		let stat_block = map.reduce((res, [longname, shortname]) => { res[longname] = this.module_def[shortname]; return res; }, {});
		return new Crewline(stat_block);
	};

	// CN25, CN88, DP88, straight from parts list
	get cost_power() {
		return this.module_def['Power Cost'];
	};

	// CM25, CM88, DO88
	// straight off parts list
	get cost_SR() {
		return this.module_def['SR Cost'];
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
	constructor(db, design_json, wrong_db = false) {
		this.json = design_json;
		this.db = db;
		this.wrong_db = wrong_db;
		this.name = this.json['Name'];
		this.timestamp = new Date(this.json['Blueprint Date']);
		if (this.json['Parts List']) {
			this.parts_list_name = this.json['Parts List'].name;
			this.parts_list_timestamp = new Date(this.json['Parts List'].timestamp);
		} else {
			this.parts_list_name = this.db.name;
			this.parts_list_timestamp = this.db.timestamp;
		};
		this.princ_frame_def = this.db.find_frame(this.json['Principal Frame']);
		if (!this.princ_frame_def) {
			console.log("WARNING: Could not find principal frame named '" + this.json['Principal Frame'] + "'");
		}
		this.subsystems = this.json['Subsystems'].map(
			(ss_json) => new DesignSubsystem(this.db, this, ss_json)
		).sort((ssa, ssb) => SUBSYSTEM_SORT_ORDER[ssa.name] > SUBSYSTEM_SORT_ORDER[ssb.name]);
		this.module = new Module(db, this, this.json['Module']);
	};

	static find_by_pretty_name(pretty_name) {
		return function(design) {
			return design.matches_pretty_name(pretty_name);
		};
	};

	matches_pretty_name(value) {
		return (this.pretty_name === value);
	};

	matches_design(other) {
		return (this.name === other.name
				&& this.timestamp === other.timestamp);
	};

	matches_parts_list(parts_db) {
		return (this.parts_list_name === parts_db.name
				&& this.parts_list_timestamp.getTime() == parts_db.timestamp.getTime());
	};

	get pretty_name () {
		return this.name
			+ ' (' + this.timestamp.toLocaleString() + ')'
			+ ' [' + this.pretty_name_stats + ']';
	};

	get pretty_name_stats () {
		if (this.wrong_db) {
			return 'parts list missing';
		} else {
			return this.stats.toString();
		};
	};

	get has_parts_list_info () {
		return this.parts_list_name.length && this.parts_list_timestamp;
	};

	get parts_list_pretty_name () {
		return this.parts_list_name + ' (' + this.parts_list_timestamp.toLocaleString() + ')';
	};

	get tech_year_frame() {
		return this.princ_frame_def['Year Available (SF)'];
	}

	get tech_year_max() {
		const years = _.chain(this.subsystems)
			.filter(ss => ss.is_loaded)
			.map((ss) => Number(ss.tech_year_max))
			.filter((n) => n)
			.value();
		let max = _.max(years);
		if (!max) {
			return this.tech_year_frame;
		}
		if (!Number(this.tech_year_frame)) {
			return max;
		}
		return Math.max(max, this.tech_year_frame);
	};

	subsystem(subsystem_name) {
		return this.subsystems.find((ss) => (ss.name === subsystem_name));
	};

	get valid_frames() {
		return this.db.find_frames('Frame');
	};

	// CT27, CT26
	get build_time() {
		return Math.ceil(this.build_time_raw * 12) / 12;
	};

	// CT26
	get build_time_raw() {
		// =SUM(CT20:CT25)+CT$18
		return this.build_time_frame + this.build_time_subsystems + this.module.build_time;
	};

	// CT18, DN18
	get build_time_frame() {
		// "Build Time" off frames list
		return from_frac(this.princ_frame_def['Build Time']);
	};

	// sum of CT column on subsystems
	get build_time_subsystems() {
		return this.subsystems
			.filter(ss => ss.is_loaded)
			.map((ss) => ss.build_time)
			.reduce((sum, value) => sum + value, 0);
	};

	get evasion() {
		return Math.round(this.evasion_raw * 1e4) / 1e4;
	};

	// CD11
	get evasion_raw() {
		// =(MAX(0, 30 - (BK$26*3)) / 100) * (1+((CJ$40/DD$40*10)/100))
		// BK26 is size
		// CJ40 is D value for Impulse Engine Pwr
		// DD40 D mod for Impulse Engine Pwr
		return this.evasion_size_mult * this.evasion_subsystems;
	};

	get evasion_size_mult() {
		// =(MAX(0, 30 - (BK$26*3)) / 100)
		// for ease of programming: probability of all failing
		return Math.max(0, 30 - (this.size * 3)) / 100;
	};

	get evasion_subsystems() {
		return this.subsystems
			.filter(ss => ss.is_loaded)
			.map((ss) => ss.evasion)
			.filter((wcb) => wcb)
			.reduce((sum, value) => 1 - ((1 - sum) * (1 - value)), 0);
	};

	// CD13, DV84
	get warp_core_breach() {
		return this.warp_core_breach_subsystems;
	};

	get warp_core_breach_subsystems() {
		// for ease of programming: probability of all failing
		return this.subsystems
			.filter(ss => ss.is_loaded)
			.map((ss) => ss.warp_core_breach)
			.filter((wcb) => wcb)
			.reduce((sum, value) => 1 - ((1 - sum) * (1 - value)), 0);
	};

	// ($BK$26^0.7 / 2)
	// crewline
	get cost_crew_size_mod() {
		// BK26 is design size
		return Math.pow(this.size, 0.7) / 2;
		// return 1/2;
	};

	// CP$18 is DR18 is design principal frame 'O-Mod' off parts list
	// crewline
	get cost_crew_frame_mult() {
		const map = [['officer','O-Mod'],
					 ['enlisted','E-Mod'],
					 ['technician','T-Mod']];
		let crew_block = map.reduce((res, [longname, shortname]) => { res[longname] = this.princ_frame_def[shortname]; return res; }, {});
		return new Crewline(crew_block);
	};

	// T,U,V 3; CP,CQ,CR 27
	// crewline
	get cost_crew() {
		// ceiling of CP,CQ,CR 26
		return this.cost_crew_raw.ceil;
	};

	// T,U,V 2
	// crewline
	get cost_crew_raw() {
		// CP,CQ,CR 26
		// sum of subsystem crew costs plus module crew cost
		return this.cost_crew_subsystems.add(this.module.cost_crew);
	};

	get cost_crew_subsystems() {
		return this.subsystems
			.filter(ss => ss.is_loaded)
			.map((ss) => ss.cost_crew)
			.reduce((sum, value) => sum.add(value), new Crewline({}));
	};

	get power_generation() {
		return Math.round(this.power_generation_raw);
	};

	get power_generation_raw() {
		return this.subsystems
			.filter(ss => ss.is_loaded)
			.map((ss) => ss.power_generation)
			.reduce((sum, value) => sum + value, 0);
	};
	
	// CE27 row
	get stats() {
		return this.stats_raw.floor
	};

	// BL26, CE26 row
	get stats_raw() {
		return this.stats_subsystems.add(this.stats_module);
	};

	get stats_subsystems() {
		return this.subsystems
			.filter(ss => ss.is_loaded)
			.map((ss) => ss.stats)
			.reduce((sum, value) => sum.add(value), new Statline({}));
	};

	get stats_module() {
		return this.module.stats;
	};

	// O3, CK27
	// scalar
	get weight_total() {
		return Math.floor(this.weight_total_raw);
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
	get weight_total_raw() {
		// =SUM(CK20:CK25)+CK$18
		return this.weight_external + this.weight_internal;
	};

	// CK26
	get weight_subsystems_internal() {
		// =SUM(CK20:CK25)
		// CK20:24 is subsystem weights
		// CK25 is module weight
		return this.subsystems
			.filter(ss => ss.is_loaded)
			.map((ss) => ss.weight_internal)
			.reduce((sum, value) => sum + value, 0);
	};

	// CK26
	get weight_subsystems_external() {
		// =SUM(CK20:CK25)
		// CK20:24 is subsystem weights
		// CK25 is module weight
		return this.subsystems
			.filter(ss => ss.is_loaded)
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
			.filter(ss => ss.is_loaded)
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
			.filter(ss => ss.is_loaded)
			.map((ss) => ss.cost_SR)
			.reduce((sum, value) => sum + value, 0);
	};

	get cost_SR_round() {
		// same as BR, basically
		return BR_COST_ROUND_MAP[this.weight_class];
	};

	// R2, CN27
	get cost_power() {
		// round, not floor or ceil!
		return Math.round(this.cost_power_raw);
	};

	// R3, CN26
	get cost_power_raw() {
		return this.cost_power_subsystems + this.module.cost_power;
	};

	get cost_power_subsystems() {
		return this.subsystems
			.filter(ss => ss.is_loaded)
			.map((ss) => ss.cost_power)
			.reduce((sum, value) => sum + value, 0);
	};

	// BK27
	get size_round() {
		return Math.ceil(this.size);
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

	// CV18, DL18
	get frame_max_size_raw() {
		// 'MaxSz' item off principal frame definition
		return this.princ_frame_def['MaxSz'];
	};

	get pretty_statline() {
		return this.stats.toString() + ' - '
			+ this.cost_BR.toString() + 'br ' + this.cost_SR.toString() + 'sr ' + ' - '
			+ this.weight_total.toString() + 'kt ' + '[' + this.build_time.toFixed(2) + ']yr' + ' - '
			+ this.cost_crew.toString();
	};

	get pretty_miscstats() {
		return 'Evasion Chance: ' + (this.evasion * 100).toFixed(2) + "%\t"
			+ 'Warp Core Breach Chance: ' + (this.warp_core_breach * 100).toFixed(2) + '%';
	};

	get pretty_summary() {
		const ID = 'Class: ' + this.name;
		return [ID, this.pretty_statline, this.pretty_miscstats].join("\n");
	};

	get pretty_statline_raw() {
		return this.stats_raw.toFixed(2) + ' - '
			+ '[' + this.cost_BR_raw.toFixed(2) + ']br [' + this.cost_SR_raw.toFixed(2) + ']sr ' + ' - '
			+ '[' + this.weight_total_raw.toFixed(2) + ']kt ' + '[' + this.build_time.toFixed(2) + ']yr' + ' - '
			+ this.cost_crew_raw.toFixed(2);
	};
	get pretty_buildinfo() {
		return 'Power[' + this.cost_power_raw.toFixed(2) + '/' + this.power_generation_raw.toFixed(2) + '] - '
			+ 'Internal[' + this.weight_internal.toFixed(1) + '/' + this.frame_max_size_raw + '] '
			+ this.subsystems.map((ss) => ss.name + '[' + ss.weight_internal.toFixed(1) + '/' + ss.weight_cap.toFixed(0) + ']').join(' ')
	};

	get pretty_sdb_info() {
		return [this.pretty_statline_raw, this.pretty_buildinfo].join("\n");
	};

	get pretty_dump() {
	};
};

class DB {
	constructor(parts_list_json) {
		this.json = parts_list_json;
		this.name = this.json.name;
		this.timestamp = new Date(this.json.timestamp);
		this.parts = this.json.parts.records;
		this.frames = this.json.frames.records;
		this.modules = this.json.modules.records;
	};

	matches(other) {
		return (this.name == other.name) && (this.timestamp == other.timestamp);
	};

	static find_by_design_json(design_json) {
		return function(db) {
			return db.name === design_json['Parts List'].name
				&& db.timestamp.getTime() == (new Date(design_json['Parts List'].timestamp)).getTime();
		};
	};

	static find_by_pretty_name (pretty_name) {
		return function(db) {
			return db.matches_pretty_name(pretty_name);
		};
	};

	matches_pretty_name(value) {
		return this.pretty_name === value;
	};

	get pretty_name () {
		return this.name + ' (' + this.timestamp.toLocaleString() + ')';
	};

	find_module(type, variant) {
		return this.modules.find(
			(elem) => (
				(elem['Type'] === type) && (elem['Variant'] === variant))
		);
	};

	find_part(name) {
		return this.parts.find((elem) => elem['Name'] === name);
	};

	find_frame(name) {
		return this.frames.find((elem) => elem['Name'] === name);
	};

	find_frames(type) {
		return this.frames.filter((elem) => elem['Type'] === type);
	};

	find_parts(type) {
		return this.parts.filter((elem) => elem['Type'] === type);
	};

	find_modules(type) {
		return this.modules.filter((elem) => elem['Type'] === type);
	};

	valid_module_types() {
		return [...new Set(this.modules.map((elem) => elem['Type']))];
	};
};

export {
	Design,
	DB,
	Statline,
	Crewline,
}
