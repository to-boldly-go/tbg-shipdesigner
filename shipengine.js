let MODIFIERS = {
	"Primary Phasers": {
		"Effect Qty?": true,
		"C": 1,
	},
	"Secondary Phasers": {
		"Effect Qty?": true,
		"C": 1/4,
	},
	"Torpedo System": {
		"Effect Qty?": true,
		"C": 1,
	},
	"Short-Range Sensors": {
		"Effect Qty?": true,
		"C": 1/2,
	},
	"Targeting Computer": {
		"Effect Qty?": true,
		"C": 1,
	},
	"Deflector Shields": {
		"Effect Qty?": true,
		"C": 0,
	},
	"Backup Deflectors": {
		"Effect Qty?": true,
		"C": 0,
	},
	"Impulse Engine Pwr": {
		"Effect Qty?": true,
		"C": 1/4,
	},
};

class DesignPart {
	constructor(db, component, name, quantity) {
		this.db = db;
		this.name = name;
		this.quantity = quantity;
		this.component = component;

		this.part_def = this.db.find_part(this.name);

		// DK31:DK40, ...
		this.effect = this.part_def['Effect'];
	};

	// CD31
	get combat() {
		// =DK31 * IF(CX31,1+3.5*log10(0.7*BK31+0.3),1) * CW31
		return this.effect * this.raw_combat * this.custom_combat
	};

	// IF(CX31,
	// 1 + 3.5 * log10(0.7 * BK31 + 0.3)
	// ,1)
	get raw_combat() {
		if (this.component.effect_qty) {
			return 1 + (3.5 * Math.log((0.7 * this.quantity) + 0.3) / Math.log(10));
		} else {
			return 1;
		};
	};

	// CW31
	get custom_combat () {
		if (this.component.name === 'Primary Phasers') {
			// =(1-(BK$26/100)) * IF($D$33,2,1)
			// BK$26 = BK18 + BK25
			// BK18 = $CV18 / $AL$6
			// $CV18 = weight cap, DL18, equal principal frame MaxSz
			// $AL$6 = "Size-To-Weight-Cap Multiplier", constant 300
			// BK25 = rollbar size?, BK88
			// BK88 = rollbar size? = $CV88 / $AL$6
			// $CV88 = DL88 = module weight cap? = module weight cap from "Weight Cap" element of module
			// $D$33 is "phaser arrays Y/N"
			return 0.97;
		}
		if (this.component.name === 'Secondary Phasers') {
			return 0.97;
		}
		if (this.component.name === 'Torpedo System') {
			// =IF($D$35, 1.5, 1)
			// $D$35 is burst launchers Y/N
			return 1.5;
		}
		return 1;
	};
};

class DesignComponent {
	constructor(db, subsystem, design_component_json) {
		this.db = db;
		this.name = design_component_json['Name'];
		this.subsystem = subsystem;
		// CY31:CY40, ...
		this.modifier = MODIFIERS[this.name] || {};

		this.part = new DesignPart(this.db, this, design_component_json['Part'], design_component_json['Quantity']);
	};

	// CE31:CE40, CE46:CE56, ...
	get combat() {
		// CD31 * CY31 * CE$29
		return this.part.combat * this.combat_modifier * this.subsystem.combat_multiplier;
	};

	get effect_qty() {
		return this.modifier['Effect Qty?'];
	};

	// CY31
	get combat_modifier() {
		return this.modifier['C'];
	};
};

class DesignSubsystem {
	constructor(db, design, design_subsystem_json) {
		this.db = db;
		this.name = design_subsystem_json['Name'];
		this.design = design;
		this.sub_frame_def = this.db.find_frame(design_subsystem_json['Sub-Frame']);
		this.components = design_subsystem_json['Components'].map(
			(comp_json) => new DesignComponent(this.db, this, comp_json)
		);
	};
	
	// CE20:CE25, CE41, CE57, ...
	get combat() {
		return this
			.components
			.map((comp) => comp.combat)
			.reduce((sum, value) => sum + value);
	};

	// CE29, CD29, DO29
	get combat_multiplier() {
		// =IF(BI29="",0,DGET('[C8] Frames'!$A:$R,DO$28,{"Type","Name";"="&$AJ29,"="&BI29}))
		// BI29 is frame name
		// if no frame, then 0
		// if frame, then look up "tac mod" field in frames list
		return this.sub_frame_def['Tac Mod'];
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
	
	// CE27
	get combat() {
		return Math.floor(this.raw_combat)
	};

	// BL26, CE26
	get raw_combat() {
		return this
			.subsystems
			.map((ss) => ss.combat)
			.reduce((sum, value) => sum + value);
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
