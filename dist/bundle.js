/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const util = __webpack_require__(7);
const NamedVector = __webpack_require__(8).NamedVector;

// AL6, $AL$6
const SIZE_TO_WEIGHT_CAP_MULTIPLIER = 300;

// AL7
const BR_TO_WEIGHT_MULTIPLIER = 10;

const SUBSYSTEM_SORT_ORDER = {
	"Tactical": 1,
	"Operations": 2,
	"Hull": 3,
	"Engineering": 4,
	"Warp Core": 5
};

const SR_COST_ROUND_MAP = {
	'Frigate': 5,
	'Cruiser': 10,
	'EXplorer': 10
};

const BR_COST_ROUND_MAP = {
	'Frigate': 5,
	'Cruiser': 10,
	'EXplorer': 10
};

// =IF(DK$18 = 1, "Frigate", IF(DK$18 = 2, "Cruiser", "Explorer"))
const WEIGHT_CLASS_MAP = {
	1: 'Frigate',
	2: 'Cruiser',
	3: 'Explorer'
};

const SUBSYSTEM_NAME_MAP = {
	"Tactical": "Tac Mod",
	"Engineering": "Eng. Mod",
	"Hull": "Hull Mod",
	"Operations": "Ops Mod",
	"Warp Core": "Core Mod"

	// REFACTOR: change the names of these to be less abbreviated
	// (effectiveness instead of effect, for example)
};let COMPONENT_MODIFIERS = {
	"Primary Phasers": {
		"Effect Qty?": true,
		"combat": 1,
		"Cost Mod": 1,
		"Crew Mod": 1
	},
	"Secondary Phasers": {
		"Effect Qty?": true,
		"combat": 1 / 4,
		"Cost Mod": 1 / 4,
		"Crew Mod": 1
	},
	"Torpedo System": {
		"Effect Qty?": true,
		"combat": 1,
		"Cost Mod": 1,
		"Crew Mod": 1
	},
	"Short-Range Sensors": {
		"Effect Qty?": true,
		"combat": 1 / 2,
		"science": 1 / 2,
		"Cost Mod": 1,
		"Crew Mod": 1
	},
	"Targeting Computer": {
		"Effect Qty?": true,
		"combat": 1,
		"Cost Mod": 1,
		"Crew Mod": 1
	},
	"Deflector Shields": {
		"Effect Qty?": true,
		"shields": 1,
		"Cost Mod": 1,
		"Crew Mod": 1
	},
	"Backup Deflectors": {
		"Effect Qty?": true,
		"shields": 1 / 5,
		"Cost Mod": 1 / 5,
		"Crew Mod": 1 / 5
	},
	"Impulse Engine Pwr": {
		"Effect Qty?": true,
		"combat": 1 / 4,
		"defense": 4 / 5,
		"Cost Mod": 1,
		"Crew Mod": 1
	},

	"Long-Range Sensors": {
		"Effect Qty?": true,
		"science": 1,
		"Cost Mod": 1,
		"Crew Mod": 1
	},
	"Navigational Sensors": {
		"Effect Qty?": true,
		"science": 1,
		"defense": 1 / 6,
		"Cost Mod": 1,
		"Crew Mod": 1
	},
	"Survey Sensors": {
		"Effect Qty?": true,
		"science": 1,
		"Cost Mod": 1,
		"Crew Mod": 1
	},
	"Science Labs": {
		"Effect Qty?": true,
		"science": 1,
		"Cost Mod": 1,
		"Crew Mod": 1
	},
	"Computer Core": {
		"Effect Qty?": true,
		"combat": 1 / 4,
		"science": 1 / 4,
		"hull": 1 / 10,
		"shields": 1 / 7,
		"presence": 1 / 6,
		"defense": 1 / 8,
		"Cost Mod": 1,
		"Crew Mod": 1
	},
	"Operating System": {
		"Effect Qty?": true,
		"combat": 1 / 8,
		"science": 1 / 8,
		"shields": 1 / 14,
		"defense": 1 / 10,
		"Cost Mod": 1,
		"Crew Mod": 1
	},
	"Secondary Core": {
		"Effect Qty?": true,
		"combat": 1 / 16,
		"science": 1 / 16,
		"shields": 1 / 28,
		"defense": 1 / 40,
		"Cost Mod": 1 / 2,
		"Crew Mod": 1 / 4
	},
	"Diplomatic Package": {
		"Effect Qty?": true,
		"presence": 1,
		"Cost Mod": 1,
		"Crew Mod": 1
	},
	"Recreation Package": {
		"Effect Qty?": true,
		"presence": 1,
		"Cost Mod": 1,
		"Crew Mod": 1
	},
	"Sickbay": {
		"Effect Qty?": true,
		"science": 1 / 2,
		"presence": 1,
		"Cost Mod": 1,
		"Crew Mod": 1
	},

	"Hull System": {
		"Effect Qty?": true,
		"hull": 1,
		"Cost Mod": 1,
		"Scale Wt?": 1,
		"Crew Mod": 1
	},

	"Structural Integrity Fields": {
		"Effect Qty?": true,
		"hull": 1,
		"Cost Mod": 1,
		"Crew Mod": 1
	},
	"Navigational Deflector": {
		"Effect Qty?": false,
		"science": 1 / 3,
		"shields": 1 / 7,
		"defense": 1,
		"Cost Mod": 1,
		"Crew Mod": 1
	},
	"Nacelle System": {
		"Effect Qty?": true,
		"defense": 1,
		"Cost Mod": 1,
		"Crew Mod": 1
	},
	"Replication Package": {
		"Effect Qty?": true,
		"science": 1 / 10,
		"presence": 1 / 4,
		"defense": 1,
		"Cost Mod": 1,
		"Crew Mod": 1
	},
	"Fuel & Matter Stores": {
		"Effect Qty?": false,
		"defense": 1,
		"Cost Mod": 1,
		"Crew Mod": 1
	},

	"Warp Core Type": {
		"Effect Qty?": true,
		"Cost Mod": 1,
		"Crew Mod": 1
	},
	"M/AM Injectors": {
		"Effect Qty?": true,
		"Cost Mod": 1,
		"Crew Mod": 1
	},
	"Coolant Systems": {
		"Effect Qty?": true,
		"Cost Mod": 1,
		"Crew Mod": 1
	},
	"EPS Manifold System": {
		"Effect Qty?": false,
		"Cost Mod": 1,
		"Crew Mod": 1
	},
	"Eject System": {
		"Effect Qty?": false,
		"Cost Mod": 1,
		"Crew Mod": 1
	}
};

class Crewline extends NamedVector {
	static get shortnames() {
		return {
			'officer': 'O',
			'enlisted': 'E',
			'technician': 'T'
		};
	}
	constructor(val) {
		super(val, Crewline.shortnames);
	}
};

class Statline extends NamedVector {
	static get shortnames() {
		return {
			'combat': 'C',
			'science': 'S',
			'hull': 'H',
			'shields': 'L',
			'presence': 'P',
			'defense': 'D'
		};
	}
	constructor(val) {
		super(val, Statline.shortnames);
	}
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
	}

	get evasion() {
		if (this.name === 'Impulse Engine Pwr') {
			// (1+((CJ$40/DD$40*10)/100))
			//
			// that's the effect with the component modifer divided
			// out and some junk to convert it to a probability
			//
			const evasion_effect = this.effect * this.subsystem.stats_multiplier;
			return 1 + evasion_effect / 10;
		} else {
			return false;
		};
	}

	get warp_core_breach() {
		if (this.name === 'Eject System') {
			return this.part_def['Reliability'];
		} else {
			return false;
		};
	}

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
		return [this.cost_crew_raw, this.subsystem.cost_crew_frame_mult, this.crew_mod, this.cost_crew_quantity_mod, this.subsystem.design.cost_crew_size_mod].reduce((sum, value) => sum.mult(value), new Crewline(1));
		return;
	}

	// IF(VALUE($BK31)=0,
	// 1,
	// (1+(LOG($BK31))*2))
	// crewline
	get cost_crew_quantity_mod() {
		if (this.quantity) {
			return 1 + 2 * Math.log(this.quantity) / Math.log(10);
		} else {
			return 1;
		};
	}

	get cost_crew_raw() {
		const map = [['officer', 'O'], ['enlisted', 'E'], ['technician', 'T']];
		let crew_block = map.reduce((res, [longname, shortname]) => {
			res[longname] = this.part_def[shortname];return res;
		}, {});
		return new Crewline(crew_block);
	}

	get crew_mod() {
		return new Crewline(this.component_modifier['Crew Mod'] || 1);
	}

	get power_generation() {
		switch (this.name) {
			case "Warp Core Type":
				// CD79
				// CD is effect
				return this.effect;
			case "M/AM Injectors":
				// =1 + (CD81 / 100 * CO$79)
				// CD is effect
				// CD$79 is the effect for the "Warp Core Type" component
				return 1 + this.effect * this.subsystem.component_warp_core_effect / 100.0;
			case "Coolant Systems":
				// =1 + (CD82 / 100 * CO$79)
				return 1 + this.effect * this.subsystem.component_warp_core_effect / 100.0;
			case "EPS Manifold System":
				// =1 + (CD83 / 100 * CO$79)
				return 1 + this.effect * this.subsystem.component_warp_core_effect / 100.0;
			default:
				return 0;
		};
	}

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

		return (this.cost_power_overhead + this.cost_power_scale * this.subsystem.design.size + this.cost_power_unit * this.quantity) * this.cost_mod;
	}

	// DP column
	get cost_power_overhead() {
		return this.part_def['Pwr O/H'];
	}

	// DQ
	get cost_power_scale() {
		return this.part_def['Scale Pwr'];
	}

	// DR
	get cost_power_unit() {
		return this.part_def['Unit Power'];
	}

	// CM column
	get cost_SR() {
		// =CK31 * DO31 * CM$29
		// CM29 is subsystem frame 'SR Cost x'
		// CK31 is weight
		// DO31 is SR Cost x off the part list
		return (this.weight_internal + this.weight_external) * this.cost_SR_mult * this.subsystem.cost_SR_mult;
	}

	// DO31
	get cost_SR_mult() {
		// SR Cost x off the part list
		return this.part_def['SR Cost x'];
	}

	// CL column
	get cost_BR() {
		// total weight divided by br to weight mult
		return (this.weight_internal + this.weight_external) / BR_TO_WEIGHT_MULTIPLIER;
	}

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
	}

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
	}

	// (DL31 + IF(DF31,DM31*BK$26,DN31)*BK31)
	// scalar
	//
	// the weight of the component before component and size modifiers
	// are applied
	get weight_raw() {
		return this.weight_overhead_raw + this.weight_per_unit * this.quantity;
	}

	get cost_mod() {
		return this.component_modifier['Cost Mod'] || 1;
	}

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
	}

	// DM31
	get weight_scale_raw() {
		return this.part_def['Scale Weight'];
	}

	// DN31
	get weight_unit_raw() {
		return this.part_def['Unit Weight'];
	}

	// DK column
	// scalar
	get raw_effect() {
		return this.part_def['Effect'];
	}

	// CE block
	// statline
	get stats() {
		// CD column * CY block * CE$29 row
		//
		// effect for this part * frame effect multiplier * the
		// component's statline modifier
		return new Statline(this.component_modifier).mult(this.effect * this.subsystem.stats_multiplier);
	}

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
	}

	// IF(CX31,
	// 1 + 3.5 * log10(0.7 * BK31 + 0.3)
	// ,1)
	//
	// scalar
	get qty_mult() {
		if (this.uses_effect_qty) {
			return 1 + 3.5 * Math.log(0.7 * this.quantity + 0.3) / Math.log(10);
		} else {
			return 1;
		};
	}

	// boolean
	get uses_effect_qty() {
		return this.component_modifier['Effect Qty?'];
	}

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
	}

	// CW column
	//
	// scalar
	// 
	// comment on sheet: Additional custom multiplier on effect - can
	// be formula as long as it doesn't reference any cell on this row
	get effect_custom() {
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
	}

	get phaser_size_mult() {
		return 1 - this.subsystem.design.size / 100.0;
	}

	get setting_phaser_array_weight_multiplier() {
		if (this.subsystem.settings['Phaser Arrays']) {
			return 1.5;
		} else {
			return 1.0;
		};
	}

	get setting_phaser_array_combat_multiplier() {
		if (this.subsystem.settings['Phaser Arrays']) {
			return 2.0;
		} else {
			return 1.0;
		};
	}

	get setting_burst_launcher_combat_multiplier() {
		if (this.subsystem.settings['Burst Launchers']) {
			return 1.5;
		} else {
			return 1.0;
		};
	}

	get setting_burst_launcher_weight_multiplier() {
		if (this.subsystem.settings['Burst Launchers']) {
			return 1.5;
		} else {
			return 1.0;
		};
	}
};

class DesignSubsystem {
	constructor(db, design, design_subsystem_json) {
		this.db = db;
		this.name = design_subsystem_json['Name'];
		this.design = design;
		this.settings = design_subsystem_json['Settings'];
		this.sub_frame_def = this.db.find_frame(design_subsystem_json['Sub-Frame']);
		this.components = design_subsystem_json['Components'].map(comp_json => new DesignComponent(this.db, this, comp_json));
	}

	// CV20, CV41
	get weight_cap() {
		// sum of CV31-40 plus CV29
		return this.weight_cap_components + this.weight_cap_frame;
	}

	// CV column
	get weight_cap_components() {
		// these can't be filled in the C8 sheet
		return 0;
	}

	// CV29
	get weight_cap_frame() {
		// =(DL29/100) * CV$18
		return this.max_size_frame * this.design.frame_max_size_raw / 100;
	}

	get max_size_frame() {
		// "MaxSz" off frame def
		return this.sub_frame_def['MaxSz'];
	}

	get warp_core_breach() {
		return this.components.map(comp => comp.warp_core_breach).filter(val => val !== false).reduce((sum, value) => 1 - (1 - sum) * (1 - value), 0);
	}

	get evasion() {
		// CJ40 is D value for Impulse Engine Pwr
		// DD40 D mod for Impulse Engine Pwr
		return this.components.map(comp => comp.evasion).filter(val => val !== false).reduce((sum, value) => 1 - (1 - sum) * (1 - value), 0);
	}

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
		return eval(this.sub_frame_def['Build Time']);
	}

	// DS31-DSU31 row
	// crewline
	get cost_crew_frame_mult() {
		// CP$18 * DR29
		// CP$18 is DR18 is design principal frame 'O-Mod' off parts list
		// DR29 is subframe 'O-Mod' off parts list
		return this.cost_crew_frame_mult_raw.mult(this.design.cost_crew_frame_mult);
	}

	// DR29 is subframe 'O-Mod' off parts list
	// crewline
	get cost_crew_frame_mult_raw() {
		const map = [['officer', 'O-Mod'], ['enlisted', 'E-Mod'], ['technician', 'T-Mod']];
		let crew_block = map.reduce((res, [longname, shortname]) => {
			res[longname] = this.sub_frame_def[shortname];return res;
		}, {});
		return new Crewline(crew_block);
	}

	// CP, CQ, CR block
	// crewline
	get cost_crew() {
		// straight sum of components
		return this.components.map(comp => comp.cost_crew).reduce((sum, value) => sum.add(value), new Crewline({}));
	}

	// CO column
	// scalar
	get power_generation() {
		switch (this.name) {
			case 'Warp Core':
				return this.power_generation_components + this.setting_safety_performance;
			default:
				return this.power_generation_components;
		};
	}

	get power_generation_components() {
		return this.components.map(comp => comp.power_generation).reduce((sum, value) => sum + value, 0);
	}

	get setting_safety_performance() {
		// =-BK80 * POWER(2,(ABS(BK80)/2)) / 100 * CO$79
		// BK80 is D80 is Safety/Performance slider value
		// CD$79 is warp core effect
		return -this.settings['Safety/Performance'] * this.component_warp_core_effect * Math.pow(2.0, Math.abs(this.settings['Safety/Performance']) / 2.0) / 100.0;
	}

	// CD$79
	get component_warp_core_effect() {
		return this.components.find(comp => comp.name === 'Warp Core Type').effect;
	}

	// CN column, 29 etc
	get cost_power() {
		return this.cost_power_components;
	}

	get cost_power_components() {
		return this.components.map(comp => comp.cost_power).reduce((sum, value) => sum + value, 0);
	}

	// CM column, 29 etc
	get cost_SR_mult() {
		// =CM18 * DU29
		// CM18 is principal frame SR cost
		// DU29 is 'SR-Mod' straight off part list
		return this.cost_SR_mult_raw * this.design.cost_SR_frame_mult;
	}

	get cost_SR_mult_raw() {
		return this.sub_frame_def['SR-Mod'];
	}

	// CM column, 20:24, 41 etc
	get cost_SR() {
		// straight sum of component costs
		return this.components.map(comp => comp.cost_SR).reduce((sum, value) => sum + value, 0);
	}

	// sum of component costs plus the frame cost
	get cost_BR() {
		return this.cost_BR_components + this.cost_BR_frame;
	}

	// CL column
	// CK column / br to weight mult
	get cost_BR_frame() {
		return this.weight_frame / BR_TO_WEIGHT_MULTIPLIER;
	}

	get cost_BR_components() {
		return this.components.map(comp => comp.cost_BR).reduce((sum, value) => sum + value, 0);
	}

	// CK20:CK25 column, [CK41, CK57, CK63, ...]
	// scalar
	get weight_external() {
		// =SUM(CK31:CK40)+CK29
		return this.weight_components_external;
	}

	// CK20:CK25 column, [CK41, CK57, CK63, ...]
	// scalar
	get weight_internal() {
		// =SUM(CK31:CK40)+CK29
		return this.weight_frame + this.weight_components_internal;
	}

	// CK29, DM29 if populated, DM29 is weight straight off frames list
	// scalar
	get weight_frame() {
		return this.sub_frame_def['Wt'] || 0;
	}

	// =SUM(CK31:CK40)
	// scalar
	get weight_components_external() {
		return this.components.map(comp => comp.weight_external).reduce((sum, value) => sum + value, 0);
	}

	// =SUM(CK31:CK40)
	// scalar
	get weight_components_internal() {
		return this.components.map(comp => comp.weight_internal).reduce((sum, value) => sum + value, 0);
	}

	// get weight_multiplier() {
	// 	return this.sub_frame_def[''] || 0;
	// };

	// [CE41 row;CE57 row;CE63 row] block
	get stats() {
		return this.components.map(comp => comp.stats).reduce((sum, value) => sum.add(value), new Statline({}));
	}

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
	}
};

class Module {
	constructor(db, design, design_module_json) {
		this.db = db;
		this.design = design;
		this.module_def = this.db.find_module(design_module_json['Type'], design_module_json['Variant']);
	}

	// CT88, DN88
	get build_time() {
		// straight off modules list
		return eval(this.module_def['Build Time']);
	}

	// CP-CR 88, DS-DU88
	// crewline
	get cost_crew() {
		// straight off parts list
		const map = [['officer', 'O'], ['enlisted', 'E'], ['technician', 'T']];
		let stat_block = map.reduce((res, [longname, shortname]) => {
			res[longname] = this.module_def[shortname];return res;
		}, {});
		return new Crewline(stat_block);
	}

	// CN25, CN88, DP88, straight from parts list
	get cost_power() {
		return this.module_def['Power Cost'];
	}

	// CM25, CM88, DO88
	// straight off parts list
	get cost_SR() {
		return this.module_def['SR Cost'];
	}

	// CL25, CL88
	get cost_BR() {
		// CK88 / AL7
		// CK88 is weight
		// AL7 is the br to weight constant
		return this.weight_total / BR_TO_WEIGHT_MULTIPLIER;
	}

	// CE88 row, CY88 row
	// statline
	get stats() {
		// pulled straight out of module definition
		const map = [['combat', 'C'], ['science', 'S'], ['hull', 'H'], ['shields', 'L'], ['presence', 'P'], ['defense', 'D']];
		let stat_block = map.reduce((res, [longname, shortname]) => {
			res[longname] = this.module_def[shortname];return res;
		}, {});
		return new Statline(stat_block);
	}

	// CK25, CK88, DM88
	// scalar
	// "Weight" value off module definition
	get weight_total() {
		return this.weight_internal + this.weight_external;
	}

	get weight_internal() {
		return 0;
	}

	get weight_external() {
		return this.module_def['Weight'];
	}

	// BK25, BK88
	// scalar
	get size() {
		// BK25 = rollbar size?, BK88
		// BK88 = rollbar size? = $CV88 / $AL$6
		return this.size_raw / SIZE_TO_WEIGHT_CAP_MULTIPLIER;
	}

	// CV88, DL88
	// scalar
	get size_raw() {
		// $CV88 = DL88 = module weight cap? = module weight cap from "Weight Cap" element of module
		return this.module_def['Weight Cap'];
	}
};

class Design {
	constructor(db, design_json) {
		this.db = db;
		this.name = design_json['Name'];
		this.princ_frame_def = this.db.find_frame(design_json['Principal Frame']);
		this.subsystems = design_json['Subsystems'].map(ss_json => new DesignSubsystem(this.db, this, ss_json)).sort((ssa, ssb) => SUBSYSTEM_SORT_ORDER[ssa.name] > SUBSYSTEM_SORT_ORDER[ssb.name]);
		this.module = new Module(db, this, design_json['Module']);
	}

	// CT27, CT26
	get build_time() {
		return Math.ceil(this.build_time_raw * 12) / 12;
	}

	// CT26
	get build_time_raw() {
		// =SUM(CT20:CT25)+CT$18
		return this.build_time_frame + this.build_time_subsystems + this.module.build_time;
	}

	// CT18, DN18
	get build_time_frame() {
		// "Build Time" off frames list
		return eval(this.princ_frame_def['Build Time']);
	}

	// sum of CT column on subsystems
	get build_time_subsystems() {
		return this.subsystems.map(ss => ss.build_time).reduce((sum, value) => sum + value, 0);
	}

	get evasion() {
		return Math.round(this.evasion_raw * 1e4) / 1e4;
	}

	// CD11
	get evasion_raw() {
		// =(MAX(0, 30 - (BK$26*3)) / 100) * (1+((CJ$40/DD$40*10)/100))
		// BK26 is size
		// CJ40 is D value for Impulse Engine Pwr
		// DD40 D mod for Impulse Engine Pwr
		return this.evasion_size_mult * this.evasion_subsystems;
	}

	get evasion_size_mult() {
		// =(MAX(0, 30 - (BK$26*3)) / 100)
		// for ease of programming: probability of all failing
		return Math.max(0, 30 - this.size * 3) / 100;
	}

	get evasion_subsystems() {
		return this.subsystems.map(ss => ss.evasion).filter(wcb => wcb).reduce((sum, value) => 1 - (1 - sum) * (1 - value), 0);
	}

	// CD13, DV84
	get warp_core_breach() {
		return this.warp_core_breach_subsystems;
	}

	get warp_core_breach_subsystems() {
		// for ease of programming: probability of all failing
		return this.subsystems.map(ss => ss.warp_core_breach).filter(wcb => wcb).reduce((sum, value) => 1 - (1 - sum) * (1 - value), 0);
	}

	// ($BK$26^0.7 / 2)
	// crewline
	get cost_crew_size_mod() {
		// BK26 is design size
		return Math.pow(this.size, 0.7) / 2;
		// return 1/2;
	}

	// CP$18 is DR18 is design principal frame 'O-Mod' off parts list
	// crewline
	get cost_crew_frame_mult() {
		const map = [['officer', 'O-Mod'], ['enlisted', 'E-Mod'], ['technician', 'T-Mod']];
		let crew_block = map.reduce((res, [longname, shortname]) => {
			res[longname] = this.princ_frame_def[shortname];return res;
		}, {});
		return new Crewline(crew_block);
	}

	// T,U,V 3; CP,CQ,CR 27
	// crewline
	get cost_crew() {
		// ceiling of CP,CQ,CR 26
		return this.cost_crew_raw.ceil;
	}

	// T,U,V 2
	// crewline
	get cost_crew_raw() {
		// CP,CQ,CR 26
		// sum of subsystem crew costs plus module crew cost
		return this.cost_crew_subsystems.add(this.module.cost_crew);
	}

	get cost_crew_subsystems() {
		return this.subsystems.map(ss => ss.cost_crew).reduce((sum, value) => sum.add(value), new Crewline({}));
	}

	get power_generation() {
		return Math.round(this.power_generation_raw);
	}

	get power_generation_raw() {
		return this.subsystems.map(ss => ss.power_generation).reduce((sum, value) => sum + value, 0);
	}

	// CE27 row
	get stats() {
		return this.stats_raw.floor;
	}

	// BL26, CE26 row
	get stats_raw() {
		return this.stats_components.add(this.stats_module);
	}

	get stats_components() {
		return this.subsystems.map(ss => ss.stats).reduce((sum, value) => sum.add(value), new Statline({}));
	}

	get stats_module() {
		return this.module.stats;
	}

	// O3, CK27
	// scalar
	get weight_total() {
		return Math.floor(this.weight_total_raw);
	}

	// O2, CK26
	// scalar
	get weight_external() {
		// =SUM(CK20:CK25)+CK$18
		return this.weight_subsystems_external + this.module.weight_external;
	}

	// O2, CK26
	// scalar
	get weight_internal() {
		// =SUM(CK20:CK25)+CK$18
		return this.weight_frame + this.weight_subsystems_internal + this.module.weight_internal;
	}

	// O2, CK26
	// scalar
	get weight_total_raw() {
		// =SUM(CK20:CK25)+CK$18
		return this.weight_external + this.weight_internal;
	}

	// CK26
	get weight_subsystems_internal() {
		// =SUM(CK20:CK25)
		// CK20:24 is subsystem weights
		// CK25 is module weight
		return this.subsystems.map(ss => ss.weight_internal).reduce((sum, value) => sum + value, 0);
	}

	// CK26
	get weight_subsystems_external() {
		// =SUM(CK20:CK25)
		// CK20:24 is subsystem weights
		// CK25 is module weight
		return this.subsystems.map(ss => ss.weight_external).reduce((sum, value) => sum + value, 0);
	}

	// CK$18, DM18
	// part frame weight
	get weight_frame() {
		return this.princ_frame_def['Wt'];
	}

	// P3, CL27
	get cost_BR() {
		// =CEILING(CL26,INDEX($AL$6:$AL$16,MATCH("BR Cost Round - "&$CD$9,$AJ$6:$AJ$16,0)))
		// ceiling(CL16, cost_BR_round)
		// round raw BR cost to next integer multiple of the rounding interval
		return Math.ceil(this.cost_BR_raw / this.cost_BR_round) * this.cost_BR_round;
	}

	get cost_BR_round() {
		// selects the appropriate interval to round BR to based on the class of the ship
		// INDEX($AL$6:$AL$16,MATCH("BR Cost Round - "&$CD$9,$AJ$6:$AJ$16,0))
		//
		// from the list of constants in AL, select the one in the row
		// that has concat("BR cost round", CD9) in AJ
		//
		// CD9 is weight class
		return BR_COST_ROUND_MAP[this.weight_class];
	}

	// CD9
	get weight_class() {
		// =IF(DK$18 = 1, "Frigate", IF(DK$18 = 2, "Cruiser", "Explorer"))
		return WEIGHT_CLASS_MAP[this.weight_class_raw];
	}

	// DK18
	get weight_class_raw() {
		// "Weight Class" value off of principal frame definition
		// integer in [1, 3]
		return this.princ_frame_def['Weight Class'];
	}

	// P2, CL26
	get cost_BR_raw() {
		// sum(subsystem BR costs) + module cost + frame cost
		return this.cost_BR_components + this.module.cost_BR + this.cost_BR_frame;
	}

	get cost_BR_components() {
		return this.subsystems.map(ss => ss.cost_BR).reduce((sum, value) => sum + value, 0);
	}

	// CL18
	// scalar
	get cost_BR_frame() {
		// CK18 / $AL$7
		// CK18 = DM18
		// DM18 is frame "Wt" value
		return this.weight_frame / BR_TO_WEIGHT_MULTIPLIER;
	}

	// CM18, DU18
	get cost_SR_frame_mult() {
		return this.princ_frame_def['SR-Mod'];
	}

	// Q2, CM27
	get cost_SR() {
		// =CEILING(CL26,INDEX($AL$6:$AL$16,MATCH("BR Cost Round - "&$CD$9,$AJ$6:$AJ$16,0)))
		// ceiling(CL16, cost_BR_round)
		// round raw BR cost to next integer multiple of the rounding interval
		return Math.ceil(this.cost_SR_raw / this.cost_SR_round) * this.cost_SR_round;
	}

	// Q3, CM26
	get cost_SR_raw() {
		// sum of subsystems plus module
		return this.cost_SR_subsystems + this.module.cost_SR;
	}

	get cost_SR_subsystems() {
		return this.subsystems.map(ss => ss.cost_SR).reduce((sum, value) => sum + value, 0);
	}

	get cost_SR_round() {
		// same as BR, basically
		return BR_COST_ROUND_MAP[this.weight_class];
	}

	// R2, CN27
	get cost_power() {
		// round, not floor or ceil!
		return Math.round(this.cost_power_raw);
	}

	// R3, CN26
	get cost_power_raw() {
		return this.cost_power_subsystems + this.module.cost_power;
	}

	get cost_power_subsystems() {
		return this.subsystems.map(ss => ss.cost_power).reduce((sum, value) => sum + value, 0);
	}

	// BK26
	get size() {
		// BK18 + BK88
		return this.frame_size + this.module.size;
	}

	// BK18, "Size"
	get frame_size() {
		// BK18 = $CV18 / $AL$6
		// $CV18 = weight cap, DL18, equal principal frame MaxSz
		// $AL$6 = "Size-To-Weight-Cap Multiplier", constant 300
		return this.frame_max_size_raw / SIZE_TO_WEIGHT_CAP_MULTIPLIER;
	}

	// CV18, DL18
	get frame_max_size_raw() {
		// 'MaxSz' item off principal frame definition
		return this.princ_frame_def['MaxSz'];
	}

	get pretty_statline() {
		return this.stats.toString() + ' - ' + this.cost_BR.toString() + 'br ' + this.cost_SR.toString() + 'sr ' + ' - ' + this.weight_total.toString() + 'kt ' + '[' + this.build_time.toFixed(2) + ']yr' + ' - ' + this.cost_crew.toString();
	}

	get pretty_miscstats() {
		return 'Evasion Chance: ' + (this.evasion * 100).toFixed(2) + "%\t" + 'Warp Core Breach Chance: ' + (this.warp_core_breach * 100).toFixed(2) + '%';
	}

	get pretty_summary() {
		const ID = 'Class: ' + this.name;
		return [ID, this.pretty_statline, this.pretty_miscstats].join("\n");
	}

	get pretty_statline_raw() {
		return this.stats_raw.toFixed(2) + ' - ' + '[' + this.cost_BR_raw.toFixed(2) + ']br [' + this.cost_SR_raw.toFixed(2) + ']sr ' + ' - ' + '[' + this.weight_total_raw.toFixed(2) + ']kt ' + '[' + this.build_time.toFixed(2) + ']yr' + ' - ' + this.cost_crew_raw.toFixed(2);
	}
	get pretty_buildinfo() {
		return 'Power[' + this.cost_power_raw.toFixed(2) + '/' + this.power_generation_raw.toFixed(2) + '] - ' + 'Internal[' + this.weight_internal.toFixed(1) + '/' + this.frame_max_size_raw + '] ' + this.subsystems.map(ss => ss.name + '[' + ss.weight_internal.toFixed(1) + '/' + ss.weight_cap.toFixed(0) + ']').join(' ');
	}

	get pretty_sdb_info() {
		return [this.pretty_statline_raw, this.pretty_buildinfo].join("\n");
	}

	get pretty_dump() {}
};

class DB {
	constructor({ parts, frames, modules }) {
		this.parts = parts;
		this.frames = frames;
		this.modules = modules;
	}

	find_module(type, variant) {
		return this.modules.find(elem => elem['Type'].trim() === type.trim() && elem['Variant'] === variant.trim());
	}

	find_part(name) {
		return this.parts.find(elem => elem['Name'].trim() === name.trim());
	}

	find_frame(name) {
		return this.frames.find(elem => elem['Name'].trim() === name.trim());
	}
};

module.exports.Design = Design;
module.exports.DB = DB;
module.exports.Statline = Statline;
module.exports.Crewline = Crewline;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = {"Subsystems":[{"Components":[{"Part":"[T2][L][C+] Type-I Block-A (40E) Warp Core","Quantity":2,"Name":"Warp Core Type"},{"Part":"[T2][L][R-C-] Luna-VI High-Efficiency M/AM System","Quantity":2,"Name":"M/AM Injectors"},{"Part":"[T2][L] Mk VIII Mod L Yoyodyne Coolant System","Quantity":2,"Name":"Coolant Systems"},{"Part":"[T3][M][R+] VSA-7 Pulse Injection Manifold","Quantity":3,"Name":"EPS Manifold System"},{"Part":"[T2] EngOS Monitoring - Anak-Krueger EM Rails","Quantity":1,"Name":"Eject System"}],"Settings":{"Safety/Performance":0},"Sub-Frame":"[T2] Md Frigate Warp Core Suite","Name":"Warp Core"},{"Components":[{"Part":"[T2][M] Type-VI SIF","Quantity":2,"Name":"Structural Integrity Fields"},{"Part":"[T1][L] Modulated Graviton Beam Deflector Saucer-Only","Quantity":3,"Name":"Navigational Deflector"},{"Part":"[T1][L] 2 X Centaur-A Pattern Nacelle","Quantity":1,"Name":"Nacelle System"},{"Part":"[T2][M] S-Medical Mk VI Protein Synth","Quantity":1,"Name":"Replication Package"},{"Part":"[T2][L] 2310-Light Pattern Deuterium Tanks","Quantity":3,"Name":"Fuel & Matter Stores"}],"Settings":{},"Sub-Frame":"[T2][OET-SR-] Md Frigate Engineering Suite","Name":"Engineering"},{"Components":[{"Part":"[T2][H] Mark-VII-Heavy LR Sensor Array","Quantity":2,"Name":"Long-Range Sensors"},{"Part":"[T2][H] Mark-VII-Heavy Nav Array","Quantity":2,"Name":"Navigational Sensors"},{"Part":"No Survey Sensors","Quantity":0,"Name":"Survey Sensors"},{"Part":"[T2][H] Spock-C Pattern Lab","Quantity":2,"Name":"Science Labs"},{"Part":"[T1][L] Type-III-A Duotronic Core","Quantity":3,"Name":"Computer Core"},{"Part":"[T2] Majel 3.1 OS","Quantity":3,"Name":"Operating System"},{"Part":"No Core","Quantity":0,"Name":"Secondary Core"},{"Part":"[T1][M] Lwaxana '04 General Protocol","Quantity":2,"Name":"Diplomatic Package"},{"Part":"No Onboard Recreation","Quantity":0,"Name":"Recreation Package"},{"Part":"[T2][H] T'Koren Pattern Large Sickbay","Quantity":4,"Name":"Sickbay"}],"Settings":{"Isolinear?":false},"Sub-Frame":"[T2][OE--] Lg Frigate Operations Suite","Name":"Operations"},{"Components":[{"Quantity":1,"Part":"[T2][L] Lt. Alloy-3 Duranium Hull","Name":"Hull System"}],"Settings":{},"Sub-Frame":"[T2] Sm Frigate Hull Suite","Name":"Hull"},{"Components":[{"Quantity":2,"Part":"[T-1][L] Model 68 Phaser Bank","Name":"Primary Phasers"},{"Quantity":0,"Part":"No Phasers","Name":"Secondary Phasers"},{"Quantity":0,"Part":"No Torp","Name":"Torpedo System"},{"Quantity":2,"Part":"[T2][H] Mark-VI-Heavy SR Lateral Sensor Array","Name":"Short-Range Sensors"},{"Quantity":1,"Part":"No TCU","Name":"Targeting Computer"},{"Quantity":5,"Part":"[T2][L] Mk-V-E Shield Gens","Name":"Deflector Shields"},{"Quantity":5,"Part":"[T2][L] Mk-V-E Shield Gens","Name":"Backup Deflectors"},{"Quantity":1,"Part":"[T2][M] SDB-09 High-Power Impulse Drive Sys","Name":"Impulse Engine Pwr"}],"Settings":{"Burst Launchers":true,"Phaser Arrays":false},"Sub-Frame":"[T1][SR+] Sm Frigate Tactical Suite","Name":"Tactical"}],"Module":{"Type":"Miranda Rollbar","Variant":"Science"},"Principal Frame":"[T1] 900kt Frigate Frame","Name":"[C8] Aledeth Kepler"}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = [{"Type Sort":1,"Type":"Phasers","Tier":-99,"Size Sort":-99,"Size Class":"N/A","Name":"No Phasers","Effect":0,"Weight O/H":0,"Scale Weight":0,"Unit Weight":0,"SR Cost x":0,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":0,"Size Class List":"Size Filter","Full Tier List":"Tier Filter"},{"Type Sort":1,"Type":"Phasers","Tier":-3,"Size Sort":1,"Size Class":"Light","Name":"[T-3][L] Model 31 Phaser Bank","Effect":0.28,"Weight O/H":4,"Scale Weight":0,"Unit Weight":6,"SR Cost x":0.05,"Pwr O/H":0.6,"Scale Pwr":0.8,"Unit Power":1.5,"O":0.18,"E":0.2,"T":0.03,"Reliability":1,"Year Available (SF)":2230,"Size Class List":"Light","Full Tier List":"T-3"},{"Type Sort":1,"Type":"Phasers","Tier":-3,"Size Sort":3,"Size Class":"Heavy","Name":"[T-3][H] Model 28 Twin Phaser Bank","Effect":0.425,"Weight O/H":8,"Scale Weight":0,"Unit Weight":12,"SR Cost x":0.06,"Pwr O/H":0.8,"Scale Pwr":0.8,"Unit Power":1.8,"O":0.35,"E":0.35,"T":0.05,"Reliability":1,"Year Available (SF)":2230,"Size Class List":"Medium","Full Tier List":"T-2"},{"Type Sort":1,"Type":"Phasers","Tier":-2,"Size Sort":1,"Size Class":"Light","Name":"[T-2][L] Model 47 Phaser Bank","Effect":0.32,"Weight O/H":4,"Scale Weight":0,"Unit Weight":6,"SR Cost x":0.05,"Pwr O/H":0.6,"Scale Pwr":0.8,"Unit Power":1.5,"O":0.18,"E":0.2,"T":0.03,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"Heavy","Full Tier List":"T-1"},{"Type Sort":1,"Type":"Phasers","Tier":-2,"Size Sort":3,"Size Class":"Heavy","Name":"[T-2][H] Model 44 Twin Phaser Bank","Effect":0.5,"Weight O/H":8,"Scale Weight":0,"Unit Weight":12,"SR Cost x":0.06,"Pwr O/H":0.8,"Scale Pwr":0.8,"Unit Power":1.8,"O":0.35,"E":0.35,"T":0.05,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":"T0"},{"Type Sort":1,"Type":"Phasers","Tier":-1,"Size Sort":1,"Size Class":"Light","Name":"[T-1][L] Model 68 Phaser Bank","Effect":0.36,"Weight O/H":4,"Scale Weight":0,"Unit Weight":6,"SR Cost x":0.05,"Pwr O/H":0.6,"Scale Pwr":0.8,"Unit Power":1.5,"O":0.18,"E":0.2,"T":0.03,"Reliability":1,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":"T1"},{"Type Sort":1,"Type":"Phasers","Tier":-1,"Size Sort":3,"Size Class":"Heavy","Name":"[T-1][H] Model 62 Twin Phaser Bank","Effect":0.625,"Weight O/H":8,"Scale Weight":0,"Unit Weight":12,"SR Cost x":0.06,"Pwr O/H":0.8,"Scale Pwr":0.8,"Unit Power":1.8,"O":0.35,"E":0.35,"T":0.05,"Reliability":1,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":"T2"},{"Type Sort":1,"Type":"Phasers","Tier":0,"Size Sort":1,"Size Class":"Light","Name":"[T0][L] Model 83 Phaser Bank","Effect":0.4,"Weight O/H":4,"Scale Weight":0,"Unit Weight":6,"SR Cost x":0.085,"Pwr O/H":0.65,"Scale Pwr":0.8,"Unit Power":1.1,"O":0.18,"E":0.2,"T":0.02,"Reliability":1,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":"T3"},{"Type Sort":1,"Type":"Phasers","Tier":0,"Size Sort":3,"Size Class":"Heavy","Name":"[T0][H] Model 83 Twin Phaser Bank","Effect":0.75,"Weight O/H":8,"Scale Weight":0,"Unit Weight":12,"SR Cost x":0.08,"Pwr O/H":1,"Scale Pwr":0.8,"Unit Power":2,"O":0.34,"E":0.34,"T":0.01,"Reliability":1,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":"T4"},{"Type Sort":1,"Type":"Phasers","Tier":1,"Size Sort":1,"Size Class":"Light","Name":"[T1][L] Type IV Single Phaser Bank","Effect":0.44,"Weight O/H":4,"Scale Weight":0,"Unit Weight":6,"SR Cost x":0.065,"Pwr O/H":3,"Scale Pwr":3,"Unit Power":2,"O":0.18,"E":0.2,"T":0.02,"Reliability":0.995,"Year Available (SF)":2313,"Size Class List":"","Full Tier List":""},{"Type Sort":1,"Type":"Phasers","Tier":1,"Size Sort":3,"Size Class":"Heavy","Name":"[T1][H] Type-IV Twin Phaser Bank","Effect":0.825,"Weight O/H":8,"Scale Weight":0,"Unit Weight":14,"SR Cost x":0.08,"Pwr O/H":5,"Scale Pwr":2.5,"Unit Power":1.75,"O":0.33,"E":0.33,"T":0.01,"Reliability":0.99995,"Year Available (SF)":2313,"Size Class List":"","Full Tier List":""},{"Type Sort":1,"Type":"Phasers","Tier":2,"Size Sort":1,"Size Class":"Light","Name":"[T2][L] Type V Single Phaser Bank","Effect":0.48,"Weight O/H":4,"Scale Weight":0,"Unit Weight":6,"SR Cost x":0.065,"Pwr O/H":3,"Scale Pwr":3,"Unit Power":2,"O":0.175,"E":0.19,"T":0.02,"Reliability":0.995,"Year Available (SF)":2316,"Size Class List":"","Full Tier List":""},{"Type Sort":1,"Type":"Phasers","Tier":2,"Size Sort":3,"Size Class":"Heavy","Name":"[T2][H] Type-V Twin Phaser Bank","Effect":0.9,"Weight O/H":8,"Scale Weight":0,"Unit Weight":14,"SR Cost x":0.08,"Pwr O/H":5,"Scale Pwr":2.5,"Unit Power":1.75,"O":0.32,"E":0.32,"T":0.01,"Reliability":0.99995,"Year Available (SF)":2316,"Size Class List":"","Full Tier List":""},{"Type Sort":1,"Type":"Phasers","Tier":3,"Size Sort":1,"Size Class":"Light","Name":"[T3][L] Type VI Single Phaser Bank","Effect":0.52,"Weight O/H":4,"Scale Weight":0,"Unit Weight":6,"SR Cost x":0.065,"Pwr O/H":3,"Scale Pwr":3,"Unit Power":2,"O":0.175,"E":0.19,"T":0.02,"Reliability":0.995,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":1,"Type":"Phasers","Tier":3,"Size Sort":3,"Size Class":"Heavy","Name":"[T3][H] Type-VI Twin Phaser Bank","Effect":0.975,"Weight O/H":8,"Scale Weight":0,"Unit Weight":14,"SR Cost x":0.08,"Pwr O/H":5,"Scale Pwr":2.5,"Unit Power":1.75,"O":0.32,"E":0.32,"T":0.01,"Reliability":0.99995,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":1,"Type":"Phasers","Tier":4,"Size Sort":1,"Size Class":"Light","Name":"[T4][L] Type IX Experimental Phaser Array Mid Bank","Effect":0.8,"Weight O/H":8,"Scale Weight":0,"Unit Weight":10,"SR Cost x":0.13,"Pwr O/H":3,"Scale Pwr":3,"Unit Power":2,"O":0.225,"E":0.25,"T":0.025,"Reliability":0.995,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":1,"Type":"Phasers","Tier":4,"Size Sort":3,"Size Class":"Heavy","Name":"[T4][H] Type-IX Experimental Phaser Array Full Bank","Effect":1.2,"Weight O/H":12,"Scale Weight":0,"Unit Weight":20,"SR Cost x":0.16,"Pwr O/H":5,"Scale Pwr":2.5,"Unit Power":1.75,"O":0.35,"E":0.35,"T":0.02,"Reliability":0.99995,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":1,"Type":"Phasers","Tier":99,"Size Sort":99,"Size Class":"","Name":"x[T-2] Type 48 Phaser Bank","Effect":"","Weight O/H":"","Scale Weight":"","Unit Weight":"","SR Cost x":"","Pwr O/H":"","Scale Pwr":"","Unit Power":"","O":"","E":"","T":"","Reliability":0.995,"Year Available (SF)":0,"Size Class List":"","Full Tier List":""},{"Type Sort":2,"Type":"Torpedoes","Tier":-99,"Size Sort":-99,"Size Class":"N/A","Name":"No Torp","Effect":0,"Weight O/H":0,"Scale Weight":0,"Unit Weight":0,"SR Cost x":0,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":2,"Type":"Torpedoes","Tier":-3,"Size Sort":2,"Size Class":"Medium","Name":"[T-3][M] TSF-2 Torpedo System","Effect":0.4,"Weight O/H":12,"Scale Weight":0,"Unit Weight":10,"SR Cost x":0.035,"Pwr O/H":2.5,"Scale Pwr":0.1,"Unit Power":0.75,"O":0.2,"E":0.2,"T":0,"Reliability":1,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":2,"Type":"Torpedoes","Tier":-3,"Size Sort":3,"Size Class":"Heavy","Name":"[T-3][H] Mod 3a Battery System","Effect":0.4,"Weight O/H":16,"Scale Weight":0,"Unit Weight":11,"SR Cost x":0.07,"Pwr O/H":5,"Scale Pwr":0.05,"Unit Power":0.5,"O":0.15,"E":0.15,"T":0,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":2,"Type":"Torpedoes","Tier":-2,"Size Sort":2,"Size Class":"Medium","Name":"[T-2][M] TSF-3 Torpedo System","Effect":0.45,"Weight O/H":12,"Scale Weight":0,"Unit Weight":10,"SR Cost x":0.035,"Pwr O/H":2.5,"Scale Pwr":0.1,"Unit Power":0.75,"O":0.2,"E":0.2,"T":0,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":2,"Type":"Torpedoes","Tier":-2,"Size Sort":3,"Size Class":"Heavy","Name":"[T-2][H] Mod 4 Battery System","Effect":0.45,"Weight O/H":16,"Scale Weight":0,"Unit Weight":11,"SR Cost x":0.07,"Pwr O/H":5,"Scale Pwr":0.05,"Unit Power":0.5,"O":0.15,"E":0.15,"T":0,"Reliability":1,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":2,"Type":"Torpedoes","Tier":-1,"Size Sort":2,"Size Class":"Medium","Name":"[T-1][M] Mk-I Torpedo System","Effect":0.5,"Weight O/H":12,"Scale Weight":0,"Unit Weight":10,"SR Cost x":0.035,"Pwr O/H":2.5,"Scale Pwr":0.1,"Unit Power":0.75,"O":0.2,"E":0.2,"T":0,"Reliability":1,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":2,"Type":"Torpedoes","Tier":-1,"Size Sort":3,"Size Class":"Heavy","Name":"[T-1][H] Type-I Auto System","Effect":0.5,"Weight O/H":16,"Scale Weight":0,"Unit Weight":11,"SR Cost x":0.07,"Pwr O/H":5,"Scale Pwr":0.05,"Unit Power":0.5,"O":0.15,"E":0.15,"T":0,"Reliability":1,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":2,"Type":"Torpedoes","Tier":0,"Size Sort":1,"Size Class":"Light","Name":"[T0][L] Mk-II LW Torpedo System","Effect":0.55,"Weight O/H":8,"Scale Weight":0,"Unit Weight":10,"SR Cost x":0.08,"Pwr O/H":5,"Scale Pwr":0.3,"Unit Power":1,"O":0.18,"E":0.18,"T":0,"Reliability":0.9995,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":2,"Type":"Torpedoes","Tier":0,"Size Sort":2,"Size Class":"Medium","Name":"[T0][M] Mk-II Torpedo System","Effect":0.55,"Weight O/H":12,"Scale Weight":0,"Unit Weight":10,"SR Cost x":0.045,"Pwr O/H":2.5,"Scale Pwr":0.2,"Unit Power":0.75,"O":0.2,"E":0.2,"T":0,"Reliability":0.99995,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":2,"Type":"Torpedoes","Tier":0,"Size Sort":3,"Size Class":"Heavy","Name":"[T0][H] Type-II Auto System","Effect":0.55,"Weight O/H":16,"Scale Weight":0,"Unit Weight":11,"SR Cost x":0.09,"Pwr O/H":5,"Scale Pwr":0.1,"Unit Power":0.5,"O":0.15,"E":0.15,"T":0,"Reliability":1,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":2,"Type":"Torpedoes","Tier":1,"Size Sort":1,"Size Class":"Light","Name":"[T1][L] Mk-III LW Torpedo System","Effect":0.6,"Weight O/H":8,"Scale Weight":0,"Unit Weight":9.5,"SR Cost x":0.085,"Pwr O/H":4.5,"Scale Pwr":0.25,"Unit Power":1,"O":0.18,"E":0.18,"T":0,"Reliability":0.9995,"Year Available (SF)":2313,"Size Class List":"","Full Tier List":""},{"Type Sort":2,"Type":"Torpedoes","Tier":1,"Size Sort":2,"Size Class":"Medium","Name":"[T1][M] Mk-III Torpedo System","Effect":0.6,"Weight O/H":12,"Scale Weight":0,"Unit Weight":9.5,"SR Cost x":0.0475,"Pwr O/H":2.25,"Scale Pwr":0.175,"Unit Power":0.75,"O":0.2,"E":0.2,"T":0,"Reliability":0.9998,"Year Available (SF)":2313,"Size Class List":"","Full Tier List":""},{"Type Sort":2,"Type":"Torpedoes","Tier":1,"Size Sort":3,"Size Class":"Heavy","Name":"[T1][H] Type-III Auto System","Effect":0.6,"Weight O/H":15.5,"Scale Weight":0,"Unit Weight":10.5,"SR Cost x":0.095,"Pwr O/H":4.5,"Scale Pwr":0.1,"Unit Power":0.5,"O":0.15,"E":0.15,"T":0,"Reliability":1,"Year Available (SF)":2313,"Size Class List":"","Full Tier List":""},{"Type Sort":2,"Type":"Torpedoes","Tier":2,"Size Sort":1,"Size Class":"Light","Name":"[T2][L] Mk-IV LW Torpedo System","Effect":0.65,"Weight O/H":8,"Scale Weight":0,"Unit Weight":9,"SR Cost x":0.09,"Pwr O/H":4,"Scale Pwr":0.2,"Unit Power":1,"O":0.18,"E":0.18,"T":0,"Reliability":0.9995,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":2,"Type":"Torpedoes","Tier":2,"Size Sort":2,"Size Class":"Medium","Name":"[T2][M][SR-] Mk-IV Torpedo System","Effect":0.65,"Weight O/H":12,"Scale Weight":0,"Unit Weight":9,"SR Cost x":0.05,"Pwr O/H":2,"Scale Pwr":0.15,"Unit Power":0.75,"O":0.2,"E":0.2,"T":0,"Reliability":0.9998,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":2,"Type":"Torpedoes","Tier":2,"Size Sort":3,"Size Class":"Heavy","Name":"[T2][H][C-] Type-IV Auto System","Effect":0.65,"Weight O/H":15,"Scale Weight":0,"Unit Weight":10,"SR Cost x":0.1,"Pwr O/H":4,"Scale Pwr":0.1,"Unit Power":0.5,"O":0.15,"E":0.15,"T":0,"Reliability":1,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":2,"Type":"Torpedoes","Tier":3,"Size Sort":1,"Size Class":"Light","Name":"[T3][L] Mk-V LW Torpedo System","Effect":0.7,"Weight O/H":8,"Scale Weight":0,"Unit Weight":9,"SR Cost x":0.09,"Pwr O/H":4,"Scale Pwr":0.2,"Unit Power":1,"O":0.18,"E":0.18,"T":0,"Reliability":0.9995,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":2,"Type":"Torpedoes","Tier":3,"Size Sort":2,"Size Class":"Medium","Name":"[T3][M][SR-] Mk-V Torpedo System","Effect":0.7,"Weight O/H":12,"Scale Weight":0,"Unit Weight":9,"SR Cost x":0.05,"Pwr O/H":2,"Scale Pwr":0.15,"Unit Power":0.75,"O":0.2,"E":0.2,"T":0,"Reliability":0.9998,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":2,"Type":"Torpedoes","Tier":3,"Size Sort":3,"Size Class":"Heavy","Name":"[T3][H][C-] Type-V Auto System","Effect":0.7,"Weight O/H":15,"Scale Weight":0,"Unit Weight":10,"SR Cost x":0.1,"Pwr O/H":4,"Scale Pwr":0.1,"Unit Power":0.5,"O":0.15,"E":0.15,"T":0,"Reliability":1,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":3,"Type":"Long-Range Sensors","Tier":-99,"Size Sort":-99,"Size Class":"N/A","Name":"No Sensor","Effect":0,"Weight O/H":0,"Scale Weight":0,"Unit Weight":0,"SR Cost x":0,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":0,"Size Class List":"","Full Tier List":""},{"Type Sort":3,"Type":"Long-Range Sensors","Tier":-3,"Size Sort":1,"Size Class":"Light","Name":"[T-3][L] Mark-I-Light LR Sensor Array","Effect":0.15,"Weight O/H":1,"Scale Weight":0,"Unit Weight":7,"SR Cost x":0.08,"Pwr O/H":0.5,"Scale Pwr":0,"Unit Power":1,"O":0.04,"E":0.08,"T":0.12,"Reliability":0.9995,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":3,"Type":"Long-Range Sensors","Tier":-3,"Size Sort":2,"Size Class":"Medium","Name":"[T-3][M] Mark-I-Heavy LR Sensors","Effect":0.225,"Weight O/H":5,"Scale Weight":0,"Unit Weight":12.5,"SR Cost x":0.06,"Pwr O/H":0.45,"Scale Pwr":0,"Unit Power":1,"O":0.06,"E":0.16,"T":0.3,"Reliability":1,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":3,"Type":"Long-Range Sensors","Tier":-3,"Size Sort":3,"Size Class":"Heavy","Name":"[T-3][H] Mark-II-Heavy LR Sensor Array","Effect":0.4,"Weight O/H":5,"Scale Weight":0,"Unit Weight":19,"SR Cost x":0.13,"Pwr O/H":0.45,"Scale Pwr":0,"Unit Power":1.1,"O":0.05,"E":0.07,"T":0.12,"Reliability":1,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":3,"Type":"Long-Range Sensors","Tier":-2,"Size Sort":1,"Size Class":"Light","Name":"[T-2][L] Mark-II-Light LR Sensor Array","Effect":0.175,"Weight O/H":1,"Scale Weight":0,"Unit Weight":7,"SR Cost x":0.08,"Pwr O/H":0.5,"Scale Pwr":0,"Unit Power":1,"O":0.04,"E":0.08,"T":0.12,"Reliability":0.9995,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":3,"Type":"Long-Range Sensors","Tier":-2,"Size Sort":2,"Size Class":"Medium","Name":"[T-2][M] Mark-II-Heavy LR Sensors","Effect":0.25,"Weight O/H":5,"Scale Weight":0,"Unit Weight":12.5,"SR Cost x":0.06,"Pwr O/H":0.45,"Scale Pwr":0,"Unit Power":1,"O":0.06,"E":0.16,"T":0.3,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":3,"Type":"Long-Range Sensors","Tier":-2,"Size Sort":3,"Size Class":"Heavy","Name":"[T-2][H] Mark-III-Heavy LR Sensor Array","Effect":0.45,"Weight O/H":5,"Scale Weight":0,"Unit Weight":19,"SR Cost x":0.13,"Pwr O/H":0.45,"Scale Pwr":0,"Unit Power":1.1,"O":0.05,"E":0.07,"T":0.12,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":3,"Type":"Long-Range Sensors","Tier":-1,"Size Sort":1,"Size Class":"Light","Name":"[T-1][L] Mark-III-Light LR Sensor Array","Effect":0.2,"Weight O/H":1,"Scale Weight":0,"Unit Weight":7,"SR Cost x":0.08,"Pwr O/H":0.5,"Scale Pwr":0,"Unit Power":1,"O":0.04,"E":0.08,"T":0.12,"Reliability":0.9995,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":3,"Type":"Long-Range Sensors","Tier":-1,"Size Sort":2,"Size Class":"Medium","Name":"[T-1][M] Mark-III-Heavy LR Sensors","Effect":0.275,"Weight O/H":5,"Scale Weight":0,"Unit Weight":12.5,"SR Cost x":0.06,"Pwr O/H":0.45,"Scale Pwr":0,"Unit Power":1,"O":0.06,"E":0.16,"T":0.3,"Reliability":1,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":3,"Type":"Long-Range Sensors","Tier":-1,"Size Sort":3,"Size Class":"Heavy","Name":"[T-1][H] Mark-IV-Heavy LR Sensor Array","Effect":0.475,"Weight O/H":5,"Scale Weight":0,"Unit Weight":19,"SR Cost x":0.13,"Pwr O/H":0.45,"Scale Pwr":0,"Unit Power":1.1,"O":0.05,"E":0.07,"T":0.12,"Reliability":1,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":3,"Type":"Long-Range Sensors","Tier":-2,"Size Sort":1,"Size Class":"Light","Name":"[T-2][L] Civilian Grade LR Sensor Array","Effect":0.1,"Weight O/H":0.5,"Scale Weight":0,"Unit Weight":5,"SR Cost x":0.1,"Pwr O/H":0.5,"Scale Pwr":0,"Unit Power":0.5,"O":0.05,"E":0.04,"T":0.06,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":3,"Type":"Long-Range Sensors","Tier":0,"Size Sort":1,"Size Class":"Light","Name":"[T0][L] Mark-V-Light LR Sensor Array","Effect":0.225,"Weight O/H":1,"Scale Weight":0,"Unit Weight":7,"SR Cost x":0.12,"Pwr O/H":0.6,"Scale Pwr":0,"Unit Power":1.2,"O":0.03,"E":0.1,"T":0.135,"Reliability":0.9995,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":3,"Type":"Long-Range Sensors","Tier":0,"Size Sort":2,"Size Class":"Medium","Name":"[T0][M] Mark-V LR Sensor Array","Effect":0.3,"Weight O/H":2,"Scale Weight":0,"Unit Weight":11,"SR Cost x":0.11,"Pwr O/H":0.6,"Scale Pwr":0,"Unit Power":1.4,"O":0.06,"E":0.15,"T":0.15,"Reliability":1,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":3,"Type":"Long-Range Sensors","Tier":0,"Size Sort":3,"Size Class":"Heavy","Name":"[T0][H] Mark-V-Heavy LR Sensor Array","Effect":0.5,"Weight O/H":5,"Scale Weight":0,"Unit Weight":19,"SR Cost x":0.1,"Pwr O/H":0.6,"Scale Pwr":0,"Unit Power":1.2,"O":0.05,"E":0.07,"T":0.12,"Reliability":1,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":3,"Type":"Long-Range Sensors","Tier":1,"Size Sort":1,"Size Class":"Light","Name":"[T1][L] Mark-VI-Light LR Sensor Array","Effect":0.225,"Weight O/H":1,"Scale Weight":0,"Unit Weight":6.75,"SR Cost x":0.18,"Pwr O/H":0.6,"Scale Pwr":0,"Unit Power":1.3,"O":0.03,"E":0.1,"T":0.135,"Reliability":0.9995,"Year Available (SF)":2305,"Size Class List":"","Full Tier List":""},{"Type Sort":3,"Type":"Long-Range Sensors","Tier":1,"Size Sort":2,"Size Class":"Medium","Name":"[T1][M] Mark-VI LR Sensor Array","Effect":0.325,"Weight O/H":2,"Scale Weight":0,"Unit Weight":9.5,"SR Cost x":0.1,"Pwr O/H":0.6,"Scale Pwr":0,"Unit Power":1.3,"O":0.06,"E":0.15,"T":0.15,"Reliability":1,"Year Available (SF)":2305,"Size Class List":"","Full Tier List":""},{"Type Sort":3,"Type":"Long-Range Sensors","Tier":1,"Size Sort":3,"Size Class":"Heavy","Name":"[T1][H] Mark-VI-Heavy LR Sensor Array","Effect":0.525,"Weight O/H":5,"Scale Weight":0,"Unit Weight":18,"SR Cost x":0.08,"Pwr O/H":0.6,"Scale Pwr":0,"Unit Power":1.3,"O":0.05,"E":0.07,"T":0.12,"Reliability":1,"Year Available (SF)":2305,"Size Class List":"","Full Tier List":""},{"Type Sort":3,"Type":"Long-Range Sensors","Tier":2,"Size Sort":1,"Size Class":"Light","Name":"[T2][L] Mark-VII-Light LR Sensor Array","Effect":0.25,"Weight O/H":1,"Scale Weight":0,"Unit Weight":7.25,"SR Cost x":0.18,"Pwr O/H":0.6,"Scale Pwr":0,"Unit Power":1.3,"O":0.03,"E":0.1,"T":0.135,"Reliability":0.9995,"Year Available (SF)":2310,"Size Class List":"","Full Tier List":""},{"Type Sort":3,"Type":"Long-Range Sensors","Tier":2,"Size Sort":2,"Size Class":"Medium","Name":"[T2][M] Mark-VII LR Sensor Array","Effect":0.35,"Weight O/H":2,"Scale Weight":0,"Unit Weight":10,"SR Cost x":0.1,"Pwr O/H":0.6,"Scale Pwr":0,"Unit Power":1.4,"O":0.06,"E":0.15,"T":0.15,"Reliability":1,"Year Available (SF)":2310,"Size Class List":"","Full Tier List":""},{"Type Sort":3,"Type":"Long-Range Sensors","Tier":2,"Size Sort":3,"Size Class":"Heavy","Name":"[T2][H] Mark-VII-Heavy LR Sensor Array","Effect":0.55,"Weight O/H":5,"Scale Weight":0,"Unit Weight":18,"SR Cost x":0.08,"Pwr O/H":0.6,"Scale Pwr":0,"Unit Power":1.3,"O":0.05,"E":0.07,"T":0.12,"Reliability":1,"Year Available (SF)":2310,"Size Class List":"","Full Tier List":""},{"Type Sort":3,"Type":"Long-Range Sensors","Tier":3,"Size Sort":1,"Size Class":"Light","Name":"[T3][L] Mark-VIII-Light LR Sensor Array","Effect":0.275,"Weight O/H":1,"Scale Weight":0,"Unit Weight":7.5,"SR Cost x":0.18,"Pwr O/H":0.6,"Scale Pwr":0,"Unit Power":1.3,"O":0.03,"E":0.1,"T":0.135,"Reliability":0.9995,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":3,"Type":"Long-Range Sensors","Tier":3,"Size Sort":2,"Size Class":"Medium","Name":"[T3][M] Mark-VIII LR Sensor Array","Effect":0.375,"Weight O/H":2,"Scale Weight":0,"Unit Weight":11,"SR Cost x":0.1,"Pwr O/H":0.6,"Scale Pwr":0,"Unit Power":1.4,"O":0.06,"E":0.15,"T":0.15,"Reliability":1,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":3,"Type":"Long-Range Sensors","Tier":3,"Size Sort":3,"Size Class":"Heavy","Name":"[T3][H] Mark-VIII-Heavy LR Sensor Array","Effect":0.575,"Weight O/H":5,"Scale Weight":0,"Unit Weight":19,"SR Cost x":0.08,"Pwr O/H":0.6,"Scale Pwr":0,"Unit Power":1.3,"O":0.05,"E":0.07,"T":0.12,"Reliability":1,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":3,"Type":"Long-Range Sensors","Tier":99,"Size Sort":99,"Size Class":"","Name":"x[T1] Subspace Flux Detector *","Effect":"","Weight O/H":"","Scale Weight":"","Unit Weight":"","SR Cost x":"","Pwr O/H":"","Scale Pwr":"","Unit Power":"","O":"","E":"","T":"","Reliability":"","Year Available (SF)":"","Size Class List":"","Full Tier List":""},{"Type Sort":3,"Type":"Long-Range Sensors","Tier":99,"Size Sort":99,"Size Class":"","Name":"x[T2] Subspace Pulse Scanner *","Effect":"","Weight O/H":"","Scale Weight":"","Unit Weight":"","SR Cost x":"","Pwr O/H":"","Scale Pwr":"","Unit Power":"","O":"","E":"","T":"","Reliability":"","Year Available (SF)":"","Size Class List":"","Full Tier List":""},{"Type Sort":3,"Type":"Long-Range Sensors","Tier":99,"Size Sort":99,"Size Class":"","Name":"x[T3] Subspace Phased Array Scanner *","Effect":"","Weight O/H":"","Scale Weight":"","Unit Weight":"","SR Cost x":"","Pwr O/H":"","Scale Pwr":"","Unit Power":"","O":"","E":"","T":"","Reliability":"","Year Available (SF)":"","Size Class List":"","Full Tier List":""},{"Type Sort":3,"Type":"Long-Range Sensors","Tier":99,"Size Sort":99,"Size Class":"","Name":"x[T4] Subspace Interferometry Suite *","Effect":"","Weight O/H":"","Scale Weight":"","Unit Weight":"","SR Cost x":"","Pwr O/H":"","Scale Pwr":"","Unit Power":"","O":"","E":"","T":"","Reliability":"","Year Available (SF)":"","Size Class List":"","Full Tier List":""},{"Type Sort":4,"Type":"Short-Range Sensors","Tier":-99,"Size Sort":-99,"Size Class":"N/A","Name":"No Sensor","Effect":0,"Weight O/H":0,"Scale Weight":0,"Unit Weight":0,"SR Cost x":0,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":0,"Size Class List":"","Full Tier List":""},{"Type Sort":4,"Type":"Short-Range Sensors","Tier":-3,"Size Sort":1,"Size Class":"Light","Name":"[T-3][L] Mark-I-Light SR Lateral Sensor Array","Effect":0.25,"Weight O/H":1,"Scale Weight":0,"Unit Weight":8,"SR Cost x":0.1,"Pwr O/H":0.5,"Scale Pwr":0,"Unit Power":1,"O":0.04,"E":0.08,"T":0.12,"Reliability":1,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":4,"Type":"Short-Range Sensors","Tier":-3,"Size Sort":2,"Size Class":"Medium","Name":"[T-3][M] Mark-I-Medium SR Lateral Sensor Array","Effect":0.375,"Weight O/H":5,"Scale Weight":0,"Unit Weight":12,"SR Cost x":0.06,"Pwr O/H":0.6,"Scale Pwr":0,"Unit Power":1.1,"O":0.05,"E":0.07,"T":0.12,"Reliability":1,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":4,"Type":"Short-Range Sensors","Tier":-3,"Size Sort":3,"Size Class":"Heavy","Name":"[T-3][H] Mark-I-Heavy SR Lateral Sensor Array","Effect":0.5,"Weight O/H":5,"Scale Weight":0,"Unit Weight":21.5,"SR Cost x":0.05,"Pwr O/H":0.5,"Scale Pwr":0,"Unit Power":1,"O":0.04,"E":0.12,"T":0.225,"Reliability":1,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":4,"Type":"Short-Range Sensors","Tier":-2,"Size Sort":"No","Size Class":"Light","Name":"[T-2][L] Mark-III-Light SR Lateral Sensor Array","Effect":0.275,"Weight O/H":1,"Scale Weight":0,"Unit Weight":8,"SR Cost x":0.1,"Pwr O/H":0.5,"Scale Pwr":0,"Unit Power":1,"O":0.04,"E":0.08,"T":0.12,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":4,"Type":"Short-Range Sensors","Tier":-2,"Size Sort":2,"Size Class":"Medium","Name":"[T-2][M] Mark-III-Medium SR Lateral Sensor Array","Effect":0.45,"Weight O/H":5,"Scale Weight":0,"Unit Weight":12,"SR Cost x":0.06,"Pwr O/H":0.6,"Scale Pwr":0,"Unit Power":1.1,"O":0.05,"E":0.07,"T":0.12,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":4,"Type":"Short-Range Sensors","Tier":-2,"Size Sort":3,"Size Class":"Heavy","Name":"[T-2][H] Mark-III-Heavy SR Lateral Sensor Array","Effect":0.55,"Weight O/H":5,"Scale Weight":0,"Unit Weight":21.5,"SR Cost x":0.05,"Pwr O/H":0.5,"Scale Pwr":0,"Unit Power":1,"O":0.04,"E":0.12,"T":0.225,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":4,"Type":"Short-Range Sensors","Tier":-2,"Size Sort":1,"Size Class":"Light","Name":"[T-2][L] Civilian Grade SR Lateral Sensor","Effect":0.1,"Weight O/H":0.5,"Scale Weight":0,"Unit Weight":5,"SR Cost x":0.1,"Pwr O/H":0.5,"Scale Pwr":0,"Unit Power":0.5,"O":0.02,"E":0.04,"T":0.06,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":4,"Type":"Short-Range Sensors","Tier":0,"Size Sort":1,"Size Class":"Light","Name":"[T0][L] Mark-IV SR Lateral Sensor Array","Effect":0.3,"Weight O/H":1.5,"Scale Weight":0,"Unit Weight":8,"SR Cost x":0.1,"Pwr O/H":0.6,"Scale Pwr":0,"Unit Power":1.1,"O":0.02,"E":0.06,"T":0.09,"Reliability":1,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":4,"Type":"Short-Range Sensors","Tier":0,"Size Sort":2,"Size Class":"Medium","Name":"[T0][M] Mark-IV-Heavy SR Lateral Sensor Array","Effect":0.475,"Weight O/H":5,"Scale Weight":0,"Unit Weight":12,"SR Cost x":0.06,"Pwr O/H":0.6,"Scale Pwr":0,"Unit Power":1.1,"O":0.05,"E":0.07,"T":0.12,"Reliability":1,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":4,"Type":"Short-Range Sensors","Tier":0,"Size Sort":3,"Size Class":"Heavy","Name":"[T0][H] Mark-V-Heavy SR Lateral Sensor Array","Effect":0.65,"Weight O/H":5,"Scale Weight":0,"Unit Weight":21.5,"SR Cost x":0.06,"Pwr O/H":0.6,"Scale Pwr":0,"Unit Power":1.2,"O":0.025,"E":0.06,"T":0.105,"Reliability":1,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":4,"Type":"Short-Range Sensors","Tier":1,"Size Sort":1,"Size Class":"Light","Name":"[T1][L] Mark-VB-Light SR Lateral Sensor Array","Effect":0.2375,"Weight O/H":1,"Scale Weight":0,"Unit Weight":7.75,"SR Cost x":0.1,"Pwr O/H":0.7,"Scale Pwr":0,"Unit Power":1.15,"O":0.025,"E":0.1,"T":0.135,"Reliability":0.9995,"Year Available (SF)":2305,"Size Class List":"","Full Tier List":""},{"Type Sort":4,"Type":"Short-Range Sensors","Tier":1,"Size Sort":2,"Size Class":"Medium","Name":"[T1][M] Mark-VB SR Lateral Sensor Array","Effect":0.335,"Weight O/H":1.5,"Scale Weight":0,"Unit Weight":11.75,"SR Cost x":0.1,"Pwr O/H":0.7,"Scale Pwr":0,"Unit Power":1.15,"O":0.025,"E":0.06,"T":0.105,"Reliability":0.99999,"Year Available (SF)":2305,"Size Class List":"","Full Tier List":""},{"Type Sort":4,"Type":"Short-Range Sensors","Tier":1,"Size Sort":3,"Size Class":"Heavy","Name":"[T1][H] Mark-VB-Heavy SR Lateral Sensor Array","Effect":0.7,"Weight O/H":5,"Scale Weight":0,"Unit Weight":21,"SR Cost x":0.06,"Pwr O/H":0.7,"Scale Pwr":0,"Unit Power":1.15,"O":0.05,"E":0.1,"T":0.135,"Reliability":1,"Year Available (SF)":2305,"Size Class List":"","Full Tier List":""},{"Type Sort":4,"Type":"Short-Range Sensors","Tier":2,"Size Sort":1,"Size Class":"Light","Name":"[T2][L] Mark-VI-Light SR Lateral Sensor Array","Effect":0.25,"Weight O/H":1,"Scale Weight":0,"Unit Weight":7.6,"SR Cost x":0.12,"Pwr O/H":0.8,"Scale Pwr":0,"Unit Power":1.3,"O":0.025,"E":0.1,"T":0.135,"Reliability":0.9995,"Year Available (SF)":2312,"Size Class List":"","Full Tier List":""},{"Type Sort":4,"Type":"Short-Range Sensors","Tier":2,"Size Sort":2,"Size Class":"Medium","Name":"[T2][M] Mark-VI SR Lateral Sensor Array","Effect":0.35,"Weight O/H":1.5,"Scale Weight":0,"Unit Weight":11.6,"SR Cost x":0.1,"Pwr O/H":0.8,"Scale Pwr":0,"Unit Power":1.3,"O":0.06,"E":0.12,"T":0.15,"Reliability":0.99999,"Year Available (SF)":2312,"Size Class List":"","Full Tier List":""},{"Type Sort":4,"Type":"Short-Range Sensors","Tier":2,"Size Sort":3,"Size Class":"Heavy","Name":"[T2][H] Mark-VI-Heavy SR Lateral Sensor Array","Effect":0.75,"Weight O/H":5,"Scale Weight":0,"Unit Weight":20.75,"SR Cost x":0.06,"Pwr O/H":0.8,"Scale Pwr":0,"Unit Power":1.3,"O":0.05,"E":0.1,"T":0.135,"Reliability":1,"Year Available (SF)":2312,"Size Class List":"","Full Tier List":""},{"Type Sort":4,"Type":"Short-Range Sensors","Tier":3,"Size Sort":1,"Size Class":"Light","Name":"[T3][L] Mark-VII-Light SR Lateral Sensor Array","Effect":0.2675,"Weight O/H":1,"Scale Weight":0,"Unit Weight":7.7,"SR Cost x":0.125,"Pwr O/H":0.8,"Scale Pwr":0,"Unit Power":1.3,"O":0.03,"E":0.115,"T":0.1425,"Reliability":0.9995,"Year Available (SF)":2315,"Size Class List":"","Full Tier List":""},{"Type Sort":4,"Type":"Short-Range Sensors","Tier":3,"Size Sort":2,"Size Class":"Medium","Name":"[T3][M] Mark-VII SR Lateral Sensor Array","Effect":0.365,"Weight O/H":1.5,"Scale Weight":0,"Unit Weight":11.8,"SR Cost x":0.115,"Pwr O/H":0.8,"Scale Pwr":0,"Unit Power":1.3,"O":0.0065,"E":0.125,"T":0.1725,"Reliability":0.99999,"Year Available (SF)":2315,"Size Class List":"","Full Tier List":""},{"Type Sort":4,"Type":"Short-Range Sensors","Tier":3,"Size Sort":3,"Size Class":"Heavy","Name":"[T3][H] Mark-VII-Heavy SR Lateral Sensor Array","Effect":0.8,"Weight O/H":6.5,"Scale Weight":0,"Unit Weight":21.25,"SR Cost x":0.07,"Pwr O/H":0.8,"Scale Pwr":0,"Unit Power":1.3,"O":0.055,"E":0.105,"T":0.1425,"Reliability":1,"Year Available (SF)":2315,"Size Class List":"","Full Tier List":""},{"Type Sort":4,"Type":"Short-Range Sensors","Tier":4,"Size Sort":1,"Size Class":"Light","Name":"[T4][L] Mark-VII-Light SR Lateral Sensor Array","Effect":0.275,"Weight O/H":1,"Scale Weight":0,"Unit Weight":7.7,"SR Cost x":0.125,"Pwr O/H":0.8,"Scale Pwr":0,"Unit Power":1.3,"O":0.03,"E":0.115,"T":0.1425,"Reliability":0.9995,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":4,"Type":"Short-Range Sensors","Tier":4,"Size Sort":2,"Size Class":"Medium","Name":"[T4][M] Mark-VII SR Lateral Sensor Array","Effect":0.38,"Weight O/H":1.5,"Scale Weight":0,"Unit Weight":11.8,"SR Cost x":0.115,"Pwr O/H":0.8,"Scale Pwr":0,"Unit Power":1.3,"O":0.0065,"E":0.125,"T":0.1725,"Reliability":0.99999,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":4,"Type":"Short-Range Sensors","Tier":4,"Size Sort":3,"Size Class":"Heavy","Name":"[T4][H] Mark-VII-Heavy SR Lateral Sensor Array","Effect":0.85,"Weight O/H":6.5,"Scale Weight":0,"Unit Weight":21.25,"SR Cost x":0.07,"Pwr O/H":0.8,"Scale Pwr":0,"Unit Power":1.3,"O":0.055,"E":0.105,"T":0.1425,"Reliability":1,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":4,"Type":"Short-Range Sensors","Tier":99,"Size Sort":99,"Size Class":"","Name":"x[T1] Full Spectrum Sensor Array","Effect":"","Weight O/H":"","Scale Weight":"","Unit Weight":"","SR Cost x":"","Pwr O/H":"","Scale Pwr":"","Unit Power":"","O":"","E":"","T":"","Reliability":"","Year Available (SF)":"","Size Class List":"","Full Tier List":""},{"Type Sort":5,"Type":"Navigational Sensors","Tier":-99,"Size Sort":-99,"Size Class":"N/A","Name":"No Sensor","Effect":0,"Weight O/H":0,"Scale Weight":0,"Unit Weight":0,"SR Cost x":0,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":0,"Size Class List":"","Full Tier List":""},{"Type Sort":5,"Type":"Navigational Sensors","Tier":-3,"Size Sort":1,"Size Class":"Light","Name":"[T-3][L] Mark-I-Light Nav Sensors","Effect":0.15,"Weight O/H":1,"Scale Weight":0,"Unit Weight":7,"SR Cost x":0.08,"Pwr O/H":0.5,"Scale Pwr":0,"Unit Power":1,"O":0.04,"E":0.08,"T":0.12,"Reliability":0.9995,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":5,"Type":"Navigational Sensors","Tier":-3,"Size Sort":3,"Size Class":"Heavy","Name":"[T-3][H] Mark-I-Heavy Nav Sensors","Effect":0.4,"Weight O/H":5,"Scale Weight":0,"Unit Weight":19,"SR Cost x":0.11,"Pwr O/H":0.45,"Scale Pwr":0,"Unit Power":1,"O":0.04,"E":0.12,"T":0.225,"Reliability":1,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":5,"Type":"Navigational Sensors","Tier":-3,"Size Sort":3,"Size Class":"Heavy","Name":"[T-3][H] Mark-II-Heavy Nav Array","Effect":0.45,"Weight O/H":5,"Scale Weight":0,"Unit Weight":19,"SR Cost x":0.11,"Pwr O/H":0.45,"Scale Pwr":0,"Unit Power":1.1,"O":0.04,"E":0.125,"T":0.225,"Reliability":1,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":5,"Type":"Navigational Sensors","Tier":-2,"Size Sort":1,"Size Class":"Light","Name":"[T-2][L] Mark-II-Light Nav Sensors","Effect":0.175,"Weight O/H":1,"Scale Weight":0,"Unit Weight":7,"SR Cost x":0.08,"Pwr O/H":0.5,"Scale Pwr":0,"Unit Power":1,"O":0.04,"E":0.08,"T":0.12,"Reliability":0.9995,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":5,"Type":"Navigational Sensors","Tier":-2,"Size Sort":3,"Size Class":"Heavy","Name":"[T-2][H] Mark-II-Heavy Nav Sensors","Effect":0.45,"Weight O/H":5,"Scale Weight":0,"Unit Weight":19,"SR Cost x":0.11,"Pwr O/H":0.45,"Scale Pwr":0,"Unit Power":1,"O":0.04,"E":0.12,"T":0.225,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":5,"Type":"Navigational Sensors","Tier":-2,"Size Sort":3,"Size Class":"Heavy","Name":"[T-2][H] Mark-III-Heavy Nav Array","Effect":0.475,"Weight O/H":5,"Scale Weight":0,"Unit Weight":19,"SR Cost x":0.11,"Pwr O/H":0.45,"Scale Pwr":0,"Unit Power":1.1,"O":0.04,"E":0.125,"T":0.225,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":5,"Type":"Navigational Sensors","Tier":-1,"Size Sort":1,"Size Class":"Light","Name":"[T-1][L] Mark-III-Light Nav Sensors","Effect":0.2,"Weight O/H":1,"Scale Weight":0,"Unit Weight":7,"SR Cost x":0.08,"Pwr O/H":0.5,"Scale Pwr":0,"Unit Power":1,"O":0.04,"E":0.08,"T":0.12,"Reliability":0.9995,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":5,"Type":"Navigational Sensors","Tier":-1,"Size Sort":3,"Size Class":"Heavy","Name":"[T-1][H] Mark-III-Heavy Nav Sensors","Effect":0.475,"Weight O/H":5,"Scale Weight":0,"Unit Weight":19,"SR Cost x":0.11,"Pwr O/H":0.45,"Scale Pwr":0,"Unit Power":1,"O":0.04,"E":0.12,"T":0.225,"Reliability":1,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":5,"Type":"Navigational Sensors","Tier":-1,"Size Sort":3,"Size Class":"Heavy","Name":"[T-1][H] Mark-IV-Heavy Nav Array","Effect":0.5,"Weight O/H":5,"Scale Weight":0,"Unit Weight":19,"SR Cost x":0.11,"Pwr O/H":0.45,"Scale Pwr":0,"Unit Power":1.1,"O":0.04,"E":0.125,"T":0.225,"Reliability":1,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":5,"Type":"Navigational Sensors","Tier":0,"Size Sort":2,"Size Class":"Medium","Name":"[T0][M] Mark-V Nav Sensors","Effect":0.3,"Weight O/H":1.5,"Scale Weight":0,"Unit Weight":10,"SR Cost x":0.1,"Pwr O/H":0.6,"Scale Pwr":0,"Unit Power":1.2,"O":0.05,"E":0.07,"T":0.12,"Reliability":1,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":5,"Type":"Navigational Sensors","Tier":1,"Size Sort":1,"Size Class":"Light","Name":"[T1][L] Mark-VI-Light Nav Array","Effect":0.225,"Weight O/H":1,"Scale Weight":0,"Unit Weight":6.75,"SR Cost x":0.15,"Pwr O/H":0.7,"Scale Pwr":0,"Unit Power":1.3,"O":0.02,"E":0.15,"T":0.2475,"Reliability":0.9995,"Year Available (SF)":2305,"Size Class List":"","Full Tier List":""},{"Type Sort":5,"Type":"Navigational Sensors","Tier":1,"Size Sort":2,"Size Class":"Medium","Name":"[T1][M] Mark-VI Nav Array","Effect":0.325,"Weight O/H":1.5,"Scale Weight":0,"Unit Weight":9.75,"SR Cost x":0.11,"Pwr O/H":0.8,"Scale Pwr":0,"Unit Power":1.3,"O":0.04,"E":0.15,"T":0.2625,"Reliability":1,"Year Available (SF)":2305,"Size Class List":"","Full Tier List":""},{"Type Sort":5,"Type":"Navigational Sensors","Tier":1,"Size Sort":3,"Size Class":"Heavy","Name":"[T1][H] Mark-VI-Heavy Nav Array","Effect":0.525,"Weight O/H":5,"Scale Weight":0,"Unit Weight":18.5,"SR Cost x":0.08,"Pwr O/H":0.6,"Scale Pwr":0,"Unit Power":1.3,"O":0.04,"E":0.125,"T":0.225,"Reliability":1,"Year Available (SF)":2305,"Size Class List":"","Full Tier List":""},{"Type Sort":5,"Type":"Navigational Sensors","Tier":2,"Size Sort":1,"Size Class":"Light","Name":"[T2][L] Mark-VII-Light Nav Array ","Effect":0.25,"Weight O/H":1,"Scale Weight":0,"Unit Weight":6.6,"SR Cost x":0.15,"Pwr O/H":0.7,"Scale Pwr":0,"Unit Power":1.4,"O":0.02,"E":0.15,"T":0.2475,"Reliability":0.9995,"Year Available (SF)":2310,"Size Class List":"","Full Tier List":""},{"Type Sort":5,"Type":"Navigational Sensors","Tier":2,"Size Sort":2,"Size Class":"Medium","Name":"[T2][M] Mark-VII Nav Array ","Effect":0.35,"Weight O/H":1.5,"Scale Weight":0,"Unit Weight":9.6,"SR Cost x":0.11,"Pwr O/H":0.8,"Scale Pwr":0,"Unit Power":1.4,"O":0.04,"E":0.15,"T":0.2625,"Reliability":1,"Year Available (SF)":2310,"Size Class List":"","Full Tier List":""},{"Type Sort":5,"Type":"Navigational Sensors","Tier":2,"Size Sort":3,"Size Class":"Heavy","Name":"[T2][H] Mark-VII-Heavy Nav Array ","Effect":0.55,"Weight O/H":5,"Scale Weight":0,"Unit Weight":18.25,"SR Cost x":0.08,"Pwr O/H":0.6,"Scale Pwr":0,"Unit Power":1.4,"O":0.04,"E":0.125,"T":0.225,"Reliability":1,"Year Available (SF)":2310,"Size Class List":"","Full Tier List":""},{"Type Sort":5,"Type":"Navigational Sensors","Tier":3,"Size Sort":1,"Size Class":"Light","Name":"[T3][L] Mark-VIII-Light Nav Array","Effect":0.275,"Weight O/H":1,"Scale Weight":0,"Unit Weight":6.6,"SR Cost x":0.15,"Pwr O/H":0.7,"Scale Pwr":0,"Unit Power":1.4,"O":0.02,"E":0.15,"T":0.2475,"Reliability":0.9995,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":5,"Type":"Navigational Sensors","Tier":3,"Size Sort":2,"Size Class":"Medium","Name":"[T3][M] Mark-VIII Nav Array","Effect":0.375,"Weight O/H":1.5,"Scale Weight":0,"Unit Weight":9.6,"SR Cost x":0.11,"Pwr O/H":0.8,"Scale Pwr":0,"Unit Power":1.4,"O":0.04,"E":0.15,"T":0.2625,"Reliability":1,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":5,"Type":"Navigational Sensors","Tier":3,"Size Sort":3,"Size Class":"Heavy","Name":"[T3][H] Mark-VIII-Heavy Nav Array","Effect":0.575,"Weight O/H":5,"Scale Weight":0,"Unit Weight":18.25,"SR Cost x":0.08,"Pwr O/H":0.6,"Scale Pwr":0,"Unit Power":1.4,"O":0.04,"E":0.125,"T":0.225,"Reliability":1,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":5,"Type":"Navigational Sensors","Tier":99,"Size Sort":99,"Size Class":"","Name":"x[T0] Basic Nav Sensor Package","Effect":"","Weight O/H":"","Scale Weight":"","Unit Weight":"","SR Cost x":"","Pwr O/H":"","Scale Pwr":"","Unit Power":"","O":"","E":"","T":"","Reliability":"","Year Available (SF)":"","Size Class List":"","Full Tier List":""},{"Type Sort":5,"Type":"Navigational Sensors","Tier":99,"Size Sort":99,"Size Class":"","Name":"x[T1] Mass Detector","Effect":"","Weight O/H":"","Scale Weight":"","Unit Weight":"","SR Cost x":"","Pwr O/H":"","Scale Pwr":"","Unit Power":"","O":"","E":"","T":"","Reliability":"","Year Available (SF)":"","Size Class List":"","Full Tier List":""},{"Type Sort":5,"Type":"Navigational Sensors","Tier":99,"Size Sort":99,"Size Class":"","Name":"x[T2] Gaseous Anomaly Detector","Effect":"","Weight O/H":"","Scale Weight":"","Unit Weight":"","SR Cost x":"","Pwr O/H":"","Scale Pwr":"","Unit Power":"","O":"","E":"","T":"","Reliability":"","Year Available (SF)":"","Size Class List":"","Full Tier List":""},{"Type Sort":5,"Type":"Navigational Sensors","Tier":99,"Size Sort":99,"Size Class":"","Name":"x[T3] Subspace Gradient Analytics","Effect":"","Weight O/H":"","Scale Weight":"","Unit Weight":"","SR Cost x":"","Pwr O/H":"","Scale Pwr":"","Unit Power":"","O":"","E":"","T":"","Reliability":"","Year Available (SF)":"","Size Class List":"","Full Tier List":""},{"Type Sort":5,"Type":"Navigational Sensors","Tier":99,"Size Sort":99,"Size Class":"","Name":"x[T4] Astrometric Course Optimizer","Effect":"","Weight O/H":"","Scale Weight":"","Unit Weight":"","SR Cost x":"","Pwr O/H":"","Scale Pwr":"","Unit Power":"","O":"","E":"","T":"","Reliability":"","Year Available (SF)":"","Size Class List":"","Full Tier List":""},{"Type Sort":6,"Type":"Survey Sensors","Tier":-99,"Size Sort":-99,"Size Class":"N/A","Name":"No Survey Sensors","Effect":0,"Weight O/H":0,"Scale Weight":0,"Unit Weight":0,"SR Cost x":0,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":0,"Size Class List":"","Full Tier List":""},{"Type Sort":6,"Type":"Survey Sensors","Tier":99,"Size Sort":99,"Size Class":"","Name":"x[T0] Basic Survey Sensor Package","Effect":"","Weight O/H":"","Scale Weight":"","Unit Weight":"","SR Cost x":"","Pwr O/H":"","Scale Pwr":"","Unit Power":"","O":"","E":"","T":"","Reliability":"","Year Available (SF)":"","Size Class List":"","Full Tier List":""},{"Type Sort":6,"Type":"Survey Sensors","Tier":99,"Size Sort":99,"Size Class":"","Name":"x[T1] Basic Survey Sensor Package *","Effect":"","Weight O/H":"","Scale Weight":"","Unit Weight":"","SR Cost x":"","Pwr O/H":"","Scale Pwr":"","Unit Power":"","O":"","E":"","T":"","Reliability":"","Year Available (SF)":"","Size Class List":"","Full Tier List":""},{"Type Sort":6,"Type":"Survey Sensors","Tier":99,"Size Sort":99,"Size Class":"","Name":"x[T2] EM/Subspace Heterodyne Circuit *","Effect":"","Weight O/H":"","Scale Weight":"","Unit Weight":"","SR Cost x":"","Pwr O/H":"","Scale Pwr":"","Unit Power":"","O":"","E":"","T":"","Reliability":"","Year Available (SF)":"","Size Class List":"","Full Tier List":""},{"Type Sort":6,"Type":"Survey Sensors","Tier":99,"Size Sort":99,"Size Class":"","Name":"x[T3] Ground-Penetrating Spectroscope *","Effect":"","Weight O/H":"","Scale Weight":"","Unit Weight":"","SR Cost x":"","Pwr O/H":"","Scale Pwr":"","Unit Power":"","O":"","E":"","T":"","Reliability":"","Year Available (SF)":"","Size Class List":"","Full Tier List":""},{"Type Sort":6,"Type":"Survey Sensors","Tier":99,"Size Sort":99,"Size Class":"","Name":"x[T4] Stellar Core Imager *","Effect":"","Weight O/H":"","Scale Weight":"","Unit Weight":"","SR Cost x":"","Pwr O/H":"","Scale Pwr":"","Unit Power":"","O":"","E":"","T":"","Reliability":"","Year Available (SF)":"","Size Class List":"","Full Tier List":""},{"Type Sort":6,"Type":"Survey Sensors","Tier":99,"Size Sort":99,"Size Class":"","Name":"x[T5] Polycyclic Subspace Tomograph *","Effect":"","Weight O/H":"","Scale Weight":"","Unit Weight":"","SR Cost x":"","Pwr O/H":"","Scale Pwr":"","Unit Power":"","O":"","E":"","T":"","Reliability":"","Year Available (SF)":"","Size Class List":"","Full Tier List":""},{"Type Sort":7,"Type":"Science Labs","Tier":-99,"Size Sort":-99,"Size Class":"N/A","Name":"No Science","Effect":0,"Weight O/H":0,"Scale Weight":0,"Unit Weight":0,"SR Cost x":0,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":0,"Size Class List":"","Full Tier List":""},{"Type Sort":7,"Type":"Science Labs","Tier":-3,"Size Sort":1,"Size Class":"Light","Name":"[T-3][L] Pattern U Compact Lab","Effect":0.3,"Weight O/H":0,"Scale Weight":0,"Unit Weight":15,"SR Cost x":0.06,"Pwr O/H":0.75,"Scale Pwr":0.3,"Unit Power":0.3,"O":0.05,"E":0.1,"T":0.125,"Reliability":1,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":7,"Type":"Science Labs","Tier":-3,"Size Sort":2,"Size Class":"Medium","Name":"[T-3][M] Pattern V Lab","Effect":0.475,"Weight O/H":0,"Scale Weight":0,"Unit Weight":30,"SR Cost x":0.06,"Pwr O/H":0.7,"Scale Pwr":0.25,"Unit Power":0.25,"O":0.05,"E":0.1,"T":0.1875,"Reliability":1,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":7,"Type":"Science Labs","Tier":-3,"Size Sort":3,"Size Class":"Heavy","Name":"[T-3][H] Pattern S Lab","Effect":0.6,"Weight O/H":3,"Scale Weight":0,"Unit Weight":45,"SR Cost x":0.06,"Pwr O/H":1,"Scale Pwr":0.35,"Unit Power":0.25,"O":0.25,"E":0.2,"T":0.25,"Reliability":1,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":7,"Type":"Science Labs","Tier":-2,"Size Sort":1,"Size Class":"Light","Name":"[T-2][L] Pattern W Compact Lab","Effect":0.35,"Weight O/H":0,"Scale Weight":0,"Unit Weight":15,"SR Cost x":0.06,"Pwr O/H":0.75,"Scale Pwr":0.3,"Unit Power":0.3,"O":0.05,"E":0.1,"T":0.125,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":7,"Type":"Science Labs","Tier":-2,"Size Sort":2,"Size Class":"Medium","Name":"[T-2][M] Pattern X Lab","Effect":0.525,"Weight O/H":0,"Scale Weight":0,"Unit Weight":30,"SR Cost x":0.06,"Pwr O/H":0.7,"Scale Pwr":0.25,"Unit Power":0.25,"O":0.05,"E":0.1,"T":0.1875,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":7,"Type":"Science Labs","Tier":-2,"Size Sort":3,"Size Class":"Heavy","Name":"[T-2][H] Pattern Y Lab","Effect":0.7,"Weight O/H":3,"Scale Weight":0,"Unit Weight":45,"SR Cost x":0.06,"Pwr O/H":1,"Scale Pwr":0.35,"Unit Power":0.25,"O":0.25,"E":0.2,"T":0.25,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":7,"Type":"Science Labs","Tier":-1,"Size Sort":1,"Size Class":"Light","Name":"[T-1][L] Pattern D Compact Lab","Effect":0.4,"Weight O/H":0,"Scale Weight":0,"Unit Weight":15,"SR Cost x":0.06,"Pwr O/H":0.75,"Scale Pwr":0.3,"Unit Power":0.3,"O":0.05,"E":0.1,"T":0.125,"Reliability":1,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":7,"Type":"Science Labs","Tier":-1,"Size Sort":2,"Size Class":"Medium","Name":"[T-1][M] Pattern C Lab","Effect":0.6,"Weight O/H":0,"Scale Weight":0,"Unit Weight":30,"SR Cost x":0.06,"Pwr O/H":0.7,"Scale Pwr":0.25,"Unit Power":0.25,"O":0.05,"E":0.1,"T":0.1875,"Reliability":1,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":7,"Type":"Science Labs","Tier":-1,"Size Sort":3,"Size Class":"Heavy","Name":"[T-1][H] Pattern E Lab","Effect":0.8,"Weight O/H":3,"Scale Weight":0,"Unit Weight":45,"SR Cost x":0.06,"Pwr O/H":1,"Scale Pwr":0.35,"Unit Power":0.25,"O":0.25,"E":0.2,"T":0.25,"Reliability":1,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":7,"Type":"Science Labs","Tier":0,"Size Sort":1,"Size Class":"Light","Name":"[T0][L] Pattern-K Compact Lab","Effect":0.45,"Weight O/H":0,"Scale Weight":0,"Unit Weight":15,"SR Cost x":0.08,"Pwr O/H":0.75,"Scale Pwr":0.3,"Unit Power":0.3,"O":0.05,"E":0.1,"T":0.125,"Reliability":1,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":7,"Type":"Science Labs","Tier":0,"Size Sort":2,"Size Class":"Medium","Name":"[T0][M] Pattern C2 Lab","Effect":0.675,"Weight O/H":0,"Scale Weight":0,"Unit Weight":30,"SR Cost x":0.08,"Pwr O/H":0.75,"Scale Pwr":0.3,"Unit Power":0.3,"O":0.05,"E":0.1,"T":0.1875,"Reliability":1,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":7,"Type":"Science Labs","Tier":0,"Size Sort":3,"Size Class":"Heavy","Name":"[T0][H] Spock-Pattern Lab","Effect":0.9,"Weight O/H":3,"Scale Weight":0,"Unit Weight":45,"SR Cost x":0.08,"Pwr O/H":1.5,"Scale Pwr":0.425,"Unit Power":0.65,"O":0.05,"E":0.05,"T":0.22,"Reliability":1,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":7,"Type":"Science Labs","Tier":1,"Size Sort":1,"Size Class":"Light","Name":"[T1][L] Pattern-K2 Compact Lab","Effect":0.5,"Weight O/H":0,"Scale Weight":0,"Unit Weight":14.667,"SR Cost x":0.09,"Pwr O/H":0.75,"Scale Pwr":0.3,"Unit Power":0.3,"O":0.05,"E":0.1,"T":0.125,"Reliability":1,"Year Available (SF)":2306,"Size Class List":"","Full Tier List":""},{"Type Sort":7,"Type":"Science Labs","Tier":1,"Size Sort":2,"Size Class":"Medium","Name":"[T1][M] Cruiser Pattern Lab","Effect":0.75,"Weight O/H":0,"Scale Weight":0,"Unit Weight":29.333,"SR Cost x":0.09,"Pwr O/H":1.5,"Scale Pwr":0.425,"Unit Power":0.65,"O":0.06,"E":0.1,"T":0.25,"Reliability":1,"Year Available (SF)":2306,"Size Class List":"","Full Tier List":""},{"Type Sort":7,"Type":"Science Labs","Tier":1,"Size Sort":3,"Size Class":"Heavy","Name":"[T1][H] Spock-B Pattern Lab","Effect":1,"Weight O/H":3,"Scale Weight":0,"Unit Weight":44,"SR Cost x":0.09,"Pwr O/H":1.5,"Scale Pwr":0.425,"Unit Power":0.65,"O":0.055,"E":0.055,"T":0.23,"Reliability":1,"Year Available (SF)":2306,"Size Class List":"","Full Tier List":""},{"Type Sort":7,"Type":"Science Labs","Tier":2,"Size Sort":1,"Size Class":"Light","Name":"[T2][L] Pattern-K3 Compact Lab","Effect":0.55,"Weight O/H":0,"Scale Weight":0,"Unit Weight":14.333,"SR Cost x":0.09,"Pwr O/H":0.75,"Scale Pwr":0.3,"Unit Power":0.3,"O":0.05,"E":0.1,"T":0.125,"Reliability":1,"Year Available (SF)":2313,"Size Class List":"","Full Tier List":""},{"Type Sort":7,"Type":"Science Labs","Tier":2,"Size Sort":2,"Size Class":"Medium","Name":"[T2][M] Cruiser-2 Pattern Lab","Effect":0.825,"Weight O/H":0,"Scale Weight":0,"Unit Weight":28.667,"SR Cost x":0.09,"Pwr O/H":1.5,"Scale Pwr":0.425,"Unit Power":0.65,"O":0.06,"E":0.1,"T":0.25,"Reliability":1,"Year Available (SF)":2313,"Size Class List":"","Full Tier List":""},{"Type Sort":7,"Type":"Science Labs","Tier":2,"Size Sort":3,"Size Class":"Heavy","Name":"[T2][H] Spock-C Pattern Lab","Effect":1.1,"Weight O/H":3,"Scale Weight":0,"Unit Weight":43,"SR Cost x":0.09,"Pwr O/H":1.5,"Scale Pwr":0.425,"Unit Power":0.65,"O":0.055,"E":0.055,"T":0.23,"Reliability":1,"Year Available (SF)":2313,"Size Class List":"","Full Tier List":""},{"Type Sort":7,"Type":"Science Labs","Tier":3,"Size Sort":1,"Size Class":"Light","Name":"[T3][L] Pattern-K4 Compact Lab","Effect":0.6,"Weight O/H":0,"Scale Weight":0,"Unit Weight":14,"SR Cost x":0.09,"Pwr O/H":0.75,"Scale Pwr":0.3,"Unit Power":0.3,"O":0.05,"E":0.1,"T":0.125,"Reliability":1,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":7,"Type":"Science Labs","Tier":3,"Size Sort":2,"Size Class":"Medium","Name":"[T3][M] Cruiser-3 Pattern Lab","Effect":0.9,"Weight O/H":0,"Scale Weight":0,"Unit Weight":28,"SR Cost x":0.09,"Pwr O/H":1.5,"Scale Pwr":0.425,"Unit Power":0.65,"O":0.06,"E":0.1,"T":0.25,"Reliability":1,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":7,"Type":"Science Labs","Tier":3,"Size Sort":3,"Size Class":"Heavy","Name":"[T3][H] Spock-D Pattern Lab","Effect":1.2,"Weight O/H":3,"Scale Weight":0,"Unit Weight":42,"SR Cost x":0.09,"Pwr O/H":1.5,"Scale Pwr":0.425,"Unit Power":0.65,"O":0.055,"E":0.055,"T":0.23,"Reliability":1,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":8,"Type":"Computer Cores","Tier":-99,"Size Sort":-99,"Size Class":"N/A","Name":"No Core","Effect":0,"Weight O/H":0,"Scale Weight":0,"Unit Weight":0,"SR Cost x":0,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":0,"Size Class List":"","Full Tier List":""},{"Type Sort":8,"Type":"Computer Cores","Tier":-3,"Size Sort":1,"Size Class":"Light","Name":"[T-3][L] Mkv V Monotronic Core","Effect":0.325,"Weight O/H":10,"Scale Weight":0,"Unit Weight":3.5,"SR Cost x":0.145,"Pwr O/H":3.8,"Scale Pwr":0.7,"Unit Power":0,"O":0,"E":0.04,"T":0.18,"Reliability":1,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":8,"Type":"Computer Cores","Tier":-3,"Size Sort":3,"Size Class":"Heavy","Name":"[T-3][H] Mk V-B Monotronic Core","Effect":0.4,"Weight O/H":10,"Scale Weight":0,"Unit Weight":3.25,"SR Cost x":0.225,"Pwr O/H":4.12,"Scale Pwr":2.5,"Unit Power":0,"O":0.1,"E":0.03,"T":0.125,"Reliability":1,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":8,"Type":"Computer Cores","Tier":-2,"Size Sort":1,"Size Class":"Light","Name":"[T-2][L] SFA Mk1 Duotronic Core","Effect":0.375,"Weight O/H":10,"Scale Weight":0,"Unit Weight":3.5,"SR Cost x":0.145,"Pwr O/H":3.8,"Scale Pwr":0.7,"Unit Power":0,"O":0,"E":0.04,"T":0.18,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":8,"Type":"Computer Cores","Tier":-2,"Size Sort":3,"Size Class":"Heavy","Name":"[T-2][H] SFA MkI-B Duotronic Core","Effect":0.45,"Weight O/H":10,"Scale Weight":0,"Unit Weight":3.25,"SR Cost x":0.225,"Pwr O/H":4.12,"Scale Pwr":2.5,"Unit Power":0,"O":0.1,"E":0.03,"T":0.125,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":8,"Type":"Computer Cores","Tier":-1,"Size Sort":1,"Size Class":"Light","Name":"[T-1][L] Type-I Duotronic Core","Effect":0.425,"Weight O/H":10,"Scale Weight":0,"Unit Weight":3.5,"SR Cost x":0.145,"Pwr O/H":3.8,"Scale Pwr":0.7,"Unit Power":0,"O":0,"E":0.04,"T":0.18,"Reliability":1,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":8,"Type":"Computer Cores","Tier":-1,"Size Sort":3,"Size Class":"Heavy","Name":"[T-1][H] Type-I-B Duotronic Core","Effect":0.475,"Weight O/H":10,"Scale Weight":0,"Unit Weight":3.25,"SR Cost x":0.225,"Pwr O/H":4.12,"Scale Pwr":2.5,"Unit Power":0,"O":0.1,"E":0.03,"T":0.125,"Reliability":1,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":8,"Type":"Computer Cores","Tier":0,"Size Sort":1,"Size Class":"Light","Name":"[T0][L] Generic Monotronic Civilian Core","Effect":0.2,"Weight O/H":10,"Scale Weight":0,"Unit Weight":3.5,"SR Cost x":0.145,"Pwr O/H":3.8,"Scale Pwr":0.7,"Unit Power":0,"O":0,"E":0.02,"T":0.09,"Reliability":1,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":8,"Type":"Computer Cores","Tier":0,"Size Sort":1,"Size Class":"Light","Name":"[T0][L] Type-II Duotronic Core","Effect":0.475,"Weight O/H":20,"Scale Weight":0,"Unit Weight":3.25,"SR Cost x":0.2,"Pwr O/H":6.5,"Scale Pwr":2,"Unit Power":0,"O":0,"E":0.02,"T":0.135,"Reliability":1,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":8,"Type":"Computer Cores","Tier":0,"Size Sort":2,"Size Class":"Medium","Name":"[T0][M] Type-III Duotronic Core","Effect":0.5,"Weight O/H":20,"Scale Weight":0,"Unit Weight":4,"SR Cost x":0.25,"Pwr O/H":5.2,"Scale Pwr":1,"Unit Power":0,"O":0.1,"E":0.02,"T":0.09,"Reliability":0.998,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":8,"Type":"Computer Cores","Tier":0,"Size Sort":3,"Size Class":"Heavy","Name":"[T0][H] Type-II Heavy Duotronic Core","Effect":0.525,"Weight O/H":40,"Scale Weight":0,"Unit Weight":1.75,"SR Cost x":0.2,"Pwr O/H":6.5,"Scale Pwr":2,"Unit Power":0,"O":0.1,"E":0.02,"T":0.08,"Reliability":1,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":8,"Type":"Computer Cores","Tier":1,"Size Sort":1,"Size Class":"Light","Name":"[T1][L] Type-III-A Duotronic Core","Effect":0.6,"Weight O/H":20,"Scale Weight":0,"Unit Weight":4,"SR Cost x":0.12,"Pwr O/H":5,"Scale Pwr":1,"Unit Power":0,"O":0,"E":0.02,"T":0.1,"Reliability":0.9999,"Year Available (SF)":2305,"Size Class List":"","Full Tier List":""},{"Type Sort":8,"Type":"Computer Cores","Tier":1,"Size Sort":2,"Size Class":"Medium","Name":"[T1][M] Type-IV Duotronic Core","Effect":0.625,"Weight O/H":20,"Scale Weight":0,"Unit Weight":4,"SR Cost x":0.25,"Pwr O/H":6.5,"Scale Pwr":1,"Unit Power":0,"O":0.1,"E":0.02,"T":0.12,"Reliability":0.998,"Year Available (SF)":2305,"Size Class List":"","Full Tier List":""},{"Type Sort":8,"Type":"Computer Cores","Tier":1,"Size Sort":3,"Size Class":"Heavy","Name":"[T1][H] Type-IV Heavy Duotronic Core","Effect":0.66,"Weight O/H":40,"Scale Weight":0,"Unit Weight":1.75,"SR Cost x":0.25,"Pwr O/H":6.5,"Scale Pwr":1,"Unit Power":0,"O":0.1,"E":0.02,"T":0,"Reliability":0.99995,"Year Available (SF)":2305,"Size Class List":"","Full Tier List":""},{"Type Sort":8,"Type":"Computer Cores","Tier":2,"Size Sort":1,"Size Class":"Light","Name":"[T2][L] Type-IV-B Duotronic Core","Effect":0.64,"Weight O/H":10,"Scale Weight":0,"Unit Weight":5,"SR Cost x":0.4,"Pwr O/H":7,"Scale Pwr":0.5,"Unit Power":0,"O":0,"E":0.02,"T":0.11,"Reliability":0.998,"Year Available (SF)":2315,"Size Class List":"","Full Tier List":""},{"Type Sort":8,"Type":"Computer Cores","Tier":2,"Size Sort":2,"Size Class":"Medium","Name":"[T2][M] Type-IV-A Duotronic Core","Effect":0.68,"Weight O/H":20,"Scale Weight":0,"Unit Weight":4,"SR Cost x":0.25,"Pwr O/H":7,"Scale Pwr":1,"Unit Power":0,"O":0.1,"E":0.02,"T":0.12,"Reliability":0.9999,"Year Available (SF)":2315,"Size Class List":"","Full Tier List":""},{"Type Sort":8,"Type":"Computer Cores","Tier":2,"Size Sort":3,"Size Class":"Heavy","Name":"[T2][H] Type-IV-C Heavy Duotronic Core","Effect":0.7,"Weight O/H":40,"Scale Weight":0,"Unit Weight":1.75,"SR Cost x":0.25,"Pwr O/H":6.5,"Scale Pwr":1,"Unit Power":0,"O":0.1,"E":0.02,"T":0,"Reliability":0.99995,"Year Available (SF)":2315,"Size Class List":"","Full Tier List":""},{"Type Sort":8,"Type":"Computer Cores","Tier":3,"Size Sort":1,"Size Class":"Light","Name":"[T3][L] Type-V Compact Duotronic Core","Effect":0.68,"Weight O/H":10,"Scale Weight":0,"Unit Weight":5,"SR Cost x":0.4,"Pwr O/H":7,"Scale Pwr":0.5,"Unit Power":0,"O":0,"E":0.02,"T":0.11,"Reliability":0.998,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":8,"Type":"Computer Cores","Tier":3,"Size Sort":2,"Size Class":"Medium","Name":"[T3][M] Type-V Duotronic Core","Effect":0.72,"Weight O/H":20,"Scale Weight":0,"Unit Weight":4,"SR Cost x":0.25,"Pwr O/H":7,"Scale Pwr":1,"Unit Power":0,"O":0.1,"E":0.02,"T":0.12,"Reliability":0.9999,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":8,"Type":"Computer Cores","Tier":3,"Size Sort":3,"Size Class":"Heavy","Name":"[T3][H] Type-V Heavy Duotronic Core","Effect":0.76,"Weight O/H":40,"Scale Weight":0,"Unit Weight":1.75,"SR Cost x":0.25,"Pwr O/H":6.5,"Scale Pwr":1,"Unit Power":0,"O":0.1,"E":0.02,"T":0,"Reliability":0.99995,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":8,"Type":"Computer Cores","Tier":4,"Size Sort":1,"Size Class":"Light","Name":"[T4][L] Type-VI Compact Duotronic Core","Effect":0.72,"Weight O/H":10,"Scale Weight":0,"Unit Weight":5,"SR Cost x":0.4,"Pwr O/H":7,"Scale Pwr":0.5,"Unit Power":0,"O":0,"E":0.02,"T":0.11,"Reliability":0.998,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":8,"Type":"Computer Cores","Tier":4,"Size Sort":2,"Size Class":"Medium","Name":"[T4][M] Type-VI Duotronic Core","Effect":0.79,"Weight O/H":20,"Scale Weight":0,"Unit Weight":4,"SR Cost x":0.25,"Pwr O/H":7,"Scale Pwr":1,"Unit Power":0,"O":0.1,"E":0.02,"T":0.12,"Reliability":0.9999,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":8,"Type":"Computer Cores","Tier":4,"Size Sort":3,"Size Class":"Heavy","Name":"[T4][H] Type-VI Heavy Duotronic Core","Effect":0.9,"Weight O/H":40,"Scale Weight":0,"Unit Weight":1.75,"SR Cost x":0.25,"Pwr O/H":6.5,"Scale Pwr":1,"Unit Power":0,"O":0.1,"E":0.02,"T":0,"Reliability":0.99995,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":9,"Type":"Operating System","Tier":-99,"Size Sort":-99,"Size Class":"N/A","Name":"No OS","Effect":0,"Weight O/H":0,"Scale Weight":0,"Unit Weight":0,"SR Cost x":0,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":0,"Size Class List":"","Full Tier List":""},{"Type Sort":9,"Type":"Operating System","Tier":-3,"Size Sort":-99,"Size Class":"N/A","Name":"[T-3] Majel OS","Effect":0.45,"Weight O/H":0,"Scale Weight":0,"Unit Weight":0,"SR Cost x":0,"Pwr O/H":0.5,"Scale Pwr":0.1,"Unit Power":0.25,"O":0.025,"E":0.015,"T":0.02,"Reliability":1,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":9,"Type":"Operating System","Tier":-2,"Size Sort":-99,"Size Class":"N/A","Name":"[T-2] Majel 1.5 OS","Effect":0.475,"Weight O/H":0,"Scale Weight":0,"Unit Weight":0,"SR Cost x":0,"Pwr O/H":0.5,"Scale Pwr":0.1,"Unit Power":0.25,"O":0.025,"E":0.015,"T":0.02,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":9,"Type":"Operating System","Tier":-1,"Size Sort":-99,"Size Class":"N/A","Name":"[T-1] Majel 2.0 OS","Effect":0.5,"Weight O/H":0,"Scale Weight":0,"Unit Weight":0,"SR Cost x":0,"Pwr O/H":0.5,"Scale Pwr":0.1,"Unit Power":0.25,"O":0.025,"E":0.015,"T":0.02,"Reliability":1,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":9,"Type":"Operating System","Tier":-2,"Size Sort":-99,"Size Class":"N/A","Name":"[T-2] Civilian OS","Effect":0.15,"Weight O/H":0,"Scale Weight":0,"Unit Weight":0,"SR Cost x":0,"Pwr O/H":0.5,"Scale Pwr":0.1,"Unit Power":0.25,"O":0.0125,"E":0.0075,"T":0.01,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":9,"Type":"Operating System","Tier":0,"Size Sort":-99,"Size Class":"N/A","Name":"[T0] Majel 2.1 OS","Effect":0.525,"Weight O/H":0,"Scale Weight":0,"Unit Weight":0,"SR Cost x":0,"Pwr O/H":0.85,"Scale Pwr":0.125,"Unit Power":0.4,"O":0.025,"E":0.015,"T":0.02,"Reliability":1,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":9,"Type":"Operating System","Tier":1,"Size Sort":-99,"Size Class":"N/A","Name":"[T1] Majel 3.0 OS","Effect":1.1,"Weight O/H":0,"Scale Weight":0,"Unit Weight":0,"SR Cost x":0,"Pwr O/H":1,"Scale Pwr":0.2,"Unit Power":1,"O":0.1375,"E":0.0825,"T":0.11,"Reliability":0.9998,"Year Available (SF)":2305,"Size Class List":"","Full Tier List":""},{"Type Sort":9,"Type":"Operating System","Tier":2,"Size Sort":-99,"Size Class":"N/A","Name":"[T2] Majel 3.1 Explorer OS","Effect":1.05,"Weight O/H":0,"Scale Weight":0,"Unit Weight":0,"SR Cost x":0,"Pwr O/H":5,"Scale Pwr":0.1,"Unit Power":0.5,"O":0.1,"E":0.06,"T":0.08,"Reliability":1,"Year Available (SF)":2310,"Size Class List":"","Full Tier List":""},{"Type Sort":9,"Type":"Operating System","Tier":2,"Size Sort":-99,"Size Class":"N/A","Name":"[T2] Majel 3.1 OS","Effect":1.15,"Weight O/H":0,"Scale Weight":0,"Unit Weight":0,"SR Cost x":0,"Pwr O/H":1,"Scale Pwr":0.25,"Unit Power":1.1,"O":0.13125,"E":0.07875,"T":0.105,"Reliability":1,"Year Available (SF)":2310,"Size Class List":"","Full Tier List":""},{"Type Sort":9,"Type":"Operating System","Tier":3,"Size Sort":-99,"Size Class":"N/A","Name":"[T3] Majel 3.5 OS","Effect":1.2,"Weight O/H":0,"Scale Weight":0,"Unit Weight":0,"SR Cost x":0,"Pwr O/H":1,"Scale Pwr":0.25,"Unit Power":1.1,"O":0.125,"E":0.075,"T":0.1,"Reliability":1,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":9,"Type":"Operating System","Tier":4,"Size Sort":-99,"Size Class":"N/A","Name":"[T4] Majel 4.0 OS","Effect":1.25,"Weight O/H":0,"Scale Weight":0,"Unit Weight":0,"SR Cost x":0,"Pwr O/H":1,"Scale Pwr":0.25,"Unit Power":1.1,"O":0.125,"E":0.075,"T":0.1,"Reliability":1,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":10,"Type":"Targeting Computers","Tier":-99,"Size Sort":-99,"Size Class":"N/A","Name":"No TCU","Effect":0,"Weight O/H":0,"Scale Weight":0,"Unit Weight":0,"SR Cost x":0,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":0,"Size Class List":"","Full Tier List":""},{"Type Sort":10,"Type":"Targeting Computers","Tier":-3,"Size Sort":1,"Size Class":"Light","Name":"[T-3][L] Model 17 Light TCU","Effect":0.25,"Weight O/H":0,"Scale Weight":0,"Unit Weight":10,"SR Cost x":0.05,"Pwr O/H":0,"Scale Pwr":0.5,"Unit Power":1,"O":0.1,"E":0.1,"T":0,"Reliability":1,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":10,"Type":"Targeting Computers","Tier":-3,"Size Sort":2,"Size Class":"Medium","Name":"[T-3][M] Model 31 Advanced TCU","Effect":0.325,"Weight O/H":0,"Scale Weight":0,"Unit Weight":20,"SR Cost x":0.15,"Pwr O/H":0,"Scale Pwr":0.48,"Unit Power":0.95,"O":0.1,"E":0.1,"T":0.1,"Reliability":1,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":10,"Type":"Targeting Computers","Tier":-3,"Size Sort":3,"Size Class":"Heavy","Name":"[T-3][H] Model 20 Heavy TCU","Effect":0.375,"Weight O/H":0,"Scale Weight":0,"Unit Weight":37,"SR Cost x":0.06,"Pwr O/H":0,"Scale Pwr":0.48,"Unit Power":0.95,"O":0.1,"E":0.1,"T":0.1,"Reliability":1,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":10,"Type":"Targeting Computers","Tier":-2,"Size Sort":1,"Size Class":"Light","Name":"[T-2][L] Model 37 Light TCU","Effect":0.275,"Weight O/H":0,"Scale Weight":0,"Unit Weight":10,"SR Cost x":0.05,"Pwr O/H":0,"Scale Pwr":0.5,"Unit Power":1,"O":0.1,"E":0.1,"T":0,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":10,"Type":"Targeting Computers","Tier":-2,"Size Sort":2,"Size Class":"Medium","Name":"[T-2][M] Model 42 Advanced TCU","Effect":0.35,"Weight O/H":0,"Scale Weight":0,"Unit Weight":20,"SR Cost x":0.15,"Pwr O/H":0,"Scale Pwr":0.48,"Unit Power":0.95,"O":0.1,"E":0.1,"T":0.1,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":10,"Type":"Targeting Computers","Tier":-2,"Size Sort":3,"Size Class":"Heavy","Name":"[T-2][H] Model 39 Heavy TCU","Effect":0.4,"Weight O/H":0,"Scale Weight":0,"Unit Weight":37,"SR Cost x":0.06,"Pwr O/H":0,"Scale Pwr":0.48,"Unit Power":0.95,"O":0.1,"E":0.1,"T":0.1,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":10,"Type":"Targeting Computers","Tier":-1,"Size Sort":1,"Size Class":"Light","Name":"[T-1][L] Model 57 Light TCU","Effect":0.3,"Weight O/H":0,"Scale Weight":0,"Unit Weight":10,"SR Cost x":0.05,"Pwr O/H":0,"Scale Pwr":0.5,"Unit Power":1,"O":0.1,"E":0.1,"T":0,"Reliability":1,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":10,"Type":"Targeting Computers","Tier":-1,"Size Sort":2,"Size Class":"Medium","Name":"[T-1][M] Model 64 Advanced TCU","Effect":0.375,"Weight O/H":0,"Scale Weight":0,"Unit Weight":20,"SR Cost x":0.15,"Pwr O/H":0,"Scale Pwr":0.48,"Unit Power":0.95,"O":0.1,"E":0.1,"T":0.1,"Reliability":1,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":10,"Type":"Targeting Computers","Tier":-1,"Size Sort":3,"Size Class":"Heavy","Name":"[T-1][H] Model 57 Heavy TCU","Effect":0.425,"Weight O/H":0,"Scale Weight":0,"Unit Weight":37,"SR Cost x":0.06,"Pwr O/H":0,"Scale Pwr":0.48,"Unit Power":0.95,"O":0.1,"E":0.1,"T":0.1,"Reliability":1,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":10,"Type":"Targeting Computers","Tier":-2,"Size Sort":1,"Size Class":"Light","Name":"[T-2][L] Civilian TCU","Effect":0.15,"Weight O/H":0,"Scale Weight":0,"Unit Weight":9,"SR Cost x":0.045,"Pwr O/H":0,"Scale Pwr":0.5,"Unit Power":1,"O":0.1,"E":0.1,"T":0,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":10,"Type":"Targeting Computers","Tier":0,"Size Sort":1,"Size Class":"Light","Name":"[T0][L] Type-I Duotronic TCU","Effect":0.325,"Weight O/H":0,"Scale Weight":0,"Unit Weight":10,"SR Cost x":0.065,"Pwr O/H":0,"Scale Pwr":0.48,"Unit Power":0.95,"O":0.1,"E":0.1,"T":0.1,"Reliability":1,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":10,"Type":"Targeting Computers","Tier":0,"Size Sort":2,"Size Class":"Medium","Name":"[T0][M] Type-1 TCU","Effect":0.4,"Weight O/H":0,"Scale Weight":0,"Unit Weight":20,"SR Cost x":0.1,"Pwr O/H":1,"Scale Pwr":0.5,"Unit Power":2,"O":0.1,"E":0.05,"T":0.05,"Reliability":0.999,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":10,"Type":"Targeting Computers","Tier":0,"Size Sort":3,"Size Class":"Heavy","Name":"[T0][H] Type-1-A 'Seeker' TCU","Effect":0.5,"Weight O/H":0,"Scale Weight":0,"Unit Weight":37,"SR Cost x":0.065,"Pwr O/H":0.8,"Scale Pwr":0.45,"Unit Power":1.8,"O":0.1,"E":0.05,"T":0.05,"Reliability":1,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":10,"Type":"Targeting Computers","Tier":1,"Size Sort":1,"Size Class":"Light","Name":"[T1][L] Type-II Duotronic TCU","Effect":0.35,"Weight O/H":0,"Scale Weight":0,"Unit Weight":10,"SR Cost x":0.065,"Pwr O/H":0,"Scale Pwr":0.48,"Unit Power":0.95,"O":0.1,"E":0.1,"T":0.1,"Reliability":1,"Year Available (SF)":2305,"Size Class List":"","Full Tier List":""},{"Type Sort":10,"Type":"Targeting Computers","Tier":1,"Size Sort":2,"Size Class":"Medium","Name":"[T1][M] Type-2 TCU","Effect":0.425,"Weight O/H":0,"Scale Weight":0,"Unit Weight":20,"SR Cost x":0.1,"Pwr O/H":1,"Scale Pwr":0.5,"Unit Power":2.05,"O":0.1,"E":0.05,"T":0.05,"Reliability":0.999,"Year Available (SF)":2305,"Size Class List":"","Full Tier List":""},{"Type Sort":10,"Type":"Targeting Computers","Tier":1,"Size Sort":3,"Size Class":"Heavy","Name":"[T1][H] 'Dauntless' Tracking System","Effect":0.575,"Weight O/H":0,"Scale Weight":0,"Unit Weight":37,"SR Cost x":0.1,"Pwr O/H":1.2,"Scale Pwr":0.6,"Unit Power":2.2,"O":0.1,"E":0.05,"T":0.05,"Reliability":0.9992,"Year Available (SF)":2305,"Size Class List":"","Full Tier List":""},{"Type Sort":10,"Type":"Targeting Computers","Tier":2,"Size Sort":1,"Size Class":"Light","Name":"[T2][L] Type-III Duotronic TCU","Effect":0.375,"Weight O/H":0,"Scale Weight":0,"Unit Weight":10,"SR Cost x":0.065,"Pwr O/H":0,"Scale Pwr":0.48,"Unit Power":0.975,"O":0.1,"E":0.1,"T":0.1,"Reliability":1,"Year Available (SF)":2310,"Size Class List":"","Full Tier List":""},{"Type Sort":10,"Type":"Targeting Computers","Tier":2,"Size Sort":2,"Size Class":"Medium","Name":"[T2][M] Type-3 TCU","Effect":0.475,"Weight O/H":0,"Scale Weight":0,"Unit Weight":20,"SR Cost x":0.1,"Pwr O/H":1,"Scale Pwr":0.5,"Unit Power":2.1,"O":0.1,"E":0.05,"T":0.05,"Reliability":0.999,"Year Available (SF)":2310,"Size Class List":"","Full Tier List":""},{"Type Sort":10,"Type":"Targeting Computers","Tier":2,"Size Sort":3,"Size Class":"Heavy","Name":"[T2][H] DI-4 Predictive Targeting Array","Effect":0.675,"Weight O/H":0,"Scale Weight":0,"Unit Weight":37,"SR Cost x":0.098,"Pwr O/H":1.15,"Scale Pwr":0.575,"Unit Power":2.3,"O":0.1,"E":0.05,"T":0.05,"Reliability":0.9999,"Year Available (SF)":2310,"Size Class List":"","Full Tier List":""},{"Type Sort":10,"Type":"Targeting Computers","Tier":3,"Size Sort":1,"Size Class":"Light","Name":"[T3][L] Type-IV Duotronic TCU","Effect":0.4,"Weight O/H":0,"Scale Weight":0,"Unit Weight":10,"SR Cost x":0.065,"Pwr O/H":0,"Scale Pwr":0.48,"Unit Power":0.975,"O":0.1,"E":0.1,"T":0.1,"Reliability":1,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":10,"Type":"Targeting Computers","Tier":3,"Size Sort":2,"Size Class":"Medium","Name":"[T3][M] Type-4 TCU","Effect":0.525,"Weight O/H":0,"Scale Weight":0,"Unit Weight":20,"SR Cost x":0.1,"Pwr O/H":1,"Scale Pwr":0.5,"Unit Power":2.1,"O":0.1,"E":0.05,"T":0.05,"Reliability":0.999,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":10,"Type":"Targeting Computers","Tier":3,"Size Sort":3,"Size Class":"Heavy","Name":"[T3][H] TH-5 Rangemaster Unit","Effect":0.775,"Weight O/H":0,"Scale Weight":0,"Unit Weight":37,"SR Cost x":0.098,"Pwr O/H":1.15,"Scale Pwr":0.575,"Unit Power":2.3,"O":0.1,"E":0.05,"T":0.05,"Reliability":0.9999,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":11,"Type":"Diplomatic Packages","Tier":-99,"Size Sort":-99,"Size Class":"N/A","Name":"No Diplomacy","Effect":0,"Weight O/H":0,"Scale Weight":0,"Unit Weight":0,"SR Cost x":0,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":0,"Size Class List":"","Full Tier List":""},{"Type Sort":11,"Type":"Diplomatic Packages","Tier":-3,"Size Sort":1,"Size Class":"Light","Name":"[T-3][L] Escort Diplomatic Package '24","Effect":0.7,"Weight O/H":0,"Scale Weight":0,"Unit Weight":32,"SR Cost x":0.035,"Pwr O/H":1.2,"Scale Pwr":0.3,"Unit Power":0.2,"O":0.015,"E":0,"T":0.015,"Reliability":1,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":11,"Type":"Diplomatic Packages","Tier":-3,"Size Sort":2,"Size Class":"Medium","Name":"[T-3][M] Cruiser Diplomatic Package '20","Effect":0.85,"Weight O/H":14,"Scale Weight":0,"Unit Weight":32,"SR Cost x":0.07,"Pwr O/H":1.2,"Scale Pwr":0.3,"Unit Power":0.2,"O":0.03,"E":0.02,"T":0.03,"Reliability":1,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":11,"Type":"Diplomatic Packages","Tier":-3,"Size Sort":3,"Size Class":"Heavy","Name":"[T-3][H] Explorer Diplomatic Package '28","Effect":1.1,"Weight O/H":45,"Scale Weight":0,"Unit Weight":32,"SR Cost x":0.13,"Pwr O/H":1.2,"Scale Pwr":0.4,"Unit Power":2.5,"O":0.1,"E":0.015,"T":0.04,"Reliability":1,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":11,"Type":"Diplomatic Packages","Tier":-2,"Size Sort":1,"Size Class":"Light","Name":"[T-2][L] Escort Diplomatic Package '41","Effect":0.75,"Weight O/H":0,"Scale Weight":0,"Unit Weight":32,"SR Cost x":0.035,"Pwr O/H":1.2,"Scale Pwr":0.3,"Unit Power":0.2,"O":0.015,"E":0,"T":0.015,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":11,"Type":"Diplomatic Packages","Tier":-2,"Size Sort":2,"Size Class":"Medium","Name":"[T-2][M] Cruiser Diplomatic Package '39","Effect":0.9,"Weight O/H":14,"Scale Weight":0,"Unit Weight":32,"SR Cost x":0.07,"Pwr O/H":1.2,"Scale Pwr":0.3,"Unit Power":0.2,"O":0.03,"E":0.02,"T":0.03,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":11,"Type":"Diplomatic Packages","Tier":-2,"Size Sort":3,"Size Class":"Heavy","Name":"[T-2][H] Explorer Diplomatic Package '45","Effect":1.35,"Weight O/H":45,"Scale Weight":0,"Unit Weight":32,"SR Cost x":0.13,"Pwr O/H":1.2,"Scale Pwr":0.4,"Unit Power":2.5,"O":0.1,"E":0.015,"T":0.04,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":11,"Type":"Diplomatic Packages","Tier":-1,"Size Sort":1,"Size Class":"Light","Name":"[T-1][L] Escort Diplomatic Package '61","Effect":0.8,"Weight O/H":0,"Scale Weight":0,"Unit Weight":32,"SR Cost x":0.035,"Pwr O/H":1.2,"Scale Pwr":0.3,"Unit Power":0.2,"O":0.015,"E":0,"T":0.015,"Reliability":1,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":11,"Type":"Diplomatic Packages","Tier":-1,"Size Sort":2,"Size Class":"Medium","Name":"[T-1][M] Cruiser Diplomatic Package '61","Effect":1,"Weight O/H":14,"Scale Weight":0,"Unit Weight":32,"SR Cost x":0.07,"Pwr O/H":1.2,"Scale Pwr":0.3,"Unit Power":0.2,"O":0.03,"E":0.02,"T":0.03,"Reliability":1,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":11,"Type":"Diplomatic Packages","Tier":-1,"Size Sort":3,"Size Class":"Heavy","Name":"[T-1][H] Explorer Diplomatic Package '67","Effect":1.5,"Weight O/H":45,"Scale Weight":0,"Unit Weight":32,"SR Cost x":0.13,"Pwr O/H":1.2,"Scale Pwr":0.4,"Unit Power":2.5,"O":0.1,"E":0.015,"T":0.04,"Reliability":1,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":11,"Type":"Diplomatic Packages","Tier":0,"Size Sort":1,"Size Class":"Light","Name":"[T0][L] Escort Diplomatic Package '85","Effect":0.85,"Weight O/H":0,"Scale Weight":0,"Unit Weight":32,"SR Cost x":0.075,"Pwr O/H":1.5,"Scale Pwr":0.4,"Unit Power":3,"O":0.02,"E":0.015,"T":0.04,"Reliability":1,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":11,"Type":"Diplomatic Packages","Tier":0,"Size Sort":3,"Size Class":"Heavy","Name":"[T0][H] Explorer Diplomatic Package '85","Effect":1.6,"Weight O/H":50,"Scale Weight":0,"Unit Weight":32,"SR Cost x":0.13,"Pwr O/H":1.5,"Scale Pwr":0.4,"Unit Power":3.5,"O":0.1,"E":0.015,"T":0.04,"Reliability":1,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":11,"Type":"Diplomatic Packages","Tier":1,"Size Sort":1,"Size Class":"Light","Name":"[T1][L] Lwaxana '04 Escort Protocol","Effect":0.9,"Weight O/H":0,"Scale Weight":0,"Unit Weight":32,"SR Cost x":0.08,"Pwr O/H":2,"Scale Pwr":0.5,"Unit Power":2.75,"O":0.06,"E":0.015,"T":0.04,"Reliability":1,"Year Available (SF)":2309,"Size Class List":"","Full Tier List":""},{"Type Sort":11,"Type":"Diplomatic Packages","Tier":1,"Size Sort":2,"Size Class":"Medium","Name":"[T1][M] Lwaxana '04 General Protocol","Effect":1.2,"Weight O/H":16,"Scale Weight":0,"Unit Weight":32,"SR Cost x":0.105,"Pwr O/H":2,"Scale Pwr":0.5,"Unit Power":3.25,"O":0.1,"E":0.015,"T":0.04,"Reliability":1,"Year Available (SF)":2309,"Size Class List":"","Full Tier List":""},{"Type Sort":11,"Type":"Diplomatic Packages","Tier":1,"Size Sort":3,"Size Class":"Heavy","Name":"[T1][H] Lwaxana '04 Explorer Protocol","Effect":1.75,"Weight O/H":60,"Scale Weight":0,"Unit Weight":32,"SR Cost x":0.12,"Pwr O/H":2,"Scale Pwr":0.5,"Unit Power":3.75,"O":0.1,"E":0.015,"T":0.04,"Reliability":1,"Year Available (SF)":2309,"Size Class List":"","Full Tier List":""},{"Type Sort":11,"Type":"Diplomatic Packages","Tier":2,"Size Sort":1,"Size Class":"Light","Name":"[T2][L] Lwaxana '12 Escort Protocol","Effect":1,"Weight O/H":0,"Scale Weight":0,"Unit Weight":32,"SR Cost x":0.08,"Pwr O/H":3,"Scale Pwr":0.5,"Unit Power":3,"O":0.06,"E":0.015,"T":0.04,"Reliability":1,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":11,"Type":"Diplomatic Packages","Tier":2,"Size Sort":2,"Size Class":"Medium","Name":"[T2][M] Lwaxana '12 General Protocol","Effect":1.3,"Weight O/H":16,"Scale Weight":0,"Unit Weight":32,"SR Cost x":0.105,"Pwr O/H":3,"Scale Pwr":0.5,"Unit Power":3.5,"O":0.1,"E":0.015,"T":0.04,"Reliability":1,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":11,"Type":"Diplomatic Packages","Tier":2,"Size Sort":3,"Size Class":"Heavy","Name":"[T2][H] Lwaxana '12 Explorer Protocol","Effect":2,"Weight O/H":64,"Scale Weight":0,"Unit Weight":32,"SR Cost x":0.12,"Pwr O/H":3,"Scale Pwr":0.5,"Unit Power":4,"O":0.1,"E":0.015,"T":0.04,"Reliability":1,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":11,"Type":"Diplomatic Packages","Tier":3,"Size Sort":1,"Size Class":"Light","Name":"[T3][L] Lwaxana '21 Escort Protocol","Effect":1.1,"Weight O/H":0,"Scale Weight":0,"Unit Weight":32,"SR Cost x":0.08,"Pwr O/H":3,"Scale Pwr":0.5,"Unit Power":3,"O":0.06,"E":0.015,"T":0.04,"Reliability":1,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":11,"Type":"Diplomatic Packages","Tier":3,"Size Sort":2,"Size Class":"Medium","Name":"[T3][M] Lwaxana '21 General Protocol","Effect":1.425,"Weight O/H":16,"Scale Weight":0,"Unit Weight":32,"SR Cost x":0.105,"Pwr O/H":3,"Scale Pwr":0.5,"Unit Power":3.5,"O":0.1,"E":0.015,"T":0.04,"Reliability":1,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":11,"Type":"Diplomatic Packages","Tier":3,"Size Sort":3,"Size Class":"Heavy","Name":"[T3][H] Lwaxana '21 Explorer Protocol","Effect":2.25,"Weight O/H":64,"Scale Weight":0,"Unit Weight":32,"SR Cost x":0.12,"Pwr O/H":3,"Scale Pwr":0.5,"Unit Power":4,"O":0.1,"E":0.015,"T":0.04,"Reliability":1,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":12,"Type":"Recreation Packages","Tier":-99,"Size Sort":-99,"Size Class":"N/A","Name":"No Onboard Recreation","Effect":0,"Weight O/H":0,"Scale Weight":0,"Unit Weight":0,"SR Cost x":0,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":0,"Size Class List":"","Full Tier List":""},{"Type Sort":12,"Type":"Recreation Packages","Tier":-1,"Size Sort":2,"Size Class":"Medium","Name":"[T-1][M] 2260s Rec Space","Effect":0.3,"Weight O/H":4,"Scale Weight":0,"Unit Weight":17.5,"SR Cost x":0.03,"Pwr O/H":1,"Scale Pwr":0.4,"Unit Power":2,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":12,"Type":"Recreation Packages","Tier":0,"Size Sort":2,"Size Class":"Medium","Name":"[T0][M] 2280s Rec Space","Effect":0.4,"Weight O/H":4,"Scale Weight":0,"Unit Weight":25,"SR Cost x":0.06,"Pwr O/H":2,"Scale Pwr":1,"Unit Power":4,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":12,"Type":"Recreation Packages","Tier":1,"Size Sort":1,"Size Class":"Light","Name":"[T1][L] 2300s Compact Rec Space","Effect":0.2,"Weight O/H":6,"Scale Weight":0,"Unit Weight":12,"SR Cost x":0.04,"Pwr O/H":2,"Scale Pwr":1,"Unit Power":4,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":2315,"Size Class List":"","Full Tier List":""},{"Type Sort":12,"Type":"Recreation Packages","Tier":1,"Size Sort":2,"Size Class":"Medium","Name":"[T1][M] 2300s Rec Space","Effect":0.6,"Weight O/H":8,"Scale Weight":0,"Unit Weight":30,"SR Cost x":0.06,"Pwr O/H":2,"Scale Pwr":1,"Unit Power":8,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":2315,"Size Class List":"","Full Tier List":""},{"Type Sort":12,"Type":"Recreation Packages","Tier":2,"Size Sort":1,"Size Class":"Light","Name":"[T2][L] 2310s Compact Rec Space","Effect":0.275,"Weight O/H":6,"Scale Weight":0,"Unit Weight":12,"SR Cost x":0.04,"Pwr O/H":2,"Scale Pwr":1,"Unit Power":4,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":12,"Type":"Recreation Packages","Tier":2,"Size Sort":2,"Size Class":"Medium","Name":"[T2][M] 2310s Rec Space","Effect":0.725,"Weight O/H":8,"Scale Weight":0,"Unit Weight":30,"SR Cost x":0.06,"Pwr O/H":2,"Scale Pwr":1,"Unit Power":8,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":13,"Type":"Sickbays","Tier":-99,"Size Sort":-99,"Size Class":"N/A","Name":"No Sickbay","Effect":0,"Weight O/H":0,"Scale Weight":0,"Unit Weight":0,"SR Cost x":0,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":0,"Size Class List":"","Full Tier List":""},{"Type Sort":13,"Type":"Sickbays","Tier":-3,"Size Sort":1,"Size Class":"Light","Name":"[T-3][L] S-Medical '24 Standard Sickbay","Effect":0.2,"Weight O/H":0,"Scale Weight":0,"Unit Weight":13,"SR Cost x":0.04,"Pwr O/H":0.5,"Scale Pwr":0.27,"Unit Power":0.18,"O":0.05,"E":0,"T":0.12,"Reliability":1,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":13,"Type":"Sickbays","Tier":-3,"Size Sort":3,"Size Class":"Heavy","Name":"[T-3][H] S-Medical '25 Explorer Sickbay","Effect":0.3,"Weight O/H":10,"Scale Weight":0,"Unit Weight":16,"SR Cost x":0.08,"Pwr O/H":1.5,"Scale Pwr":0.4,"Unit Power":0.45,"O":0.15,"E":0,"T":0.25,"Reliability":1,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":13,"Type":"Sickbays","Tier":-2,"Size Sort":1,"Size Class":"Light","Name":"[T-2][L] S-Medical '42 Standard Sickbay","Effect":0.25,"Weight O/H":0,"Scale Weight":0,"Unit Weight":13,"SR Cost x":0.04,"Pwr O/H":0.5,"Scale Pwr":0.27,"Unit Power":0.18,"O":0.05,"E":0,"T":0.12,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":13,"Type":"Sickbays","Tier":-2,"Size Sort":3,"Size Class":"Heavy","Name":"[T-2][H] S-Medical '46 Explorer Sickbay","Effect":0.35,"Weight O/H":10,"Scale Weight":0,"Unit Weight":16,"SR Cost x":0.08,"Pwr O/H":1.5,"Scale Pwr":0.4,"Unit Power":0.45,"O":0.15,"E":0,"T":0.25,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":13,"Type":"Sickbays","Tier":-1,"Size Sort":1,"Size Class":"Light","Name":"[T-1][L] S-Medical '61 Standard Sickbay","Effect":0.3,"Weight O/H":0,"Scale Weight":0,"Unit Weight":13,"SR Cost x":0.04,"Pwr O/H":0.5,"Scale Pwr":0.27,"Unit Power":0.18,"O":0.05,"E":0,"T":0.12,"Reliability":1,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":13,"Type":"Sickbays","Tier":-1,"Size Sort":3,"Size Class":"Heavy","Name":"[T-1][H] S-Medical '68 Explorer Sickbay","Effect":0.4,"Weight O/H":10,"Scale Weight":0,"Unit Weight":16,"SR Cost x":0.08,"Pwr O/H":1.5,"Scale Pwr":0.4,"Unit Power":0.45,"O":0.15,"E":0,"T":0.25,"Reliability":1,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":13,"Type":"Sickbays","Tier":0,"Size Sort":3,"Size Class":"Heavy","Name":"[T0][H] S-Medical '84 Pattern Sickbay","Effect":0.5,"Weight O/H":10,"Scale Weight":0,"Unit Weight":18,"SR Cost x":0.06,"Pwr O/H":1.5,"Scale Pwr":0.4,"Unit Power":0.45,"O":0.15,"E":0,"T":0.25,"Reliability":1,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":13,"Type":"Sickbays","Tier":1,"Size Sort":3,"Size Class":"Heavy","Name":"[T1][H] S-Medical '04 Pattern Sickbay","Effect":0.6,"Weight O/H":10,"Scale Weight":0,"Unit Weight":20,"SR Cost x":0.07,"Pwr O/H":1.5,"Scale Pwr":0.4,"Unit Power":0.18,"O":0.15,"E":0,"T":0.25,"Reliability":1,"Year Available (SF)":2306,"Size Class List":"","Full Tier List":""},{"Type Sort":13,"Type":"Sickbays","Tier":2,"Size Sort":1,"Size Class":"Light","Name":"[T2][L] T'Koren Pattern Small Sickbay","Effect":0.4,"Weight O/H":0,"Scale Weight":0,"Unit Weight":12,"SR Cost x":0.045,"Pwr O/H":1.5,"Scale Pwr":0.4,"Unit Power":0.18,"O":0.05,"E":0,"T":0.12,"Reliability":1,"Year Available (SF)":2316,"Size Class List":"","Full Tier List":""},{"Type Sort":13,"Type":"Sickbays","Tier":2,"Size Sort":3,"Size Class":"Heavy","Name":"[T2][H] T'Koren Pattern Large Sickbay","Effect":0.7,"Weight O/H":10,"Scale Weight":0,"Unit Weight":22,"SR Cost x":0.09,"Pwr O/H":1.5,"Scale Pwr":0.4,"Unit Power":0.45,"O":0.15,"E":0,"T":0.25,"Reliability":1,"Year Available (SF)":2316,"Size Class List":"","Full Tier List":""},{"Type Sort":13,"Type":"Sickbays","Tier":3,"Size Sort":1,"Size Class":"Light","Name":"[T3][L] T'Koren-B Pattern Small Sickbay","Effect":0.45,"Weight O/H":0,"Scale Weight":0,"Unit Weight":12,"SR Cost x":0.045,"Pwr O/H":1.5,"Scale Pwr":0.4,"Unit Power":0.18,"O":0.05,"E":0,"T":0.12,"Reliability":1,"Year Available (SF)":2319,"Size Class List":"","Full Tier List":""},{"Type Sort":13,"Type":"Sickbays","Tier":3,"Size Sort":3,"Size Class":"Heavy","Name":"[T3][H] T'Koren-B Pattern Large Sickbay","Effect":0.8,"Weight O/H":10,"Scale Weight":0,"Unit Weight":22,"SR Cost x":0.09,"Pwr O/H":1.5,"Scale Pwr":0.4,"Unit Power":0.45,"O":0.15,"E":0,"T":0.25,"Reliability":1,"Year Available (SF)":2319,"Size Class List":"","Full Tier List":""},{"Type Sort":13,"Type":"Sickbays","Tier":99,"Size Sort":99,"Size Class":"","Name":"x[T3] T'Koren-B Pattern Sickbay","Effect":"","Weight O/H":"","Scale Weight":"","Unit Weight":"","SR Cost x":"","Pwr O/H":"","Scale Pwr":"","Unit Power":"","O":"","E":"","T":"","Reliability":"","Year Available (SF)":"","Size Class List":"","Full Tier List":""},{"Type Sort":13,"Type":"Sickbays","Tier":99,"Size Sort":99,"Size Class":"","Name":"x[T4] T'Koren-C Pattern Sickbay","Effect":"","Weight O/H":"","Scale Weight":"","Unit Weight":"","SR Cost x":"","Pwr O/H":"","Scale Pwr":"","Unit Power":"","O":"","E":"","T":"","Reliability":"","Year Available (SF)":"","Size Class List":"","Full Tier List":""},{"Type Sort":13,"Type":"Sickbays","Tier":99,"Size Sort":99,"Size Class":"","Name":"x[T5] T'Koren-D Pattern Sickbay","Effect":"","Weight O/H":"","Scale Weight":"","Unit Weight":"","SR Cost x":"","Pwr O/H":"","Scale Pwr":"","Unit Power":"","O":"","E":"","T":"","Reliability":"","Year Available (SF)":"","Size Class List":"","Full Tier List":""},{"Type Sort":13,"Type":"Sickbays","Tier":99,"Size Sort":99,"Size Class":"","Name":"x[T6] Pulaski Pattern Sickbay","Effect":"","Weight O/H":"","Scale Weight":"","Unit Weight":"","SR Cost x":"","Pwr O/H":"","Scale Pwr":"","Unit Power":"","O":"","E":"","T":"","Reliability":"","Year Available (SF)":"","Size Class List":"","Full Tier List":""},{"Type Sort":14,"Type":"Hull System","Tier":-3,"Size Sort":1,"Size Class":"Light","Name":"[T-3][L] Single Alloy-2 Duranium Hull","Effect":0.33,"Weight O/H":0,"Scale Weight":15,"Unit Weight":0,"SR Cost x":0.011,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.01,"E":0.25,"T":0.04,"Reliability":1,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":14,"Type":"Hull System","Tier":-3,"Size Sort":2,"Size Class":"Medium","Name":"[T-3][M] Double Alloy-2 Duranium Hull","Effect":0.62,"Weight O/H":35,"Scale Weight":12,"Unit Weight":0,"SR Cost x":0.014,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.02,"E":0.4,"T":0.05,"Reliability":1,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":14,"Type":"Hull System","Tier":-3,"Size Sort":3,"Size Class":"Heavy","Name":"[T-3][H] Duranium w/ Bartridium Rebar","Effect":0.725,"Weight O/H":80,"Scale Weight":8,"Unit Weight":0,"SR Cost x":0.0375,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.2,"E":0.5,"T":0.2,"Reliability":1,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":14,"Type":"Hull System","Tier":-2,"Size Sort":1,"Size Class":"Light","Name":"[T-2][L] Single Alloy-4 Duranium Hull","Effect":0.34,"Weight O/H":0,"Scale Weight":14,"Unit Weight":0,"SR Cost x":0.011,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.01,"E":0.25,"T":0.04,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":14,"Type":"Hull System","Tier":-2,"Size Sort":2,"Size Class":"Medium","Name":"[T-2][M] Double Alloy-4 Duranium Hull","Effect":0.66,"Weight O/H":35,"Scale Weight":12,"Unit Weight":0,"SR Cost x":0.014,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.02,"E":0.4,"T":0.05,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":14,"Type":"Hull System","Tier":-2,"Size Sort":3,"Size Class":"Heavy","Name":"[T-2][H] Duranium w/ Bartridium Rebar","Effect":0.775,"Weight O/H":80,"Scale Weight":8,"Unit Weight":0,"SR Cost x":0.0375,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.2,"E":0.5,"T":0.2,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":14,"Type":"Hull System","Tier":-1,"Size Sort":1,"Size Class":"Light","Name":"[T-1][L] Single Duranium Hull","Effect":0.35,"Weight O/H":0,"Scale Weight":13,"Unit Weight":0,"SR Cost x":0.011,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.01,"E":0.25,"T":0.04,"Reliability":1,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":14,"Type":"Hull System","Tier":-1,"Size Sort":2,"Size Class":"Medium","Name":"[T-1][M] Double Duranium Hull","Effect":0.7,"Weight O/H":35,"Scale Weight":12,"Unit Weight":0,"SR Cost x":0.014,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.02,"E":0.4,"T":0.05,"Reliability":1,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":14,"Type":"Hull System","Tier":-1,"Size Sort":3,"Size Class":"Heavy","Name":"[T-1][H] Duranium w/ Exotic Rebar","Effect":0.8,"Weight O/H":80,"Scale Weight":8,"Unit Weight":0,"SR Cost x":0.0375,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.2,"E":0.5,"T":0.2,"Reliability":1,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":14,"Type":"Hull System","Tier":-2,"Size Sort":1,"Size Class":"Light","Name":"[T-2][L] Civilian Grade","Effect":0.25,"Weight O/H":0,"Scale Weight":11.5,"Unit Weight":0,"SR Cost x":0.001,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0.1,"T":0.1,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":14,"Type":"Hull System","Tier":0,"Size Sort":1,"Size Class":"Light","Name":"[T0][L] Lt. Alloy-1 Duranium Hull","Effect":0.36,"Weight O/H":0,"Scale Weight":12.5,"Unit Weight":0,"SR Cost x":0.012,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.01,"E":0.15,"T":0.075,"Reliability":1,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":14,"Type":"Hull System","Tier":0,"Size Sort":2,"Size Class":"Medium","Name":"[T0][M] Duranium-335 Alloy Hull","Effect":0.74,"Weight O/H":35,"Scale Weight":12,"Unit Weight":0,"SR Cost x":0.012,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.01,"E":0.2,"T":0.05,"Reliability":1,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":14,"Type":"Hull System","Tier":0,"Size Sort":3,"Size Class":"Heavy","Name":"[T0][H] Duranium-447 Alloy Hull","Effect":0.85,"Weight O/H":80,"Scale Weight":8,"Unit Weight":0,"SR Cost x":0.016,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.01,"E":0.3,"T":0.035,"Reliability":1,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":14,"Type":"Hull System","Tier":1,"Size Sort":1,"Size Class":"Light","Name":"[T1][L] Lt. Alloy-2 Duranium Hull","Effect":0.37,"Weight O/H":0,"Scale Weight":12,"Unit Weight":0,"SR Cost x":0.012,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.01,"E":0.15,"T":0.075,"Reliability":1,"Year Available (SF)":2310,"Size Class List":"","Full Tier List":""},{"Type Sort":14,"Type":"Hull System","Tier":1,"Size Sort":2,"Size Class":"Medium","Name":"[T1][M] Med. Alloy-2 Duranium Hull","Effect":0.78,"Weight O/H":35,"Scale Weight":11,"Unit Weight":0,"SR Cost x":0.015,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.01,"E":0.2,"T":0.075,"Reliability":1,"Year Available (SF)":2310,"Size Class List":"","Full Tier List":""},{"Type Sort":14,"Type":"Hull System","Tier":1,"Size Sort":3,"Size Class":"Heavy","Name":"[T1][H] Hvy. Alloy-2 Duranium Hull","Effect":0.9,"Weight O/H":80,"Scale Weight":8,"Unit Weight":0,"SR Cost x":0.018,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.01,"E":0.3,"T":0.035,"Reliability":1,"Year Available (SF)":2310,"Size Class List":"","Full Tier List":""},{"Type Sort":14,"Type":"Hull System","Tier":2,"Size Sort":1,"Size Class":"Light","Name":"[T2][L] Lt. Alloy-3 Duranium Hull","Effect":0.38,"Weight O/H":0,"Scale Weight":11.5,"Unit Weight":0,"SR Cost x":0.012,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.01,"E":0.15,"T":0.075,"Reliability":1,"Year Available (SF)":2313,"Size Class List":"","Full Tier List":""},{"Type Sort":14,"Type":"Hull System","Tier":2,"Size Sort":2,"Size Class":"Medium","Name":"[T2][M] Med. Alloy-3 Duranium Hull","Effect":0.82,"Weight O/H":35,"Scale Weight":11,"Unit Weight":0,"SR Cost x":0.015,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.01,"E":0.2,"T":0.075,"Reliability":1,"Year Available (SF)":2313,"Size Class List":"","Full Tier List":""},{"Type Sort":14,"Type":"Hull System","Tier":2,"Size Sort":3,"Size Class":"Heavy","Name":"[T2][H] Hvy. Alloy-3 Duranium Hull","Effect":0.95,"Weight O/H":80,"Scale Weight":8,"Unit Weight":0,"SR Cost x":0.018,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.01,"E":0.3,"T":0.035,"Reliability":1,"Year Available (SF)":2313,"Size Class List":"","Full Tier List":""},{"Type Sort":14,"Type":"Hull System","Tier":3,"Size Sort":1,"Size Class":"Light","Name":"[T3][L] Lt. Alloy-4 Duranium Hull","Effect":0.4,"Weight O/H":0,"Scale Weight":11,"Unit Weight":0,"SR Cost x":0.012,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.01,"E":0.15,"T":0.075,"Reliability":1,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":14,"Type":"Hull System","Tier":3,"Size Sort":2,"Size Class":"Medium","Name":"[T3][M] Med. Alloy-4 Duranium Hull","Effect":0.86,"Weight O/H":35,"Scale Weight":11,"Unit Weight":0,"SR Cost x":0.015,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.01,"E":0.2,"T":0.075,"Reliability":1,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":14,"Type":"Hull System","Tier":3,"Size Sort":3,"Size Class":"Heavy","Name":"[T3][H] Hvy. Alloy-4 Duranium Hull","Effect":1,"Weight O/H":80,"Scale Weight":8,"Unit Weight":0,"SR Cost x":0.018,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.01,"E":0.3,"T":0.035,"Reliability":1,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":15,"Type":"Structural Integrity Fields","Tier":-99,"Size Sort":-99,"Size Class":"N/A","Name":"No SIF","Effect":0,"Weight O/H":0,"Scale Weight":0,"Unit Weight":0,"SR Cost x":0,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":0,"Size Class List":"","Full Tier List":""},{"Type Sort":15,"Type":"Structural Integrity Fields","Tier":-3,"Size Sort":1,"Size Class":"Light","Name":"[T-3][L] Type-I-L SIF","Effect":0.215,"Weight O/H":10,"Scale Weight":0,"Unit Weight":10,"SR Cost x":0.25,"Pwr O/H":0,"Scale Pwr":0.7,"Unit Power":2,"O":0.01,"E":0.3,"T":0.07,"Reliability":0.997,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":15,"Type":"Structural Integrity Fields","Tier":-3,"Size Sort":2,"Size Class":"Medium","Name":"[T-3][M] Type-I SIF","Effect":0.375,"Weight O/H":10,"Scale Weight":0,"Unit Weight":9,"SR Cost x":0.06,"Pwr O/H":0,"Scale Pwr":0.68,"Unit Power":0.68,"O":0.05,"E":0.35,"T":0.05,"Reliability":0.999,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":15,"Type":"Structural Integrity Fields","Tier":-3,"Size Sort":3,"Size Class":"Heavy","Name":"[T-3][H] Mars-III Special SIF","Effect":0.5,"Weight O/H":27,"Scale Weight":0,"Unit Weight":15,"SR Cost x":0.22,"Pwr O/H":0,"Scale Pwr":0.68,"Unit Power":0.68,"O":0.08,"E":0.4,"T":0.075,"Reliability":0.998,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":15,"Type":"Structural Integrity Fields","Tier":-2,"Size Sort":1,"Size Class":"Light","Name":"[T-2][L] Type-II-L SIF","Effect":0.25,"Weight O/H":10,"Scale Weight":0,"Unit Weight":10,"SR Cost x":0.25,"Pwr O/H":0,"Scale Pwr":0.7,"Unit Power":2,"O":0.01,"E":0.3,"T":0.07,"Reliability":0.997,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":15,"Type":"Structural Integrity Fields","Tier":-2,"Size Sort":2,"Size Class":"Medium","Name":"[T-2][M] Type-II SIF","Effect":0.4,"Weight O/H":10,"Scale Weight":0,"Unit Weight":9,"SR Cost x":0.06,"Pwr O/H":0,"Scale Pwr":0.68,"Unit Power":0.68,"O":0.05,"E":0.35,"T":0.05,"Reliability":0.999,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":15,"Type":"Structural Integrity Fields","Tier":-2,"Size Sort":3,"Size Class":"Heavy","Name":"[T-2][H] Mars-IV Special SIF","Effect":0.6,"Weight O/H":27,"Scale Weight":0,"Unit Weight":15,"SR Cost x":0.22,"Pwr O/H":0,"Scale Pwr":0.68,"Unit Power":0.68,"O":0.08,"E":0.4,"T":0.075,"Reliability":0.998,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":15,"Type":"Structural Integrity Fields","Tier":-1,"Size Sort":1,"Size Class":"Light","Name":"[T-1][L] Type-III-L SIF","Effect":0.4,"Weight O/H":10,"Scale Weight":0,"Unit Weight":10,"SR Cost x":0.25,"Pwr O/H":0,"Scale Pwr":0.7,"Unit Power":2,"O":0.01,"E":0.3,"T":0.07,"Reliability":0.997,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":15,"Type":"Structural Integrity Fields","Tier":-1,"Size Sort":2,"Size Class":"Medium","Name":"[T-1][M] Type-III SIF","Effect":0.45,"Weight O/H":10,"Scale Weight":0,"Unit Weight":9,"SR Cost x":0.06,"Pwr O/H":0,"Scale Pwr":0.68,"Unit Power":0.68,"O":0.05,"E":0.35,"T":0.05,"Reliability":0.999,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":15,"Type":"Structural Integrity Fields","Tier":-1,"Size Sort":3,"Size Class":"Heavy","Name":"[T-1][H] Mars-V Special SIF","Effect":0.7,"Weight O/H":27,"Scale Weight":0,"Unit Weight":15,"SR Cost x":0.22,"Pwr O/H":0,"Scale Pwr":0.68,"Unit Power":0.68,"O":0.08,"E":0.4,"T":0.075,"Reliability":0.998,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":15,"Type":"Structural Integrity Fields","Tier":0,"Size Sort":1,"Size Class":"Light","Name":"[T0][L] Type-IV-L SIF","Effect":0.6,"Weight O/H":10,"Scale Weight":0,"Unit Weight":10,"SR Cost x":0.25,"Pwr O/H":0,"Scale Pwr":0.7,"Unit Power":2,"O":0.01,"E":0.3,"T":0.07,"Reliability":0.997,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":15,"Type":"Structural Integrity Fields","Tier":0,"Size Sort":2,"Size Class":"Medium","Name":"[T0][M] Type-IV SIF","Effect":0.75,"Weight O/H":20,"Scale Weight":0,"Unit Weight":8,"SR Cost x":0.14,"Pwr O/H":0,"Scale Pwr":0.7,"Unit Power":1.2,"O":0.01,"E":0.25,"T":0.07,"Reliability":0.999,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":15,"Type":"Structural Integrity Fields","Tier":0,"Size Sort":3,"Size Class":"Heavy","Name":"[T0][H] Type-IV-H SIF","Effect":0.9,"Weight O/H":34,"Scale Weight":0,"Unit Weight":8,"SR Cost x":0.1,"Pwr O/H":0,"Scale Pwr":0.72,"Unit Power":0.74,"O":0.02,"E":0.15,"T":0.06,"Reliability":0.998,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":15,"Type":"Structural Integrity Fields","Tier":1,"Size Sort":1,"Size Class":"Light","Name":"[T1][L] Type-V-L SIF","Effect":0.65,"Weight O/H":10,"Scale Weight":0,"Unit Weight":10,"SR Cost x":0.25,"Pwr O/H":0,"Scale Pwr":0.7,"Unit Power":2,"O":0.01,"E":0.25,"T":0.07,"Reliability":0.997,"Year Available (SF)":2310,"Size Class List":"","Full Tier List":""},{"Type Sort":15,"Type":"Structural Integrity Fields","Tier":1,"Size Sort":2,"Size Class":"Medium","Name":"[T1][M] Type-V SIF","Effect":0.8,"Weight O/H":20,"Scale Weight":0,"Unit Weight":8,"SR Cost x":0.14,"Pwr O/H":0,"Scale Pwr":0.7,"Unit Power":1.2,"O":0.01,"E":0.25,"T":0.07,"Reliability":0.999,"Year Available (SF)":2310,"Size Class List":"","Full Tier List":""},{"Type Sort":15,"Type":"Structural Integrity Fields","Tier":1,"Size Sort":3,"Size Class":"Heavy","Name":"[T1][H] Type-V-H SIF","Effect":0.95,"Weight O/H":34,"Scale Weight":0,"Unit Weight":8,"SR Cost x":0.115,"Pwr O/H":0,"Scale Pwr":0.72,"Unit Power":0.74,"O":0.02,"E":0.15,"T":0.06,"Reliability":0.998,"Year Available (SF)":2310,"Size Class List":"","Full Tier List":""},{"Type Sort":15,"Type":"Structural Integrity Fields","Tier":2,"Size Sort":1,"Size Class":"Light","Name":"[T2][L] Type-VI-L SIF","Effect":0.675,"Weight O/H":10,"Scale Weight":0,"Unit Weight":10,"SR Cost x":0.25,"Pwr O/H":0,"Scale Pwr":0.7,"Unit Power":2,"O":0.01,"E":0.25,"T":0.07,"Reliability":0.997,"Year Available (SF)":2315,"Size Class List":"","Full Tier List":""},{"Type Sort":15,"Type":"Structural Integrity Fields","Tier":2,"Size Sort":2,"Size Class":"Medium","Name":"[T2][M] Type-VI SIF","Effect":0.825,"Weight O/H":20,"Scale Weight":0,"Unit Weight":8,"SR Cost x":0.14,"Pwr O/H":0,"Scale Pwr":0.7,"Unit Power":1.2,"O":0.01,"E":0.25,"T":0.07,"Reliability":0.999,"Year Available (SF)":2315,"Size Class List":"","Full Tier List":""},{"Type Sort":15,"Type":"Structural Integrity Fields","Tier":2,"Size Sort":3,"Size Class":"Heavy","Name":"[T2][H] Type-VI-H SIF","Effect":0.975,"Weight O/H":34,"Scale Weight":0,"Unit Weight":8,"SR Cost x":0.115,"Pwr O/H":0,"Scale Pwr":0.72,"Unit Power":0.74,"O":0.02,"E":0.15,"T":0.06,"Reliability":0.998,"Year Available (SF)":2315,"Size Class List":"","Full Tier List":""},{"Type Sort":15,"Type":"Structural Integrity Fields","Tier":3,"Size Sort":1,"Size Class":"Light","Name":"[T3][L] Type-VII-L SIF","Effect":0.7,"Weight O/H":10,"Scale Weight":0,"Unit Weight":10,"SR Cost x":0.25,"Pwr O/H":0,"Scale Pwr":0.7,"Unit Power":2,"O":0.01,"E":0.25,"T":0.07,"Reliability":0.997,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":15,"Type":"Structural Integrity Fields","Tier":3,"Size Sort":2,"Size Class":"Medium","Name":"[T3][M] Type-VII SIF","Effect":0.85,"Weight O/H":20,"Scale Weight":0,"Unit Weight":8,"SR Cost x":0.14,"Pwr O/H":0,"Scale Pwr":0.7,"Unit Power":1.2,"O":0.01,"E":0.25,"T":0.07,"Reliability":0.999,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":15,"Type":"Structural Integrity Fields","Tier":3,"Size Sort":3,"Size Class":"Heavy","Name":"[T3][H] Type-VII-H SIF","Effect":1,"Weight O/H":34,"Scale Weight":0,"Unit Weight":8,"SR Cost x":0.115,"Pwr O/H":0,"Scale Pwr":0.72,"Unit Power":0.74,"O":0.02,"E":0.15,"T":0.06,"Reliability":0.998,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":15,"Type":"Structural Integrity Fields","Tier":4,"Size Sort":1,"Size Class":"Light","Name":"[T4][L] Type-VIII-L SIF","Effect":0.725,"Weight O/H":10,"Scale Weight":0,"Unit Weight":10,"SR Cost x":0.25,"Pwr O/H":0,"Scale Pwr":0.7,"Unit Power":2,"O":0.01,"E":0.25,"T":0.07,"Reliability":0.997,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":15,"Type":"Structural Integrity Fields","Tier":4,"Size Sort":2,"Size Class":"Medium","Name":"[T4][M] Type-VIII SIF","Effect":0.9,"Weight O/H":20,"Scale Weight":0,"Unit Weight":8,"SR Cost x":0.14,"Pwr O/H":0,"Scale Pwr":0.7,"Unit Power":1.2,"O":0.01,"E":0.25,"T":0.07,"Reliability":0.999,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":15,"Type":"Structural Integrity Fields","Tier":4,"Size Sort":3,"Size Class":"Heavy","Name":"[T4][H] Type-VIII-H SIF","Effect":1.1,"Weight O/H":34,"Scale Weight":0,"Unit Weight":8,"SR Cost x":0.115,"Pwr O/H":0,"Scale Pwr":0.72,"Unit Power":0.74,"O":0.02,"E":0.15,"T":0.06,"Reliability":0.998,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":16,"Type":"Deflector Shields","Tier":-99,"Size Sort":-99,"Size Class":"N/A","Name":"No Shields","Effect":0,"Weight O/H":0,"Scale Weight":0,"Unit Weight":0,"SR Cost x":0,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":0,"Size Class List":"","Full Tier List":""},{"Type Sort":16,"Type":"Deflector Shields","Tier":-3,"Size Sort":1,"Size Class":"Light","Name":"[T-3][L] AAE-L Monophasic Escort Pattern","Effect":0.5,"Weight O/H":0,"Scale Weight":0,"Unit Weight":6,"SR Cost x":0.13,"Pwr O/H":1.5,"Scale Pwr":2,"Unit Power":1.5,"O":0.005,"E":0.005,"T":0.08,"Reliability":1,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":16,"Type":"Deflector Shields","Tier":-3,"Size Sort":2,"Size Class":"Medium","Name":"[T-3][M] AAE-M Cyclic Monophasic","Effect":0.6,"Weight O/H":0,"Scale Weight":0,"Unit Weight":12,"SR Cost x":0.15,"Pwr O/H":1.45,"Scale Pwr":1.9,"Unit Power":1.45,"O":0.1,"E":0.005,"T":0.14,"Reliability":1,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":16,"Type":"Deflector Shields","Tier":-3,"Size Sort":3,"Size Class":"Heavy","Name":"[T-3][H] AAE-H Monophasic Heavy Pattern","Effect":0.8,"Weight O/H":0,"Scale Weight":0,"Unit Weight":16,"SR Cost x":0.175,"Pwr O/H":1.45,"Scale Pwr":1.9,"Unit Power":1.45,"O":0.02,"E":0.005,"T":0.1,"Reliability":1,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":16,"Type":"Deflector Shields","Tier":-2,"Size Sort":1,"Size Class":"Light","Name":"[T-2][L] AAE-B-L Monophasic Escort Pattern","Effect":0.7,"Weight O/H":0,"Scale Weight":0,"Unit Weight":6,"SR Cost x":0.13,"Pwr O/H":1.5,"Scale Pwr":2,"Unit Power":1.5,"O":0.005,"E":0.005,"T":0.08,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":16,"Type":"Deflector Shields","Tier":-2,"Size Sort":2,"Size Class":"Medium","Name":"[T-2][M] AAE-B-M Cyclic Monophasic","Effect":0.9,"Weight O/H":0,"Scale Weight":0,"Unit Weight":12,"SR Cost x":0.15,"Pwr O/H":1.45,"Scale Pwr":1.9,"Unit Power":1.45,"O":0.1,"E":0.005,"T":0.14,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":16,"Type":"Deflector Shields","Tier":-2,"Size Sort":3,"Size Class":"Heavy","Name":"[T-2][H] AAE-B-H Monophasic Heavy Pattern","Effect":1,"Weight O/H":0,"Scale Weight":0,"Unit Weight":16,"SR Cost x":0.175,"Pwr O/H":1.45,"Scale Pwr":1.9,"Unit Power":1.45,"O":0.02,"E":0.005,"T":0.1,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":16,"Type":"Deflector Shields","Tier":-1,"Size Sort":1,"Size Class":"Light","Name":"[T-1][L] Mk1 Monophasic Escort Pattern","Effect":0.8,"Weight O/H":0,"Scale Weight":0,"Unit Weight":6,"SR Cost x":0.13,"Pwr O/H":1.5,"Scale Pwr":2,"Unit Power":1.5,"O":0.005,"E":0.005,"T":0.08,"Reliability":1,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":16,"Type":"Deflector Shields","Tier":-1,"Size Sort":2,"Size Class":"Medium","Name":"[T-1][M] Mk1 Cyclic Monophasic E-Type","Effect":1.05,"Weight O/H":0,"Scale Weight":0,"Unit Weight":12,"SR Cost x":0.15,"Pwr O/H":1.45,"Scale Pwr":1.9,"Unit Power":1.45,"O":0.1,"E":0.005,"T":0.14,"Reliability":1,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":16,"Type":"Deflector Shields","Tier":-1,"Size Sort":3,"Size Class":"Heavy","Name":"[T-1][H] Mk1 Monophasic Heavy Pattern","Effect":1.1,"Weight O/H":0,"Scale Weight":0,"Unit Weight":16,"SR Cost x":0.175,"Pwr O/H":1.45,"Scale Pwr":1.9,"Unit Power":1.45,"O":0.02,"E":0.005,"T":0.1,"Reliability":1,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":16,"Type":"Deflector Shields","Tier":0,"Size Sort":1,"Size Class":"Light","Name":"[T0][L] Mk-III-E Shield Gens","Effect":0.9,"Weight O/H":0,"Scale Weight":0,"Unit Weight":6,"SR Cost x":0.2,"Pwr O/H":1.45,"Scale Pwr":2,"Unit Power":1.8,"O":0.005,"E":0.005,"T":0.08,"Reliability":1,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":16,"Type":"Deflector Shields","Tier":0,"Size Sort":2,"Size Class":"Medium","Name":"[T0][M] Mk-III-H Shield Gens","Effect":1.15,"Weight O/H":0,"Scale Weight":0,"Unit Weight":16,"SR Cost x":0.15,"Pwr O/H":1.45,"Scale Pwr":2.2,"Unit Power":4,"O":0.02,"E":0.005,"T":0.1,"Reliability":1,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":16,"Type":"Deflector Shields","Tier":0,"Size Sort":3,"Size Class":"Heavy","Name":"[T0][H] Mk-III-SH Shield Gens","Effect":1.5,"Weight O/H":0,"Scale Weight":0,"Unit Weight":25,"SR Cost x":0.135,"Pwr O/H":1.45,"Scale Pwr":2.2,"Unit Power":4,"O":0.02,"E":0.005,"T":0.1,"Reliability":1,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":16,"Type":"Deflector Shields","Tier":1,"Size Sort":1,"Size Class":"Light","Name":"[T1][L] Mk-IV-E Shield Gens","Effect":0.95,"Weight O/H":0,"Scale Weight":0,"Unit Weight":6,"SR Cost x":0.2,"Pwr O/H":1.45,"Scale Pwr":2,"Unit Power":1.8,"O":0.005,"E":0.005,"T":0.08,"Reliability":1,"Year Available (SF)":2307,"Size Class List":"","Full Tier List":""},{"Type Sort":16,"Type":"Deflector Shields","Tier":1,"Size Sort":3,"Size Class":"Heavy","Name":"[T1][H] Mk-IV-H Shield Gens","Effect":1.3,"Weight O/H":0,"Scale Weight":0,"Unit Weight":16,"SR Cost x":0.15,"Pwr O/H":1.45,"Scale Pwr":2.2,"Unit Power":4.5,"O":0.02,"E":0.005,"T":0.1,"Reliability":1,"Year Available (SF)":2307,"Size Class List":"","Full Tier List":""},{"Type Sort":16,"Type":"Deflector Shields","Tier":2,"Size Sort":1,"Size Class":"Light","Name":"[T2][L] Mk-V-E Shield Gens","Effect":1,"Weight O/H":0,"Scale Weight":0,"Unit Weight":6,"SR Cost x":0.2,"Pwr O/H":1.45,"Scale Pwr":2,"Unit Power":1.8,"O":0.005,"E":0.005,"T":0.08,"Reliability":1,"Year Available (SF)":2311,"Size Class List":"","Full Tier List":""},{"Type Sort":16,"Type":"Deflector Shields","Tier":2,"Size Sort":2,"Size Class":"Medium","Name":"[T2][M] Mk-V-H Shield Gens","Effect":1.45,"Weight O/H":0,"Scale Weight":0,"Unit Weight":16,"SR Cost x":0.15,"Pwr O/H":1.45,"Scale Pwr":2.2,"Unit Power":5,"O":0.02,"E":0.005,"T":0.1,"Reliability":1,"Year Available (SF)":2311,"Size Class List":"","Full Tier List":""},{"Type Sort":16,"Type":"Deflector Shields","Tier":2,"Size Sort":3,"Size Class":"Heavy","Name":"[T2][H] Mk-V-SH Shield Gens","Effect":1.9,"Weight O/H":0,"Scale Weight":0,"Unit Weight":30,"SR Cost x":0.135,"Pwr O/H":1.45,"Scale Pwr":2.2,"Unit Power":5,"O":0.02,"E":0.005,"T":0.1,"Reliability":1,"Year Available (SF)":2311,"Size Class List":"","Full Tier List":""},{"Type Sort":16,"Type":"Deflector Shields","Tier":3,"Size Sort":1,"Size Class":"Light","Name":"[T3][L] Mk-VI-E Shield Gens","Effect":1.1,"Weight O/H":0,"Scale Weight":0,"Unit Weight":8,"SR Cost x":0.2,"Pwr O/H":1.45,"Scale Pwr":2,"Unit Power":1.8,"O":0.005,"E":0.005,"T":0.08,"Reliability":1,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":16,"Type":"Deflector Shields","Tier":3,"Size Sort":2,"Size Class":"Medium","Name":"[T3][M] Mk-VI-H Shield Gens","Effect":1.6,"Weight O/H":0,"Scale Weight":0,"Unit Weight":18,"SR Cost x":0.15,"Pwr O/H":1.45,"Scale Pwr":2.2,"Unit Power":5,"O":0.02,"E":0.005,"T":0.1,"Reliability":1,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":16,"Type":"Deflector Shields","Tier":3,"Size Sort":3,"Size Class":"Heavy","Name":"[T3][H] Mk-VI-SH Shield Gens","Effect":2.3,"Weight O/H":0,"Scale Weight":0,"Unit Weight":35,"SR Cost x":0.135,"Pwr O/H":1.45,"Scale Pwr":2.2,"Unit Power":5,"O":0.02,"E":0.005,"T":0.1,"Reliability":1,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":16,"Type":"Deflector Shields","Tier":99,"Size Sort":99,"Size Class":"","Name":"x[T0] Monophasic Shields (2260s DS)","Effect":"","Weight O/H":"","Scale Weight":"","Unit Weight":"","SR Cost x":"","Pwr O/H":"","Scale Pwr":"","Unit Power":"","O":"","E":"","T":"","Reliability":"","Year Available (SF)":"","Size Class List":"","Full Tier List":""},{"Type Sort":16,"Type":"Deflector Shields","Tier":99,"Size Sort":99,"Size Class":"","Name":"x[T1] Biphasic Shields (DS I)","Effect":"","Weight O/H":"","Scale Weight":"","Unit Weight":"","SR Cost x":"","Pwr O/H":"","Scale Pwr":"","Unit Power":"","O":"","E":"","T":"","Reliability":"","Year Available (SF)":"","Size Class List":"","Full Tier List":""},{"Type Sort":16,"Type":"Deflector Shields","Tier":99,"Size Sort":99,"Size Class":"","Name":"x[T2] Detuned Ellipsoidal Shields (DS II)","Effect":"","Weight O/H":"","Scale Weight":"","Unit Weight":"","SR Cost x":"","Pwr O/H":"","Scale Pwr":"","Unit Power":"","O":"","E":"","T":"","Reliability":"","Year Available (SF)":"","Size Class List":"","Full Tier List":""},{"Type Sort":16,"Type":"Deflector Shields","Tier":99,"Size Sort":99,"Size Class":"","Name":"x[T4] Polyphasic Shields (DS III)","Effect":"","Weight O/H":"","Scale Weight":"","Unit Weight":"","SR Cost x":"","Pwr O/H":"","Scale Pwr":"","Unit Power":"","O":"","E":"","T":"","Reliability":"","Year Available (SF)":"","Size Class List":"","Full Tier List":""},{"Type Sort":16,"Type":"Deflector Shields","Tier":99,"Size Sort":99,"Size Class":"","Name":"x[T4] Self-Integrating Shields (DS IV)","Effect":"","Weight O/H":"","Scale Weight":"","Unit Weight":"","SR Cost x":"","Pwr O/H":"","Scale Pwr":"","Unit Power":"","O":"","E":"","T":"","Reliability":"","Year Available (SF)":"","Size Class List":"","Full Tier List":""},{"Type Sort":17,"Type":"Navigational Deflectors","Tier":99,"Size Sort":99,"Size Class":"","Name":"xNo Nav Deflector","Effect":0,"Weight O/H":0,"Scale Weight":0,"Unit Weight":0,"SR Cost x":0,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":0,"Size Class List":"","Full Tier List":""},{"Type Sort":17,"Type":"Navigational Deflectors","Tier":-3,"Size Sort":1,"Size Class":"Light","Name":"[T-3][L] Saucer-Only Polyphasic Deflector","Effect":0.2,"Weight O/H":2,"Scale Weight":0,"Unit Weight":7,"SR Cost x":0.12,"Pwr O/H":2,"Scale Pwr":1,"Unit Power":0,"O":0.04,"E":0.05,"T":0.01,"Reliability":1,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":17,"Type":"Navigational Deflectors","Tier":-3,"Size Sort":2,"Size Class":"Medium","Name":"[T-3][M] Polyphasic Deflector","Effect":0.25,"Weight O/H":4,"Scale Weight":0,"Unit Weight":8,"SR Cost x":0.12,"Pwr O/H":2,"Scale Pwr":1,"Unit Power":0,"O":0.06,"E":0.1,"T":0.01,"Reliability":1,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":17,"Type":"Navigational Deflectors","Tier":-3,"Size Sort":3,"Size Class":"Heavy","Name":"[T-3][H] Advanced Polyphasic Deflector","Effect":0.4,"Weight O/H":4,"Scale Weight":0,"Unit Weight":7,"SR Cost x":0.12,"Pwr O/H":2,"Scale Pwr":1,"Unit Power":0,"O":0.08,"E":0.075,"T":0.01,"Reliability":1,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":17,"Type":"Navigational Deflectors","Tier":-2,"Size Sort":1,"Size Class":"Light","Name":"[T-2][L] Saucer-Only Gravitic Deflector","Effect":0.25,"Weight O/H":2,"Scale Weight":0,"Unit Weight":7,"SR Cost x":0.12,"Pwr O/H":2,"Scale Pwr":1,"Unit Power":0,"O":0.04,"E":0.05,"T":0.01,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":17,"Type":"Navigational Deflectors","Tier":-2,"Size Sort":2,"Size Class":"Medium","Name":"[T-2][M] Gravitic Deflector","Effect":0.3,"Weight O/H":4,"Scale Weight":0,"Unit Weight":8,"SR Cost x":0.12,"Pwr O/H":2,"Scale Pwr":1,"Unit Power":0,"O":0.06,"E":0.1,"T":0.01,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":17,"Type":"Navigational Deflectors","Tier":-2,"Size Sort":3,"Size Class":"Heavy","Name":"[T-2][H] Advanced Gravitic Deflector","Effect":0.5,"Weight O/H":4,"Scale Weight":0,"Unit Weight":7,"SR Cost x":0.12,"Pwr O/H":2,"Scale Pwr":1,"Unit Power":0,"O":0.08,"E":0.075,"T":0.01,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":17,"Type":"Navigational Deflectors","Tier":-1,"Size Sort":1,"Size Class":"Light","Name":"[T-1][L] Saucer-Only Graviton Deflector","Effect":0.3,"Weight O/H":2,"Scale Weight":0,"Unit Weight":7,"SR Cost x":0.12,"Pwr O/H":2,"Scale Pwr":1,"Unit Power":0,"O":0.04,"E":0.05,"T":0.01,"Reliability":1,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":17,"Type":"Navigational Deflectors","Tier":-1,"Size Sort":2,"Size Class":"Medium","Name":"[T-1][M] Graviton Deflector","Effect":0.4,"Weight O/H":4,"Scale Weight":0,"Unit Weight":8,"SR Cost x":0.12,"Pwr O/H":2,"Scale Pwr":1,"Unit Power":0,"O":0.06,"E":0.1,"T":0.01,"Reliability":1,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":17,"Type":"Navigational Deflectors","Tier":-1,"Size Sort":3,"Size Class":"Heavy","Name":"[T-1][H] Advanced Graviton Deflector","Effect":0.6,"Weight O/H":4,"Scale Weight":0,"Unit Weight":7,"SR Cost x":0.12,"Pwr O/H":2,"Scale Pwr":1,"Unit Power":0,"O":0.08,"E":0.075,"T":0.01,"Reliability":1,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":17,"Type":"Navigational Deflectors","Tier":0,"Size Sort":1,"Size Class":"Light","Name":"[T0][L] Graviton Beam Deflector Saucer-Only","Effect":0.3,"Weight O/H":0,"Scale Weight":0,"Unit Weight":7,"SR Cost x":0.11,"Pwr O/H":2.2,"Scale Pwr":1.1,"Unit Power":0,"O":0.05,"E":0.05,"T":0.01,"Reliability":1,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":17,"Type":"Navigational Deflectors","Tier":0,"Size Sort":3,"Size Class":"Heavy","Name":"[T0][H] Advanced Graviton Beam Deflector","Effect":0.65,"Weight O/H":8,"Scale Weight":0,"Unit Weight":8,"SR Cost x":0.11,"Pwr O/H":3,"Scale Pwr":1.25,"Unit Power":0,"O":0.06,"E":0.06,"T":0.01,"Reliability":1,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":17,"Type":"Navigational Deflectors","Tier":1,"Size Sort":1,"Size Class":"Light","Name":"[T1][L] Modulated Graviton Beam Deflector Saucer-Only","Effect":0.35,"Weight O/H":0,"Scale Weight":0,"Unit Weight":7,"SR Cost x":0.11,"Pwr O/H":2.2,"Scale Pwr":1.1,"Unit Power":0,"O":0.05,"E":0.05,"T":0.01,"Reliability":1,"Year Available (SF)":2307,"Size Class List":"","Full Tier List":""},{"Type Sort":17,"Type":"Navigational Deflectors","Tier":1,"Size Sort":3,"Size Class":"Heavy","Name":"[T1][H] Modulated Graviton Beam Deflector","Effect":0.7,"Weight O/H":7.5,"Scale Weight":0,"Unit Weight":7.5,"SR Cost x":0.11,"Pwr O/H":3,"Scale Pwr":1.25,"Unit Power":0,"O":0.06,"E":0.06,"T":0.01,"Reliability":1,"Year Available (SF)":2307,"Size Class List":"","Full Tier List":""},{"Type Sort":17,"Type":"Navigational Deflectors","Tier":2,"Size Sort":1,"Size Class":"Light","Name":"[T2][L] Graviton Wavefront Deflector Saucer-Only","Effect":0.4,"Weight O/H":0,"Scale Weight":0,"Unit Weight":7,"SR Cost x":0.1,"Pwr O/H":2.2,"Scale Pwr":1.1,"Unit Power":0,"O":0.05,"E":0.05,"T":0.01,"Reliability":1,"Year Available (SF)":2317,"Size Class List":"","Full Tier List":""},{"Type Sort":17,"Type":"Navigational Deflectors","Tier":2,"Size Sort":3,"Size Class":"Heavy","Name":"[T2][H] Graviton Wavefront Deflector","Effect":0.75,"Weight O/H":7.5,"Scale Weight":0,"Unit Weight":7.5,"SR Cost x":0.1,"Pwr O/H":3,"Scale Pwr":1.25,"Unit Power":0,"O":0.06,"E":0.06,"T":0.01,"Reliability":1,"Year Available (SF)":2317,"Size Class List":"","Full Tier List":""},{"Type Sort":17,"Type":"Navigational Deflectors","Tier":3,"Size Sort":1,"Size Class":"Light","Name":"[T3][L] Shaped Wavefront Deflector Saucer-Only","Effect":0.45,"Weight O/H":0,"Scale Weight":0,"Unit Weight":7,"SR Cost x":0.1,"Pwr O/H":2.2,"Scale Pwr":1.1,"Unit Power":0,"O":0.05,"E":0.05,"T":0.01,"Reliability":1,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":17,"Type":"Navigational Deflectors","Tier":3,"Size Sort":3,"Size Class":"Heavy","Name":"[T3][H] Shaped Wavefront Deflector","Effect":0.825,"Weight O/H":7.5,"Scale Weight":0,"Unit Weight":7.5,"SR Cost x":0.1,"Pwr O/H":3,"Scale Pwr":1.25,"Unit Power":0,"O":0.06,"E":0.06,"T":0.01,"Reliability":1,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":17,"Type":"Navigational Deflectors","Tier":99,"Size Sort":99,"Size Class":"","Name":"x[T0] Graviton Beam Deflector","Effect":"","Weight O/H":"","Scale Weight":"","Unit Weight":"","SR Cost x":"","Pwr O/H":"","Scale Pwr":"","Unit Power":"","O":"","E":"","T":"","Reliability":"","Year Available (SF)":"","Size Class List":"","Full Tier List":""},{"Type Sort":17,"Type":"Navigational Deflectors","Tier":99,"Size Sort":99,"Size Class":"","Name":"x[T1] Modulated Graviton Beam Deflector","Effect":"","Weight O/H":"","Scale Weight":"","Unit Weight":"","SR Cost x":"","Pwr O/H":"","Scale Pwr":"","Unit Power":"","O":"","E":"","T":"","Reliability":"","Year Available (SF)":"","Size Class List":"","Full Tier List":""},{"Type Sort":17,"Type":"Navigational Deflectors","Tier":99,"Size Sort":99,"Size Class":"","Name":"x[T2] Graviton Wavefront Deflector","Effect":"","Weight O/H":"","Scale Weight":"","Unit Weight":"","SR Cost x":"","Pwr O/H":"","Scale Pwr":"","Unit Power":"","O":"","E":"","T":"","Reliability":"","Year Available (SF)":"","Size Class List":"","Full Tier List":""},{"Type Sort":17,"Type":"Navigational Deflectors","Tier":99,"Size Sort":99,"Size Class":"","Name":"x[T3] Shaped Wavefront Deflector","Effect":"","Weight O/H":"","Scale Weight":"","Unit Weight":"","SR Cost x":"","Pwr O/H":"","Scale Pwr":"","Unit Power":"","O":"","E":"","T":"","Reliability":"","Year Available (SF)":"","Size Class List":"","Full Tier List":""},{"Type Sort":17,"Type":"Navigational Deflectors","Tier":99,"Size Sort":99,"Size Class":"","Name":"x[T4] Astrodynamic Wavefront Deflector","Effect":"","Weight O/H":"","Scale Weight":"","Unit Weight":"","SR Cost x":"","Pwr O/H":"","Scale Pwr":"","Unit Power":"","O":"","E":"","T":"","Reliability":"","Year Available (SF)":"","Size Class List":"","Full Tier List":""},{"Type Sort":18,"Type":"Impulse Engine Power","Tier":-3,"Size Sort":2,"Size Class":"Medium","Name":"[T-3][M] SDB-26 Std Impulse","Effect":0.18,"Weight O/H":5,"Scale Weight":0,"Unit Weight":25,"SR Cost x":0.06,"Pwr O/H":0.1,"Scale Pwr":0.17,"Unit Power":0.35,"O":0,"E":0.1,"T":0.05,"Reliability":1,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":18,"Type":"Impulse Engine Power","Tier":-3,"Size Sort":3,"Size Class":"Heavy","Name":"[T-3][H] SDB R-Type Heavy Impulse","Effect":0.45,"Weight O/H":35,"Scale Weight":0,"Unit Weight":35,"SR Cost x":0.09,"Pwr O/H":0.1,"Scale Pwr":0.12,"Unit Power":0.25,"O":0.1,"E":0.045,"T":0.045,"Reliability":1,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":18,"Type":"Impulse Engine Power","Tier":-2,"Size Sort":2,"Size Class":"Medium","Name":"[T-2][M] SDB-44 Std Impulse","Effect":0.2,"Weight O/H":5,"Scale Weight":0,"Unit Weight":25,"SR Cost x":0.06,"Pwr O/H":0.1,"Scale Pwr":0.17,"Unit Power":0.35,"O":0,"E":0.1,"T":0.05,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":18,"Type":"Impulse Engine Power","Tier":-2,"Size Sort":3,"Size Class":"Heavy","Name":"[T-2][H] SDB C-Type Heavy Impulse","Effect":0.55,"Weight O/H":35,"Scale Weight":0,"Unit Weight":35,"SR Cost x":0.09,"Pwr O/H":0.1,"Scale Pwr":0.12,"Unit Power":0.25,"O":0.1,"E":0.045,"T":0.045,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":18,"Type":"Impulse Engine Power","Tier":-1,"Size Sort":2,"Size Class":"Medium","Name":"[T-1][M] SDB-65 Std Impulse","Effect":0.22,"Weight O/H":5,"Scale Weight":0,"Unit Weight":25,"SR Cost x":0.06,"Pwr O/H":0.1,"Scale Pwr":0.17,"Unit Power":0.35,"O":0,"E":0.1,"T":0.05,"Reliability":1,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":18,"Type":"Impulse Engine Power","Tier":-1,"Size Sort":3,"Size Class":"Heavy","Name":"[T-1][H] SDB E-Type Heavy Impulse","Effect":0.65,"Weight O/H":35,"Scale Weight":0,"Unit Weight":35,"SR Cost x":0.09,"Pwr O/H":0.1,"Scale Pwr":0.12,"Unit Power":0.25,"O":0.1,"E":0.045,"T":0.045,"Reliability":1,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":18,"Type":"Impulse Engine Power","Tier":-2,"Size Sort":1,"Size Class":"Light","Name":"[T-2][L] Civilian Basic Impulse","Effect":0.2,"Weight O/H":10,"Scale Weight":0,"Unit Weight":25,"SR Cost x":0.02,"Pwr O/H":0.1,"Scale Pwr":0.15,"Unit Power":0.2,"O":0,"E":0.1,"T":0.1,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":18,"Type":"Impulse Engine Power","Tier":0,"Size Sort":2,"Size Class":"Medium","Name":"[T0][M] SDB-86 Impulse Drive Sys","Effect":0.26,"Weight O/H":8,"Scale Weight":0,"Unit Weight":25,"SR Cost x":0.06,"Pwr O/H":0.1,"Scale Pwr":0.15,"Unit Power":0.3,"O":0.06,"E":0.04,"T":0.04,"Reliability":1,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":18,"Type":"Impulse Engine Power","Tier":1,"Size Sort":2,"Size Class":"Medium","Name":"[T1][M] SDB-97 High-Power Impulse Drive Sys","Effect":0.3,"Weight O/H":8,"Scale Weight":0,"Unit Weight":25,"SR Cost x":0.06,"Pwr O/H":0.1,"Scale Pwr":0.15,"Unit Power":0.3,"O":0.06,"E":0.04,"T":0.04,"Reliability":1,"Year Available (SF)":2305,"Size Class List":"","Full Tier List":""},{"Type Sort":18,"Type":"Impulse Engine Power","Tier":1,"Size Sort":3,"Size Class":"Heavy","Name":"[T1][H] SDB-97 High-Efficiency Impulse Drive Sys","Effect":0.75,"Weight O/H":45,"Scale Weight":0,"Unit Weight":35,"SR Cost x":0.025,"Pwr O/H":0.1,"Scale Pwr":0.15,"Unit Power":0.3,"O":0.06,"E":0.04,"T":0.04,"Reliability":1,"Year Available (SF)":2305,"Size Class List":"","Full Tier List":""},{"Type Sort":18,"Type":"Impulse Engine Power","Tier":2,"Size Sort":2,"Size Class":"Medium","Name":"[T2][M] SDB-09 High-Power Impulse Drive Sys","Effect":0.36,"Weight O/H":8,"Scale Weight":0,"Unit Weight":25,"SR Cost x":0.06,"Pwr O/H":0.1,"Scale Pwr":0.15,"Unit Power":0.3,"O":0.06,"E":0.04,"T":0.04,"Reliability":1,"Year Available (SF)":2313,"Size Class List":"","Full Tier List":""},{"Type Sort":18,"Type":"Impulse Engine Power","Tier":2,"Size Sort":3,"Size Class":"Heavy","Name":"[T2][H] SDB-09 High-Efficiency Impulse Drive Sys","Effect":0.85,"Weight O/H":45,"Scale Weight":0,"Unit Weight":35,"SR Cost x":0.025,"Pwr O/H":0.1,"Scale Pwr":0.15,"Unit Power":0.3,"O":0.06,"E":0.04,"T":0.04,"Reliability":1,"Year Available (SF)":2313,"Size Class List":"","Full Tier List":""},{"Type Sort":18,"Type":"Impulse Engine Power","Tier":3,"Size Sort":2,"Size Class":"Medium","Name":"[T3][M] SDB-09 High-Power Impulse Drive Sys","Effect":0.42,"Weight O/H":8,"Scale Weight":0,"Unit Weight":25,"SR Cost x":0.06,"Pwr O/H":0.1,"Scale Pwr":0.15,"Unit Power":0.3,"O":0.06,"E":0.04,"T":0.04,"Reliability":1,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":18,"Type":"Impulse Engine Power","Tier":3,"Size Sort":3,"Size Class":"Heavy","Name":"[T3][H] SDB-09 High-Efficiency Impulse Drive Sys","Effect":0.95,"Weight O/H":45,"Scale Weight":0,"Unit Weight":35,"SR Cost x":0.025,"Pwr O/H":0.1,"Scale Pwr":0.15,"Unit Power":0.3,"O":0.06,"E":0.04,"T":0.04,"Reliability":1,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":19,"Type":"Nacelles","Tier":-99,"Size Sort":-99,"Size Class":"N/A","Name":"No Warp Drive","Effect":0,"Weight O/H":0,"Scale Weight":0,"Unit Weight":0,"SR Cost x":0,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":0,"Size Class List":"","Full Tier List":""},{"Type Sort":19,"Type":"Nacelles","Tier":-3,"Size Sort":1,"Size Class":"Light","Name":"[T-3][L] 2 X Saladin Nacelles","Effect":0.77,"Weight O/H":5,"Scale Weight":0,"Unit Weight":45,"SR Cost x":0.12,"Pwr O/H":5,"Scale Pwr":5,"Unit Power":0,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":19,"Type":"Nacelles","Tier":-3,"Size Sort":3,"Size Class":"Heavy","Name":"[T-3][H] 2 X Ranger Heavy Nacelles","Effect":1.1,"Weight O/H":10,"Scale Weight":0,"Unit Weight":85,"SR Cost x":0.15,"Pwr O/H":5,"Scale Pwr":3,"Unit Power":0,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":19,"Type":"Nacelles","Tier":-2,"Size Sort":1,"Size Class":"Light","Name":"[T-2][L] 2 X Soyuz Nacelles","Effect":0.89,"Weight O/H":5,"Scale Weight":0,"Unit Weight":45,"SR Cost x":0.12,"Pwr O/H":5,"Scale Pwr":5,"Unit Power":0,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":19,"Type":"Nacelles","Tier":-2,"Size Sort":3,"Size Class":"Heavy","Name":"[T-2][H] 2 X Constitution Heavy Nacelles","Effect":1.4,"Weight O/H":10,"Scale Weight":0,"Unit Weight":85,"SR Cost x":0.15,"Pwr O/H":5,"Scale Pwr":3,"Unit Power":0,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":19,"Type":"Nacelles","Tier":-1,"Size Sort":1,"Size Class":"Light","Name":"[T-1][L] 2 X Miranda Nacelles","Effect":1.084,"Weight O/H":5,"Scale Weight":0,"Unit Weight":45,"SR Cost x":0.12,"Pwr O/H":5,"Scale Pwr":5,"Unit Power":0,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":19,"Type":"Nacelles","Tier":-1,"Size Sort":2,"Size Class":"Medium","Name":"[T-1][M] 4 X Constellation Nacelles","Effect":1.088,"Weight O/H":5,"Scale Weight":0,"Unit Weight":55,"SR Cost x":0.12,"Pwr O/H":5,"Scale Pwr":5,"Unit Power":0,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":19,"Type":"Nacelles","Tier":-1,"Size Sort":3,"Size Class":"Heavy","Name":"[T-1][H] 2 X Constitution-A Heavy Nacelles","Effect":1.626,"Weight O/H":10,"Scale Weight":0,"Unit Weight":85,"SR Cost x":0.15,"Pwr O/H":5,"Scale Pwr":3,"Unit Power":0,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":19,"Type":"Nacelles","Tier":0,"Size Sort":1,"Size Class":"Light","Name":"[T0][L] 2 X Centaur Nacelles","Effect":1.174,"Weight O/H":5,"Scale Weight":0,"Unit Weight":65,"SR Cost x":0.12,"Pwr O/H":5,"Scale Pwr":5,"Unit Power":0,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":19,"Type":"Nacelles","Tier":0,"Size Sort":3,"Size Class":"Heavy","Name":"[T0][H] 2 X Excelsior Pattern Nacelles","Effect":2.457,"Weight O/H":20,"Scale Weight":0,"Unit Weight":120,"SR Cost x":0.15,"Pwr O/H":5,"Scale Pwr":2,"Unit Power":0,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":19,"Type":"Nacelles","Tier":1,"Size Sort":1,"Size Class":"Light","Name":"[T1][L] 2 X Centaur-A Pattern Nacelle","Effect":1.536,"Weight O/H":5,"Scale Weight":0,"Unit Weight":50,"SR Cost x":0.15,"Pwr O/H":5,"Scale Pwr":4,"Unit Power":0,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":2306,"Size Class List":"","Full Tier List":""},{"Type Sort":19,"Type":"Nacelles","Tier":1,"Size Sort":2,"Size Class":"Medium","Name":"[T1][M] 2 X 2305 Cruiser Nacelle","Effect":2.16,"Weight O/H":10,"Scale Weight":0,"Unit Weight":80,"SR Cost x":0.15,"Pwr O/H":5,"Scale Pwr":3.5,"Unit Power":0,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":2306,"Size Class List":"","Full Tier List":""},{"Type Sort":19,"Type":"Nacelles","Tier":1,"Size Sort":3,"Size Class":"Heavy","Name":"[T1][H] 2 X Excelsior Type-II Pattern Nacelles","Effect":2.52,"Weight O/H":20,"Scale Weight":0,"Unit Weight":135,"SR Cost x":0.16,"Pwr O/H":5,"Scale Pwr":2,"Unit Power":0,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":2306,"Size Class List":"","Full Tier List":""},{"Type Sort":19,"Type":"Nacelles","Tier":2,"Size Sort":1,"Size Class":"Light","Name":"[T2][L] 2 X New Orleans Pattern Nacelles","Effect":1.85,"Weight O/H":5.25,"Scale Weight":0,"Unit Weight":52,"SR Cost x":0.15,"Pwr O/H":6,"Scale Pwr":6,"Unit Power":0,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":19,"Type":"Nacelles","Tier":2,"Size Sort":3,"Size Class":"Heavy","Name":"[T2][H] 2 X Ambassador Pattern Nacelles","Effect":2.64,"Weight O/H":20,"Scale Weight":0,"Unit Weight":125,"SR Cost x":0.16,"Pwr O/H":5,"Scale Pwr":2,"Unit Power":0,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":19,"Type":"Nacelles","Tier":99,"Size Sort":99,"Size Class":"","Name":"x[T-1] Constitution-A Pattern Nacelles","Effect":1.25,"Weight O/H":10,"Scale Weight":0,"Unit Weight":55,"SR Cost x":0.2,"Pwr O/H":5,"Scale Pwr":3,"Unit Power":0,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":"","Size Class List":"","Full Tier List":""},{"Type Sort":19,"Type":"Nacelles","Tier":99,"Size Sort":99,"Size Class":"","Name":"x[T1] Dual Layer Field Effect Coils","Effect":"","Weight O/H":"","Scale Weight":"","Unit Weight":"","SR Cost x":"","Pwr O/H":"","Scale Pwr":"","Unit Power":"","O":"","E":"","T":"","Reliability":"","Year Available (SF)":"","Size Class List":"","Full Tier List":""},{"Type Sort":20,"Type":"Replication Packages","Tier":-99,"Size Sort":-99,"Size Class":"N/A","Name":"No Onboard Industry","Effect":0,"Weight O/H":0,"Scale Weight":0,"Unit Weight":0,"SR Cost x":0,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":0,"Size Class List":"","Full Tier List":""},{"Type Sort":20,"Type":"Replication Packages","Tier":-3,"Size Sort":2,"Size Class":"Medium","Name":"[T-3][M] S-Medical Mk I Protein Synth","Effect":0.1,"Weight O/H":7,"Scale Weight":0,"Unit Weight":5,"SR Cost x":0.002,"Pwr O/H":0,"Scale Pwr":0.5,"Unit Power":0.5,"O":0,"E":0,"T":0.05,"Reliability":1,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":20,"Type":"Replication Packages","Tier":-3,"Size Sort":3,"Size Class":"Heavy","Name":"[T-3][H] S-Medical Mk I High-Endurance Protein Synth","Effect":0.2,"Weight O/H":7,"Scale Weight":0,"Unit Weight":15,"SR Cost x":0.002,"Pwr O/H":0,"Scale Pwr":0.5,"Unit Power":0.5,"O":0,"E":0,"T":0.05,"Reliability":1,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":20,"Type":"Replication Packages","Tier":-2,"Size Sort":2,"Size Class":"Medium","Name":"[T-2][M] S-Medical Mk II Protein Synth","Effect":0.15,"Weight O/H":7,"Scale Weight":0,"Unit Weight":5,"SR Cost x":0.002,"Pwr O/H":0,"Scale Pwr":0.5,"Unit Power":0.5,"O":0,"E":0,"T":0.05,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":20,"Type":"Replication Packages","Tier":-2,"Size Sort":3,"Size Class":"Heavy","Name":"[T-2][H] S-Medical Mk II High-Endurance Protein Synth","Effect":0.25,"Weight O/H":7,"Scale Weight":0,"Unit Weight":15,"SR Cost x":0.002,"Pwr O/H":0,"Scale Pwr":0.5,"Unit Power":0.5,"O":0,"E":0,"T":0.05,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":20,"Type":"Replication Packages","Tier":-1,"Size Sort":2,"Size Class":"Medium","Name":"[T-1][M] S-Medical Mk III Protein Synth","Effect":0.2,"Weight O/H":7,"Scale Weight":0,"Unit Weight":5,"SR Cost x":0.002,"Pwr O/H":0,"Scale Pwr":0.5,"Unit Power":0.5,"O":0,"E":0,"T":0.05,"Reliability":1,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":20,"Type":"Replication Packages","Tier":-1,"Size Sort":3,"Size Class":"Heavy","Name":"[T-1][H] S-Medical Mk III High-Endurance Protein Synth","Effect":0.375,"Weight O/H":7,"Scale Weight":0,"Unit Weight":15,"SR Cost x":0.002,"Pwr O/H":0,"Scale Pwr":0.5,"Unit Power":0.5,"O":0,"E":0,"T":0.05,"Reliability":1,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":20,"Type":"Replication Packages","Tier":0,"Size Sort":2,"Size Class":"Medium","Name":"[T0][M] S-Medical Mk IV Protein Synth","Effect":0.3,"Weight O/H":7,"Scale Weight":0,"Unit Weight":7,"SR Cost x":0.01,"Pwr O/H":0,"Scale Pwr":0.5,"Unit Power":0.5,"O":0,"E":0,"T":0.025,"Reliability":1,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":20,"Type":"Replication Packages","Tier":0,"Size Sort":3,"Size Class":"Heavy","Name":"[T0][H] S-Medical Mk IV High-Endurance Protein Synth","Effect":0.5,"Weight O/H":7,"Scale Weight":0,"Unit Weight":18,"SR Cost x":0.01,"Pwr O/H":0,"Scale Pwr":0.5,"Unit Power":0.5,"O":0,"E":0,"T":0.025,"Reliability":1,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":20,"Type":"Replication Packages","Tier":1,"Size Sort":2,"Size Class":"Medium","Name":"[T1][M] S-Medical Mk V Protein Synth","Effect":0.4,"Weight O/H":7,"Scale Weight":0,"Unit Weight":7,"SR Cost x":0.01,"Pwr O/H":0,"Scale Pwr":0.5,"Unit Power":0.5,"O":0,"E":0,"T":0.025,"Reliability":1,"Year Available (SF)":2310,"Size Class List":"","Full Tier List":""},{"Type Sort":20,"Type":"Replication Packages","Tier":1,"Size Sort":3,"Size Class":"Heavy","Name":"[T1][H] S-Medical Mk V High-Endurance Protein Synth","Effect":0.625,"Weight O/H":7,"Scale Weight":0,"Unit Weight":18,"SR Cost x":0.01,"Pwr O/H":0,"Scale Pwr":0.5,"Unit Power":0.5,"O":0,"E":0,"T":0.025,"Reliability":1,"Year Available (SF)":2310,"Size Class List":"","Full Tier List":""},{"Type Sort":20,"Type":"Replication Packages","Tier":2,"Size Sort":2,"Size Class":"Medium","Name":"[T2][M] S-Medical Mk VI Protein Synth","Effect":0.5,"Weight O/H":7,"Scale Weight":0,"Unit Weight":7,"SR Cost x":0.01,"Pwr O/H":0,"Scale Pwr":0.5,"Unit Power":0.5,"O":0,"E":0,"T":0.025,"Reliability":1,"Year Available (SF)":2313,"Size Class List":"","Full Tier List":""},{"Type Sort":20,"Type":"Replication Packages","Tier":2,"Size Sort":3,"Size Class":"Heavy","Name":"[T2][H] S-Medical Mk VI High-Endurance Protein Synth","Effect":0.75,"Weight O/H":7,"Scale Weight":0,"Unit Weight":18,"SR Cost x":0.01,"Pwr O/H":0,"Scale Pwr":0.5,"Unit Power":0.5,"O":0,"E":0,"T":0.025,"Reliability":1,"Year Available (SF)":2313,"Size Class List":"","Full Tier List":""},{"Type Sort":21,"Type":"Fuel & Matter Stores","Tier":-99,"Size Sort":-99,"Size Class":"N/A","Name":"No Fuel","Effect":0,"Weight O/H":0,"Scale Weight":0,"Unit Weight":0,"SR Cost x":0,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":0,"Size Class List":"","Full Tier List":""},{"Type Sort":21,"Type":"Fuel & Matter Stores","Tier":-3,"Size Sort":1,"Size Class":"Light","Name":"[T-3][L] 2220-Light Pattern Deuterium Tanks","Effect":0.25,"Weight O/H":0,"Scale Weight":0,"Unit Weight":10,"SR Cost x":0.055,"Pwr O/H":0,"Scale Pwr":0.25,"Unit Power":0.25,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":21,"Type":"Fuel & Matter Stores","Tier":-3,"Size Sort":2,"Size Class":"Medium","Name":"[T-3][M] 2220-Heavy Pattern Deuterium Tanks","Effect":0.4,"Weight O/H":30,"Scale Weight":0,"Unit Weight":5,"SR Cost x":0.05,"Pwr O/H":0,"Scale Pwr":0.25,"Unit Power":0.25,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":21,"Type":"Fuel & Matter Stores","Tier":-3,"Size Sort":3,"Size Class":"Heavy","Name":"[T-3][H] 2220-Large Ship Pattern Deuterium Tanks","Effect":0.8,"Weight O/H":80,"Scale Weight":0,"Unit Weight":6,"SR Cost x":0.0675,"Pwr O/H":0,"Scale Pwr":0.25,"Unit Power":0.25,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":21,"Type":"Fuel & Matter Stores","Tier":-2,"Size Sort":1,"Size Class":"Light","Name":"[T-2][L] 2240-Light Pattern Deuterium Tanks","Effect":0.3,"Weight O/H":0,"Scale Weight":0,"Unit Weight":10,"SR Cost x":0.055,"Pwr O/H":0,"Scale Pwr":0.25,"Unit Power":0.25,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":21,"Type":"Fuel & Matter Stores","Tier":-2,"Size Sort":2,"Size Class":"Medium","Name":"[T-2][M] 2240-Heavy Pattern Deuterium Tanks","Effect":0.55,"Weight O/H":30,"Scale Weight":0,"Unit Weight":5,"SR Cost x":0.05,"Pwr O/H":0,"Scale Pwr":0.25,"Unit Power":0.25,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":21,"Type":"Fuel & Matter Stores","Tier":-2,"Size Sort":3,"Size Class":"Heavy","Name":"[T-2][H] 2240-Large Ship Pattern Deuterium Tanks","Effect":0.9,"Weight O/H":80,"Scale Weight":0,"Unit Weight":6,"SR Cost x":0.0675,"Pwr O/H":0,"Scale Pwr":0.25,"Unit Power":0.25,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":21,"Type":"Fuel & Matter Stores","Tier":-1,"Size Sort":1,"Size Class":"Light","Name":"[T-1][L] 2260-Light Pattern Deuterium Tanks","Effect":0.35,"Weight O/H":0,"Scale Weight":0,"Unit Weight":10,"SR Cost x":0.055,"Pwr O/H":0,"Scale Pwr":0.25,"Unit Power":0.25,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":21,"Type":"Fuel & Matter Stores","Tier":-1,"Size Sort":2,"Size Class":"Medium","Name":"[T-1][M] 2260-Heavy Pattern Deuterium Tanks","Effect":0.7,"Weight O/H":30,"Scale Weight":0,"Unit Weight":5,"SR Cost x":0.05,"Pwr O/H":0,"Scale Pwr":0.25,"Unit Power":0.25,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":21,"Type":"Fuel & Matter Stores","Tier":-1,"Size Sort":3,"Size Class":"Heavy","Name":"[T-1][H] 2260-Large Ship Pattern Deuterium Tanks","Effect":1,"Weight O/H":80,"Scale Weight":0,"Unit Weight":6,"SR Cost x":0.0675,"Pwr O/H":0,"Scale Pwr":0.25,"Unit Power":0.25,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":21,"Type":"Fuel & Matter Stores","Tier":0,"Size Sort":1,"Size Class":"Light","Name":"[T0][L] 2295-Light Pattern Deuterium Tanks","Effect":0.4,"Weight O/H":0,"Scale Weight":0,"Unit Weight":10,"SR Cost x":0.055,"Pwr O/H":0,"Scale Pwr":0.25,"Unit Power":0.25,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":21,"Type":"Fuel & Matter Stores","Tier":0,"Size Sort":3,"Size Class":"Heavy","Name":"[T0][H] 2285-Super-Heavy Pattern Deuterium","Effect":1.2,"Weight O/H":85,"Scale Weight":0,"Unit Weight":2,"SR Cost x":0.055,"Pwr O/H":0,"Scale Pwr":0.25,"Unit Power":0.25,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":21,"Type":"Fuel & Matter Stores","Tier":1,"Size Sort":1,"Size Class":"Light","Name":"[T1][L] 2305-Light Pattern Deuterium Tanks","Effect":0.5,"Weight O/H":0,"Scale Weight":0,"Unit Weight":10,"SR Cost x":0.065,"Pwr O/H":0,"Scale Pwr":0.25,"Unit Power":0.25,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":2304,"Size Class List":"","Full Tier List":""},{"Type Sort":21,"Type":"Fuel & Matter Stores","Tier":1,"Size Sort":2,"Size Class":"Medium","Name":"[T1][M] 2305-Heavy Pattern Deuterium Tanks","Effect":1.1,"Weight O/H":40,"Scale Weight":0,"Unit Weight":6,"SR Cost x":0.05,"Pwr O/H":0,"Scale Pwr":0.25,"Unit Power":0.25,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":2304,"Size Class List":"","Full Tier List":""},{"Type Sort":21,"Type":"Fuel & Matter Stores","Tier":1,"Size Sort":3,"Size Class":"Heavy","Name":"[T1][H] 2305-Super-Heavy Pattern Deuterium","Effect":1.4,"Weight O/H":85,"Scale Weight":0,"Unit Weight":3,"SR Cost x":0.055,"Pwr O/H":0,"Scale Pwr":0.25,"Unit Power":0.25,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":2304,"Size Class List":"","Full Tier List":""},{"Type Sort":21,"Type":"Fuel & Matter Stores","Tier":2,"Size Sort":1,"Size Class":"Light","Name":"[T2][L] 2310-Light Pattern Deuterium Tanks","Effect":0.6,"Weight O/H":0,"Scale Weight":0,"Unit Weight":10,"SR Cost x":0.065,"Pwr O/H":0,"Scale Pwr":0.25,"Unit Power":0.25,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":2313,"Size Class List":"","Full Tier List":""},{"Type Sort":21,"Type":"Fuel & Matter Stores","Tier":2,"Size Sort":2,"Size Class":"Medium","Name":"[T2][M] 2310-Heavy Pattern Deuterium Tanks","Effect":1.25,"Weight O/H":40,"Scale Weight":0,"Unit Weight":6,"SR Cost x":0.05,"Pwr O/H":0,"Scale Pwr":0.25,"Unit Power":0.25,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":2313,"Size Class List":"","Full Tier List":""},{"Type Sort":21,"Type":"Fuel & Matter Stores","Tier":2,"Size Sort":3,"Size Class":"Heavy","Name":"[T2][H] 2310-Super-Heavy Pattern Deuterium","Effect":1.6,"Weight O/H":85,"Scale Weight":0,"Unit Weight":3,"SR Cost x":0.055,"Pwr O/H":0,"Scale Pwr":0.25,"Unit Power":0.25,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":2313,"Size Class List":"","Full Tier List":""},{"Type Sort":21,"Type":"Fuel & Matter Stores","Tier":3,"Size Sort":1,"Size Class":"Light","Name":"[T3][L] 2310-Light Pattern Deuterium Tanks","Effect":0.7,"Weight O/H":0,"Scale Weight":0,"Unit Weight":10,"SR Cost x":0.065,"Pwr O/H":0,"Scale Pwr":0.25,"Unit Power":0.25,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":21,"Type":"Fuel & Matter Stores","Tier":3,"Size Sort":2,"Size Class":"Medium","Name":"[T3][M] 2310-Heavy Pattern Deuterium Tanks","Effect":1.4,"Weight O/H":40,"Scale Weight":0,"Unit Weight":6,"SR Cost x":0.05,"Pwr O/H":0,"Scale Pwr":0.25,"Unit Power":0.25,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":21,"Type":"Fuel & Matter Stores","Tier":3,"Size Sort":3,"Size Class":"Heavy","Name":"[T3][H] 2310-Super-Heavy Pattern Deuterium","Effect":1.8,"Weight O/H":85,"Scale Weight":0,"Unit Weight":3,"SR Cost x":0.055,"Pwr O/H":0,"Scale Pwr":0.25,"Unit Power":0.25,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":21,"Type":"Fuel & Matter Stores","Tier":99,"Size Sort":99,"Size Class":"","Name":"x[T0] Mk1 Antimatter Containment Tank","Effect":"","Weight O/H":"","Scale Weight":"","Unit Weight":"","SR Cost x":"","Pwr O/H":"","Scale Pwr":"","Unit Power":"","O":"","E":"","T":"","Reliability":"","Year Available (SF)":"","Size Class List":"","Full Tier List":""},{"Type Sort":22,"Type":"Warp Core Types","Tier":-2,"Size Sort":-99,"Size Class":"N/A","Name":"[T-2] Yoyodyne Pulse Fusion (Fusion Only)","Effect":10,"Weight O/H":8,"Scale Weight":0,"Unit Weight":18,"SR Cost x":0.08,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.05,"E":0.05,"T":0.05,"Reliability":1,"Year Available (SF)":2120,"Size Class List":"","Full Tier List":""},{"Type Sort":22,"Type":"Warp Core Types","Tier":-3,"Size Sort":1,"Size Class":"Light","Name":"[T-3][L][C+] Delta Vega-12 Warp Core","Effect":26,"Weight O/H":0,"Scale Weight":0,"Unit Weight":20,"SR Cost x":0.07,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.1,"E":0.2,"T":0.1,"Reliability":0.997,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":22,"Type":"Warp Core Types","Tier":-3,"Size Sort":3,"Size Class":"Heavy","Name":"[T-3][H][R+C+] Venus-I C-Layout Warp Core","Effect":34,"Weight O/H":20,"Scale Weight":0,"Unit Weight":27.5,"SR Cost x":0.07,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.1,"E":0.2,"T":0.1,"Reliability":0.999,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":22,"Type":"Warp Core Types","Tier":-3,"Size Sort":3,"Size Class":"Heavy","Name":"[T-3][H][C-SR+] YYD-VI Heavy Core","Effect":34,"Weight O/H":20,"Scale Weight":0,"Unit Weight":27.5,"SR Cost x":0.11,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.07,"E":0.035,"T":0.07,"Reliability":0.997,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":22,"Type":"Warp Core Types","Tier":-2,"Size Sort":1,"Size Class":"Light","Name":"[T-2][L][C+] Delta Vega-12 Warp Core","Effect":28,"Weight O/H":0,"Scale Weight":0,"Unit Weight":20,"SR Cost x":0.07,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.1,"E":0.2,"T":0.1,"Reliability":0.997,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":22,"Type":"Warp Core Types","Tier":-2,"Size Sort":3,"Size Class":"Heavy","Name":"[T-2][H][R+C+] Venus-II C-Layout Warp Core","Effect":36,"Weight O/H":20,"Scale Weight":0,"Unit Weight":27.5,"SR Cost x":0.07,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.1,"E":0.2,"T":0.1,"Reliability":0.999,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":22,"Type":"Warp Core Types","Tier":-2,"Size Sort":3,"Size Class":"Heavy","Name":"[T-2][H][C-SR+] Type-E Block-1 Automated Core","Effect":36,"Weight O/H":20,"Scale Weight":0,"Unit Weight":27.5,"SR Cost x":0.11,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.07,"E":0.035,"T":0.07,"Reliability":0.997,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":22,"Type":"Warp Core Types","Tier":-1,"Size Sort":1,"Size Class":"Light","Name":"[T-1][L][C+] Delta Vega-24 Warp Core","Effect":29,"Weight O/H":0,"Scale Weight":0,"Unit Weight":20,"SR Cost x":0.07,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.1,"E":0.2,"T":0.1,"Reliability":0.997,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":22,"Type":"Warp Core Types","Tier":-1,"Size Sort":3,"Size Class":"Heavy","Name":"[T-1][H][R+C+] Venus-III C-Layout Warp Core","Effect":38,"Weight O/H":20,"Scale Weight":0,"Unit Weight":27.5,"SR Cost x":0.07,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.1,"E":0.2,"T":0.1,"Reliability":0.999,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":22,"Type":"Warp Core Types","Tier":-1,"Size Sort":3,"Size Class":"Heavy","Name":"[T-1][H][C-SR+] Type-E Block-2 Automated Core","Effect":38,"Weight O/H":20,"Scale Weight":0,"Unit Weight":27.5,"SR Cost x":0.11,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.07,"E":0.035,"T":0.07,"Reliability":0.997,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":22,"Type":"Warp Core Types","Tier":0,"Size Sort":1,"Size Class":"Light","Name":"[T0][L][R-C-SR+] Delta Vega-28 Automated Core","Effect":30,"Weight O/H":0,"Scale Weight":0,"Unit Weight":20,"SR Cost x":0.11,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.05,"E":0.025,"T":0.05,"Reliability":0.995,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":22,"Type":"Warp Core Types","Tier":0,"Size Sort":1,"Size Class":"Light","Name":"[T0][L][C+] Delta Vega-26 Warp Core","Effect":30,"Weight O/H":0,"Scale Weight":0,"Unit Weight":20,"SR Cost x":0.07,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.1,"E":0.15,"T":0.1,"Reliability":0.997,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":22,"Type":"Warp Core Types","Tier":0,"Size Sort":3,"Size Class":"Heavy","Name":"[T0][H][R+C+] Venus-IV C-Layout Warp Core","Effect":40,"Weight O/H":20,"Scale Weight":0,"Unit Weight":27.5,"SR Cost x":0.07,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.1,"E":0.15,"T":0.1,"Reliability":0.999,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":22,"Type":"Warp Core Types","Tier":0,"Size Sort":3,"Size Class":"Heavy","Name":"[T0][H][C-SR+] Type-E Block-3 Automated Core","Effect":40,"Weight O/H":20,"Scale Weight":0,"Unit Weight":27.5,"SR Cost x":0.11,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.07,"E":0.035,"T":0.07,"Reliability":0.997,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":22,"Type":"Warp Core Types","Tier":1,"Size Sort":1,"Size Class":"Light","Name":"[T1][L][R---C+] Type-I Experimental (40E) Warp Core","Effect":40,"Weight O/H":0,"Scale Weight":0,"Unit Weight":20,"SR Cost x":0.11,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.1,"E":0.15,"T":0.1,"Reliability":0.98,"Year Available (SF)":2306,"Size Class List":"","Full Tier List":""},{"Type Sort":22,"Type":"Warp Core Types","Tier":1,"Size Sort":3,"Size Class":"Heavy","Name":"[T1][H][R---C+] Type-II Experimental (Venus) Warp Core","Effect":50,"Weight O/H":20,"Scale Weight":0,"Unit Weight":27.5,"SR Cost x":0.13,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.1,"E":0.15,"T":0.1,"Reliability":0.98,"Year Available (SF)":2306,"Size Class List":"","Full Tier List":""},{"Type Sort":22,"Type":"Warp Core Types","Tier":1,"Size Sort":3,"Size Class":"Heavy","Name":"[T1][H][R+C-] Type-E Block-4 Automated Core","Effect":42,"Weight O/H":20,"Scale Weight":0,"Unit Weight":27.5,"SR Cost x":0.07,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.07,"E":0.035,"T":0.07,"Reliability":0.999,"Year Available (SF)":2306,"Size Class List":"","Full Tier List":""},{"Type Sort":22,"Type":"Warp Core Types","Tier":2,"Size Sort":1,"Size Class":"Light","Name":"[T2][L][R--C-SR+] ONA-III-L Experimental","Effect":41,"Weight O/H":0,"Scale Weight":0,"Unit Weight":20,"SR Cost x":0.16,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.05,"E":0.065,"T":0.05,"Reliability":0.99,"Year Available (SF)":2313,"Size Class List":"","Full Tier List":""},{"Type Sort":22,"Type":"Warp Core Types","Tier":2,"Size Sort":1,"Size Class":"Light","Name":"[T2][L][C+] Type-I Block-A (40E) Warp Core","Effect":41,"Weight O/H":0,"Scale Weight":0,"Unit Weight":20,"SR Cost x":0.09,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.1,"E":0.15,"T":0.1,"Reliability":0.997,"Year Available (SF)":2313,"Size Class List":"","Full Tier List":""},{"Type Sort":22,"Type":"Warp Core Types","Tier":2,"Size Sort":2,"Size Class":"Medium","Name":"[T2][M][R--C-SR+] ONA-III-M Experimental","Effect":51,"Weight O/H":0,"Scale Weight":0,"Unit Weight":27.5,"SR Cost x":0.18,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.06,"E":0.075,"T":0.06,"Reliability":0.99,"Year Available (SF)":2313,"Size Class List":"","Full Tier List":""},{"Type Sort":22,"Type":"Warp Core Types","Tier":2,"Size Sort":2,"Size Class":"Medium","Name":"[T2][M][R-C+] Type-III Block-A (YYD) Warp Core","Effect":51,"Weight O/H":0,"Scale Weight":0,"Unit Weight":27.5,"SR Cost x":0.12,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.11,"E":0.16,"T":0.11,"Reliability":0.995,"Year Available (SF)":2313,"Size Class List":"","Full Tier List":""},{"Type Sort":22,"Type":"Warp Core Types","Tier":2,"Size Sort":3,"Size Class":"Heavy","Name":"[T2][H][R--C-SR+] ONA-III-H Experimental","Effect":61,"Weight O/H":20,"Scale Weight":0,"Unit Weight":27.5,"SR Cost x":0.18,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.07,"E":0.085,"T":0.07,"Reliability":0.99,"Year Available (SF)":2313,"Size Class List":"","Full Tier List":""},{"Type Sort":22,"Type":"Warp Core Types","Tier":2,"Size Sort":3,"Size Class":"Heavy","Name":"[T2][H][C+] Type-II Block-A (Venus) Warp Core","Effect":61,"Weight O/H":20,"Scale Weight":0,"Unit Weight":27.5,"SR Cost x":0.12,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.12,"E":0.17,"T":0.12,"Reliability":0.997,"Year Available (SF)":2313,"Size Class List":"","Full Tier List":""},{"Type Sort":22,"Type":"Warp Core Types","Tier":3,"Size Sort":1,"Size Class":"Light","Name":"[T3][L][R-C-SR+] ONA-IV-L Standard","Effect":42,"Weight O/H":0,"Scale Weight":0,"Unit Weight":20,"SR Cost x":0.14,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.05,"E":0.065,"T":0.05,"Reliability":0.995,"Year Available (SF)":2318,"Size Class List":"","Full Tier List":""},{"Type Sort":22,"Type":"Warp Core Types","Tier":3,"Size Sort":1,"Size Class":"Light","Name":"[T3][L][R+C+] Type-I Block-B (40E) Warp Core","Effect":42,"Weight O/H":0,"Scale Weight":0,"Unit Weight":20,"SR Cost x":0.08,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.1,"E":0.15,"T":0.1,"Reliability":0.999,"Year Available (SF)":2318,"Size Class List":"","Full Tier List":""},{"Type Sort":22,"Type":"Warp Core Types","Tier":3,"Size Sort":2,"Size Class":"Medium","Name":"[T3][M][R-C-SR+] ONA-IV-M Standard","Effect":52,"Weight O/H":0,"Scale Weight":0,"Unit Weight":27.5,"SR Cost x":0.16,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.06,"E":0.075,"T":0.06,"Reliability":0.995,"Year Available (SF)":2318,"Size Class List":"","Full Tier List":""},{"Type Sort":22,"Type":"Warp Core Types","Tier":3,"Size Sort":2,"Size Class":"Medium","Name":"[T3][M][C+] Type-III Block-B (YYD) Warp Core ","Effect":52,"Weight O/H":0,"Scale Weight":0,"Unit Weight":27.5,"SR Cost x":0.1,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.11,"E":0.16,"T":0.11,"Reliability":0.997,"Year Available (SF)":2318,"Size Class List":"","Full Tier List":""},{"Type Sort":22,"Type":"Warp Core Types","Tier":3,"Size Sort":3,"Size Class":"Heavy","Name":"[T3][H][R-C-SR+] ONA-IV-H Standard","Effect":62,"Weight O/H":20,"Scale Weight":0,"Unit Weight":27.5,"SR Cost x":0.16,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.07,"E":0.085,"T":0.07,"Reliability":0.995,"Year Available (SF)":2318,"Size Class List":"","Full Tier List":""},{"Type Sort":22,"Type":"Warp Core Types","Tier":3,"Size Sort":3,"Size Class":"Heavy","Name":"[T3][H][R+C+] Type-II Block-B (Venus) Warp Core","Effect":62,"Weight O/H":20,"Scale Weight":0,"Unit Weight":27.5,"SR Cost x":0.11,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.12,"E":0.17,"T":0.12,"Reliability":0.999,"Year Available (SF)":2318,"Size Class List":"","Full Tier List":""},{"Type Sort":23,"Type":"Matter/Anti-Matter Injectors","Tier":-2,"Size Sort":-99,"Size Class":"N/A","Name":"[T-2][R--]Integrated Injectors","Effect":-4,"Weight O/H":0,"Scale Weight":0,"Unit Weight":0,"SR Cost x":0,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0,"T":0,"Reliability":0.99,"Year Available (SF)":0,"Size Class List":"","Full Tier List":""},{"Type Sort":23,"Type":"Matter/Anti-Matter Injectors","Tier":-3,"Size Sort":1,"Size Class":"Light","Name":"[T-3][L][C-] Luna-I High-Efficiency M/AM System","Effect":6,"Weight O/H":0,"Scale Weight":0,"Unit Weight":10,"SR Cost x":0.095,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.025,"E":0.025,"T":0.025,"Reliability":0.997,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":23,"Type":"Matter/Anti-Matter Injectors","Tier":-3,"Size Sort":2,"Size Class":"Medium","Name":"[T-3][M][R+] Mk IV M/AM System","Effect":9,"Weight O/H":5,"Scale Weight":0,"Unit Weight":13.5,"SR Cost x":0.095,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.08,"E":0.04,"T":0.08,"Reliability":0.999,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":23,"Type":"Matter/Anti-Matter Injectors","Tier":-3,"Size Sort":3,"Size Class":"Heavy","Name":"[T-3][H][C+SR+] Mk IV High Volume M/AM System","Effect":13.5,"Weight O/H":12,"Scale Weight":0,"Unit Weight":15.5,"SR Cost x":0.15,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.16,"E":0.12,"T":0.16,"Reliability":0.997,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":23,"Type":"Matter/Anti-Matter Injectors","Tier":-2,"Size Sort":1,"Size Class":"Light","Name":"[T-2][L][C-] Luna-II High-Efficiency M/AM System","Effect":7,"Weight O/H":0,"Scale Weight":0,"Unit Weight":10,"SR Cost x":0.095,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.025,"E":0.025,"T":0.025,"Reliability":0.997,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":23,"Type":"Matter/Anti-Matter Injectors","Tier":-2,"Size Sort":2,"Size Class":"Medium","Name":"[T-2][M][R+] Mk V M/AM System","Effect":10.5,"Weight O/H":5,"Scale Weight":0,"Unit Weight":13.5,"SR Cost x":0.095,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.08,"E":0.04,"T":0.08,"Reliability":0.999,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":23,"Type":"Matter/Anti-Matter Injectors","Tier":-2,"Size Sort":3,"Size Class":"Heavy","Name":"[T-2][H][C+SR+] Mk V High Volume M/AM System","Effect":15.75,"Weight O/H":12,"Scale Weight":0,"Unit Weight":15.5,"SR Cost x":0.15,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.16,"E":0.12,"T":0.16,"Reliability":0.997,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":23,"Type":"Matter/Anti-Matter Injectors","Tier":-1,"Size Sort":1,"Size Class":"Light","Name":"[T-1][L][C-] Luna-III High-Efficiency M/AM System","Effect":8,"Weight O/H":0,"Scale Weight":0,"Unit Weight":10,"SR Cost x":0.095,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.025,"E":0.025,"T":0.025,"Reliability":0.997,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":23,"Type":"Matter/Anti-Matter Injectors","Tier":-1,"Size Sort":2,"Size Class":"Medium","Name":"[T-1][M][R+] Mk VI M/AM System","Effect":12,"Weight O/H":5,"Scale Weight":0,"Unit Weight":13.5,"SR Cost x":0.095,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.08,"E":0.04,"T":0.08,"Reliability":0.999,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":23,"Type":"Matter/Anti-Matter Injectors","Tier":-1,"Size Sort":3,"Size Class":"Heavy","Name":"[T-1][H][C+SR+] Mk VI High Volume M/AM System","Effect":18,"Weight O/H":12,"Scale Weight":0,"Unit Weight":15.5,"SR Cost x":0.15,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.16,"E":0.12,"T":0.16,"Reliability":0.997,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":23,"Type":"Matter/Anti-Matter Injectors","Tier":0,"Size Sort":1,"Size Class":"Light","Name":"[T0][L][C-] Luna-IV High-Efficiency M/AM System","Effect":9,"Weight O/H":0,"Scale Weight":0,"Unit Weight":10.2,"SR Cost x":0.1,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.025,"E":0.025,"T":0.025,"Reliability":0.997,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":23,"Type":"Matter/Anti-Matter Injectors","Tier":0,"Size Sort":2,"Size Class":"Medium","Name":"[T0][M][R+] Mk VII Sublimator-Compressor","Effect":13.5,"Weight O/H":5,"Scale Weight":0,"Unit Weight":13.77,"SR Cost x":0.1,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.08,"E":0.04,"T":0.08,"Reliability":0.999,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":23,"Type":"Matter/Anti-Matter Injectors","Tier":0,"Size Sort":3,"Size Class":"Heavy","Name":"[T0][H][C+SR+] Mk VII Complex Sublimator-Compressor","Effect":20.25,"Weight O/H":12,"Scale Weight":0,"Unit Weight":15.81,"SR Cost x":0.18,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.16,"E":0.12,"T":0.16,"Reliability":0.997,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":23,"Type":"Matter/Anti-Matter Injectors","Tier":1,"Size Sort":1,"Size Class":"Light","Name":"[T1][L][R-C-] Luna-V High-Efficiency M/AM System","Effect":10,"Weight O/H":0,"Scale Weight":0,"Unit Weight":10.4,"SR Cost x":0.1,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.025,"E":0.025,"T":0.025,"Reliability":0.995,"Year Available (SF)":2306,"Size Class List":"","Full Tier List":""},{"Type Sort":23,"Type":"Matter/Anti-Matter Injectors","Tier":1,"Size Sort":2,"Size Class":"Medium","Name":"[T1][M] Mk VIII Sublimator-Compressor","Effect":15,"Weight O/H":5,"Scale Weight":0,"Unit Weight":14.04,"SR Cost x":0.1,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.08,"E":0.04,"T":0.08,"Reliability":0.997,"Year Available (SF)":2306,"Size Class List":"","Full Tier List":""},{"Type Sort":23,"Type":"Matter/Anti-Matter Injectors","Tier":1,"Size Sort":3,"Size Class":"Heavy","Name":"[T1][H][R-C+SR+] Mk VIII High Volume Compressor","Effect":22.5,"Weight O/H":12,"Scale Weight":0,"Unit Weight":16.12,"SR Cost x":0.18,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.16,"E":0.12,"T":0.16,"Reliability":0.995,"Year Available (SF)":2306,"Size Class List":"","Full Tier List":""},{"Type Sort":23,"Type":"Matter/Anti-Matter Injectors","Tier":2,"Size Sort":1,"Size Class":"Light","Name":"[T2][L][R-C-] Luna-VI High-Efficiency M/AM System","Effect":11,"Weight O/H":0,"Scale Weight":0,"Unit Weight":10.6,"SR Cost x":0.1,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.025,"E":0.025,"T":0.025,"Reliability":0.995,"Year Available (SF)":2313,"Size Class List":"","Full Tier List":""},{"Type Sort":23,"Type":"Matter/Anti-Matter Injectors","Tier":2,"Size Sort":2,"Size Class":"Medium","Name":"[T2][M] Mk IX Sublimator-Compressor","Effect":16.5,"Weight O/H":5,"Scale Weight":0,"Unit Weight":14.31,"SR Cost x":0.1,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.08,"E":0.04,"T":0.08,"Reliability":0.997,"Year Available (SF)":2313,"Size Class List":"","Full Tier List":""},{"Type Sort":23,"Type":"Matter/Anti-Matter Injectors","Tier":2,"Size Sort":3,"Size Class":"Heavy","Name":"[T2][H][R-C+SR+] Mk IX High Volume Compressor","Effect":24.75,"Weight O/H":12,"Scale Weight":0,"Unit Weight":16.43,"SR Cost x":0.18,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.16,"E":0.12,"T":0.16,"Reliability":0.995,"Year Available (SF)":2313,"Size Class List":"","Full Tier List":""},{"Type Sort":23,"Type":"Matter/Anti-Matter Injectors","Tier":3,"Size Sort":1,"Size Class":"Light","Name":"[T3][L][R-C-] Luna-VII High-Efficiency M/AM System","Effect":12,"Weight O/H":0,"Scale Weight":0,"Unit Weight":10.8,"SR Cost x":0.1,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.025,"E":0.025,"T":0.025,"Reliability":0.995,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":23,"Type":"Matter/Anti-Matter Injectors","Tier":3,"Size Sort":2,"Size Class":"Medium","Name":"[T3][M] Mk X Sublimator-Compressor","Effect":18,"Weight O/H":5,"Scale Weight":0,"Unit Weight":14.58,"SR Cost x":0.1,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.08,"E":0.04,"T":0.08,"Reliability":0.997,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":23,"Type":"Matter/Anti-Matter Injectors","Tier":3,"Size Sort":3,"Size Class":"Heavy","Name":"[T3][H][R-C+SR+] Mk X High Volume Compressor","Effect":27,"Weight O/H":12,"Scale Weight":0,"Unit Weight":16.74,"SR Cost x":0.18,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.16,"E":0.12,"T":0.16,"Reliability":0.995,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":23,"Type":"Matter/Anti-Matter Injectors","Tier":4,"Size Sort":1,"Size Class":"Light","Name":"[T4][L][R-C-] Luna-VIII High-Efficiency M/AM System","Effect":13,"Weight O/H":0,"Scale Weight":0,"Unit Weight":11,"SR Cost x":0.1,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.025,"E":0.025,"T":0.025,"Reliability":0.995,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":23,"Type":"Matter/Anti-Matter Injectors","Tier":4,"Size Sort":2,"Size Class":"Medium","Name":"[T4][M] Mk XI Sublimator-Compressor","Effect":19.5,"Weight O/H":5,"Scale Weight":0,"Unit Weight":14.85,"SR Cost x":0.1,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.08,"E":0.04,"T":0.08,"Reliability":0.997,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":23,"Type":"Matter/Anti-Matter Injectors","Tier":4,"Size Sort":3,"Size Class":"Heavy","Name":"[T4][H][R-C+SR+] Mk XI High Volume Compressor","Effect":29.25,"Weight O/H":12,"Scale Weight":0,"Unit Weight":17.05,"SR Cost x":0.18,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.16,"E":0.12,"T":0.16,"Reliability":0.995,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":24,"Type":"Coolant Systems","Tier":-2,"Size Sort":-99,"Size Class":"N/A","Name":"[T-2][R-SR-] Integrated Coolant","Effect":-15,"Weight O/H":0,"Scale Weight":0,"Unit Weight":7,"SR Cost x":0.02,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0,"T":0,"Reliability":1,"Year Available (SF)":0,"Size Class List":"","Full Tier List":""},{"Type Sort":24,"Type":"Coolant Systems","Tier":-3,"Size Sort":1,"Size Class":"Light","Name":"[T-3][L][R-] Mk IV Mod L Coolant System","Effect":-14.5,"Weight O/H":0,"Scale Weight":0,"Unit Weight":4,"SR Cost x":0.1,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.01,"E":0.01,"T":0.01,"Reliability":1.001,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":24,"Type":"Coolant Systems","Tier":-3,"Size Sort":2,"Size Class":"Medium","Name":"[T-3][M] Mk IV Yoyodyne Coolant System","Effect":-11,"Weight O/H":5,"Scale Weight":0,"Unit Weight":4.8,"SR Cost x":0.08,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.01,"E":0.01,"T":0.01,"Reliability":1.003,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":24,"Type":"Coolant Systems","Tier":-2,"Size Sort":1,"Size Class":"Light","Name":"[T-2][L][R-] Mk V Mod L Coolant System","Effect":-14,"Weight O/H":0,"Scale Weight":0,"Unit Weight":4,"SR Cost x":0.1,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.01,"E":0.01,"T":0.01,"Reliability":1.001,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":24,"Type":"Coolant Systems","Tier":-2,"Size Sort":2,"Size Class":"Medium","Name":"[T-2][M] Mk V Yoyodyne Coolant System","Effect":-10.25,"Weight O/H":5,"Scale Weight":0,"Unit Weight":4.8,"SR Cost x":0.08,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.01,"E":0.01,"T":0.01,"Reliability":1.003,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":24,"Type":"Coolant Systems","Tier":-1,"Size Sort":1,"Size Class":"Light","Name":"[T-1][L][R-] Mk V Mod L Coolant System","Effect":-13,"Weight O/H":0,"Scale Weight":0,"Unit Weight":4,"SR Cost x":0.1,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.01,"E":0.01,"T":0.01,"Reliability":1.001,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":24,"Type":"Coolant Systems","Tier":-1,"Size Sort":2,"Size Class":"Medium","Name":"[T-1][M] Mk V Yoyodyne Coolant System","Effect":-10,"Weight O/H":5,"Scale Weight":0,"Unit Weight":4.8,"SR Cost x":0.08,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.01,"E":0.01,"T":0.01,"Reliability":1.003,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":24,"Type":"Coolant Systems","Tier":0,"Size Sort":1,"Size Class":"Light","Name":"[T0][L][R-SR-] VSA-12-L Efficient Coolant System","Effect":-12.1875,"Weight O/H":0,"Scale Weight":0,"Unit Weight":4,"SR Cost x":0.03,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.01,"E":0.01,"T":0.01,"Reliability":1.001,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":24,"Type":"Coolant Systems","Tier":0,"Size Sort":1,"Size Class":"Light","Name":"[T0][L] Mk VI Mod L Yoyodyne Coolant System","Effect":-9.75,"Weight O/H":0,"Scale Weight":0,"Unit Weight":4,"SR Cost x":0.11,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.01,"E":0.01,"T":0.01,"Reliability":1.003,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":24,"Type":"Coolant Systems","Tier":0,"Size Sort":3,"Size Class":"Heavy","Name":"[T0][H][SR-] SBD-VI Efficient Coolant System","Effect":-4.875,"Weight O/H":15,"Scale Weight":0,"Unit Weight":6,"SR Cost x":0.02,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.01,"E":0.01,"T":0.01,"Reliability":1.003,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":24,"Type":"Coolant Systems","Tier":0,"Size Sort":3,"Size Class":"Heavy","Name":"[T0][H][R+] Mk VI Mod H Yoyodyne Coolant System","Effect":-3.9,"Weight O/H":15,"Scale Weight":0,"Unit Weight":6,"SR Cost x":0.08,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.01,"E":0.01,"T":0.01,"Reliability":1.005,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":24,"Type":"Coolant Systems","Tier":1,"Size Sort":1,"Size Class":"Light","Name":"[T1][L][R-SR-] VSA-13-L Efficient Coolant System","Effect":-11.875,"Weight O/H":0,"Scale Weight":0,"Unit Weight":4,"SR Cost x":0.02,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.01,"E":0.01,"T":0.01,"Reliability":1.001,"Year Available (SF)":2306,"Size Class List":"","Full Tier List":""},{"Type Sort":24,"Type":"Coolant Systems","Tier":1,"Size Sort":1,"Size Class":"Light","Name":"[T1][L] Mk VII Mod L Yoyodyne Coolant System","Effect":-9.5,"Weight O/H":0,"Scale Weight":0,"Unit Weight":4,"SR Cost x":0.1,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.01,"E":0.01,"T":0.01,"Reliability":1.003,"Year Available (SF)":2306,"Size Class List":"","Full Tier List":""},{"Type Sort":24,"Type":"Coolant Systems","Tier":1,"Size Sort":3,"Size Class":"Heavy","Name":"[T1][H][SR-] SBD-VII Efficient Coolant System","Effect":-4.75,"Weight O/H":15,"Scale Weight":0,"Unit Weight":6,"SR Cost x":0.02,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.01,"E":0.01,"T":0.01,"Reliability":1.003,"Year Available (SF)":2306,"Size Class List":"","Full Tier List":""},{"Type Sort":24,"Type":"Coolant Systems","Tier":1,"Size Sort":3,"Size Class":"Heavy","Name":"[T1][H][R+] Mk VII Mod H Yoyodyne Coolant System","Effect":-3.8,"Weight O/H":15,"Scale Weight":0,"Unit Weight":6,"SR Cost x":0.08,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.01,"E":0.01,"T":0.01,"Reliability":1.005,"Year Available (SF)":2306,"Size Class List":"","Full Tier List":""},{"Type Sort":24,"Type":"Coolant Systems","Tier":2,"Size Sort":1,"Size Class":"Light","Name":"[T2][L][R-SR-] VSA-14-L Efficient Coolant System","Effect":-11.5625,"Weight O/H":0,"Scale Weight":0,"Unit Weight":4,"SR Cost x":0.02,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.01,"E":0.01,"T":0.01,"Reliability":1.001,"Year Available (SF)":2311,"Size Class List":"","Full Tier List":""},{"Type Sort":24,"Type":"Coolant Systems","Tier":2,"Size Sort":1,"Size Class":"Light","Name":"[T2][L] Mk VIII Mod L Yoyodyne Coolant System","Effect":-9.25,"Weight O/H":0,"Scale Weight":0,"Unit Weight":4,"SR Cost x":0.1,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.01,"E":0.01,"T":0.01,"Reliability":1.003,"Year Available (SF)":2311,"Size Class List":"","Full Tier List":""},{"Type Sort":24,"Type":"Coolant Systems","Tier":2,"Size Sort":2,"Size Class":"Medium","Name":"[T2][M][R+SR+] Mars-8 Experimental Coolant System","Effect":-7.4,"Weight O/H":5,"Scale Weight":0,"Unit Weight":4.8,"SR Cost x":0.12,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.0125,"E":0.0125,"T":0.0125,"Reliability":1.005,"Year Available (SF)":2311,"Size Class List":"","Full Tier List":""},{"Type Sort":24,"Type":"Coolant Systems","Tier":2,"Size Sort":3,"Size Class":"Heavy","Name":"[T2][H][SR-] SBD-VIII Efficient Coolant System","Effect":-4.625,"Weight O/H":15,"Scale Weight":0,"Unit Weight":6,"SR Cost x":0.02,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.01,"E":0.01,"T":0.01,"Reliability":1.003,"Year Available (SF)":2311,"Size Class List":"","Full Tier List":""},{"Type Sort":24,"Type":"Coolant Systems","Tier":2,"Size Sort":3,"Size Class":"Heavy","Name":"[T2][H][R+] Mk VIII Mod H Yododyne SBD Coolant System","Effect":-3.7,"Weight O/H":15,"Scale Weight":0,"Unit Weight":6,"SR Cost x":0.08,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.01,"E":0.01,"T":0.01,"Reliability":1.005,"Year Available (SF)":2311,"Size Class List":"","Full Tier List":""},{"Type Sort":24,"Type":"Coolant Systems","Tier":3,"Size Sort":1,"Size Class":"Light","Name":"[T3][L][R-SR-] VSA-15-L Efficient Coolant System","Effect":-11.25,"Weight O/H":0,"Scale Weight":0,"Unit Weight":4,"SR Cost x":0.02,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.01,"E":0.01,"T":0.01,"Reliability":1.001,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":24,"Type":"Coolant Systems","Tier":3,"Size Sort":1,"Size Class":"Light","Name":"[T3][L] Mk IX Mod L Yoyodyne Coolant System","Effect":-9,"Weight O/H":0,"Scale Weight":0,"Unit Weight":4,"SR Cost x":0.1,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.01,"E":0.01,"T":0.01,"Reliability":1.003,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":24,"Type":"Coolant Systems","Tier":3,"Size Sort":2,"Size Class":"Medium","Name":"[T3][M][R+SR+] Mars-9 Experimental Coolant System","Effect":-7.2,"Weight O/H":5,"Scale Weight":0,"Unit Weight":4.8,"SR Cost x":0.12,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.0125,"E":0.0125,"T":0.0125,"Reliability":1.005,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":24,"Type":"Coolant Systems","Tier":3,"Size Sort":3,"Size Class":"Heavy","Name":"[T3][H][SR-] SBD-IX Efficient Coolant System","Effect":-4.5,"Weight O/H":15,"Scale Weight":0,"Unit Weight":6,"SR Cost x":0.02,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.01,"E":0.01,"T":0.01,"Reliability":1.003,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":24,"Type":"Coolant Systems","Tier":3,"Size Sort":3,"Size Class":"Heavy","Name":"[T3][H][R+] Mk IX Mod H Yoyodyne Coolant System","Effect":-3.6,"Weight O/H":15,"Scale Weight":0,"Unit Weight":6,"SR Cost x":0.08,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.01,"E":0.01,"T":0.01,"Reliability":1.005,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":24,"Type":"Coolant Systems","Tier":99,"Size Sort":99,"Size Class":"","Name":"x[T-1] Constitution Coolant System","Effect":"","Weight O/H":"","Scale Weight":"","Unit Weight":"","SR Cost x":"","Pwr O/H":"","Scale Pwr":"","Unit Power":"","O":"","E":"","T":"","Reliability":"","Year Available (SF)":"","Size Class List":"","Full Tier List":""},{"Type Sort":24,"Type":"Coolant Systems","Tier":99,"Size Sort":99,"Size Class":"","Name":"x[T0] Basic Plasma Intercooler","Effect":"","Weight O/H":"","Scale Weight":"","Unit Weight":"","SR Cost x":"","Pwr O/H":"","Scale Pwr":"","Unit Power":"","O":"","E":"","T":"","Reliability":"","Year Available (SF)":"","Size Class List":"","Full Tier List":""},{"Type Sort":24,"Type":"Coolant Systems","Tier":99,"Size Sort":99,"Size Class":"","Name":"x[T1] Mk II Plasma Intercooler","Effect":"","Weight O/H":"","Scale Weight":"","Unit Weight":"","SR Cost x":"","Pwr O/H":"","Scale Pwr":"","Unit Power":"","O":"","E":"","T":"","Reliability":"","Year Available (SF)":"","Size Class List":"","Full Tier List":""},{"Type Sort":25,"Type":"EPS Manifold System","Tier":99,"Size Sort":99,"Size Class":"","Name":"xNo EPS Manifold","Effect":"","Weight O/H":"","Scale Weight":"","Unit Weight":"","SR Cost x":"","Pwr O/H":"","Scale Pwr":"","Unit Power":"","O":"","E":"","T":"","Reliability":"","Year Available (SF)":"","Size Class List":"","Full Tier List":""},{"Type Sort":25,"Type":"EPS Manifold System","Tier":-3,"Size Sort":1,"Size Class":"Light","Name":"[T-3][L][R+] Tellar HIG-63 Pulse Injection Manifold","Effect":7,"Weight O/H":8,"Scale Weight":0,"Unit Weight":2,"SR Cost x":0.09,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0.01,"T":0.01,"Reliability":0.999,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":25,"Type":"EPS Manifold System","Tier":-3,"Size Sort":2,"Size Class":"Medium","Name":"[T-3][M][R++E+] VSA-1 Plasma Manifold","Effect":10.25,"Weight O/H":8,"Scale Weight":0,"Unit Weight":2,"SR Cost x":0.08,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0.1,"T":0.01,"Reliability":1,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":25,"Type":"EPS Manifold System","Tier":-3,"Size Sort":3,"Size Class":"Heavy","Name":"[T-3][H][R++O+] YYD-M3 Manifold","Effect":13,"Weight O/H":20,"Scale Weight":0,"Unit Weight":2,"SR Cost x":0.08,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.1,"E":0,"T":0.01,"Reliability":1,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":25,"Type":"EPS Manifold System","Tier":-2,"Size Sort":1,"Size Class":"Light","Name":"[T-2][L][R+] Tellar HIG-76 Pulse Injection Manifold","Effect":8,"Weight O/H":8,"Scale Weight":0,"Unit Weight":2,"SR Cost x":0.09,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0.01,"T":0.01,"Reliability":0.999,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":25,"Type":"EPS Manifold System","Tier":-2,"Size Sort":2,"Size Class":"Medium","Name":"[T-2][M][R++E+] VSA-2 Plasma Manifold","Effect":11.5,"Weight O/H":8,"Scale Weight":0,"Unit Weight":2,"SR Cost x":0.08,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0.1,"T":0.01,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":25,"Type":"EPS Manifold System","Tier":-2,"Size Sort":3,"Size Class":"Heavy","Name":"[T-2][H][R++O+] YYD-M4 Manifold","Effect":14,"Weight O/H":20,"Scale Weight":0,"Unit Weight":2,"SR Cost x":0.08,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.1,"E":0,"T":0.01,"Reliability":1,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":25,"Type":"EPS Manifold System","Tier":-1,"Size Sort":1,"Size Class":"Light","Name":"[T-1][L][R+] Tellar HIG-84 Pulse Injection Manifold","Effect":9,"Weight O/H":8,"Scale Weight":0,"Unit Weight":2,"SR Cost x":0.09,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0.01,"T":0.01,"Reliability":0.999,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":25,"Type":"EPS Manifold System","Tier":-1,"Size Sort":2,"Size Class":"Medium","Name":"[T-1][M][R++E+] VSA-3 Plasma Manifold","Effect":13,"Weight O/H":8,"Scale Weight":0,"Unit Weight":2,"SR Cost x":0.08,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0.1,"T":0.01,"Reliability":1,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":25,"Type":"EPS Manifold System","Tier":-1,"Size Sort":3,"Size Class":"Heavy","Name":"[T-1][H][R++O+] SBD-1 Manifold","Effect":15.5,"Weight O/H":20,"Scale Weight":0,"Unit Weight":2,"SR Cost x":0.08,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0.1,"E":0,"T":0.01,"Reliability":1,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":25,"Type":"EPS Manifold System","Tier":0,"Size Sort":1,"Size Class":"Light","Name":"[T0][L][R+] Tellar HIG-92 Pulse Injection Manifold","Effect":10,"Weight O/H":8,"Scale Weight":0,"Unit Weight":2,"SR Cost x":0.09,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0.01,"T":0.01,"Reliability":0.999,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":25,"Type":"EPS Manifold System","Tier":0,"Size Sort":2,"Size Class":"Medium","Name":"[T0][M] VSA-4 Pulse Injection Manifold","Effect":14,"Weight O/H":14,"Scale Weight":0,"Unit Weight":2,"SR Cost x":0.09,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0.01,"T":0.01,"Reliability":0.997,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":25,"Type":"EPS Manifold System","Tier":0,"Size Sort":3,"Size Class":"Heavy","Name":"[T0][H][R-] SF-V Performance Manifold","Effect":17,"Weight O/H":20,"Scale Weight":0,"Unit Weight":2,"SR Cost x":0.09,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0.01,"T":0.01,"Reliability":0.995,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":25,"Type":"EPS Manifold System","Tier":1,"Size Sort":1,"Size Class":"Light","Name":"[T1][L][R+] Tellar HIG-103 Pulse Injection Manifold","Effect":11,"Weight O/H":8,"Scale Weight":0,"Unit Weight":2,"SR Cost x":0.1,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0.01,"T":0.01,"Reliability":0.99925,"Year Available (SF)":2306,"Size Class List":"","Full Tier List":""},{"Type Sort":25,"Type":"EPS Manifold System","Tier":1,"Size Sort":2,"Size Class":"Medium","Name":"[T1][M] VSA-5 Pulse Injection Manifold","Effect":15.25,"Weight O/H":14,"Scale Weight":0,"Unit Weight":2,"SR Cost x":0.1,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0.01,"T":0.01,"Reliability":0.9975,"Year Available (SF)":2306,"Size Class List":"","Full Tier List":""},{"Type Sort":25,"Type":"EPS Manifold System","Tier":2,"Size Sort":1,"Size Class":"Light","Name":"[T2][L][SR-] 40EA-I Industrial Injection Manifold","Effect":9,"Weight O/H":8,"Scale Weight":0,"Unit Weight":2.2,"SR Cost x":0.04,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0.01,"T":0.01,"Reliability":0.9975,"Year Available (SF)":2311,"Size Class List":"","Full Tier List":""},{"Type Sort":25,"Type":"EPS Manifold System","Tier":2,"Size Sort":1,"Size Class":"Light","Name":"[T2][L][R+] Tellar HIG-110 Pulse Injection Manifold","Effect":12,"Weight O/H":8,"Scale Weight":0,"Unit Weight":2.2,"SR Cost x":0.11,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0.01,"T":0.01,"Reliability":0.99925,"Year Available (SF)":2311,"Size Class List":"","Full Tier List":""},{"Type Sort":25,"Type":"EPS Manifold System","Tier":2,"Size Sort":2,"Size Class":"Medium","Name":"[T2][M][SR-] SBD-A Efficient Manifold","Effect":12.375,"Weight O/H":14,"Scale Weight":0,"Unit Weight":2.2,"SR Cost x":0.04,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0.01,"T":0.01,"Reliability":0.997,"Year Available (SF)":2311,"Size Class List":"","Full Tier List":""},{"Type Sort":25,"Type":"EPS Manifold System","Tier":2,"Size Sort":2,"Size Class":"Medium","Name":"[T2][M][R+] VSA-6 Pulse Injection Manifold","Effect":16.5,"Weight O/H":14,"Scale Weight":0,"Unit Weight":2.2,"SR Cost x":0.11,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0.01,"T":0.01,"Reliability":0.999,"Year Available (SF)":2311,"Size Class List":"","Full Tier List":""},{"Type Sort":25,"Type":"EPS Manifold System","Tier":2,"Size Sort":3,"Size Class":"Heavy","Name":"[T2][H][R-SR-] YYD-4 Performance Manifold","Effect":15,"Weight O/H":20,"Scale Weight":0,"Unit Weight":2.2,"SR Cost x":0.04,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0.01,"T":0.01,"Reliability":0.995,"Year Available (SF)":2311,"Size Class List":"","Full Tier List":""},{"Type Sort":25,"Type":"EPS Manifold System","Tier":2,"Size Sort":3,"Size Class":"Heavy","Name":"[T2][H] SF-VII Performance Manifold","Effect":20,"Weight O/H":20,"Scale Weight":0,"Unit Weight":2.2,"SR Cost x":0.11,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0.01,"T":0.01,"Reliability":0.997,"Year Available (SF)":2311,"Size Class List":"","Full Tier List":""},{"Type Sort":25,"Type":"EPS Manifold System","Tier":3,"Size Sort":1,"Size Class":"Light","Name":"[T3][L][SR-] 40EA-II Industrial Injection Manifold ","Effect":9.75,"Weight O/H":8,"Scale Weight":0,"Unit Weight":2.2,"SR Cost x":0.04,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0.01,"T":0.01,"Reliability":0.998,"Year Available (SF)":2315,"Size Class List":"","Full Tier List":""},{"Type Sort":25,"Type":"EPS Manifold System","Tier":3,"Size Sort":1,"Size Class":"Light","Name":"[T3][L][R+] Tellar HIG-117 Pulse Injection Manifold ","Effect":13,"Weight O/H":8,"Scale Weight":0,"Unit Weight":2.2,"SR Cost x":0.11,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0.01,"T":0.01,"Reliability":0.9995,"Year Available (SF)":2315,"Size Class List":"","Full Tier List":""},{"Type Sort":25,"Type":"EPS Manifold System","Tier":3,"Size Sort":2,"Size Class":"Medium","Name":"[T3][M][SR-] SBD-B Efficient Manifold","Effect":13.3125,"Weight O/H":14,"Scale Weight":0,"Unit Weight":2.2,"SR Cost x":0.04,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0.01,"T":0.01,"Reliability":0.9975,"Year Available (SF)":2315,"Size Class List":"","Full Tier List":""},{"Type Sort":25,"Type":"EPS Manifold System","Tier":3,"Size Sort":2,"Size Class":"Medium","Name":"[T3][M][R+] VSA-7 Pulse Injection Manifold","Effect":17.75,"Weight O/H":14,"Scale Weight":0,"Unit Weight":2.2,"SR Cost x":0.11,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0.01,"T":0.01,"Reliability":0.99925,"Year Available (SF)":2315,"Size Class List":"","Full Tier List":""},{"Type Sort":25,"Type":"EPS Manifold System","Tier":3,"Size Sort":3,"Size Class":"Heavy","Name":"[T3][H][R-SR-] YYD-5 Performance Manifold","Effect":16.125,"Weight O/H":20,"Scale Weight":0,"Unit Weight":2.2,"SR Cost x":0.04,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0.01,"T":0.01,"Reliability":0.996,"Year Available (SF)":2315,"Size Class List":"","Full Tier List":""},{"Type Sort":25,"Type":"EPS Manifold System","Tier":3,"Size Sort":3,"Size Class":"Heavy","Name":"[T3][H] SF-VIII Performance Manifold","Effect":21.5,"Weight O/H":20,"Scale Weight":0,"Unit Weight":2.2,"SR Cost x":0.11,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0.01,"T":0.01,"Reliability":0.9975,"Year Available (SF)":2315,"Size Class List":"","Full Tier List":""},{"Type Sort":25,"Type":"EPS Manifold System","Tier":4,"Size Sort":1,"Size Class":"Light","Name":"[T4][L][SR-] 40EA-III Industrial Injection Manifold","Effect":10.5,"Weight O/H":8,"Scale Weight":0,"Unit Weight":2.2,"SR Cost x":0.04,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0.01,"T":0.01,"Reliability":0.998,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":25,"Type":"EPS Manifold System","Tier":4,"Size Sort":1,"Size Class":"Light","Name":"[T4][L][R+] Tellar HIG-122 Pulse Injection Manifold","Effect":14,"Weight O/H":8,"Scale Weight":0,"Unit Weight":2.2,"SR Cost x":0.11,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0.01,"T":0.01,"Reliability":0.9995,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":25,"Type":"EPS Manifold System","Tier":4,"Size Sort":2,"Size Class":"Medium","Name":"[T4][M][SR-] SBD-C Efficient Manifold","Effect":14.25,"Weight O/H":14,"Scale Weight":0,"Unit Weight":2.2,"SR Cost x":0.04,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0.01,"T":0.01,"Reliability":0.9975,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":25,"Type":"EPS Manifold System","Tier":4,"Size Sort":2,"Size Class":"Medium","Name":"[T4][M][R+] VSA-8 Pulse Injection Manifold","Effect":19,"Weight O/H":14,"Scale Weight":0,"Unit Weight":2.2,"SR Cost x":0.11,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0.01,"T":0.01,"Reliability":0.99925,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":25,"Type":"EPS Manifold System","Tier":4,"Size Sort":3,"Size Class":"Heavy","Name":"[T4][H][R-SR-] YYD-7 Performance Manifold","Effect":17.25,"Weight O/H":20,"Scale Weight":0,"Unit Weight":2.2,"SR Cost x":0.04,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0.01,"T":0.01,"Reliability":0.996,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":25,"Type":"EPS Manifold System","Tier":4,"Size Sort":3,"Size Class":"Heavy","Name":"[T4][H] SF-IX Performance Manifold","Effect":23,"Weight O/H":20,"Scale Weight":0,"Unit Weight":2.2,"SR Cost x":0.11,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0.01,"T":0.01,"Reliability":0.9975,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""},{"Type Sort":25,"Type":"EPS Manifold System","Tier":99,"Size Sort":99,"Size Class":"","Name":"x[T0] Ion Distributor","Effect":"","Weight O/H":"","Scale Weight":"","Unit Weight":"","SR Cost x":"","Pwr O/H":"","Scale Pwr":"","Unit Power":"","O":"","E":"","T":"","Reliability":"","Year Available (SF)":"","Size Class List":"","Full Tier List":""},{"Type Sort":25,"Type":"EPS Manifold System","Tier":99,"Size Sort":99,"Size Class":"","Name":"x[T0] Pulse Injection Manifold","Effect":"","Weight O/H":"","Scale Weight":"","Unit Weight":"","SR Cost x":"","Pwr O/H":"","Scale Pwr":"","Unit Power":"","O":"","E":"","T":"","Reliability":"","Year Available (SF)":"","Size Class List":"","Full Tier List":""},{"Type Sort":25,"Type":"EPS Manifold System","Tier":99,"Size Sort":99,"Size Class":"","Name":"x[T1] Phased Injection Manifold","Effect":"","Weight O/H":"","Scale Weight":"","Unit Weight":"","SR Cost x":"","Pwr O/H":"","Scale Pwr":"","Unit Power":"","O":"","E":"","T":"","Reliability":"","Year Available (SF)":"","Size Class List":"","Full Tier List":""},{"Type Sort":26,"Type":"Eject System","Tier":-99,"Size Sort":-99,"Size Class":"N/A","Name":"No Eject","Effect":0,"Weight O/H":0,"Scale Weight":0,"Unit Weight":0,"SR Cost x":0,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0,"T":0,"Reliability":0.7,"Year Available (SF)":0,"Size Class List":"","Full Tier List":""},{"Type Sort":26,"Type":"Eject System","Tier":-3,"Size Sort":-99,"Size Class":"N/A","Name":"[T-3] Manual Ejection - Early Mechanical","Effect":0,"Weight O/H":15,"Scale Weight":0,"Unit Weight":0,"SR Cost x":0.2,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0,"T":0.01,"Reliability":0.65,"Year Available (SF)":2230,"Size Class List":"","Full Tier List":""},{"Type Sort":26,"Type":"Eject System","Tier":-2,"Size Sort":-99,"Size Class":"N/A","Name":"[T-2] Manual Ejection - Mechanical","Effect":0,"Weight O/H":15,"Scale Weight":0,"Unit Weight":0,"SR Cost x":0.2,"Pwr O/H":0,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0,"T":0.01,"Reliability":0.6,"Year Available (SF)":2250,"Size Class List":"","Full Tier List":""},{"Type Sort":26,"Type":"Eject System","Tier":-1,"Size Sort":-99,"Size Class":"N/A","Name":"[T-1] Manual Ejection - Basic EM Rails","Effect":0,"Weight O/H":10,"Scale Weight":0,"Unit Weight":0,"SR Cost x":0.2,"Pwr O/H":1,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0,"T":0.01,"Reliability":0.5,"Year Available (SF)":2270,"Size Class List":"","Full Tier List":""},{"Type Sort":26,"Type":"Eject System","Tier":0,"Size Sort":-99,"Size Class":"N/A","Name":"[T0] EngOS Monitoring - Heavy EM Rails","Effect":0,"Weight O/H":5,"Scale Weight":0,"Unit Weight":0,"SR Cost x":0.2,"Pwr O/H":5,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0,"T":0.01,"Reliability":0.45,"Year Available (SF)":2290,"Size Class List":"","Full Tier List":""},{"Type Sort":26,"Type":"Eject System","Tier":1,"Size Sort":-99,"Size Class":"N/A","Name":"[T1] EngOS Monitoring - Super Heavy EM Rails","Effect":0,"Weight O/H":5,"Scale Weight":0,"Unit Weight":0,"SR Cost x":0.2,"Pwr O/H":5,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0,"T":0.01,"Reliability":0.375,"Year Available (SF)":2310,"Size Class List":"","Full Tier List":""},{"Type Sort":26,"Type":"Eject System","Tier":2,"Size Sort":-99,"Size Class":"N/A","Name":"[T2] EngOS Monitoring - Anak-Krueger EM Rails","Effect":0,"Weight O/H":5,"Scale Weight":0,"Unit Weight":0,"SR Cost x":0.2,"Pwr O/H":5,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0,"T":0.01,"Reliability":0.365,"Year Available (SF)":2315,"Size Class List":"","Full Tier List":""},{"Type Sort":26,"Type":"Eject System","Tier":3,"Size Sort":-99,"Size Class":"N/A","Name":"[T3] EngOS 3.1 Monitoring - YYD-Emergency VI EM Rails","Effect":0,"Weight O/H":5,"Scale Weight":0,"Unit Weight":0,"SR Cost x":0.2,"Pwr O/H":5,"Scale Pwr":0,"Unit Power":0,"O":0,"E":0,"T":0.01,"Reliability":0.36,"Year Available (SF)":"*","Size Class List":"","Full Tier List":""}]

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = [{"Type":"No Module","Weight Cap":0,"Variant":"-","Tier":-99,"Build Time":0,"C":0,"S":0,"H":0,"L":0,"P":0,"D":0,"Weight":0,"SR Cost":0,"Power Cost":0,"O":0,"E":0,"T":0,"Reliability":"100.000%"},{"Type":"Miranda Rollbar","Weight Cap":0,"Variant":"Combat","Tier":-1,"Build Time":0.25,"C":1,"S":0,"H":0,"L":0,"P":0,"D":0,"Weight":50,"SR Cost":5,"Power Cost":5,"O":0.1,"E":0.25,"T":0.1,"Reliability":"100.000%"},{"Type":"Miranda Rollbar","Weight Cap":0,"Variant":"Science","Tier":-1,"Build Time":0.25,"C":0,"S":1,"H":0,"L":0,"P":0,"D":0,"Weight":50,"SR Cost":5,"Power Cost":5,"O":0.1,"E":0.1,"T":0.25,"Reliability":"100.000%"},{"Type":"300kt Module Placeholder","Weight Cap":300,"Variant":"Combat *","Tier":0,"Build Time":0.5,"C":1,"S":0,"H":0.5,"L":0,"P":0,"D":0,"Weight":100,"SR Cost":10,"Power Cost":10,"O":0.25,"E":0.4,"T":0.2,"Reliability":"100.000%"},{"Type":"300kt Module Placeholder","Weight Cap":300,"Variant":"Diplomacy *","Tier":0,"Build Time":0.5,"C":0,"S":0,"H":0,"L":0,"P":1.5,"D":0,"Weight":100,"SR Cost":10,"Power Cost":10,"O":0.35,"E":0.35,"T":0.25,"Reliability":"100.000%"},{"Type":"300kt Module Placeholder","Weight Cap":300,"Variant":"Science *","Tier":0,"Build Time":0.5,"C":0,"S":1.5,"H":0,"L":0,"P":0,"D":0,"Weight":100,"SR Cost":10,"Power Cost":10,"O":0.2,"E":0.25,"T":0.4,"Reliability":"100.000%"},{"Type":"300kt Module Placeholder","Weight Cap":300,"Variant":"Shields *","Tier":0,"Build Time":0.5,"C":0,"S":0,"H":0,"L":1.5,"P":0,"D":0,"Weight":100,"SR Cost":15,"Power Cost":10,"O":0.35,"E":0.35,"T":0.25,"Reliability":"100.000%"},{"Type":"450kt Module Placeholder","Weight Cap":450,"Variant":"Combat *","Tier":1,"Build Time":0.75,"C":1,"S":0,"H":0.5,"L":0,"P":0,"D":0,"Weight":150,"SR Cost":10,"Power Cost":10,"O":0.25,"E":0.4,"T":0.2,"Reliability":"100.000%"},{"Type":"450kt Module Placeholder","Weight Cap":450,"Variant":"Diplomacy *","Tier":1,"Build Time":0.75,"C":0,"S":0,"H":0,"L":0,"P":1.5,"D":0,"Weight":150,"SR Cost":10,"Power Cost":10,"O":0.35,"E":0.35,"T":0.25,"Reliability":"100.000%"},{"Type":"450kt Module Placeholder","Weight Cap":450,"Variant":"Science *","Tier":1,"Build Time":0.75,"C":0,"S":1.5,"H":0,"L":0,"P":0,"D":0,"Weight":150,"SR Cost":10,"Power Cost":10,"O":0.2,"E":0.25,"T":0.4,"Reliability":"100.000%"},{"Type":"450kt Module Placeholder","Weight Cap":450,"Variant":"Shields *","Tier":1,"Build Time":0.75,"C":0,"S":0,"H":0,"L":1.5,"P":0,"D":0,"Weight":150,"SR Cost":15,"Power Cost":10,"O":0.35,"E":0.35,"T":0.25,"Reliability":"100.000%"},{"Type":""}]

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = [{"Type Sort":0,"Type":"Frame","Tier":-3,"Weight Class":1,"Size Class":"","Name":"[T-3] 250kt Frigate Frame","MaxSz":250,"Wt":50,"Build Time":"8/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.75,"E-Mod":1.08,"T-Mod":1,"SR-Mod":0.925,"Year Available (SF)":2230,"Weight Class List":"Frigate"},{"Type Sort":0,"Type":"Frame","Tier":-3,"Weight Class":1,"Size Class":"","Name":"[T-3] 400kt Frigate Frame","MaxSz":400,"Wt":70,"Build Time":"9/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.75,"E-Mod":1.09,"T-Mod":1,"SR-Mod":0.925,"Year Available (SF)":2230,"Weight Class List":"Cruiser"},{"Type Sort":0,"Type":"Frame","Tier":-3,"Weight Class":1,"Size Class":"","Name":"[T-3] 600kt Frigate Frame","MaxSz":600,"Wt":100,"Build Time":"11/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.76,"E-Mod":1.11,"T-Mod":1,"SR-Mod":0.925,"Year Available (SF)":2230,"Weight Class List":"Explorer"},{"Type Sort":0,"Type":"Frame","Tier":-2,"Weight Class":1,"Size Class":"","Name":"[T-2] 300kt Frigate Frame","MaxSz":300,"Wt":55,"Build Time":"8/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.75,"E-Mod":1.08,"T-Mod":1,"SR-Mod":0.95,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":0,"Type":"Frame","Tier":-2,"Weight Class":1,"Size Class":"","Name":"[T-2] 450kt Frigate Frame","MaxSz":450,"Wt":75,"Build Time":"9/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.75,"E-Mod":1.09,"T-Mod":1,"SR-Mod":0.95,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":0,"Type":"Frame","Tier":-2,"Weight Class":1,"Size Class":"","Name":"[T-2] 600kt Frigate Frame","MaxSz":600,"Wt":90,"Build Time":"10/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.75,"E-Mod":1.1,"T-Mod":1,"SR-Mod":0.95,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":0,"Type":"Frame","Tier":-1,"Weight Class":1,"Size Class":"","Name":"[T-1] 400kt Frigate Frame","MaxSz":400,"Wt":70,"Build Time":"8/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.75,"E-Mod":1.09,"T-Mod":1,"SR-Mod":0.9675,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":0,"Type":"Frame","Tier":-1,"Weight Class":1,"Size Class":"","Name":"[T-1] 700kt Frigate Frame","MaxSz":700,"Wt":100,"Build Time":"10/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.75,"E-Mod":1.1,"T-Mod":1,"SR-Mod":0.9675,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":0,"Type":"Frame","Tier":0,"Weight Class":1,"Size Class":"","Name":"[T0] 650kt Frigate Frame","MaxSz":650,"Wt":95,"Build Time":"10/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.75,"E-Mod":1.1,"T-Mod":1,"SR-Mod":0.975,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":0,"Type":"Frame","Tier":0,"Weight Class":1,"Size Class":"","Name":"[T0] 800kt Frigate Frame","MaxSz":800,"Wt":105,"Build Time":"10/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.75,"E-Mod":1.1,"T-Mod":1,"SR-Mod":0.975,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":0,"Type":"Frame","Tier":1,"Weight Class":1,"Size Class":"","Name":"[T1] 450kt Frigate Frame","MaxSz":450,"Wt":70,"Build Time":"8/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.725,"E-Mod":1.05,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":2310,"Weight Class List":""},{"Type Sort":0,"Type":"Frame","Tier":1,"Weight Class":1,"Size Class":"","Name":"[T1] 900kt Frigate Frame","MaxSz":900,"Wt":135,"Build Time":"11/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.75,"E-Mod":1.2,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":2310,"Weight Class List":""},{"Type Sort":0,"Type":"Frame","Tier":2,"Weight Class":1,"Size Class":"","Name":"[T2] 750kt Frigate Frame","MaxSz":750,"Wt":95,"Build Time":"9/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.75,"E-Mod":1.2,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":2313,"Weight Class List":""},{"Type Sort":0,"Type":"Frame","Tier":2,"Weight Class":1,"Size Class":"","Name":"[T2] 1050kt Frigate Frame","MaxSz":1050,"Wt":155,"Build Time":"14/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.85,"E-Mod":1.2,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":2313,"Weight Class List":""},{"Type Sort":0,"Type":"Frame","Tier":3,"Weight Class":1,"Size Class":"","Name":"[T3] 450kt Frigate Frame","MaxSz":450,"Wt":67,"Build Time":"7/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.7,"E-Mod":1,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":0,"Type":"Frame","Tier":3,"Weight Class":1,"Size Class":"","Name":"[T3] 600kt Frigate Frame","MaxSz":600,"Wt":85,"Build Time":"8/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.7,"E-Mod":1,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":0,"Type":"Frame","Tier":3,"Weight Class":1,"Size Class":"","Name":"[T3] 1050kt Frigate Frame","MaxSz":1050,"Wt":145,"Build Time":"12/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.825,"E-Mod":1.15,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":0,"Type":"Frame","Tier":-3,"Weight Class":2,"Size Class":"","Name":"[T-3] 700kt Cruiser Frame","MaxSz":700,"Wt":115,"Build Time":"13/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.975,"E-Mod":1.25,"T-Mod":0.875,"SR-Mod":1,"Year Available (SF)":2230,"Weight Class List":""},{"Type Sort":0,"Type":"Frame","Tier":-2,"Weight Class":2,"Size Class":"","Name":"[T-2] 750kt Cruiser Frame","MaxSz":750,"Wt":110,"Build Time":"13/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.95,"E-Mod":1.2,"T-Mod":0.85,"SR-Mod":1,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":0,"Type":"Frame","Tier":-1,"Weight Class":2,"Size Class":"","Name":"[T-1] 1mt Cruiser Frame","MaxSz":1000,"Wt":170,"Build Time":"15/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.95,"E-Mod":1.2,"T-Mod":0.85,"SR-Mod":1,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":0,"Type":"Frame","Tier":0,"Weight Class":2,"Size Class":"","Name":"[T0] 1500kt Cruiser Frame","MaxSz":1500,"Wt":240,"Build Time":"16/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.95,"E-Mod":1.2,"T-Mod":0.85,"SR-Mod":1,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":0,"Type":"Frame","Tier":1,"Weight Class":2,"Size Class":"","Name":"[T1] 1mt Cruiser Frame","MaxSz":1000,"Wt":160,"Build Time":"13/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.95,"E-Mod":1.2,"T-Mod":0.85,"SR-Mod":1,"Year Available (SF)":2310,"Weight Class List":""},{"Type Sort":0,"Type":"Frame","Tier":1,"Weight Class":2,"Size Class":"","Name":"[T1] 1800kt Cruiser Frame","MaxSz":1800,"Wt":300,"Build Time":"19/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.95,"E-Mod":1.2,"T-Mod":0.85,"SR-Mod":1,"Year Available (SF)":2310,"Weight Class List":""},{"Type Sort":0,"Type":"Frame","Tier":2,"Weight Class":2,"Size Class":"","Name":"[T2] 2100kt Cruiser Frame","MaxSz":2100,"Wt":375,"Build Time":"22/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.95,"E-Mod":1.2,"T-Mod":0.85,"SR-Mod":1,"Year Available (SF)":2313,"Weight Class List":""},{"Type Sort":0,"Type":"Frame","Tier":3,"Weight Class":2,"Size Class":"","Name":"[T3] 1mt Cruiser Frame","MaxSz":1000,"Wt":150,"Build Time":"10/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.95,"E-Mod":1.2,"T-Mod":0.85,"SR-Mod":1,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":0,"Type":"Frame","Tier":3,"Weight Class":2,"Size Class":"","Name":"[T3] 1500kt Cruiser Frame","MaxSz":1500,"Wt":230,"Build Time":"13/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.95,"E-Mod":1.2,"T-Mod":0.85,"SR-Mod":1,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":0,"Type":"Frame","Tier":3,"Weight Class":2,"Size Class":"","Name":"[T3] 2100kt Cruiser Frame","MaxSz":2100,"Wt":365,"Build Time":"19/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.95,"E-Mod":1.2,"T-Mod":0.85,"SR-Mod":1,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":0,"Type":"Frame","Tier":-3,"Weight Class":3,"Size Class":"","Name":"[T-3] 750kt 'Ranger' Frame","MaxSz":750,"Wt":100,"Build Time":"12/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":1.1,"E-Mod":1.1,"T-Mod":0.95,"SR-Mod":1.2,"Year Available (SF)":2220,"Weight Class List":""},{"Type Sort":0,"Type":"Frame","Tier":-2,"Weight Class":3,"Size Class":"","Name":"[T-2] 1mt 'Constitution' Frame","MaxSz":1050,"Wt":115,"Build Time":"15/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":1.1,"E-Mod":1.1,"T-Mod":0.95,"SR-Mod":1.2,"Year Available (SF)":2240,"Weight Class List":""},{"Type Sort":0,"Type":"Frame","Tier":-1,"Weight Class":3,"Size Class":"","Name":"[T-1] 1800kt Explorer Frame","MaxSz":1800,"Wt":300,"Build Time":"18/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.925,"E-Mod":0.925,"T-Mod":0.875,"SR-Mod":1.1,"Year Available (SF)":2260,"Weight Class List":""},{"Type Sort":0,"Type":"Frame","Tier":0,"Weight Class":3,"Size Class":"","Name":"[T0] 2400kt Explorer Frame","MaxSz":2400,"Wt":425,"Build Time":"21/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.9,"E-Mod":0.9,"T-Mod":0.85,"SR-Mod":1.1,"Year Available (SF)":2280,"Weight Class List":""},{"Type Sort":0,"Type":"Frame","Tier":1,"Weight Class":3,"Size Class":"","Name":"[T1] 3100kt Explorer Frame","MaxSz":3100,"Wt":550,"Build Time":"24/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.825,"E-Mod":0.825,"T-Mod":0.775,"SR-Mod":1.1,"Year Available (SF)":2310,"Weight Class List":""},{"Type Sort":0,"Type":"Frame","Tier":2,"Weight Class":3,"Size Class":"","Name":"[T2] 2400kt Explorer Frame","MaxSz":2400,"Wt":410,"Build Time":"18/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.85,"E-Mod":0.85,"T-Mod":0.8,"SR-Mod":1.1,"Year Available (SF)":2313,"Weight Class List":""},{"Type Sort":0,"Type":"Frame","Tier":2,"Weight Class":3,"Size Class":"","Name":"[T2] 3100kt Explorer Frame","MaxSz":3100,"Wt":525,"Build Time":"21/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.8,"E-Mod":0.8,"T-Mod":0.75,"SR-Mod":1.1,"Year Available (SF)":2313,"Weight Class List":""},{"Type Sort":0,"Type":"Frame","Tier":2,"Weight Class":3,"Size Class":"","Name":"[T2] 3400kt Explorer Frame","MaxSz":3400,"Wt":555,"Build Time":"24/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.825,"E-Mod":0.825,"T-Mod":0.775,"SR-Mod":1.1,"Year Available (SF)":2313,"Weight Class List":""},{"Type Sort":0,"Type":"Frame","Tier":3,"Weight Class":3,"Size Class":"","Name":"[T3] 2700kt Explorer Frame","MaxSz":2700,"Wt":450,"Build Time":"18/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.825,"E-Mod":0.825,"T-Mod":0.775,"SR-Mod":1.1,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":0,"Type":"Frame","Tier":3,"Weight Class":3,"Size Class":"","Name":"[T3] 3400kt Explorer Frame","MaxSz":3400,"Wt":540,"Build Time":"21/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.8,"E-Mod":0.8,"T-Mod":0.75,"SR-Mod":1.1,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":0,"Type":"Frame","Tier":3,"Weight Class":3,"Size Class":"","Name":"[T3] 4000kt Explorer Frame","MaxSz":4000,"Wt":640,"Build Time":"27/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.825,"E-Mod":0.825,"T-Mod":0.775,"SR-Mod":1.1,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":-3,"Weight Class":1,"Size Class":1,"Name":"[T-3][SR+] Sm Frigate Tactical Suite","MaxSz":25,"Wt":"","Build Time":"2/12","Tac Mod":0.94,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.965,"E-Mod":1,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":2230,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":-3,"Weight Class":1,"Size Class":2,"Name":"[T-3][O-] Md Frigate Tactical Suite","MaxSz":35,"Wt":5,"Build Time":"3/12","Tac Mod":0.965,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.93,"E-Mod":1,"T-Mod":1,"SR-Mod":0.98,"Year Available (SF)":2230,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":-3,"Weight Class":1,"Size Class":3,"Name":"[T-3][O--SR-] Lg Frigate Tactical Suite","MaxSz":45,"Wt":10,"Build Time":"6/12","Tac Mod":0.97,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.88,"E-Mod":1,"T-Mod":1,"SR-Mod":0.96,"Year Available (SF)":2230,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":-2,"Weight Class":1,"Size Class":1,"Name":"[T-2][SR+] Sm Frigate Tactical Suite","MaxSz":25,"Wt":"","Build Time":"2/12","Tac Mod":0.95,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.96,"E-Mod":1,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":-2,"Weight Class":1,"Size Class":2,"Name":"[T-2][O-] Md Frigate Tactical Suite","MaxSz":35,"Wt":5,"Build Time":"3/12","Tac Mod":0.98,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.92,"E-Mod":1,"T-Mod":1,"SR-Mod":0.98,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":-2,"Weight Class":1,"Size Class":3,"Name":"[T-2][O--SR-] Lg Frigate Tactical Suite","MaxSz":45,"Wt":10,"Build Time":"6/12","Tac Mod":0.99,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.86,"E-Mod":1,"T-Mod":1,"SR-Mod":0.96,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":-1,"Weight Class":1,"Size Class":1,"Name":"[T-1][SR+] Sm Frigate Tactical Suite","MaxSz":25,"Wt":"","Build Time":"2/12","Tac Mod":0.96,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.955,"E-Mod":1,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":-1,"Weight Class":1,"Size Class":2,"Name":"[T-1][O-] Md Frigate Tactical Suite","MaxSz":35,"Wt":5,"Build Time":"3/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.91,"E-Mod":1,"T-Mod":1,"SR-Mod":0.98,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":-1,"Weight Class":1,"Size Class":3,"Name":"[T-1][O--SR-] Lg Frigate Tactical Suite","MaxSz":45,"Wt":10,"Build Time":"6/12","Tac Mod":1.02,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.84,"E-Mod":1,"T-Mod":1,"SR-Mod":0.96,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":0,"Weight Class":1,"Size Class":1,"Name":"[T0][SR+] Sm Frigate Tactical Suite","MaxSz":25,"Wt":"","Build Time":"2/12","Tac Mod":0.97,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.95,"E-Mod":1,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":0,"Weight Class":1,"Size Class":2,"Name":"[T0][O-] Md Frigate Tactical Suite","MaxSz":35,"Wt":5,"Build Time":"3/12","Tac Mod":1.02,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.9,"E-Mod":1,"T-Mod":1,"SR-Mod":0.98,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":0,"Weight Class":1,"Size Class":3,"Name":"[T0][O--SR-] Lg Frigate Tactical Suite","MaxSz":45,"Wt":10,"Build Time":"6/12","Tac Mod":1.05,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.82,"E-Mod":1,"T-Mod":1,"SR-Mod":0.96,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":1,"Weight Class":1,"Size Class":1,"Name":"[T1][SR+] Sm Frigate Tactical Suite","MaxSz":25,"Wt":"","Build Time":"2/12","Tac Mod":0.98,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.945,"E-Mod":1,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":2308,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":1,"Weight Class":1,"Size Class":2,"Name":"[T1][O-] Md Frigate Tactical Suite","MaxSz":35,"Wt":5,"Build Time":"3/12","Tac Mod":1.04,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.89,"E-Mod":1,"T-Mod":1,"SR-Mod":0.98,"Year Available (SF)":2308,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":1,"Weight Class":1,"Size Class":3,"Name":"[T1][O--SR-] Lg Frigate Tactical Suite","MaxSz":45,"Wt":10,"Build Time":"6/12","Tac Mod":1.08,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.8,"E-Mod":1,"T-Mod":1,"SR-Mod":0.96,"Year Available (SF)":2308,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":2,"Weight Class":1,"Size Class":1,"Name":"[T2][SR+] Sm Frigate Tactical Suite","MaxSz":25,"Wt":"","Build Time":"2/12","Tac Mod":0.99,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.94,"E-Mod":1,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":2,"Weight Class":1,"Size Class":2,"Name":"[T2][O-] Md Frigate Tactical Suite","MaxSz":35,"Wt":5,"Build Time":"3/12","Tac Mod":1.06,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.88,"E-Mod":1,"T-Mod":1,"SR-Mod":0.98,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":2,"Weight Class":1,"Size Class":3,"Name":"[T2][O--SR-] Lg Frigate Tactical Suite","MaxSz":45,"Wt":10,"Build Time":"6/12","Tac Mod":1.11,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.78,"E-Mod":1,"T-Mod":1,"SR-Mod":0.96,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":3,"Weight Class":1,"Size Class":1,"Name":"[T3][SR+] Sm Frigate Tactical Suite","MaxSz":25,"Wt":"","Build Time":"2/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.935,"E-Mod":1,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":3,"Weight Class":1,"Size Class":2,"Name":"[T3][O-] Md Frigate Tactical Suite","MaxSz":35,"Wt":5,"Build Time":"3/12","Tac Mod":1.08,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.87,"E-Mod":1,"T-Mod":1,"SR-Mod":0.98,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":3,"Weight Class":1,"Size Class":3,"Name":"[T3][O--SR-] Lg Frigate Tactical Suite","MaxSz":45,"Wt":10,"Build Time":"6/12","Tac Mod":1.14,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.76,"E-Mod":1,"T-Mod":1,"SR-Mod":0.96,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":-3,"Weight Class":2,"Size Class":1,"Name":"[T-3] Sm Cruiser Tactical Suite","MaxSz":20,"Wt":"","Build Time":"3/12","Tac Mod":0.94,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":2230,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":-3,"Weight Class":2,"Size Class":2,"Name":"[T-3][C-] Md Cruiser Tactical Suite","MaxSz":25,"Wt":10,"Build Time":"5/12","Tac Mod":0.96,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.99,"E-Mod":0.99,"T-Mod":0.995,"SR-Mod":1,"Year Available (SF)":2230,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":-3,"Weight Class":2,"Size Class":3,"Name":"[T-3][C--] Lg Cruiser Tactical Suite","MaxSz":30,"Wt":20,"Build Time":"8/12","Tac Mod":0.97,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.94,"E-Mod":0.94,"T-Mod":0.99,"SR-Mod":1,"Year Available (SF)":2230,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":-2,"Weight Class":2,"Size Class":1,"Name":"[T-2] Sm Cruiser Tactical Suite","MaxSz":20,"Wt":"","Build Time":"3/12","Tac Mod":0.95,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":-2,"Weight Class":2,"Size Class":2,"Name":"[T-2][C-] Md Cruiser Tactical Suite","MaxSz":25,"Wt":10,"Build Time":"5/12","Tac Mod":0.98,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.98,"E-Mod":0.98,"T-Mod":0.99,"SR-Mod":1,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":-2,"Weight Class":2,"Size Class":3,"Name":"[T-2][C--] Lg Cruiser Tactical Suite","MaxSz":30,"Wt":20,"Build Time":"8/12","Tac Mod":0.99,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.93,"E-Mod":0.93,"T-Mod":0.98,"SR-Mod":1,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":-1,"Weight Class":2,"Size Class":1,"Name":"[T-1] Sm Cruiser Tactical Suite","MaxSz":20,"Wt":"","Build Time":"3/12","Tac Mod":0.96,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":-1,"Weight Class":2,"Size Class":2,"Name":"[T-1][C-] Md Cruiser Tactical Suite","MaxSz":25,"Wt":10,"Build Time":"5/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.97,"E-Mod":0.97,"T-Mod":0.985,"SR-Mod":1,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":-1,"Weight Class":2,"Size Class":3,"Name":"[T-1][C--] Lg Cruiser Tactical Suite","MaxSz":30,"Wt":20,"Build Time":"8/12","Tac Mod":1.02,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.92,"E-Mod":0.92,"T-Mod":0.97,"SR-Mod":1,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":0,"Weight Class":2,"Size Class":1,"Name":"[T0] Sm Cruiser Tactical Suite","MaxSz":20,"Wt":"","Build Time":"3/12","Tac Mod":0.97,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":0,"Weight Class":2,"Size Class":2,"Name":"[T0][C-] Md Cruiser Tactical Suite","MaxSz":25,"Wt":10,"Build Time":"5/12","Tac Mod":1.02,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.96,"E-Mod":0.96,"T-Mod":0.98,"SR-Mod":1,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":0,"Weight Class":2,"Size Class":3,"Name":"[T0][C--] Lg Cruiser Tactical Suite","MaxSz":30,"Wt":20,"Build Time":"8/12","Tac Mod":1.05,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.91,"E-Mod":0.91,"T-Mod":0.96,"SR-Mod":1,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":1,"Weight Class":2,"Size Class":1,"Name":"[T1] Sm Cruiser Tactical Suite","MaxSz":20,"Wt":"","Build Time":"3/12","Tac Mod":0.98,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":2307,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":1,"Weight Class":2,"Size Class":2,"Name":"[T1][C-] Md Cruiser Tactical Suite","MaxSz":25,"Wt":10,"Build Time":"5/12","Tac Mod":1.04,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.95,"E-Mod":0.95,"T-Mod":0.975,"SR-Mod":1,"Year Available (SF)":2307,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":1,"Weight Class":2,"Size Class":3,"Name":"[T1][C--] Lg Cruiser Tactical Suite","MaxSz":30,"Wt":20,"Build Time":"8/12","Tac Mod":1.08,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.9,"E-Mod":0.9,"T-Mod":0.95,"SR-Mod":1,"Year Available (SF)":2307,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":2,"Weight Class":2,"Size Class":1,"Name":"[T2] Sm Cruiser Tactical Suite","MaxSz":20,"Wt":"","Build Time":"3/12","Tac Mod":0.99,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":2,"Weight Class":2,"Size Class":2,"Name":"[T2][C-] Md Cruiser Tactical Suite","MaxSz":25,"Wt":10,"Build Time":"5/12","Tac Mod":1.06,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.94,"E-Mod":0.94,"T-Mod":0.97,"SR-Mod":1,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":2,"Weight Class":2,"Size Class":3,"Name":"[T2][C--] Lg Cruiser Tactical Suite","MaxSz":30,"Wt":20,"Build Time":"8/12","Tac Mod":1.11,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.89,"E-Mod":0.89,"T-Mod":0.94,"SR-Mod":1,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":3,"Weight Class":2,"Size Class":1,"Name":"[T3] Sm Cruiser Tactical Suite","MaxSz":20,"Wt":"","Build Time":"3/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":3,"Weight Class":2,"Size Class":2,"Name":"[T3][C-] Md Cruiser Tactical Suite","MaxSz":25,"Wt":10,"Build Time":"5/12","Tac Mod":1.08,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.93,"E-Mod":0.93,"T-Mod":0.965,"SR-Mod":1,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":3,"Weight Class":2,"Size Class":3,"Name":"[T3][C--] Lg Cruiser Tactical Suite","MaxSz":30,"Wt":20,"Build Time":"8/12","Tac Mod":1.14,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.88,"E-Mod":0.88,"T-Mod":0.93,"SR-Mod":1,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":-3,"Weight Class":3,"Size Class":1,"Name":"[T-3] Sm Explorer Tactical Suite","MaxSz":15,"Wt":"","Build Time":"4/12","Tac Mod":0.95,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":2230,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":-3,"Weight Class":3,"Size Class":2,"Name":"[T-3][C-] Md Explorer Tactical Suite","MaxSz":20,"Wt":10,"Build Time":"6/12","Tac Mod":0.98,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.965,"E-Mod":0.915,"T-Mod":0.98,"SR-Mod":1,"Year Available (SF)":2230,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":-3,"Weight Class":3,"Size Class":3,"Name":"[T-3][C--] Lg Explorer Tactical Suite","MaxSz":25,"Wt":30,"Build Time":"10/12","Tac Mod":0.99,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.94,"E-Mod":0.84,"T-Mod":0.94,"SR-Mod":1,"Year Available (SF)":2230,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":-2,"Weight Class":3,"Size Class":1,"Name":"[T-2] Sm Explorer Tactical Suite","MaxSz":15,"Wt":"","Build Time":"4/12","Tac Mod":0.95,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":-2,"Weight Class":3,"Size Class":2,"Name":"[T-2][C-] Md Explorer Tactical Suite","MaxSz":20,"Wt":10,"Build Time":"6/12","Tac Mod":0.98,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.96,"E-Mod":0.91,"T-Mod":0.97,"SR-Mod":1,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":-2,"Weight Class":3,"Size Class":3,"Name":"[T-2][C--] Lg Explorer Tactical Suite","MaxSz":25,"Wt":30,"Build Time":"10/12","Tac Mod":0.99,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.93,"E-Mod":0.83,"T-Mod":0.93,"SR-Mod":1,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":-1,"Weight Class":3,"Size Class":1,"Name":"[T-1] Sm Explorer Tactical Suite","MaxSz":15,"Wt":"","Build Time":"4/12","Tac Mod":0.96,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":-1,"Weight Class":3,"Size Class":2,"Name":"[T-1][C-] Md Explorer Tactical Suite","MaxSz":20,"Wt":10,"Build Time":"6/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.955,"E-Mod":0.905,"T-Mod":0.96,"SR-Mod":1,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":-1,"Weight Class":3,"Size Class":3,"Name":"[T-1][C--] Lg Explorer Tactical Suite","MaxSz":25,"Wt":30,"Build Time":"10/12","Tac Mod":1.02,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.92,"E-Mod":0.82,"T-Mod":0.92,"SR-Mod":1,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":0,"Weight Class":3,"Size Class":1,"Name":"[T0] Sm Explorer Tactical Suite","MaxSz":15,"Wt":"","Build Time":"4/12","Tac Mod":0.97,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":0,"Weight Class":3,"Size Class":2,"Name":"[T0][C-] Md Explorer Tactical Suite","MaxSz":20,"Wt":10,"Build Time":"6/12","Tac Mod":1.02,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.95,"E-Mod":0.9,"T-Mod":0.95,"SR-Mod":1,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":0,"Weight Class":3,"Size Class":3,"Name":"[T0][C--] Lg Explorer Tactical Suite","MaxSz":25,"Wt":30,"Build Time":"10/12","Tac Mod":1.05,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.91,"E-Mod":0.81,"T-Mod":0.91,"SR-Mod":1,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":1,"Weight Class":3,"Size Class":1,"Name":"[T1] Sm Explorer Tactical Suite","MaxSz":15,"Wt":"","Build Time":"4/12","Tac Mod":0.98,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":2309,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":1,"Weight Class":3,"Size Class":2,"Name":"[T1][C-] Md Explorer Tactical Suite","MaxSz":20,"Wt":10,"Build Time":"6/12","Tac Mod":1.04,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.945,"E-Mod":0.895,"T-Mod":0.945,"SR-Mod":1,"Year Available (SF)":2309,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":1,"Weight Class":3,"Size Class":3,"Name":"[T1][C--] Lg Explorer Tactical Suite","MaxSz":25,"Wt":30,"Build Time":"10/12","Tac Mod":1.08,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.9,"E-Mod":0.8,"T-Mod":0.9,"SR-Mod":1,"Year Available (SF)":2309,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":2,"Weight Class":3,"Size Class":1,"Name":"[T2] Sm Explorer Tactical Suite","MaxSz":15,"Wt":"","Build Time":"4/12","Tac Mod":0.99,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":2313,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":2,"Weight Class":3,"Size Class":2,"Name":"[T2][C-] Md Explorer Tactical Suite","MaxSz":20,"Wt":10,"Build Time":"6/12","Tac Mod":1.06,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.94,"E-Mod":0.89,"T-Mod":0.94,"SR-Mod":1,"Year Available (SF)":2313,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":2,"Weight Class":3,"Size Class":3,"Name":"[T2][C--] Lg Explorer Tactical Suite","MaxSz":25,"Wt":30,"Build Time":"10/12","Tac Mod":1.11,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.89,"E-Mod":0.79,"T-Mod":0.89,"SR-Mod":1,"Year Available (SF)":2313,"Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":3,"Weight Class":3,"Size Class":1,"Name":"[T3] Sm Explorer Tactical Suite","MaxSz":15,"Wt":"","Build Time":"4/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":3,"Weight Class":3,"Size Class":2,"Name":"[T3][C-] Md Explorer Tactical Suite","MaxSz":20,"Wt":10,"Build Time":"6/12","Tac Mod":1.08,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.935,"E-Mod":0.885,"T-Mod":0.935,"SR-Mod":1,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":1,"Type":"Tactical","Tier":3,"Weight Class":3,"Size Class":3,"Name":"[T3][C--] Lg Explorer Tactical Suite","MaxSz":25,"Wt":30,"Build Time":"10/12","Tac Mod":1.14,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.88,"E-Mod":0.78,"T-Mod":0.88,"SR-Mod":1,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":-3,"Weight Class":1,"Size Class":1,"Name":"[T-3][T--SR--] Sm Frigate Operations Suite","MaxSz":25,"Wt":"","Build Time":"2/12","Tac Mod":1,"Ops Mod":0.96,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":0.98,"SR-Mod":0.96,"Year Available (SF)":2230,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":-3,"Weight Class":1,"Size Class":2,"Name":"[T-3][OET-SR-] Md Frigate Operations Suite","MaxSz":35,"Wt":5,"Build Time":"3/12","Tac Mod":1,"Ops Mod":0.97,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.95,"E-Mod":0.95,"T-Mod":1.005,"SR-Mod":0.98,"Year Available (SF)":2230,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":-3,"Weight Class":1,"Size Class":3,"Name":"[T-3][OE--] Lg Frigate Operations Suite","MaxSz":45,"Wt":10,"Build Time":"6/12","Tac Mod":1,"Ops Mod":0.99,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.925,"E-Mod":0.925,"T-Mod":1.03,"SR-Mod":1,"Year Available (SF)":2230,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":-2,"Weight Class":1,"Size Class":1,"Name":"[T-2][T--SR--] Sm Frigate Operations Suite","MaxSz":25,"Wt":"","Build Time":"2/12","Tac Mod":1,"Ops Mod":0.97,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":0.97,"SR-Mod":0.96,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":-2,"Weight Class":1,"Size Class":2,"Name":"[T-2][OET-SR-] Md Frigate Operations Suite","MaxSz":35,"Wt":5,"Build Time":"3/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.95,"E-Mod":0.95,"T-Mod":0.995,"SR-Mod":0.98,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":-2,"Weight Class":1,"Size Class":3,"Name":"[T-2][OE--] Lg Frigate Operations Suite","MaxSz":45,"Wt":10,"Build Time":"6/12","Tac Mod":1,"Ops Mod":1.01,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.925,"E-Mod":0.925,"T-Mod":1.02,"SR-Mod":1,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":-1,"Weight Class":1,"Size Class":1,"Name":"[T-1][T--SR--] Sm Frigate Operations Suite","MaxSz":25,"Wt":"","Build Time":"2/12","Tac Mod":1,"Ops Mod":0.98,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":0.96,"SR-Mod":0.96,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":-1,"Weight Class":1,"Size Class":2,"Name":"[T-1][OET-SR-] Md Frigate Operations Suite","MaxSz":35,"Wt":5,"Build Time":"3/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.95,"E-Mod":0.95,"T-Mod":0.985,"SR-Mod":0.98,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":-1,"Weight Class":1,"Size Class":3,"Name":"[T-1][OE--] Lg Frigate Operations Suite","MaxSz":45,"Wt":10,"Build Time":"6/12","Tac Mod":1,"Ops Mod":1.04,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.925,"E-Mod":0.925,"T-Mod":1.01,"SR-Mod":1,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":0,"Weight Class":1,"Size Class":1,"Name":"[T0][T--SR--] Sm Frigate Operations Suite","MaxSz":25,"Wt":"","Build Time":"2/12","Tac Mod":1,"Ops Mod":0.99,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":0.95,"SR-Mod":0.96,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":0,"Weight Class":1,"Size Class":2,"Name":"[T0][OET-SR-] Md Frigate Operations Suite","MaxSz":35,"Wt":5,"Build Time":"3/12","Tac Mod":1,"Ops Mod":1.02,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.95,"E-Mod":0.95,"T-Mod":0.975,"SR-Mod":0.98,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":0,"Weight Class":1,"Size Class":3,"Name":"[T0][OE--] Lg Frigate Operations Suite","MaxSz":45,"Wt":10,"Build Time":"6/12","Tac Mod":1,"Ops Mod":1.07,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.925,"E-Mod":0.925,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":1,"Weight Class":1,"Size Class":1,"Name":"[T1][T--SR--] Sm Frigate Operations Suite","MaxSz":25,"Wt":"","Build Time":"2/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":0.94,"SR-Mod":0.96,"Year Available (SF)":2308,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":1,"Weight Class":1,"Size Class":2,"Name":"[T1][OET-SR-] Md Frigate Operations Suite","MaxSz":35,"Wt":5,"Build Time":"3/12","Tac Mod":1,"Ops Mod":1.04,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.95,"E-Mod":0.95,"T-Mod":0.965,"SR-Mod":0.98,"Year Available (SF)":2308,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":1,"Weight Class":1,"Size Class":3,"Name":"[T1][OE--] Lg Frigate Operations Suite","MaxSz":45,"Wt":10,"Build Time":"6/12","Tac Mod":1,"Ops Mod":1.1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.925,"E-Mod":0.925,"T-Mod":0.99,"SR-Mod":1,"Year Available (SF)":2308,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":2,"Weight Class":1,"Size Class":1,"Name":"[T2][T--SR--] Sm Frigate Operations Suite","MaxSz":25,"Wt":"","Build Time":"2/12","Tac Mod":1,"Ops Mod":1.01,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":0.93,"SR-Mod":0.96,"Year Available (SF)":2314,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":2,"Weight Class":1,"Size Class":2,"Name":"[T2][OET-SR-] Md Frigate Operations Suite","MaxSz":35,"Wt":5,"Build Time":"3/12","Tac Mod":1,"Ops Mod":1.06,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.95,"E-Mod":0.95,"T-Mod":0.955,"SR-Mod":0.98,"Year Available (SF)":2314,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":2,"Weight Class":1,"Size Class":3,"Name":"[T2][OE--] Lg Frigate Operations Suite","MaxSz":45,"Wt":10,"Build Time":"6/12","Tac Mod":1,"Ops Mod":1.13,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.925,"E-Mod":0.925,"T-Mod":0.98,"SR-Mod":1,"Year Available (SF)":2314,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":3,"Weight Class":1,"Size Class":1,"Name":"[T3][T--SR--] Sm Frigate Operations Suite","MaxSz":25,"Wt":"","Build Time":"2/12","Tac Mod":1,"Ops Mod":1.02,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":0.92,"SR-Mod":0.96,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":3,"Weight Class":1,"Size Class":2,"Name":"[T3][OET-SR-] Md Frigate Operations Suite","MaxSz":35,"Wt":5,"Build Time":"3/12","Tac Mod":1,"Ops Mod":1.08,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.95,"E-Mod":0.95,"T-Mod":0.945,"SR-Mod":0.98,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":3,"Weight Class":1,"Size Class":3,"Name":"[T3][OE--] Lg Frigate Operations Suite","MaxSz":45,"Wt":10,"Build Time":"6/12","Tac Mod":1,"Ops Mod":1.16,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.925,"E-Mod":0.925,"T-Mod":0.97,"SR-Mod":1,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":-3,"Weight Class":2,"Size Class":1,"Name":"[T-3][T-SR--] Sm Cruiser Operations Suite","MaxSz":20,"Wt":"","Build Time":"3/12","Tac Mod":1,"Ops Mod":0.96,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":0.985,"T-Mod":0.97,"SR-Mod":0.9,"Year Available (SF)":2230,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":-3,"Weight Class":2,"Size Class":2,"Name":"[T-3][T-SR-] Md Cruiser Operations Suite","MaxSz":25,"Wt":10,"Build Time":"5/12","Tac Mod":1,"Ops Mod":0.97,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.995,"E-Mod":0.985,"T-Mod":0.97,"SR-Mod":0.95,"Year Available (SF)":2230,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":-3,"Weight Class":2,"Size Class":3,"Name":"[T-3][OE-] Lg Cruiser Operations Suite","MaxSz":30,"Wt":20,"Build Time":"8/12","Tac Mod":1,"Ops Mod":0.98,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.99,"E-Mod":0.97,"T-Mod":0.98,"SR-Mod":1,"Year Available (SF)":2230,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":-2,"Weight Class":2,"Size Class":1,"Name":"[T-2][T-SR--] Sm Cruiser Operations Suite","MaxSz":20,"Wt":"","Build Time":"3/12","Tac Mod":1,"Ops Mod":0.97,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":0.985,"T-Mod":0.97,"SR-Mod":0.9,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":-2,"Weight Class":2,"Size Class":2,"Name":"[T-2][T-SR-] Md Cruiser Operations Suite","MaxSz":25,"Wt":10,"Build Time":"5/12","Tac Mod":1,"Ops Mod":0.985,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.995,"E-Mod":0.985,"T-Mod":0.97,"SR-Mod":0.95,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":-2,"Weight Class":2,"Size Class":3,"Name":"[T-2][OE-] Lg Cruiser Operations Suite","MaxSz":30,"Wt":20,"Build Time":"8/12","Tac Mod":1,"Ops Mod":1.01,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.99,"E-Mod":0.97,"T-Mod":0.98,"SR-Mod":1,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":-1,"Weight Class":2,"Size Class":1,"Name":"[T-1][T-SR--] Sm Cruiser Operations Suite","MaxSz":20,"Wt":"","Build Time":"3/12","Tac Mod":1,"Ops Mod":0.98,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":0.985,"T-Mod":0.97,"SR-Mod":0.9,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":-1,"Weight Class":2,"Size Class":2,"Name":"[T-1][T-SR-] Md Cruiser Operations Suite","MaxSz":25,"Wt":10,"Build Time":"5/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.995,"E-Mod":0.985,"T-Mod":0.97,"SR-Mod":0.95,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":-1,"Weight Class":2,"Size Class":3,"Name":"[T-1][OE-] Lg Cruiser Operations Suite","MaxSz":30,"Wt":20,"Build Time":"8/12","Tac Mod":1,"Ops Mod":1.04,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.99,"E-Mod":0.97,"T-Mod":0.98,"SR-Mod":1,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":0,"Weight Class":2,"Size Class":1,"Name":"[T0][T-SR--] Sm Cruiser Operations Suite","MaxSz":20,"Wt":"","Build Time":"3/12","Tac Mod":1,"Ops Mod":0.99,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":0.98,"T-Mod":0.955,"SR-Mod":0.9,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":0,"Weight Class":2,"Size Class":2,"Name":"[T0][T-SR-] Md Cruiser Operations Suite","MaxSz":25,"Wt":10,"Build Time":"5/12","Tac Mod":1,"Ops Mod":1.02,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.99,"E-Mod":0.98,"T-Mod":0.955,"SR-Mod":0.95,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":0,"Weight Class":2,"Size Class":3,"Name":"[T0][OE-] Lg Cruiser Operations Suite","MaxSz":30,"Wt":20,"Build Time":"8/12","Tac Mod":1,"Ops Mod":1.07,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.98,"E-Mod":0.96,"T-Mod":0.97,"SR-Mod":1,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":1,"Weight Class":2,"Size Class":1,"Name":"[T1][T-SR--] Sm Cruiser Operations Suite","MaxSz":20,"Wt":"","Build Time":"3/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":0.975,"T-Mod":0.94,"SR-Mod":0.9,"Year Available (SF)":2307,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":1,"Weight Class":2,"Size Class":2,"Name":"[T1][T-SR-] Md Cruiser Operations Suite","MaxSz":25,"Wt":10,"Build Time":"5/12","Tac Mod":1,"Ops Mod":1.04,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.985,"E-Mod":0.975,"T-Mod":0.94,"SR-Mod":0.95,"Year Available (SF)":2307,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":1,"Weight Class":2,"Size Class":3,"Name":"[T1][OE-] Lg Cruiser Operations Suite","MaxSz":30,"Wt":20,"Build Time":"8/12","Tac Mod":1,"Ops Mod":1.1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.97,"E-Mod":0.95,"T-Mod":0.96,"SR-Mod":1,"Year Available (SF)":2307,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":2,"Weight Class":2,"Size Class":1,"Name":"[T2][T-SR--] Sm Cruiser Operations Suite","MaxSz":20,"Wt":"","Build Time":"3/12","Tac Mod":1,"Ops Mod":1.01,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":0.97,"T-Mod":0.925,"SR-Mod":0.9,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":2,"Weight Class":2,"Size Class":2,"Name":"[T2][T-SR-] Md Cruiser Operations Suite","MaxSz":25,"Wt":10,"Build Time":"5/12","Tac Mod":1,"Ops Mod":1.06,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.98,"E-Mod":0.97,"T-Mod":0.925,"SR-Mod":0.95,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":2,"Weight Class":2,"Size Class":3,"Name":"[T2][OE-] Lg Cruiser Operations Suite","MaxSz":30,"Wt":20,"Build Time":"8/12","Tac Mod":1,"Ops Mod":1.13,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.96,"E-Mod":0.94,"T-Mod":0.95,"SR-Mod":1,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":3,"Weight Class":2,"Size Class":1,"Name":"[T3][T-SR--] Sm Cruiser Operations Suite","MaxSz":20,"Wt":"","Build Time":"3/12","Tac Mod":1,"Ops Mod":1.02,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":0.965,"T-Mod":0.91,"SR-Mod":0.9,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":3,"Weight Class":2,"Size Class":2,"Name":"[T3][T-SR-] Md Cruiser Operations Suite","MaxSz":25,"Wt":10,"Build Time":"5/12","Tac Mod":1,"Ops Mod":1.08,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.975,"E-Mod":0.965,"T-Mod":0.91,"SR-Mod":0.95,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":3,"Weight Class":2,"Size Class":3,"Name":"[T3][OE-] Lg Cruiser Operations Suite","MaxSz":30,"Wt":20,"Build Time":"8/12","Tac Mod":1,"Ops Mod":1.16,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.95,"E-Mod":0.93,"T-Mod":0.94,"SR-Mod":1,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":-3,"Weight Class":3,"Size Class":1,"Name":"[T-3][SR--] Sm Explorer Operations Suite","MaxSz":15,"Wt":"","Build Time":"4/12","Tac Mod":1,"Ops Mod":0.96,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":0.97,"SR-Mod":0.9,"Year Available (SF)":2230,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":-3,"Weight Class":3,"Size Class":2,"Name":"[T-3][C-SR-] Md Explorer Operations Suite","MaxSz":20,"Wt":10,"Build Time":"6/12","Tac Mod":1,"Ops Mod":0.97,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.97,"E-Mod":0.97,"T-Mod":0.94,"SR-Mod":0.95,"Year Available (SF)":2230,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":-3,"Weight Class":3,"Size Class":3,"Name":"[T-3][C--] Lg Explorer Operations Suite","MaxSz":25,"Wt":30,"Build Time":"10/12","Tac Mod":1,"Ops Mod":0.98,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.94,"E-Mod":0.94,"T-Mod":0.91,"SR-Mod":1,"Year Available (SF)":2230,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":-2,"Weight Class":3,"Size Class":1,"Name":"[T-2][SR--] Sm Explorer Operations Suite","MaxSz":15,"Wt":"","Build Time":"4/12","Tac Mod":1,"Ops Mod":0.97,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":0.97,"SR-Mod":0.9,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":-2,"Weight Class":3,"Size Class":2,"Name":"[T-2][C-SR-] Md Explorer Operations Suite","MaxSz":20,"Wt":10,"Build Time":"6/12","Tac Mod":1,"Ops Mod":0.98,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.97,"E-Mod":0.97,"T-Mod":0.94,"SR-Mod":0.95,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":-2,"Weight Class":3,"Size Class":3,"Name":"[T-2][C--] Lg Explorer Operations Suite","MaxSz":25,"Wt":30,"Build Time":"10/12","Tac Mod":1,"Ops Mod":1.01,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.94,"E-Mod":0.94,"T-Mod":0.91,"SR-Mod":1,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":-1,"Weight Class":3,"Size Class":1,"Name":"[T-1][SR--] Sm Explorer Operations Suite","MaxSz":15,"Wt":"","Build Time":"4/12","Tac Mod":1,"Ops Mod":0.98,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":0.97,"SR-Mod":0.9,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":-1,"Weight Class":3,"Size Class":2,"Name":"[T-1][C-SR-] Md Explorer Operations Suite","MaxSz":20,"Wt":10,"Build Time":"6/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.97,"E-Mod":0.97,"T-Mod":0.94,"SR-Mod":0.95,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":-1,"Weight Class":3,"Size Class":3,"Name":"[T-1][C--] Lg Explorer Operations Suite","MaxSz":25,"Wt":30,"Build Time":"10/12","Tac Mod":1,"Ops Mod":1.04,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.94,"E-Mod":0.94,"T-Mod":0.91,"SR-Mod":1,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":0,"Weight Class":3,"Size Class":1,"Name":"[T0][SR--] Sm Explorer Operations Suite","MaxSz":15,"Wt":"","Build Time":"4/12","Tac Mod":1,"Ops Mod":0.99,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":0.96,"SR-Mod":0.9,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":0,"Weight Class":3,"Size Class":2,"Name":"[T0][C-SR-] Md Explorer Operations Suite","MaxSz":20,"Wt":10,"Build Time":"6/12","Tac Mod":1,"Ops Mod":1.02,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.96,"E-Mod":0.96,"T-Mod":0.92,"SR-Mod":0.95,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":0,"Weight Class":3,"Size Class":3,"Name":"[T0][C--] Lg Explorer Operations Suite","MaxSz":25,"Wt":30,"Build Time":"10/12","Tac Mod":1,"Ops Mod":1.07,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.92,"E-Mod":0.92,"T-Mod":0.88,"SR-Mod":1,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":1,"Weight Class":3,"Size Class":1,"Name":"[T1][SR--] Sm Explorer Operations Suite","MaxSz":15,"Wt":"","Build Time":"4/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":0.95,"SR-Mod":0.9,"Year Available (SF)":2309,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":1,"Weight Class":3,"Size Class":2,"Name":"[T1][C-SR-] Md Explorer Operations Suite","MaxSz":20,"Wt":10,"Build Time":"6/12","Tac Mod":1,"Ops Mod":1.04,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.95,"E-Mod":0.95,"T-Mod":0.9,"SR-Mod":0.95,"Year Available (SF)":2309,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":1,"Weight Class":3,"Size Class":3,"Name":"[T1][C--] Lg Explorer Operations Suite","MaxSz":25,"Wt":30,"Build Time":"10/12","Tac Mod":1,"Ops Mod":1.1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.9,"E-Mod":0.9,"T-Mod":0.85,"SR-Mod":1,"Year Available (SF)":2309,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":2,"Weight Class":3,"Size Class":1,"Name":"[T2][SR--] Sm Explorer Operations Suite","MaxSz":15,"Wt":"","Build Time":"4/12","Tac Mod":1,"Ops Mod":1.01,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":0.94,"SR-Mod":0.9,"Year Available (SF)":2313,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":2,"Weight Class":3,"Size Class":2,"Name":"[T2][C-SR-] Md Explorer Operations Suite","MaxSz":20,"Wt":10,"Build Time":"6/12","Tac Mod":1,"Ops Mod":1.06,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.94,"E-Mod":0.94,"T-Mod":0.88,"SR-Mod":0.95,"Year Available (SF)":2313,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":2,"Weight Class":3,"Size Class":3,"Name":"[T2][C--] Lg Explorer Operations Suite","MaxSz":25,"Wt":30,"Build Time":"10/12","Tac Mod":1,"Ops Mod":1.13,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.88,"E-Mod":0.88,"T-Mod":0.82,"SR-Mod":1,"Year Available (SF)":2313,"Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":3,"Weight Class":3,"Size Class":1,"Name":"[T3][SR--] Sm Explorer Operations Suite","MaxSz":15,"Wt":"","Build Time":"4/12","Tac Mod":1,"Ops Mod":1.02,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":0.93,"SR-Mod":0.9,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":3,"Weight Class":3,"Size Class":2,"Name":"[T3][C-SR-] Md Explorer Operations Suite","MaxSz":20,"Wt":10,"Build Time":"6/12","Tac Mod":1,"Ops Mod":1.08,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.93,"E-Mod":0.93,"T-Mod":0.86,"SR-Mod":0.95,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":2,"Type":"Operations","Tier":3,"Weight Class":3,"Size Class":3,"Name":"[T3][C--] Lg Explorer Operations Suite","MaxSz":25,"Wt":30,"Build Time":"10/12","Tac Mod":1,"Ops Mod":1.16,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.86,"E-Mod":0.86,"T-Mod":0.79,"SR-Mod":1,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":-3,"Weight Class":1,"Size Class":1,"Name":"[T-3] Sm Frigate Hull Suite","MaxSz":15,"Wt":"","Build Time":"1/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":0.94,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":2230,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":-3,"Weight Class":1,"Size Class":2,"Name":"[T-3][C-] Md Frigate Hull Suite","MaxSz":20,"Wt":"","Build Time":"2/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":0.96,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.95,"E-Mod":0.95,"T-Mod":0.95,"SR-Mod":1,"Year Available (SF)":2230,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":-3,"Weight Class":1,"Size Class":3,"Name":"[T-3][C--] Lg Frigate Hull Suite","MaxSz":25,"Wt":5,"Build Time":"4/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":0.98,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.9,"E-Mod":0.9,"T-Mod":0.9,"SR-Mod":1,"Year Available (SF)":2230,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":-2,"Weight Class":1,"Size Class":1,"Name":"[T-2] Sm Frigate Hull Suite","MaxSz":15,"Wt":"","Build Time":"1/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":0.95,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":-2,"Weight Class":1,"Size Class":2,"Name":"[T-2][C-] Md Frigate Hull Suite","MaxSz":20,"Wt":"","Build Time":"2/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":0.98,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.95,"E-Mod":0.95,"T-Mod":0.95,"SR-Mod":1,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":-2,"Weight Class":1,"Size Class":3,"Name":"[T-2][C--] Lg Frigate Hull Suite","MaxSz":25,"Wt":5,"Build Time":"4/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.9,"E-Mod":0.9,"T-Mod":0.9,"SR-Mod":1,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":-1,"Weight Class":1,"Size Class":1,"Name":"[T-1] Sm Frigate Hull Suite","MaxSz":15,"Wt":"","Build Time":"1/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":0.96,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":-1,"Weight Class":1,"Size Class":2,"Name":"[T-1][C-] Md Frigate Hull Suite","MaxSz":20,"Wt":"","Build Time":"2/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.95,"E-Mod":0.95,"T-Mod":0.95,"SR-Mod":1,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":-1,"Weight Class":1,"Size Class":3,"Name":"[T-1][C--] Lg Frigate Hull Suite","MaxSz":25,"Wt":5,"Build Time":"4/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1.02,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.9,"E-Mod":0.9,"T-Mod":0.9,"SR-Mod":1,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":0,"Weight Class":1,"Size Class":1,"Name":"[T0] Sm Frigate Hull Suite","MaxSz":15,"Wt":"","Build Time":"1/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":0.97,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":0,"Weight Class":1,"Size Class":2,"Name":"[T0][C-] Md Frigate Hull Suite","MaxSz":20,"Wt":"","Build Time":"2/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1.02,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.95,"E-Mod":0.95,"T-Mod":0.95,"SR-Mod":1,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":0,"Weight Class":1,"Size Class":3,"Name":"[T0][C--] Lg Frigate Hull Suite","MaxSz":25,"Wt":5,"Build Time":"4/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1.05,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.9,"E-Mod":0.9,"T-Mod":0.9,"SR-Mod":1,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":1,"Weight Class":1,"Size Class":1,"Name":"[T1] Sm Frigate Hull Suite","MaxSz":15,"Wt":"","Build Time":"1/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":0.98,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":2308,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":1,"Weight Class":1,"Size Class":2,"Name":"[T1][C-] Md Frigate Hull Suite","MaxSz":20,"Wt":"","Build Time":"2/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1.04,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.95,"E-Mod":0.95,"T-Mod":0.95,"SR-Mod":1,"Year Available (SF)":2308,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":1,"Weight Class":1,"Size Class":3,"Name":"[T1][C--] Lg Frigate Hull Suite","MaxSz":25,"Wt":5,"Build Time":"4/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1.08,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.9,"E-Mod":0.9,"T-Mod":0.9,"SR-Mod":1,"Year Available (SF)":2308,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":2,"Weight Class":1,"Size Class":1,"Name":"[T2] Sm Frigate Hull Suite","MaxSz":15,"Wt":"","Build Time":"1/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":0.99,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":2315,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":2,"Weight Class":1,"Size Class":2,"Name":"[T2][C-] Md Frigate Hull Suite","MaxSz":20,"Wt":"","Build Time":"2/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1.06,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.95,"E-Mod":0.95,"T-Mod":0.95,"SR-Mod":1,"Year Available (SF)":2315,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":2,"Weight Class":1,"Size Class":3,"Name":"[T2][C--] Lg Frigate Hull Suite","MaxSz":25,"Wt":5,"Build Time":"4/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1.11,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.9,"E-Mod":0.9,"T-Mod":0.9,"SR-Mod":1,"Year Available (SF)":2315,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":3,"Weight Class":1,"Size Class":1,"Name":"[T3] Sm Frigate Hull Suite","MaxSz":15,"Wt":"","Build Time":"1/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":3,"Weight Class":1,"Size Class":2,"Name":"[T3][C-] Md Frigate Hull Suite","MaxSz":20,"Wt":"","Build Time":"2/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1.08,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.95,"E-Mod":0.95,"T-Mod":0.95,"SR-Mod":1,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":3,"Weight Class":1,"Size Class":3,"Name":"[T3][C--] Lg Frigate Hull Suite","MaxSz":25,"Wt":5,"Build Time":"4/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1.14,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.9,"E-Mod":0.9,"T-Mod":0.9,"SR-Mod":1,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":-3,"Weight Class":2,"Size Class":1,"Name":"[T-3] Sm Cruiser Hull Suite","MaxSz":15,"Wt":"","Build Time":"2/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":0.94,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":2230,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":-3,"Weight Class":2,"Size Class":2,"Name":"[T-3][C-] Md Cruiser Hull Suite","MaxSz":20,"Wt":5,"Build Time":"3/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":0.96,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.95,"E-Mod":0.95,"T-Mod":0.95,"SR-Mod":1,"Year Available (SF)":2230,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":-3,"Weight Class":2,"Size Class":3,"Name":"[T-3][C--] Lg Cruiser Hull Suite","MaxSz":25,"Wt":10,"Build Time":"5/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":0.98,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.9,"E-Mod":0.9,"T-Mod":0.9,"SR-Mod":1,"Year Available (SF)":2230,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":-2,"Weight Class":2,"Size Class":1,"Name":"[T-2] Sm Cruiser Hull Suite","MaxSz":15,"Wt":"","Build Time":"2/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":0.95,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":-2,"Weight Class":2,"Size Class":2,"Name":"[T-2][C-] Md Cruiser Hull Suite","MaxSz":20,"Wt":5,"Build Time":"3/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":0.98,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.95,"E-Mod":0.95,"T-Mod":0.95,"SR-Mod":1,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":-2,"Weight Class":2,"Size Class":3,"Name":"[T-2][C--] Lg Cruiser Hull Suite","MaxSz":25,"Wt":10,"Build Time":"5/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.9,"E-Mod":0.9,"T-Mod":0.9,"SR-Mod":1,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":-1,"Weight Class":2,"Size Class":1,"Name":"[T-1] Sm Cruiser Hull Suite","MaxSz":15,"Wt":"","Build Time":"2/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":0.96,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":-1,"Weight Class":2,"Size Class":2,"Name":"[T-1][C-] Md Cruiser Hull Suite","MaxSz":20,"Wt":5,"Build Time":"3/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.95,"E-Mod":0.95,"T-Mod":0.95,"SR-Mod":1,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":-1,"Weight Class":2,"Size Class":3,"Name":"[T-1][C--] Lg Cruiser Hull Suite","MaxSz":25,"Wt":10,"Build Time":"5/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1.02,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.9,"E-Mod":0.9,"T-Mod":0.9,"SR-Mod":1,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":0,"Weight Class":2,"Size Class":1,"Name":"[T0] Sm Cruiser Hull Suite","MaxSz":15,"Wt":"","Build Time":"2/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":0.97,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":0,"Weight Class":2,"Size Class":2,"Name":"[T0][C-] Md Cruiser Hull Suite","MaxSz":20,"Wt":5,"Build Time":"3/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1.02,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.95,"E-Mod":0.95,"T-Mod":0.95,"SR-Mod":1,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":0,"Weight Class":2,"Size Class":3,"Name":"[T0][C--] Lg Cruiser Hull Suite","MaxSz":25,"Wt":10,"Build Time":"5/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1.05,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.9,"E-Mod":0.9,"T-Mod":0.9,"SR-Mod":1,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":1,"Weight Class":2,"Size Class":1,"Name":"[T1] Sm Cruiser Hull Suite","MaxSz":15,"Wt":"","Build Time":"2/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":0.98,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":2307,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":1,"Weight Class":2,"Size Class":2,"Name":"[T1][C-] Md Cruiser Hull Suite","MaxSz":20,"Wt":5,"Build Time":"3/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1.04,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.95,"E-Mod":0.95,"T-Mod":0.95,"SR-Mod":1,"Year Available (SF)":2307,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":1,"Weight Class":2,"Size Class":3,"Name":"[T1][C--] Lg Cruiser Hull Suite","MaxSz":25,"Wt":10,"Build Time":"5/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1.08,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.9,"E-Mod":0.9,"T-Mod":0.9,"SR-Mod":1,"Year Available (SF)":2307,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":2,"Weight Class":2,"Size Class":1,"Name":"[T2] Sm Cruiser Hull Suite","MaxSz":15,"Wt":"","Build Time":"2/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":0.99,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":2,"Weight Class":2,"Size Class":2,"Name":"[T2][C-] Md Cruiser Hull Suite","MaxSz":20,"Wt":5,"Build Time":"3/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1.06,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.95,"E-Mod":0.95,"T-Mod":0.95,"SR-Mod":1,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":2,"Weight Class":2,"Size Class":3,"Name":"[T2][C--] Lg Cruiser Hull Suite","MaxSz":25,"Wt":10,"Build Time":"5/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1.11,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.9,"E-Mod":0.9,"T-Mod":0.9,"SR-Mod":1,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":3,"Weight Class":2,"Size Class":1,"Name":"[T3] Sm Cruiser Hull Suite","MaxSz":15,"Wt":"","Build Time":"2/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":3,"Weight Class":2,"Size Class":2,"Name":"[T3][C-] Md Cruiser Hull Suite","MaxSz":20,"Wt":5,"Build Time":"3/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1.08,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.95,"E-Mod":0.95,"T-Mod":0.95,"SR-Mod":1,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":3,"Weight Class":2,"Size Class":3,"Name":"[T3][C--] Lg Cruiser Hull Suite","MaxSz":25,"Wt":10,"Build Time":"5/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1.14,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.9,"E-Mod":0.9,"T-Mod":0.9,"SR-Mod":1,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":-3,"Weight Class":3,"Size Class":1,"Name":"[T-3] Sm Explorer Hull Suite","MaxSz":10,"Wt":"","Build Time":"2/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":0.94,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":0.95,"T-Mod":0.95,"SR-Mod":1,"Year Available (SF)":2230,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":-3,"Weight Class":3,"Size Class":2,"Name":"[T-3][C-] Md Explorer Hull Suite","MaxSz":15,"Wt":5,"Build Time":"4/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":0.96,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.95,"E-Mod":0.9,"T-Mod":0.9,"SR-Mod":1,"Year Available (SF)":2230,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":-3,"Weight Class":3,"Size Class":3,"Name":"[T-3][C--] Lg Explorer Hull Suite","MaxSz":20,"Wt":15,"Build Time":"9/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":0.98,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.9,"E-Mod":0.8,"T-Mod":0.8,"SR-Mod":1,"Year Available (SF)":2230,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":-2,"Weight Class":3,"Size Class":1,"Name":"[T-2] Sm Explorer Hull Suite","MaxSz":10,"Wt":"","Build Time":"2/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":0.95,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":0.95,"T-Mod":0.95,"SR-Mod":1,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":-2,"Weight Class":3,"Size Class":2,"Name":"[T-2][C-] Md Explorer Hull Suite","MaxSz":15,"Wt":5,"Build Time":"4/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":0.98,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.95,"E-Mod":0.9,"T-Mod":0.9,"SR-Mod":1,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":-2,"Weight Class":3,"Size Class":3,"Name":"[T-2][C--] Lg Explorer Hull Suite","MaxSz":20,"Wt":15,"Build Time":"9/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.9,"E-Mod":0.8,"T-Mod":0.8,"SR-Mod":1,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":-1,"Weight Class":3,"Size Class":1,"Name":"[T-1] Sm Explorer Hull Suite","MaxSz":10,"Wt":"","Build Time":"2/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":0.96,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":0.95,"T-Mod":0.95,"SR-Mod":1,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":-1,"Weight Class":3,"Size Class":2,"Name":"[T-1][C-] Md Explorer Hull Suite","MaxSz":15,"Wt":5,"Build Time":"4/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.95,"E-Mod":0.9,"T-Mod":0.9,"SR-Mod":1,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":-1,"Weight Class":3,"Size Class":3,"Name":"[T-1][C--] Lg Explorer Hull Suite","MaxSz":20,"Wt":15,"Build Time":"9/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1.02,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.9,"E-Mod":0.8,"T-Mod":0.8,"SR-Mod":1,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":0,"Weight Class":3,"Size Class":1,"Name":"[T0] Sm Explorer Hull Suite","MaxSz":10,"Wt":"","Build Time":"2/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":0.97,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":0.95,"T-Mod":0.95,"SR-Mod":1,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":0,"Weight Class":3,"Size Class":2,"Name":"[T0][C-] Md Explorer Hull Suite","MaxSz":15,"Wt":5,"Build Time":"4/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1.02,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.95,"E-Mod":0.9,"T-Mod":0.9,"SR-Mod":1,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":0,"Weight Class":3,"Size Class":3,"Name":"[T0][C--] Lg Explorer Hull Suite","MaxSz":20,"Wt":15,"Build Time":"9/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1.05,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.9,"E-Mod":0.8,"T-Mod":0.8,"SR-Mod":1,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":1,"Weight Class":3,"Size Class":1,"Name":"[T1] Sm Explorer Hull Suite","MaxSz":10,"Wt":"","Build Time":"2/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":0.98,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":0.95,"T-Mod":0.95,"SR-Mod":1,"Year Available (SF)":2309,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":1,"Weight Class":3,"Size Class":2,"Name":"[T1][C-] Md Explorer Hull Suite","MaxSz":15,"Wt":5,"Build Time":"4/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1.04,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.95,"E-Mod":0.9,"T-Mod":0.9,"SR-Mod":1,"Year Available (SF)":2309,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":1,"Weight Class":3,"Size Class":3,"Name":"[T1][C--] Lg Explorer Hull Suite","MaxSz":20,"Wt":15,"Build Time":"9/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1.08,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.9,"E-Mod":0.8,"T-Mod":0.8,"SR-Mod":1,"Year Available (SF)":2309,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":2,"Weight Class":3,"Size Class":1,"Name":"[T2] Sm Explorer Hull Suite","MaxSz":10,"Wt":"","Build Time":"2/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":0.99,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":0.95,"T-Mod":0.95,"SR-Mod":1,"Year Available (SF)":2313,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":2,"Weight Class":3,"Size Class":2,"Name":"[T2][C-] Md Explorer Hull Suite","MaxSz":15,"Wt":5,"Build Time":"4/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1.06,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.95,"E-Mod":0.9,"T-Mod":0.9,"SR-Mod":1,"Year Available (SF)":2313,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":2,"Weight Class":3,"Size Class":3,"Name":"[T2][C--] Lg Explorer Hull Suite","MaxSz":20,"Wt":15,"Build Time":"9/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1.11,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.9,"E-Mod":0.8,"T-Mod":0.8,"SR-Mod":1,"Year Available (SF)":2313,"Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":3,"Weight Class":3,"Size Class":1,"Name":"[T3] Sm Explorer Hull Suite","MaxSz":10,"Wt":"","Build Time":"2/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":0.95,"T-Mod":0.95,"SR-Mod":1,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":3,"Weight Class":3,"Size Class":2,"Name":"[T3][C-] Md Explorer Hull Suite","MaxSz":15,"Wt":5,"Build Time":"4/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1.08,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.95,"E-Mod":0.9,"T-Mod":0.9,"SR-Mod":1,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":3,"Type":"Hull","Tier":3,"Weight Class":3,"Size Class":3,"Name":"[T3][C--] Lg Explorer Hull Suite","MaxSz":20,"Wt":15,"Build Time":"9/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1.14,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.9,"E-Mod":0.8,"T-Mod":0.8,"SR-Mod":1,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":-3,"Weight Class":1,"Size Class":1,"Name":"[T-3][T--] Sm Frigate Engineering Suite","MaxSz":25,"Wt":"","Build Time":"2/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":0.96,"Core Mod":1,"O-Mod":1,"E-Mod":0.94,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":2230,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":-3,"Weight Class":1,"Size Class":2,"Name":"[T-3][OET-SR-] Md Frigate Engineering Suite","MaxSz":35,"Wt":5,"Build Time":"3/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":0.975,"Core Mod":1,"O-Mod":0.97,"E-Mod":0.97,"T-Mod":0.97,"SR-Mod":0.975,"Year Available (SF)":2230,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":-3,"Weight Class":1,"Size Class":3,"Name":"[T-3][OE--SR--] Lg Frigate Engineering Suite","MaxSz":45,"Wt":10,"Build Time":"6/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":0.99,"Core Mod":1,"O-Mod":0.94,"E-Mod":1,"T-Mod":0.94,"SR-Mod":0.95,"Year Available (SF)":2230,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":-2,"Weight Class":1,"Size Class":1,"Name":"[T-2][T--] Sm Frigate Engineering Suite","MaxSz":25,"Wt":"","Build Time":"2/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":0.97,"Core Mod":1,"O-Mod":1,"E-Mod":0.94,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":-2,"Weight Class":1,"Size Class":2,"Name":"[T-2][OET-SR-] Md Frigate Engineering Suite","MaxSz":35,"Wt":5,"Build Time":"3/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":0.985,"Core Mod":1,"O-Mod":0.97,"E-Mod":0.97,"T-Mod":0.97,"SR-Mod":0.975,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":-2,"Weight Class":1,"Size Class":3,"Name":"[T-2][OE--SR--] Lg Frigate Engineering Suite","MaxSz":45,"Wt":10,"Build Time":"6/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1.01,"Core Mod":1,"O-Mod":0.94,"E-Mod":1,"T-Mod":0.94,"SR-Mod":0.95,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":-1,"Weight Class":1,"Size Class":1,"Name":"[T-1][T--] Sm Frigate Engineering Suite","MaxSz":25,"Wt":"","Build Time":"2/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":0.98,"Core Mod":1,"O-Mod":1,"E-Mod":0.94,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":-1,"Weight Class":1,"Size Class":2,"Name":"[T-1][OET-SR-] Md Frigate Engineering Suite","MaxSz":35,"Wt":5,"Build Time":"3/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.97,"E-Mod":0.97,"T-Mod":0.97,"SR-Mod":0.975,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":-1,"Weight Class":1,"Size Class":3,"Name":"[T-1][OE--SR--] Lg Frigate Engineering Suite","MaxSz":45,"Wt":10,"Build Time":"6/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1.04,"Core Mod":1,"O-Mod":0.94,"E-Mod":1,"T-Mod":0.94,"SR-Mod":0.95,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":0,"Weight Class":1,"Size Class":1,"Name":"[T0][T--] Sm Frigate Engineering Suite","MaxSz":25,"Wt":"","Build Time":"2/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":0.99,"Core Mod":1,"O-Mod":1,"E-Mod":0.92,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":0,"Weight Class":1,"Size Class":2,"Name":"[T0][OET-SR-] Md Frigate Engineering Suite","MaxSz":35,"Wt":5,"Build Time":"3/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1.02,"Core Mod":1,"O-Mod":0.96,"E-Mod":0.96,"T-Mod":0.96,"SR-Mod":0.975,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":0,"Weight Class":1,"Size Class":3,"Name":"[T0][OE--SR--] Lg Frigate Engineering Suite","MaxSz":45,"Wt":10,"Build Time":"6/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1.07,"Core Mod":1,"O-Mod":0.92,"E-Mod":1,"T-Mod":0.92,"SR-Mod":0.95,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":1,"Weight Class":1,"Size Class":1,"Name":"[T1][T--] Sm Frigate Engineering Suite","MaxSz":25,"Wt":"","Build Time":"2/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":0.9,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":2308,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":1,"Weight Class":1,"Size Class":2,"Name":"[T1][OET-SR-] Md Frigate Engineering Suite","MaxSz":35,"Wt":5,"Build Time":"3/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1.04,"Core Mod":1,"O-Mod":0.95,"E-Mod":0.95,"T-Mod":0.95,"SR-Mod":0.975,"Year Available (SF)":2308,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":1,"Weight Class":1,"Size Class":3,"Name":"[T1][OE--SR--] Lg Frigate Engineering Suite","MaxSz":45,"Wt":10,"Build Time":"6/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1.1,"Core Mod":1,"O-Mod":0.9,"E-Mod":1,"T-Mod":0.9,"SR-Mod":0.95,"Year Available (SF)":2308,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":2,"Weight Class":1,"Size Class":1,"Name":"[T2][T--] Sm Frigate Engineering Suite","MaxSz":25,"Wt":"","Build Time":"2/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1.01,"Core Mod":1,"O-Mod":1,"E-Mod":0.88,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":2315,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":2,"Weight Class":1,"Size Class":2,"Name":"[T2][OET-SR-] Md Frigate Engineering Suite","MaxSz":35,"Wt":5,"Build Time":"3/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1.06,"Core Mod":1,"O-Mod":0.94,"E-Mod":0.94,"T-Mod":0.94,"SR-Mod":0.975,"Year Available (SF)":2315,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":2,"Weight Class":1,"Size Class":3,"Name":"[T2][OE--SR--] Lg Frigate Engineering Suite","MaxSz":45,"Wt":10,"Build Time":"6/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1.13,"Core Mod":1,"O-Mod":0.88,"E-Mod":1,"T-Mod":0.88,"SR-Mod":0.95,"Year Available (SF)":2315,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":3,"Weight Class":1,"Size Class":1,"Name":"[T3][T--] Sm Frigate Engineering Suite","MaxSz":25,"Wt":"","Build Time":"2/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1.02,"Core Mod":1,"O-Mod":1,"E-Mod":0.86,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":3,"Weight Class":1,"Size Class":2,"Name":"[T3][OET-SR-] Md Frigate Engineering Suite","MaxSz":35,"Wt":5,"Build Time":"3/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1.08,"Core Mod":1,"O-Mod":0.93,"E-Mod":0.93,"T-Mod":0.93,"SR-Mod":0.975,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":3,"Weight Class":1,"Size Class":3,"Name":"[T3][OE--SR--] Lg Frigate Engineering Suite","MaxSz":45,"Wt":10,"Build Time":"6/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1.16,"Core Mod":1,"O-Mod":0.86,"E-Mod":1,"T-Mod":0.86,"SR-Mod":0.95,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":-3,"Weight Class":2,"Size Class":1,"Name":"[T-3][SR--] Sm Cruiser Engineering Suite","MaxSz":20,"Wt":"","Build Time":"3/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":0.96,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":1,"SR-Mod":0.95,"Year Available (SF)":2230,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":-3,"Weight Class":2,"Size Class":2,"Name":"[T-3][C-SR-] Md Cruiser Engineering Suite","MaxSz":25,"Wt":10,"Build Time":"5/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":0.97,"Core Mod":1,"O-Mod":0.97,"E-Mod":0.97,"T-Mod":0.97,"SR-Mod":0.975,"Year Available (SF)":2230,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":-3,"Weight Class":2,"Size Class":3,"Name":"[T-3][C--] Lg Cruiser Engineering Suite","MaxSz":30,"Wt":20,"Build Time":"8/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":0.98,"Core Mod":1,"O-Mod":0.92,"E-Mod":0.92,"T-Mod":0.92,"SR-Mod":1,"Year Available (SF)":2230,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":-2,"Weight Class":2,"Size Class":1,"Name":"[T-2][SR--] Sm Cruiser Engineering Suite","MaxSz":20,"Wt":"","Build Time":"3/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":0.97,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":1,"SR-Mod":0.95,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":-2,"Weight Class":2,"Size Class":2,"Name":"[T-2][C-SR-] Md Cruiser Engineering Suite","MaxSz":25,"Wt":10,"Build Time":"5/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":0.985,"Core Mod":1,"O-Mod":0.97,"E-Mod":0.97,"T-Mod":0.97,"SR-Mod":0.975,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":-2,"Weight Class":2,"Size Class":3,"Name":"[T-2][C--] Lg Cruiser Engineering Suite","MaxSz":30,"Wt":20,"Build Time":"8/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1.01,"Core Mod":1,"O-Mod":0.92,"E-Mod":0.92,"T-Mod":0.92,"SR-Mod":1,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":-1,"Weight Class":2,"Size Class":1,"Name":"[T-1][SR--] Sm Cruiser Engineering Suite","MaxSz":20,"Wt":"","Build Time":"3/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":0.98,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":1,"SR-Mod":0.95,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":-1,"Weight Class":2,"Size Class":2,"Name":"[T-1][C-SR-] Md Cruiser Engineering Suite","MaxSz":25,"Wt":10,"Build Time":"5/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.97,"E-Mod":0.97,"T-Mod":0.97,"SR-Mod":0.975,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":-1,"Weight Class":2,"Size Class":3,"Name":"[T-1][C--] Lg Cruiser Engineering Suite","MaxSz":30,"Wt":20,"Build Time":"8/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1.04,"Core Mod":1,"O-Mod":0.92,"E-Mod":0.92,"T-Mod":0.92,"SR-Mod":1,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":0,"Weight Class":2,"Size Class":1,"Name":"[T0][SR--] Sm Cruiser Engineering Suite","MaxSz":20,"Wt":"","Build Time":"3/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":0.99,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":1,"SR-Mod":0.95,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":0,"Weight Class":2,"Size Class":2,"Name":"[T0][C-SR-] Md Cruiser Engineering Suite","MaxSz":25,"Wt":10,"Build Time":"5/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1.02,"Core Mod":1,"O-Mod":0.96,"E-Mod":0.96,"T-Mod":0.96,"SR-Mod":0.975,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":0,"Weight Class":2,"Size Class":3,"Name":"[T0][C--] Lg Cruiser Engineering Suite","MaxSz":30,"Wt":20,"Build Time":"8/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1.07,"Core Mod":1,"O-Mod":0.91,"E-Mod":0.91,"T-Mod":0.91,"SR-Mod":1,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":1,"Weight Class":2,"Size Class":1,"Name":"[T1][SR--] Sm Cruiser Engineering Suite","MaxSz":20,"Wt":"","Build Time":"3/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":1,"SR-Mod":0.95,"Year Available (SF)":2307,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":1,"Weight Class":2,"Size Class":2,"Name":"[T1][C-SR-] Md Cruiser Engineering Suite","MaxSz":25,"Wt":10,"Build Time":"5/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1.04,"Core Mod":1,"O-Mod":0.95,"E-Mod":0.95,"T-Mod":0.95,"SR-Mod":0.975,"Year Available (SF)":2307,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":1,"Weight Class":2,"Size Class":3,"Name":"[T1][C--] Lg Cruiser Engineering Suite","MaxSz":30,"Wt":20,"Build Time":"8/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1.1,"Core Mod":1,"O-Mod":0.9,"E-Mod":0.9,"T-Mod":0.9,"SR-Mod":1,"Year Available (SF)":2307,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":2,"Weight Class":2,"Size Class":1,"Name":"[T2][SR--] Sm Cruiser Engineering Suite","MaxSz":20,"Wt":"","Build Time":"3/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1.01,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":1,"SR-Mod":0.95,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":2,"Weight Class":2,"Size Class":2,"Name":"[T2][C-SR-] Md Cruiser Engineering Suite","MaxSz":25,"Wt":10,"Build Time":"5/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1.06,"Core Mod":1,"O-Mod":0.94,"E-Mod":0.94,"T-Mod":0.94,"SR-Mod":0.975,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":2,"Weight Class":2,"Size Class":3,"Name":"[T2][C--] Lg Cruiser Engineering Suite","MaxSz":30,"Wt":20,"Build Time":"8/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1.13,"Core Mod":1,"O-Mod":0.89,"E-Mod":0.89,"T-Mod":0.89,"SR-Mod":1,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":3,"Weight Class":2,"Size Class":1,"Name":"[T3][SR--] Sm Cruiser Engineering Suite","MaxSz":20,"Wt":"","Build Time":"3/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1.02,"Core Mod":1,"O-Mod":1,"E-Mod":1,"T-Mod":1,"SR-Mod":0.95,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":3,"Weight Class":2,"Size Class":2,"Name":"[T3][C-SR-] Md Cruiser Engineering Suite","MaxSz":25,"Wt":10,"Build Time":"5/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1.08,"Core Mod":1,"O-Mod":0.93,"E-Mod":0.93,"T-Mod":0.93,"SR-Mod":0.975,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":3,"Weight Class":2,"Size Class":3,"Name":"[T3][C--] Lg Cruiser Engineering Suite","MaxSz":30,"Wt":20,"Build Time":"8/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1.16,"Core Mod":1,"O-Mod":0.88,"E-Mod":0.88,"T-Mod":0.88,"SR-Mod":1,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":-3,"Weight Class":3,"Size Class":1,"Name":"[T-3][SR--] Sm Explorer Engineering Suite","MaxSz":15,"Wt":"","Build Time":"4/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":0.96,"Core Mod":1,"O-Mod":1.02,"E-Mod":0.97,"T-Mod":0.97,"SR-Mod":0.95,"Year Available (SF)":2230,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":-3,"Weight Class":3,"Size Class":2,"Name":"[T-3][C-SR-] Md Explorer Engineering Suite","MaxSz":20,"Wt":10,"Build Time":"6/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":0.97,"Core Mod":1,"O-Mod":0.97,"E-Mod":0.92,"T-Mod":0.92,"SR-Mod":0.975,"Year Available (SF)":2230,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":-3,"Weight Class":3,"Size Class":3,"Name":"[T-3][C--] Lg Explorer Engineering Suite","MaxSz":25,"Wt":30,"Build Time":"10/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":0.98,"Core Mod":1,"O-Mod":0.92,"E-Mod":0.82,"T-Mod":0.82,"SR-Mod":1,"Year Available (SF)":2230,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":-2,"Weight Class":3,"Size Class":1,"Name":"[T-2][SR--] Sm Explorer Engineering Suite","MaxSz":15,"Wt":"","Build Time":"4/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":0.97,"Core Mod":1,"O-Mod":1.02,"E-Mod":0.97,"T-Mod":0.97,"SR-Mod":0.95,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":-2,"Weight Class":3,"Size Class":2,"Name":"[T-2][C-SR-] Md Explorer Engineering Suite","MaxSz":20,"Wt":10,"Build Time":"6/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":0.985,"Core Mod":1,"O-Mod":0.97,"E-Mod":0.92,"T-Mod":0.92,"SR-Mod":0.975,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":-2,"Weight Class":3,"Size Class":3,"Name":"[T-2][C--] Lg Explorer Engineering Suite","MaxSz":25,"Wt":30,"Build Time":"10/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1.01,"Core Mod":1,"O-Mod":0.92,"E-Mod":0.82,"T-Mod":0.82,"SR-Mod":1,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":-1,"Weight Class":3,"Size Class":1,"Name":"[T-1][SR--] Sm Explorer Engineering Suite","MaxSz":15,"Wt":"","Build Time":"4/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":0.98,"Core Mod":1,"O-Mod":1.02,"E-Mod":0.97,"T-Mod":0.97,"SR-Mod":0.95,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":-1,"Weight Class":3,"Size Class":2,"Name":"[T-1][C-SR-] Md Explorer Engineering Suite","MaxSz":20,"Wt":10,"Build Time":"6/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":0.97,"E-Mod":0.92,"T-Mod":0.92,"SR-Mod":0.975,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":-1,"Weight Class":3,"Size Class":3,"Name":"[T-1][C--] Lg Explorer Engineering Suite","MaxSz":25,"Wt":30,"Build Time":"10/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1.04,"Core Mod":1,"O-Mod":0.92,"E-Mod":0.82,"T-Mod":0.82,"SR-Mod":1,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":0,"Weight Class":3,"Size Class":1,"Name":"[T0][SR--] Sm Explorer Engineering Suite","MaxSz":15,"Wt":"","Build Time":"4/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":0.99,"Core Mod":1,"O-Mod":1.01,"E-Mod":0.96,"T-Mod":0.96,"SR-Mod":0.95,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":0,"Weight Class":3,"Size Class":2,"Name":"[T0][C-SR-] Md Explorer Engineering Suite","MaxSz":20,"Wt":10,"Build Time":"6/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1.02,"Core Mod":1,"O-Mod":0.96,"E-Mod":0.91,"T-Mod":0.91,"SR-Mod":0.975,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":0,"Weight Class":3,"Size Class":3,"Name":"[T0][C--] Lg Explorer Engineering Suite","MaxSz":25,"Wt":30,"Build Time":"10/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1.07,"Core Mod":1,"O-Mod":0.91,"E-Mod":0.81,"T-Mod":0.81,"SR-Mod":1,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":1,"Weight Class":3,"Size Class":1,"Name":"[T1][SR--] Sm Explorer Engineering Suite","MaxSz":15,"Wt":"","Build Time":"4/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1,"O-Mod":1,"E-Mod":0.95,"T-Mod":0.95,"SR-Mod":0.95,"Year Available (SF)":2309,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":1,"Weight Class":3,"Size Class":2,"Name":"[T1][C-SR-] Md Explorer Engineering Suite","MaxSz":20,"Wt":10,"Build Time":"6/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1.04,"Core Mod":1,"O-Mod":0.95,"E-Mod":0.9,"T-Mod":0.9,"SR-Mod":0.975,"Year Available (SF)":2309,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":1,"Weight Class":3,"Size Class":3,"Name":"[T1][C--] Lg Explorer Engineering Suite","MaxSz":25,"Wt":30,"Build Time":"10/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1.1,"Core Mod":1,"O-Mod":0.9,"E-Mod":0.8,"T-Mod":0.8,"SR-Mod":1,"Year Available (SF)":2309,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":2,"Weight Class":3,"Size Class":1,"Name":"[T2][SR--] Sm Explorer Engineering Suite","MaxSz":15,"Wt":"","Build Time":"4/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1.01,"Core Mod":1,"O-Mod":0.99,"E-Mod":0.94,"T-Mod":0.94,"SR-Mod":0.95,"Year Available (SF)":2313,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":2,"Weight Class":3,"Size Class":2,"Name":"[T2][C-SR-] Md Explorer Engineering Suite","MaxSz":20,"Wt":10,"Build Time":"6/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1.06,"Core Mod":1,"O-Mod":0.94,"E-Mod":0.89,"T-Mod":0.89,"SR-Mod":0.975,"Year Available (SF)":2313,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":2,"Weight Class":3,"Size Class":3,"Name":"[T2][C--] Lg Explorer Engineering Suite","MaxSz":25,"Wt":30,"Build Time":"10/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1.13,"Core Mod":1,"O-Mod":0.89,"E-Mod":0.79,"T-Mod":0.79,"SR-Mod":1,"Year Available (SF)":2313,"Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":3,"Weight Class":3,"Size Class":1,"Name":"[T3][SR--] Sm Explorer Engineering Suite","MaxSz":15,"Wt":"","Build Time":"4/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1.02,"Core Mod":1,"O-Mod":0.98,"E-Mod":0.93,"T-Mod":0.93,"SR-Mod":0.95,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":3,"Weight Class":3,"Size Class":2,"Name":"[T3][C-SR-] Md Explorer Engineering Suite","MaxSz":20,"Wt":10,"Build Time":"6/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1.08,"Core Mod":1,"O-Mod":0.93,"E-Mod":0.88,"T-Mod":0.88,"SR-Mod":0.975,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":4,"Type":"Engineering","Tier":3,"Weight Class":3,"Size Class":3,"Name":"[T3][C--] Lg Explorer Engineering Suite","MaxSz":25,"Wt":30,"Build Time":"10/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1.16,"Core Mod":1,"O-Mod":0.88,"E-Mod":0.78,"T-Mod":0.78,"SR-Mod":1,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":-3,"Weight Class":1,"Size Class":1,"Name":"[T-3][C+SR-] Sm Frigate Warp Core Suite","MaxSz":20,"Wt":"","Build Time":"2/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.04,"O-Mod":1.13,"E-Mod":1.13,"T-Mod":1.13,"SR-Mod":0.88,"Year Available (SF)":2230,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":-3,"Weight Class":1,"Size Class":2,"Name":"[T-3] Md Frigate Warp Core Suite","MaxSz":25,"Wt":"","Build Time":"3/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.05,"O-Mod":1.02,"E-Mod":1.02,"T-Mod":1.02,"SR-Mod":0.92,"Year Available (SF)":2230,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":-3,"Weight Class":1,"Size Class":3,"Name":"[T-3][C-SR+] Lg Frigate Warp Core Suite","MaxSz":30,"Wt":5,"Build Time":"6/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.06,"O-Mod":0.94,"E-Mod":0.94,"T-Mod":0.94,"SR-Mod":0.97,"Year Available (SF)":2230,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":-2,"Weight Class":1,"Size Class":1,"Name":"[T-2][C+SR-] Sm Frigate Warp Core Suite","MaxSz":20,"Wt":"","Build Time":"2/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.05,"O-Mod":1.13,"E-Mod":1.13,"T-Mod":1.13,"SR-Mod":0.89,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":-2,"Weight Class":1,"Size Class":2,"Name":"[T-2] Md Frigate Warp Core Suite","MaxSz":25,"Wt":"","Build Time":"3/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.06,"O-Mod":1.02,"E-Mod":1.02,"T-Mod":1.02,"SR-Mod":0.94,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":-2,"Weight Class":1,"Size Class":3,"Name":"[T-2][C-SR+] Lg Frigate Warp Core Suite","MaxSz":30,"Wt":5,"Build Time":"6/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.07,"O-Mod":0.93,"E-Mod":0.93,"T-Mod":0.93,"SR-Mod":0.98,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":-1,"Weight Class":1,"Size Class":1,"Name":"[T-1][C+SR-] Sm Frigate Warp Core Suite","MaxSz":20,"Wt":"","Build Time":"2/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.06,"O-Mod":1.12,"E-Mod":1.12,"T-Mod":1.12,"SR-Mod":0.91,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":-1,"Weight Class":1,"Size Class":2,"Name":"[T-1] Md Frigate Warp Core Suite","MaxSz":25,"Wt":"","Build Time":"3/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.08,"O-Mod":1.02,"E-Mod":1.02,"T-Mod":1.02,"SR-Mod":0.96,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":-1,"Weight Class":1,"Size Class":3,"Name":"[T-1][C-SR+] Lg Frigate Warp Core Suite","MaxSz":30,"Wt":5,"Build Time":"6/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.1,"O-Mod":0.92,"E-Mod":0.92,"T-Mod":0.92,"SR-Mod":0.99,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":0,"Weight Class":1,"Size Class":1,"Name":"[T0][C+SR-] Sm Frigate Warp Core Suite","MaxSz":20,"Wt":"","Build Time":"2/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.07,"O-Mod":1.11,"E-Mod":1.11,"T-Mod":1.11,"SR-Mod":0.93,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":0,"Weight Class":1,"Size Class":2,"Name":"[T0] Md Frigate Warp Core Suite","MaxSz":25,"Wt":"","Build Time":"3/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.1,"O-Mod":1.01,"E-Mod":1.01,"T-Mod":1.01,"SR-Mod":0.98,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":0,"Weight Class":1,"Size Class":3,"Name":"[T0][C-SR+] Lg Frigate Warp Core Suite","MaxSz":30,"Wt":5,"Build Time":"6/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.13,"O-Mod":0.91,"E-Mod":0.91,"T-Mod":0.91,"SR-Mod":1.03,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":1,"Weight Class":1,"Size Class":1,"Name":"[T1][C+SR-] Sm Frigate Warp Core Suite","MaxSz":20,"Wt":"","Build Time":"2/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.08,"O-Mod":1.1,"E-Mod":1.1,"T-Mod":1.1,"SR-Mod":0.95,"Year Available (SF)":2308,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":1,"Weight Class":1,"Size Class":2,"Name":"[T1] Md Frigate Warp Core Suite","MaxSz":25,"Wt":"","Build Time":"3/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.12,"O-Mod":1,"E-Mod":1,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":2308,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":1,"Weight Class":1,"Size Class":3,"Name":"[T1][C-SR+] Lg Frigate Warp Core Suite","MaxSz":30,"Wt":5,"Build Time":"6/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.16,"O-Mod":0.9,"E-Mod":0.9,"T-Mod":0.9,"SR-Mod":1.05,"Year Available (SF)":2308,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":2,"Weight Class":1,"Size Class":1,"Name":"[T2][C+SR-] Sm Frigate Warp Core Suite","MaxSz":20,"Wt":"","Build Time":"2/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.09,"O-Mod":1.09,"E-Mod":1.09,"T-Mod":1.09,"SR-Mod":0.94,"Year Available (SF)":2315,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":2,"Weight Class":1,"Size Class":2,"Name":"[T2] Md Frigate Warp Core Suite","MaxSz":25,"Wt":"","Build Time":"3/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.14,"O-Mod":0.99,"E-Mod":0.99,"T-Mod":0.99,"SR-Mod":0.99,"Year Available (SF)":2315,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":2,"Weight Class":1,"Size Class":3,"Name":"[T2][C-SR+] Lg Frigate Warp Core Suite","MaxSz":30,"Wt":5,"Build Time":"6/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.19,"O-Mod":0.89,"E-Mod":0.89,"T-Mod":0.89,"SR-Mod":1.04,"Year Available (SF)":2315,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":3,"Weight Class":1,"Size Class":1,"Name":"[T3][C+SR-] Sm Frigate Warp Core Suite","MaxSz":20,"Wt":"","Build Time":"2/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.1,"O-Mod":1.08,"E-Mod":1.08,"T-Mod":1.08,"SR-Mod":0.93,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":3,"Weight Class":1,"Size Class":2,"Name":"[T3] Md Frigate Warp Core Suite","MaxSz":25,"Wt":"","Build Time":"3/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.16,"O-Mod":0.98,"E-Mod":0.98,"T-Mod":0.98,"SR-Mod":0.98,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":3,"Weight Class":1,"Size Class":3,"Name":"[T3][C-SR+] Lg Frigate Warp Core Suite","MaxSz":30,"Wt":5,"Build Time":"6/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.22,"O-Mod":0.88,"E-Mod":0.88,"T-Mod":0.88,"SR-Mod":1.03,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":-3,"Weight Class":2,"Size Class":1,"Name":"[T-3][C+SR-] Sm Cruiser Warp Core Suite","MaxSz":15,"Wt":"","Build Time":"3/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.04,"O-Mod":1.13,"E-Mod":1.13,"T-Mod":1.13,"SR-Mod":0.88,"Year Available (SF)":2230,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":-3,"Weight Class":2,"Size Class":2,"Name":"[T-3] Md Cruiser Warp Core Suite","MaxSz":20,"Wt":5,"Build Time":"5/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.05,"O-Mod":1.02,"E-Mod":1.02,"T-Mod":1.02,"SR-Mod":0.92,"Year Available (SF)":2230,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":-3,"Weight Class":2,"Size Class":3,"Name":"[T-3][C-SR+] Lg Cruiser Warp Core Suite","MaxSz":25,"Wt":10,"Build Time":"8/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.06,"O-Mod":0.94,"E-Mod":0.94,"T-Mod":0.94,"SR-Mod":0.97,"Year Available (SF)":2230,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":-2,"Weight Class":2,"Size Class":1,"Name":"[T-2][C+SR-] Sm Cruiser Warp Core Suite","MaxSz":15,"Wt":"","Build Time":"3/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.05,"O-Mod":1.13,"E-Mod":1.13,"T-Mod":1.13,"SR-Mod":0.89,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":-2,"Weight Class":2,"Size Class":2,"Name":"[T-2] Md Cruiser Warp Core Suite","MaxSz":20,"Wt":5,"Build Time":"5/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.06,"O-Mod":1.02,"E-Mod":1.02,"T-Mod":1.02,"SR-Mod":0.94,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":-2,"Weight Class":2,"Size Class":3,"Name":"[T-2][C-SR+] Lg Cruiser Warp Core Suite","MaxSz":25,"Wt":10,"Build Time":"8/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.07,"O-Mod":0.93,"E-Mod":0.93,"T-Mod":0.93,"SR-Mod":0.98,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":-1,"Weight Class":2,"Size Class":1,"Name":"[T-1][C+SR-] Sm Cruiser Warp Core Suite","MaxSz":15,"Wt":"","Build Time":"3/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.06,"O-Mod":1.12,"E-Mod":1.12,"T-Mod":1.12,"SR-Mod":0.91,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":-1,"Weight Class":2,"Size Class":2,"Name":"[T-1] Md Cruiser Warp Core Suite","MaxSz":20,"Wt":5,"Build Time":"5/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.08,"O-Mod":1.02,"E-Mod":1.02,"T-Mod":1.02,"SR-Mod":0.96,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":-1,"Weight Class":2,"Size Class":3,"Name":"[T-1][C-SR+] Lg Cruiser Warp Core Suite","MaxSz":25,"Wt":10,"Build Time":"8/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.1,"O-Mod":0.92,"E-Mod":0.92,"T-Mod":0.92,"SR-Mod":0.99,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":0,"Weight Class":2,"Size Class":1,"Name":"[T0][C+SR-] Sm Cruiser Warp Core Suite","MaxSz":15,"Wt":"","Build Time":"3/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.07,"O-Mod":1.11,"E-Mod":1.11,"T-Mod":1.11,"SR-Mod":0.93,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":0,"Weight Class":2,"Size Class":2,"Name":"[T0] Md Cruiser Warp Core Suite","MaxSz":20,"Wt":5,"Build Time":"5/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.1,"O-Mod":1.01,"E-Mod":1.01,"T-Mod":1.01,"SR-Mod":0.98,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":0,"Weight Class":2,"Size Class":3,"Name":"[T0][C-SR+] Lg Cruiser Warp Core Suite","MaxSz":25,"Wt":10,"Build Time":"8/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.13,"O-Mod":0.91,"E-Mod":0.91,"T-Mod":0.91,"SR-Mod":1.03,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":1,"Weight Class":2,"Size Class":1,"Name":"[T1][C+SR-] Sm Cruiser Warp Core Suite","MaxSz":15,"Wt":"","Build Time":"3/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.08,"O-Mod":1.1,"E-Mod":1.1,"T-Mod":1.1,"SR-Mod":0.95,"Year Available (SF)":2307,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":1,"Weight Class":2,"Size Class":2,"Name":"[T1] Md Cruiser Warp Core Suite","MaxSz":20,"Wt":5,"Build Time":"5/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.12,"O-Mod":1,"E-Mod":1,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":2307,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":1,"Weight Class":2,"Size Class":3,"Name":"[T1][C-SR+] Lg Cruiser Warp Core Suite","MaxSz":25,"Wt":10,"Build Time":"8/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.16,"O-Mod":0.9,"E-Mod":0.9,"T-Mod":0.9,"SR-Mod":1.05,"Year Available (SF)":2307,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":2,"Weight Class":2,"Size Class":1,"Name":"[T2][C+SR-] Sm Cruiser Warp Core Suite","MaxSz":15,"Wt":"","Build Time":"3/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.09,"O-Mod":1.09,"E-Mod":1.09,"T-Mod":1.09,"SR-Mod":0.94,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":2,"Weight Class":2,"Size Class":2,"Name":"[T2] Md Cruiser Warp Core Suite","MaxSz":20,"Wt":5,"Build Time":"5/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.14,"O-Mod":0.99,"E-Mod":0.99,"T-Mod":0.99,"SR-Mod":0.99,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":2,"Weight Class":2,"Size Class":3,"Name":"[T2][C-SR+] Lg Cruiser Warp Core Suite","MaxSz":25,"Wt":10,"Build Time":"8/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.19,"O-Mod":0.89,"E-Mod":0.89,"T-Mod":0.89,"SR-Mod":1.04,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":3,"Weight Class":2,"Size Class":1,"Name":"[T3][C+SR-] Sm Cruiser Warp Core Suite","MaxSz":15,"Wt":"","Build Time":"3/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.1,"O-Mod":1.08,"E-Mod":1.08,"T-Mod":1.08,"SR-Mod":0.93,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":3,"Weight Class":2,"Size Class":2,"Name":"[T3] Md Cruiser Warp Core Suite","MaxSz":20,"Wt":5,"Build Time":"5/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.16,"O-Mod":0.98,"E-Mod":0.98,"T-Mod":0.98,"SR-Mod":0.98,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":3,"Weight Class":2,"Size Class":3,"Name":"[T3][C-SR+] Lg Cruiser Warp Core Suite","MaxSz":25,"Wt":10,"Build Time":"8/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.22,"O-Mod":0.88,"E-Mod":0.88,"T-Mod":0.88,"SR-Mod":1.03,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":-3,"Weight Class":3,"Size Class":1,"Name":"[T-3][C+SR-] Sm Explorer Warp Core Suite","MaxSz":15,"Wt":"","Build Time":"4/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.04,"O-Mod":1.13,"E-Mod":1.13,"T-Mod":1.13,"SR-Mod":0.88,"Year Available (SF)":2230,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":-3,"Weight Class":3,"Size Class":2,"Name":"[T-3] Md Explorer Warp Core Suite","MaxSz":20,"Wt":5,"Build Time":"6/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.05,"O-Mod":1.02,"E-Mod":1.02,"T-Mod":1.02,"SR-Mod":0.92,"Year Available (SF)":2230,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":-3,"Weight Class":3,"Size Class":3,"Name":"[T-3][C-SR+] Lg Explorer Warp Core Suite","MaxSz":25,"Wt":15,"Build Time":"10/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.06,"O-Mod":0.94,"E-Mod":0.94,"T-Mod":0.94,"SR-Mod":0.97,"Year Available (SF)":2230,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":-2,"Weight Class":3,"Size Class":1,"Name":"[T-2][C+SR-] Sm Explorer Warp Core Suite","MaxSz":15,"Wt":"","Build Time":"4/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.05,"O-Mod":1.13,"E-Mod":1.13,"T-Mod":1.13,"SR-Mod":0.89,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":-2,"Weight Class":3,"Size Class":2,"Name":"[T-2] Md Explorer Warp Core Suite","MaxSz":20,"Wt":5,"Build Time":"6/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.06,"O-Mod":1.02,"E-Mod":1.02,"T-Mod":1.02,"SR-Mod":0.94,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":-2,"Weight Class":3,"Size Class":3,"Name":"[T-2][C-SR+] Lg Explorer Warp Core Suite","MaxSz":25,"Wt":15,"Build Time":"10/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.07,"O-Mod":0.93,"E-Mod":0.93,"T-Mod":0.93,"SR-Mod":0.98,"Year Available (SF)":2250,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":-1,"Weight Class":3,"Size Class":1,"Name":"[T-1][C+SR-] Sm Explorer Warp Core Suite","MaxSz":15,"Wt":"","Build Time":"4/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.06,"O-Mod":1.12,"E-Mod":1.12,"T-Mod":1.12,"SR-Mod":0.91,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":-1,"Weight Class":3,"Size Class":2,"Name":"[T-1] Md Explorer Warp Core Suite","MaxSz":20,"Wt":5,"Build Time":"6/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.08,"O-Mod":1.02,"E-Mod":1.02,"T-Mod":1.02,"SR-Mod":0.96,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":-1,"Weight Class":3,"Size Class":3,"Name":"[T-1][C-SR+] Lg Explorer Warp Core Suite","MaxSz":25,"Wt":15,"Build Time":"10/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.1,"O-Mod":0.92,"E-Mod":0.92,"T-Mod":0.92,"SR-Mod":0.99,"Year Available (SF)":2270,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":0,"Weight Class":3,"Size Class":1,"Name":"[T0][C+SR-] Sm Explorer Warp Core Suite","MaxSz":15,"Wt":"","Build Time":"4/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.07,"O-Mod":1.11,"E-Mod":1.11,"T-Mod":1.11,"SR-Mod":0.93,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":0,"Weight Class":3,"Size Class":2,"Name":"[T0] Md Explorer Warp Core Suite","MaxSz":20,"Wt":5,"Build Time":"6/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.1,"O-Mod":1.01,"E-Mod":1.01,"T-Mod":1.01,"SR-Mod":0.98,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":0,"Weight Class":3,"Size Class":3,"Name":"[T0][C-SR+] Lg Explorer Warp Core Suite","MaxSz":25,"Wt":15,"Build Time":"10/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.13,"O-Mod":0.91,"E-Mod":0.91,"T-Mod":0.91,"SR-Mod":1.03,"Year Available (SF)":2290,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":1,"Weight Class":3,"Size Class":1,"Name":"[T1][C+SR-] Sm Explorer Warp Core Suite","MaxSz":15,"Wt":"","Build Time":"4/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.08,"O-Mod":1.1,"E-Mod":1.1,"T-Mod":1.1,"SR-Mod":0.95,"Year Available (SF)":2309,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":1,"Weight Class":3,"Size Class":2,"Name":"[T1] Md Explorer Warp Core Suite","MaxSz":20,"Wt":5,"Build Time":"6/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.12,"O-Mod":1,"E-Mod":1,"T-Mod":1,"SR-Mod":1,"Year Available (SF)":2309,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":1,"Weight Class":3,"Size Class":3,"Name":"[T1][C-SR+] Lg Explorer Warp Core Suite","MaxSz":25,"Wt":15,"Build Time":"10/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.16,"O-Mod":0.9,"E-Mod":0.9,"T-Mod":0.9,"SR-Mod":1.05,"Year Available (SF)":2309,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":2,"Weight Class":3,"Size Class":1,"Name":"[T2][C+SR-] Sm Explorer Warp Core Suite","MaxSz":15,"Wt":"","Build Time":"4/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.09,"O-Mod":1.09,"E-Mod":1.09,"T-Mod":1.09,"SR-Mod":0.94,"Year Available (SF)":2313,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":2,"Weight Class":3,"Size Class":2,"Name":"[T2] Md Explorer Warp Core Suite","MaxSz":20,"Wt":5,"Build Time":"6/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.14,"O-Mod":0.99,"E-Mod":0.99,"T-Mod":0.99,"SR-Mod":0.99,"Year Available (SF)":2313,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":2,"Weight Class":3,"Size Class":3,"Name":"[T2][C-SR+] Lg Explorer Warp Core Suite","MaxSz":25,"Wt":15,"Build Time":"10/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.19,"O-Mod":0.89,"E-Mod":0.89,"T-Mod":0.89,"SR-Mod":1.04,"Year Available (SF)":2313,"Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":3,"Weight Class":3,"Size Class":1,"Name":"[T3][C+SR-] Sm Explorer Warp Core Suite","MaxSz":15,"Wt":"","Build Time":"4/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.1,"O-Mod":1.08,"E-Mod":1.08,"T-Mod":1.08,"SR-Mod":0.93,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":3,"Weight Class":3,"Size Class":2,"Name":"[T3] Md Explorer Warp Core Suite","MaxSz":20,"Wt":5,"Build Time":"6/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.16,"O-Mod":0.98,"E-Mod":0.98,"T-Mod":0.98,"SR-Mod":0.98,"Year Available (SF)":"*","Weight Class List":""},{"Type Sort":5,"Type":"Warp Core","Tier":3,"Weight Class":3,"Size Class":3,"Name":"[T3][C-SR+] Lg Explorer Warp Core Suite","MaxSz":25,"Wt":15,"Build Time":"10/12","Tac Mod":1,"Ops Mod":1,"Hull Mod":1,"Eng. Mod":1,"Core Mod":1.22,"O-Mod":0.88,"E-Mod":0.88,"T-Mod":0.88,"SR-Mod":1.03,"Year Available (SF)":"*","Weight Class List":""}]

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(17);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(18);

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(0)))

/***/ }),
/* 8 */
/***/ (function(module, exports) {


class NamedVector {
	constructor(val, shortnames) {
		this.shortnames = shortnames;
		if (typeof val === 'number') {
			this.names.forEach(name => {
				this[name] = val;
			});
		} else {
			this.names.forEach(name => {
				this[name] = val[name] || 0;
			});
		}
	}

	get names() {
		return Object.keys(this.shortnames);
	}

	toFixed(n) {
		return this.names.map(name => {
			return this.shortnames[name].toUpperCase() + '[' + this[name].toFixed(n) + ']';
		}).join(' ');
	}

	toString() {
		return this.names.map(name => {
			return this.shortnames[name].toUpperCase() + this[name].toString();
		}).join(' ');
	}
	static op_add(a, b) {
		return a + b;
	}
	static op_mult(a, b) {
		return a * b;
	}
	static op_div(a, b) {
		return a / b;
	}

	add(other) {
		return this.op(NamedVector.op_add, other);
	}
	mult(other) {
		return this.op(NamedVector.op_mult, other);
	}
	div(other) {
		return this.op(NamedVector.op_div, other);
	}
	get floor() {
		return this.apply(Math.floor);
	}
	get ceil() {
		return this.apply(Math.ceil);
	}

	apply(fun) {
		return new this.constructor(this.names.reduce((acc, name) => {
			acc[name] = fun(this[name]);
			return acc;
		}, {}));
	}

	op(fun, other) {
		if (typeof other === 'number') {
			return new this.constructor(this.names.reduce((acc, name) => {
				acc[name] = fun(this[name], other);
				return acc;
			}, {}));
		} else {
			return new this.constructor(this.names.reduce((acc, name) => {
				acc[name] = fun(this[name], other[name]);
				return acc;
			}, {}));
		};
	}
};

module.exports.NamedVector = NamedVector;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

const util = __webpack_require__(7);
const NamedVector = __webpack_require__(8).NamedVector;

const Papa = __webpack_require__(19);
const ShipEngine = __webpack_require__(2);

const COMPONENT_MAPPING = [{
	name: "Warp Core",
	frame_row: 76,
	components: [{ name: "Warp Core Type", row: 78 }, { name: "M/AM Injectors", row: 80 }, { name: "Coolant Systems", row: 81 }, { name: "EPS Manifold System", row: 82 }, { name: "Eject System", row: 83 }],
	settings: [{ name: "Safety/Performance", row: 79 }]
}, {
	name: "Engineering",
	frame_row: 65,
	components: [{ name: "Structural Integrity Fields", row: 67 }, { name: "Navigational Deflector", row: 68 }, { name: "Nacelle System", row: 69 }, { name: "Replication Package", row: 71 }, { name: "Fuel & Matter Stores", row: 72 }],
	settings: []
}, {
	name: "Hull",
	frame_row: 59,
	components: [{ name: "Hull System", row: 61 }],
	settings: []
}, {
	name: "Operations",
	frame_row: 43,
	components: [{ name: "Long-Range Sensors", row: 45 }, { name: "Navigational Sensors", row: 46 }, { name: "Survey Sensors", row: 47 }, { name: "Science Labs", row: 48 }, { name: "Computer Core", row: 49 }, { name: "Operating System", row: 50 }, { name: "Secondary Core", row: 51 }, { name: "Diplomatic Package", row: 53 }, { name: "Recreation Package", row: 54 }, { name: "Sickbay", row: 55 }],
	settings: [{ name: "Isolinear?", row: 52 }]
}, {
	name: "Tactical",
	frame_row: 28,
	components: [{ name: "Primary Phasers", row: 30 }, { name: "Secondary Phasers", row: 31 }, { name: "Torpedo System", row: 33 }, { name: "Short-Range Sensors", row: 35 }, { name: "Targeting Computer", row: 36 }, { name: "Deflector Shields", row: 37 }, { name: "Backup Deflectors", row: 38 }, { name: "Impulse Engine Pwr", row: 39 }],
	settings: [{ name: "Phaser Arrays", row: 32 }, { name: "Burst Launchers", row: 34 }]
}];

function import_design(design_csv) {
	const result = Papa.parse(design_csv, { dynamicTyping: true });
	return {
		"Name": result.data[0][3],
		"Principal Frame": result.data[17][4],
		"Module": {
			"Variant": result.data[87][4],
			"Type": result.data[87][2]
		},
		"Subsystems": COMPONENT_MAPPING.map(function (subsystem) {
			return {
				"Name": subsystem.name,
				"Sub-Frame": result.data[subsystem.frame_row][4],
				"Settings": subsystem.settings.reduce((acc, value) => {
					acc[value.name] = result.data[value.row][3];
					return acc;
				}, {}),
				"Components": subsystem.components.map(row => {
					return {
						"Name": row.name,
						"Quantity": result.data[row.row][3],
						"Part": result.data[row.row][4]
					};
				})
			};
		})
	};
};

module.exports.import_design = import_design;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(24)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 12 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dist_design_json__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dist_design_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__dist_design_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dist_parts_C8_csv__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dist_parts_C8_csv___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__dist_parts_C8_csv__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dist_modules_C8_csv__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dist_modules_C8_csv___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__dist_modules_C8_csv__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dist_frames_C8_csv__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dist_frames_C8_csv___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__dist_frames_C8_csv__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_bluebird__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_shipengine__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_shipengine___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__lib_shipengine__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_shipimporter__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_shipimporter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__lib_shipimporter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_vue__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_vue__ = __webpack_require__(21);











__WEBPACK_IMPORTED_MODULE_4_bluebird___default.a.longStackTraces();

const se_db = new __WEBPACK_IMPORTED_MODULE_5__lib_shipengine___default.a.DB({
	parts: __WEBPACK_IMPORTED_MODULE_1__dist_parts_C8_csv___default.a,
	frames: __WEBPACK_IMPORTED_MODULE_3__dist_frames_C8_csv___default.a,
	modules: __WEBPACK_IMPORTED_MODULE_2__dist_modules_C8_csv___default.a
});

console.log(__WEBPACK_IMPORTED_MODULE_0__dist_design_json___default.a);
console.log(__WEBPACK_IMPORTED_MODULE_1__dist_parts_C8_csv___default.a);
console.log(__WEBPACK_IMPORTED_MODULE_2__dist_modules_C8_csv___default.a);

let se_design = new __WEBPACK_IMPORTED_MODULE_5__lib_shipengine___default.a.Design(se_db, __WEBPACK_IMPORTED_MODULE_0__dist_design_json___default.a);
console.log(se_design.pretty_summary);
console.log(se_design.pretty_sdb_info);




// create a root instance
new __WEBPACK_IMPORTED_MODULE_7_vue__["a" /* default */]({
	el: '#app',
	render: h => h(__WEBPACK_IMPORTED_MODULE_8__app_vue__["a" /* default */])
});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global, setImmediate) {/* @preserve
 * The MIT License (MIT)
 * 
 * Copyright (c) 2013-2017 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
/**
 * bluebird build version 3.5.0
 * Features enabled: core, race, call_get, generators, map, nodeify, promisify, props, reduce, settle, some, using, timers, filter, any, each
*/
!function(e){if(true)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Promise=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof _dereq_=="function"&&_dereq_;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof _dereq_=="function"&&_dereq_;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise) {
var SomePromiseArray = Promise._SomePromiseArray;
function any(promises) {
    var ret = new SomePromiseArray(promises);
    var promise = ret.promise();
    ret.setHowMany(1);
    ret.setUnwrap();
    ret.init();
    return promise;
}

Promise.any = function (promises) {
    return any(promises);
};

Promise.prototype.any = function () {
    return any(this);
};

};

},{}],2:[function(_dereq_,module,exports){
"use strict";
var firstLineError;
try {throw new Error(); } catch (e) {firstLineError = e;}
var schedule = _dereq_("./schedule");
var Queue = _dereq_("./queue");
var util = _dereq_("./util");

function Async() {
    this._customScheduler = false;
    this._isTickUsed = false;
    this._lateQueue = new Queue(16);
    this._normalQueue = new Queue(16);
    this._haveDrainedQueues = false;
    this._trampolineEnabled = true;
    var self = this;
    this.drainQueues = function () {
        self._drainQueues();
    };
    this._schedule = schedule;
}

Async.prototype.setScheduler = function(fn) {
    var prev = this._schedule;
    this._schedule = fn;
    this._customScheduler = true;
    return prev;
};

Async.prototype.hasCustomScheduler = function() {
    return this._customScheduler;
};

Async.prototype.enableTrampoline = function() {
    this._trampolineEnabled = true;
};

Async.prototype.disableTrampolineIfNecessary = function() {
    if (util.hasDevTools) {
        this._trampolineEnabled = false;
    }
};

Async.prototype.haveItemsQueued = function () {
    return this._isTickUsed || this._haveDrainedQueues;
};


Async.prototype.fatalError = function(e, isNode) {
    if (isNode) {
        process.stderr.write("Fatal " + (e instanceof Error ? e.stack : e) +
            "\n");
        process.exit(2);
    } else {
        this.throwLater(e);
    }
};

Async.prototype.throwLater = function(fn, arg) {
    if (arguments.length === 1) {
        arg = fn;
        fn = function () { throw arg; };
    }
    if (typeof setTimeout !== "undefined") {
        setTimeout(function() {
            fn(arg);
        }, 0);
    } else try {
        this._schedule(function() {
            fn(arg);
        });
    } catch (e) {
        throw new Error("No async scheduler available\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
};

function AsyncInvokeLater(fn, receiver, arg) {
    this._lateQueue.push(fn, receiver, arg);
    this._queueTick();
}

function AsyncInvoke(fn, receiver, arg) {
    this._normalQueue.push(fn, receiver, arg);
    this._queueTick();
}

function AsyncSettlePromises(promise) {
    this._normalQueue._pushOne(promise);
    this._queueTick();
}

if (!util.hasDevTools) {
    Async.prototype.invokeLater = AsyncInvokeLater;
    Async.prototype.invoke = AsyncInvoke;
    Async.prototype.settlePromises = AsyncSettlePromises;
} else {
    Async.prototype.invokeLater = function (fn, receiver, arg) {
        if (this._trampolineEnabled) {
            AsyncInvokeLater.call(this, fn, receiver, arg);
        } else {
            this._schedule(function() {
                setTimeout(function() {
                    fn.call(receiver, arg);
                }, 100);
            });
        }
    };

    Async.prototype.invoke = function (fn, receiver, arg) {
        if (this._trampolineEnabled) {
            AsyncInvoke.call(this, fn, receiver, arg);
        } else {
            this._schedule(function() {
                fn.call(receiver, arg);
            });
        }
    };

    Async.prototype.settlePromises = function(promise) {
        if (this._trampolineEnabled) {
            AsyncSettlePromises.call(this, promise);
        } else {
            this._schedule(function() {
                promise._settlePromises();
            });
        }
    };
}

Async.prototype._drainQueue = function(queue) {
    while (queue.length() > 0) {
        var fn = queue.shift();
        if (typeof fn !== "function") {
            fn._settlePromises();
            continue;
        }
        var receiver = queue.shift();
        var arg = queue.shift();
        fn.call(receiver, arg);
    }
};

Async.prototype._drainQueues = function () {
    this._drainQueue(this._normalQueue);
    this._reset();
    this._haveDrainedQueues = true;
    this._drainQueue(this._lateQueue);
};

Async.prototype._queueTick = function () {
    if (!this._isTickUsed) {
        this._isTickUsed = true;
        this._schedule(this.drainQueues);
    }
};

Async.prototype._reset = function () {
    this._isTickUsed = false;
};

module.exports = Async;
module.exports.firstLineError = firstLineError;

},{"./queue":26,"./schedule":29,"./util":36}],3:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL, tryConvertToPromise, debug) {
var calledBind = false;
var rejectThis = function(_, e) {
    this._reject(e);
};

var targetRejected = function(e, context) {
    context.promiseRejectionQueued = true;
    context.bindingPromise._then(rejectThis, rejectThis, null, this, e);
};

var bindingResolved = function(thisArg, context) {
    if (((this._bitField & 50397184) === 0)) {
        this._resolveCallback(context.target);
    }
};

var bindingRejected = function(e, context) {
    if (!context.promiseRejectionQueued) this._reject(e);
};

Promise.prototype.bind = function (thisArg) {
    if (!calledBind) {
        calledBind = true;
        Promise.prototype._propagateFrom = debug.propagateFromFunction();
        Promise.prototype._boundValue = debug.boundValueFunction();
    }
    var maybePromise = tryConvertToPromise(thisArg);
    var ret = new Promise(INTERNAL);
    ret._propagateFrom(this, 1);
    var target = this._target();
    ret._setBoundTo(maybePromise);
    if (maybePromise instanceof Promise) {
        var context = {
            promiseRejectionQueued: false,
            promise: ret,
            target: target,
            bindingPromise: maybePromise
        };
        target._then(INTERNAL, targetRejected, undefined, ret, context);
        maybePromise._then(
            bindingResolved, bindingRejected, undefined, ret, context);
        ret._setOnCancel(maybePromise);
    } else {
        ret._resolveCallback(target);
    }
    return ret;
};

Promise.prototype._setBoundTo = function (obj) {
    if (obj !== undefined) {
        this._bitField = this._bitField | 2097152;
        this._boundTo = obj;
    } else {
        this._bitField = this._bitField & (~2097152);
    }
};

Promise.prototype._isBound = function () {
    return (this._bitField & 2097152) === 2097152;
};

Promise.bind = function (thisArg, value) {
    return Promise.resolve(value).bind(thisArg);
};
};

},{}],4:[function(_dereq_,module,exports){
"use strict";
var old;
if (typeof Promise !== "undefined") old = Promise;
function noConflict() {
    try { if (Promise === bluebird) Promise = old; }
    catch (e) {}
    return bluebird;
}
var bluebird = _dereq_("./promise")();
bluebird.noConflict = noConflict;
module.exports = bluebird;

},{"./promise":22}],5:[function(_dereq_,module,exports){
"use strict";
var cr = Object.create;
if (cr) {
    var callerCache = cr(null);
    var getterCache = cr(null);
    callerCache[" size"] = getterCache[" size"] = 0;
}

module.exports = function(Promise) {
var util = _dereq_("./util");
var canEvaluate = util.canEvaluate;
var isIdentifier = util.isIdentifier;

var getMethodCaller;
var getGetter;
if (false) {
var makeMethodCaller = function (methodName) {
    return new Function("ensureMethod", "                                    \n\
        return function(obj) {                                               \n\
            'use strict'                                                     \n\
            var len = this.length;                                           \n\
            ensureMethod(obj, 'methodName');                                 \n\
            switch(len) {                                                    \n\
                case 1: return obj.methodName(this[0]);                      \n\
                case 2: return obj.methodName(this[0], this[1]);             \n\
                case 3: return obj.methodName(this[0], this[1], this[2]);    \n\
                case 0: return obj.methodName();                             \n\
                default:                                                     \n\
                    return obj.methodName.apply(obj, this);                  \n\
            }                                                                \n\
        };                                                                   \n\
        ".replace(/methodName/g, methodName))(ensureMethod);
};

var makeGetter = function (propertyName) {
    return new Function("obj", "                                             \n\
        'use strict';                                                        \n\
        return obj.propertyName;                                             \n\
        ".replace("propertyName", propertyName));
};

var getCompiled = function(name, compiler, cache) {
    var ret = cache[name];
    if (typeof ret !== "function") {
        if (!isIdentifier(name)) {
            return null;
        }
        ret = compiler(name);
        cache[name] = ret;
        cache[" size"]++;
        if (cache[" size"] > 512) {
            var keys = Object.keys(cache);
            for (var i = 0; i < 256; ++i) delete cache[keys[i]];
            cache[" size"] = keys.length - 256;
        }
    }
    return ret;
};

getMethodCaller = function(name) {
    return getCompiled(name, makeMethodCaller, callerCache);
};

getGetter = function(name) {
    return getCompiled(name, makeGetter, getterCache);
};
}

function ensureMethod(obj, methodName) {
    var fn;
    if (obj != null) fn = obj[methodName];
    if (typeof fn !== "function") {
        var message = "Object " + util.classString(obj) + " has no method '" +
            util.toString(methodName) + "'";
        throw new Promise.TypeError(message);
    }
    return fn;
}

function caller(obj) {
    var methodName = this.pop();
    var fn = ensureMethod(obj, methodName);
    return fn.apply(obj, this);
}
Promise.prototype.call = function (methodName) {
    var args = [].slice.call(arguments, 1);;
    if (false) {
        if (canEvaluate) {
            var maybeCaller = getMethodCaller(methodName);
            if (maybeCaller !== null) {
                return this._then(
                    maybeCaller, undefined, undefined, args, undefined);
            }
        }
    }
    args.push(methodName);
    return this._then(caller, undefined, undefined, args, undefined);
};

function namedGetter(obj) {
    return obj[this];
}
function indexedGetter(obj) {
    var index = +this;
    if (index < 0) index = Math.max(0, index + obj.length);
    return obj[index];
}
Promise.prototype.get = function (propertyName) {
    var isIndex = (typeof propertyName === "number");
    var getter;
    if (!isIndex) {
        if (canEvaluate) {
            var maybeGetter = getGetter(propertyName);
            getter = maybeGetter !== null ? maybeGetter : namedGetter;
        } else {
            getter = namedGetter;
        }
    } else {
        getter = indexedGetter;
    }
    return this._then(getter, undefined, undefined, propertyName, undefined);
};
};

},{"./util":36}],6:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, PromiseArray, apiRejection, debug) {
var util = _dereq_("./util");
var tryCatch = util.tryCatch;
var errorObj = util.errorObj;
var async = Promise._async;

Promise.prototype["break"] = Promise.prototype.cancel = function() {
    if (!debug.cancellation()) return this._warn("cancellation is disabled");

    var promise = this;
    var child = promise;
    while (promise._isCancellable()) {
        if (!promise._cancelBy(child)) {
            if (child._isFollowing()) {
                child._followee().cancel();
            } else {
                child._cancelBranched();
            }
            break;
        }

        var parent = promise._cancellationParent;
        if (parent == null || !parent._isCancellable()) {
            if (promise._isFollowing()) {
                promise._followee().cancel();
            } else {
                promise._cancelBranched();
            }
            break;
        } else {
            if (promise._isFollowing()) promise._followee().cancel();
            promise._setWillBeCancelled();
            child = promise;
            promise = parent;
        }
    }
};

Promise.prototype._branchHasCancelled = function() {
    this._branchesRemainingToCancel--;
};

Promise.prototype._enoughBranchesHaveCancelled = function() {
    return this._branchesRemainingToCancel === undefined ||
           this._branchesRemainingToCancel <= 0;
};

Promise.prototype._cancelBy = function(canceller) {
    if (canceller === this) {
        this._branchesRemainingToCancel = 0;
        this._invokeOnCancel();
        return true;
    } else {
        this._branchHasCancelled();
        if (this._enoughBranchesHaveCancelled()) {
            this._invokeOnCancel();
            return true;
        }
    }
    return false;
};

Promise.prototype._cancelBranched = function() {
    if (this._enoughBranchesHaveCancelled()) {
        this._cancel();
    }
};

Promise.prototype._cancel = function() {
    if (!this._isCancellable()) return;
    this._setCancelled();
    async.invoke(this._cancelPromises, this, undefined);
};

Promise.prototype._cancelPromises = function() {
    if (this._length() > 0) this._settlePromises();
};

Promise.prototype._unsetOnCancel = function() {
    this._onCancelField = undefined;
};

Promise.prototype._isCancellable = function() {
    return this.isPending() && !this._isCancelled();
};

Promise.prototype.isCancellable = function() {
    return this.isPending() && !this.isCancelled();
};

Promise.prototype._doInvokeOnCancel = function(onCancelCallback, internalOnly) {
    if (util.isArray(onCancelCallback)) {
        for (var i = 0; i < onCancelCallback.length; ++i) {
            this._doInvokeOnCancel(onCancelCallback[i], internalOnly);
        }
    } else if (onCancelCallback !== undefined) {
        if (typeof onCancelCallback === "function") {
            if (!internalOnly) {
                var e = tryCatch(onCancelCallback).call(this._boundValue());
                if (e === errorObj) {
                    this._attachExtraTrace(e.e);
                    async.throwLater(e.e);
                }
            }
        } else {
            onCancelCallback._resultCancelled(this);
        }
    }
};

Promise.prototype._invokeOnCancel = function() {
    var onCancelCallback = this._onCancel();
    this._unsetOnCancel();
    async.invoke(this._doInvokeOnCancel, this, onCancelCallback);
};

Promise.prototype._invokeInternalOnCancel = function() {
    if (this._isCancellable()) {
        this._doInvokeOnCancel(this._onCancel(), true);
        this._unsetOnCancel();
    }
};

Promise.prototype._resultCancelled = function() {
    this.cancel();
};

};

},{"./util":36}],7:[function(_dereq_,module,exports){
"use strict";
module.exports = function(NEXT_FILTER) {
var util = _dereq_("./util");
var getKeys = _dereq_("./es5").keys;
var tryCatch = util.tryCatch;
var errorObj = util.errorObj;

function catchFilter(instances, cb, promise) {
    return function(e) {
        var boundTo = promise._boundValue();
        predicateLoop: for (var i = 0; i < instances.length; ++i) {
            var item = instances[i];

            if (item === Error ||
                (item != null && item.prototype instanceof Error)) {
                if (e instanceof item) {
                    return tryCatch(cb).call(boundTo, e);
                }
            } else if (typeof item === "function") {
                var matchesPredicate = tryCatch(item).call(boundTo, e);
                if (matchesPredicate === errorObj) {
                    return matchesPredicate;
                } else if (matchesPredicate) {
                    return tryCatch(cb).call(boundTo, e);
                }
            } else if (util.isObject(e)) {
                var keys = getKeys(item);
                for (var j = 0; j < keys.length; ++j) {
                    var key = keys[j];
                    if (item[key] != e[key]) {
                        continue predicateLoop;
                    }
                }
                return tryCatch(cb).call(boundTo, e);
            }
        }
        return NEXT_FILTER;
    };
}

return catchFilter;
};

},{"./es5":13,"./util":36}],8:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise) {
var longStackTraces = false;
var contextStack = [];

Promise.prototype._promiseCreated = function() {};
Promise.prototype._pushContext = function() {};
Promise.prototype._popContext = function() {return null;};
Promise._peekContext = Promise.prototype._peekContext = function() {};

function Context() {
    this._trace = new Context.CapturedTrace(peekContext());
}
Context.prototype._pushContext = function () {
    if (this._trace !== undefined) {
        this._trace._promiseCreated = null;
        contextStack.push(this._trace);
    }
};

Context.prototype._popContext = function () {
    if (this._trace !== undefined) {
        var trace = contextStack.pop();
        var ret = trace._promiseCreated;
        trace._promiseCreated = null;
        return ret;
    }
    return null;
};

function createContext() {
    if (longStackTraces) return new Context();
}

function peekContext() {
    var lastIndex = contextStack.length - 1;
    if (lastIndex >= 0) {
        return contextStack[lastIndex];
    }
    return undefined;
}
Context.CapturedTrace = null;
Context.create = createContext;
Context.deactivateLongStackTraces = function() {};
Context.activateLongStackTraces = function() {
    var Promise_pushContext = Promise.prototype._pushContext;
    var Promise_popContext = Promise.prototype._popContext;
    var Promise_PeekContext = Promise._peekContext;
    var Promise_peekContext = Promise.prototype._peekContext;
    var Promise_promiseCreated = Promise.prototype._promiseCreated;
    Context.deactivateLongStackTraces = function() {
        Promise.prototype._pushContext = Promise_pushContext;
        Promise.prototype._popContext = Promise_popContext;
        Promise._peekContext = Promise_PeekContext;
        Promise.prototype._peekContext = Promise_peekContext;
        Promise.prototype._promiseCreated = Promise_promiseCreated;
        longStackTraces = false;
    };
    longStackTraces = true;
    Promise.prototype._pushContext = Context.prototype._pushContext;
    Promise.prototype._popContext = Context.prototype._popContext;
    Promise._peekContext = Promise.prototype._peekContext = peekContext;
    Promise.prototype._promiseCreated = function() {
        var ctx = this._peekContext();
        if (ctx && ctx._promiseCreated == null) ctx._promiseCreated = this;
    };
};
return Context;
};

},{}],9:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, Context) {
var getDomain = Promise._getDomain;
var async = Promise._async;
var Warning = _dereq_("./errors").Warning;
var util = _dereq_("./util");
var canAttachTrace = util.canAttachTrace;
var unhandledRejectionHandled;
var possiblyUnhandledRejection;
var bluebirdFramePattern =
    /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/;
var nodeFramePattern = /\((?:timers\.js):\d+:\d+\)/;
var parseLinePattern = /[\/<\(](.+?):(\d+):(\d+)\)?\s*$/;
var stackFramePattern = null;
var formatStack = null;
var indentStackFrames = false;
var printWarning;
var debugging = !!(util.env("BLUEBIRD_DEBUG") != 0 &&
                        (true ||
                         util.env("BLUEBIRD_DEBUG") ||
                         util.env("NODE_ENV") === "development"));

var warnings = !!(util.env("BLUEBIRD_WARNINGS") != 0 &&
    (debugging || util.env("BLUEBIRD_WARNINGS")));

var longStackTraces = !!(util.env("BLUEBIRD_LONG_STACK_TRACES") != 0 &&
    (debugging || util.env("BLUEBIRD_LONG_STACK_TRACES")));

var wForgottenReturn = util.env("BLUEBIRD_W_FORGOTTEN_RETURN") != 0 &&
    (warnings || !!util.env("BLUEBIRD_W_FORGOTTEN_RETURN"));

Promise.prototype.suppressUnhandledRejections = function() {
    var target = this._target();
    target._bitField = ((target._bitField & (~1048576)) |
                      524288);
};

Promise.prototype._ensurePossibleRejectionHandled = function () {
    if ((this._bitField & 524288) !== 0) return;
    this._setRejectionIsUnhandled();
    async.invokeLater(this._notifyUnhandledRejection, this, undefined);
};

Promise.prototype._notifyUnhandledRejectionIsHandled = function () {
    fireRejectionEvent("rejectionHandled",
                                  unhandledRejectionHandled, undefined, this);
};

Promise.prototype._setReturnedNonUndefined = function() {
    this._bitField = this._bitField | 268435456;
};

Promise.prototype._returnedNonUndefined = function() {
    return (this._bitField & 268435456) !== 0;
};

Promise.prototype._notifyUnhandledRejection = function () {
    if (this._isRejectionUnhandled()) {
        var reason = this._settledValue();
        this._setUnhandledRejectionIsNotified();
        fireRejectionEvent("unhandledRejection",
                                      possiblyUnhandledRejection, reason, this);
    }
};

Promise.prototype._setUnhandledRejectionIsNotified = function () {
    this._bitField = this._bitField | 262144;
};

Promise.prototype._unsetUnhandledRejectionIsNotified = function () {
    this._bitField = this._bitField & (~262144);
};

Promise.prototype._isUnhandledRejectionNotified = function () {
    return (this._bitField & 262144) > 0;
};

Promise.prototype._setRejectionIsUnhandled = function () {
    this._bitField = this._bitField | 1048576;
};

Promise.prototype._unsetRejectionIsUnhandled = function () {
    this._bitField = this._bitField & (~1048576);
    if (this._isUnhandledRejectionNotified()) {
        this._unsetUnhandledRejectionIsNotified();
        this._notifyUnhandledRejectionIsHandled();
    }
};

Promise.prototype._isRejectionUnhandled = function () {
    return (this._bitField & 1048576) > 0;
};

Promise.prototype._warn = function(message, shouldUseOwnTrace, promise) {
    return warn(message, shouldUseOwnTrace, promise || this);
};

Promise.onPossiblyUnhandledRejection = function (fn) {
    var domain = getDomain();
    possiblyUnhandledRejection =
        typeof fn === "function" ? (domain === null ?
                                            fn : util.domainBind(domain, fn))
                                 : undefined;
};

Promise.onUnhandledRejectionHandled = function (fn) {
    var domain = getDomain();
    unhandledRejectionHandled =
        typeof fn === "function" ? (domain === null ?
                                            fn : util.domainBind(domain, fn))
                                 : undefined;
};

var disableLongStackTraces = function() {};
Promise.longStackTraces = function () {
    if (async.haveItemsQueued() && !config.longStackTraces) {
        throw new Error("cannot enable long stack traces after promises have been created\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    if (!config.longStackTraces && longStackTracesIsSupported()) {
        var Promise_captureStackTrace = Promise.prototype._captureStackTrace;
        var Promise_attachExtraTrace = Promise.prototype._attachExtraTrace;
        config.longStackTraces = true;
        disableLongStackTraces = function() {
            if (async.haveItemsQueued() && !config.longStackTraces) {
                throw new Error("cannot enable long stack traces after promises have been created\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
            }
            Promise.prototype._captureStackTrace = Promise_captureStackTrace;
            Promise.prototype._attachExtraTrace = Promise_attachExtraTrace;
            Context.deactivateLongStackTraces();
            async.enableTrampoline();
            config.longStackTraces = false;
        };
        Promise.prototype._captureStackTrace = longStackTracesCaptureStackTrace;
        Promise.prototype._attachExtraTrace = longStackTracesAttachExtraTrace;
        Context.activateLongStackTraces();
        async.disableTrampolineIfNecessary();
    }
};

Promise.hasLongStackTraces = function () {
    return config.longStackTraces && longStackTracesIsSupported();
};

var fireDomEvent = (function() {
    try {
        if (typeof CustomEvent === "function") {
            var event = new CustomEvent("CustomEvent");
            util.global.dispatchEvent(event);
            return function(name, event) {
                var domEvent = new CustomEvent(name.toLowerCase(), {
                    detail: event,
                    cancelable: true
                });
                return !util.global.dispatchEvent(domEvent);
            };
        } else if (typeof Event === "function") {
            var event = new Event("CustomEvent");
            util.global.dispatchEvent(event);
            return function(name, event) {
                var domEvent = new Event(name.toLowerCase(), {
                    cancelable: true
                });
                domEvent.detail = event;
                return !util.global.dispatchEvent(domEvent);
            };
        } else {
            var event = document.createEvent("CustomEvent");
            event.initCustomEvent("testingtheevent", false, true, {});
            util.global.dispatchEvent(event);
            return function(name, event) {
                var domEvent = document.createEvent("CustomEvent");
                domEvent.initCustomEvent(name.toLowerCase(), false, true,
                    event);
                return !util.global.dispatchEvent(domEvent);
            };
        }
    } catch (e) {}
    return function() {
        return false;
    };
})();

var fireGlobalEvent = (function() {
    if (util.isNode) {
        return function() {
            return process.emit.apply(process, arguments);
        };
    } else {
        if (!util.global) {
            return function() {
                return false;
            };
        }
        return function(name) {
            var methodName = "on" + name.toLowerCase();
            var method = util.global[methodName];
            if (!method) return false;
            method.apply(util.global, [].slice.call(arguments, 1));
            return true;
        };
    }
})();

function generatePromiseLifecycleEventObject(name, promise) {
    return {promise: promise};
}

var eventToObjectGenerator = {
    promiseCreated: generatePromiseLifecycleEventObject,
    promiseFulfilled: generatePromiseLifecycleEventObject,
    promiseRejected: generatePromiseLifecycleEventObject,
    promiseResolved: generatePromiseLifecycleEventObject,
    promiseCancelled: generatePromiseLifecycleEventObject,
    promiseChained: function(name, promise, child) {
        return {promise: promise, child: child};
    },
    warning: function(name, warning) {
        return {warning: warning};
    },
    unhandledRejection: function (name, reason, promise) {
        return {reason: reason, promise: promise};
    },
    rejectionHandled: generatePromiseLifecycleEventObject
};

var activeFireEvent = function (name) {
    var globalEventFired = false;
    try {
        globalEventFired = fireGlobalEvent.apply(null, arguments);
    } catch (e) {
        async.throwLater(e);
        globalEventFired = true;
    }

    var domEventFired = false;
    try {
        domEventFired = fireDomEvent(name,
                    eventToObjectGenerator[name].apply(null, arguments));
    } catch (e) {
        async.throwLater(e);
        domEventFired = true;
    }

    return domEventFired || globalEventFired;
};

Promise.config = function(opts) {
    opts = Object(opts);
    if ("longStackTraces" in opts) {
        if (opts.longStackTraces) {
            Promise.longStackTraces();
        } else if (!opts.longStackTraces && Promise.hasLongStackTraces()) {
            disableLongStackTraces();
        }
    }
    if ("warnings" in opts) {
        var warningsOption = opts.warnings;
        config.warnings = !!warningsOption;
        wForgottenReturn = config.warnings;

        if (util.isObject(warningsOption)) {
            if ("wForgottenReturn" in warningsOption) {
                wForgottenReturn = !!warningsOption.wForgottenReturn;
            }
        }
    }
    if ("cancellation" in opts && opts.cancellation && !config.cancellation) {
        if (async.haveItemsQueued()) {
            throw new Error(
                "cannot enable cancellation after promises are in use");
        }
        Promise.prototype._clearCancellationData =
            cancellationClearCancellationData;
        Promise.prototype._propagateFrom = cancellationPropagateFrom;
        Promise.prototype._onCancel = cancellationOnCancel;
        Promise.prototype._setOnCancel = cancellationSetOnCancel;
        Promise.prototype._attachCancellationCallback =
            cancellationAttachCancellationCallback;
        Promise.prototype._execute = cancellationExecute;
        propagateFromFunction = cancellationPropagateFrom;
        config.cancellation = true;
    }
    if ("monitoring" in opts) {
        if (opts.monitoring && !config.monitoring) {
            config.monitoring = true;
            Promise.prototype._fireEvent = activeFireEvent;
        } else if (!opts.monitoring && config.monitoring) {
            config.monitoring = false;
            Promise.prototype._fireEvent = defaultFireEvent;
        }
    }
    return Promise;
};

function defaultFireEvent() { return false; }

Promise.prototype._fireEvent = defaultFireEvent;
Promise.prototype._execute = function(executor, resolve, reject) {
    try {
        executor(resolve, reject);
    } catch (e) {
        return e;
    }
};
Promise.prototype._onCancel = function () {};
Promise.prototype._setOnCancel = function (handler) { ; };
Promise.prototype._attachCancellationCallback = function(onCancel) {
    ;
};
Promise.prototype._captureStackTrace = function () {};
Promise.prototype._attachExtraTrace = function () {};
Promise.prototype._clearCancellationData = function() {};
Promise.prototype._propagateFrom = function (parent, flags) {
    ;
    ;
};

function cancellationExecute(executor, resolve, reject) {
    var promise = this;
    try {
        executor(resolve, reject, function(onCancel) {
            if (typeof onCancel !== "function") {
                throw new TypeError("onCancel must be a function, got: " +
                                    util.toString(onCancel));
            }
            promise._attachCancellationCallback(onCancel);
        });
    } catch (e) {
        return e;
    }
}

function cancellationAttachCancellationCallback(onCancel) {
    if (!this._isCancellable()) return this;

    var previousOnCancel = this._onCancel();
    if (previousOnCancel !== undefined) {
        if (util.isArray(previousOnCancel)) {
            previousOnCancel.push(onCancel);
        } else {
            this._setOnCancel([previousOnCancel, onCancel]);
        }
    } else {
        this._setOnCancel(onCancel);
    }
}

function cancellationOnCancel() {
    return this._onCancelField;
}

function cancellationSetOnCancel(onCancel) {
    this._onCancelField = onCancel;
}

function cancellationClearCancellationData() {
    this._cancellationParent = undefined;
    this._onCancelField = undefined;
}

function cancellationPropagateFrom(parent, flags) {
    if ((flags & 1) !== 0) {
        this._cancellationParent = parent;
        var branchesRemainingToCancel = parent._branchesRemainingToCancel;
        if (branchesRemainingToCancel === undefined) {
            branchesRemainingToCancel = 0;
        }
        parent._branchesRemainingToCancel = branchesRemainingToCancel + 1;
    }
    if ((flags & 2) !== 0 && parent._isBound()) {
        this._setBoundTo(parent._boundTo);
    }
}

function bindingPropagateFrom(parent, flags) {
    if ((flags & 2) !== 0 && parent._isBound()) {
        this._setBoundTo(parent._boundTo);
    }
}
var propagateFromFunction = bindingPropagateFrom;

function boundValueFunction() {
    var ret = this._boundTo;
    if (ret !== undefined) {
        if (ret instanceof Promise) {
            if (ret.isFulfilled()) {
                return ret.value();
            } else {
                return undefined;
            }
        }
    }
    return ret;
}

function longStackTracesCaptureStackTrace() {
    this._trace = new CapturedTrace(this._peekContext());
}

function longStackTracesAttachExtraTrace(error, ignoreSelf) {
    if (canAttachTrace(error)) {
        var trace = this._trace;
        if (trace !== undefined) {
            if (ignoreSelf) trace = trace._parent;
        }
        if (trace !== undefined) {
            trace.attachExtraTrace(error);
        } else if (!error.__stackCleaned__) {
            var parsed = parseStackAndMessage(error);
            util.notEnumerableProp(error, "stack",
                parsed.message + "\n" + parsed.stack.join("\n"));
            util.notEnumerableProp(error, "__stackCleaned__", true);
        }
    }
}

function checkForgottenReturns(returnValue, promiseCreated, name, promise,
                               parent) {
    if (returnValue === undefined && promiseCreated !== null &&
        wForgottenReturn) {
        if (parent !== undefined && parent._returnedNonUndefined()) return;
        if ((promise._bitField & 65535) === 0) return;

        if (name) name = name + " ";
        var handlerLine = "";
        var creatorLine = "";
        if (promiseCreated._trace) {
            var traceLines = promiseCreated._trace.stack.split("\n");
            var stack = cleanStack(traceLines);
            for (var i = stack.length - 1; i >= 0; --i) {
                var line = stack[i];
                if (!nodeFramePattern.test(line)) {
                    var lineMatches = line.match(parseLinePattern);
                    if (lineMatches) {
                        handlerLine  = "at " + lineMatches[1] +
                            ":" + lineMatches[2] + ":" + lineMatches[3] + " ";
                    }
                    break;
                }
            }

            if (stack.length > 0) {
                var firstUserLine = stack[0];
                for (var i = 0; i < traceLines.length; ++i) {

                    if (traceLines[i] === firstUserLine) {
                        if (i > 0) {
                            creatorLine = "\n" + traceLines[i - 1];
                        }
                        break;
                    }
                }

            }
        }
        var msg = "a promise was created in a " + name +
            "handler " + handlerLine + "but was not returned from it, " +
            "see http://goo.gl/rRqMUw" +
            creatorLine;
        promise._warn(msg, true, promiseCreated);
    }
}

function deprecated(name, replacement) {
    var message = name +
        " is deprecated and will be removed in a future version.";
    if (replacement) message += " Use " + replacement + " instead.";
    return warn(message);
}

function warn(message, shouldUseOwnTrace, promise) {
    if (!config.warnings) return;
    var warning = new Warning(message);
    var ctx;
    if (shouldUseOwnTrace) {
        promise._attachExtraTrace(warning);
    } else if (config.longStackTraces && (ctx = Promise._peekContext())) {
        ctx.attachExtraTrace(warning);
    } else {
        var parsed = parseStackAndMessage(warning);
        warning.stack = parsed.message + "\n" + parsed.stack.join("\n");
    }

    if (!activeFireEvent("warning", warning)) {
        formatAndLogError(warning, "", true);
    }
}

function reconstructStack(message, stacks) {
    for (var i = 0; i < stacks.length - 1; ++i) {
        stacks[i].push("From previous event:");
        stacks[i] = stacks[i].join("\n");
    }
    if (i < stacks.length) {
        stacks[i] = stacks[i].join("\n");
    }
    return message + "\n" + stacks.join("\n");
}

function removeDuplicateOrEmptyJumps(stacks) {
    for (var i = 0; i < stacks.length; ++i) {
        if (stacks[i].length === 0 ||
            ((i + 1 < stacks.length) && stacks[i][0] === stacks[i+1][0])) {
            stacks.splice(i, 1);
            i--;
        }
    }
}

function removeCommonRoots(stacks) {
    var current = stacks[0];
    for (var i = 1; i < stacks.length; ++i) {
        var prev = stacks[i];
        var currentLastIndex = current.length - 1;
        var currentLastLine = current[currentLastIndex];
        var commonRootMeetPoint = -1;

        for (var j = prev.length - 1; j >= 0; --j) {
            if (prev[j] === currentLastLine) {
                commonRootMeetPoint = j;
                break;
            }
        }

        for (var j = commonRootMeetPoint; j >= 0; --j) {
            var line = prev[j];
            if (current[currentLastIndex] === line) {
                current.pop();
                currentLastIndex--;
            } else {
                break;
            }
        }
        current = prev;
    }
}

function cleanStack(stack) {
    var ret = [];
    for (var i = 0; i < stack.length; ++i) {
        var line = stack[i];
        var isTraceLine = "    (No stack trace)" === line ||
            stackFramePattern.test(line);
        var isInternalFrame = isTraceLine && shouldIgnore(line);
        if (isTraceLine && !isInternalFrame) {
            if (indentStackFrames && line.charAt(0) !== " ") {
                line = "    " + line;
            }
            ret.push(line);
        }
    }
    return ret;
}

function stackFramesAsArray(error) {
    var stack = error.stack.replace(/\s+$/g, "").split("\n");
    for (var i = 0; i < stack.length; ++i) {
        var line = stack[i];
        if ("    (No stack trace)" === line || stackFramePattern.test(line)) {
            break;
        }
    }
    if (i > 0 && error.name != "SyntaxError") {
        stack = stack.slice(i);
    }
    return stack;
}

function parseStackAndMessage(error) {
    var stack = error.stack;
    var message = error.toString();
    stack = typeof stack === "string" && stack.length > 0
                ? stackFramesAsArray(error) : ["    (No stack trace)"];
    return {
        message: message,
        stack: error.name == "SyntaxError" ? stack : cleanStack(stack)
    };
}

function formatAndLogError(error, title, isSoft) {
    if (typeof console !== "undefined") {
        var message;
        if (util.isObject(error)) {
            var stack = error.stack;
            message = title + formatStack(stack, error);
        } else {
            message = title + String(error);
        }
        if (typeof printWarning === "function") {
            printWarning(message, isSoft);
        } else if (typeof console.log === "function" ||
            typeof console.log === "object") {
            console.log(message);
        }
    }
}

function fireRejectionEvent(name, localHandler, reason, promise) {
    var localEventFired = false;
    try {
        if (typeof localHandler === "function") {
            localEventFired = true;
            if (name === "rejectionHandled") {
                localHandler(promise);
            } else {
                localHandler(reason, promise);
            }
        }
    } catch (e) {
        async.throwLater(e);
    }

    if (name === "unhandledRejection") {
        if (!activeFireEvent(name, reason, promise) && !localEventFired) {
            formatAndLogError(reason, "Unhandled rejection ");
        }
    } else {
        activeFireEvent(name, promise);
    }
}

function formatNonError(obj) {
    var str;
    if (typeof obj === "function") {
        str = "[function " +
            (obj.name || "anonymous") +
            "]";
    } else {
        str = obj && typeof obj.toString === "function"
            ? obj.toString() : util.toString(obj);
        var ruselessToString = /\[object [a-zA-Z0-9$_]+\]/;
        if (ruselessToString.test(str)) {
            try {
                var newStr = JSON.stringify(obj);
                str = newStr;
            }
            catch(e) {

            }
        }
        if (str.length === 0) {
            str = "(empty array)";
        }
    }
    return ("(<" + snip(str) + ">, no stack trace)");
}

function snip(str) {
    var maxChars = 41;
    if (str.length < maxChars) {
        return str;
    }
    return str.substr(0, maxChars - 3) + "...";
}

function longStackTracesIsSupported() {
    return typeof captureStackTrace === "function";
}

var shouldIgnore = function() { return false; };
var parseLineInfoRegex = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;
function parseLineInfo(line) {
    var matches = line.match(parseLineInfoRegex);
    if (matches) {
        return {
            fileName: matches[1],
            line: parseInt(matches[2], 10)
        };
    }
}

function setBounds(firstLineError, lastLineError) {
    if (!longStackTracesIsSupported()) return;
    var firstStackLines = firstLineError.stack.split("\n");
    var lastStackLines = lastLineError.stack.split("\n");
    var firstIndex = -1;
    var lastIndex = -1;
    var firstFileName;
    var lastFileName;
    for (var i = 0; i < firstStackLines.length; ++i) {
        var result = parseLineInfo(firstStackLines[i]);
        if (result) {
            firstFileName = result.fileName;
            firstIndex = result.line;
            break;
        }
    }
    for (var i = 0; i < lastStackLines.length; ++i) {
        var result = parseLineInfo(lastStackLines[i]);
        if (result) {
            lastFileName = result.fileName;
            lastIndex = result.line;
            break;
        }
    }
    if (firstIndex < 0 || lastIndex < 0 || !firstFileName || !lastFileName ||
        firstFileName !== lastFileName || firstIndex >= lastIndex) {
        return;
    }

    shouldIgnore = function(line) {
        if (bluebirdFramePattern.test(line)) return true;
        var info = parseLineInfo(line);
        if (info) {
            if (info.fileName === firstFileName &&
                (firstIndex <= info.line && info.line <= lastIndex)) {
                return true;
            }
        }
        return false;
    };
}

function CapturedTrace(parent) {
    this._parent = parent;
    this._promisesCreated = 0;
    var length = this._length = 1 + (parent === undefined ? 0 : parent._length);
    captureStackTrace(this, CapturedTrace);
    if (length > 32) this.uncycle();
}
util.inherits(CapturedTrace, Error);
Context.CapturedTrace = CapturedTrace;

CapturedTrace.prototype.uncycle = function() {
    var length = this._length;
    if (length < 2) return;
    var nodes = [];
    var stackToIndex = {};

    for (var i = 0, node = this; node !== undefined; ++i) {
        nodes.push(node);
        node = node._parent;
    }
    length = this._length = i;
    for (var i = length - 1; i >= 0; --i) {
        var stack = nodes[i].stack;
        if (stackToIndex[stack] === undefined) {
            stackToIndex[stack] = i;
        }
    }
    for (var i = 0; i < length; ++i) {
        var currentStack = nodes[i].stack;
        var index = stackToIndex[currentStack];
        if (index !== undefined && index !== i) {
            if (index > 0) {
                nodes[index - 1]._parent = undefined;
                nodes[index - 1]._length = 1;
            }
            nodes[i]._parent = undefined;
            nodes[i]._length = 1;
            var cycleEdgeNode = i > 0 ? nodes[i - 1] : this;

            if (index < length - 1) {
                cycleEdgeNode._parent = nodes[index + 1];
                cycleEdgeNode._parent.uncycle();
                cycleEdgeNode._length =
                    cycleEdgeNode._parent._length + 1;
            } else {
                cycleEdgeNode._parent = undefined;
                cycleEdgeNode._length = 1;
            }
            var currentChildLength = cycleEdgeNode._length + 1;
            for (var j = i - 2; j >= 0; --j) {
                nodes[j]._length = currentChildLength;
                currentChildLength++;
            }
            return;
        }
    }
};

CapturedTrace.prototype.attachExtraTrace = function(error) {
    if (error.__stackCleaned__) return;
    this.uncycle();
    var parsed = parseStackAndMessage(error);
    var message = parsed.message;
    var stacks = [parsed.stack];

    var trace = this;
    while (trace !== undefined) {
        stacks.push(cleanStack(trace.stack.split("\n")));
        trace = trace._parent;
    }
    removeCommonRoots(stacks);
    removeDuplicateOrEmptyJumps(stacks);
    util.notEnumerableProp(error, "stack", reconstructStack(message, stacks));
    util.notEnumerableProp(error, "__stackCleaned__", true);
};

var captureStackTrace = (function stackDetection() {
    var v8stackFramePattern = /^\s*at\s*/;
    var v8stackFormatter = function(stack, error) {
        if (typeof stack === "string") return stack;

        if (error.name !== undefined &&
            error.message !== undefined) {
            return error.toString();
        }
        return formatNonError(error);
    };

    if (typeof Error.stackTraceLimit === "number" &&
        typeof Error.captureStackTrace === "function") {
        Error.stackTraceLimit += 6;
        stackFramePattern = v8stackFramePattern;
        formatStack = v8stackFormatter;
        var captureStackTrace = Error.captureStackTrace;

        shouldIgnore = function(line) {
            return bluebirdFramePattern.test(line);
        };
        return function(receiver, ignoreUntil) {
            Error.stackTraceLimit += 6;
            captureStackTrace(receiver, ignoreUntil);
            Error.stackTraceLimit -= 6;
        };
    }
    var err = new Error();

    if (typeof err.stack === "string" &&
        err.stack.split("\n")[0].indexOf("stackDetection@") >= 0) {
        stackFramePattern = /@/;
        formatStack = v8stackFormatter;
        indentStackFrames = true;
        return function captureStackTrace(o) {
            o.stack = new Error().stack;
        };
    }

    var hasStackAfterThrow;
    try { throw new Error(); }
    catch(e) {
        hasStackAfterThrow = ("stack" in e);
    }
    if (!("stack" in err) && hasStackAfterThrow &&
        typeof Error.stackTraceLimit === "number") {
        stackFramePattern = v8stackFramePattern;
        formatStack = v8stackFormatter;
        return function captureStackTrace(o) {
            Error.stackTraceLimit += 6;
            try { throw new Error(); }
            catch(e) { o.stack = e.stack; }
            Error.stackTraceLimit -= 6;
        };
    }

    formatStack = function(stack, error) {
        if (typeof stack === "string") return stack;

        if ((typeof error === "object" ||
            typeof error === "function") &&
            error.name !== undefined &&
            error.message !== undefined) {
            return error.toString();
        }
        return formatNonError(error);
    };

    return null;

})([]);

if (typeof console !== "undefined" && typeof console.warn !== "undefined") {
    printWarning = function (message) {
        console.warn(message);
    };
    if (util.isNode && process.stderr.isTTY) {
        printWarning = function(message, isSoft) {
            var color = isSoft ? "\u001b[33m" : "\u001b[31m";
            console.warn(color + message + "\u001b[0m\n");
        };
    } else if (!util.isNode && typeof (new Error().stack) === "string") {
        printWarning = function(message, isSoft) {
            console.warn("%c" + message,
                        isSoft ? "color: darkorange" : "color: red");
        };
    }
}

var config = {
    warnings: warnings,
    longStackTraces: false,
    cancellation: false,
    monitoring: false
};

if (longStackTraces) Promise.longStackTraces();

return {
    longStackTraces: function() {
        return config.longStackTraces;
    },
    warnings: function() {
        return config.warnings;
    },
    cancellation: function() {
        return config.cancellation;
    },
    monitoring: function() {
        return config.monitoring;
    },
    propagateFromFunction: function() {
        return propagateFromFunction;
    },
    boundValueFunction: function() {
        return boundValueFunction;
    },
    checkForgottenReturns: checkForgottenReturns,
    setBounds: setBounds,
    warn: warn,
    deprecated: deprecated,
    CapturedTrace: CapturedTrace,
    fireDomEvent: fireDomEvent,
    fireGlobalEvent: fireGlobalEvent
};
};

},{"./errors":12,"./util":36}],10:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise) {
function returner() {
    return this.value;
}
function thrower() {
    throw this.reason;
}

Promise.prototype["return"] =
Promise.prototype.thenReturn = function (value) {
    if (value instanceof Promise) value.suppressUnhandledRejections();
    return this._then(
        returner, undefined, undefined, {value: value}, undefined);
};

Promise.prototype["throw"] =
Promise.prototype.thenThrow = function (reason) {
    return this._then(
        thrower, undefined, undefined, {reason: reason}, undefined);
};

Promise.prototype.catchThrow = function (reason) {
    if (arguments.length <= 1) {
        return this._then(
            undefined, thrower, undefined, {reason: reason}, undefined);
    } else {
        var _reason = arguments[1];
        var handler = function() {throw _reason;};
        return this.caught(reason, handler);
    }
};

Promise.prototype.catchReturn = function (value) {
    if (arguments.length <= 1) {
        if (value instanceof Promise) value.suppressUnhandledRejections();
        return this._then(
            undefined, returner, undefined, {value: value}, undefined);
    } else {
        var _value = arguments[1];
        if (_value instanceof Promise) _value.suppressUnhandledRejections();
        var handler = function() {return _value;};
        return this.caught(value, handler);
    }
};
};

},{}],11:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL) {
var PromiseReduce = Promise.reduce;
var PromiseAll = Promise.all;

function promiseAllThis() {
    return PromiseAll(this);
}

function PromiseMapSeries(promises, fn) {
    return PromiseReduce(promises, fn, INTERNAL, INTERNAL);
}

Promise.prototype.each = function (fn) {
    return PromiseReduce(this, fn, INTERNAL, 0)
              ._then(promiseAllThis, undefined, undefined, this, undefined);
};

Promise.prototype.mapSeries = function (fn) {
    return PromiseReduce(this, fn, INTERNAL, INTERNAL);
};

Promise.each = function (promises, fn) {
    return PromiseReduce(promises, fn, INTERNAL, 0)
              ._then(promiseAllThis, undefined, undefined, promises, undefined);
};

Promise.mapSeries = PromiseMapSeries;
};


},{}],12:[function(_dereq_,module,exports){
"use strict";
var es5 = _dereq_("./es5");
var Objectfreeze = es5.freeze;
var util = _dereq_("./util");
var inherits = util.inherits;
var notEnumerableProp = util.notEnumerableProp;

function subError(nameProperty, defaultMessage) {
    function SubError(message) {
        if (!(this instanceof SubError)) return new SubError(message);
        notEnumerableProp(this, "message",
            typeof message === "string" ? message : defaultMessage);
        notEnumerableProp(this, "name", nameProperty);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        } else {
            Error.call(this);
        }
    }
    inherits(SubError, Error);
    return SubError;
}

var _TypeError, _RangeError;
var Warning = subError("Warning", "warning");
var CancellationError = subError("CancellationError", "cancellation error");
var TimeoutError = subError("TimeoutError", "timeout error");
var AggregateError = subError("AggregateError", "aggregate error");
try {
    _TypeError = TypeError;
    _RangeError = RangeError;
} catch(e) {
    _TypeError = subError("TypeError", "type error");
    _RangeError = subError("RangeError", "range error");
}

var methods = ("join pop push shift unshift slice filter forEach some " +
    "every map indexOf lastIndexOf reduce reduceRight sort reverse").split(" ");

for (var i = 0; i < methods.length; ++i) {
    if (typeof Array.prototype[methods[i]] === "function") {
        AggregateError.prototype[methods[i]] = Array.prototype[methods[i]];
    }
}

es5.defineProperty(AggregateError.prototype, "length", {
    value: 0,
    configurable: false,
    writable: true,
    enumerable: true
});
AggregateError.prototype["isOperational"] = true;
var level = 0;
AggregateError.prototype.toString = function() {
    var indent = Array(level * 4 + 1).join(" ");
    var ret = "\n" + indent + "AggregateError of:" + "\n";
    level++;
    indent = Array(level * 4 + 1).join(" ");
    for (var i = 0; i < this.length; ++i) {
        var str = this[i] === this ? "[Circular AggregateError]" : this[i] + "";
        var lines = str.split("\n");
        for (var j = 0; j < lines.length; ++j) {
            lines[j] = indent + lines[j];
        }
        str = lines.join("\n");
        ret += str + "\n";
    }
    level--;
    return ret;
};

function OperationalError(message) {
    if (!(this instanceof OperationalError))
        return new OperationalError(message);
    notEnumerableProp(this, "name", "OperationalError");
    notEnumerableProp(this, "message", message);
    this.cause = message;
    this["isOperational"] = true;

    if (message instanceof Error) {
        notEnumerableProp(this, "message", message.message);
        notEnumerableProp(this, "stack", message.stack);
    } else if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
    }

}
inherits(OperationalError, Error);

var errorTypes = Error["__BluebirdErrorTypes__"];
if (!errorTypes) {
    errorTypes = Objectfreeze({
        CancellationError: CancellationError,
        TimeoutError: TimeoutError,
        OperationalError: OperationalError,
        RejectionError: OperationalError,
        AggregateError: AggregateError
    });
    es5.defineProperty(Error, "__BluebirdErrorTypes__", {
        value: errorTypes,
        writable: false,
        enumerable: false,
        configurable: false
    });
}

module.exports = {
    Error: Error,
    TypeError: _TypeError,
    RangeError: _RangeError,
    CancellationError: errorTypes.CancellationError,
    OperationalError: errorTypes.OperationalError,
    TimeoutError: errorTypes.TimeoutError,
    AggregateError: errorTypes.AggregateError,
    Warning: Warning
};

},{"./es5":13,"./util":36}],13:[function(_dereq_,module,exports){
var isES5 = (function(){
    "use strict";
    return this === undefined;
})();

if (isES5) {
    module.exports = {
        freeze: Object.freeze,
        defineProperty: Object.defineProperty,
        getDescriptor: Object.getOwnPropertyDescriptor,
        keys: Object.keys,
        names: Object.getOwnPropertyNames,
        getPrototypeOf: Object.getPrototypeOf,
        isArray: Array.isArray,
        isES5: isES5,
        propertyIsWritable: function(obj, prop) {
            var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
            return !!(!descriptor || descriptor.writable || descriptor.set);
        }
    };
} else {
    var has = {}.hasOwnProperty;
    var str = {}.toString;
    var proto = {}.constructor.prototype;

    var ObjectKeys = function (o) {
        var ret = [];
        for (var key in o) {
            if (has.call(o, key)) {
                ret.push(key);
            }
        }
        return ret;
    };

    var ObjectGetDescriptor = function(o, key) {
        return {value: o[key]};
    };

    var ObjectDefineProperty = function (o, key, desc) {
        o[key] = desc.value;
        return o;
    };

    var ObjectFreeze = function (obj) {
        return obj;
    };

    var ObjectGetPrototypeOf = function (obj) {
        try {
            return Object(obj).constructor.prototype;
        }
        catch (e) {
            return proto;
        }
    };

    var ArrayIsArray = function (obj) {
        try {
            return str.call(obj) === "[object Array]";
        }
        catch(e) {
            return false;
        }
    };

    module.exports = {
        isArray: ArrayIsArray,
        keys: ObjectKeys,
        names: ObjectKeys,
        defineProperty: ObjectDefineProperty,
        getDescriptor: ObjectGetDescriptor,
        freeze: ObjectFreeze,
        getPrototypeOf: ObjectGetPrototypeOf,
        isES5: isES5,
        propertyIsWritable: function() {
            return true;
        }
    };
}

},{}],14:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL) {
var PromiseMap = Promise.map;

Promise.prototype.filter = function (fn, options) {
    return PromiseMap(this, fn, options, INTERNAL);
};

Promise.filter = function (promises, fn, options) {
    return PromiseMap(promises, fn, options, INTERNAL);
};
};

},{}],15:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, tryConvertToPromise, NEXT_FILTER) {
var util = _dereq_("./util");
var CancellationError = Promise.CancellationError;
var errorObj = util.errorObj;
var catchFilter = _dereq_("./catch_filter")(NEXT_FILTER);

function PassThroughHandlerContext(promise, type, handler) {
    this.promise = promise;
    this.type = type;
    this.handler = handler;
    this.called = false;
    this.cancelPromise = null;
}

PassThroughHandlerContext.prototype.isFinallyHandler = function() {
    return this.type === 0;
};

function FinallyHandlerCancelReaction(finallyHandler) {
    this.finallyHandler = finallyHandler;
}

FinallyHandlerCancelReaction.prototype._resultCancelled = function() {
    checkCancel(this.finallyHandler);
};

function checkCancel(ctx, reason) {
    if (ctx.cancelPromise != null) {
        if (arguments.length > 1) {
            ctx.cancelPromise._reject(reason);
        } else {
            ctx.cancelPromise._cancel();
        }
        ctx.cancelPromise = null;
        return true;
    }
    return false;
}

function succeed() {
    return finallyHandler.call(this, this.promise._target()._settledValue());
}
function fail(reason) {
    if (checkCancel(this, reason)) return;
    errorObj.e = reason;
    return errorObj;
}
function finallyHandler(reasonOrValue) {
    var promise = this.promise;
    var handler = this.handler;

    if (!this.called) {
        this.called = true;
        var ret = this.isFinallyHandler()
            ? handler.call(promise._boundValue())
            : handler.call(promise._boundValue(), reasonOrValue);
        if (ret === NEXT_FILTER) {
            return ret;
        } else if (ret !== undefined) {
            promise._setReturnedNonUndefined();
            var maybePromise = tryConvertToPromise(ret, promise);
            if (maybePromise instanceof Promise) {
                if (this.cancelPromise != null) {
                    if (maybePromise._isCancelled()) {
                        var reason =
                            new CancellationError("late cancellation observer");
                        promise._attachExtraTrace(reason);
                        errorObj.e = reason;
                        return errorObj;
                    } else if (maybePromise.isPending()) {
                        maybePromise._attachCancellationCallback(
                            new FinallyHandlerCancelReaction(this));
                    }
                }
                return maybePromise._then(
                    succeed, fail, undefined, this, undefined);
            }
        }
    }

    if (promise.isRejected()) {
        checkCancel(this);
        errorObj.e = reasonOrValue;
        return errorObj;
    } else {
        checkCancel(this);
        return reasonOrValue;
    }
}

Promise.prototype._passThrough = function(handler, type, success, fail) {
    if (typeof handler !== "function") return this.then();
    return this._then(success,
                      fail,
                      undefined,
                      new PassThroughHandlerContext(this, type, handler),
                      undefined);
};

Promise.prototype.lastly =
Promise.prototype["finally"] = function (handler) {
    return this._passThrough(handler,
                             0,
                             finallyHandler,
                             finallyHandler);
};


Promise.prototype.tap = function (handler) {
    return this._passThrough(handler, 1, finallyHandler);
};

Promise.prototype.tapCatch = function (handlerOrPredicate) {
    var len = arguments.length;
    if(len === 1) {
        return this._passThrough(handlerOrPredicate,
                                 1,
                                 undefined,
                                 finallyHandler);
    } else {
         var catchInstances = new Array(len - 1),
            j = 0, i;
        for (i = 0; i < len - 1; ++i) {
            var item = arguments[i];
            if (util.isObject(item)) {
                catchInstances[j++] = item;
            } else {
                return Promise.reject(new TypeError(
                    "tapCatch statement predicate: "
                    + "expecting an object but got " + util.classString(item)
                ));
            }
        }
        catchInstances.length = j;
        var handler = arguments[i];
        return this._passThrough(catchFilter(catchInstances, handler, this),
                                 1,
                                 undefined,
                                 finallyHandler);
    }

};

return PassThroughHandlerContext;
};

},{"./catch_filter":7,"./util":36}],16:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise,
                          apiRejection,
                          INTERNAL,
                          tryConvertToPromise,
                          Proxyable,
                          debug) {
var errors = _dereq_("./errors");
var TypeError = errors.TypeError;
var util = _dereq_("./util");
var errorObj = util.errorObj;
var tryCatch = util.tryCatch;
var yieldHandlers = [];

function promiseFromYieldHandler(value, yieldHandlers, traceParent) {
    for (var i = 0; i < yieldHandlers.length; ++i) {
        traceParent._pushContext();
        var result = tryCatch(yieldHandlers[i])(value);
        traceParent._popContext();
        if (result === errorObj) {
            traceParent._pushContext();
            var ret = Promise.reject(errorObj.e);
            traceParent._popContext();
            return ret;
        }
        var maybePromise = tryConvertToPromise(result, traceParent);
        if (maybePromise instanceof Promise) return maybePromise;
    }
    return null;
}

function PromiseSpawn(generatorFunction, receiver, yieldHandler, stack) {
    if (debug.cancellation()) {
        var internal = new Promise(INTERNAL);
        var _finallyPromise = this._finallyPromise = new Promise(INTERNAL);
        this._promise = internal.lastly(function() {
            return _finallyPromise;
        });
        internal._captureStackTrace();
        internal._setOnCancel(this);
    } else {
        var promise = this._promise = new Promise(INTERNAL);
        promise._captureStackTrace();
    }
    this._stack = stack;
    this._generatorFunction = generatorFunction;
    this._receiver = receiver;
    this._generator = undefined;
    this._yieldHandlers = typeof yieldHandler === "function"
        ? [yieldHandler].concat(yieldHandlers)
        : yieldHandlers;
    this._yieldedPromise = null;
    this._cancellationPhase = false;
}
util.inherits(PromiseSpawn, Proxyable);

PromiseSpawn.prototype._isResolved = function() {
    return this._promise === null;
};

PromiseSpawn.prototype._cleanup = function() {
    this._promise = this._generator = null;
    if (debug.cancellation() && this._finallyPromise !== null) {
        this._finallyPromise._fulfill();
        this._finallyPromise = null;
    }
};

PromiseSpawn.prototype._promiseCancelled = function() {
    if (this._isResolved()) return;
    var implementsReturn = typeof this._generator["return"] !== "undefined";

    var result;
    if (!implementsReturn) {
        var reason = new Promise.CancellationError(
            "generator .return() sentinel");
        Promise.coroutine.returnSentinel = reason;
        this._promise._attachExtraTrace(reason);
        this._promise._pushContext();
        result = tryCatch(this._generator["throw"]).call(this._generator,
                                                         reason);
        this._promise._popContext();
    } else {
        this._promise._pushContext();
        result = tryCatch(this._generator["return"]).call(this._generator,
                                                          undefined);
        this._promise._popContext();
    }
    this._cancellationPhase = true;
    this._yieldedPromise = null;
    this._continue(result);
};

PromiseSpawn.prototype._promiseFulfilled = function(value) {
    this._yieldedPromise = null;
    this._promise._pushContext();
    var result = tryCatch(this._generator.next).call(this._generator, value);
    this._promise._popContext();
    this._continue(result);
};

PromiseSpawn.prototype._promiseRejected = function(reason) {
    this._yieldedPromise = null;
    this._promise._attachExtraTrace(reason);
    this._promise._pushContext();
    var result = tryCatch(this._generator["throw"])
        .call(this._generator, reason);
    this._promise._popContext();
    this._continue(result);
};

PromiseSpawn.prototype._resultCancelled = function() {
    if (this._yieldedPromise instanceof Promise) {
        var promise = this._yieldedPromise;
        this._yieldedPromise = null;
        promise.cancel();
    }
};

PromiseSpawn.prototype.promise = function () {
    return this._promise;
};

PromiseSpawn.prototype._run = function () {
    this._generator = this._generatorFunction.call(this._receiver);
    this._receiver =
        this._generatorFunction = undefined;
    this._promiseFulfilled(undefined);
};

PromiseSpawn.prototype._continue = function (result) {
    var promise = this._promise;
    if (result === errorObj) {
        this._cleanup();
        if (this._cancellationPhase) {
            return promise.cancel();
        } else {
            return promise._rejectCallback(result.e, false);
        }
    }

    var value = result.value;
    if (result.done === true) {
        this._cleanup();
        if (this._cancellationPhase) {
            return promise.cancel();
        } else {
            return promise._resolveCallback(value);
        }
    } else {
        var maybePromise = tryConvertToPromise(value, this._promise);
        if (!(maybePromise instanceof Promise)) {
            maybePromise =
                promiseFromYieldHandler(maybePromise,
                                        this._yieldHandlers,
                                        this._promise);
            if (maybePromise === null) {
                this._promiseRejected(
                    new TypeError(
                        "A value %s was yielded that could not be treated as a promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a\u000a".replace("%s", String(value)) +
                        "From coroutine:\u000a" +
                        this._stack.split("\n").slice(1, -7).join("\n")
                    )
                );
                return;
            }
        }
        maybePromise = maybePromise._target();
        var bitField = maybePromise._bitField;
        ;
        if (((bitField & 50397184) === 0)) {
            this._yieldedPromise = maybePromise;
            maybePromise._proxy(this, null);
        } else if (((bitField & 33554432) !== 0)) {
            Promise._async.invoke(
                this._promiseFulfilled, this, maybePromise._value()
            );
        } else if (((bitField & 16777216) !== 0)) {
            Promise._async.invoke(
                this._promiseRejected, this, maybePromise._reason()
            );
        } else {
            this._promiseCancelled();
        }
    }
};

Promise.coroutine = function (generatorFunction, options) {
    if (typeof generatorFunction !== "function") {
        throw new TypeError("generatorFunction must be a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    var yieldHandler = Object(options).yieldHandler;
    var PromiseSpawn$ = PromiseSpawn;
    var stack = new Error().stack;
    return function () {
        var generator = generatorFunction.apply(this, arguments);
        var spawn = new PromiseSpawn$(undefined, undefined, yieldHandler,
                                      stack);
        var ret = spawn.promise();
        spawn._generator = generator;
        spawn._promiseFulfilled(undefined);
        return ret;
    };
};

Promise.coroutine.addYieldHandler = function(fn) {
    if (typeof fn !== "function") {
        throw new TypeError("expecting a function but got " + util.classString(fn));
    }
    yieldHandlers.push(fn);
};

Promise.spawn = function (generatorFunction) {
    debug.deprecated("Promise.spawn()", "Promise.coroutine()");
    if (typeof generatorFunction !== "function") {
        return apiRejection("generatorFunction must be a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    var spawn = new PromiseSpawn(generatorFunction, this);
    var ret = spawn.promise();
    spawn._run(Promise.spawn);
    return ret;
};
};

},{"./errors":12,"./util":36}],17:[function(_dereq_,module,exports){
"use strict";
module.exports =
function(Promise, PromiseArray, tryConvertToPromise, INTERNAL, async,
         getDomain) {
var util = _dereq_("./util");
var canEvaluate = util.canEvaluate;
var tryCatch = util.tryCatch;
var errorObj = util.errorObj;
var reject;

if (false) {
if (canEvaluate) {
    var thenCallback = function(i) {
        return new Function("value", "holder", "                             \n\
            'use strict';                                                    \n\
            holder.pIndex = value;                                           \n\
            holder.checkFulfillment(this);                                   \n\
            ".replace(/Index/g, i));
    };

    var promiseSetter = function(i) {
        return new Function("promise", "holder", "                           \n\
            'use strict';                                                    \n\
            holder.pIndex = promise;                                         \n\
            ".replace(/Index/g, i));
    };

    var generateHolderClass = function(total) {
        var props = new Array(total);
        for (var i = 0; i < props.length; ++i) {
            props[i] = "this.p" + (i+1);
        }
        var assignment = props.join(" = ") + " = null;";
        var cancellationCode= "var promise;\n" + props.map(function(prop) {
            return "                                                         \n\
                promise = " + prop + ";                                      \n\
                if (promise instanceof Promise) {                            \n\
                    promise.cancel();                                        \n\
                }                                                            \n\
            ";
        }).join("\n");
        var passedArguments = props.join(", ");
        var name = "Holder$" + total;


        var code = "return function(tryCatch, errorObj, Promise, async) {    \n\
            'use strict';                                                    \n\
            function [TheName](fn) {                                         \n\
                [TheProperties]                                              \n\
                this.fn = fn;                                                \n\
                this.asyncNeeded = true;                                     \n\
                this.now = 0;                                                \n\
            }                                                                \n\
                                                                             \n\
            [TheName].prototype._callFunction = function(promise) {          \n\
                promise._pushContext();                                      \n\
                var ret = tryCatch(this.fn)([ThePassedArguments]);           \n\
                promise._popContext();                                       \n\
                if (ret === errorObj) {                                      \n\
                    promise._rejectCallback(ret.e, false);                   \n\
                } else {                                                     \n\
                    promise._resolveCallback(ret);                           \n\
                }                                                            \n\
            };                                                               \n\
                                                                             \n\
            [TheName].prototype.checkFulfillment = function(promise) {       \n\
                var now = ++this.now;                                        \n\
                if (now === [TheTotal]) {                                    \n\
                    if (this.asyncNeeded) {                                  \n\
                        async.invoke(this._callFunction, this, promise);     \n\
                    } else {                                                 \n\
                        this._callFunction(promise);                         \n\
                    }                                                        \n\
                                                                             \n\
                }                                                            \n\
            };                                                               \n\
                                                                             \n\
            [TheName].prototype._resultCancelled = function() {              \n\
                [CancellationCode]                                           \n\
            };                                                               \n\
                                                                             \n\
            return [TheName];                                                \n\
        }(tryCatch, errorObj, Promise, async);                               \n\
        ";

        code = code.replace(/\[TheName\]/g, name)
            .replace(/\[TheTotal\]/g, total)
            .replace(/\[ThePassedArguments\]/g, passedArguments)
            .replace(/\[TheProperties\]/g, assignment)
            .replace(/\[CancellationCode\]/g, cancellationCode);

        return new Function("tryCatch", "errorObj", "Promise", "async", code)
                           (tryCatch, errorObj, Promise, async);
    };

    var holderClasses = [];
    var thenCallbacks = [];
    var promiseSetters = [];

    for (var i = 0; i < 8; ++i) {
        holderClasses.push(generateHolderClass(i + 1));
        thenCallbacks.push(thenCallback(i + 1));
        promiseSetters.push(promiseSetter(i + 1));
    }

    reject = function (reason) {
        this._reject(reason);
    };
}}

Promise.join = function () {
    var last = arguments.length - 1;
    var fn;
    if (last > 0 && typeof arguments[last] === "function") {
        fn = arguments[last];
        if (false) {
            if (last <= 8 && canEvaluate) {
                var ret = new Promise(INTERNAL);
                ret._captureStackTrace();
                var HolderClass = holderClasses[last - 1];
                var holder = new HolderClass(fn);
                var callbacks = thenCallbacks;

                for (var i = 0; i < last; ++i) {
                    var maybePromise = tryConvertToPromise(arguments[i], ret);
                    if (maybePromise instanceof Promise) {
                        maybePromise = maybePromise._target();
                        var bitField = maybePromise._bitField;
                        ;
                        if (((bitField & 50397184) === 0)) {
                            maybePromise._then(callbacks[i], reject,
                                               undefined, ret, holder);
                            promiseSetters[i](maybePromise, holder);
                            holder.asyncNeeded = false;
                        } else if (((bitField & 33554432) !== 0)) {
                            callbacks[i].call(ret,
                                              maybePromise._value(), holder);
                        } else if (((bitField & 16777216) !== 0)) {
                            ret._reject(maybePromise._reason());
                        } else {
                            ret._cancel();
                        }
                    } else {
                        callbacks[i].call(ret, maybePromise, holder);
                    }
                }

                if (!ret._isFateSealed()) {
                    if (holder.asyncNeeded) {
                        var domain = getDomain();
                        if (domain !== null) {
                            holder.fn = util.domainBind(domain, holder.fn);
                        }
                    }
                    ret._setAsyncGuaranteed();
                    ret._setOnCancel(holder);
                }
                return ret;
            }
        }
    }
    var args = [].slice.call(arguments);;
    if (fn) args.pop();
    var ret = new PromiseArray(args).promise();
    return fn !== undefined ? ret.spread(fn) : ret;
};

};

},{"./util":36}],18:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise,
                          PromiseArray,
                          apiRejection,
                          tryConvertToPromise,
                          INTERNAL,
                          debug) {
var getDomain = Promise._getDomain;
var util = _dereq_("./util");
var tryCatch = util.tryCatch;
var errorObj = util.errorObj;
var async = Promise._async;

function MappingPromiseArray(promises, fn, limit, _filter) {
    this.constructor$(promises);
    this._promise._captureStackTrace();
    var domain = getDomain();
    this._callback = domain === null ? fn : util.domainBind(domain, fn);
    this._preservedValues = _filter === INTERNAL
        ? new Array(this.length())
        : null;
    this._limit = limit;
    this._inFlight = 0;
    this._queue = [];
    async.invoke(this._asyncInit, this, undefined);
}
util.inherits(MappingPromiseArray, PromiseArray);

MappingPromiseArray.prototype._asyncInit = function() {
    this._init$(undefined, -2);
};

MappingPromiseArray.prototype._init = function () {};

MappingPromiseArray.prototype._promiseFulfilled = function (value, index) {
    var values = this._values;
    var length = this.length();
    var preservedValues = this._preservedValues;
    var limit = this._limit;

    if (index < 0) {
        index = (index * -1) - 1;
        values[index] = value;
        if (limit >= 1) {
            this._inFlight--;
            this._drainQueue();
            if (this._isResolved()) return true;
        }
    } else {
        if (limit >= 1 && this._inFlight >= limit) {
            values[index] = value;
            this._queue.push(index);
            return false;
        }
        if (preservedValues !== null) preservedValues[index] = value;

        var promise = this._promise;
        var callback = this._callback;
        var receiver = promise._boundValue();
        promise._pushContext();
        var ret = tryCatch(callback).call(receiver, value, index, length);
        var promiseCreated = promise._popContext();
        debug.checkForgottenReturns(
            ret,
            promiseCreated,
            preservedValues !== null ? "Promise.filter" : "Promise.map",
            promise
        );
        if (ret === errorObj) {
            this._reject(ret.e);
            return true;
        }

        var maybePromise = tryConvertToPromise(ret, this._promise);
        if (maybePromise instanceof Promise) {
            maybePromise = maybePromise._target();
            var bitField = maybePromise._bitField;
            ;
            if (((bitField & 50397184) === 0)) {
                if (limit >= 1) this._inFlight++;
                values[index] = maybePromise;
                maybePromise._proxy(this, (index + 1) * -1);
                return false;
            } else if (((bitField & 33554432) !== 0)) {
                ret = maybePromise._value();
            } else if (((bitField & 16777216) !== 0)) {
                this._reject(maybePromise._reason());
                return true;
            } else {
                this._cancel();
                return true;
            }
        }
        values[index] = ret;
    }
    var totalResolved = ++this._totalResolved;
    if (totalResolved >= length) {
        if (preservedValues !== null) {
            this._filter(values, preservedValues);
        } else {
            this._resolve(values);
        }
        return true;
    }
    return false;
};

MappingPromiseArray.prototype._drainQueue = function () {
    var queue = this._queue;
    var limit = this._limit;
    var values = this._values;
    while (queue.length > 0 && this._inFlight < limit) {
        if (this._isResolved()) return;
        var index = queue.pop();
        this._promiseFulfilled(values[index], index);
    }
};

MappingPromiseArray.prototype._filter = function (booleans, values) {
    var len = values.length;
    var ret = new Array(len);
    var j = 0;
    for (var i = 0; i < len; ++i) {
        if (booleans[i]) ret[j++] = values[i];
    }
    ret.length = j;
    this._resolve(ret);
};

MappingPromiseArray.prototype.preservedValues = function () {
    return this._preservedValues;
};

function map(promises, fn, options, _filter) {
    if (typeof fn !== "function") {
        return apiRejection("expecting a function but got " + util.classString(fn));
    }

    var limit = 0;
    if (options !== undefined) {
        if (typeof options === "object" && options !== null) {
            if (typeof options.concurrency !== "number") {
                return Promise.reject(
                    new TypeError("'concurrency' must be a number but it is " +
                                    util.classString(options.concurrency)));
            }
            limit = options.concurrency;
        } else {
            return Promise.reject(new TypeError(
                            "options argument must be an object but it is " +
                             util.classString(options)));
        }
    }
    limit = typeof limit === "number" &&
        isFinite(limit) && limit >= 1 ? limit : 0;
    return new MappingPromiseArray(promises, fn, limit, _filter).promise();
}

Promise.prototype.map = function (fn, options) {
    return map(this, fn, options, null);
};

Promise.map = function (promises, fn, options, _filter) {
    return map(promises, fn, options, _filter);
};


};

},{"./util":36}],19:[function(_dereq_,module,exports){
"use strict";
module.exports =
function(Promise, INTERNAL, tryConvertToPromise, apiRejection, debug) {
var util = _dereq_("./util");
var tryCatch = util.tryCatch;

Promise.method = function (fn) {
    if (typeof fn !== "function") {
        throw new Promise.TypeError("expecting a function but got " + util.classString(fn));
    }
    return function () {
        var ret = new Promise(INTERNAL);
        ret._captureStackTrace();
        ret._pushContext();
        var value = tryCatch(fn).apply(this, arguments);
        var promiseCreated = ret._popContext();
        debug.checkForgottenReturns(
            value, promiseCreated, "Promise.method", ret);
        ret._resolveFromSyncValue(value);
        return ret;
    };
};

Promise.attempt = Promise["try"] = function (fn) {
    if (typeof fn !== "function") {
        return apiRejection("expecting a function but got " + util.classString(fn));
    }
    var ret = new Promise(INTERNAL);
    ret._captureStackTrace();
    ret._pushContext();
    var value;
    if (arguments.length > 1) {
        debug.deprecated("calling Promise.try with more than 1 argument");
        var arg = arguments[1];
        var ctx = arguments[2];
        value = util.isArray(arg) ? tryCatch(fn).apply(ctx, arg)
                                  : tryCatch(fn).call(ctx, arg);
    } else {
        value = tryCatch(fn)();
    }
    var promiseCreated = ret._popContext();
    debug.checkForgottenReturns(
        value, promiseCreated, "Promise.try", ret);
    ret._resolveFromSyncValue(value);
    return ret;
};

Promise.prototype._resolveFromSyncValue = function (value) {
    if (value === util.errorObj) {
        this._rejectCallback(value.e, false);
    } else {
        this._resolveCallback(value, true);
    }
};
};

},{"./util":36}],20:[function(_dereq_,module,exports){
"use strict";
var util = _dereq_("./util");
var maybeWrapAsError = util.maybeWrapAsError;
var errors = _dereq_("./errors");
var OperationalError = errors.OperationalError;
var es5 = _dereq_("./es5");

function isUntypedError(obj) {
    return obj instanceof Error &&
        es5.getPrototypeOf(obj) === Error.prototype;
}

var rErrorKey = /^(?:name|message|stack|cause)$/;
function wrapAsOperationalError(obj) {
    var ret;
    if (isUntypedError(obj)) {
        ret = new OperationalError(obj);
        ret.name = obj.name;
        ret.message = obj.message;
        ret.stack = obj.stack;
        var keys = es5.keys(obj);
        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!rErrorKey.test(key)) {
                ret[key] = obj[key];
            }
        }
        return ret;
    }
    util.markAsOriginatingFromRejection(obj);
    return obj;
}

function nodebackForPromise(promise, multiArgs) {
    return function(err, value) {
        if (promise === null) return;
        if (err) {
            var wrapped = wrapAsOperationalError(maybeWrapAsError(err));
            promise._attachExtraTrace(wrapped);
            promise._reject(wrapped);
        } else if (!multiArgs) {
            promise._fulfill(value);
        } else {
            var args = [].slice.call(arguments, 1);;
            promise._fulfill(args);
        }
        promise = null;
    };
}

module.exports = nodebackForPromise;

},{"./errors":12,"./es5":13,"./util":36}],21:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise) {
var util = _dereq_("./util");
var async = Promise._async;
var tryCatch = util.tryCatch;
var errorObj = util.errorObj;

function spreadAdapter(val, nodeback) {
    var promise = this;
    if (!util.isArray(val)) return successAdapter.call(promise, val, nodeback);
    var ret =
        tryCatch(nodeback).apply(promise._boundValue(), [null].concat(val));
    if (ret === errorObj) {
        async.throwLater(ret.e);
    }
}

function successAdapter(val, nodeback) {
    var promise = this;
    var receiver = promise._boundValue();
    var ret = val === undefined
        ? tryCatch(nodeback).call(receiver, null)
        : tryCatch(nodeback).call(receiver, null, val);
    if (ret === errorObj) {
        async.throwLater(ret.e);
    }
}
function errorAdapter(reason, nodeback) {
    var promise = this;
    if (!reason) {
        var newReason = new Error(reason + "");
        newReason.cause = reason;
        reason = newReason;
    }
    var ret = tryCatch(nodeback).call(promise._boundValue(), reason);
    if (ret === errorObj) {
        async.throwLater(ret.e);
    }
}

Promise.prototype.asCallback = Promise.prototype.nodeify = function (nodeback,
                                                                     options) {
    if (typeof nodeback == "function") {
        var adapter = successAdapter;
        if (options !== undefined && Object(options).spread) {
            adapter = spreadAdapter;
        }
        this._then(
            adapter,
            errorAdapter,
            undefined,
            this,
            nodeback
        );
    }
    return this;
};
};

},{"./util":36}],22:[function(_dereq_,module,exports){
"use strict";
module.exports = function() {
var makeSelfResolutionError = function () {
    return new TypeError("circular promise resolution chain\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
};
var reflectHandler = function() {
    return new Promise.PromiseInspection(this._target());
};
var apiRejection = function(msg) {
    return Promise.reject(new TypeError(msg));
};
function Proxyable() {}
var UNDEFINED_BINDING = {};
var util = _dereq_("./util");

var getDomain;
if (util.isNode) {
    getDomain = function() {
        var ret = process.domain;
        if (ret === undefined) ret = null;
        return ret;
    };
} else {
    getDomain = function() {
        return null;
    };
}
util.notEnumerableProp(Promise, "_getDomain", getDomain);

var es5 = _dereq_("./es5");
var Async = _dereq_("./async");
var async = new Async();
es5.defineProperty(Promise, "_async", {value: async});
var errors = _dereq_("./errors");
var TypeError = Promise.TypeError = errors.TypeError;
Promise.RangeError = errors.RangeError;
var CancellationError = Promise.CancellationError = errors.CancellationError;
Promise.TimeoutError = errors.TimeoutError;
Promise.OperationalError = errors.OperationalError;
Promise.RejectionError = errors.OperationalError;
Promise.AggregateError = errors.AggregateError;
var INTERNAL = function(){};
var APPLY = {};
var NEXT_FILTER = {};
var tryConvertToPromise = _dereq_("./thenables")(Promise, INTERNAL);
var PromiseArray =
    _dereq_("./promise_array")(Promise, INTERNAL,
                               tryConvertToPromise, apiRejection, Proxyable);
var Context = _dereq_("./context")(Promise);
 /*jshint unused:false*/
var createContext = Context.create;
var debug = _dereq_("./debuggability")(Promise, Context);
var CapturedTrace = debug.CapturedTrace;
var PassThroughHandlerContext =
    _dereq_("./finally")(Promise, tryConvertToPromise, NEXT_FILTER);
var catchFilter = _dereq_("./catch_filter")(NEXT_FILTER);
var nodebackForPromise = _dereq_("./nodeback");
var errorObj = util.errorObj;
var tryCatch = util.tryCatch;
function check(self, executor) {
    if (self == null || self.constructor !== Promise) {
        throw new TypeError("the promise constructor cannot be invoked directly\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    if (typeof executor !== "function") {
        throw new TypeError("expecting a function but got " + util.classString(executor));
    }

}

function Promise(executor) {
    if (executor !== INTERNAL) {
        check(this, executor);
    }
    this._bitField = 0;
    this._fulfillmentHandler0 = undefined;
    this._rejectionHandler0 = undefined;
    this._promise0 = undefined;
    this._receiver0 = undefined;
    this._resolveFromExecutor(executor);
    this._promiseCreated();
    this._fireEvent("promiseCreated", this);
}

Promise.prototype.toString = function () {
    return "[object Promise]";
};

Promise.prototype.caught = Promise.prototype["catch"] = function (fn) {
    var len = arguments.length;
    if (len > 1) {
        var catchInstances = new Array(len - 1),
            j = 0, i;
        for (i = 0; i < len - 1; ++i) {
            var item = arguments[i];
            if (util.isObject(item)) {
                catchInstances[j++] = item;
            } else {
                return apiRejection("Catch statement predicate: " +
                    "expecting an object but got " + util.classString(item));
            }
        }
        catchInstances.length = j;
        fn = arguments[i];
        return this.then(undefined, catchFilter(catchInstances, fn, this));
    }
    return this.then(undefined, fn);
};

Promise.prototype.reflect = function () {
    return this._then(reflectHandler,
        reflectHandler, undefined, this, undefined);
};

Promise.prototype.then = function (didFulfill, didReject) {
    if (debug.warnings() && arguments.length > 0 &&
        typeof didFulfill !== "function" &&
        typeof didReject !== "function") {
        var msg = ".then() only accepts functions but was passed: " +
                util.classString(didFulfill);
        if (arguments.length > 1) {
            msg += ", " + util.classString(didReject);
        }
        this._warn(msg);
    }
    return this._then(didFulfill, didReject, undefined, undefined, undefined);
};

Promise.prototype.done = function (didFulfill, didReject) {
    var promise =
        this._then(didFulfill, didReject, undefined, undefined, undefined);
    promise._setIsFinal();
};

Promise.prototype.spread = function (fn) {
    if (typeof fn !== "function") {
        return apiRejection("expecting a function but got " + util.classString(fn));
    }
    return this.all()._then(fn, undefined, undefined, APPLY, undefined);
};

Promise.prototype.toJSON = function () {
    var ret = {
        isFulfilled: false,
        isRejected: false,
        fulfillmentValue: undefined,
        rejectionReason: undefined
    };
    if (this.isFulfilled()) {
        ret.fulfillmentValue = this.value();
        ret.isFulfilled = true;
    } else if (this.isRejected()) {
        ret.rejectionReason = this.reason();
        ret.isRejected = true;
    }
    return ret;
};

Promise.prototype.all = function () {
    if (arguments.length > 0) {
        this._warn(".all() was passed arguments but it does not take any");
    }
    return new PromiseArray(this).promise();
};

Promise.prototype.error = function (fn) {
    return this.caught(util.originatesFromRejection, fn);
};

Promise.getNewLibraryCopy = module.exports;

Promise.is = function (val) {
    return val instanceof Promise;
};

Promise.fromNode = Promise.fromCallback = function(fn) {
    var ret = new Promise(INTERNAL);
    ret._captureStackTrace();
    var multiArgs = arguments.length > 1 ? !!Object(arguments[1]).multiArgs
                                         : false;
    var result = tryCatch(fn)(nodebackForPromise(ret, multiArgs));
    if (result === errorObj) {
        ret._rejectCallback(result.e, true);
    }
    if (!ret._isFateSealed()) ret._setAsyncGuaranteed();
    return ret;
};

Promise.all = function (promises) {
    return new PromiseArray(promises).promise();
};

Promise.cast = function (obj) {
    var ret = tryConvertToPromise(obj);
    if (!(ret instanceof Promise)) {
        ret = new Promise(INTERNAL);
        ret._captureStackTrace();
        ret._setFulfilled();
        ret._rejectionHandler0 = obj;
    }
    return ret;
};

Promise.resolve = Promise.fulfilled = Promise.cast;

Promise.reject = Promise.rejected = function (reason) {
    var ret = new Promise(INTERNAL);
    ret._captureStackTrace();
    ret._rejectCallback(reason, true);
    return ret;
};

Promise.setScheduler = function(fn) {
    if (typeof fn !== "function") {
        throw new TypeError("expecting a function but got " + util.classString(fn));
    }
    return async.setScheduler(fn);
};

Promise.prototype._then = function (
    didFulfill,
    didReject,
    _,    receiver,
    internalData
) {
    var haveInternalData = internalData !== undefined;
    var promise = haveInternalData ? internalData : new Promise(INTERNAL);
    var target = this._target();
    var bitField = target._bitField;

    if (!haveInternalData) {
        promise._propagateFrom(this, 3);
        promise._captureStackTrace();
        if (receiver === undefined &&
            ((this._bitField & 2097152) !== 0)) {
            if (!((bitField & 50397184) === 0)) {
                receiver = this._boundValue();
            } else {
                receiver = target === this ? undefined : this._boundTo;
            }
        }
        this._fireEvent("promiseChained", this, promise);
    }

    var domain = getDomain();
    if (!((bitField & 50397184) === 0)) {
        var handler, value, settler = target._settlePromiseCtx;
        if (((bitField & 33554432) !== 0)) {
            value = target._rejectionHandler0;
            handler = didFulfill;
        } else if (((bitField & 16777216) !== 0)) {
            value = target._fulfillmentHandler0;
            handler = didReject;
            target._unsetRejectionIsUnhandled();
        } else {
            settler = target._settlePromiseLateCancellationObserver;
            value = new CancellationError("late cancellation observer");
            target._attachExtraTrace(value);
            handler = didReject;
        }

        async.invoke(settler, target, {
            handler: domain === null ? handler
                : (typeof handler === "function" &&
                    util.domainBind(domain, handler)),
            promise: promise,
            receiver: receiver,
            value: value
        });
    } else {
        target._addCallbacks(didFulfill, didReject, promise, receiver, domain);
    }

    return promise;
};

Promise.prototype._length = function () {
    return this._bitField & 65535;
};

Promise.prototype._isFateSealed = function () {
    return (this._bitField & 117506048) !== 0;
};

Promise.prototype._isFollowing = function () {
    return (this._bitField & 67108864) === 67108864;
};

Promise.prototype._setLength = function (len) {
    this._bitField = (this._bitField & -65536) |
        (len & 65535);
};

Promise.prototype._setFulfilled = function () {
    this._bitField = this._bitField | 33554432;
    this._fireEvent("promiseFulfilled", this);
};

Promise.prototype._setRejected = function () {
    this._bitField = this._bitField | 16777216;
    this._fireEvent("promiseRejected", this);
};

Promise.prototype._setFollowing = function () {
    this._bitField = this._bitField | 67108864;
    this._fireEvent("promiseResolved", this);
};

Promise.prototype._setIsFinal = function () {
    this._bitField = this._bitField | 4194304;
};

Promise.prototype._isFinal = function () {
    return (this._bitField & 4194304) > 0;
};

Promise.prototype._unsetCancelled = function() {
    this._bitField = this._bitField & (~65536);
};

Promise.prototype._setCancelled = function() {
    this._bitField = this._bitField | 65536;
    this._fireEvent("promiseCancelled", this);
};

Promise.prototype._setWillBeCancelled = function() {
    this._bitField = this._bitField | 8388608;
};

Promise.prototype._setAsyncGuaranteed = function() {
    if (async.hasCustomScheduler()) return;
    this._bitField = this._bitField | 134217728;
};

Promise.prototype._receiverAt = function (index) {
    var ret = index === 0 ? this._receiver0 : this[
            index * 4 - 4 + 3];
    if (ret === UNDEFINED_BINDING) {
        return undefined;
    } else if (ret === undefined && this._isBound()) {
        return this._boundValue();
    }
    return ret;
};

Promise.prototype._promiseAt = function (index) {
    return this[
            index * 4 - 4 + 2];
};

Promise.prototype._fulfillmentHandlerAt = function (index) {
    return this[
            index * 4 - 4 + 0];
};

Promise.prototype._rejectionHandlerAt = function (index) {
    return this[
            index * 4 - 4 + 1];
};

Promise.prototype._boundValue = function() {};

Promise.prototype._migrateCallback0 = function (follower) {
    var bitField = follower._bitField;
    var fulfill = follower._fulfillmentHandler0;
    var reject = follower._rejectionHandler0;
    var promise = follower._promise0;
    var receiver = follower._receiverAt(0);
    if (receiver === undefined) receiver = UNDEFINED_BINDING;
    this._addCallbacks(fulfill, reject, promise, receiver, null);
};

Promise.prototype._migrateCallbackAt = function (follower, index) {
    var fulfill = follower._fulfillmentHandlerAt(index);
    var reject = follower._rejectionHandlerAt(index);
    var promise = follower._promiseAt(index);
    var receiver = follower._receiverAt(index);
    if (receiver === undefined) receiver = UNDEFINED_BINDING;
    this._addCallbacks(fulfill, reject, promise, receiver, null);
};

Promise.prototype._addCallbacks = function (
    fulfill,
    reject,
    promise,
    receiver,
    domain
) {
    var index = this._length();

    if (index >= 65535 - 4) {
        index = 0;
        this._setLength(0);
    }

    if (index === 0) {
        this._promise0 = promise;
        this._receiver0 = receiver;
        if (typeof fulfill === "function") {
            this._fulfillmentHandler0 =
                domain === null ? fulfill : util.domainBind(domain, fulfill);
        }
        if (typeof reject === "function") {
            this._rejectionHandler0 =
                domain === null ? reject : util.domainBind(domain, reject);
        }
    } else {
        var base = index * 4 - 4;
        this[base + 2] = promise;
        this[base + 3] = receiver;
        if (typeof fulfill === "function") {
            this[base + 0] =
                domain === null ? fulfill : util.domainBind(domain, fulfill);
        }
        if (typeof reject === "function") {
            this[base + 1] =
                domain === null ? reject : util.domainBind(domain, reject);
        }
    }
    this._setLength(index + 1);
    return index;
};

Promise.prototype._proxy = function (proxyable, arg) {
    this._addCallbacks(undefined, undefined, arg, proxyable, null);
};

Promise.prototype._resolveCallback = function(value, shouldBind) {
    if (((this._bitField & 117506048) !== 0)) return;
    if (value === this)
        return this._rejectCallback(makeSelfResolutionError(), false);
    var maybePromise = tryConvertToPromise(value, this);
    if (!(maybePromise instanceof Promise)) return this._fulfill(value);

    if (shouldBind) this._propagateFrom(maybePromise, 2);

    var promise = maybePromise._target();

    if (promise === this) {
        this._reject(makeSelfResolutionError());
        return;
    }

    var bitField = promise._bitField;
    if (((bitField & 50397184) === 0)) {
        var len = this._length();
        if (len > 0) promise._migrateCallback0(this);
        for (var i = 1; i < len; ++i) {
            promise._migrateCallbackAt(this, i);
        }
        this._setFollowing();
        this._setLength(0);
        this._setFollowee(promise);
    } else if (((bitField & 33554432) !== 0)) {
        this._fulfill(promise._value());
    } else if (((bitField & 16777216) !== 0)) {
        this._reject(promise._reason());
    } else {
        var reason = new CancellationError("late cancellation observer");
        promise._attachExtraTrace(reason);
        this._reject(reason);
    }
};

Promise.prototype._rejectCallback =
function(reason, synchronous, ignoreNonErrorWarnings) {
    var trace = util.ensureErrorObject(reason);
    var hasStack = trace === reason;
    if (!hasStack && !ignoreNonErrorWarnings && debug.warnings()) {
        var message = "a promise was rejected with a non-error: " +
            util.classString(reason);
        this._warn(message, true);
    }
    this._attachExtraTrace(trace, synchronous ? hasStack : false);
    this._reject(reason);
};

Promise.prototype._resolveFromExecutor = function (executor) {
    if (executor === INTERNAL) return;
    var promise = this;
    this._captureStackTrace();
    this._pushContext();
    var synchronous = true;
    var r = this._execute(executor, function(value) {
        promise._resolveCallback(value);
    }, function (reason) {
        promise._rejectCallback(reason, synchronous);
    });
    synchronous = false;
    this._popContext();

    if (r !== undefined) {
        promise._rejectCallback(r, true);
    }
};

Promise.prototype._settlePromiseFromHandler = function (
    handler, receiver, value, promise
) {
    var bitField = promise._bitField;
    if (((bitField & 65536) !== 0)) return;
    promise._pushContext();
    var x;
    if (receiver === APPLY) {
        if (!value || typeof value.length !== "number") {
            x = errorObj;
            x.e = new TypeError("cannot .spread() a non-array: " +
                                    util.classString(value));
        } else {
            x = tryCatch(handler).apply(this._boundValue(), value);
        }
    } else {
        x = tryCatch(handler).call(receiver, value);
    }
    var promiseCreated = promise._popContext();
    bitField = promise._bitField;
    if (((bitField & 65536) !== 0)) return;

    if (x === NEXT_FILTER) {
        promise._reject(value);
    } else if (x === errorObj) {
        promise._rejectCallback(x.e, false);
    } else {
        debug.checkForgottenReturns(x, promiseCreated, "",  promise, this);
        promise._resolveCallback(x);
    }
};

Promise.prototype._target = function() {
    var ret = this;
    while (ret._isFollowing()) ret = ret._followee();
    return ret;
};

Promise.prototype._followee = function() {
    return this._rejectionHandler0;
};

Promise.prototype._setFollowee = function(promise) {
    this._rejectionHandler0 = promise;
};

Promise.prototype._settlePromise = function(promise, handler, receiver, value) {
    var isPromise = promise instanceof Promise;
    var bitField = this._bitField;
    var asyncGuaranteed = ((bitField & 134217728) !== 0);
    if (((bitField & 65536) !== 0)) {
        if (isPromise) promise._invokeInternalOnCancel();

        if (receiver instanceof PassThroughHandlerContext &&
            receiver.isFinallyHandler()) {
            receiver.cancelPromise = promise;
            if (tryCatch(handler).call(receiver, value) === errorObj) {
                promise._reject(errorObj.e);
            }
        } else if (handler === reflectHandler) {
            promise._fulfill(reflectHandler.call(receiver));
        } else if (receiver instanceof Proxyable) {
            receiver._promiseCancelled(promise);
        } else if (isPromise || promise instanceof PromiseArray) {
            promise._cancel();
        } else {
            receiver.cancel();
        }
    } else if (typeof handler === "function") {
        if (!isPromise) {
            handler.call(receiver, value, promise);
        } else {
            if (asyncGuaranteed) promise._setAsyncGuaranteed();
            this._settlePromiseFromHandler(handler, receiver, value, promise);
        }
    } else if (receiver instanceof Proxyable) {
        if (!receiver._isResolved()) {
            if (((bitField & 33554432) !== 0)) {
                receiver._promiseFulfilled(value, promise);
            } else {
                receiver._promiseRejected(value, promise);
            }
        }
    } else if (isPromise) {
        if (asyncGuaranteed) promise._setAsyncGuaranteed();
        if (((bitField & 33554432) !== 0)) {
            promise._fulfill(value);
        } else {
            promise._reject(value);
        }
    }
};

Promise.prototype._settlePromiseLateCancellationObserver = function(ctx) {
    var handler = ctx.handler;
    var promise = ctx.promise;
    var receiver = ctx.receiver;
    var value = ctx.value;
    if (typeof handler === "function") {
        if (!(promise instanceof Promise)) {
            handler.call(receiver, value, promise);
        } else {
            this._settlePromiseFromHandler(handler, receiver, value, promise);
        }
    } else if (promise instanceof Promise) {
        promise._reject(value);
    }
};

Promise.prototype._settlePromiseCtx = function(ctx) {
    this._settlePromise(ctx.promise, ctx.handler, ctx.receiver, ctx.value);
};

Promise.prototype._settlePromise0 = function(handler, value, bitField) {
    var promise = this._promise0;
    var receiver = this._receiverAt(0);
    this._promise0 = undefined;
    this._receiver0 = undefined;
    this._settlePromise(promise, handler, receiver, value);
};

Promise.prototype._clearCallbackDataAtIndex = function(index) {
    var base = index * 4 - 4;
    this[base + 2] =
    this[base + 3] =
    this[base + 0] =
    this[base + 1] = undefined;
};

Promise.prototype._fulfill = function (value) {
    var bitField = this._bitField;
    if (((bitField & 117506048) >>> 16)) return;
    if (value === this) {
        var err = makeSelfResolutionError();
        this._attachExtraTrace(err);
        return this._reject(err);
    }
    this._setFulfilled();
    this._rejectionHandler0 = value;

    if ((bitField & 65535) > 0) {
        if (((bitField & 134217728) !== 0)) {
            this._settlePromises();
        } else {
            async.settlePromises(this);
        }
    }
};

Promise.prototype._reject = function (reason) {
    var bitField = this._bitField;
    if (((bitField & 117506048) >>> 16)) return;
    this._setRejected();
    this._fulfillmentHandler0 = reason;

    if (this._isFinal()) {
        return async.fatalError(reason, util.isNode);
    }

    if ((bitField & 65535) > 0) {
        async.settlePromises(this);
    } else {
        this._ensurePossibleRejectionHandled();
    }
};

Promise.prototype._fulfillPromises = function (len, value) {
    for (var i = 1; i < len; i++) {
        var handler = this._fulfillmentHandlerAt(i);
        var promise = this._promiseAt(i);
        var receiver = this._receiverAt(i);
        this._clearCallbackDataAtIndex(i);
        this._settlePromise(promise, handler, receiver, value);
    }
};

Promise.prototype._rejectPromises = function (len, reason) {
    for (var i = 1; i < len; i++) {
        var handler = this._rejectionHandlerAt(i);
        var promise = this._promiseAt(i);
        var receiver = this._receiverAt(i);
        this._clearCallbackDataAtIndex(i);
        this._settlePromise(promise, handler, receiver, reason);
    }
};

Promise.prototype._settlePromises = function () {
    var bitField = this._bitField;
    var len = (bitField & 65535);

    if (len > 0) {
        if (((bitField & 16842752) !== 0)) {
            var reason = this._fulfillmentHandler0;
            this._settlePromise0(this._rejectionHandler0, reason, bitField);
            this._rejectPromises(len, reason);
        } else {
            var value = this._rejectionHandler0;
            this._settlePromise0(this._fulfillmentHandler0, value, bitField);
            this._fulfillPromises(len, value);
        }
        this._setLength(0);
    }
    this._clearCancellationData();
};

Promise.prototype._settledValue = function() {
    var bitField = this._bitField;
    if (((bitField & 33554432) !== 0)) {
        return this._rejectionHandler0;
    } else if (((bitField & 16777216) !== 0)) {
        return this._fulfillmentHandler0;
    }
};

function deferResolve(v) {this.promise._resolveCallback(v);}
function deferReject(v) {this.promise._rejectCallback(v, false);}

Promise.defer = Promise.pending = function() {
    debug.deprecated("Promise.defer", "new Promise");
    var promise = new Promise(INTERNAL);
    return {
        promise: promise,
        resolve: deferResolve,
        reject: deferReject
    };
};

util.notEnumerableProp(Promise,
                       "_makeSelfResolutionError",
                       makeSelfResolutionError);

_dereq_("./method")(Promise, INTERNAL, tryConvertToPromise, apiRejection,
    debug);
_dereq_("./bind")(Promise, INTERNAL, tryConvertToPromise, debug);
_dereq_("./cancel")(Promise, PromiseArray, apiRejection, debug);
_dereq_("./direct_resolve")(Promise);
_dereq_("./synchronous_inspection")(Promise);
_dereq_("./join")(
    Promise, PromiseArray, tryConvertToPromise, INTERNAL, async, getDomain);
Promise.Promise = Promise;
Promise.version = "3.5.0";
_dereq_('./map.js')(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
_dereq_('./call_get.js')(Promise);
_dereq_('./using.js')(Promise, apiRejection, tryConvertToPromise, createContext, INTERNAL, debug);
_dereq_('./timers.js')(Promise, INTERNAL, debug);
_dereq_('./generators.js')(Promise, apiRejection, INTERNAL, tryConvertToPromise, Proxyable, debug);
_dereq_('./nodeify.js')(Promise);
_dereq_('./promisify.js')(Promise, INTERNAL);
_dereq_('./props.js')(Promise, PromiseArray, tryConvertToPromise, apiRejection);
_dereq_('./race.js')(Promise, INTERNAL, tryConvertToPromise, apiRejection);
_dereq_('./reduce.js')(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
_dereq_('./settle.js')(Promise, PromiseArray, debug);
_dereq_('./some.js')(Promise, PromiseArray, apiRejection);
_dereq_('./filter.js')(Promise, INTERNAL);
_dereq_('./each.js')(Promise, INTERNAL);
_dereq_('./any.js')(Promise);
                                                         
    util.toFastProperties(Promise);                                          
    util.toFastProperties(Promise.prototype);                                
    function fillTypes(value) {                                              
        var p = new Promise(INTERNAL);                                       
        p._fulfillmentHandler0 = value;                                      
        p._rejectionHandler0 = value;                                        
        p._promise0 = value;                                                 
        p._receiver0 = value;                                                
    }                                                                        
    // Complete slack tracking, opt out of field-type tracking and           
    // stabilize map                                                         
    fillTypes({a: 1});                                                       
    fillTypes({b: 2});                                                       
    fillTypes({c: 3});                                                       
    fillTypes(1);                                                            
    fillTypes(function(){});                                                 
    fillTypes(undefined);                                                    
    fillTypes(false);                                                        
    fillTypes(new Promise(INTERNAL));                                        
    debug.setBounds(Async.firstLineError, util.lastLineError);               
    return Promise;                                                          

};

},{"./any.js":1,"./async":2,"./bind":3,"./call_get.js":5,"./cancel":6,"./catch_filter":7,"./context":8,"./debuggability":9,"./direct_resolve":10,"./each.js":11,"./errors":12,"./es5":13,"./filter.js":14,"./finally":15,"./generators.js":16,"./join":17,"./map.js":18,"./method":19,"./nodeback":20,"./nodeify.js":21,"./promise_array":23,"./promisify.js":24,"./props.js":25,"./race.js":27,"./reduce.js":28,"./settle.js":30,"./some.js":31,"./synchronous_inspection":32,"./thenables":33,"./timers.js":34,"./using.js":35,"./util":36}],23:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL, tryConvertToPromise,
    apiRejection, Proxyable) {
var util = _dereq_("./util");
var isArray = util.isArray;

function toResolutionValue(val) {
    switch(val) {
    case -2: return [];
    case -3: return {};
    case -6: return new Map();
    }
}

function PromiseArray(values) {
    var promise = this._promise = new Promise(INTERNAL);
    if (values instanceof Promise) {
        promise._propagateFrom(values, 3);
    }
    promise._setOnCancel(this);
    this._values = values;
    this._length = 0;
    this._totalResolved = 0;
    this._init(undefined, -2);
}
util.inherits(PromiseArray, Proxyable);

PromiseArray.prototype.length = function () {
    return this._length;
};

PromiseArray.prototype.promise = function () {
    return this._promise;
};

PromiseArray.prototype._init = function init(_, resolveValueIfEmpty) {
    var values = tryConvertToPromise(this._values, this._promise);
    if (values instanceof Promise) {
        values = values._target();
        var bitField = values._bitField;
        ;
        this._values = values;

        if (((bitField & 50397184) === 0)) {
            this._promise._setAsyncGuaranteed();
            return values._then(
                init,
                this._reject,
                undefined,
                this,
                resolveValueIfEmpty
           );
        } else if (((bitField & 33554432) !== 0)) {
            values = values._value();
        } else if (((bitField & 16777216) !== 0)) {
            return this._reject(values._reason());
        } else {
            return this._cancel();
        }
    }
    values = util.asArray(values);
    if (values === null) {
        var err = apiRejection(
            "expecting an array or an iterable object but got " + util.classString(values)).reason();
        this._promise._rejectCallback(err, false);
        return;
    }

    if (values.length === 0) {
        if (resolveValueIfEmpty === -5) {
            this._resolveEmptyArray();
        }
        else {
            this._resolve(toResolutionValue(resolveValueIfEmpty));
        }
        return;
    }
    this._iterate(values);
};

PromiseArray.prototype._iterate = function(values) {
    var len = this.getActualLength(values.length);
    this._length = len;
    this._values = this.shouldCopyValues() ? new Array(len) : this._values;
    var result = this._promise;
    var isResolved = false;
    var bitField = null;
    for (var i = 0; i < len; ++i) {
        var maybePromise = tryConvertToPromise(values[i], result);

        if (maybePromise instanceof Promise) {
            maybePromise = maybePromise._target();
            bitField = maybePromise._bitField;
        } else {
            bitField = null;
        }

        if (isResolved) {
            if (bitField !== null) {
                maybePromise.suppressUnhandledRejections();
            }
        } else if (bitField !== null) {
            if (((bitField & 50397184) === 0)) {
                maybePromise._proxy(this, i);
                this._values[i] = maybePromise;
            } else if (((bitField & 33554432) !== 0)) {
                isResolved = this._promiseFulfilled(maybePromise._value(), i);
            } else if (((bitField & 16777216) !== 0)) {
                isResolved = this._promiseRejected(maybePromise._reason(), i);
            } else {
                isResolved = this._promiseCancelled(i);
            }
        } else {
            isResolved = this._promiseFulfilled(maybePromise, i);
        }
    }
    if (!isResolved) result._setAsyncGuaranteed();
};

PromiseArray.prototype._isResolved = function () {
    return this._values === null;
};

PromiseArray.prototype._resolve = function (value) {
    this._values = null;
    this._promise._fulfill(value);
};

PromiseArray.prototype._cancel = function() {
    if (this._isResolved() || !this._promise._isCancellable()) return;
    this._values = null;
    this._promise._cancel();
};

PromiseArray.prototype._reject = function (reason) {
    this._values = null;
    this._promise._rejectCallback(reason, false);
};

PromiseArray.prototype._promiseFulfilled = function (value, index) {
    this._values[index] = value;
    var totalResolved = ++this._totalResolved;
    if (totalResolved >= this._length) {
        this._resolve(this._values);
        return true;
    }
    return false;
};

PromiseArray.prototype._promiseCancelled = function() {
    this._cancel();
    return true;
};

PromiseArray.prototype._promiseRejected = function (reason) {
    this._totalResolved++;
    this._reject(reason);
    return true;
};

PromiseArray.prototype._resultCancelled = function() {
    if (this._isResolved()) return;
    var values = this._values;
    this._cancel();
    if (values instanceof Promise) {
        values.cancel();
    } else {
        for (var i = 0; i < values.length; ++i) {
            if (values[i] instanceof Promise) {
                values[i].cancel();
            }
        }
    }
};

PromiseArray.prototype.shouldCopyValues = function () {
    return true;
};

PromiseArray.prototype.getActualLength = function (len) {
    return len;
};

return PromiseArray;
};

},{"./util":36}],24:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL) {
var THIS = {};
var util = _dereq_("./util");
var nodebackForPromise = _dereq_("./nodeback");
var withAppended = util.withAppended;
var maybeWrapAsError = util.maybeWrapAsError;
var canEvaluate = util.canEvaluate;
var TypeError = _dereq_("./errors").TypeError;
var defaultSuffix = "Async";
var defaultPromisified = {__isPromisified__: true};
var noCopyProps = [
    "arity",    "length",
    "name",
    "arguments",
    "caller",
    "callee",
    "prototype",
    "__isPromisified__"
];
var noCopyPropsPattern = new RegExp("^(?:" + noCopyProps.join("|") + ")$");

var defaultFilter = function(name) {
    return util.isIdentifier(name) &&
        name.charAt(0) !== "_" &&
        name !== "constructor";
};

function propsFilter(key) {
    return !noCopyPropsPattern.test(key);
}

function isPromisified(fn) {
    try {
        return fn.__isPromisified__ === true;
    }
    catch (e) {
        return false;
    }
}

function hasPromisified(obj, key, suffix) {
    var val = util.getDataPropertyOrDefault(obj, key + suffix,
                                            defaultPromisified);
    return val ? isPromisified(val) : false;
}
function checkValid(ret, suffix, suffixRegexp) {
    for (var i = 0; i < ret.length; i += 2) {
        var key = ret[i];
        if (suffixRegexp.test(key)) {
            var keyWithoutAsyncSuffix = key.replace(suffixRegexp, "");
            for (var j = 0; j < ret.length; j += 2) {
                if (ret[j] === keyWithoutAsyncSuffix) {
                    throw new TypeError("Cannot promisify an API that has normal methods with '%s'-suffix\u000a\u000a    See http://goo.gl/MqrFmX\u000a"
                        .replace("%s", suffix));
                }
            }
        }
    }
}

function promisifiableMethods(obj, suffix, suffixRegexp, filter) {
    var keys = util.inheritedDataKeys(obj);
    var ret = [];
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var value = obj[key];
        var passesDefaultFilter = filter === defaultFilter
            ? true : defaultFilter(key, value, obj);
        if (typeof value === "function" &&
            !isPromisified(value) &&
            !hasPromisified(obj, key, suffix) &&
            filter(key, value, obj, passesDefaultFilter)) {
            ret.push(key, value);
        }
    }
    checkValid(ret, suffix, suffixRegexp);
    return ret;
}

var escapeIdentRegex = function(str) {
    return str.replace(/([$])/, "\\$");
};

var makeNodePromisifiedEval;
if (false) {
var switchCaseArgumentOrder = function(likelyArgumentCount) {
    var ret = [likelyArgumentCount];
    var min = Math.max(0, likelyArgumentCount - 1 - 3);
    for(var i = likelyArgumentCount - 1; i >= min; --i) {
        ret.push(i);
    }
    for(var i = likelyArgumentCount + 1; i <= 3; ++i) {
        ret.push(i);
    }
    return ret;
};

var argumentSequence = function(argumentCount) {
    return util.filledRange(argumentCount, "_arg", "");
};

var parameterDeclaration = function(parameterCount) {
    return util.filledRange(
        Math.max(parameterCount, 3), "_arg", "");
};

var parameterCount = function(fn) {
    if (typeof fn.length === "number") {
        return Math.max(Math.min(fn.length, 1023 + 1), 0);
    }
    return 0;
};

makeNodePromisifiedEval =
function(callback, receiver, originalName, fn, _, multiArgs) {
    var newParameterCount = Math.max(0, parameterCount(fn) - 1);
    var argumentOrder = switchCaseArgumentOrder(newParameterCount);
    var shouldProxyThis = typeof callback === "string" || receiver === THIS;

    function generateCallForArgumentCount(count) {
        var args = argumentSequence(count).join(", ");
        var comma = count > 0 ? ", " : "";
        var ret;
        if (shouldProxyThis) {
            ret = "ret = callback.call(this, {{args}}, nodeback); break;\n";
        } else {
            ret = receiver === undefined
                ? "ret = callback({{args}}, nodeback); break;\n"
                : "ret = callback.call(receiver, {{args}}, nodeback); break;\n";
        }
        return ret.replace("{{args}}", args).replace(", ", comma);
    }

    function generateArgumentSwitchCase() {
        var ret = "";
        for (var i = 0; i < argumentOrder.length; ++i) {
            ret += "case " + argumentOrder[i] +":" +
                generateCallForArgumentCount(argumentOrder[i]);
        }

        ret += "                                                             \n\
        default:                                                             \n\
            var args = new Array(len + 1);                                   \n\
            var i = 0;                                                       \n\
            for (var i = 0; i < len; ++i) {                                  \n\
               args[i] = arguments[i];                                       \n\
            }                                                                \n\
            args[i] = nodeback;                                              \n\
            [CodeForCall]                                                    \n\
            break;                                                           \n\
        ".replace("[CodeForCall]", (shouldProxyThis
                                ? "ret = callback.apply(this, args);\n"
                                : "ret = callback.apply(receiver, args);\n"));
        return ret;
    }

    var getFunctionCode = typeof callback === "string"
                                ? ("this != null ? this['"+callback+"'] : fn")
                                : "fn";
    var body = "'use strict';                                                \n\
        var ret = function (Parameters) {                                    \n\
            'use strict';                                                    \n\
            var len = arguments.length;                                      \n\
            var promise = new Promise(INTERNAL);                             \n\
            promise._captureStackTrace();                                    \n\
            var nodeback = nodebackForPromise(promise, " + multiArgs + ");   \n\
            var ret;                                                         \n\
            var callback = tryCatch([GetFunctionCode]);                      \n\
            switch(len) {                                                    \n\
                [CodeForSwitchCase]                                          \n\
            }                                                                \n\
            if (ret === errorObj) {                                          \n\
                promise._rejectCallback(maybeWrapAsError(ret.e), true, true);\n\
            }                                                                \n\
            if (!promise._isFateSealed()) promise._setAsyncGuaranteed();     \n\
            return promise;                                                  \n\
        };                                                                   \n\
        notEnumerableProp(ret, '__isPromisified__', true);                   \n\
        return ret;                                                          \n\
    ".replace("[CodeForSwitchCase]", generateArgumentSwitchCase())
        .replace("[GetFunctionCode]", getFunctionCode);
    body = body.replace("Parameters", parameterDeclaration(newParameterCount));
    return new Function("Promise",
                        "fn",
                        "receiver",
                        "withAppended",
                        "maybeWrapAsError",
                        "nodebackForPromise",
                        "tryCatch",
                        "errorObj",
                        "notEnumerableProp",
                        "INTERNAL",
                        body)(
                    Promise,
                    fn,
                    receiver,
                    withAppended,
                    maybeWrapAsError,
                    nodebackForPromise,
                    util.tryCatch,
                    util.errorObj,
                    util.notEnumerableProp,
                    INTERNAL);
};
}

function makeNodePromisifiedClosure(callback, receiver, _, fn, __, multiArgs) {
    var defaultThis = (function() {return this;})();
    var method = callback;
    if (typeof method === "string") {
        callback = fn;
    }
    function promisified() {
        var _receiver = receiver;
        if (receiver === THIS) _receiver = this;
        var promise = new Promise(INTERNAL);
        promise._captureStackTrace();
        var cb = typeof method === "string" && this !== defaultThis
            ? this[method] : callback;
        var fn = nodebackForPromise(promise, multiArgs);
        try {
            cb.apply(_receiver, withAppended(arguments, fn));
        } catch(e) {
            promise._rejectCallback(maybeWrapAsError(e), true, true);
        }
        if (!promise._isFateSealed()) promise._setAsyncGuaranteed();
        return promise;
    }
    util.notEnumerableProp(promisified, "__isPromisified__", true);
    return promisified;
}

var makeNodePromisified = canEvaluate
    ? makeNodePromisifiedEval
    : makeNodePromisifiedClosure;

function promisifyAll(obj, suffix, filter, promisifier, multiArgs) {
    var suffixRegexp = new RegExp(escapeIdentRegex(suffix) + "$");
    var methods =
        promisifiableMethods(obj, suffix, suffixRegexp, filter);

    for (var i = 0, len = methods.length; i < len; i+= 2) {
        var key = methods[i];
        var fn = methods[i+1];
        var promisifiedKey = key + suffix;
        if (promisifier === makeNodePromisified) {
            obj[promisifiedKey] =
                makeNodePromisified(key, THIS, key, fn, suffix, multiArgs);
        } else {
            var promisified = promisifier(fn, function() {
                return makeNodePromisified(key, THIS, key,
                                           fn, suffix, multiArgs);
            });
            util.notEnumerableProp(promisified, "__isPromisified__", true);
            obj[promisifiedKey] = promisified;
        }
    }
    util.toFastProperties(obj);
    return obj;
}

function promisify(callback, receiver, multiArgs) {
    return makeNodePromisified(callback, receiver, undefined,
                                callback, null, multiArgs);
}

Promise.promisify = function (fn, options) {
    if (typeof fn !== "function") {
        throw new TypeError("expecting a function but got " + util.classString(fn));
    }
    if (isPromisified(fn)) {
        return fn;
    }
    options = Object(options);
    var receiver = options.context === undefined ? THIS : options.context;
    var multiArgs = !!options.multiArgs;
    var ret = promisify(fn, receiver, multiArgs);
    util.copyDescriptors(fn, ret, propsFilter);
    return ret;
};

Promise.promisifyAll = function (target, options) {
    if (typeof target !== "function" && typeof target !== "object") {
        throw new TypeError("the target of promisifyAll must be an object or a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    options = Object(options);
    var multiArgs = !!options.multiArgs;
    var suffix = options.suffix;
    if (typeof suffix !== "string") suffix = defaultSuffix;
    var filter = options.filter;
    if (typeof filter !== "function") filter = defaultFilter;
    var promisifier = options.promisifier;
    if (typeof promisifier !== "function") promisifier = makeNodePromisified;

    if (!util.isIdentifier(suffix)) {
        throw new RangeError("suffix must be a valid identifier\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }

    var keys = util.inheritedDataKeys(target);
    for (var i = 0; i < keys.length; ++i) {
        var value = target[keys[i]];
        if (keys[i] !== "constructor" &&
            util.isClass(value)) {
            promisifyAll(value.prototype, suffix, filter, promisifier,
                multiArgs);
            promisifyAll(value, suffix, filter, promisifier, multiArgs);
        }
    }

    return promisifyAll(target, suffix, filter, promisifier, multiArgs);
};
};


},{"./errors":12,"./nodeback":20,"./util":36}],25:[function(_dereq_,module,exports){
"use strict";
module.exports = function(
    Promise, PromiseArray, tryConvertToPromise, apiRejection) {
var util = _dereq_("./util");
var isObject = util.isObject;
var es5 = _dereq_("./es5");
var Es6Map;
if (typeof Map === "function") Es6Map = Map;

var mapToEntries = (function() {
    var index = 0;
    var size = 0;

    function extractEntry(value, key) {
        this[index] = value;
        this[index + size] = key;
        index++;
    }

    return function mapToEntries(map) {
        size = map.size;
        index = 0;
        var ret = new Array(map.size * 2);
        map.forEach(extractEntry, ret);
        return ret;
    };
})();

var entriesToMap = function(entries) {
    var ret = new Es6Map();
    var length = entries.length / 2 | 0;
    for (var i = 0; i < length; ++i) {
        var key = entries[length + i];
        var value = entries[i];
        ret.set(key, value);
    }
    return ret;
};

function PropertiesPromiseArray(obj) {
    var isMap = false;
    var entries;
    if (Es6Map !== undefined && obj instanceof Es6Map) {
        entries = mapToEntries(obj);
        isMap = true;
    } else {
        var keys = es5.keys(obj);
        var len = keys.length;
        entries = new Array(len * 2);
        for (var i = 0; i < len; ++i) {
            var key = keys[i];
            entries[i] = obj[key];
            entries[i + len] = key;
        }
    }
    this.constructor$(entries);
    this._isMap = isMap;
    this._init$(undefined, isMap ? -6 : -3);
}
util.inherits(PropertiesPromiseArray, PromiseArray);

PropertiesPromiseArray.prototype._init = function () {};

PropertiesPromiseArray.prototype._promiseFulfilled = function (value, index) {
    this._values[index] = value;
    var totalResolved = ++this._totalResolved;
    if (totalResolved >= this._length) {
        var val;
        if (this._isMap) {
            val = entriesToMap(this._values);
        } else {
            val = {};
            var keyOffset = this.length();
            for (var i = 0, len = this.length(); i < len; ++i) {
                val[this._values[i + keyOffset]] = this._values[i];
            }
        }
        this._resolve(val);
        return true;
    }
    return false;
};

PropertiesPromiseArray.prototype.shouldCopyValues = function () {
    return false;
};

PropertiesPromiseArray.prototype.getActualLength = function (len) {
    return len >> 1;
};

function props(promises) {
    var ret;
    var castValue = tryConvertToPromise(promises);

    if (!isObject(castValue)) {
        return apiRejection("cannot await properties of a non-object\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    } else if (castValue instanceof Promise) {
        ret = castValue._then(
            Promise.props, undefined, undefined, undefined, undefined);
    } else {
        ret = new PropertiesPromiseArray(castValue).promise();
    }

    if (castValue instanceof Promise) {
        ret._propagateFrom(castValue, 2);
    }
    return ret;
}

Promise.prototype.props = function () {
    return props(this);
};

Promise.props = function (promises) {
    return props(promises);
};
};

},{"./es5":13,"./util":36}],26:[function(_dereq_,module,exports){
"use strict";
function arrayMove(src, srcIndex, dst, dstIndex, len) {
    for (var j = 0; j < len; ++j) {
        dst[j + dstIndex] = src[j + srcIndex];
        src[j + srcIndex] = void 0;
    }
}

function Queue(capacity) {
    this._capacity = capacity;
    this._length = 0;
    this._front = 0;
}

Queue.prototype._willBeOverCapacity = function (size) {
    return this._capacity < size;
};

Queue.prototype._pushOne = function (arg) {
    var length = this.length();
    this._checkCapacity(length + 1);
    var i = (this._front + length) & (this._capacity - 1);
    this[i] = arg;
    this._length = length + 1;
};

Queue.prototype.push = function (fn, receiver, arg) {
    var length = this.length() + 3;
    if (this._willBeOverCapacity(length)) {
        this._pushOne(fn);
        this._pushOne(receiver);
        this._pushOne(arg);
        return;
    }
    var j = this._front + length - 3;
    this._checkCapacity(length);
    var wrapMask = this._capacity - 1;
    this[(j + 0) & wrapMask] = fn;
    this[(j + 1) & wrapMask] = receiver;
    this[(j + 2) & wrapMask] = arg;
    this._length = length;
};

Queue.prototype.shift = function () {
    var front = this._front,
        ret = this[front];

    this[front] = undefined;
    this._front = (front + 1) & (this._capacity - 1);
    this._length--;
    return ret;
};

Queue.prototype.length = function () {
    return this._length;
};

Queue.prototype._checkCapacity = function (size) {
    if (this._capacity < size) {
        this._resizeTo(this._capacity << 1);
    }
};

Queue.prototype._resizeTo = function (capacity) {
    var oldCapacity = this._capacity;
    this._capacity = capacity;
    var front = this._front;
    var length = this._length;
    var moveItemsCount = (front + length) & (oldCapacity - 1);
    arrayMove(this, 0, this, oldCapacity, moveItemsCount);
};

module.exports = Queue;

},{}],27:[function(_dereq_,module,exports){
"use strict";
module.exports = function(
    Promise, INTERNAL, tryConvertToPromise, apiRejection) {
var util = _dereq_("./util");

var raceLater = function (promise) {
    return promise.then(function(array) {
        return race(array, promise);
    });
};

function race(promises, parent) {
    var maybePromise = tryConvertToPromise(promises);

    if (maybePromise instanceof Promise) {
        return raceLater(maybePromise);
    } else {
        promises = util.asArray(promises);
        if (promises === null)
            return apiRejection("expecting an array or an iterable object but got " + util.classString(promises));
    }

    var ret = new Promise(INTERNAL);
    if (parent !== undefined) {
        ret._propagateFrom(parent, 3);
    }
    var fulfill = ret._fulfill;
    var reject = ret._reject;
    for (var i = 0, len = promises.length; i < len; ++i) {
        var val = promises[i];

        if (val === undefined && !(i in promises)) {
            continue;
        }

        Promise.cast(val)._then(fulfill, reject, undefined, ret, null);
    }
    return ret;
}

Promise.race = function (promises) {
    return race(promises, undefined);
};

Promise.prototype.race = function () {
    return race(this, undefined);
};

};

},{"./util":36}],28:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise,
                          PromiseArray,
                          apiRejection,
                          tryConvertToPromise,
                          INTERNAL,
                          debug) {
var getDomain = Promise._getDomain;
var util = _dereq_("./util");
var tryCatch = util.tryCatch;

function ReductionPromiseArray(promises, fn, initialValue, _each) {
    this.constructor$(promises);
    var domain = getDomain();
    this._fn = domain === null ? fn : util.domainBind(domain, fn);
    if (initialValue !== undefined) {
        initialValue = Promise.resolve(initialValue);
        initialValue._attachCancellationCallback(this);
    }
    this._initialValue = initialValue;
    this._currentCancellable = null;
    if(_each === INTERNAL) {
        this._eachValues = Array(this._length);
    } else if (_each === 0) {
        this._eachValues = null;
    } else {
        this._eachValues = undefined;
    }
    this._promise._captureStackTrace();
    this._init$(undefined, -5);
}
util.inherits(ReductionPromiseArray, PromiseArray);

ReductionPromiseArray.prototype._gotAccum = function(accum) {
    if (this._eachValues !== undefined && 
        this._eachValues !== null && 
        accum !== INTERNAL) {
        this._eachValues.push(accum);
    }
};

ReductionPromiseArray.prototype._eachComplete = function(value) {
    if (this._eachValues !== null) {
        this._eachValues.push(value);
    }
    return this._eachValues;
};

ReductionPromiseArray.prototype._init = function() {};

ReductionPromiseArray.prototype._resolveEmptyArray = function() {
    this._resolve(this._eachValues !== undefined ? this._eachValues
                                                 : this._initialValue);
};

ReductionPromiseArray.prototype.shouldCopyValues = function () {
    return false;
};

ReductionPromiseArray.prototype._resolve = function(value) {
    this._promise._resolveCallback(value);
    this._values = null;
};

ReductionPromiseArray.prototype._resultCancelled = function(sender) {
    if (sender === this._initialValue) return this._cancel();
    if (this._isResolved()) return;
    this._resultCancelled$();
    if (this._currentCancellable instanceof Promise) {
        this._currentCancellable.cancel();
    }
    if (this._initialValue instanceof Promise) {
        this._initialValue.cancel();
    }
};

ReductionPromiseArray.prototype._iterate = function (values) {
    this._values = values;
    var value;
    var i;
    var length = values.length;
    if (this._initialValue !== undefined) {
        value = this._initialValue;
        i = 0;
    } else {
        value = Promise.resolve(values[0]);
        i = 1;
    }

    this._currentCancellable = value;

    if (!value.isRejected()) {
        for (; i < length; ++i) {
            var ctx = {
                accum: null,
                value: values[i],
                index: i,
                length: length,
                array: this
            };
            value = value._then(gotAccum, undefined, undefined, ctx, undefined);
        }
    }

    if (this._eachValues !== undefined) {
        value = value
            ._then(this._eachComplete, undefined, undefined, this, undefined);
    }
    value._then(completed, completed, undefined, value, this);
};

Promise.prototype.reduce = function (fn, initialValue) {
    return reduce(this, fn, initialValue, null);
};

Promise.reduce = function (promises, fn, initialValue, _each) {
    return reduce(promises, fn, initialValue, _each);
};

function completed(valueOrReason, array) {
    if (this.isFulfilled()) {
        array._resolve(valueOrReason);
    } else {
        array._reject(valueOrReason);
    }
}

function reduce(promises, fn, initialValue, _each) {
    if (typeof fn !== "function") {
        return apiRejection("expecting a function but got " + util.classString(fn));
    }
    var array = new ReductionPromiseArray(promises, fn, initialValue, _each);
    return array.promise();
}

function gotAccum(accum) {
    this.accum = accum;
    this.array._gotAccum(accum);
    var value = tryConvertToPromise(this.value, this.array._promise);
    if (value instanceof Promise) {
        this.array._currentCancellable = value;
        return value._then(gotValue, undefined, undefined, this, undefined);
    } else {
        return gotValue.call(this, value);
    }
}

function gotValue(value) {
    var array = this.array;
    var promise = array._promise;
    var fn = tryCatch(array._fn);
    promise._pushContext();
    var ret;
    if (array._eachValues !== undefined) {
        ret = fn.call(promise._boundValue(), value, this.index, this.length);
    } else {
        ret = fn.call(promise._boundValue(),
                              this.accum, value, this.index, this.length);
    }
    if (ret instanceof Promise) {
        array._currentCancellable = ret;
    }
    var promiseCreated = promise._popContext();
    debug.checkForgottenReturns(
        ret,
        promiseCreated,
        array._eachValues !== undefined ? "Promise.each" : "Promise.reduce",
        promise
    );
    return ret;
}
};

},{"./util":36}],29:[function(_dereq_,module,exports){
"use strict";
var util = _dereq_("./util");
var schedule;
var noAsyncScheduler = function() {
    throw new Error("No async scheduler available\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
};
var NativePromise = util.getNativePromise();
if (util.isNode && typeof MutationObserver === "undefined") {
    var GlobalSetImmediate = global.setImmediate;
    var ProcessNextTick = process.nextTick;
    schedule = util.isRecentNode
                ? function(fn) { GlobalSetImmediate.call(global, fn); }
                : function(fn) { ProcessNextTick.call(process, fn); };
} else if (typeof NativePromise === "function" &&
           typeof NativePromise.resolve === "function") {
    var nativePromise = NativePromise.resolve();
    schedule = function(fn) {
        nativePromise.then(fn);
    };
} else if ((typeof MutationObserver !== "undefined") &&
          !(typeof window !== "undefined" &&
            window.navigator &&
            (window.navigator.standalone || window.cordova))) {
    schedule = (function() {
        var div = document.createElement("div");
        var opts = {attributes: true};
        var toggleScheduled = false;
        var div2 = document.createElement("div");
        var o2 = new MutationObserver(function() {
            div.classList.toggle("foo");
            toggleScheduled = false;
        });
        o2.observe(div2, opts);

        var scheduleToggle = function() {
            if (toggleScheduled) return;
            toggleScheduled = true;
            div2.classList.toggle("foo");
        };

        return function schedule(fn) {
            var o = new MutationObserver(function() {
                o.disconnect();
                fn();
            });
            o.observe(div, opts);
            scheduleToggle();
        };
    })();
} else if (typeof setImmediate !== "undefined") {
    schedule = function (fn) {
        setImmediate(fn);
    };
} else if (typeof setTimeout !== "undefined") {
    schedule = function (fn) {
        setTimeout(fn, 0);
    };
} else {
    schedule = noAsyncScheduler;
}
module.exports = schedule;

},{"./util":36}],30:[function(_dereq_,module,exports){
"use strict";
module.exports =
    function(Promise, PromiseArray, debug) {
var PromiseInspection = Promise.PromiseInspection;
var util = _dereq_("./util");

function SettledPromiseArray(values) {
    this.constructor$(values);
}
util.inherits(SettledPromiseArray, PromiseArray);

SettledPromiseArray.prototype._promiseResolved = function (index, inspection) {
    this._values[index] = inspection;
    var totalResolved = ++this._totalResolved;
    if (totalResolved >= this._length) {
        this._resolve(this._values);
        return true;
    }
    return false;
};

SettledPromiseArray.prototype._promiseFulfilled = function (value, index) {
    var ret = new PromiseInspection();
    ret._bitField = 33554432;
    ret._settledValueField = value;
    return this._promiseResolved(index, ret);
};
SettledPromiseArray.prototype._promiseRejected = function (reason, index) {
    var ret = new PromiseInspection();
    ret._bitField = 16777216;
    ret._settledValueField = reason;
    return this._promiseResolved(index, ret);
};

Promise.settle = function (promises) {
    debug.deprecated(".settle()", ".reflect()");
    return new SettledPromiseArray(promises).promise();
};

Promise.prototype.settle = function () {
    return Promise.settle(this);
};
};

},{"./util":36}],31:[function(_dereq_,module,exports){
"use strict";
module.exports =
function(Promise, PromiseArray, apiRejection) {
var util = _dereq_("./util");
var RangeError = _dereq_("./errors").RangeError;
var AggregateError = _dereq_("./errors").AggregateError;
var isArray = util.isArray;
var CANCELLATION = {};


function SomePromiseArray(values) {
    this.constructor$(values);
    this._howMany = 0;
    this._unwrap = false;
    this._initialized = false;
}
util.inherits(SomePromiseArray, PromiseArray);

SomePromiseArray.prototype._init = function () {
    if (!this._initialized) {
        return;
    }
    if (this._howMany === 0) {
        this._resolve([]);
        return;
    }
    this._init$(undefined, -5);
    var isArrayResolved = isArray(this._values);
    if (!this._isResolved() &&
        isArrayResolved &&
        this._howMany > this._canPossiblyFulfill()) {
        this._reject(this._getRangeError(this.length()));
    }
};

SomePromiseArray.prototype.init = function () {
    this._initialized = true;
    this._init();
};

SomePromiseArray.prototype.setUnwrap = function () {
    this._unwrap = true;
};

SomePromiseArray.prototype.howMany = function () {
    return this._howMany;
};

SomePromiseArray.prototype.setHowMany = function (count) {
    this._howMany = count;
};

SomePromiseArray.prototype._promiseFulfilled = function (value) {
    this._addFulfilled(value);
    if (this._fulfilled() === this.howMany()) {
        this._values.length = this.howMany();
        if (this.howMany() === 1 && this._unwrap) {
            this._resolve(this._values[0]);
        } else {
            this._resolve(this._values);
        }
        return true;
    }
    return false;

};
SomePromiseArray.prototype._promiseRejected = function (reason) {
    this._addRejected(reason);
    return this._checkOutcome();
};

SomePromiseArray.prototype._promiseCancelled = function () {
    if (this._values instanceof Promise || this._values == null) {
        return this._cancel();
    }
    this._addRejected(CANCELLATION);
    return this._checkOutcome();
};

SomePromiseArray.prototype._checkOutcome = function() {
    if (this.howMany() > this._canPossiblyFulfill()) {
        var e = new AggregateError();
        for (var i = this.length(); i < this._values.length; ++i) {
            if (this._values[i] !== CANCELLATION) {
                e.push(this._values[i]);
            }
        }
        if (e.length > 0) {
            this._reject(e);
        } else {
            this._cancel();
        }
        return true;
    }
    return false;
};

SomePromiseArray.prototype._fulfilled = function () {
    return this._totalResolved;
};

SomePromiseArray.prototype._rejected = function () {
    return this._values.length - this.length();
};

SomePromiseArray.prototype._addRejected = function (reason) {
    this._values.push(reason);
};

SomePromiseArray.prototype._addFulfilled = function (value) {
    this._values[this._totalResolved++] = value;
};

SomePromiseArray.prototype._canPossiblyFulfill = function () {
    return this.length() - this._rejected();
};

SomePromiseArray.prototype._getRangeError = function (count) {
    var message = "Input array must contain at least " +
            this._howMany + " items but contains only " + count + " items";
    return new RangeError(message);
};

SomePromiseArray.prototype._resolveEmptyArray = function () {
    this._reject(this._getRangeError(0));
};

function some(promises, howMany) {
    if ((howMany | 0) !== howMany || howMany < 0) {
        return apiRejection("expecting a positive integer\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    var ret = new SomePromiseArray(promises);
    var promise = ret.promise();
    ret.setHowMany(howMany);
    ret.init();
    return promise;
}

Promise.some = function (promises, howMany) {
    return some(promises, howMany);
};

Promise.prototype.some = function (howMany) {
    return some(this, howMany);
};

Promise._SomePromiseArray = SomePromiseArray;
};

},{"./errors":12,"./util":36}],32:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise) {
function PromiseInspection(promise) {
    if (promise !== undefined) {
        promise = promise._target();
        this._bitField = promise._bitField;
        this._settledValueField = promise._isFateSealed()
            ? promise._settledValue() : undefined;
    }
    else {
        this._bitField = 0;
        this._settledValueField = undefined;
    }
}

PromiseInspection.prototype._settledValue = function() {
    return this._settledValueField;
};

var value = PromiseInspection.prototype.value = function () {
    if (!this.isFulfilled()) {
        throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    return this._settledValue();
};

var reason = PromiseInspection.prototype.error =
PromiseInspection.prototype.reason = function () {
    if (!this.isRejected()) {
        throw new TypeError("cannot get rejection reason of a non-rejected promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    return this._settledValue();
};

var isFulfilled = PromiseInspection.prototype.isFulfilled = function() {
    return (this._bitField & 33554432) !== 0;
};

var isRejected = PromiseInspection.prototype.isRejected = function () {
    return (this._bitField & 16777216) !== 0;
};

var isPending = PromiseInspection.prototype.isPending = function () {
    return (this._bitField & 50397184) === 0;
};

var isResolved = PromiseInspection.prototype.isResolved = function () {
    return (this._bitField & 50331648) !== 0;
};

PromiseInspection.prototype.isCancelled = function() {
    return (this._bitField & 8454144) !== 0;
};

Promise.prototype.__isCancelled = function() {
    return (this._bitField & 65536) === 65536;
};

Promise.prototype._isCancelled = function() {
    return this._target().__isCancelled();
};

Promise.prototype.isCancelled = function() {
    return (this._target()._bitField & 8454144) !== 0;
};

Promise.prototype.isPending = function() {
    return isPending.call(this._target());
};

Promise.prototype.isRejected = function() {
    return isRejected.call(this._target());
};

Promise.prototype.isFulfilled = function() {
    return isFulfilled.call(this._target());
};

Promise.prototype.isResolved = function() {
    return isResolved.call(this._target());
};

Promise.prototype.value = function() {
    return value.call(this._target());
};

Promise.prototype.reason = function() {
    var target = this._target();
    target._unsetRejectionIsUnhandled();
    return reason.call(target);
};

Promise.prototype._value = function() {
    return this._settledValue();
};

Promise.prototype._reason = function() {
    this._unsetRejectionIsUnhandled();
    return this._settledValue();
};

Promise.PromiseInspection = PromiseInspection;
};

},{}],33:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL) {
var util = _dereq_("./util");
var errorObj = util.errorObj;
var isObject = util.isObject;

function tryConvertToPromise(obj, context) {
    if (isObject(obj)) {
        if (obj instanceof Promise) return obj;
        var then = getThen(obj);
        if (then === errorObj) {
            if (context) context._pushContext();
            var ret = Promise.reject(then.e);
            if (context) context._popContext();
            return ret;
        } else if (typeof then === "function") {
            if (isAnyBluebirdPromise(obj)) {
                var ret = new Promise(INTERNAL);
                obj._then(
                    ret._fulfill,
                    ret._reject,
                    undefined,
                    ret,
                    null
                );
                return ret;
            }
            return doThenable(obj, then, context);
        }
    }
    return obj;
}

function doGetThen(obj) {
    return obj.then;
}

function getThen(obj) {
    try {
        return doGetThen(obj);
    } catch (e) {
        errorObj.e = e;
        return errorObj;
    }
}

var hasProp = {}.hasOwnProperty;
function isAnyBluebirdPromise(obj) {
    try {
        return hasProp.call(obj, "_promise0");
    } catch (e) {
        return false;
    }
}

function doThenable(x, then, context) {
    var promise = new Promise(INTERNAL);
    var ret = promise;
    if (context) context._pushContext();
    promise._captureStackTrace();
    if (context) context._popContext();
    var synchronous = true;
    var result = util.tryCatch(then).call(x, resolve, reject);
    synchronous = false;

    if (promise && result === errorObj) {
        promise._rejectCallback(result.e, true, true);
        promise = null;
    }

    function resolve(value) {
        if (!promise) return;
        promise._resolveCallback(value);
        promise = null;
    }

    function reject(reason) {
        if (!promise) return;
        promise._rejectCallback(reason, synchronous, true);
        promise = null;
    }
    return ret;
}

return tryConvertToPromise;
};

},{"./util":36}],34:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL, debug) {
var util = _dereq_("./util");
var TimeoutError = Promise.TimeoutError;

function HandleWrapper(handle)  {
    this.handle = handle;
}

HandleWrapper.prototype._resultCancelled = function() {
    clearTimeout(this.handle);
};

var afterValue = function(value) { return delay(+this).thenReturn(value); };
var delay = Promise.delay = function (ms, value) {
    var ret;
    var handle;
    if (value !== undefined) {
        ret = Promise.resolve(value)
                ._then(afterValue, null, null, ms, undefined);
        if (debug.cancellation() && value instanceof Promise) {
            ret._setOnCancel(value);
        }
    } else {
        ret = new Promise(INTERNAL);
        handle = setTimeout(function() { ret._fulfill(); }, +ms);
        if (debug.cancellation()) {
            ret._setOnCancel(new HandleWrapper(handle));
        }
        ret._captureStackTrace();
    }
    ret._setAsyncGuaranteed();
    return ret;
};

Promise.prototype.delay = function (ms) {
    return delay(ms, this);
};

var afterTimeout = function (promise, message, parent) {
    var err;
    if (typeof message !== "string") {
        if (message instanceof Error) {
            err = message;
        } else {
            err = new TimeoutError("operation timed out");
        }
    } else {
        err = new TimeoutError(message);
    }
    util.markAsOriginatingFromRejection(err);
    promise._attachExtraTrace(err);
    promise._reject(err);

    if (parent != null) {
        parent.cancel();
    }
};

function successClear(value) {
    clearTimeout(this.handle);
    return value;
}

function failureClear(reason) {
    clearTimeout(this.handle);
    throw reason;
}

Promise.prototype.timeout = function (ms, message) {
    ms = +ms;
    var ret, parent;

    var handleWrapper = new HandleWrapper(setTimeout(function timeoutTimeout() {
        if (ret.isPending()) {
            afterTimeout(ret, message, parent);
        }
    }, ms));

    if (debug.cancellation()) {
        parent = this.then();
        ret = parent._then(successClear, failureClear,
                            undefined, handleWrapper, undefined);
        ret._setOnCancel(handleWrapper);
    } else {
        ret = this._then(successClear, failureClear,
                            undefined, handleWrapper, undefined);
    }

    return ret;
};

};

},{"./util":36}],35:[function(_dereq_,module,exports){
"use strict";
module.exports = function (Promise, apiRejection, tryConvertToPromise,
    createContext, INTERNAL, debug) {
    var util = _dereq_("./util");
    var TypeError = _dereq_("./errors").TypeError;
    var inherits = _dereq_("./util").inherits;
    var errorObj = util.errorObj;
    var tryCatch = util.tryCatch;
    var NULL = {};

    function thrower(e) {
        setTimeout(function(){throw e;}, 0);
    }

    function castPreservingDisposable(thenable) {
        var maybePromise = tryConvertToPromise(thenable);
        if (maybePromise !== thenable &&
            typeof thenable._isDisposable === "function" &&
            typeof thenable._getDisposer === "function" &&
            thenable._isDisposable()) {
            maybePromise._setDisposable(thenable._getDisposer());
        }
        return maybePromise;
    }
    function dispose(resources, inspection) {
        var i = 0;
        var len = resources.length;
        var ret = new Promise(INTERNAL);
        function iterator() {
            if (i >= len) return ret._fulfill();
            var maybePromise = castPreservingDisposable(resources[i++]);
            if (maybePromise instanceof Promise &&
                maybePromise._isDisposable()) {
                try {
                    maybePromise = tryConvertToPromise(
                        maybePromise._getDisposer().tryDispose(inspection),
                        resources.promise);
                } catch (e) {
                    return thrower(e);
                }
                if (maybePromise instanceof Promise) {
                    return maybePromise._then(iterator, thrower,
                                              null, null, null);
                }
            }
            iterator();
        }
        iterator();
        return ret;
    }

    function Disposer(data, promise, context) {
        this._data = data;
        this._promise = promise;
        this._context = context;
    }

    Disposer.prototype.data = function () {
        return this._data;
    };

    Disposer.prototype.promise = function () {
        return this._promise;
    };

    Disposer.prototype.resource = function () {
        if (this.promise().isFulfilled()) {
            return this.promise().value();
        }
        return NULL;
    };

    Disposer.prototype.tryDispose = function(inspection) {
        var resource = this.resource();
        var context = this._context;
        if (context !== undefined) context._pushContext();
        var ret = resource !== NULL
            ? this.doDispose(resource, inspection) : null;
        if (context !== undefined) context._popContext();
        this._promise._unsetDisposable();
        this._data = null;
        return ret;
    };

    Disposer.isDisposer = function (d) {
        return (d != null &&
                typeof d.resource === "function" &&
                typeof d.tryDispose === "function");
    };

    function FunctionDisposer(fn, promise, context) {
        this.constructor$(fn, promise, context);
    }
    inherits(FunctionDisposer, Disposer);

    FunctionDisposer.prototype.doDispose = function (resource, inspection) {
        var fn = this.data();
        return fn.call(resource, resource, inspection);
    };

    function maybeUnwrapDisposer(value) {
        if (Disposer.isDisposer(value)) {
            this.resources[this.index]._setDisposable(value);
            return value.promise();
        }
        return value;
    }

    function ResourceList(length) {
        this.length = length;
        this.promise = null;
        this[length-1] = null;
    }

    ResourceList.prototype._resultCancelled = function() {
        var len = this.length;
        for (var i = 0; i < len; ++i) {
            var item = this[i];
            if (item instanceof Promise) {
                item.cancel();
            }
        }
    };

    Promise.using = function () {
        var len = arguments.length;
        if (len < 2) return apiRejection(
                        "you must pass at least 2 arguments to Promise.using");
        var fn = arguments[len - 1];
        if (typeof fn !== "function") {
            return apiRejection("expecting a function but got " + util.classString(fn));
        }
        var input;
        var spreadArgs = true;
        if (len === 2 && Array.isArray(arguments[0])) {
            input = arguments[0];
            len = input.length;
            spreadArgs = false;
        } else {
            input = arguments;
            len--;
        }
        var resources = new ResourceList(len);
        for (var i = 0; i < len; ++i) {
            var resource = input[i];
            if (Disposer.isDisposer(resource)) {
                var disposer = resource;
                resource = resource.promise();
                resource._setDisposable(disposer);
            } else {
                var maybePromise = tryConvertToPromise(resource);
                if (maybePromise instanceof Promise) {
                    resource =
                        maybePromise._then(maybeUnwrapDisposer, null, null, {
                            resources: resources,
                            index: i
                    }, undefined);
                }
            }
            resources[i] = resource;
        }

        var reflectedResources = new Array(resources.length);
        for (var i = 0; i < reflectedResources.length; ++i) {
            reflectedResources[i] = Promise.resolve(resources[i]).reflect();
        }

        var resultPromise = Promise.all(reflectedResources)
            .then(function(inspections) {
                for (var i = 0; i < inspections.length; ++i) {
                    var inspection = inspections[i];
                    if (inspection.isRejected()) {
                        errorObj.e = inspection.error();
                        return errorObj;
                    } else if (!inspection.isFulfilled()) {
                        resultPromise.cancel();
                        return;
                    }
                    inspections[i] = inspection.value();
                }
                promise._pushContext();

                fn = tryCatch(fn);
                var ret = spreadArgs
                    ? fn.apply(undefined, inspections) : fn(inspections);
                var promiseCreated = promise._popContext();
                debug.checkForgottenReturns(
                    ret, promiseCreated, "Promise.using", promise);
                return ret;
            });

        var promise = resultPromise.lastly(function() {
            var inspection = new Promise.PromiseInspection(resultPromise);
            return dispose(resources, inspection);
        });
        resources.promise = promise;
        promise._setOnCancel(resources);
        return promise;
    };

    Promise.prototype._setDisposable = function (disposer) {
        this._bitField = this._bitField | 131072;
        this._disposer = disposer;
    };

    Promise.prototype._isDisposable = function () {
        return (this._bitField & 131072) > 0;
    };

    Promise.prototype._getDisposer = function () {
        return this._disposer;
    };

    Promise.prototype._unsetDisposable = function () {
        this._bitField = this._bitField & (~131072);
        this._disposer = undefined;
    };

    Promise.prototype.disposer = function (fn) {
        if (typeof fn === "function") {
            return new FunctionDisposer(fn, this, createContext());
        }
        throw new TypeError();
    };

};

},{"./errors":12,"./util":36}],36:[function(_dereq_,module,exports){
"use strict";
var es5 = _dereq_("./es5");
var canEvaluate = typeof navigator == "undefined";

var errorObj = {e: {}};
var tryCatchTarget;
var globalObject = typeof self !== "undefined" ? self :
    typeof window !== "undefined" ? window :
    typeof global !== "undefined" ? global :
    this !== undefined ? this : null;

function tryCatcher() {
    try {
        var target = tryCatchTarget;
        tryCatchTarget = null;
        return target.apply(this, arguments);
    } catch (e) {
        errorObj.e = e;
        return errorObj;
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}

var inherits = function(Child, Parent) {
    var hasProp = {}.hasOwnProperty;

    function T() {
        this.constructor = Child;
        this.constructor$ = Parent;
        for (var propertyName in Parent.prototype) {
            if (hasProp.call(Parent.prototype, propertyName) &&
                propertyName.charAt(propertyName.length-1) !== "$"
           ) {
                this[propertyName + "$"] = Parent.prototype[propertyName];
            }
        }
    }
    T.prototype = Parent.prototype;
    Child.prototype = new T();
    return Child.prototype;
};


function isPrimitive(val) {
    return val == null || val === true || val === false ||
        typeof val === "string" || typeof val === "number";

}

function isObject(value) {
    return typeof value === "function" ||
           typeof value === "object" && value !== null;
}

function maybeWrapAsError(maybeError) {
    if (!isPrimitive(maybeError)) return maybeError;

    return new Error(safeToString(maybeError));
}

function withAppended(target, appendee) {
    var len = target.length;
    var ret = new Array(len + 1);
    var i;
    for (i = 0; i < len; ++i) {
        ret[i] = target[i];
    }
    ret[i] = appendee;
    return ret;
}

function getDataPropertyOrDefault(obj, key, defaultValue) {
    if (es5.isES5) {
        var desc = Object.getOwnPropertyDescriptor(obj, key);

        if (desc != null) {
            return desc.get == null && desc.set == null
                    ? desc.value
                    : defaultValue;
        }
    } else {
        return {}.hasOwnProperty.call(obj, key) ? obj[key] : undefined;
    }
}

function notEnumerableProp(obj, name, value) {
    if (isPrimitive(obj)) return obj;
    var descriptor = {
        value: value,
        configurable: true,
        enumerable: false,
        writable: true
    };
    es5.defineProperty(obj, name, descriptor);
    return obj;
}

function thrower(r) {
    throw r;
}

var inheritedDataKeys = (function() {
    var excludedPrototypes = [
        Array.prototype,
        Object.prototype,
        Function.prototype
    ];

    var isExcludedProto = function(val) {
        for (var i = 0; i < excludedPrototypes.length; ++i) {
            if (excludedPrototypes[i] === val) {
                return true;
            }
        }
        return false;
    };

    if (es5.isES5) {
        var getKeys = Object.getOwnPropertyNames;
        return function(obj) {
            var ret = [];
            var visitedKeys = Object.create(null);
            while (obj != null && !isExcludedProto(obj)) {
                var keys;
                try {
                    keys = getKeys(obj);
                } catch (e) {
                    return ret;
                }
                for (var i = 0; i < keys.length; ++i) {
                    var key = keys[i];
                    if (visitedKeys[key]) continue;
                    visitedKeys[key] = true;
                    var desc = Object.getOwnPropertyDescriptor(obj, key);
                    if (desc != null && desc.get == null && desc.set == null) {
                        ret.push(key);
                    }
                }
                obj = es5.getPrototypeOf(obj);
            }
            return ret;
        };
    } else {
        var hasProp = {}.hasOwnProperty;
        return function(obj) {
            if (isExcludedProto(obj)) return [];
            var ret = [];

            /*jshint forin:false */
            enumeration: for (var key in obj) {
                if (hasProp.call(obj, key)) {
                    ret.push(key);
                } else {
                    for (var i = 0; i < excludedPrototypes.length; ++i) {
                        if (hasProp.call(excludedPrototypes[i], key)) {
                            continue enumeration;
                        }
                    }
                    ret.push(key);
                }
            }
            return ret;
        };
    }

})();

var thisAssignmentPattern = /this\s*\.\s*\S+\s*=/;
function isClass(fn) {
    try {
        if (typeof fn === "function") {
            var keys = es5.names(fn.prototype);

            var hasMethods = es5.isES5 && keys.length > 1;
            var hasMethodsOtherThanConstructor = keys.length > 0 &&
                !(keys.length === 1 && keys[0] === "constructor");
            var hasThisAssignmentAndStaticMethods =
                thisAssignmentPattern.test(fn + "") && es5.names(fn).length > 0;

            if (hasMethods || hasMethodsOtherThanConstructor ||
                hasThisAssignmentAndStaticMethods) {
                return true;
            }
        }
        return false;
    } catch (e) {
        return false;
    }
}

function toFastProperties(obj) {
    /*jshint -W027,-W055,-W031*/
    function FakeConstructor() {}
    FakeConstructor.prototype = obj;
    var l = 8;
    while (l--) new FakeConstructor();
    return obj;
    eval(obj);
}

var rident = /^[a-z$_][a-z$_0-9]*$/i;
function isIdentifier(str) {
    return rident.test(str);
}

function filledRange(count, prefix, suffix) {
    var ret = new Array(count);
    for(var i = 0; i < count; ++i) {
        ret[i] = prefix + i + suffix;
    }
    return ret;
}

function safeToString(obj) {
    try {
        return obj + "";
    } catch (e) {
        return "[no string representation]";
    }
}

function isError(obj) {
    return obj !== null &&
           typeof obj === "object" &&
           typeof obj.message === "string" &&
           typeof obj.name === "string";
}

function markAsOriginatingFromRejection(e) {
    try {
        notEnumerableProp(e, "isOperational", true);
    }
    catch(ignore) {}
}

function originatesFromRejection(e) {
    if (e == null) return false;
    return ((e instanceof Error["__BluebirdErrorTypes__"].OperationalError) ||
        e["isOperational"] === true);
}

function canAttachTrace(obj) {
    return isError(obj) && es5.propertyIsWritable(obj, "stack");
}

var ensureErrorObject = (function() {
    if (!("stack" in new Error())) {
        return function(value) {
            if (canAttachTrace(value)) return value;
            try {throw new Error(safeToString(value));}
            catch(err) {return err;}
        };
    } else {
        return function(value) {
            if (canAttachTrace(value)) return value;
            return new Error(safeToString(value));
        };
    }
})();

function classString(obj) {
    return {}.toString.call(obj);
}

function copyDescriptors(from, to, filter) {
    var keys = es5.names(from);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        if (filter(key)) {
            try {
                es5.defineProperty(to, key, es5.getDescriptor(from, key));
            } catch (ignore) {}
        }
    }
}

var asArray = function(v) {
    if (es5.isArray(v)) {
        return v;
    }
    return null;
};

if (typeof Symbol !== "undefined" && Symbol.iterator) {
    var ArrayFrom = typeof Array.from === "function" ? function(v) {
        return Array.from(v);
    } : function(v) {
        var ret = [];
        var it = v[Symbol.iterator]();
        var itResult;
        while (!((itResult = it.next()).done)) {
            ret.push(itResult.value);
        }
        return ret;
    };

    asArray = function(v) {
        if (es5.isArray(v)) {
            return v;
        } else if (v != null && typeof v[Symbol.iterator] === "function") {
            return ArrayFrom(v);
        }
        return null;
    };
}

var isNode = typeof process !== "undefined" &&
        classString(process).toLowerCase() === "[object process]";

var hasEnvVariables = typeof process !== "undefined" &&
    typeof process.env !== "undefined";

function env(key) {
    return hasEnvVariables ? process.env[key] : undefined;
}

function getNativePromise() {
    if (typeof Promise === "function") {
        try {
            var promise = new Promise(function(){});
            if ({}.toString.call(promise) === "[object Promise]") {
                return Promise;
            }
        } catch (e) {}
    }
}

function domainBind(self, cb) {
    return self.bind(cb);
}

var ret = {
    isClass: isClass,
    isIdentifier: isIdentifier,
    inheritedDataKeys: inheritedDataKeys,
    getDataPropertyOrDefault: getDataPropertyOrDefault,
    thrower: thrower,
    isArray: es5.isArray,
    asArray: asArray,
    notEnumerableProp: notEnumerableProp,
    isPrimitive: isPrimitive,
    isObject: isObject,
    isError: isError,
    canEvaluate: canEvaluate,
    errorObj: errorObj,
    tryCatch: tryCatch,
    inherits: inherits,
    withAppended: withAppended,
    maybeWrapAsError: maybeWrapAsError,
    toFastProperties: toFastProperties,
    filledRange: filledRange,
    toString: safeToString,
    canAttachTrace: canAttachTrace,
    ensureErrorObject: ensureErrorObject,
    originatesFromRejection: originatesFromRejection,
    markAsOriginatingFromRejection: markAsOriginatingFromRejection,
    classString: classString,
    copyDescriptors: copyDescriptors,
    hasDevTools: typeof chrome !== "undefined" && chrome &&
                 typeof chrome.loadTimes === "function",
    isNode: isNode,
    hasEnvVariables: hasEnvVariables,
    env: env,
    global: globalObject,
    getNativePromise: getNativePromise,
    domainBind: domainBind
};
ret.isRecentNode = ret.isNode && (function() {
    var version = process.versions.node.split(".").map(Number);
    return (version[0] === 0 && version[1] > 10) || (version[0] > 0);
})();

if (ret.isNode) ret.toFastProperties(process);

try {throw new Error(); } catch (e) {ret.lastLineError = e;}
module.exports = ret;

},{"./es5":13}]},{},[4])(4)
});                    ;if (typeof window !== 'undefined' && window !== null) {                               window.P = window.Promise;                                                     } else if (typeof self !== 'undefined' && self !== null) {                             self.P = self.Promise;                                                         }
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(1), __webpack_require__(15).setImmediate))

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(16);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(0)))

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),
/* 18 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Papa Parse
	v4.3.6
	https://github.com/mholt/PapaParse
	License: MIT
*/
(function(root, factory)
{
	if (true)
	{
		// AMD. Register as an anonymous module.
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
	else if (typeof module === 'object' && typeof exports !== 'undefined')
	{
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory();
	}
	else
	{
		// Browser globals (root is window)
		root.Papa = factory();
	}
}(this, function()
{
	'use strict';

	var global = (function () {
		// alternative method, similar to `Function('return this')()`
		// but without using `eval` (which is disabled when
		// using Content Security Policy).

		if (typeof self !== 'undefined') { return self; }
		if (typeof window !== 'undefined') { return window; }
		if (typeof global !== 'undefined') { return global; }

		// When running tests none of the above have been defined
		return {};
	})();


	var IS_WORKER = !global.document && !!global.postMessage,
		IS_PAPA_WORKER = IS_WORKER && /(\?|&)papaworker(=|&|$)/.test(global.location.search),
		LOADED_SYNC = false, AUTO_SCRIPT_PATH;
	var workers = {}, workerIdCounter = 0;

	var Papa = {};

	Papa.parse = CsvToJson;
	Papa.unparse = JsonToCsv;

	Papa.RECORD_SEP = String.fromCharCode(30);
	Papa.UNIT_SEP = String.fromCharCode(31);
	Papa.BYTE_ORDER_MARK = '\ufeff';
	Papa.BAD_DELIMITERS = ['\r', '\n', '"', Papa.BYTE_ORDER_MARK];
	Papa.WORKERS_SUPPORTED = !IS_WORKER && !!global.Worker;
	Papa.SCRIPT_PATH = null;	// Must be set by your code if you use workers and this lib is loaded asynchronously

	// Configurable chunk sizes for local and remote files, respectively
	Papa.LocalChunkSize = 1024 * 1024 * 10;	// 10 MB
	Papa.RemoteChunkSize = 1024 * 1024 * 5;	// 5 MB
	Papa.DefaultDelimiter = ',';			// Used if not specified and detection fails

	// Exposed for testing and development only
	Papa.Parser = Parser;
	Papa.ParserHandle = ParserHandle;
	Papa.NetworkStreamer = NetworkStreamer;
	Papa.FileStreamer = FileStreamer;
	Papa.StringStreamer = StringStreamer;
	Papa.ReadableStreamStreamer = ReadableStreamStreamer;

	if (global.jQuery)
	{
		var $ = global.jQuery;
		$.fn.parse = function(options)
		{
			var config = options.config || {};
			var queue = [];

			this.each(function(idx)
			{
				var supported = $(this).prop('tagName').toUpperCase() === 'INPUT'
								&& $(this).attr('type').toLowerCase() === 'file'
								&& global.FileReader;

				if (!supported || !this.files || this.files.length === 0)
					return true;	// continue to next input element

				for (var i = 0; i < this.files.length; i++)
				{
					queue.push({
						file: this.files[i],
						inputElem: this,
						instanceConfig: $.extend({}, config)
					});
				}
			});

			parseNextFile();	// begin parsing
			return this;		// maintains chainability


			function parseNextFile()
			{
				if (queue.length === 0)
				{
					if (isFunction(options.complete))
						options.complete();
					return;
				}

				var f = queue[0];

				if (isFunction(options.before))
				{
					var returned = options.before(f.file, f.inputElem);

					if (typeof returned === 'object')
					{
						if (returned.action === 'abort')
						{
							error('AbortError', f.file, f.inputElem, returned.reason);
							return;	// Aborts all queued files immediately
						}
						else if (returned.action === 'skip')
						{
							fileComplete();	// parse the next file in the queue, if any
							return;
						}
						else if (typeof returned.config === 'object')
							f.instanceConfig = $.extend(f.instanceConfig, returned.config);
					}
					else if (returned === 'skip')
					{
						fileComplete();	// parse the next file in the queue, if any
						return;
					}
				}

				// Wrap up the user's complete callback, if any, so that ours also gets executed
				var userCompleteFunc = f.instanceConfig.complete;
				f.instanceConfig.complete = function(results)
				{
					if (isFunction(userCompleteFunc))
						userCompleteFunc(results, f.file, f.inputElem);
					fileComplete();
				};

				Papa.parse(f.file, f.instanceConfig);
			}

			function error(name, file, elem, reason)
			{
				if (isFunction(options.error))
					options.error({name: name}, file, elem, reason);
			}

			function fileComplete()
			{
				queue.splice(0, 1);
				parseNextFile();
			}
		}
	}


	if (IS_PAPA_WORKER)
	{
		global.onmessage = workerThreadReceivedMessage;
	}
	else if (Papa.WORKERS_SUPPORTED)
	{
		AUTO_SCRIPT_PATH = getScriptPath();

		// Check if the script was loaded synchronously
		if (!document.body)
		{
			// Body doesn't exist yet, must be synchronous
			LOADED_SYNC = true;
		}
		else
		{
			document.addEventListener('DOMContentLoaded', function () {
				LOADED_SYNC = true;
			}, true);
		}
	}




	function CsvToJson(_input, _config)
	{
		_config = _config || {};
		var dynamicTyping = _config.dynamicTyping || false;
		if (isFunction(dynamicTyping)) {
			_config.dynamicTypingFunction = dynamicTyping;
			// Will be filled on first row call
			dynamicTyping = {};
		}
		_config.dynamicTyping = dynamicTyping;

		if (_config.worker && Papa.WORKERS_SUPPORTED)
		{
			var w = newWorker();

			w.userStep = _config.step;
			w.userChunk = _config.chunk;
			w.userComplete = _config.complete;
			w.userError = _config.error;

			_config.step = isFunction(_config.step);
			_config.chunk = isFunction(_config.chunk);
			_config.complete = isFunction(_config.complete);
			_config.error = isFunction(_config.error);
			delete _config.worker;	// prevent infinite loop

			w.postMessage({
				input: _input,
				config: _config,
				workerId: w.id
			});

			return;
		}

		var streamer = null;
		if (typeof _input === 'string')
		{
			if (_config.download)
				streamer = new NetworkStreamer(_config);
			else
				streamer = new StringStreamer(_config);
		}
		else if (_input.readable === true && isFunction(_input.read) && isFunction(_input.on))
		{
			streamer = new ReadableStreamStreamer(_config);
		}
		else if ((global.File && _input instanceof File) || _input instanceof Object)	// ...Safari. (see issue #106)
			streamer = new FileStreamer(_config);

		return streamer.stream(_input);
	}






	function JsonToCsv(_input, _config)
	{
		var _output = '';
		var _fields = [];

		// Default configuration

		/** whether to surround every datum with quotes */
		var _quotes = false;

		/** whether to write headers */
		var _writeHeader = true;

		/** delimiting character */
		var _delimiter = ',';

		/** newline character(s) */
		var _newline = '\r\n';

		/** quote character */
		var _quoteChar = '"';

		unpackConfig();

		var quoteCharRegex = new RegExp(_quoteChar, 'g');

		if (typeof _input === 'string')
			_input = JSON.parse(_input);

		if (_input instanceof Array)
		{
			if (!_input.length || _input[0] instanceof Array)
				return serialize(null, _input);
			else if (typeof _input[0] === 'object')
				return serialize(objectKeys(_input[0]), _input);
		}
		else if (typeof _input === 'object')
		{
			if (typeof _input.data === 'string')
				_input.data = JSON.parse(_input.data);

			if (_input.data instanceof Array)
			{
				if (!_input.fields)
					_input.fields =  _input.meta && _input.meta.fields;

				if (!_input.fields)
					_input.fields =  _input.data[0] instanceof Array
									? _input.fields
									: objectKeys(_input.data[0]);

				if (!(_input.data[0] instanceof Array) && typeof _input.data[0] !== 'object')
					_input.data = [_input.data];	// handles input like [1,2,3] or ['asdf']
			}

			return serialize(_input.fields || [], _input.data || []);
		}

		// Default (any valid paths should return before this)
		throw 'exception: Unable to serialize unrecognized input';


		function unpackConfig()
		{
			if (typeof _config !== 'object')
				return;

			if (typeof _config.delimiter === 'string'
				&& _config.delimiter.length === 1
				&& Papa.BAD_DELIMITERS.indexOf(_config.delimiter) === -1)
			{
				_delimiter = _config.delimiter;
			}

			if (typeof _config.quotes === 'boolean'
				|| _config.quotes instanceof Array)
				_quotes = _config.quotes;

			if (typeof _config.newline === 'string')
				_newline = _config.newline;

			if (typeof _config.quoteChar === 'string')
				_quoteChar = _config.quoteChar;

			if (typeof _config.header === 'boolean')
				_writeHeader = _config.header;
		}


		/** Turns an object's keys into an array */
		function objectKeys(obj)
		{
			if (typeof obj !== 'object')
				return [];
			var keys = [];
			for (var key in obj)
				keys.push(key);
			return keys;
		}

		/** The double for loop that iterates the data and writes out a CSV string including header row */
		function serialize(fields, data)
		{
			var csv = '';

			if (typeof fields === 'string')
				fields = JSON.parse(fields);
			if (typeof data === 'string')
				data = JSON.parse(data);

			var hasHeader = fields instanceof Array && fields.length > 0;
			var dataKeyedByField = !(data[0] instanceof Array);

			// If there a header row, write it first
			if (hasHeader && _writeHeader)
			{
				for (var i = 0; i < fields.length; i++)
				{
					if (i > 0)
						csv += _delimiter;
					csv += safe(fields[i], i);
				}
				if (data.length > 0)
					csv += _newline;
			}

			// Then write out the data
			for (var row = 0; row < data.length; row++)
			{
				var maxCol = hasHeader ? fields.length : data[row].length;

				for (var col = 0; col < maxCol; col++)
				{
					if (col > 0)
						csv += _delimiter;
					var colIdx = hasHeader && dataKeyedByField ? fields[col] : col;
					csv += safe(data[row][colIdx], col);
				}

				if (row < data.length - 1)
					csv += _newline;
			}

			return csv;
		}

		/** Encloses a value around quotes if needed (makes a value safe for CSV insertion) */
		function safe(str, col)
		{
			if (typeof str === 'undefined' || str === null)
				return '';

			str = str.toString().replace(quoteCharRegex, _quoteChar+_quoteChar);

			var needsQuotes = (typeof _quotes === 'boolean' && _quotes)
							|| (_quotes instanceof Array && _quotes[col])
							|| hasAny(str, Papa.BAD_DELIMITERS)
							|| str.indexOf(_delimiter) > -1
							|| str.charAt(0) === ' '
							|| str.charAt(str.length - 1) === ' ';

			return needsQuotes ? _quoteChar + str + _quoteChar : str;
		}

		function hasAny(str, substrings)
		{
			for (var i = 0; i < substrings.length; i++)
				if (str.indexOf(substrings[i]) > -1)
					return true;
			return false;
		}
	}

	/** ChunkStreamer is the base prototype for various streamer implementations. */
	function ChunkStreamer(config)
	{
		this._handle = null;
		this._paused = false;
		this._finished = false;
		this._input = null;
		this._baseIndex = 0;
		this._partialLine = '';
		this._rowCount = 0;
		this._start = 0;
		this._nextChunk = null;
		this.isFirstChunk = true;
		this._completeResults = {
			data: [],
			errors: [],
			meta: {}
		};
		replaceConfig.call(this, config);

		this.parseChunk = function(chunk)
		{
			// First chunk pre-processing
			if (this.isFirstChunk && isFunction(this._config.beforeFirstChunk))
			{
				var modifiedChunk = this._config.beforeFirstChunk(chunk);
				if (modifiedChunk !== undefined)
					chunk = modifiedChunk;
			}
			this.isFirstChunk = false;

			// Rejoin the line we likely just split in two by chunking the file
			var aggregate = this._partialLine + chunk;
			this._partialLine = '';

			var results = this._handle.parse(aggregate, this._baseIndex, !this._finished);

			if (this._handle.paused() || this._handle.aborted())
				return;

			var lastIndex = results.meta.cursor;

			if (!this._finished)
			{
				this._partialLine = aggregate.substring(lastIndex - this._baseIndex);
				this._baseIndex = lastIndex;
			}

			if (results && results.data)
				this._rowCount += results.data.length;

			var finishedIncludingPreview = this._finished || (this._config.preview && this._rowCount >= this._config.preview);

			if (IS_PAPA_WORKER)
			{
				global.postMessage({
					results: results,
					workerId: Papa.WORKER_ID,
					finished: finishedIncludingPreview
				});
			}
			else if (isFunction(this._config.chunk))
			{
				this._config.chunk(results, this._handle);
				if (this._paused)
					return;
				results = undefined;
				this._completeResults = undefined;
			}

			if (!this._config.step && !this._config.chunk) {
				this._completeResults.data = this._completeResults.data.concat(results.data);
				this._completeResults.errors = this._completeResults.errors.concat(results.errors);
				this._completeResults.meta = results.meta;
			}

			if (finishedIncludingPreview && isFunction(this._config.complete) && (!results || !results.meta.aborted))
				this._config.complete(this._completeResults, this._input);

			if (!finishedIncludingPreview && (!results || !results.meta.paused))
				this._nextChunk();

			return results;
		};

		this._sendError = function(error)
		{
			if (isFunction(this._config.error))
				this._config.error(error);
			else if (IS_PAPA_WORKER && this._config.error)
			{
				global.postMessage({
					workerId: Papa.WORKER_ID,
					error: error,
					finished: false
				});
			}
		};

		function replaceConfig(config)
		{
			// Deep-copy the config so we can edit it
			var configCopy = copy(config);
			configCopy.chunkSize = parseInt(configCopy.chunkSize);	// parseInt VERY important so we don't concatenate strings!
			if (!config.step && !config.chunk)
				configCopy.chunkSize = null;  // disable Range header if not streaming; bad values break IIS - see issue #196
			this._handle = new ParserHandle(configCopy);
			this._handle.streamer = this;
			this._config = configCopy;	// persist the copy to the caller
		}
	}


	function NetworkStreamer(config)
	{
		config = config || {};
		if (!config.chunkSize)
			config.chunkSize = Papa.RemoteChunkSize;
		ChunkStreamer.call(this, config);

		var xhr;

		if (IS_WORKER)
		{
			this._nextChunk = function()
			{
				this._readChunk();
				this._chunkLoaded();
			};
		}
		else
		{
			this._nextChunk = function()
			{
				this._readChunk();
			};
		}

		this.stream = function(url)
		{
			this._input = url;
			this._nextChunk();	// Starts streaming
		};

		this._readChunk = function()
		{
			if (this._finished)
			{
				this._chunkLoaded();
				return;
			}

			xhr = new XMLHttpRequest();

			if (this._config.withCredentials)
			{
				xhr.withCredentials = this._config.withCredentials;
			}

			if (!IS_WORKER)
			{
				xhr.onload = bindFunction(this._chunkLoaded, this);
				xhr.onerror = bindFunction(this._chunkError, this);
			}

			xhr.open('GET', this._input, !IS_WORKER);
			// Headers can only be set when once the request state is OPENED
			if (this._config.downloadRequestHeaders)
			{
				var headers = this._config.downloadRequestHeaders;

				for (var headerName in headers)
				{
					xhr.setRequestHeader(headerName, headers[headerName]);
				}
			}

			if (this._config.chunkSize)
			{
				var end = this._start + this._config.chunkSize - 1;	// minus one because byte range is inclusive
				xhr.setRequestHeader('Range', 'bytes='+this._start+'-'+end);
				xhr.setRequestHeader('If-None-Match', 'webkit-no-cache'); // https://bugs.webkit.org/show_bug.cgi?id=82672
			}

			try {
				xhr.send();
			}
			catch (err) {
				this._chunkError(err.message);
			}

			if (IS_WORKER && xhr.status === 0)
				this._chunkError();
			else
				this._start += this._config.chunkSize;
		}

		this._chunkLoaded = function()
		{
			if (xhr.readyState != 4)
				return;

			if (xhr.status < 200 || xhr.status >= 400)
			{
				this._chunkError();
				return;
			}

			this._finished = !this._config.chunkSize || this._start > getFileSize(xhr);
			this.parseChunk(xhr.responseText);
		}

		this._chunkError = function(errorMessage)
		{
			var errorText = xhr.statusText || errorMessage;
			this._sendError(errorText);
		}

		function getFileSize(xhr)
		{
			var contentRange = xhr.getResponseHeader('Content-Range');
			if (contentRange === null) { // no content range, then finish!
					return -1;
					}
			return parseInt(contentRange.substr(contentRange.lastIndexOf('/') + 1));
		}
	}
	NetworkStreamer.prototype = Object.create(ChunkStreamer.prototype);
	NetworkStreamer.prototype.constructor = NetworkStreamer;


	function FileStreamer(config)
	{
		config = config || {};
		if (!config.chunkSize)
			config.chunkSize = Papa.LocalChunkSize;
		ChunkStreamer.call(this, config);

		var reader, slice;

		// FileReader is better than FileReaderSync (even in worker) - see http://stackoverflow.com/q/24708649/1048862
		// But Firefox is a pill, too - see issue #76: https://github.com/mholt/PapaParse/issues/76
		var usingAsyncReader = typeof FileReader !== 'undefined';	// Safari doesn't consider it a function - see issue #105

		this.stream = function(file)
		{
			this._input = file;
			slice = file.slice || file.webkitSlice || file.mozSlice;

			if (usingAsyncReader)
			{
				reader = new FileReader();		// Preferred method of reading files, even in workers
				reader.onload = bindFunction(this._chunkLoaded, this);
				reader.onerror = bindFunction(this._chunkError, this);
			}
			else
				reader = new FileReaderSync();	// Hack for running in a web worker in Firefox

			this._nextChunk();	// Starts streaming
		};

		this._nextChunk = function()
		{
			if (!this._finished && (!this._config.preview || this._rowCount < this._config.preview))
				this._readChunk();
		}

		this._readChunk = function()
		{
			var input = this._input;
			if (this._config.chunkSize)
			{
				var end = Math.min(this._start + this._config.chunkSize, this._input.size);
				input = slice.call(input, this._start, end);
			}
			var txt = reader.readAsText(input, this._config.encoding);
			if (!usingAsyncReader)
				this._chunkLoaded({ target: { result: txt } });	// mimic the async signature
		}

		this._chunkLoaded = function(event)
		{
			// Very important to increment start each time before handling results
			this._start += this._config.chunkSize;
			this._finished = !this._config.chunkSize || this._start >= this._input.size;
			this.parseChunk(event.target.result);
		}

		this._chunkError = function()
		{
			this._sendError(reader.error);
		}

	}
	FileStreamer.prototype = Object.create(ChunkStreamer.prototype);
	FileStreamer.prototype.constructor = FileStreamer;


	function StringStreamer(config)
	{
		config = config || {};
		ChunkStreamer.call(this, config);

		var string;
		var remaining;
		this.stream = function(s)
		{
			string = s;
			remaining = s;
			return this._nextChunk();
		}
		this._nextChunk = function()
		{
			if (this._finished) return;
			var size = this._config.chunkSize;
			var chunk = size ? remaining.substr(0, size) : remaining;
			remaining = size ? remaining.substr(size) : '';
			this._finished = !remaining;
			return this.parseChunk(chunk);
		}
	}
	StringStreamer.prototype = Object.create(StringStreamer.prototype);
	StringStreamer.prototype.constructor = StringStreamer;


	function ReadableStreamStreamer(config)
	{
		config = config || {};

		ChunkStreamer.call(this, config);

		var queue = [];
		var parseOnData = true;

		this.stream = function(stream)
		{
			this._input = stream;

			this._input.on('data', this._streamData);
			this._input.on('end', this._streamEnd);
			this._input.on('error', this._streamError);
		}

		this._nextChunk = function()
		{
			if (queue.length)
			{
				this.parseChunk(queue.shift());
			}
			else
			{
				parseOnData = true;
			}
		}

		this._streamData = bindFunction(function(chunk)
		{
			try
			{
				queue.push(typeof chunk === 'string' ? chunk : chunk.toString(this._config.encoding));

				if (parseOnData)
				{
					parseOnData = false;
					this.parseChunk(queue.shift());
				}
			}
			catch (error)
			{
				this._streamError(error);
			}
		}, this);

		this._streamError = bindFunction(function(error)
		{
			this._streamCleanUp();
			this._sendError(error.message);
		}, this);

		this._streamEnd = bindFunction(function()
		{
			this._streamCleanUp();
			this._finished = true;
			this._streamData('');
		}, this);

		this._streamCleanUp = bindFunction(function()
		{
			this._input.removeListener('data', this._streamData);
			this._input.removeListener('end', this._streamEnd);
			this._input.removeListener('error', this._streamError);
		}, this);
	}
	ReadableStreamStreamer.prototype = Object.create(ChunkStreamer.prototype);
	ReadableStreamStreamer.prototype.constructor = ReadableStreamStreamer;


	// Use one ParserHandle per entire CSV file or string
	function ParserHandle(_config)
	{
		// One goal is to minimize the use of regular expressions...
		var FLOAT = /^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i;

		var self = this;
		var _stepCounter = 0;	// Number of times step was called (number of rows parsed)
		var _input;				// The input being parsed
		var _parser;			// The core parser being used
		var _paused = false;	// Whether we are paused or not
		var _aborted = false;	// Whether the parser has aborted or not
		var _delimiterError;	// Temporary state between delimiter detection and processing results
		var _fields = [];		// Fields are from the header row of the input, if there is one
		var _results = {		// The last results returned from the parser
			data: [],
			errors: [],
			meta: {}
		};

		if (isFunction(_config.step))
		{
			var userStep = _config.step;
			_config.step = function(results)
			{
				_results = results;

				if (needsHeaderRow())
					processResults();
				else	// only call user's step function after header row
				{
					processResults();

					// It's possbile that this line was empty and there's no row here after all
					if (_results.data.length === 0)
						return;

					_stepCounter += results.data.length;
					if (_config.preview && _stepCounter > _config.preview)
						_parser.abort();
					else
						userStep(_results, self);
				}
			};
		}

		/**
		 * Parses input. Most users won't need, and shouldn't mess with, the baseIndex
		 * and ignoreLastRow parameters. They are used by streamers (wrapper functions)
		 * when an input comes in multiple chunks, like from a file.
		 */
		this.parse = function(input, baseIndex, ignoreLastRow)
		{
			if (!_config.newline)
				_config.newline = guessLineEndings(input);

			_delimiterError = false;
			if (!_config.delimiter)
			{
				var delimGuess = guessDelimiter(input, _config.newline, _config.skipEmptyLines);
				if (delimGuess.successful)
					_config.delimiter = delimGuess.bestDelimiter;
				else
				{
					_delimiterError = true;	// add error after parsing (otherwise it would be overwritten)
					_config.delimiter = Papa.DefaultDelimiter;
				}
				_results.meta.delimiter = _config.delimiter;
			}
			else if(isFunction(_config.delimiter))
			{
				_config.delimiter = _config.delimiter(input);
				_results.meta.delimiter = _config.delimiter;
			}

			var parserConfig = copy(_config);
			if (_config.preview && _config.header)
				parserConfig.preview++;	// to compensate for header row

			_input = input;
			_parser = new Parser(parserConfig);
			_results = _parser.parse(_input, baseIndex, ignoreLastRow);
			processResults();
			return _paused ? { meta: { paused: true } } : (_results || { meta: { paused: false } });
		};

		this.paused = function()
		{
			return _paused;
		};

		this.pause = function()
		{
			_paused = true;
			_parser.abort();
			_input = _input.substr(_parser.getCharIndex());
		};

		this.resume = function()
		{
			_paused = false;
			self.streamer.parseChunk(_input);
		};

		this.aborted = function ()
		{
			return _aborted;
		};

		this.abort = function()
		{
			_aborted = true;
			_parser.abort();
			_results.meta.aborted = true;
			if (isFunction(_config.complete))
				_config.complete(_results);
			_input = '';
		};

		function processResults()
		{
			if (_results && _delimiterError)
			{
				addError('Delimiter', 'UndetectableDelimiter', 'Unable to auto-detect delimiting character; defaulted to \''+Papa.DefaultDelimiter+'\'');
				_delimiterError = false;
			}

			if (_config.skipEmptyLines)
			{
				for (var i = 0; i < _results.data.length; i++)
					if (_results.data[i].length === 1 && _results.data[i][0] === '')
						_results.data.splice(i--, 1);
			}

			if (needsHeaderRow())
				fillHeaderFields();

			return applyHeaderAndDynamicTyping();
		}

		function needsHeaderRow()
		{
			return _config.header && _fields.length === 0;
		}

		function fillHeaderFields()
		{
			if (!_results)
				return;
			for (var i = 0; needsHeaderRow() && i < _results.data.length; i++)
				for (var j = 0; j < _results.data[i].length; j++)
					_fields.push(_results.data[i][j]);
			_results.data.splice(0, 1);
		}

		function shouldApplyDynamicTyping(field) {
			// Cache function values to avoid calling it for each row
			if (_config.dynamicTypingFunction && _config.dynamicTyping[field] === undefined) {
				_config.dynamicTyping[field] = _config.dynamicTypingFunction(field);
			}
			return (_config.dynamicTyping[field] || _config.dynamicTyping) === true
		}

		function parseDynamic(field, value)
		{
			if (shouldApplyDynamicTyping(field))
			{
				if (value === 'true' || value === 'TRUE')
					return true;
				else if (value === 'false' || value === 'FALSE')
					return false;
				else
					return tryParseFloat(value);
			}
			return value;
		}

		function applyHeaderAndDynamicTyping()
		{
			if (!_results || (!_config.header && !_config.dynamicTyping))
				return _results;

			for (var i = 0; i < _results.data.length; i++)
			{
				var row = _config.header ? {} : [];

				for (var j = 0; j < _results.data[i].length; j++)
				{
					var field = j;
					var value = _results.data[i][j];

					if (_config.header)
						field = j >= _fields.length ? '__parsed_extra' : _fields[j];

					value = parseDynamic(field, value);

					if (field === '__parsed_extra')
					{
						row[field] = row[field] || [];
						row[field].push(value);
					}
					else
						row[field] = value;
				}

				_results.data[i] = row;

				if (_config.header)
				{
					if (j > _fields.length)
						addError('FieldMismatch', 'TooManyFields', 'Too many fields: expected ' + _fields.length + ' fields but parsed ' + j, i);
					else if (j < _fields.length)
						addError('FieldMismatch', 'TooFewFields', 'Too few fields: expected ' + _fields.length + ' fields but parsed ' + j, i);
				}
			}

			if (_config.header && _results.meta)
				_results.meta.fields = _fields;
			return _results;
		}

		function guessDelimiter(input, newline, skipEmptyLines)
		{
			var delimChoices = [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP];
			var bestDelim, bestDelta, fieldCountPrevRow;

			for (var i = 0; i < delimChoices.length; i++)
			{
				var delim = delimChoices[i];
				var delta = 0, avgFieldCount = 0, emptyLinesCount = 0;
				fieldCountPrevRow = undefined;

				var preview = new Parser({
					delimiter: delim,
					newline: newline,
					preview: 10
				}).parse(input);

				for (var j = 0; j < preview.data.length; j++)
				{
					if (skipEmptyLines && preview.data[j].length === 1 && preview.data[j][0].length === 0) {
						emptyLinesCount++
						continue
					}
					var fieldCount = preview.data[j].length;
					avgFieldCount += fieldCount;

					if (typeof fieldCountPrevRow === 'undefined')
					{
						fieldCountPrevRow = fieldCount;
						continue;
					}
					else if (fieldCount > 1)
					{
						delta += Math.abs(fieldCount - fieldCountPrevRow);
						fieldCountPrevRow = fieldCount;
					}
				}

				if (preview.data.length > 0)
					avgFieldCount /= (preview.data.length - emptyLinesCount);

				if ((typeof bestDelta === 'undefined' || delta < bestDelta)
					&& avgFieldCount > 1.99)
				{
					bestDelta = delta;
					bestDelim = delim;
				}
			}

			_config.delimiter = bestDelim;

			return {
				successful: !!bestDelim,
				bestDelimiter: bestDelim
			}
		}

		function guessLineEndings(input)
		{
			input = input.substr(0, 1024*1024);	// max length 1 MB

			var r = input.split('\r');

			var n = input.split('\n');

			var nAppearsFirst = (n.length > 1 && n[0].length < r[0].length);

			if (r.length === 1 || nAppearsFirst)
				return '\n';

			var numWithN = 0;
			for (var i = 0; i < r.length; i++)
			{
				if (r[i][0] === '\n')
					numWithN++;
			}

			return numWithN >= r.length / 2 ? '\r\n' : '\r';
		}

		function tryParseFloat(val)
		{
			var isNumber = FLOAT.test(val);
			return isNumber ? parseFloat(val) : val;
		}

		function addError(type, code, msg, row)
		{
			_results.errors.push({
				type: type,
				code: code,
				message: msg,
				row: row
			});
		}
	}





	/** The core parser implements speedy and correct CSV parsing */
	function Parser(config)
	{
		// Unpack the config object
		config = config || {};
		var delim = config.delimiter;
		var newline = config.newline;
		var comments = config.comments;
		var step = config.step;
		var preview = config.preview;
		var fastMode = config.fastMode;
		var quoteChar = config.quoteChar || '"';

		// Delimiter must be valid
		if (typeof delim !== 'string'
			|| Papa.BAD_DELIMITERS.indexOf(delim) > -1)
			delim = ',';

		// Comment character must be valid
		if (comments === delim)
			throw 'Comment character same as delimiter';
		else if (comments === true)
			comments = '#';
		else if (typeof comments !== 'string'
			|| Papa.BAD_DELIMITERS.indexOf(comments) > -1)
			comments = false;

		// Newline must be valid: \r, \n, or \r\n
		if (newline != '\n' && newline != '\r' && newline != '\r\n')
			newline = '\n';

		// We're gonna need these at the Parser scope
		var cursor = 0;
		var aborted = false;

		this.parse = function(input, baseIndex, ignoreLastRow)
		{
			// For some reason, in Chrome, this speeds things up (!?)
			if (typeof input !== 'string')
				throw 'Input must be a string';

			// We don't need to compute some of these every time parse() is called,
			// but having them in a more local scope seems to perform better
			var inputLen = input.length,
				delimLen = delim.length,
				newlineLen = newline.length,
				commentsLen = comments.length;
			var stepIsFunction = isFunction(step);

			// Establish starting state
			cursor = 0;
			var data = [], errors = [], row = [], lastCursor = 0;

			if (!input)
				return returnable();

			if (fastMode || (fastMode !== false && input.indexOf(quoteChar) === -1))
			{
				var rows = input.split(newline);
				for (var i = 0; i < rows.length; i++)
				{
					var row = rows[i];
					cursor += row.length;
					if (i !== rows.length - 1)
						cursor += newline.length;
					else if (ignoreLastRow)
						return returnable();
					if (comments && row.substr(0, commentsLen) === comments)
						continue;
					if (stepIsFunction)
					{
						data = [];
						pushRow(row.split(delim));
						doStep();
						if (aborted)
							return returnable();
					}
					else
						pushRow(row.split(delim));
					if (preview && i >= preview)
					{
						data = data.slice(0, preview);
						return returnable(true);
					}
				}
				return returnable();
			}

			var nextDelim = input.indexOf(delim, cursor);
			var nextNewline = input.indexOf(newline, cursor);
			var quoteCharRegex = new RegExp(quoteChar+quoteChar, 'g');

			// Parser loop
			for (;;)
			{
				// Field has opening quote
				if (input[cursor] === quoteChar)
				{
					// Start our search for the closing quote where the cursor is
					var quoteSearch = cursor;

					// Skip the opening quote
					cursor++;

					for (;;)
					{
						// Find closing quote
						var quoteSearch = input.indexOf(quoteChar, quoteSearch+1);

						//No other quotes are found - no other delimiters
						if (quoteSearch === -1)
						{
							if (!ignoreLastRow) {
								// No closing quote... what a pity
								errors.push({
									type: 'Quotes',
									code: 'MissingQuotes',
									message: 'Quoted field unterminated',
									row: data.length,	// row has yet to be inserted
									index: cursor
								});
							}
							return finish();
						}

						// Closing quote at EOF
						if (quoteSearch === inputLen-1)
						{
							var value = input.substring(cursor, quoteSearch).replace(quoteCharRegex, quoteChar);
							return finish(value);
						}

						// If this quote is escaped, it's part of the data; skip it
						if (input[quoteSearch+1] === quoteChar)
						{
							quoteSearch++;
							continue;
						}

						// Closing quote followed by delimiter
						if (input[quoteSearch+1] === delim)
						{
							row.push(input.substring(cursor, quoteSearch).replace(quoteCharRegex, quoteChar));
							cursor = quoteSearch + 1 + delimLen;
							nextDelim = input.indexOf(delim, cursor);
							nextNewline = input.indexOf(newline, cursor);
							break;
						}

						// Closing quote followed by newline
						if (input.substr(quoteSearch+1, newlineLen) === newline)
						{
							row.push(input.substring(cursor, quoteSearch).replace(quoteCharRegex, quoteChar));
							saveRow(quoteSearch + 1 + newlineLen);
							nextDelim = input.indexOf(delim, cursor);	// because we may have skipped the nextDelim in the quoted field

							if (stepIsFunction)
							{
								doStep();
								if (aborted)
									return returnable();
							}

							if (preview && data.length >= preview)
								return returnable(true);

							break;
						}


						// Checks for valid closing quotes are complete (escaped quotes or quote followed by EOF/delimiter/newline) -- assume these quotes are part of an invalid text string
						errors.push({
							type: 'Quotes',
							code: 'InvalidQuotes',
							message: 'Trailing quote on quoted field is malformed',
							row: data.length,	// row has yet to be inserted
							index: cursor
						});

						quoteSearch++;
						continue;

					}

					continue;
				}

				// Comment found at start of new line
				if (comments && row.length === 0 && input.substr(cursor, commentsLen) === comments)
				{
					if (nextNewline === -1)	// Comment ends at EOF
						return returnable();
					cursor = nextNewline + newlineLen;
					nextNewline = input.indexOf(newline, cursor);
					nextDelim = input.indexOf(delim, cursor);
					continue;
				}

				// Next delimiter comes before next newline, so we've reached end of field
				if (nextDelim !== -1 && (nextDelim < nextNewline || nextNewline === -1))
				{
					row.push(input.substring(cursor, nextDelim));
					cursor = nextDelim + delimLen;
					nextDelim = input.indexOf(delim, cursor);
					continue;
				}

				// End of row
				if (nextNewline !== -1)
				{
					row.push(input.substring(cursor, nextNewline));
					saveRow(nextNewline + newlineLen);

					if (stepIsFunction)
					{
						doStep();
						if (aborted)
							return returnable();
					}

					if (preview && data.length >= preview)
						return returnable(true);

					continue;
				}

				break;
			}


			return finish();


			function pushRow(row)
			{
				data.push(row);
				lastCursor = cursor;
			}

			/**
			 * Appends the remaining input from cursor to the end into
			 * row, saves the row, calls step, and returns the results.
			 */
			function finish(value)
			{
				if (ignoreLastRow)
					return returnable();
				if (typeof value === 'undefined')
					value = input.substr(cursor);
				row.push(value);
				cursor = inputLen;	// important in case parsing is paused
				pushRow(row);
				if (stepIsFunction)
					doStep();
				return returnable();
			}

			/**
			 * Appends the current row to the results. It sets the cursor
			 * to newCursor and finds the nextNewline. The caller should
			 * take care to execute user's step function and check for
			 * preview and end parsing if necessary.
			 */
			function saveRow(newCursor)
			{
				cursor = newCursor;
				pushRow(row);
				row = [];
				nextNewline = input.indexOf(newline, cursor);
			}

			/** Returns an object with the results, errors, and meta. */
			function returnable(stopped)
			{
				return {
					data: data,
					errors: errors,
					meta: {
						delimiter: delim,
						linebreak: newline,
						aborted: aborted,
						truncated: !!stopped,
						cursor: lastCursor + (baseIndex || 0)
					}
				};
			}

			/** Executes the user's step function and resets data & errors. */
			function doStep()
			{
				step(returnable());
				data = [], errors = [];
			}
		};

		/** Sets the abort flag */
		this.abort = function()
		{
			aborted = true;
		};

		/** Gets the cursor position */
		this.getCharIndex = function()
		{
			return cursor;
		};
	}


	// If you need to load Papa Parse asynchronously and you also need worker threads, hard-code
	// the script path here. See: https://github.com/mholt/PapaParse/issues/87#issuecomment-57885358
	function getScriptPath()
	{
		var scripts = document.getElementsByTagName('script');
		return scripts.length ? scripts[scripts.length - 1].src : '';
	}

	function newWorker()
	{
		if (!Papa.WORKERS_SUPPORTED)
			return false;
		if (!LOADED_SYNC && Papa.SCRIPT_PATH === null)
			throw new Error(
				'Script path cannot be determined automatically when Papa Parse is loaded asynchronously. ' +
				'You need to set Papa.SCRIPT_PATH manually.'
			);
		var workerUrl = Papa.SCRIPT_PATH || AUTO_SCRIPT_PATH;
		// Append 'papaworker' to the search string to tell papaparse that this is our worker.
		workerUrl += (workerUrl.indexOf('?') !== -1 ? '&' : '?') + 'papaworker';
		var w = new global.Worker(workerUrl);
		w.onmessage = mainThreadReceivedMessage;
		w.id = workerIdCounter++;
		workers[w.id] = w;
		return w;
	}

	/** Callback when main thread receives a message */
	function mainThreadReceivedMessage(e)
	{
		var msg = e.data;
		var worker = workers[msg.workerId];
		var aborted = false;

		if (msg.error)
			worker.userError(msg.error, msg.file);
		else if (msg.results && msg.results.data)
		{
			var abort = function() {
				aborted = true;
				completeWorker(msg.workerId, { data: [], errors: [], meta: { aborted: true } });
			};

			var handle = {
				abort: abort,
				pause: notImplemented,
				resume: notImplemented
			};

			if (isFunction(worker.userStep))
			{
				for (var i = 0; i < msg.results.data.length; i++)
				{
					worker.userStep({
						data: [msg.results.data[i]],
						errors: msg.results.errors,
						meta: msg.results.meta
					}, handle);
					if (aborted)
						break;
				}
				delete msg.results;	// free memory ASAP
			}
			else if (isFunction(worker.userChunk))
			{
				worker.userChunk(msg.results, handle, msg.file);
				delete msg.results;
			}
		}

		if (msg.finished && !aborted)
			completeWorker(msg.workerId, msg.results);
	}

	function completeWorker(workerId, results) {
		var worker = workers[workerId];
		if (isFunction(worker.userComplete))
			worker.userComplete(results);
		worker.terminate();
		delete workers[workerId];
	}

	function notImplemented() {
		throw 'Not implemented.';
	}

	/** Callback when worker thread receives a message */
	function workerThreadReceivedMessage(e)
	{
		var msg = e.data;

		if (typeof Papa.WORKER_ID === 'undefined' && msg)
			Papa.WORKER_ID = msg.workerId;

		if (typeof msg.input === 'string')
		{
			global.postMessage({
				workerId: Papa.WORKER_ID,
				results: Papa.parse(msg.input, msg.config),
				finished: true
			});
		}
		else if ((global.File && msg.input instanceof File) || msg.input instanceof Object)	// thank you, Safari (see issue #106)
		{
			var results = Papa.parse(msg.input, msg.config);
			if (results)
				global.postMessage({
					workerId: Papa.WORKER_ID,
					results: results,
					finished: true
				});
		}
	}

	/** Makes a deep copy of an array or object (mostly) */
	function copy(obj)
	{
		if (typeof obj !== 'object')
			return obj;
		var cpy = obj instanceof Array ? [] : {};
		for (var key in obj)
			cpy[key] = copy(obj[key]);
		return cpy;
	}

	function bindFunction(f, self)
	{
		return function() { f.apply(self, arguments); };
	}

	function isFunction(func)
	{
		return typeof func === 'function';
	}

	return Papa;
}));


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, global) {/*!
 * Vue.js v2.4.4
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
/*  */

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

var _toString = Object.prototype.toString;

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(val);
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,is');

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */


/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: process.env.NODE_ENV !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

var emptyObject = Object.freeze({});

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

var warn = noop;
var tip = noop;
var formatComponentName = (null); // work around flow check

if (process.env.NODE_ENV !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var name = typeof vm === 'string'
      ? vm
      : typeof vm === 'function' && vm.options
        ? vm.options.name
        : vm._isVue
          ? vm.$options.name || vm.$options._componentTag
          : vm.name;

    var file = vm._isVue && vm.$options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  var generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

function handleError (err, vm, info) {
  if (config.errorHandler) {
    config.errorHandler.call(null, err, vm, info);
  } else {
    if (process.env.NODE_ENV !== 'production') {
      warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    }
    /* istanbul ignore else */
    if (inBrowser && typeof console !== 'undefined') {
      console.error(err);
    } else {
      throw err
    }
  }
}

/*  */
/* globals MutationObserver */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

/**
 * Defer a task to execute it asynchronously.
 */
var nextTick = (function () {
  var callbacks = [];
  var pending = false;
  var timerFunc;

  function nextTickHandler () {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  // the nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore if */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();
    var logError = function (err) { console.error(err); };
    timerFunc = function () {
      p.then(nextTickHandler).catch(logError);
      // in problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) { setTimeout(noop); }
    };
  } else if (!isIE && typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]'
  )) {
    // use MutationObserver where native Promise is not available,
    // e.g. PhantomJS, iOS7, Android 4.4
    var counter = 1;
    var observer = new MutationObserver(nextTickHandler);
    var textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = function () {
      counter = (counter + 1) % 2;
      textNode.data = String(counter);
    };
  } else {
    // fallback to setTimeout
    /* istanbul ignore next */
    timerFunc = function () {
      setTimeout(nextTickHandler, 0);
    };
  }

  return function queueNextTick (cb, ctx) {
    var _resolve;
    callbacks.push(function () {
      if (cb) {
        try {
          cb.call(ctx);
        } catch (e) {
          handleError(e, ctx, 'nextTick');
        }
      } else if (_resolve) {
        _resolve(ctx);
      }
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise(function (resolve, reject) {
        _resolve = resolve;
      })
    }
  }
})();

var _Set;
/* istanbul ignore if */
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */


var uid$1 = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid$1++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value)) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (hasOwn(target, key)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (process.env.NODE_ENV !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this) : parentVal
      )
    }
  } else if (parentVal || childVal) {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn.call(this, parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (parentVal, childVal) {
  var res = Object.create(parentVal || null);
  return childVal
    ? extend(res, childVal)
    : res
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (parentVal, childVal) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key in childVal) {
    var parent = ret[key];
    var child = childVal[key];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (parentVal, childVal) {
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    var lower = key.toLowerCase();
    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
      warn(
        'Do not use built-in or reserved HTML elements as component ' +
        'id: ' + key
      );
    }
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (process.env.NODE_ENV !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options) {
  var inject = options.inject;
  if (Array.isArray(inject)) {
    var normalized = options.inject = {};
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = inject[i];
    }
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child);
  normalizeInject(child);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  if (process.env.NODE_ENV !== 'production') {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (process.env.NODE_ENV !== 'production' && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      'Invalid prop: type check failed for prop "' + name + '".' +
      ' Expected ' + expectedTypes.map(capitalize).join(', ') +
      ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (process.env.NODE_ENV !== 'production') {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      "referenced during render. Make sure to declare reactive data " +
      "properties in the data option.",
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

var mark;
var measure;

if (process.env.NODE_ENV !== 'production') {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.functionalContext = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: {} };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode, deep) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.isCloned = true;
  if (deep && vnode.children) {
    cloned.children = cloneVNodes(vnode.children);
  }
  return cloned
}

function cloneVNodes (vnodes, deep) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i], deep);
  }
  return res
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  var plain = !(passive || once$$1 || capture);
  return {
    name: name,
    plain: plain,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

// #6552
function prioritizePlainEvents (a, b) {
  return a.plain ? -1 : b.plain ? 1 : 0
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, cur, old, event;
  var toAdd = [];
  var hasModifier = false;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (!event.plain) { hasModifier = true; }
    if (isUndef(cur)) {
      process.env.NODE_ENV !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      event.handler = cur;
      toAdd.push(event);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  if (toAdd.length) {
    if (hasModifier) { toAdd.sort(prioritizePlainEvents); }
    for (var i = 0; i < toAdd.length; i++) {
      var event$1 = toAdd[i];
      add(event$1.name, event$1.handler, event$1.once, event$1.capture, event$1.passive);
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (process.env.NODE_ENV !== 'production') {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    last = res[res.length - 1];
    //  nested
    if (Array.isArray(c)) {
      res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        (last).text += String(c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[res.length - 1] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  if (comp.__esModule && comp.default) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      process.env.NODE_ENV !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                process.env.NODE_ENV !== 'production'
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : null
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once$$1) {
  if (once$$1) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$off(event[i], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (arguments.length === 1) {
      vm._events[event] = null;
      return vm
    }
    if (fn) {
      // specific handler
      var cb;
      var i$1 = cbs.length;
      while (i$1--) {
        cb = cbs[i$1];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i$1, 1);
          break
        }
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (process.env.NODE_ENV !== 'production') {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
  };
}

/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  var defaultSlot = [];
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.functionalContext === context) &&
      data && data.slot != null
    ) {
      var name = child.data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children);
      } else {
        slot.push(child);
      }
    } else {
      defaultSlot.push(child);
    }
  }
  // ignore whitespace
  if (!defaultSlot.every(isWhitespace)) {
    slots.default = defaultSlot;
  }
  return slots
}

function isWhitespace (node) {
  return node.isComment || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure((name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure((name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  vm._watcher = new Watcher(vm, updateComponent, noop);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = (parentVnode.data && parentVnode.data.attrs) || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (process.env.NODE_ENV !== 'production') {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options
) {
  this.vm = vm;
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = process.env.NODE_ENV !== 'production'
    ? expOrFn.toString()
    : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      process.env.NODE_ENV !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
var seenObjects = new _Set();
function traverse (val) {
  seenObjects.clear();
  _traverse(val, seenObjects);
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function checkOptionType (vm, name) {
  var option = vm.$options[name];
  if (!isPlainObject(option)) {
    warn(
      ("component option \"" + name + "\" should be an object."),
      vm
    );
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      if (isReservedAttribute(key) || config.isReservedAttr(key)) {
        warn(
          ("\"" + key + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (vm.$parent && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {
      defineReactive$$1(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (process.env.NODE_ENV !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  try {
    return data.call(vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  process.env.NODE_ENV !== 'production' && checkOptionType(vm, 'computed');
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (process.env.NODE_ENV !== 'production' && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (process.env.NODE_ENV !== 'production') {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : userDef;
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  if (process.env.NODE_ENV !== 'production' &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  process.env.NODE_ENV !== 'production' && checkOptionType(vm, 'methods');
  var props = vm.$options.props;
  for (var key in methods) {
    if (process.env.NODE_ENV !== 'production') {
      if (methods[key] == null) {
        warn(
          "Method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  process.env.NODE_ENV !== 'production' && checkOptionType(vm, 'watch');
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  keyOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(keyOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    observerState.shouldConvert = false;
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {
        defineReactive$$1(vm, key, result[key]);
      }
    });
    observerState.shouldConvert = true;
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
        ? Reflect.ownKeys(inject).filter(function (key) {
          /* istanbul ignore next */
          return Object.getOwnPropertyDescriptor(inject, key).enumerable
        })
        : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key];
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (process.env.NODE_ENV !== 'production' && !source) {
        warn(("Injection \"" + key + "\" not found"), vm);
      }
    }
    return result
  }
}

/*  */

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  context,
  children
) {
  var props = {};
  var propOptions = Ctor.options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var _context = Object.create(context);
  var h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true); };
  var vnode = Ctor.options.render.call(null, h, {
    data: data,
    props: props,
    children: children,
    parent: context,
    listeners: data.on || emptyObject,
    injections: resolveInject(Ctor.options.inject, context),
    slots: function () { return resolveSlots(children, context); }
  });
  if (vnode instanceof VNode) {
    vnode.functionalContext = context;
    vnode.functionalOptions = Ctor.options;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }
  return vnode
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var vnodeComponentOptions = vnode.componentOptions;
  var options = {
    _isComponent: true,
    parent: parent,
    propsData: vnodeComponentOptions.propsData,
    _componentTag: vnodeComponentOptions.tag,
    _parentVnode: vnode,
    _parentListeners: vnodeComponentOptions.listeners,
    _renderChildren: vnodeComponentOptions.children,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnodeComponentOptions.Ctor(options)
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    process.env.NODE_ENV !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (process.env.NODE_ENV !== 'production' &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    warn(
      'Avoid using non-primitive value as key, ' +
      'use string/number value instead.',
      context
    );
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (isDef(vnode)) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    return
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && isUndef(child.ns)) {
        applyNS(child, ns);
      }
    }
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      props = extend(extend({}, bindObject), props);
    }
    return scopedSlotFn(props) || fallback
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes && process.env.NODE_ENV !== 'production') {
      slotNodes._rendered && warn(
        "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
        "- this will likely cause render errors.",
        this
      );
      slotNodes._rendered = true;
    }
    return slotNodes || fallback
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInAlias
) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (Array.isArray(keyCodes)) {
    return keyCodes.indexOf(eventKeyCode) === -1
  } else {
    return keyCodes !== eventKeyCode
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var tree = this._staticTrees[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree)
      ? cloneVNodes(tree)
      : cloneVNode(tree)
  }
  // otherwise, render a fresh tree.
  tree = this._staticTrees[index] =
    this.$options.staticRenderFns[index].call(this._renderProxy);
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(ours, existing) : ours;
      }
    }
  }
  return data
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null;
  var parentVnode = vm.$vnode = vm.$options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', vm.$options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive$$1(vm, '$listeners', vm.$options._parentListeners || emptyObject, null, true);
  }
}

function renderMixin (Vue) {
  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var staticRenderFns = ref.staticRenderFns;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // if the parent didn't update, the slot nodes will be the ones from
      // last render. They need to be cloned to ensure "freshness" for this render.
      for (var key in vm.$slots) {
        var slot = vm.$slots[key];
        if (slot._rendered) {
          vm.$slots[key] = cloneVNodes(slot, true /* deep */);
        }
      }
    }

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    if (staticRenderFns && !vm._staticTrees) {
      vm._staticTrees = [];
    }
    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render function");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        vnode = vm.$options.renderError
          ? vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)
          : vm._vnode;
      } else {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };

  // internal render helpers.
  // these are exposed on the instance prototype to reduce generated render
  // code size.
  Vue.prototype._o = markOnce;
  Vue.prototype._n = toNumber;
  Vue.prototype._s = toString;
  Vue.prototype._l = renderList;
  Vue.prototype._t = renderSlot;
  Vue.prototype._q = looseEqual;
  Vue.prototype._i = looseIndexOf;
  Vue.prototype._m = renderStatic;
  Vue.prototype._f = resolveFilter;
  Vue.prototype._k = checkKeyCodes;
  Vue.prototype._b = bindObjectProps;
  Vue.prototype._v = createTextVNode;
  Vue.prototype._e = createEmptyVNode;
  Vue.prototype._u = resolveScopedSlots;
  Vue.prototype._g = bindObjectListeners;
}

/*  */

var uid = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = "vue-perf-init:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(((vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  opts.parent = options.parent;
  opts.propsData = options.propsData;
  opts._parentVnode = options._parentVnode;
  opts._parentListeners = options._parentListeners;
  opts._renderChildren = options._renderChildren;
  opts._componentTag = options._componentTag;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;
  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue$3 (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue$3)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (process.env.NODE_ENV !== 'production') {
      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        warn(
          'Invalid component name: "' + name + '". Component names ' +
          'can only contain alphanumeric characters and the hyphen, ' +
          'and must start with a letter.'
        );
      }
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production') {
          if (type === 'component' && config.isReservedTag(id)) {
            warn(
              'Do not use built-in or reserved HTML elements as component ' +
              'id: ' + id
            );
          }
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

var patternTypes = [String, RegExp, Array];

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (cache, current, filter) {
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        if (cachedNode !== current) {
          pruneCacheEntry(cachedNode);
        }
        cache[key] = null;
      }
    }
  }
}

function pruneCacheEntry (vnode) {
  if (vnode) {
    vnode.componentInstance.$destroy();
  }
}

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes
  },

  created: function created () {
    this.cache = Object.create(null);
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache[key]);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this.cache, this._vnode, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this.cache, this._vnode, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var vnode = getFirstComponentChild(this.$slots.default);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      if (name && (
        (this.include && !matches(this.include, name)) ||
        (this.exclude && matches(this.exclude, name))
      )) {
        return vnode
      }
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (this.cache[key]) {
        vnode.componentInstance = this.cache[key].componentInstance;
      } else {
        this.cache[key] = vnode;
      }
      vnode.data.keepAlive = true;
    }
    return vnode
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

Vue$3.version = '2.4.4';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);



var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      process.env.NODE_ENV !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setAttribute (node, key, val) {
  node.setAttribute(key, val);
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  var inPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (process.env.NODE_ENV !== 'production') {
        if (data && data.pre) {
          inPre++;
        }
        if (
          !inPre &&
          !vnode.ns &&
          !(config.ignoredElements.length && config.ignoredElements.indexOf(tag) > -1) &&
          config.isUnknownElement(tag)
        ) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (process.env.NODE_ENV !== 'production' && data && data.pre) {
        inPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    var ancestor = vnode;
    while (ancestor) {
      if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
        nodeOps.setAttribute(vnode.elm, i, '');
      }
      ancestor = ancestor.parent;
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, elmToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
        } else {
          elmToMove = oldCh[idxInOld];
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !elmToMove) {
            warn(
              'It seems there are duplicate keys that is causing an update error. ' +
              'Make sure each v-for item has a unique key.'
            );
          }
          if (sameVnode(elmToMove, newStartVnode)) {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var bailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue) {
    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.elm = elm;
      vnode.isAsyncPlaceholder = true;
      return true
    }
    if (process.env.NODE_ENV !== 'production') {
      if (!assertNodeMatch(elm, vnode)) {
        return false
      }
    }
    vnode.elm = elm;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' &&
                typeof console !== 'undefined' &&
                !bailed
              ) {
                bailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' &&
                typeof console !== 'undefined' &&
                !bailed
              ) {
                bailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        for (var key in data) {
          if (!isRenderedModule(key)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode) {
    if (isDef(vnode.tag)) {
      return (
        vnode.tag.indexOf('vue-component') === 0 ||
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (process.env.NODE_ENV !== 'production') {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }
        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        if (isDef(vnode.parent)) {
          // component root element replaced.
          // update parent placeholder node element, recursively
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            }
            ancestor = ancestor.parent;
          }
        }

        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  /* istanbul ignore if */
  if (isIE9 && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;



function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + "," + args)
  }
}

/*  */

/*  */

/**
 * Cross-platform code generation for component v-model
 */


/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */


/**
 * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
 *
 * for loop possible cases:
 *
 * - test
 * - test[idx]
 * - test[test1[idx]]
 * - test["a"][idx]
 * - xxx.test[a[a].test1[idx]]
 * - test.xxx.a["asa"][test1[idx]]
 *
 */

var str;
var index$1;

/*  */

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  var event;
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    // Chrome fires microtasks in between click/change, leads to #4521
    event = isChrome ? 'click' : 'change';
    on[event] = [].concat(on[CHECKBOX_RADIO_TOKEN], on[event] || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  if (once$$1) {
    var oldHandler = handler;
    var _target = target$1; // save current target element in closure
    handler = function (ev) {
      var res = arguments.length === 1
        ? oldHandler(ev)
        : oldHandler.apply(null, arguments);
      if (res !== null) {
        remove$2(event, handler, capture, _target);
      }
    };
  }
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(event, handler, capture);
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, vnode, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (
  elm,
  vnode,
  checkVal
) {
  return (!elm.composing && (
    vnode.tag === 'option' ||
    isDirty(elm, checkVal) ||
    isInputChanged(elm, checkVal)
  ))
}

function isDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isInputChanged (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers) && modifiers.number) {
    return toNumber(value) !== toNumber(newVal)
  }
  if (isDef(modifiers) && modifiers.trim) {
    return value.trim() !== newVal.trim()
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def$$1) {
  if (!def$$1) {
    return
  }
  /* istanbul ignore else */
  if (typeof def$$1 === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser && window.requestAnimationFrame
  ? window.requestAnimationFrame.bind(window)
  : setTimeout;

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var model$1 = {
  inserted: function inserted (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    process.env.NODE_ENV !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: model$1,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$options._renderChildren;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag || isAsyncPlaceholder(c); });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (process.env.NODE_ENV !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if (process.env.NODE_ENV !== 'production' &&
      mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild && (oldChild.data.transition = extend({}, data));
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (process.env.NODE_ENV !== 'production') {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    var body = document.body;
    var f = body.offsetHeight; // eslint-disable-line

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.isReservedAttr = isReservedAttr;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
setTimeout(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if (process.env.NODE_ENV !== 'production' && isChrome) {
      console[console.info ? 'info' : 'log'](
        'Download the Vue Devtools extension for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      );
    }
  }
  if (process.env.NODE_ENV !== 'production' &&
    config.productionTip !== false &&
    inBrowser && typeof console !== 'undefined'
  ) {
    console[console.info ? 'info' : 'log'](
      "You are running Vue in development mode.\n" +
      "Make sure to turn on production mode when deploying for production.\n" +
      "See more tips at https://vuejs.org/guide/deployment.html"
    );
  }
}, 0);

/*  */

/* harmony default export */ __webpack_exports__["a"] = (Vue$3);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0), __webpack_require__(1)))

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_app_vue__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_46631714_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_app_vue__ = __webpack_require__(32);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(22)
}
var normalizeComponent = __webpack_require__(12)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_app_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_46631714_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_app_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/app.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] app.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-46631714", Component.options)
  } else {
    hotAPI.reload("data-v-46631714", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(23);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(11)("9f57cfda", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/css-loader/index.js?sourceMap!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-46631714\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./app.vue", function() {
     var newContent = require("!!../node_modules/css-loader/index.js?sourceMap!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-46631714\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./app.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"app.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 24 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__design_summary_vue__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_shipengine_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_shipengine_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__lib_shipengine_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_shipimporter__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_shipimporter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__lib_shipimporter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dist_design_json__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dist_design_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__dist_design_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dist_swb_kepler_recreations_raw_csv__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dist_swb_kepler_recreations_raw_csv___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__dist_swb_kepler_recreations_raw_csv__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dist_parts_C8_csv__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dist_parts_C8_csv___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__dist_parts_C8_csv__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__dist_modules_C8_csv__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__dist_modules_C8_csv___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__dist_modules_C8_csv__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__dist_frames_C8_csv__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__dist_frames_C8_csv___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__dist_frames_C8_csv__);
//
//
//
//
//
//
//












const se_db = new __WEBPACK_IMPORTED_MODULE_1__lib_shipengine_js___default.a.DB({
	parts: __WEBPACK_IMPORTED_MODULE_5__dist_parts_C8_csv___default.a,
	frames: __WEBPACK_IMPORTED_MODULE_7__dist_frames_C8_csv___default.a,
	modules: __WEBPACK_IMPORTED_MODULE_6__dist_modules_C8_csv___default.a
});

/* harmony default export */ __webpack_exports__["a"] = ({
	name: 'app',
	components: {
		DesignSummary: __WEBPACK_IMPORTED_MODULE_0__design_summary_vue__["a" /* default */]
	},
	data() {
		return {
			design_json: __WEBPACK_IMPORTED_MODULE_3__dist_design_json___default.a,
			se_db: se_db
		};
	},
	computed: {
		se_design() {
			return new __WEBPACK_IMPORTED_MODULE_1__lib_shipengine_js___default.a.Design(se_db, this.data.design_json);
		}
	},
	methods: {
		swap_design() {
			this.design_json = __WEBPACK_IMPORTED_MODULE_2__lib_shipimporter___default.a.import_design(__WEBPACK_IMPORTED_MODULE_4__dist_swb_kepler_recreations_raw_csv___default.a);
			// this.design_json['Name'] = 'Foo!';
			// this.design_json['Subsystems'][4]['Settings']['Phaser Arrays'] = !this.design_json['Subsystems'][4]['Settings']['Phaser Arrays']
			;
		}
	}
});

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_design_summary_vue__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_12e2d818_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_design_summary_vue__ = __webpack_require__(30);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(27)
}
var normalizeComponent = __webpack_require__(12)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_design_summary_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_12e2d818_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_design_summary_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/design-summary.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] design-summary.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-12e2d818", Component.options)
  } else {
    hotAPI.reload("data-v-12e2d818", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(28);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(11)("24e9e8a8", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/css-loader/index.js?sourceMap!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-12e2d818\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./design-summary.vue", function() {
     var newContent = require("!!../node_modules/css-loader/index.js?sourceMap!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-12e2d818\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./design-summary.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)(true);
// imports


// module
exports.push([module.i, "\n.design-summary {\n\tbackground-color: #29e;\n\tborder: 2px solid #07a;\n\twidth: 100%;\n\tmargin: 0px;\n\tbox-sizing: border-box;\n\tmin-height: 50px;\n\tposition: fixed;\n\tleft: 0px;\n\ttop: 0px;\n}\n", "", {"version":3,"sources":["/home/saul/src/projects/tbg/tbg-shipbuilder/src/src/design-summary.vue?61e234df"],"names":[],"mappings":";AAiCA;CACA,uBAAA;CACA,uBAAA;CACA,YAAA;CACA,YAAA;CACA,uBAAA;CACA,iBAAA;CACA,gBAAA;CACA,UAAA;CACA,SAAA;CACA","file":"design-summary.vue","sourcesContent":["<template>\n  <div class=\"design-summary\">\n\t<div>{{se_design.name}}</div>\n\t<div>{{se_design.pretty_statline}}</div>\n\t<div>{{se_design.pretty_miscstats}}</div>\n\t<div>{{se_design.pretty_statline_raw}}</div>\n\t<div>{{se_design.pretty_buildinfo}}</div>\n  </div>\n</template>\n\n\n<script>\n\nimport ShipEngine from '../lib/shipengine.js';\n\nexport default {\n\tname: 'DesignSummary',\n\tprops: {\n\t\tse_db: Object,\n\t\tdesign_json: Object,\n\t},\n\tcomputed: {\n\t\tse_design () {\n\t\t\treturn new ShipEngine.Design(this.se_db, this.design_json);\n\t\t},\n\t},\n\tmethods: {\n\t},\n}\n</script>\n\n\n<style>\n.design-summary {\n\tbackground-color: #29e;\n\tborder: 2px solid #07a;\n\twidth: 100%;\n\tmargin: 0px;\n\tbox-sizing: border-box;\n\tmin-height: 50px;\n\tposition: fixed;\n\tleft: 0px;\n\ttop: 0px;\n}\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_shipengine_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_shipengine_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__lib_shipengine_js__);
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["a"] = ({
	name: 'DesignSummary',
	props: {
		se_db: Object,
		design_json: Object
	},
	computed: {
		se_design() {
			return new __WEBPACK_IMPORTED_MODULE_0__lib_shipengine_js___default.a.Design(this.se_db, this.design_json);
		}
	},
	methods: {}
});

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "design-summary"
  }, [_c('div', [_vm._v(_vm._s(_vm.se_design.name))]), _vm._v(" "), _c('div', [_vm._v(_vm._s(_vm.se_design.pretty_statline))]), _vm._v(" "), _c('div', [_vm._v(_vm._s(_vm.se_design.pretty_miscstats))]), _vm._v(" "), _c('div', [_vm._v(_vm._s(_vm.se_design.pretty_statline_raw))]), _vm._v(" "), _c('div', [_vm._v(_vm._s(_vm.se_design.pretty_buildinfo))])])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-12e2d818", esExports)
  }
}

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = ",,Class Name,SWB Cheapish Kepler,,,,Total,C,S,H,L,P,D,Weight,BR Cost,SR Cost,Pwr Cost,Pwr Gen,O,E,T,Reliability,Build Time,Tech Time,,,Snapshots,,,,,,,Part & Frame Classifications (can be hidden),,,,,,,,Refit Formulas (can be hidden),,,,,,,,,,,,,,,,,,Part & Qty (can be hidden),,,Stat & Cost Display Formulas (can be hidden),,,,,,,,,,,,,,,,,,Stat & Cost Formulas (can be hidden),,,,,,,,,,,,,,,,,,,Stat & Cost Intermediate Constants and Formulas (can be hidden),,,,,,,,,,,,,Raw Part Stats (can be hidden),,,,,,,,,,,,,,SNAPSHOT ARCHIVE: Part & Qty (can be hidden),,,SNAPSHOT ARCHIVE: Stat & Cost Display Formulas (can be hidden),,,,,,,,,,,,,,,,,,SNAPSHOT ARCHIVE: Stat & Cost Formulas (can be hidden),,,,,,,,,,,,,,,,,,,SNAPSHOT ARCHIVE: Stat & Cost Intermediate Constants and Formulas (can be hidden),,,,,,,,,,,,,SNAPSHOT ARCHIVE: Raw Part Stats (can be hidden),,,,,,,,,,,,,Validation Range Columns (can be hidden),,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,Original Design Mode,No Diff with Snapshots,,Allow N/A Parts,,Raw,2.14,7.02,2.11,4.05,5.02,4.13,947.800,94.780,74.455,107.465,107.569,1.32,2.64,3.07,99.315%,2 2/12,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,Component Name,Principal Frame,Tactical Sub-Frame,Operations Sub-Frame,Hull Sub-Frame,Engineering Sub-Frame,Warp Core Sub-Frame,Primary Phasers,Secondary Phasers,Torpedo System,Short-Range Sensors,Targeting Computer,Deflector Shields,Backup Deflectors,Impulse Engine Pwr,Long-Range Sensors,Navigational Sensors,Survey Sensors,Science Labs,Computer Core,Operating System,Secondary Core,Diplomatic Package,Recreation Package,Sickbay,Hull System,Structural Integrity Fields,Navigational Deflector,Nacelle System,Replication Package,Fuel & Matter Stores,Warp Core Type,Safety/Performance,M/AM Injectors,Coolant Systems,EPS Manifold System,Eject System,Module Type,Module Variant\r\n,,Show Value,Show Costs,,Size Filter,Tier Filter,Final,2.00,7.00,2.00,4.00,5.00,4.00,948,95,75,107,108,2,3,4,99.32%,2 2/12,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,Type,Frame,Tactical,Operations,Hull,Engineering,Warp Core,Phasers,Phasers,Torpedoes,Short-Range Sensors,Targeting Computers,Deflector Shields,Deflector Shields,Impulse Engine Power,Long-Range Sensors,Navigational Sensors,Survey Sensors,Science Labs,Computer Cores,Operating System,Computer Cores,Diplomatic Packages,Recreation Packages,Sickbays,Hull System,Structural Integrity Fields,Navigational Deflectors,Nacelles,Replication Packages,Fuel & Matter Stores,Warp Core Types,Safety/Performance,Matter/Anti-Matter Injectors,Coolant Systems,EPS Manifold System,Eject System,,\r\n,\"Fixing Dropdowns (Data Validation Ranges) ... (if this stays for longer than 3 minutes, please run menu -> Ship Design Scripts -> Fix Dropdowns (Data Validation Ranges))\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,Parent Type,,Frame,Frame,Frame,Frame,Frame,Tactical,Tactical,Tactical,Tactical,Tactical,Tactical,Tactical,Tactical,Operations,Operations,Operations,Operations,Operations,Operations,Operations,Operations,Operations,Operations,Engineering,Engineering,Engineering,Engineering,Engineering,Engineering,Warp Core,Warp Core,Warp Core,Warp Core,Warp Core,Warp Core,,\r\n,,Design Validation & Misc Info,,Subsystem,Weight,Weight Cap,Power Cost,Power Gen,,,Stat,,V,Weight,BR Cost,SR Cost,Pwr Cost,Pwr Gen,O,E,T,Reliability,Build Time,Tech Time,,,Live,Click to Archive 1,,Click to Archive 2,,,,,Constants,,,,,,,,,,,Stat,V,Weight,BR Cost,SR Cost,Pwr Cost,Pwr Gen,O,E,T,Reliability,,,,,,,,,,,Stat,V,Weight,BR Cost,SR Cost,Pwr Cost,Pwr Gen,O,E,T,Reliability,,,,,,,,,Stat,V,Weight,BR Cost,SR Cost,Pwr Cost,Pwr Gen,O,E,T,Reliability,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,Stat,V,Weight,BR Cost,SR Cost,Pwr Cost,Pwr Gen,O,E,T,Reliability,,,,,,,,,Stat,V,Weight,BR Cost,SR Cost,Pwr Cost,Pwr Gen,O,E,T,Reliability,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,Filter to Part,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,Current Year,,Frame,135.00,900,0.00,0.00,,,Combat,,2,54.840,5.484,3.594,11.334,0.000,0.32,0.60,0.29,99.998%,TODO,,,,Class,SWB Cheapish Kepler,,,,Design Sheet Version: C8,,,Size-to-Weight-Cap Multiplier,,300,,,,,,,,,Combat,2,54.840,5.484,3.594,11.334,0.000,0.32,0.60,0.29,-0.002%,,,,,,,,,,,Combat,2,54.840,5.484,3.594,11.334,0.000,0.319,0.597,0.293,99.998%,,,,,,,,,Combat,2.000,54.840,5.484,3.594,11.334,0.000,0.319,0.597,0.293,99.998%,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,Combat,0,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,100.000%,,,,,,,,,Combat,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,100.000%,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,Tier Filter,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,2316,,Tactical,131.50,[225.0],29.99,0.00,,,Science,,7,227.667,22.767,19.257,18.061,0.000,0.34,0.64,1.33,99.998%,,,,,Stat Line,C2 S7 H2 L4 P5 D4 - 95br 75sr - 948kt [2 2/12]yr - O2 E3 T4,,,,,,,BR-to-Weight Multiplier,,10,,,,,,,,,Science,7,227.667,22.767,19.257,18.061,0.000,0.34,0.64,1.33,-0.002%,,,,,,,,,,,Science,7,227.667,22.767,19.257,18.061,0.000,0.344,0.642,1.329,99.998%,,,,,,,,,Science,7.000,227.667,22.767,19.257,18.061,0.000,0.344,0.642,1.329,99.998%,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,Science,0,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,100.000%,,,,,,,,,Science,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,100.000%,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,Min Weight/Size Class Filter,,1,1,1,1,1,,,,,,,,,,,,,,,,,,,,,1,,,,,,,,,,,\r\n,,Weight Class,,Operations,391.00,[405.0],41.98,0.00,,,Hull,,2,73.593,7.359,5.699,5.273,0.000,0.02,0.69,0.21,99.899%,,,,,,Evasion Chance: 21.74%,Reliability: 99.32% (Annual Breakdown Chance: 0.68%),,Warp Core Breach Chance: 36.50%,,,,BR Cost Round - Frigate,,5,,,,,,,,,Hull,2,73.593,7.359,5.699,5.273,0.000,0.02,0.69,0.21,-0.101%,,,,,,,,,,,Hull,2,73.593,7.359,5.699,5.273,0.000,0.020,0.686,0.215,99.899%,,,,Weight Class,,,,,Hull,2.000,73.593,7.359,5.699,5.273,0.000,0.020,0.686,0.215,99.899%,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,Hull,0,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,100.000%,,,,Weight Class,,,,,Hull,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,100.000%,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,Max Weight/Size Class Filter,,1,1,1,1,1,,,,,,,,,,,,,,,,,,,,,1,,,,,,,,,,,\r\n,,Frigate,,Hull,34.50,[135.0],0.00,0.00,,,Shield,,4,42.451,4.245,7.948,22.233,0.000,0.05,0.07,0.32,99.999%,,,,,SDB Info,C[2.14] S[7.03] H[2.11] L[4.06] P[5.03] D[4.13] - [94.78]br [74.45]sr - [947.80]kt [2 2/12]yr - O[1.31] E[2.64] T[3.06] - DesignYear[2316],,,,,,Live,BR Cost Round - Cruiser,,10,,,,,,,,,Shield,4,42.451,4.245,7.948,22.233,0.000,0.05,0.07,0.32,-0.001%,,,,,,,,,,,Shield,4,42.451,4.245,7.948,22.233,0.000,0.051,0.068,0.316,99.999%,,,,Frigate,,,,,Shield,4.000,42.451,4.245,7.948,22.233,0.000,0.051,0.068,0.316,99.999%,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,No Archive,,,,,,,Shield,0,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,100.000%,,,,Explorer,,,,,Shield,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,100.000%,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,Allow No Effect Part,-,-,-,-,-,-,TRUE,TRUE,TRUE,TRUE,TRUE,TRUE,TRUE,FALSE,TRUE,TRUE,TRUE,TRUE,FALSE,FALSE,TRUE,TRUE,TRUE,TRUE,FALSE,TRUE,FALSE,FALSE,TRUE,FALSE,FALSE,FALSE,FALSE,FALSE,FALSE,TRUE,-,-\r\n,,Evasion Chance,,Engineering,111.00,[315.0],13.50,0.00,,,Presence,,5,159.915,15.991,14.249,18.559,0.000,0.27,0.04,0.45,99.998%,,,,,,Power[107.47/107.57] - Internal[897.8/900] Tactical[131.5/225] Operations[391.0/405] Hull[34.5/135] Engineering[111.0/315] WarpCore[94.8/225],,,,,,SWB Cheapish Kepler,BR Cost Round - Explorer,,10,,,,,,,,,Presence,5,159.915,15.991,14.249,18.559,0.000,0.27,0.04,0.45,-0.002%,,,,,,,,,,,Presence,5,159.915,15.991,14.249,18.559,0.000,0.266,0.036,0.450,99.998%,,,,Evasion Chance,,,,,Presence,5.000,159.915,15.991,14.249,18.559,0.000,0.266,0.036,0.450,99.998%,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,Presence,0,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,100.000%,,,,Evasion Chance,,,,,Presence,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,100.000%,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,[T-3] 250kt Frigate Frame,[T-3][SR+] Sm Frigate Tactical Suite,[T-3][T--SR--] Sm Frigate Operations Suite,[T-3] Sm Frigate Hull Suite,[T-3][T--] Sm Frigate Engineering Suite,[T-3][C+SR-] Sm Frigate Warp Core Suite,No Phasers,No Phasers,No Torp,No Sensor,No TCU,No Shields,No Shields,[T-3][M] SDB-26 Std Impulse,No Sensor,No Sensor,No Survey Sensors,No Science,[T-3][L] Mkv V Monotronic Core,[T-3] Majel OS,No Core,No Diplomacy,No Onboard Recreation,No Sickbay,[T-3][L] Single Alloy-2 Duranium Hull,No SIF,[T-3][L] Saucer-Only Polyphasic Deflector,[T-3][L] 2 X Saladin Nacelles,No Onboard Industry,[T-3][L] 2220-Light Pattern Deuterium Tanks,[T-2] Yoyodyne Pulse Fusion (Fusion Only),,[T-2][R--]Integrated Injectors,[T-2][R-SR-] Integrated Coolant,[T-3][L][R+] Tellar HIG-63 Pulse Injection Manifold,No Eject,No Module,-\r\n,,21.74%,,Warp Core,94.80,[225.0],5.00,107.57,,,Reaction,,4,144.534,14.453,14.019,27.006,0.000,0.14,0.20,0.20,99.999%,,,,,Size,Frame Options,#,Operations Subsystem Options,#,Engineering Subsystem Options,,,SR Cost Round - Frigate,,5,,,,,,,,,Reaction,4,144.534,14.453,14.019,27.006,0.000,0.14,0.20,0.20,-0.001%,,,,,,,,,,,Reaction,4,144.534,14.453,14.019,27.006,0.000,0.138,0.204,0.196,99.999%,,,,21.741%,,,,,Reaction,4.000,144.534,14.453,14.019,27.006,0.000,0.138,0.204,0.196,99.999%,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,Reaction,0,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,100.000%,,,,30.000%,,,,,Reaction,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,100.000%,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,[T-3] 400kt Frigate Frame,[T-3][O-] Md Frigate Tactical Suite,[T-3][OET-SR-] Md Frigate Operations Suite,[T-3][C-] Md Frigate Hull Suite,[T-3][OET-SR-] Md Frigate Engineering Suite,[T-3] Md Frigate Warp Core Suite,[T-3][L] Model 31 Phaser Bank,[T-3][L] Model 31 Phaser Bank,[T-3][M] TSF-2 Torpedo System,[T-3][L] Mark-I-Light SR Lateral Sensor Array,[T-3][L] Model 17 Light TCU,[T-3][L] AAE-L Monophasic Escort Pattern,[T-3][L] AAE-L Monophasic Escort Pattern,[T-3][H] SDB R-Type Heavy Impulse,[T-3][L] Mark-I-Light LR Sensor Array,[T-3][L] Mark-I-Light Nav Sensors,,[T-3][L] Pattern U Compact Lab,[T-3][H] Mk V-B Monotronic Core,[T-2] Majel 1.5 OS,[T-3][L] Mkv V Monotronic Core,[T-3][L] Escort Diplomatic Package '24,[T-1][M] 2260s Rec Space,[T-3][L] S-Medical '24 Standard Sickbay,[T-3][M] Double Alloy-2 Duranium Hull,[T-3][L] Type-I-L SIF,[T-2][L] Saucer-Only Gravitic Deflector,[T-3][H] 2 X Ranger Heavy Nacelles,[T-3][M] S-Medical Mk I Protein Synth,[T-3][M] 2220-Heavy Pattern Deuterium Tanks,[T-3][L][C+] Delta Vega-12 Warp Core,,[T-3][L][C-] Luna-I High-Efficiency M/AM System,[T-3][L][R-] Mk IV Mod L Coolant System,[T-3][M][R++E+] VSA-1 Plasma Manifold,[T-3] Manual Ejection - Early Mechanical,Miranda Rollbar,\r\n,,Warp Core Breach Chance,,Internal Total,897.80,[900],90.47,107.57,,,Power,,1,94.800,9.480,9.688,5.000,107.569,0.17,0.40,0.26,99.425%,,,,,3.000,[T1] 900kt Frigate Frame,,[T2][OE--] Lg Frigate Operations Suite,,[T2][OET-SR-] Md Frigate Engineering Suite,,,SR Cost Round - Cruiser,,5,,,,,,,,,Power,-2,94.800,9.480,9.688,5.000,104.569,0.17,0.40,0.26,-0.575%,,,,,,,,,,,Power,1,94.800,9.480,9.688,5.000,107.569,0.173,0.405,0.263,99.425%,,,,Warp Core Breach Chance,,,,,Power,1.000,94.800,9.480,9.688,5.000,107.569,0.173,0.405,0.263,99.425%,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,Power,3,0.000,0.000,0.000,0.000,3.000,0.000,0.000,0.000,100.000%,,,,Warp Core Breach Chance,,,,,Power,3.000,0.000,0.000,0.000,0.000,3.000,0.000,0.000,0.000,100.000%,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,[T-3] 600kt Frigate Frame,[T-3][O--SR-] Lg Frigate Tactical Suite,[T-3][OE--] Lg Frigate Operations Suite,[T-3][C--] Lg Frigate Hull Suite,[T-3][OE--SR--] Lg Frigate Engineering Suite,[T-3][C-SR+] Lg Frigate Warp Core Suite,[T-3][H] Model 28 Twin Phaser Bank,[T-3][H] Model 28 Twin Phaser Bank,[T-3][H] Mod 3a Battery System,[T-3][M] Mark-I-Medium SR Lateral Sensor Array,[T-3][M] Model 31 Advanced TCU,[T-3][M] AAE-M Cyclic Monophasic,[T-3][M] AAE-M Cyclic Monophasic,[T-2][M] SDB-44 Std Impulse,[T-3][M] Mark-I-Heavy LR Sensors,[T-3][H] Mark-I-Heavy Nav Sensors,,[T-3][M] Pattern V Lab,[T-2][L] SFA Mk1 Duotronic Core,[T-1] Majel 2.0 OS,[T-3][H] Mk V-B Monotronic Core,[T-3][M] Cruiser Diplomatic Package '20,[T0][M] 2280s Rec Space,[T-3][H] S-Medical '25 Explorer Sickbay,[T-3][H] Duranium w/ Bartridium Rebar,[T-3][M] Type-I SIF,[T-1][L] Saucer-Only Graviton Deflector,[T-2][L] 2 X Soyuz Nacelles,[T-3][H] S-Medical Mk I High-Endurance Protein Synth,[T-3][H] 2220-Large Ship Pattern Deuterium Tanks,[T-3][H][R+C+] Venus-I C-Layout Warp Core,,[T-3][M][R+] Mk IV M/AM System,[T-3][M] Mk IV Yoyodyne Coolant System,[T-3][H][R++O+] YYD-M3 Manifold,[T-2] Manual Ejection - Mechanical,300kt Module Placeholder,\r\n,,36.50%,,Nacelles,50.00,0.00,17.00,0.00,,,Frame,,,150.000,15.000,0.000,0.000,0.000,0.00,0.00,0.00,100.000%,,,,,Size,Module Options,2,[T2][H] Mark-VII-Heavy LR Sensor Array,2,[T2][M] Type-VI SIF,,,SR Cost Round - Explorer,,10,,,,,,,,,Frame,,150.000,0.000,0.000,0.000,0.000,0.00,0.00,0.00,0.000%,,,,,,,,,,,Frame,,150.000,15.000,0.000,0.000,0.000,0.000,0.000,0.000,100.000%,,,,36.500%,,,,,Frame,,150.000,15.000,0.000,0.000,0.000,0.000,0.000,0.000,100.000%,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,Frame,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,100.000%,,,,100.000%,,,,,Frame,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,100.000%,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,[T-2] 300kt Frigate Frame,[T-2][SR+] Sm Frigate Tactical Suite,[T-2][T--SR--] Sm Frigate Operations Suite,[T-2] Sm Frigate Hull Suite,[T-2][T--] Sm Frigate Engineering Suite,[T-2][C+SR-] Sm Frigate Warp Core Suite,[T-2][L] Model 47 Phaser Bank,[T-2][L] Model 47 Phaser Bank,[T-2][M] TSF-3 Torpedo System,[T-3][H] Mark-I-Heavy SR Lateral Sensor Array,[T-3][H] Model 20 Heavy TCU,[T-3][H] AAE-H Monophasic Heavy Pattern,[T-3][H] AAE-H Monophasic Heavy Pattern,[T-2][H] SDB C-Type Heavy Impulse,[T-3][H] Mark-II-Heavy LR Sensor Array,[T-3][H] Mark-II-Heavy Nav Array,,[T-3][H] Pattern S Lab,[T-2][H] SFA MkI-B Duotronic Core,[T-2] Civilian OS,[T-2][L] SFA Mk1 Duotronic Core,[T-3][H] Explorer Diplomatic Package '28,[T1][L] 2300s Compact Rec Space,[T-2][L] S-Medical '42 Standard Sickbay,[T-2][L] Single Alloy-4 Duranium Hull,[T-3][H] Mars-III Special SIF,[T0][L] Graviton Beam Deflector Saucer-Only,[T-2][H] 2 X Constitution Heavy Nacelles,[T-2][M] S-Medical Mk II Protein Synth,[T-2][L] 2240-Light Pattern Deuterium Tanks,[T-3][H][C-SR+] YYD-VI Heavy Core,,[T-3][H][C+SR+] Mk IV High Volume M/AM System,[T-2][L][R-] Mk V Mod L Coolant System,[T-2][L][R+] Tellar HIG-76 Pulse Injection Manifold,[T-1] Manual Ejection - Basic EM Rails,450kt Module Placeholder,\r\n,,Militarisation Cost,,Module,0.00,0.00,0.00,0.00,,,Module,,,0.000,0.000,0.000,0.000,0.000,0.00,0.00,0.00,100.000%,,,,,0.00,No Module,2,[T2][H] Mark-VII-Heavy Nav Array ,3,[T1][L] Modulated Graviton Beam Deflector Saucer-Only,,,,,,,,,,,,,,Module,,0.000,0.000,0.000,0.000,0.000,0.00,0.00,0.00,0.000%,,,,,,,,,,,Module,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,100.000%,,,,Militarisation Cost,,0,,,Module,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,100.000%,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,Module,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,100.000%,,,,Militarisation Cost,,4,,,Module,,0,0.000,0.000,0.000,0.000,0,0,0,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,[T-2] 450kt Frigate Frame,[T-2][O-] Md Frigate Tactical Suite,[T-2][OET-SR-] Md Frigate Operations Suite,[T-2][C-] Md Frigate Hull Suite,[T-2][OET-SR-] Md Frigate Engineering Suite,[T-2] Md Frigate Warp Core Suite,[T-2][H] Model 44 Twin Phaser Bank,[T-2][H] Model 44 Twin Phaser Bank,[T-2][H] Mod 4 Battery System,[T-2][L] Mark-III-Light SR Lateral Sensor Array,[T-2][L] Model 37 Light TCU,[T-2][L] AAE-B-L Monophasic Escort Pattern,[T-2][L] AAE-B-L Monophasic Escort Pattern,[T-1][M] SDB-65 Std Impulse,[T-2][L] Mark-II-Light LR Sensor Array,[T-2][L] Mark-II-Light Nav Sensors,,[T-2][L] Pattern W Compact Lab,[T-1][L] Type-I Duotronic Core,[T0] Majel 2.1 OS,[T-2][H] SFA MkI-B Duotronic Core,[T-2][L] Escort Diplomatic Package '41,[T1][M] 2300s Rec Space,[T-2][H] S-Medical '46 Explorer Sickbay,[T-2][M] Double Alloy-4 Duranium Hull,[T-2][L] Type-II-L SIF,[T1][L] Modulated Graviton Beam Deflector Saucer-Only,[T-1][L] 2 X Miranda Nacelles,[T-2][H] S-Medical Mk II High-Endurance Protein Synth,[T-2][M] 2240-Heavy Pattern Deuterium Tanks,[T-2][L][C+] Delta Vega-12 Warp Core,,[T-2][L][C-] Luna-II High-Efficiency M/AM System,[T-2][M] Mk V Yoyodyne Coolant System,[T-2][M][R++E+] VSA-2 Plasma Manifold,[T0] EngOS Monitoring - Heavy EM Rails,,\r\n,,0,,Total,947.80,900,107.47,107.57,,,Total,,24,947.800,94.780,74.455,107.465,107.569,1.31,2.64,3.06,99.315%,,,,,#,Tactical Subsystem Options,0,No Survey Sensors,1,[T1][L] 2 X Centaur-A Pattern Nacelle,,,,,,,,,,,,,,Total,24,947.800,79.780,74.455,107.465,104.569,1.31,2.64,3.06,-0.685%,,,,,,,,,,,Total,24,947.800,94.780,74.455,107.465,107.569,1.312,2.638,3.061,99.315%,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,Total,0,0.000,0.000,0.000,0.000,3.000,0.000,0.000,0.000,100.000%,,,,\"S=0, P=0\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,[T-2] 600kt Frigate Frame,[T-2][O--SR-] Lg Frigate Tactical Suite,[T-2][OE--] Lg Frigate Operations Suite,[T-2][C--] Lg Frigate Hull Suite,[T-2][OE--SR--] Lg Frigate Engineering Suite,[T-2][C-SR+] Lg Frigate Warp Core Suite,[T-1][L] Model 68 Phaser Bank,[T-1][L] Model 68 Phaser Bank,[T-1][M] Mk-I Torpedo System,[T-2][M] Mark-III-Medium SR Lateral Sensor Array,[T-2][M] Model 42 Advanced TCU,[T-2][M] AAE-B-M Cyclic Monophasic,[T-2][M] AAE-B-M Cyclic Monophasic,[T-1][H] SDB E-Type Heavy Impulse,[T-2][M] Mark-II-Heavy LR Sensors,[T-2][H] Mark-II-Heavy Nav Sensors,,[T-2][M] Pattern X Lab,[T-1][H] Type-I-B Duotronic Core,[T1] Majel 3.0 OS,[T-1][L] Type-I Duotronic Core,[T-2][M] Cruiser Diplomatic Package '39,[T2][L] 2310s Compact Rec Space,[T-1][L] S-Medical '61 Standard Sickbay,[T-2][H] Duranium w/ Bartridium Rebar,[T-2][M] Type-II SIF,[T2][L] Graviton Wavefront Deflector Saucer-Only,[T-1][M] 4 X Constellation Nacelles,[T-1][M] S-Medical Mk III Protein Synth,[T-2][H] 2240-Large Ship Pattern Deuterium Tanks,[T-2][H][R+C+] Venus-II C-Layout Warp Core,,[T-2][M][R+] Mk V M/AM System,[T-1][L][R-] Mk V Mod L Coolant System,[T-2][H][R++O+] YYD-M4 Manifold,[T1] EngOS Monitoring - Super Heavy EM Rails,,\r\n,,,,,,,,,,,,,,,,,,,,,,,,,,,,[T1][SR+] Sm Frigate Tactical Suite,2,[T2][H] Spock-C Pattern Lab,1,[T2][M] S-Medical Mk VI Protein Synth,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,Efficiency Scaling Factor,,100,10,10,10,10,0.1,0.1,0.1,0.00001,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,Efficiency Scaling Factor,,100,10,10,10,10,0.1,0.1,0.1,0.00001,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,[T-1] 400kt Frigate Frame,[T-1][SR+] Sm Frigate Tactical Suite,[T-1][T--SR--] Sm Frigate Operations Suite,[T-1] Sm Frigate Hull Suite,[T-1][T--] Sm Frigate Engineering Suite,[T-1][C+SR-] Sm Frigate Warp Core Suite,[T-1][H] Model 62 Twin Phaser Bank,[T-1][H] Model 62 Twin Phaser Bank,[T-1][H] Type-I Auto System,[T-2][H] Mark-III-Heavy SR Lateral Sensor Array,[T-2][H] Model 39 Heavy TCU,[T-2][H] AAE-B-H Monophasic Heavy Pattern,[T-2][H] AAE-B-H Monophasic Heavy Pattern,[T-2][L] Civilian Basic Impulse,[T-2][H] Mark-III-Heavy LR Sensor Array,[T-2][H] Mark-III-Heavy Nav Array,,[T-2][H] Pattern Y Lab,[T0][L] Generic Monotronic Civilian Core,[T2] Majel 3.1 Explorer OS,[T-1][H] Type-I-B Duotronic Core,[T-2][H] Explorer Diplomatic Package '45,[T2][M] 2310s Rec Space,[T-1][H] S-Medical '68 Explorer Sickbay,[T-1][L] Single Duranium Hull,[T-2][H] Mars-IV Special SIF,[T3][L] Shaped Wavefront Deflector Saucer-Only,[T-1][H] 2 X Constitution-A Heavy Nacelles,[T-1][H] S-Medical Mk III High-Endurance Protein Synth,[T-1][L] 2260-Light Pattern Deuterium Tanks,[T-2][H][C-SR+] Type-E Block-1 Automated Core,,[T-2][H][C+SR+] Mk V High Volume M/AM System,[T-1][M] Mk V Yoyodyne Coolant System,[T-1][L][R+] Tellar HIG-84 Pulse Injection Manifold,[T2] EngOS Monitoring - Anak-Krueger EM Rails,,\r\n,,Frame Option & Totals,Size,Type,,Weight Class,Weight Cap,,,,,,,Weight,BR Cost,SR Cost x,,,O x,E x,T x,,Build Time,Tech Time,,,2,[T-1][L] Model 68 Phaser Bank,3,[T1][L] Type-III-A Duotronic Core,3,[T2][L] 2310-Light Pattern Deuterium Tanks,,Frame,Type,,,,,,,,,,,,,Weight,BR Cost,SR Cost x,,,O x,E x,T x,,Build Time,Tech Time,Weight Cap,Name,,Size,,,,,,,Weight,BR Cost,SR Cost x,,,O x,E x,T x,,Build Time,Tech Time,Weight Cap,,,,,,,,Weight,BR Cost,SR Cost x,,,O x,E x,T x,,Build Time,Tech Time,Weight Cap,,,,,,,,,,,,,,,Weight Class,MaxSz,Wt,Build Time,,,,O-Mod,E-Mod,T-Mod,SR-Mod,,Year Available (SF),Name,,Size,,,,,,,Weight,BR Cost,SR Cost x,,,O x,E x,T x,,Build Time,Tech Time,Weight Cap,,,,,,,,Weight,BR Cost,SR Cost x,,,O x,E x,T x,,Build Time,Tech Time,Weight Cap,,,,,,,,,,,,,,,Weight Class,MaxSz,Wt,Build Time,,,,O-Mod,E-Mod,T-Mod,SR-Mod,,,[T-1] 700kt Frigate Frame,[T-1][O-] Md Frigate Tactical Suite,[T-1][OET-SR-] Md Frigate Operations Suite,[T-1][C-] Md Frigate Hull Suite,[T-1][OET-SR-] Md Frigate Engineering Suite,[T-1] Md Frigate Warp Core Suite,[T0][L] Model 83 Phaser Bank,[T0][L] Model 83 Phaser Bank,[T0][L] Mk-II LW Torpedo System,[T-2][L] Civilian Grade SR Lateral Sensor,[T-1][L] Model 57 Light TCU,[T-1][L] Mk1 Monophasic Escort Pattern,[T-1][L] Mk1 Monophasic Escort Pattern,[T0][M] SDB-86 Impulse Drive Sys,[T-1][L] Mark-III-Light LR Sensor Array,[T-1][L] Mark-III-Light Nav Sensors,,[T-1][L] Pattern D Compact Lab,[T0][L] Type-II Duotronic Core,[T2] Majel 3.1 OS,[T0][L] Generic Monotronic Civilian Core,[T-1][L] Escort Diplomatic Package '61,,[T0][H] S-Medical '84 Pattern Sickbay,[T-1][M] Double Duranium Hull,[T-1][L] Type-III-L SIF,,[T0][L] 2 X Centaur Nacelles,[T0][M] S-Medical Mk IV Protein Synth,[T-1][M] 2260-Heavy Pattern Deuterium Tanks,[T-1][L][C+] Delta Vega-24 Warp Core,,[T-1][L][C-] Luna-III High-Efficiency M/AM System,[T0][L][R-SR-] VSA-12-L Efficient Coolant System,[T-1][M][R++E+] VSA-3 Plasma Manifold,[T3] EngOS 3.1 Monitoring - YYD-Emergency VI EM Rails,,\r\n,,Principal Frame,3.00,[T1] 900kt Frigate Frame,,,900,,,,,,,135.000,13.500,1.000,,,0.75,1.20,1.00,,11/12,,,,0,No Phasers,3,[T2] Majel 3.1 OS,,,,Principal Frame,Frame,,,,,,,,,,,,,135.000,13.500,1.000,,,0.750,1.200,1.000,,,,900,[T1] 900kt Frigate Frame,,3.000,,,,,,,135.000,13.500,1.000,,,0.750,1.200,1.000,,0.92,,900,,,,,,,,135.000,13.500,1.000,,,0.750,1.200,1.000,,0.92,,900,,,,,,,,,,,,,,,1,900,135,0.9166666667,,,,0.75,1.2,1,1,,2310,,,0.000,,,,,,,0.000,0.000,0.000,,,0.000,0.000,0.000,,0.00,,0,,,,,,,,0.000,0.000,0.000,,,0.000,0.000,0.000,,0.00,,0,,,,,,,,,,,,,,,0,0,0,0,,,,0,0,0,0,,,[T0] 650kt Frigate Frame,[T-1][O--SR-] Lg Frigate Tactical Suite,[T-1][OE--] Lg Frigate Operations Suite,[T-1][C--] Lg Frigate Hull Suite,[T-1][OE--SR--] Lg Frigate Engineering Suite,[T-1][C-SR+] Lg Frigate Warp Core Suite,[T0][H] Model 83 Twin Phaser Bank,[T0][H] Model 83 Twin Phaser Bank,[T0][M] Mk-II Torpedo System,[T0][L] Mark-IV SR Lateral Sensor Array,[T-1][M] Model 64 Advanced TCU,[T-1][M] Mk1 Cyclic Monophasic E-Type,[T-1][M] Mk1 Cyclic Monophasic E-Type,[T1][M] SDB-97 High-Power Impulse Drive Sys,[T-1][M] Mark-III-Heavy LR Sensors,[T-1][H] Mark-III-Heavy Nav Sensors,,[T-1][M] Pattern C Lab,[T0][M] Type-III Duotronic Core,[T3] Majel 3.5 OS,[T0][L] Type-II Duotronic Core,[T-1][M] Cruiser Diplomatic Package '61,,[T1][H] S-Medical '04 Pattern Sickbay,[T-1][H] Duranium w/ Exotic Rebar,[T-1][M] Type-III SIF,,[T0][H] 2 X Excelsior Pattern Nacelles,[T0][H] S-Medical Mk IV High-Endurance Protein Synth,[T-1][H] 2260-Large Ship Pattern Deuterium Tanks,[T-1][H][R+C+] Venus-III C-Layout Warp Core,,[T-1][M][R+] Mk VI M/AM System,[T0][L] Mk VI Mod L Yoyodyne Coolant System,[T-1][H][R++O+] SBD-1 Manifold,,,\r\n,,Subsystem,Size,Type,,,,C,S,H,L,P,D,Weight,BR Cost,SR Cost,Pwr Cost,Pwr Gen,O,E,T,Reliability,Build Time,Tech Time,,,FALSE,Phaser Array?,0,No Core,Size/Lvl,Warp Core Options,,Subsystem,,Parent,,,,,,C,S,H,L,P,D,Weight,BR Cost,SR Cost,Pwr Cost,Pwr Gen,O,E,T,Reliability,Build Time,Tech Time,,Name,,,C,S,H,L,P,D,Weight,BR Cost,SR Cost,Pwr Cost,Pwr Gen,O,E,T,Reliability,Build Time,Tech Time,,,C,S,H,L,P,D,Weight,BR Cost,SR Cost,Power Cost,Power Gen,O,E,T,Reliability,Build Time,Tech Time,Weight Cap,,,,,,,,,,,,,1/sum(stats),,,,,,,,,,,,,,,Name,,,C,S,H,L,P,D,Weight,BR Cost,SR Cost,Pwr Cost,Pwr Gen,O,E,T,Reliability,Build Time,Tech Time,,,C,S,H,L,P,D,Weight,BR Cost,SR Cost,Power Cost,Power Gen,O,E,T,Reliability,Build Time,Tech Time,Weight Cap,,,,,,,,,,,,,1/sum(stats),,,,,,,,,,,,,,,[T0] 800kt Frigate Frame,[T0][SR+] Sm Frigate Tactical Suite,[T0][T--SR--] Sm Frigate Operations Suite,[T0] Sm Frigate Hull Suite,[T0][T--] Sm Frigate Engineering Suite,[T0][C+SR-] Sm Frigate Warp Core Suite,[T1][L] Type IV Single Phaser Bank,[T1][L] Type IV Single Phaser Bank,[T0][H] Type-II Auto System,[T0][M] Mark-IV-Heavy SR Lateral Sensor Array,[T-1][H] Model 57 Heavy TCU,[T-1][H] Mk1 Monophasic Heavy Pattern,[T-1][H] Mk1 Monophasic Heavy Pattern,[T1][H] SDB-97 High-Efficiency Impulse Drive Sys,[T-1][H] Mark-IV-Heavy LR Sensor Array,[T-1][H] Mark-IV-Heavy Nav Array,,[T-1][H] Pattern E Lab,[T0][H] Type-II Heavy Duotronic Core,[T4] Majel 4.0 OS,[T0][M] Type-III Duotronic Core,[T-1][H] Explorer Diplomatic Package '67,,[T2][L] T'Koren Pattern Small Sickbay,[T-2][L] Civilian Grade,[T-1][H] Mars-V Special SIF,,[T1][L] 2 X Centaur-A Pattern Nacelle,[T1][M] S-Medical Mk V Protein Synth,[T0][L] 2295-Light Pattern Deuterium Tanks,[T-1][H][C-SR+] Type-E Block-2 Automated Core,,[T-1][H][C+SR+] Mk VI High Volume M/AM System,[T0][H][SR-] SBD-VI Efficient Coolant System,[T0][L][R+] Tellar HIG-92 Pulse Injection Manifold,,,\r\n,,Tactical,,[T1][SR+] Sm Frigate Tactical Suite,,,,1.37,0.66,0.00,3.56,0.00,0.28,131.500,13.150,12.770,29.990,0.000,0.34,0.69,0.58,100.000%,2/12,,,,0,No Torp,FALSE,Isolinear?,,[T2] Md Frigate Warp Core Suite,,Tactical,Subsystem,Tactical,,,,,,1.370,0.664,0.000,3.562,0.000,0.282,131.500,13.150,12.770,29.990,0.000,0.339,0.693,0.577,0.000,,,,[T1][SR+] Sm Frigate Tactical Suite,,,1.370,0.664,0.000,3.562,0.000,0.282,131.500,13.150,12.770,29.990,0.000,0.339,0.693,0.577,1.000,0.17,,,,1.370,0.664,0.000,3.562,0.000,0.282,131.500,13.150,12.770,29.990,0.000,0.339,0.693,0.577,100.000%,0.17,,225,,,,,,,,,,,,,0.1701,,,,,,,,,,,,,,,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,1.000,0.00,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,100.000%,0.00,,0,,,,,,,,,,,,,0.0000,,,,,,,,,,,,,,,[T1] 450kt Frigate Frame,[T0][O-] Md Frigate Tactical Suite,[T0][OET-SR-] Md Frigate Operations Suite,[T0][C-] Md Frigate Hull Suite,[T0][OET-SR-] Md Frigate Engineering Suite,[T0] Md Frigate Warp Core Suite,[T1][H] Type-IV Twin Phaser Bank,[T1][H] Type-IV Twin Phaser Bank,[T1][L] Mk-III LW Torpedo System,[T0][H] Mark-V-Heavy SR Lateral Sensor Array,[T-2][L] Civilian TCU,[T0][L] Mk-III-E Shield Gens,[T0][L] Mk-III-E Shield Gens,[T2][M] SDB-09 High-Power Impulse Drive Sys,[T-2][L] Civilian Grade LR Sensor Array,[T0][M] Mark-V Nav Sensors,,[T0][L] Pattern-K Compact Lab,[T1][L] Type-III-A Duotronic Core,,[T0][H] Type-II Heavy Duotronic Core,[T0][L] Escort Diplomatic Package '85,,[T2][H] T'Koren Pattern Large Sickbay,[T0][L] Lt. Alloy-1 Duranium Hull,[T0][L] Type-IV-L SIF,,[T1][M] 2 X 2305 Cruiser Nacelle,[T1][H] S-Medical Mk V High-Endurance Protein Synth,[T0][H] 2285-Super-Heavy Pattern Deuterium,[T0][L][R-C-SR+] Delta Vega-28 Automated Core,,[T0][L][C-] Luna-IV High-Efficiency M/AM System,[T0][H][R+] Mk VI Mod H Yoyodyne Coolant System,[T0][M] VSA-4 Pulse Injection Manifold,,,\r\n,,Operations,,[T2][OE--] Lg Frigate Operations Suite,,,,0.77,6.19,0.16,0.44,4.90,0.69,391.000,39.100,34.335,41.975,0.000,0.71,0.74,1.98,99.990%,6/12,,,,TRUE,Burst Launcher?,2,[T1][M] Lwaxana '04 General Protocol,2,[T2][L][C+] Type-I Block-A (40E) Warp Core,,Operations,Subsystem,Operations,,,,,,0.774,6.187,0.158,0.442,4.896,0.688,391.000,38.100,34.335,41.975,0.000,0.705,0.739,1.982,0.000,,,,[T2][OE--] Lg Frigate Operations Suite,,,0.774,6.187,0.158,0.442,4.896,0.688,391.000,39.100,34.335,41.975,0.000,0.705,0.739,1.982,1.000,0.50,,,,0.774,6.187,0.158,0.442,4.896,0.688,391.000,39.100,34.335,41.975,0.000,0.705,0.739,1.982,99.990%,0.50,,405,,,,,,,,,,,,,0.0761,,,,,,,,,,,,,,,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,1.000,0.00,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,100.000%,0.00,,0,,,,,,,,,,,,,0.0000,,,,,,,,,,,,,,,[T1] 900kt Frigate Frame,[T0][O--SR-] Lg Frigate Tactical Suite,[T0][OE--] Lg Frigate Operations Suite,[T0][C--] Lg Frigate Hull Suite,[T0][OE--SR--] Lg Frigate Engineering Suite,[T0][C-SR+] Lg Frigate Warp Core Suite,[T2][L] Type V Single Phaser Bank,[T2][L] Type V Single Phaser Bank,[T1][M] Mk-III Torpedo System,[T1][L] Mark-VB-Light SR Lateral Sensor Array,[T0][L] Type-I Duotronic TCU,[T0][M] Mk-III-H Shield Gens,[T0][M] Mk-III-H Shield Gens,[T2][H] SDB-09 High-Efficiency Impulse Drive Sys,[T0][L] Mark-V-Light LR Sensor Array,[T1][L] Mark-VI-Light Nav Array,,[T0][M] Pattern C2 Lab,[T1][M] Type-IV Duotronic Core,,[T1][L] Type-III-A Duotronic Core,[T0][H] Explorer Diplomatic Package '85,,[T3][L] T'Koren-B Pattern Small Sickbay,[T0][M] Duranium-335 Alloy Hull,[T0][M] Type-IV SIF,,[T1][H] 2 X Excelsior Type-II Pattern Nacelles,[T2][M] S-Medical Mk VI Protein Synth,[T1][L] 2305-Light Pattern Deuterium Tanks,[T0][L][C+] Delta Vega-26 Warp Core,,[T0][M][R+] Mk VII Sublimator-Compressor,[T1][L][R-SR-] VSA-13-L Efficient Coolant System,[T0][H][R-] SF-V Performance Manifold,,,\r\n,,Hull,,[T2] Sm Frigate Hull Suite,,,,0.00,0.00,0.38,0.00,0.00,0.00,34.500,3.450,0.414,0.000,0.000,0.01,0.19,0.08,100.000%,1/12,,,,2,[T2][H] Mark-VI-Heavy SR Lateral Sensor Array,1,[T-1][M] 2260s Rec Space,0,Safety/Performance,,Hull,Subsystem,Hull,,,,,,0.000,0.000,0.376,0.000,0.000,0.000,34.500,3.000,1.901,0.000,0.000,0.008,0.194,0.081,0.000,,,,[T2] Sm Frigate Hull Suite,,,0.000,0.000,0.376,0.000,0.000,0.000,34.500,3.450,0.414,0.000,0.000,0.008,0.194,0.081,1.000,0.08,,,,0.000,0.000,0.376,0.000,0.000,0.000,34.500,3.450,0.414,0.000,0.000,0.008,0.194,0.081,100.000%,0.08,,135,,,,,,,,,,,,,2.6582,,,,,,,,,,,,,,,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,1.000,0.00,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,100.000%,0.00,,0,,,,,,,,,,,,,0.0000,,,,,,,,,,,,,,,[T2] 750kt Frigate Frame,[T1][SR+] Sm Frigate Tactical Suite,[T1][T--SR--] Sm Frigate Operations Suite,[T1] Sm Frigate Hull Suite,[T1][T--] Sm Frigate Engineering Suite,[T1][C+SR-] Sm Frigate Warp Core Suite,[T2][H] Type-V Twin Phaser Bank,[T2][H] Type-V Twin Phaser Bank,[T1][H] Type-III Auto System,[T1][M] Mark-VB SR Lateral Sensor Array,[T0][M] Type-1 TCU,[T0][H] Mk-III-SH Shield Gens,[T0][H] Mk-III-SH Shield Gens,[T3][M] SDB-09 High-Power Impulse Drive Sys,[T0][M] Mark-V LR Sensor Array,[T1][M] Mark-VI Nav Array,,[T0][H] Spock-Pattern Lab,[T1][H] Type-IV Heavy Duotronic Core,,[T1][M] Type-IV Duotronic Core,[T1][L] Lwaxana '04 Escort Protocol,,[T3][H] T'Koren-B Pattern Large Sickbay,[T0][H] Duranium-447 Alloy Hull,[T0][H] Type-IV-H SIF,,[T2][L] 2 X New Orleans Pattern Nacelles,[T2][H] S-Medical Mk VI High-Endurance Protein Synth,[T1][M] 2305-Heavy Pattern Deuterium Tanks,[T0][H][R+C+] Venus-IV C-Layout Warp Core,,[T0][H][C+SR+] Mk VII Complex Sublimator-Compressor,[T1][L] Mk VII Mod L Yoyodyne Coolant System,[T1][L][R+] Tellar HIG-103 Pulse Injection Manifold,,,\r\n,,Engineering,,[T2][OET-SR-] Md Frigate Engineering Suite,,,,0.00,0.18,1.58,0.05,0.13,3.17,161.000,16.100,17.248,30.500,0.000,0.09,0.61,0.16,99.900%,3/12,,,,1,No TCU,3,[T2][H] T'Koren Pattern Large Sickbay,2,[T2][L][R-C-] Luna-VI High-Efficiency M/AM System,,Engineering,Subsystem,Engineering,,,,,,0.000,0.177,1.580,0.053,0.133,3.165,161.000,15.600,17.248,30.500,0.000,0.087,0.606,0.159,-0.001,,,,[T2][OET-SR-] Md Frigate Engineering Suite,,,0.000,0.177,1.580,0.053,0.133,3.165,161.000,16.100,17.248,30.500,0.000,0.087,0.606,0.159,0.999,0.25,,,,0.000,0.177,1.580,0.053,0.133,3.165,161.000,16.100,17.248,30.500,0.000,0.087,0.606,0.159,99.900%,0.25,,315,,,,,,,,,,,,,0.1958,,,,,,,,,,,,,,,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,1.000,0.00,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,100.000%,0.00,,0,,,,,,,,,,,,,0.0000,,,,,,,,,,,,,,,[T2] 1050kt Frigate Frame,[T1][O-] Md Frigate Tactical Suite,[T1][OET-SR-] Md Frigate Operations Suite,[T1][C-] Md Frigate Hull Suite,[T1][OET-SR-] Md Frigate Engineering Suite,[T1] Md Frigate Warp Core Suite,[T3][L] Type VI Single Phaser Bank,[T3][L] Type VI Single Phaser Bank,[T2][L] Mk-IV LW Torpedo System,[T1][H] Mark-VB-Heavy SR Lateral Sensor Array,[T0][H] Type-1-A 'Seeker' TCU,[T1][L] Mk-IV-E Shield Gens,[T1][L] Mk-IV-E Shield Gens,[T3][H] SDB-09 High-Efficiency Impulse Drive Sys,[T0][H] Mark-V-Heavy LR Sensor Array,[T1][H] Mark-VI-Heavy Nav Array,,[T1][L] Pattern-K2 Compact Lab,[T2][L] Type-IV-B Duotronic Core,,[T1][H] Type-IV Heavy Duotronic Core,[T1][M] Lwaxana '04 General Protocol,,,[T1][L] Lt. Alloy-2 Duranium Hull,[T1][L] Type-V-L SIF,,[T2][H] 2 X Ambassador Pattern Nacelles,,[T1][H] 2305-Super-Heavy Pattern Deuterium,[T0][H][C-SR+] Type-E Block-3 Automated Core,,[T1][L][R-C-] Luna-V High-Efficiency M/AM System,[T1][H][SR-] SBD-VII Efficient Coolant System,[T1][M] VSA-5 Pulse Injection Manifold,,,\r\n,,Warp Core,,[T2] Md Frigate Warp Core Suite,,,,,,,,,,94.800,9.480,9.688,5.000,107.569,0.17,0.40,0.26,99.425%,3/12,,,,5,[T2][L] Mk-V-E Shield Gens,#,Hull Subsystem Options,2,[T2][L] Mk VIII Mod L Yoyodyne Coolant System,,Warp Core,Subsystem,Warp Core,,,,,,0.000,0.000,0.000,0.000,0.000,0.000,94.800,9.480,9.688,5.000,104.569,0.173,0.405,0.263,-0.006,,,,[T2] Md Frigate Warp Core Suite,,,,,,,,,94.800,9.480,9.688,5.000,107.569,0.173,0.405,0.263,0.994,0.25,,,,,,,,,,94.800,9.480,9.688,5.000,107.569,0.173,0.405,0.263,99.425%,0.25,,225,,,,,,,,,,,,,0.0000,,,,,,,,,,,,,,,,,,,,,,,,0.000,0.000,0.000,0.000,3.000,0.000,0.000,0.000,1.000,0.00,,,,,,,,,,0.000,0.000,0.000,0.000,3.000,0.000,0.000,0.000,100.000%,0.00,,0,,,,,,,,,,,,,0.0000,,,,,,,,,,,,,,,[T3] 450kt Frigate Frame,[T1][O--SR-] Lg Frigate Tactical Suite,[T1][OE--] Lg Frigate Operations Suite,[T1][C--] Lg Frigate Hull Suite,[T1][OE--SR--] Lg Frigate Engineering Suite,[T1][C-SR+] Lg Frigate Warp Core Suite,[T3][H] Type-VI Twin Phaser Bank,[T3][H] Type-VI Twin Phaser Bank,[T2][M][SR-] Mk-IV Torpedo System,[T2][L] Mark-VI-Light SR Lateral Sensor Array,[T1][L] Type-II Duotronic TCU,[T1][H] Mk-IV-H Shield Gens,[T1][H] Mk-IV-H Shield Gens,,[T1][L] Mark-VI-Light LR Sensor Array,[T2][L] Mark-VII-Light Nav Array ,,[T1][M] Cruiser Pattern Lab,[T2][M] Type-IV-A Duotronic Core,,[T2][L] Type-IV-B Duotronic Core,[T1][H] Lwaxana '04 Explorer Protocol,,,[T1][M] Med. Alloy-2 Duranium Hull,[T1][M] Type-V SIF,,,,[T2][L] 2310-Light Pattern Deuterium Tanks,[T1][L][R---C+] Type-I Experimental (40E) Warp Core,,[T1][M] Mk VIII Sublimator-Compressor,[T1][H][R+] Mk VII Mod H Yoyodyne Coolant System,[T2][L][SR-] 40EA-I Industrial Injection Manifold,,,\r\n,,Module,0.00,No Module,,,,0.00,0.00,0.00,0.00,0.00,0.00,0.000,0.000,0.000,0.000,0.000,0.00,0.00,0.00,100.000%,0,,,,5,[T2][L] Mk-V-E Shield Gens,,[T2] Sm Frigate Hull Suite,3,[T3][M][R+] VSA-7 Pulse Injection Manifold,,Module,Subsystem,Module,,,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,,,No Module,,0,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,1.000,0.00,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,100.000%,0.00,,0,,,,,,,,,,,,,0.0000,,,,,,,,,,,,,,,,,0,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,1.000,0.00,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,100.000%,0.00,,0,,,,,,,,,,,,,0.0000,,,,,,,,,,,,,,,[T3] 600kt Frigate Frame,[T2][SR+] Sm Frigate Tactical Suite,[T2][T--SR--] Sm Frigate Operations Suite,[T2] Sm Frigate Hull Suite,[T2][T--] Sm Frigate Engineering Suite,[T2][C+SR-] Sm Frigate Warp Core Suite,[T4][L] Type IX Experimental Phaser Array Mid Bank,[T4][L] Type IX Experimental Phaser Array Mid Bank,[T2][H][C-] Type-IV Auto System,[T2][M] Mark-VI SR Lateral Sensor Array,[T1][M] Type-2 TCU,[T2][L] Mk-V-E Shield Gens,[T2][L] Mk-V-E Shield Gens,,[T1][M] Mark-VI LR Sensor Array,[T2][M] Mark-VII Nav Array ,,[T1][H] Spock-B Pattern Lab,[T2][H] Type-IV-C Heavy Duotronic Core,,[T2][M] Type-IV-A Duotronic Core,[T2][L] Lwaxana '12 Escort Protocol,,,[T1][H] Hvy. Alloy-2 Duranium Hull,[T1][H] Type-V-H SIF,,,,[T2][M] 2310-Heavy Pattern Deuterium Tanks,[T1][H][R---C+] Type-II Experimental (Venus) Warp Core,,[T1][H][R-C+SR+] Mk VIII High Volume Compressor,[T2][L][R-SR-] VSA-14-L Efficient Coolant System,[T2][L][R+] Tellar HIG-110 Pulse Injection Manifold,,,\r\n,,Total,3.00,,,,,2.14,7.03,2.11,4.06,5.03,4.13,947.800,94.780,74.455,107.465,107.569,1.31,2.64,3.06,99.315%,2 2/12,,,,1,[T2][M] SDB-09 High-Power Impulse Drive Sys,1,[T2][L] Lt. Alloy-3 Duranium Hull,1,[T2] EngOS Monitoring - Anak-Krueger EM Rails,,Raw,,,,,,,,2.144,7.027,2.114,4.057,5.028,4.135,812.800,79.330,75.942,107.465,104.569,1.312,2.638,3.061,-0.007,0.00,,,,,3.000,2.144,7.027,2.114,4.057,5.028,4.135,947.800,94.780,74.455,107.465,107.569,1.312,2.638,3.061,0.993,2.17,,,,2.144,7.027,2.114,4.057,5.028,4.135,947.800,94.780,74.455,107.465,107.569,1.312,2.638,3.061,99.315%,2.17,,900,,,,,,,,,,,,,0.0408,,,,,,,,,,,,,,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,3.000,0.000,0.000,0.000,1.000,0.00,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,3.000,0.000,0.000,0.000,100.000%,0.00,,0,,,,,,,,,,,,,0.0000,,,,,,,,,,,,,,,[T3] 1050kt Frigate Frame,[T2][O-] Md Frigate Tactical Suite,[T2][OET-SR-] Md Frigate Operations Suite,[T2][C-] Md Frigate Hull Suite,[T2][OET-SR-] Md Frigate Engineering Suite,[T2] Md Frigate Warp Core Suite,[T4][H] Type-IX Experimental Phaser Array Full Bank,[T4][H] Type-IX Experimental Phaser Array Full Bank,[T3][L] Mk-V LW Torpedo System,[T2][H] Mark-VI-Heavy SR Lateral Sensor Array,[T1][H] 'Dauntless' Tracking System,[T2][M] Mk-V-H Shield Gens,[T2][M] Mk-V-H Shield Gens,,[T1][H] Mark-VI-Heavy LR Sensor Array,[T2][H] Mark-VII-Heavy Nav Array ,,[T2][L] Pattern-K3 Compact Lab,[T3][L] Type-V Compact Duotronic Core,,[T2][H] Type-IV-C Heavy Duotronic Core,[T2][M] Lwaxana '12 General Protocol,,,[T2][L] Lt. Alloy-3 Duranium Hull,[T2][L] Type-VI-L SIF,,,,[T2][H] 2310-Super-Heavy Pattern Deuterium,[T1][H][R+C-] Type-E Block-4 Automated Core,,[T2][L][R-C-] Luna-VI High-Efficiency M/AM System,[T2][L] Mk VIII Mod L Yoyodyne Coolant System,[T2][M][SR-] SBD-A Efficient Manifold,,,\r\n,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,Final,,,,,,,,2.000,7.000,2.000,4.000,5.000,4.000,948.000,80.000,80.000,107.000,105.000,2.000,3.000,4.000,-0.007,2.17,,,,,3,,,,,,,,,,,,,,,,,,,,2.000,7.000,2.000,4.000,5.000,4.000,948.000,95.000,75.000,107.000,108.000,2.000,3.000,4.000,99.320%,2.17,,900,,,,,,,,,,,,,0.0417,,,,,,,,,,,,,,,,,0,,,,,,,,,,,,,,,,,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,3.000,0.000,0.000,0.000,100.000%,0.00,,0,,,,,,,,,,,,,0.0000,,,,,,,,,,,,,,,[T-3] 700kt Cruiser Frame,[T2][O--SR-] Lg Frigate Tactical Suite,[T2][OE--] Lg Frigate Operations Suite,[T2][C--] Lg Frigate Hull Suite,[T2][OE--SR--] Lg Frigate Engineering Suite,[T2][C-SR+] Lg Frigate Warp Core Suite,,,[T3][M][SR-] Mk-V Torpedo System,[T3][L] Mark-VII-Light SR Lateral Sensor Array,[T2][L] Type-III Duotronic TCU,[T2][H] Mk-V-SH Shield Gens,[T2][H] Mk-V-SH Shield Gens,,[T2][L] Mark-VII-Light LR Sensor Array,[T3][L] Mark-VIII-Light Nav Array,,[T2][M] Cruiser-2 Pattern Lab,[T3][M] Type-V Duotronic Core,,[T3][L] Type-V Compact Duotronic Core,[T2][H] Lwaxana '12 Explorer Protocol,,,[T2][M] Med. Alloy-3 Duranium Hull,[T2][M] Type-VI SIF,,,,[T3][L] 2310-Light Pattern Deuterium Tanks,[T2][L][R--C-SR+] ONA-III-L Experimental,,[T2][M] Mk IX Sublimator-Compressor,[T2][M][R+SR+] Mars-8 Experimental Coolant System,[T2][M][R+] VSA-6 Pulse Injection Manifold,,,\r\n,,Tactical Subsystem Options,,Type,,Weight Class,Weight Cap,C x,S x,H x,L x,P x,D x,Weight,BR Cost,SR Cost x,,,O x,E x,T x,,Build Time,Tech Time,,,Archive 1,Click to Restore,,,,,,Frame,Type,Parent,,,,,,C x,S x,H x,L x,P x,D x,Weight,BR Cost,SR Cost x,,,O x,E x,T x,,Build Time,Tech Time,Weight Cap,Name,,,C x,S x,H x,L x,P x,D x,Weight,BR Cost,SR Cost x,,,O x,E x,T x,,Build Time,Tech Time,Weight Cap,Mod Effect x,C x,S x,H x,L x,P x,D x,Weight,BR Cost,SR Cost x,,,O x,E x,T x,,Build Time,Tech Time,Weight Cap,,,,,,,,,,,,,,Size Class,Weight Class,MaxSz,Wt,Build Time,Tac Mod,,,O-Mod,E-Mod,T-Mod,SR-Mod,,,Name,,,C x,S x,H x,L x,P x,D x,Weight,BR Cost,SR Cost x,,,O x,E x,T x,,Build Time,Tech Time,Weight Cap,Mod Effect x,C x,S x,H x,L x,P x,D x,Weight,BR Cost,SR Cost x,,,O x,E x,T x,,Build Time,Tech Time,Weight Cap,,,,,,,,,,,,,,Size Class,Weight Class,MaxSz,Wt,Build Time,Tac Mod,,,O-Mod,E-Mod,T-Mod,SR-Mod,,,[T-2] 750kt Cruiser Frame,[T3][SR+] Sm Frigate Tactical Suite,[T3][T--SR--] Sm Frigate Operations Suite,[T3] Sm Frigate Hull Suite,[T3][T--] Sm Frigate Engineering Suite,[T3][C+SR-] Sm Frigate Warp Core Suite,,,[T3][H][C-] Type-V Auto System,[T3][M] Mark-VII SR Lateral Sensor Array,[T2][M] Type-3 TCU,[T3][L] Mk-VI-E Shield Gens,[T3][L] Mk-VI-E Shield Gens,,[T2][M] Mark-VII LR Sensor Array,[T3][M] Mark-VIII Nav Array,,[T2][H] Spock-C Pattern Lab,[T3][H] Type-V Heavy Duotronic Core,,[T3][M] Type-V Duotronic Core,[T3][L] Lwaxana '21 Escort Protocol,,,[T2][H] Hvy. Alloy-3 Duranium Hull,[T2][H] Type-VI-H SIF,,,,[T3][M] 2310-Heavy Pattern Deuterium Tanks,[T2][L][C+] Type-I Block-A (40E) Warp Core,,[T2][H][R-C+SR+] Mk IX High Volume Compressor,[T2][H][SR-] SBD-VIII Efficient Coolant System,[T2][H][R-SR-] YYD-4 Performance Manifold,,,\r\n,,Tactical Sub-Frame,,[T1][SR+] Sm Frigate Tactical Suite,,Frigate,225,0.98,0.98,0.98,0.98,0.98,0.98,0.000,0.000,1.000,,,0.71,1.20,1.00,,2/12,,,,Class,SWB Cheapish Kepler,,,,Design Sheet Version: C8,,Tactical Sub-Frame,Tactical,Frame,,,,,,0.980,0.980,0.980,0.980,0.980,0.980,0.000,0.000,1.000,,,0.709,1.200,1.000,,,,225,[T1][SR+] Sm Frigate Tactical Suite,,,0.980,0.980,0.980,0.980,0.980,0.980,0.000,0.000,1.000,,,0.709,1.200,1.000,,0.17,,225,0.980,0.980,0.980,0.980,0.980,0.980,0.980,0.000,0.000,1.000,,,0.709,1.200,1.000,,0.17,,225,,,,,,,,,,,,,,1,1,25,,0.1666666667,0.98,,,0.945,1,1,1,,2308,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,,0.000,0.000,0.000,,0.00,,0,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,,0.000,0.000,0.000,,0.00,,0,,,,,,,,,,,,,,0,0,0,0,0,0,,,0,0,0,0,,,[T-1] 1mt Cruiser Frame,[T3][O-] Md Frigate Tactical Suite,[T3][OET-SR-] Md Frigate Operations Suite,[T3][C-] Md Frigate Hull Suite,[T3][OET-SR-] Md Frigate Engineering Suite,[T3] Md Frigate Warp Core Suite,,,,[T3][H] Mark-VII-Heavy SR Lateral Sensor Array,[T2][H] DI-4 Predictive Targeting Array,[T3][M] Mk-VI-H Shield Gens,[T3][M] Mk-VI-H Shield Gens,,[T2][H] Mark-VII-Heavy LR Sensor Array,[T3][H] Mark-VIII-Heavy Nav Array,,[T3][L] Pattern-K4 Compact Lab,[T4][L] Type-VI Compact Duotronic Core,,[T3][H] Type-V Heavy Duotronic Core,[T3][M] Lwaxana '21 General Protocol,,,[T3][L] Lt. Alloy-4 Duranium Hull,[T3][L] Type-VII-L SIF,,,,[T3][H] 2310-Super-Heavy Pattern Deuterium,[T2][M][R--C-SR+] ONA-III-M Experimental,,[T3][L][R-C-] Luna-VII High-Efficiency M/AM System,[T2][H][R+] Mk VIII Mod H Yododyne SBD Coolant System,[T2][H] SF-VII Performance Manifold,,,\r\n,,Component,#,Type,,,,C,S,H,L,P,D,Weight,BR Cost,SR Cost,Pwr Cost,Pwr Gen,O,E,T,Reliability,,Tech Time,,,Stat Line,C2 S7 H2 L4 P5 D4 - 95br 75sr - 948kt [2 2/12]yr - O2 E3 T4,,,,,,Component,Type,Parent,Has Part?,Min Size Class,Max Size Class,Min Qty,Max Qty,C,S,H,L,P,D,Weight,BR Cost,SR Cost,Pwr Cost,Pwr Gen,O,E,T,Reliability,Build Time,Tech Time,,Name,,Qty,C,S,H,L,P,D,Weight,BR Cost,SR Cost,Pwr Cost,Pwr Gen,O,E,T,Reliability,,Tech Time,,Mod Effect,C,S,H,L,P,D,Weight,BR Cost,SR Cost,Power Cost,Power Gen,O,E,T,Reliability,,Tech Time,,Effect Custom Mod,Effect Qty?,C Mod,S Mod,H Mod,L Mod,P Mod,D Mod,Wt Custom Mod,Scale Wt?,Cost Mod,Crew Mod,1/sum(stats),Size Sort,Effect,Weight O/H,Scale Weight,Unit Weight,SR Cost x,Pwr O/H,Scale Pwr,Unit Power,O,E,T,Reliability,Year Available (SF),Name,,Qty,C,S,H,L,P,D,Weight,BR Cost,SR Cost,Pwr Cost,Pwr Gen,O,E,T,Reliability,,Tech Time,,Mod Effect,C,S,H,L,P,D,Weight,BR Cost,SR Cost,Power Cost,Power Gen,O,E,T,Reliability,,Tech Time,,Effect Custom Mod,Effect Qty?,C Mod,S Mod,H Mod,L Mod,P Mod,D Mod,Wt Custom Mod,Scale Wt?,Cost Mod,Crew Mod,1/sum(stats),Size Sort,Effect,Weight O/H,Scale Weight,Unit Weight,SR Cost x,Pwr O/H,Scale Pwr,Unit Power,O,E,T,Reliability,,[T0] 1500kt Cruiser Frame,[T3][O--SR-] Lg Frigate Tactical Suite,[T3][OE--] Lg Frigate Operations Suite,[T3][C--] Lg Frigate Hull Suite,[T3][OE--SR--] Lg Frigate Engineering Suite,[T3][C-SR+] Lg Frigate Warp Core Suite,,,,[T4][L] Mark-VII-Light SR Lateral Sensor Array,[T3][L] Type-IV Duotronic TCU,[T3][H] Mk-VI-SH Shield Gens,[T3][H] Mk-VI-SH Shield Gens,,[T3][L] Mark-VIII-Light LR Sensor Array,,,[T3][M] Cruiser-3 Pattern Lab,[T4][M] Type-VI Duotronic Core,,[T4][L] Type-VI Compact Duotronic Core,[T3][H] Lwaxana '21 Explorer Protocol,,,[T3][M] Med. Alloy-4 Duranium Hull,[T3][M] Type-VII SIF,,,,,[T2][M][R-C+] Type-III Block-A (YYD) Warp Core,,[T3][M] Mk X Sublimator-Compressor,[T3][L][R-SR-] VSA-15-L Efficient Coolant System,[T3][L][SR-] 40EA-II Industrial Injection Manifold ,,,\r\n,,Primary Phasers,2,[T-1][L] Model 68 Phaser Bank,,,,0.62,0.00,0.00,0.00,0.00,0.00,16.000,1.600,0.800,6.000,,0.22,0.41,0.05,100.000%,,,,,,Evasion Chance: 21.74%,Reliability: 99.32% (Annual Breakdown Chance: 0.68%),,Warp Core Breach Chance: 36.50%,,,Primary Phasers,Phasers,Tactical,TRUE,,,0,,0.618,0.000,0.000,0.000,0.000,0.000,16.000,1.600,0.800,6.000,0.000,0.220,0.415,0.052,0.000,,,,[T-1][L] Model 68 Phaser Bank,,2,0.618,0.000,0.000,0.000,0.000,0.000,16.000,1.600,0.800,6.000,,0.220,0.415,0.052,1.000,,,,0.631,0.618,0.000,0.000,0.000,0.000,0.000,16.000,1.600,0.800,6.000,,0.220,0.415,0.052,100.000%,,,,0.97,TRUE,1,,,,,,1,FALSE,1,1,1.6175,1,0.36,4,0,6,0.05,0.6,0.8,1.5,0.18,0.2,0.03,1,2270,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,1.000,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,100.000%,,,,1,TRUE,1,,,,,,1,FALSE,1,1,0.0000,0,0,0,0,0,0,0,0,0,0,0,0,1,,[T1] 1mt Cruiser Frame,,,,,,,,,[T4][M] Mark-VII SR Lateral Sensor Array,[T3][M] Type-4 TCU,,,,[T3][M] Mark-VIII LR Sensor Array,,,[T3][H] Spock-D Pattern Lab,[T4][H] Type-VI Heavy Duotronic Core,,[T4][M] Type-VI Duotronic Core,,,,[T3][H] Hvy. Alloy-4 Duranium Hull,[T3][H] Type-VII-H SIF,,,,,[T2][H][R--C-SR+] ONA-III-H Experimental,,[T3][H][R-C+SR+] Mk X High Volume Compressor,[T3][L] Mk IX Mod L Yoyodyne Coolant System,[T3][L][R+] Tellar HIG-117 Pulse Injection Manifold ,,,\r\n,,Secondary Phasers,0,No Phasers,,,,0.00,0.00,0.00,0.00,0.00,0.00,0.000,0.000,0.000,0.000,,0.00,0.00,0.00,100.000%,,,,,SDB Info,C[2.14] S[7.03] H[2.11] L[4.06] P[5.03] D[4.13] - [94.78]br [74.45]sr - [947.80]kt [2 2/12]yr - O[1.31] E[2.64] T[3.06],,,,,,Secondary Phasers,Phasers,Tactical,TRUE,,,0,0,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,,,No Phasers,,0,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,1.000,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,100.000%,,,,0.97,TRUE,1/4,,,,,,1,FALSE,1/4,1,0.0000,-99,0,0,0,0,0,0,0,0,0,0,0,1,0,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,1.000,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,100.000%,,,,1,TRUE,1/4,,,,,,1,FALSE,1/4,1,0.0000,0,0,0,0,0,0,0,0,0,0,0,0,1,,[T1] 1800kt Cruiser Frame,,,,,,,,,[T4][H] Mark-VII-Heavy SR Lateral Sensor Array,[T3][H] TH-5 Rangemaster Unit,,,,[T3][H] Mark-VIII-Heavy LR Sensor Array,,,,,,[T4][H] Type-VI Heavy Duotronic Core,,,,,[T4][L] Type-VIII-L SIF,,,,,[T2][H][C+] Type-II Block-A (Venus) Warp Core,,[T4][L][R-C-] Luna-VIII High-Efficiency M/AM System,[T3][M][R+SR+] Mars-9 Experimental Coolant System,[T3][M][SR-] SBD-B Efficient Manifold,,,\r\n,,Phaser Array?,FALSE,,,,,,,,,,,,,,,,,,,,,,,,,Power[107.47/107.57] - Internal[897.8/900] Tactical[131.5/225] Operations[391.0/405] Hull[34.5/135] Engineering[111.0/315] WarpCore[94.8/225],,,,,,Phaser Array?,,,FALSE,,,,,,,,,,,,,,,,,,,,,,,,,FALSE,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0.0000,0,0,0,0,0,0,0,0,0,0,0,0,1,*,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0.0000,0,0,0,0,0,0,0,0,0,0,0,0,1,,[T2] 2100kt Cruiser Frame,,,,,,,,,,,,,,,,,,,,,,,,,[T4][M] Type-VIII SIF,,,,,[T3][L][R-C-SR+] ONA-IV-L Standard,,[T4][M] Mk XI Sublimator-Compressor,[T3][H][SR-] SBD-IX Efficient Coolant System,[T3][M][R+] VSA-7 Pulse Injection Manifold,,,\r\n,,Torpedo System,0,No Torp,,,,0.00,0.00,0.00,0.00,0.00,0.00,0.000,0.000,0.000,0.000,,0.00,0.00,0.00,100.000%,,,,,Size,Frame Options,#,Operations Subsystem Options,#,Engineering Subsystem Options,,Torpedo System,Torpedoes,Tactical,TRUE,,,0,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,,,No Torp,,0,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,1.000,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,100.000%,,,,1.5,TRUE,1,,,,,,1 1/2,FALSE,1,1,0.0000,-99,0,0,0,0,0,0,0,0,0,0,0,1,2230,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,1.000,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,100.000%,,,,1.5,TRUE,1,,,,,,1 1/2,FALSE,1,1,0.0000,0,0,0,0,0,0,0,0,0,0,0,0,1,,[T3] 1mt Cruiser Frame,,,,,,,,,,,,,,,,,,,,,,,,,[T4][H] Type-VIII-H SIF,,,,,[T3][L][R+C+] Type-I Block-B (40E) Warp Core,,[T4][H][R-C+SR+] Mk XI High Volume Compressor,[T3][H][R+] Mk IX Mod H Yoyodyne Coolant System,[T3][H][R-SR-] YYD-5 Performance Manifold,,,\r\n,,Burst Launcher?,TRUE,,,,,,,,,,,,,,,,,,,,,,,,3.00,[T1] 900kt Frigate Frame,,[T2][OE--] Lg Frigate Operations Suite,,[T2][OET-SR-] Md Frigate Engineering Suite,,Burst Launcher?,,,FALSE,,,,,,,,,,,,,,,,,,,,,,,,,TRUE,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0.0000,0,0,0,0,0,0,0,0,0,0,0,0,1,*,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0.0000,0,0,0,0,0,0,0,0,0,0,0,0,1,,[T3] 1500kt Cruiser Frame,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,[T3][M][R-C-SR+] ONA-IV-M Standard,,,,[T3][H] SF-VIII Performance Manifold,,,\r\n,,Short-Range Sensors,2,[T2][H] Mark-VI-Heavy SR Lateral Sensor Array,,,,0.66,0.66,0.00,0.00,0.00,0.00,46.500,4.650,2.790,3.400,,0.06,0.21,0.23,100.000%,,,,,Size,Module Options,2,[T2][H] Mark-VII-Heavy LR Sensor Array,2,[T2][M] Type-VI SIF,,Short-Range Sensors,Short-Range Sensors,Tactical,TRUE,,,0,,0.664,0.664,0.000,0.000,0.000,0.000,46.500,4.650,2.790,3.400,0.000,0.061,0.207,0.233,0.000,,,,[T2][H] Mark-VI-Heavy SR Lateral Sensor Array,,2,0.664,0.664,0.000,0.000,0.000,0.000,46.500,4.650,2.790,3.400,,0.061,0.207,0.233,1.000,,,,1.355,0.664,0.664,0.000,0.000,0.000,0.000,46.500,4.650,2.790,3.400,,0.061,0.207,0.233,100.000%,,,,1,TRUE,1/2,1/2,,,,,1,FALSE,1,1,0.7531,3,0.75,5,0,20.75,0.06,0.8,0,1.3,0.05,0.1,0.135,1,2312,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,1.000,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,100.000%,,,,1,TRUE,1/2,1/2,,,,,1,FALSE,1,1,0.0000,0,0,0,0,0,0,0,0,0,0,0,0,1,,[T3] 2100kt Cruiser Frame,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,[T3][M][C+] Type-III Block-B (YYD) Warp Core ,,,,[T4][L][SR-] 40EA-III Industrial Injection Manifold,,,\r\n,,Targeting Computer,1,No TCU,,,,0.00,0.00,0.00,0.00,0.00,0.00,0.000,0.000,0.000,0.000,,0.00,0.00,0.00,100.000%,,,,,0.00,No Module,2,[T2][H] Mark-VII-Heavy Nav Array ,3,[T1][L] Modulated Graviton Beam Deflector Saucer-Only,,Targeting Computer,Targeting Computers,Tactical,TRUE,,,0,1,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,,,No TCU,,1,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,1.000,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,100.000%,,,,1,TRUE,1,,,,,,1,FALSE,1,1,0.0000,-99,0,0,0,0,0,0,0,0,0,0,0,1,0,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,1.000,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,100.000%,,,,1,TRUE,1,,,,,,1,FALSE,1,1,0.0000,0,0,0,0,0,0,0,0,0,0,0,0,1,,[T-3] 750kt 'Ranger' Frame,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,[T3][H][R-C-SR+] ONA-IV-H Standard,,,,[T4][L][R+] Tellar HIG-122 Pulse Injection Manifold,,,\r\n,,Deflector Shields,5,[T2][L] Mk-V-E Shield Gens,,,,0.00,0.00,0.00,2.97,0.00,0.00,30.000,3.000,6.000,16.450,,0.01,0.02,0.21,100.000%,,,,,#,Tactical Subsystem Options,0,No Survey Sensors,1,[T1][L] 2 X Centaur-A Pattern Nacelle,,Deflector Shields,Deflector Shields,Tactical,TRUE,,,0,,0.000,0.000,0.000,2.969,0.000,0.000,30.000,3.000,6.000,16.450,0.000,0.009,0.016,0.207,0.000,,,,[T2][L] Mk-V-E Shield Gens,,5,0.000,0.000,0.000,2.969,0.000,0.000,30.000,3.000,6.000,16.450,,0.009,0.016,0.207,1.000,,,,3.029,0.000,0.000,0.000,2.969,0.000,0.000,30.000,3.000,6.000,16.450,,0.009,0.016,0.207,100.000%,,,,1,TRUE,,,,1,,,1,FALSE,1,1,0.3369,1,1,0,0,6,0.2,1.45,2,1.8,0.005,0.005,0.08,1,2311,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,1.000,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,100.000%,,,,1,TRUE,,,,1,,,1,FALSE,1,1,0.0000,0,0,0,0,0,0,0,0,0,0,0,0,1,,[T-2] 1mt 'Constitution' Frame,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,[T3][H][R+C+] Type-II Block-B (Venus) Warp Core,,,,[T4][M][SR-] SBD-C Efficient Manifold,,,\r\n,,Backup Deflectors,5,[T2][L] Mk-V-E Shield Gens,,,,0.00,0.00,0.00,0.59,0.00,0.00,6.000,0.600,1.200,3.290,,0.00,0.00,0.04,,,,,,,[T1][SR+] Sm Frigate Tactical Suite,2,[T2][H] Spock-C Pattern Lab,1,[T2][M] S-Medical Mk VI Protein Synth,,Backup Deflectors,Deflector Shields,Tactical,TRUE,,,0,,0.000,0.000,0.000,0.594,0.000,0.000,6.000,0.600,1.200,3.290,0.000,0.002,0.003,0.041,0.000,,,,[T2][L] Mk-V-E Shield Gens,,5,0.000,0.000,0.000,0.594,0.000,0.000,6.000,0.600,1.200,3.290,,0.002,0.003,0.041,,,,,3.029,0.000,0.000,0.000,0.594,0.000,0.000,6.000,0.600,1.200,3.290,,0.002,0.003,0.041,,,,,1,TRUE,,,,1/5,,,1,FALSE,1/5,1/5,1.6843,1,1,0,0,6,0.2,1.45,2,1.8,0.005,0.005,0.08,1,2311,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,,,,,1,TRUE,,,,1/5,,,1,FALSE,1/5,1/5,0.0000,0,0,0,0,0,0,0,0,0,0,0,0,1,,[T-1] 1800kt Explorer Frame,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,[T4][M][R+] VSA-8 Pulse Injection Manifold,,,\r\n,,Impulse Engine Pwr,1,[T2][M] SDB-09 High-Power Impulse Drive Sys,,,,0.09,0.00,0.00,0.00,0.00,0.28,33.000,3.300,1.980,0.850,,0.05,0.05,0.04,100.000%,,,,,2,[T-1][L] Model 68 Phaser Bank,3,[T1][L] Type-III-A Duotronic Core,3,[T2][L] 2310-Light Pattern Deuterium Tanks,,Impulse Engine Pwr,Impulse Engine Power,Tactical,TRUE,,,1,,0.088,0.000,0.000,0.000,0.000,0.282,33.000,3.300,1.980,0.850,0.000,0.046,0.052,0.043,0.000,,,,[T2][M] SDB-09 High-Power Impulse Drive Sys,,1,0.088,0.000,0.000,0.000,0.000,0.282,33.000,3.300,1.980,0.850,,0.046,0.052,0.043,1.000,,,,0.360,0.088,0.000,0.000,0.000,0.000,0.282,33.000,3.300,1.980,0.850,,0.046,0.052,0.043,100.000%,,,,1,TRUE,1/4,,,,,4/5,1,FALSE,1,1,2.6995,2,0.36,8,0,25,0.06,0.1,0.15,0.3,0.06,0.04,0.04,1,2313,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,1.000,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,100.000%,,,,1,TRUE,1/4,,,,,4/5,1,FALSE,1,1,0.0000,0,0,0,0,0,0,0,0,0,0,0,0,1,,[T0] 2400kt Explorer Frame,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,[T4][H][R-SR-] YYD-7 Performance Manifold,,,\r\n,,Tactical Subtotal,,,,,,1.37,0.66,0.00,3.56,0.00,0.28,131.500,13.150,12.770,29.990,0.000,0.34,0.69,0.58,100.000%,,,,,0,No Phasers,3,[T2] Majel 3.1 OS,,,,Tactical Subtotal,,,,,,,,1.370,0.664,0.000,3.562,0.000,0.282,131.500,13.150,12.770,29.990,0.000,0.339,0.693,0.577,0.000,,,,,,,1.370,0.664,0.000,3.562,0.000,0.282,131.500,13.150,12.770,29.990,0.000,0.339,0.693,0.577,1.000,,,,,1.370,0.664,0.000,3.562,0.000,0.282,131.500,13.150,12.770,29.990,0.000,0.339,0.693,0.577,100.000%,0.17,,225,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,1.000,,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,100.000%,0.00,,0,,,,,,,,,,,,,,,,,,,,,,,,,,,,[T1] 3100kt Explorer Frame,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,[T4][H] SF-IX Performance Manifold,,,\r\n,,,,,,,,,,,,,,,,,,,,,,,,,,,FALSE,Phaser Array?,0,No Core,Size/Lvl,Warp Core Options,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,[T2] 2400kt Explorer Frame,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,Operations Subsystem Options,,Type,,Weight Class,Weight Cap,C x,S x,H x,L x,P x,D x,Weight,BR Cost,SR Cost x,,,O x,E x,T x,,Build Time,Tech Time,,,0,No Torp,FALSE,Isolinear?,,[T2] Md Frigate Warp Core Suite,,Frame,Type,Parent,,,,,,C x,S x,H x,L x,P x,D x,Weight,BR Cost,SR Cost x,,,O x,E x,T x,,Build Time,Tech Time,Weight Cap,Name,,,C x,S x,H x,L x,P x,D x,Weight,BR Cost,SR Cost x,,,O x,E x,T x,,Build Time,Tech Time,Weight Cap,Mod Effect x,C x,S x,H x,L x,P x,D x,Weight,BR Cost,SR Cost x,,,O x,E x,T x,,Build Time,Tech Time,Weight Cap,,,,,,,,,,,,,,Size Class,Weight Class,MaxSz,Wt,Build Time,Ops Mod,,,O-Mod,E-Mod,T-Mod,SR-Mod,,Year Available (SF),Name,,,C x,S x,H x,L x,P x,D x,Weight,BR Cost,SR Cost x,,,O x,E x,T x,,Build Time,Tech Time,Weight Cap,Mod Effect x,C x,S x,H x,L x,P x,D x,Weight,BR Cost,SR Cost x,,,O x,E x,T x,,Build Time,Tech Time,Weight Cap,,,,,,,,,,,,,,Size Class,Weight Class,MaxSz,Wt,Build Time,Ops Mod,,,O-Mod,E-Mod,T-Mod,SR-Mod,,,[T2] 3100kt Explorer Frame,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,Operations Sub-Frame,,[T2][OE--] Lg Frigate Operations Suite,,Frigate,405,1.13,1.13,1.13,1.13,1.13,1.13,10.000,1.000,1.000,,,0.69,1.11,0.98,,6/12,,,,TRUE,Burst Launcher?,2,[T1][M] Lwaxana '04 General Protocol,2,[T2][L][C+] Type-I Block-A (40E) Warp Core,,Operations Sub-Frame,Operations,Frame,,,,,,1.130,1.130,1.130,1.130,1.130,1.130,10.000,1.000,1.000,,,0.694,1.110,0.980,,,,405,[T2][OE--] Lg Frigate Operations Suite,,,1.130,1.130,1.130,1.130,1.130,1.130,10.000,1.000,1.000,,,0.694,1.110,0.980,,0.50,,405,1.130,1.130,1.130,1.130,1.130,1.130,1.130,10.000,1.000,1.000,,,0.694,1.110,0.980,,0.50,,405,,,,,,,,,,,,,,3,1,45,10,0.5,1.13,,,0.925,0.925,0.98,1,,2314,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,,0.000,0.000,0.000,,0.00,,0,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,,0.000,0.000,0.000,,0.00,,0,,,,,,,,,,,,,,0,0,0,0,0,0,,,0,0,0,0,,,[T2] 3400kt Explorer Frame,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,Component,#,Type,,,,C,S,H,L,P,D,Weight,BR Cost,SR Cost,Pwr Cost,Pwr Gen,O,E,T,Reliability,,Tech Time,,,2,[T2][H] Mark-VI-Heavy SR Lateral Sensor Array,1,[T-1][M] 2260s Rec Space,0,Safety/Performance,,Component,Type,Parent,Has Part?,Min Size Class,Max Size Class,Min Qty,Max Qty,C,S,H,L,P,D,Weight,BR Cost,SR Cost,Pwr Cost,Pwr Gen,O,E,T,Reliability,Build Time,Tech Time,,Name,,Qty,C,S,H,L,P,D,Weight,BR Cost,SR Cost,Pwr Cost,Pwr Gen,O,E,T,Reliability,,Tech Time,,Mod Effect,C,S,H,L,P,D,Weight,BR Cost,SR Cost,Power Cost,Power Gen,O,E,T,Reliability,,Tech Time,,Effect Custom Mod,Effect Qty?,C Mod,S Mod,H Mod,L Mod,P Mod,D Mod,Wt Custom Mod,Scale Wt?,Cost Mod,Crew Mod,1/sum(stats),Size Sort,Effect,Weight O/H,Scale Weight,Unit Weight,SR Cost x,Pwr O/H,Scale Pwr,Unit Power,O,E,T,Reliability,Year Available (SF),Name,,Qty,C,S,H,L,P,D,Weight,BR Cost,SR Cost,Pwr Cost,Pwr Gen,O,E,T,Reliability,,Tech Time,,Mod Effect,C,S,H,L,P,D,Weight,BR Cost,SR Cost,Power Cost,Power Gen,O,E,T,Reliability,,Tech Time,,Effect Custom Mod,Effect Qty?,C Mod,S Mod,H Mod,L Mod,P Mod,D Mod,Wt Custom Mod,Scale Wt?,Cost Mod,Crew Mod,1/sum(stats),Size Sort,Effect,Weight O/H,Scale Weight,Unit Weight,SR Cost x,Pwr O/H,Scale Pwr,Unit Power,O,E,T,Reliability,,[T3] 2700kt Explorer Frame,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,Long-Range Sensors,2,[T2][H] Mark-VII-Heavy LR Sensor Array,,,,0.00,1.12,0.00,0.00,0.00,0.00,41.000,4.100,3.280,3.200,,0.06,0.13,0.20,100.000%,,,,,1,No TCU,3,[T2][H] T'Koren Pattern Large Sickbay,2,[T2][L][R-C-] Luna-VI High-Efficiency M/AM System,,Long-Range Sensors,Long-Range Sensors,Operations,TRUE,,,0,,0.000,1.123,0.000,0.000,0.000,0.000,41.000,4.100,3.280,3.200,0.000,0.060,0.134,0.203,0.000,,,,[T2][H] Mark-VII-Heavy LR Sensor Array,,2,0.000,1.123,0.000,0.000,0.000,0.000,41.000,4.100,3.280,3.200,,0.060,0.134,0.203,1.000,,,,0.994,0.000,1.123,0.000,0.000,0.000,0.000,41.000,4.100,3.280,3.200,,0.060,0.134,0.203,100.000%,,,,1,TRUE,,1,,,,,1,FALSE,1,1,0.8906,3,0.55,5,0,18,0.08,0.6,0,1.3,0.05,0.07,0.12,1,2310,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,1.000,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,100.000%,,,,1,TRUE,,1,,,,,1,FALSE,1,1,0.0000,0,0,0,0,0,0,0,0,0,0,0,0,1,,[T3] 3400kt Explorer Frame,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,Navigational Sensors,2,[T2][H] Mark-VII-Heavy Nav Array ,,,,0.00,1.12,0.00,0.00,0.00,0.19,41.500,4.150,3.320,3.400,,0.05,0.24,0.38,100.000%,,,,,5,[T2][L] Mk-V-E Shield Gens,#,Hull Subsystem Options,2,[T2][L] Mk VIII Mod L Yoyodyne Coolant System,,Navigational Sensors,Navigational Sensors,Operations,TRUE,,,0,,0.000,1.123,0.000,0.000,0.000,0.187,41.500,4.150,3.320,3.400,0.000,0.048,0.240,0.381,0.000,,,,[T2][H] Mark-VII-Heavy Nav Array ,,2,0.000,1.123,0.000,0.000,0.000,0.187,41.500,4.150,3.320,3.400,,0.048,0.240,0.381,1.000,,,,0.994,0.000,1.123,0.000,0.000,0.000,0.187,41.500,4.150,3.320,3.400,,0.048,0.240,0.381,100.000%,,,,1,TRUE,,1,,,,1/6,1,FALSE,1,1,0.7634,3,0.55,5,0,18.25,0.08,0.6,0,1.4,0.04,0.125,0.225,1,2310,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,1.000,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,100.000%,,,,1,TRUE,,1,,,,1/6,1,FALSE,1,1,0.0000,0,0,0,0,0,0,0,0,0,0,0,0,1,,[T3] 4000kt Explorer Frame,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,Survey Sensors,0,No Survey Sensors,,,,0.00,0.00,0.00,0.00,0.00,0.00,0.000,0.000,0.000,0.000,,0.00,0.00,0.00,100.000%,,,,,5,[T2][L] Mk-V-E Shield Gens,,[T2] Sm Frigate Hull Suite,3,[T3][M][R+] VSA-7 Pulse Injection Manifold,,Survey Sensors,Survey Sensors,Operations,TRUE,,,0,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,,,No Survey Sensors,,0,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,1.000,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,100.000%,,,,1,TRUE,,1,,,,,1,FALSE,1,1,0.0000,-99,0,0,0,0,0,0,0,0,0,0,0,1,0,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,1.000,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,100.000%,,,,1,TRUE,,1,,,,,1,FALSE,1,1,0.0000,0,0,0,0,0,0,0,0,0,0,0,0,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,Science Labs,2,[T2][H] Spock-C Pattern Lab,,,,0.00,2.25,0.00,0.00,0.00,0.00,89.000,8.900,8.010,4.075,,0.07,0.11,0.39,100.000%,,,,,1,[T2][M] SDB-09 High-Power Impulse Drive Sys,1,[T2][L] Lt. Alloy-3 Duranium Hull,1,[T2] EngOS Monitoring - Anak-Krueger EM Rails,,Science Labs,Science Labs,Operations,TRUE,,,0,,0.000,2.246,0.000,0.000,0.000,0.000,89.000,8.900,8.010,4.075,0.000,0.066,0.106,0.390,0.000,,,,[T2][H] Spock-C Pattern Lab,,2,0.000,2.246,0.000,0.000,0.000,0.000,89.000,8.900,8.010,4.075,,0.066,0.106,0.390,1.000,,,,1.987,0.000,2.246,0.000,0.000,0.000,0.000,89.000,8.900,8.010,4.075,,0.066,0.106,0.390,100.000%,,,,1,TRUE,,1,,,,,1,FALSE,1,1,0.4453,3,1.1,3,0,43,0.09,1.5,0.425,0.65,0.055,0.055,0.23,1,2313,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,1.000,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,100.000%,,,,1,TRUE,,1,,,,,1,FALSE,1,1,0.0000,0,0,0,0,0,0,0,0,0,0,0,0,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,Computer Core,3,[T1][L] Type-III-A Duotronic Core,,,,0.40,0.40,0.16,0.23,0.26,0.20,32.000,3.200,3.840,8.000,,0.00,0.05,0.21,99.990%,,,,,,,,,,,,Computer Core,Computer Cores,Operations,TRUE,,,3,3,0.395,0.395,0.158,0.226,0.263,0.198,32.000,3.200,3.840,8.000,0.000,0.000,0.047,0.207,0.000,,,,[T1][L] Type-III-A Duotronic Core,,3,0.395,0.395,0.158,0.226,0.263,0.198,32.000,3.200,3.840,8.000,,0.000,0.047,0.207,1.000,,,,1.398,0.395,0.395,0.158,0.226,0.263,0.198,32.000,3.200,3.840,8.000,,0.000,0.047,0.207,99.990%,,,,1,TRUE,1/4,1/4,1/10,1/7,1/6,1/8,1,FALSE,1,1,0.6117,1,0.6,20,0,4,0.12,5,1,0,0,0.02,0.1,0.9999,2305,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,1.000,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,100.000%,,,,1,TRUE,1/4,1/4,1/10,1/7,1/6,1/8,1,FALSE,1,1,0.0000,0,0,0,0,0,0,0,0,0,0,0,0,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,Operating System,3,[T2] Majel 3.1 OS,,,,0.38,0.38,0.00,0.22,0.00,0.30,0.000,0.000,0.000,5.050,,0.19,0.18,0.22,100.000%,,,,,Archive 2,Click to Restore,,,,,,Operating System,Operating System,Operations,TRUE,,,3,3,0.379,0.379,0.000,0.216,0.000,0.303,0.000,0.000,0.000,5.050,0.000,0.192,0.184,0.217,0.000,,,,[T2] Majel 3.1 OS,,3,0.379,0.379,0.000,0.216,0.000,0.303,0.000,0.000,0.000,5.050,,0.192,0.184,0.217,1.000,,,,2.680,0.379,0.379,0.000,0.216,0.000,0.303,0.000,0.000,0.000,5.050,,0.192,0.184,0.217,100.000%,,,,1,TRUE,1/8,1/8,,1/14,,1/10,1,FALSE,1,1,0.7834,-99,1.15,0,0,0,0,1,0.25,1.1,0.13125,0.07875,0.105,1,2310,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,1.000,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,100.000%,,,,1,TRUE,1/8,1/8,,1/14,,1/10,1,FALSE,1,1,0.0000,0,0,0,0,0,0,0,0,0,0,0,0,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,Secondary Core,0,No Core,,,,0.00,0.00,0.00,0.00,0.00,0.00,0.000,0.000,0.000,0.000,,0.00,0.00,0.00,,,,,,Class,Vanguard,,,,Design Sheet Version: C8,,Secondary Core,Computer Cores,Operations,TRUE,,,0,2,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,,,No Core,,0,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,,,,,1,TRUE,1/16,1/16,,1/28,,1/40,1,FALSE,1/2,1/4,0.0000,-99,0,0,0,0,0,0,0,0,0,0,0,1,0,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,,,,,1,TRUE,1/16,1/16,,1/28,,1/40,1,FALSE,1/2,1/4,0.0000,0,0,0,0,0,0,0,0,0,0,0,0,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,Isolinear?,FALSE,,,,,,,,,,,,,,,,,,,,,,,,Stat Line,C5 S3 H4 L6 P2 D5 - 95br 65sr - 945kt [2 1/4]yr - O2 E3 T3,,,,,,Isolinear?,,,FALSE,,,,,,,,,,,,,,,,,,,,,,,,,FALSE,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0.0000,0,0,0,0,0,0,0,0,0,0,0,0,1,*,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0.0000,0,0,0,0,0,0,0,0,0,0,0,0,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,Diplomatic Package,2,[T1][M] Lwaxana '04 General Protocol,,,,0.00,0.00,0.00,0.00,2.45,0.00,80.000,8.000,8.400,10.000,,0.12,0.03,0.07,100.000%,,,,,,Evasion Chance: 21.84%,Reliability: 99.32% (Annual Breakdown Chance: 0.68%),,Warp Core Breach Chance: 37.50%,,,Diplomatic Package,Diplomatic Packages,Operations,TRUE,,,0,,0.000,0.000,0.000,0.000,2.450,0.000,80.000,8.000,8.400,10.000,0.000,0.120,0.029,0.068,0.000,,,,[T1][M] Lwaxana '04 General Protocol,,2,0.000,0.000,0.000,0.000,2.450,0.000,80.000,8.000,8.400,10.000,,0.120,0.029,0.068,1.000,,,,2.168,0.000,0.000,0.000,0.000,2.450,0.000,80.000,8.000,8.400,10.000,,0.120,0.029,0.068,100.000%,,,,1,TRUE,,,,,1,,1,FALSE,1,1,0.4082,2,1.2,16,0,32,0.105,2,0.5,3.25,0.1,0.015,0.04,1,2309,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,1.000,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,100.000%,,,,1,TRUE,,,,,1,,1,FALSE,1,1,0.0000,0,0,0,0,0,0,0,0,0,0,0,0,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,Recreation Package,1,[T-1][M] 2260s Rec Space,,,,0.00,0.00,0.00,0.00,0.34,0.00,21.500,2.150,0.645,4.200,,0.00,0.00,0.00,100.000%,,,,,SDB Info,C[5.03] S[3.08] H[4.02] L[6.13] P[2.04] D[5.12] - [94.47]br [61.97]sr - [944.68]kt [2 1/4]yr - O[1.21] E[2.94] T[2.27],,,,,,Recreation Package,Recreation Packages,Operations,TRUE,,,0,,0.000,0.000,0.000,0.000,0.339,0.000,21.500,2.150,0.645,4.200,0.000,0.000,0.000,0.000,0.000,,,,[T-1][M] 2260s Rec Space,,1,0.000,0.000,0.000,0.000,0.339,0.000,21.500,2.150,0.645,4.200,,0.000,0.000,0.000,1.000,,,,0.300,0.000,0.000,0.000,0.000,0.339,0.000,21.500,2.150,0.645,4.200,,0.000,0.000,0.000,100.000%,,,,1,TRUE,,,,,1,,1,FALSE,1,1,2.9499,2,0.3,4,0,17.5,0.03,1,0.4,2,0,0,0,1,2270,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,1.000,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,100.000%,,,,1,TRUE,,,,,1,,1,FALSE,1,1,0.0000,0,0,0,0,0,0,0,0,0,0,0,0,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,Sickbay,3,[T2][H] T'Koren Pattern Large Sickbay,,,,0.00,0.92,0.00,0.00,1.84,0.00,76.000,7.600,6.840,4.050,,0.22,0.00,0.52,100.000%,,,,,,Power[110.78/113.67] - Internal[892.7/900] Tactical[275.2/405] Operations[126.4/315] Hull[101.0/135] Engineering[147.3/315] WarpCore[107.8/225],,,,,,Sickbay,Sickbays,Operations,TRUE,,,0,,0.000,0.922,0.000,0.000,1.844,0.000,76.000,7.600,6.840,4.050,0.000,0.219,0.000,0.517,0.000,,,,[T2][H] T'Koren Pattern Large Sickbay,,3,0.000,0.922,0.000,0.000,1.844,0.000,76.000,7.600,6.840,4.050,,0.219,0.000,0.517,1.000,,,,1.632,0.000,0.922,0.000,0.000,1.844,0.000,76.000,7.600,6.840,4.050,,0.219,0.000,0.517,100.000%,,,,1,TRUE,,1/2,,,1,,1,FALSE,1,1,0.3616,3,0.7,10,0,22,0.09,1.5,0.4,0.45,0.15,0,0.25,1,2316,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,1.000,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,100.000%,,,,1,TRUE,,1/2,,,1,,1,FALSE,1,1,0.0000,0,0,0,0,0,0,0,0,0,0,0,0,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,Operations Subtotal,,,,,,0.77,6.19,0.16,0.44,4.90,0.69,391.000,39.100,34.335,41.975,0.000,0.71,0.74,1.98,99.990%,,,,,Size,Frame Options,#,Operations Subsystem Options,#,Engineering Subsystem Options,,Operations Subtotal,,,,,,,,0.774,6.187,0.158,0.442,4.896,0.688,381.000,38.100,34.335,41.975,0.000,0.705,0.739,1.982,0.000,,,,,,,0.774,6.187,0.158,0.442,4.896,0.688,391.000,39.100,34.335,41.975,0.000,0.705,0.739,1.982,1.000,,,,,0.774,6.187,0.158,0.442,4.896,0.688,391.000,39.100,34.335,41.975,0.000,0.705,0.739,1.982,99.990%,0.50,,405,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,1.000,,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,100.000%,0.00,,0,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,,,,,,,,,,,,,,,,,,,,,,,,,,3.00,[T1] 900kt Frigate Frame,,[T2][OET-SR-] Md Frigate Operations Suite,,[T2][OET-SR-] Md Frigate Engineering Suite,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,Hull Subsystem Options,,Type,,Weight Class,Weight Cap,C x,S x,H x,L x,P x,D x,Weight,BR Cost,SR Cost x,,,O x,E x,T x,,Build Time,Tech Time,,,Size,Module Options,0,No Sensor,3,[T2][H] Type-VI-H SIF,,Frame,Type,Parent,,,,,,C x,S x,H x,L x,P x,D x,Weight,BR Cost,SR Cost x,,,O x,E x,T x,,Build Time,Tech Time,Weight Cap,Name,,,C x,S x,H x,L x,P x,D x,Weight,BR Cost,SR Cost x,,,O x,E x,T x,,Build Time,Tech Time,Weight Cap,Mod Effect x,C x,S x,H x,L x,P x,D x,Weight,BR Cost,SR Cost x,,,O x,E x,T x,,Build Time,Tech Time,Weight Cap,,,,,,,,,,,,,,Size Class,Weight Class,MaxSz,Wt,Build Time,Hull Mod,,,O-Mod,E-Mod,T-Mod,SR-Mod,,Year Available (SF),Name,,,C x,S x,H x,L x,P x,D x,Weight,BR Cost,SR Cost x,,,O x,E x,T x,,Build Time,Tech Time,Weight Cap,Mod Effect x,C x,S x,H x,L x,P x,D x,Weight,BR Cost,SR Cost x,,,O x,E x,T x,,Build Time,Tech Time,Weight Cap,,,,,,,,,,,,,,Size Class,Weight Class,MaxSz,Wt,Build Time,Hull Mod,,,O-Mod,E-Mod,T-Mod,SR-Mod,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,Hull Sub-Frame,,[T2] Sm Frigate Hull Suite,,Frigate,135,0.99,0.99,0.99,0.99,0.99,0.99,0.000,0.000,1.000,,,0.75,1.20,1.00,,1/12,,,,0.00,No Module,1,[T2][M] Mark-VII Nav Array ,3,[T2][L] Graviton Wavefront Deflector Saucer-Only,,Hull Sub-Frame,Hull,Frame,,,,,,0.990,0.990,0.990,0.990,0.990,0.990,0.000,0.000,1.000,,,0.750,1.200,1.000,,,,135,[T2] Sm Frigate Hull Suite,,,0.990,0.990,0.990,0.990,0.990,0.990,0.000,0.000,1.000,,,0.750,1.200,1.000,,0.08,,135,0.990,0.990,0.990,0.990,0.990,0.990,0.990,0.000,0.000,1.000,,,0.750,1.200,1.000,,0.08,,135,,,,,,,,,,,,,,1,1,15,,0.08333333333,0.99,,,1,1,1,1,,2315,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,,0.000,0.000,0.000,,0.00,,0,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,,0.000,0.000,0.000,,0.00,,0,,,,,,,,,,,,,,0,0,0,0,0,0,,,0,0,0,0,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,Component,#,Type,,,,C,S,H,L,P,D,Weight,BR Cost,SR Cost,Pwr Cost,Pwr Gen,O,E,T,Reliability,,Tech Time,,,#,Tactical Subsystem Options,0,No Survey Sensors,1,[T2][L] 2 X New Orleans Pattern Nacelles,,Component,Type,Parent,Has Part?,Min Size Class,Max Size Class,Min Qty,Max Qty,C,S,H,L,P,D,Weight,BR Cost,SR Cost,Pwr Cost,Pwr Gen,O,E,T,Reliability,Build Time,Tech Time,,Name,,Qty,C,S,H,L,P,D,Weight,BR Cost,SR Cost,Pwr Cost,Pwr Gen,O,E,T,Reliability,,Tech Time,,Mod Effect,C,S,H,L,P,D,Weight,BR Cost,SR Cost,Power Cost,Power Gen,O,E,T,Reliability,Build Time,Tech Time,,Effect Custom Mod,Effect Qty?,C Mod,S Mod,H Mod,L Mod,P Mod,D Mod,Wt Custom Mod,Scale Wt?,Cost Mod,Crew Mod,1/sum(stats),Size Sort,Effect,Weight O/H,Scale Weight,Unit Weight,SR Cost x,Pwr O/H,Scale Pwr,Unit Power,O,E,T,Reliability,Year Available (SF),Name,,Qty,C,S,H,L,P,D,Weight,BR Cost,SR Cost,Pwr Cost,Pwr Gen,O,E,T,Reliability,,Tech Time,,Mod Effect,C,S,H,L,P,D,Weight,BR Cost,SR Cost,Power Cost,Power Gen,O,E,T,Reliability,Build Time,Tech Time,,Effect Custom Mod,Effect Qty?,C Mod,S Mod,H Mod,L Mod,P Mod,D Mod,Wt Custom Mod,Scale Wt?,Cost Mod,Crew Mod,1/sum(stats),Size Sort,Effect,Weight O/H,Scale Weight,Unit Weight,SR Cost x,Pwr O/H,Scale Pwr,Unit Power,O,E,T,Reliability,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,Hull System,1,[T2][L] Lt. Alloy-3 Duranium Hull,,,,0.00,0.00,0.38,0.00,0.00,0.00,34.500,3.450,0.414,0.000,,0.01,0.19,0.08,100.000%,,,,,,[T2][O--SR-] Lg Frigate Tactical Suite,1,[T2][L] Pattern-K3 Compact Lab,3,[T2][M] S-Medical Mk VI Protein Synth,,Hull System,Hull System,Engineering,TRUE,,,1,,0.000,0.000,0.376,0.000,0.000,0.000,34.500,3.450,0.414,0.000,0.000,0.008,0.194,0.081,0.000,,,,[T2][L] Lt. Alloy-3 Duranium Hull,,1,0.000,0.000,0.376,0.000,0.000,0.000,34.500,3.450,0.414,0.000,,0.008,0.194,0.081,1.000,,,,0.380,0.000,0.000,0.376,0.000,0.000,0.000,34.500,3.450,0.414,0.000,,0.008,0.194,0.081,100.000%,,,,1,TRUE,,,1,,,,1,TRUE,1,1,2.6582,1,0.38,0,11.5,0,0.012,0,0,0,0.01,0.15,0.075,1,2313,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,1.000,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,100.000%,,,,1,TRUE,,,1,,,,1,TRUE,1,1,0.0000,0,0,0,0,0,0,0,0,0,0,0,0,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,Hull Subtotal,,,,,,0.00,0.00,0.38,0.00,0.00,0.00,34.500,3.450,0.414,0.000,0.000,0.01,0.19,0.08,100.000%,,,,,1,[T-1][L] Model 68 Phaser Bank,3,[T1][L] Type-III-A Duotronic Core,3,[T2][L] 2310-Light Pattern Deuterium Tanks,,Hull Subtotal,,,,,,,,0.000,0.000,0.376,0.000,0.000,0.000,34.500,3.450,0.414,0.000,0.000,0.008,0.194,0.081,0.000,,,,,,,0.000,0.000,0.376,0.000,0.000,0.000,34.500,3.450,0.414,0.000,0.000,0.008,0.194,0.081,1.000,,,,,0.000,0.000,0.376,0.000,0.000,0.000,34.500,3.450,0.414,0.000,0.000,0.008,0.194,0.081,100.000%,0.08,,135,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,1.000,,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,100.000%,0.00,,0,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,,,,,,,,,,,,,,,,,,,,,,,,,,0,No Phasers,3,[T3] Majel 3.5 OS,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,Engineering Subsystem Options,,Type,,Weight Class,Weight Cap,C x,S x,H x,L x,P x,D x,Weight,BR Cost,SR Cost x,,,O x,E x,T x,,Build Time,Tech Time,,,FALSE,Phaser Array?,0,No Core,Size/Lvl,Warp Core Options,,Frame,Type,Parent,,,,,,C x,S x,H x,L x,P x,D x,Weight,BR Cost,SR Cost x,,,O x,E x,T x,,Build Time,Tech Time,Weight Cap,Name,,,C x,S x,H x,L x,P x,D x,Weight,BR Cost,SR Cost x,,,O x,E x,T x,,Build Time,Tech Time,Weight Cap,Mod Effect x,C x,S x,H x,L x,P x,D x,Weight,BR Cost,SR Cost x,,,O x,E x,T x,,Build Time,Tech Time,Weight Cap,,,,,,,,,,,,,,Size Class,Weight Class,MaxSz,Wt,Build Time,Eng. Mod,,,O-Mod,E-Mod,T-Mod,SR-Mod,,Year Available (SF),Name,,,C x,S x,H x,L x,P x,D x,Weight,BR Cost,SR Cost x,,,O x,E x,T x,,Build Time,Tech Time,Weight Cap,Mod Effect x,C x,S x,H x,L x,P x,D x,Weight,BR Cost,SR Cost x,,,O x,E x,T x,,Build Time,Tech Time,Weight Cap,,,,,,,,,,,,,,Size Class,Weight Class,MaxSz,Wt,Build Time,Eng. Mod,,,O-Mod,E-Mod,T-Mod,SR-Mod,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,Engineering Sub-Frame,,[T2][OET-SR-] Md Frigate Engineering Suite,,Frigate,315,1.06,1.06,1.06,1.06,1.06,1.06,5.000,0.500,0.975,,,0.71,1.13,0.94,,3/12,,,,3,[T2][M][SR-] Mk-IV Torpedo System,FALSE,Isolinear?,,[T2] Md Frigate Warp Core Suite,,Engineering Sub-Frame,Engineering,Frame,,,,,,1.060,1.060,1.060,1.060,1.060,1.060,5.000,0.500,0.975,,,0.705,1.128,0.940,,,,315,[T2][OET-SR-] Md Frigate Engineering Suite,,,1.060,1.060,1.060,1.060,1.060,1.060,5.000,0.500,0.975,,,0.705,1.128,0.940,,0.25,,315,1.060,1.060,1.060,1.060,1.060,1.060,1.060,5.000,0.500,0.975,,,0.705,1.128,0.940,,0.25,,315,,,,,,,,,,,,,,2,1,35,5,0.25,1.06,,,0.94,0.94,0.94,0.975,,2315,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,,0.000,0.000,0.000,,0.00,,0,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,,0.000,0.000,0.000,,0.00,,0,,,,,,,,,,,,,,0,0,0,0,0,0,,,0,0,0,0,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,Component,#,Type,,,,C,S,H,L,P,D,Weight,BR Cost,SR Cost,Pwr Cost,Pwr Gen,O,E,T,Reliability,,Tech Time,,,TRUE,Burst Launcher?,1,[T-3][L] Escort Diplomatic Package '24,2,[T3][L][R+C+] Type-I Block-B (40E) Warp Core,,Component,Type,Parent,Has Part?,Min Size Class,Max Size Class,Min Qty,Max Qty,C,S,H,L,P,D,Weight,BR Cost,SR Cost,Pwr Cost,Pwr Gen,O,E,T,Reliability,Build Time,Tech Time,,Name,,Qty,C,S,H,L,P,D,Weight,BR Cost,SR Cost,Pwr Cost,Pwr Gen,O,E,T,Reliability,,Tech Time,,Mod Effect,C,S,H,L,P,D,Weight,BR Cost,SR Cost,Power Cost,Power Gen,O,E,T,Reliability,,Tech Time,,Effect Custom Mod,Effect Qty?,C Mod,S Mod,H Mod,L Mod,P Mod,D Mod,Wt Custom Mod,Scale Wt?,Cost Mod,Crew Mod,1/sum(stats),Size Sort,Effect,Weight O/H,Scale Weight,Unit Weight,SR Cost x,Pwr O/H,Scale Pwr,Unit Power,O,E,T,Reliability,Year Available (SF),Name,,Qty,C,S,H,L,P,D,Weight,BR Cost,SR Cost,Pwr Cost,Pwr Gen,O,E,T,Reliability,,Tech Time,,Mod Effect,C,S,H,L,P,D,Weight,BR Cost,SR Cost,Power Cost,Power Gen,O,E,T,Reliability,,Tech Time,,Effect Custom Mod,Effect Qty?,C Mod,S Mod,H Mod,L Mod,P Mod,D Mod,Wt Custom Mod,Scale Wt?,Cost Mod,Crew Mod,1/sum(stats),Size Sort,Effect,Weight O/H,Scale Weight,Unit Weight,SR Cost x,Pwr O/H,Scale Pwr,Unit Power,O,E,T,Reliability,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,Structural Integrity Fields,2,[T2][M] Type-VI SIF,,,,0.00,0.00,1.58,0.00,0.00,0.00,36.000,3.600,4.914,4.500,,0.01,0.49,0.11,99.900%,,,,,2,[T2][H] Mark-VI-Heavy SR Lateral Sensor Array,0,No Onboard Recreation,0,Safety/Performance,,Structural Integrity Fields,Structural Integrity Fields,Engineering,TRUE,,,0,2,0.000,0.000,1.580,0.000,0.000,0.000,36.000,3.600,4.914,4.500,0.000,0.012,0.487,0.114,-0.001,,,,[T2][M] Type-VI SIF,,2,0.000,0.000,1.580,0.000,0.000,0.000,36.000,3.600,4.914,4.500,,0.012,0.487,0.114,0.999,,,,1.490,0.000,0.000,1.580,0.000,0.000,0.000,36.000,3.600,4.914,4.500,,0.012,0.487,0.114,99.900%,,,,1,TRUE,,,1,,,,1,FALSE,1,1,0.6330,2,0.825,20,0,8,0.14,0,0.7,1.2,0.01,0.25,0.07,0.999,2315,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,1.000,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,100.000%,,,,1,TRUE,,,1,,,,1,FALSE,1,1,0.0000,0,0,0,0,0,0,0,0,0,0,0,0,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,Navigational Deflector,3,[T1][L] Modulated Graviton Beam Deflector Saucer-Only,,,,0.00,0.12,0.00,0.05,0.00,0.37,21.000,2.100,2.252,5.500,,0.07,0.12,0.02,100.000%,,,,,1,[T2][M] Type-3 TCU,1,[T2][H] T'Koren Pattern Large Sickbay,2,[T2][L][R-C-] Luna-VI High-Efficiency M/AM System,,Navigational Deflector,Navigational Deflectors,Engineering,TRUE,1,1,3,3,0.000,0.124,0.000,0.053,0.000,0.371,21.000,2.100,2.252,5.500,0.000,0.074,0.119,0.020,0.000,,,,[T1][L] Modulated Graviton Beam Deflector Saucer-Only,,3,0.000,0.124,0.000,0.053,0.000,0.371,21.000,2.100,2.252,5.500,,0.074,0.119,0.020,1.000,,,,0.350,0.000,0.124,0.000,0.053,0.000,0.371,21.000,2.100,2.252,5.500,,0.074,0.119,0.020,100.000%,,,,1,FALSE,,1/3,,1/7,,1,1,FALSE,1,1,1.8259,1,0.35,0,0,7,0.11,2.2,1.1,0,0.05,0.05,0.01,1,2307,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,1.000,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,100.000%,,,,1,FALSE,,1/3,,1/7,,1,1,FALSE,1,1,0.0000,0,0,0,0,0,0,0,0,0,0,0,0,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,Nacelle System,1,[T1][L] 2 X Centaur-A Pattern Nacelle,,,,0.00,0.00,0.00,0.00,0.00,1.63,50.000,5.000,7.313,5.000,,0.00,0.00,0.00,100.000%,,,,,3,[T2][H] Mk-V-SH Shield Gens,#,Hull Subsystem Options,2,[T2][H][SR-] SBD-VIII Efficient Coolant System,,Nacelle System,Nacelles,Engineering,TRUE,,,1,1,0.000,0.000,0.000,0.000,0.000,1.628,50.000,5.000,7.313,5.000,0.000,0.000,0.000,0.000,0.000,,,,[T1][L] 2 X Centaur-A Pattern Nacelle,,1,0.000,0.000,0.000,0.000,0.000,1.628,50.000,5.000,7.313,5.000,,0.000,0.000,0.000,1.000,,,,1.536,0.000,0.000,0.000,0.000,0.000,1.628,50.000,5.000,7.313,5.000,,0.000,0.000,0.000,100.000%,,,,1,TRUE,,,,,,1,1,FALSE,1,1,0.6142,1,1.536,5,0,50,0.15,5,4,0,0,0,0,1,2306,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,1.000,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,100.000%,,,,1,TRUE,,,,,,1,1,FALSE,1,1,0.0000,0,0,0,0,0,0,0,0,0,0,0,0,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,Nacelle Distribution,,,,,,,,,,,,5.000,0.500,0.731,12.000,,,,,,,,,,6,[T2][L] Mk-V-E Shield Gens,,[T2] Sm Frigate Hull Suite,3,[T3][L][R+] Tellar HIG-117 Pulse Injection Manifold ,,Nacelle Distribution,,Nacelles,FALSE,,,,,,,,,,,,0.500,0.731,12.000,0.000,,,,,,,,,,,,,,,,,5.000,0.500,0.731,12.000,,,,,,,,,,,,,,,,5.000,0.500,0.731,12.000,,,,,,,,,,,,,,,,,,,,,0.0000,0,0,0,0,0,0,0,0,0,0,0,0,1,*,,,,,,,,,,0.000,0.000,0.000,0.000,,,,,,,,,,,,,,,,0.000,0.000,0.000,0.000,,,,,,,,,,,,,,,,,,,,,0.0000,0,0,0,0,0,0,0,0,0,0,0,0,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,Replication Package,1,[T2][M] S-Medical Mk VI Protein Synth,,,,0.00,0.05,0.00,0.00,0.13,0.53,14.000,1.400,0.137,2.000,,0.00,0.00,0.03,100.000%,,,,,1,[T2][M] SDB-09 High-Power Impulse Drive Sys,2,[T2][M] Med. Alloy-3 Duranium Hull,1,[T1] EngOS Monitoring - Super Heavy EM Rails,,Replication Package,Replication Packages,Engineering,TRUE,,,0,3,0.000,0.053,0.000,0.000,0.133,0.530,14.000,1.400,0.137,2.000,0.000,0.000,0.000,0.025,0.000,,,,[T2][M] S-Medical Mk VI Protein Synth,,1,0.000,0.053,0.000,0.000,0.133,0.530,14.000,1.400,0.137,2.000,,0.000,0.000,0.025,1.000,,,,0.500,0.000,0.053,0.000,0.000,0.133,0.530,14.000,1.400,0.137,2.000,,0.000,0.000,0.025,100.000%,,,,1,TRUE,,1/10,,,1/4,1,1,FALSE,1,1,1.3976,2,0.5,7,0,7,0.01,0,0.5,0.5,0,0,0.025,1,2313,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,1.000,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,100.000%,,,,1,TRUE,,1/10,,,1/4,1,1,FALSE,1,1,0.0000,0,0,0,0,0,0,0,0,0,0,0,0,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,Fuel & Matter Stores,3,[T2][L] 2310-Light Pattern Deuterium Tanks,,,,0.00,0.00,0.00,0.00,0.00,0.64,30.000,3.000,1.901,1.500,,0.00,0.00,0.00,100.000%,,,,,,,,,,,,Fuel & Matter Stores,Fuel & Matter Stores,Engineering,TRUE,,,3,3,0.000,0.000,0.000,0.000,0.000,0.636,30.000,3.000,1.901,1.500,0.000,0.000,0.000,0.000,0.000,,,,[T2][L] 2310-Light Pattern Deuterium Tanks,,3,0.000,0.000,0.000,0.000,0.000,0.636,30.000,3.000,1.901,1.500,,0.000,0.000,0.000,1.000,,,,0.600,0.000,0.000,0.000,0.000,0.000,0.636,30.000,3.000,1.901,1.500,,0.000,0.000,0.000,100.000%,,,,1,FALSE,,,,,,1,1,FALSE,1,1,1.5723,1,0.6,0,0,10,0.065,0,0.25,0.25,0,0,0,1,2313,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,1.000,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,100.000%,,,,1,FALSE,,,,,,1,1,FALSE,1,1,0.0000,0,0,0,0,0,0,0,0,0,0,0,0,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,Engineering Subtotal,,,,,,0.00,0.18,1.58,0.05,0.13,3.17,161.000,16.100,17.248,30.500,0.000,0.09,0.61,0.16,99.900%,,,,,,,,,,,,Engineering Subtotal,,,,,,,,0.000,0.177,1.580,0.053,0.133,3.165,151.000,15.600,17.248,30.500,0.000,0.087,0.606,0.159,-0.001,,,,,,,0.000,0.177,1.580,0.053,0.133,3.165,161.000,16.100,17.248,30.500,0.000,0.087,0.606,0.159,0.999,,,,,0.000,0.177,1.580,0.053,0.133,3.165,161.000,16.100,17.248,30.500,0.000,0.087,0.606,0.159,99.900%,0.25,,315,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,1.000,,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,100.000%,0.00,,0,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,Warp Core Options,,Type,,Weight Class,Weight Cap,,,Mod Effect x,,,,Weight,BR Cost,SR Cost x,,,O x,E x,T x,,Build Time,Tech Time,,,,,,,,,,Frame,Type,Parent,,,,,,,,Mod Effect x,,,,Weight,BR Cost,SR Cost x,,,O x,E x,T x,,Build Time,Tech Time,Weight Cap,Name,,,,,Mod Effect x,,,,Weight,BR Cost,SR Cost x,,,O x,E x,T x,,Build Time,Tech Time,Weight Cap,Mod Effect x,,,,,,,Weight,BR Cost,SR Cost x,,,O x,E x,T x,,Build Time,Tech Time,Weight Cap,,,,,,,,,,,,,,Size Class,Weight Class,MaxSz,Wt,Build Time,Core Mod,,,O-Mod,E-Mod,T-Mod,SR-Mod,,Year Available (SF),Name,,,,,Mod Effect x,,,,Weight,BR Cost,SR Cost x,,,O x,E x,T x,,Build Time,Tech Time,Weight Cap,Mod Effect x,,,,,,,Weight,BR Cost,SR Cost x,,,O x,E x,T x,,Build Time,Tech Time,Weight Cap,,,,,,,,,,,,,,Size Class,Weight Class,MaxSz,Wt,Build Time,Core Mod,,,O-Mod,E-Mod,T-Mod,SR-Mod,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,Warp Core Sub-Frame,,[T2] Md Frigate Warp Core Suite,,Frigate,225,,,1.140,,,,0.000,0.000,0.990,,,0.74,1.19,0.99,,3/12,,,,,,,,,,,Warp Core Sub-Frame,Warp Core,Frame,,,,,,,,1.140,,,,0.000,0.000,0.990,,,0.743,1.188,0.990,,,,225,[T2] Md Frigate Warp Core Suite,,,,,1.140,,,,0.000,0.000,0.990,,,0.743,1.188,0.990,,0.25,,225,1.140,,,,,,,0.000,0.000,0.990,,,0.743,1.188,0.990,,0.25,,225,,,,,,,,,,,,,,2,1,25,,0.25,1.14,,,0.99,0.99,0.99,0.99,,2315,,,,,,0.000,,,,0.000,0.000,0.000,,,0.000,0.000,0.000,,0.00,,0,0.000,,,,,,,0.000,0.000,0.000,,,0.000,0.000,0.000,,0.00,,0,,,,,,,,,,,,,,0,0,0,0,0,0,,,0,0,0,0,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,Component,Size/Lvl,Type,,,,,,,,,,Weight,BR Cost,SR Cost,Pwr Cost,Pwr Gen,O,E,T,Reliability,,Tech Time,,,,,,,,,,Component,Type,Parent,Has Part?,Min Size Class,Max Size Class,Min Qty,Max Qty,,,,,,,Weight,BR Cost,SR Cost,Pwr Cost,Pwr Gen,O,E,T,Reliability,Build Time,Tech Time,,Name,,Qty,,,,,,,Weight,BR Cost,SR Cost,Pwr Cost,Pwr Gen,O,E,T,Reliability,,Tech Time,,Mod Effect,,,,,,,Weight,BR Cost,SR Cost,Power Cost,Power Gen,O,E,T,Reliability,,Tech Time,,Effect Custom Mod,Effect Qty?,,,,,,,Wt Custom Mod,Scale Wt?,Cost Mod,Crew Mod,1/sum(stats),Size Sort,Effect,Weight O/H,Scale Weight,Unit Weight,SR Cost x,Pwr O/H,Scale Pwr,Unit Power,O,E,T,Reliability,Year Available (SF),Name,,Qty,,,,,,,Weight,BR Cost,SR Cost,Pwr Cost,Pwr Gen,O,E,T,Reliability,,Tech Time,,Mod Effect,,,,,,,Weight,BR Cost,SR Cost,Power Cost,Power Gen,O,E,T,Reliability,,Tech Time,,Effect Custom Mod,Effect Qty?,,,,,,,Wt Custom Mod,Scale Wt?,Cost Mod,Crew Mod,1/sum(stats),Size Sort,Effect,Weight O/H,Scale Weight,Unit Weight,SR Cost x,Pwr O/H,Scale Pwr,Unit Power,O,E,T,Reliability,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,Warp Core Type,2,[T2][L][C+] Type-I Block-A (40E) Warp Core,,,,,,,,,,40.000,4.000,3.564,,84.439,0.13,0.31,0.17,99.700%,,,,,,,,,,,,Warp Core Type,Warp Core Types,Warp Core,TRUE,,,1,,,,,,,,40.000,4.000,3.564,0.000,84.439,0.128,0.308,0.171,-0.003,,,,[T2][L][C+] Type-I Block-A (40E) Warp Core,,2,,,,,,,40.000,4.000,3.564,,84.439,0.128,0.308,0.171,0.997,,,,84.439,,,,,,,40.000,4.000,3.564,,84.439,0.128,0.308,0.171,99.700%,,,,1,TRUE,,,,,,,1,FALSE,1,1,0.0000,1,41,0,0,20,0.09,0,0,0,0.1,0.15,0.1,0.997,2313,,,,,,,,,,0.000,0.000,0.000,,0.000,0.000,0.000,0.000,1.000,,,,0.000,,,,,,,0.000,0.000,0.000,,0.000,0.000,0.000,0.000,100.000%,,,,1,TRUE,,,,,,,1,FALSE,1,1,0.0000,0,0,0,0,0,0,0,0,0,0,0,0,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,Safety/Performance,0,,,,,,,,,,,,,,,0.000,,,,100.000%,,,,,,,,,,,,Safety/Performance,Safety/Performance,Warp Core,FALSE,,,-5,5,,,,,,,,,,0.000,0.000,,,,0.000,,,,,,0,,,,,,,,,,,0.000,,,,1.000,,,,,,,,,,,,,,,0.000,,,,100.000%,,,,1,FALSE,,,,,,,1,FALSE,0,0,0.0000,0,0,0,0,0,0,0,0,0,0,0,0,1,*,,,,,,,,,,,,,,0.000,,,,1.000,,,,,,,,,,,,,,,0.000,,,,100.000%,,,,1,FALSE,,,,,,,1,FALSE,0,0,0.0000,0,0,0,0,0,0,0,0,0,0,0,0,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,M/AM Injectors,2,[T2][L][R-C-] Luna-VI High-Efficiency M/AM System,,,,,,,,,,21.200,2.120,2.099,,20.129,0.03,0.05,0.04,99.500%,,,,,,,,,,,,M/AM Injectors,Matter/Anti-Matter Injectors,Warp Core,TRUE,,,2,2,,,,,,,21.200,2.120,2.099,0.000,19.129,0.032,0.051,0.043,-0.005,,,,[T2][L][R-C-] Luna-VI High-Efficiency M/AM System,,2,,,,,,,21.200,2.120,2.099,,20.129,0.032,0.051,0.043,0.995,,,,22.654,,,,,,,21.200,2.120,2.099,,20.129,0.032,0.051,0.043,99.500%,,,,1,TRUE,,,,,,,1,FALSE,1,1,0.0000,1,11,0,0,10.6,0.1,0,0,0,0.025,0.025,0.025,0.995,2313,,,,,,,,,,0.000,0.000,0.000,,1.000,0.000,0.000,0.000,1.000,,,,0.000,,,,,,,0.000,0.000,0.000,,1.000,0.000,0.000,0.000,100.000%,,,,1,TRUE,,,,,,,1,FALSE,1,1,0.0000,0,0,0,0,0,0,0,0,0,0,0,0,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,Coolant Systems,2,[T2][L] Mk VIII Mod L Yoyodyne Coolant System,,,,,,,,,,8.000,0.800,0.792,,-15.086,0.01,0.02,0.02,100.300%,,,,,,,,,,,,Coolant Systems,Coolant Systems,Warp Core,TRUE,,,2,2,,,,,,,8.000,0.800,0.792,0.000,-16.086,0.013,0.021,0.017,0.003,,,,[T2][L] Mk VIII Mod L Yoyodyne Coolant System,,2,,,,,,,8.000,0.800,0.792,,-15.086,0.013,0.021,0.017,1.003,,,,-19.050,,,,,,,8.000,0.800,0.792,,-15.086,0.013,0.021,0.017,100.300%,,,,1,TRUE,,,,,,,1,FALSE,1,1,0.0000,1,-9.25,0,0,4,0.1,0,0,0,0.01,0.01,0.01,1.003,2311,,,,,,,,,,0.000,0.000,0.000,,1.000,0.000,0.000,0.000,1.000,,,,0.000,,,,,,,0.000,0.000,0.000,,1.000,0.000,0.000,0.000,100.000%,,,,1,TRUE,,,,,,,1,FALSE,1,1,0.0000,0,0,0,0,0,0,0,0,0,0,0,0,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,EPS Manifold System,3,[T3][M][R+] VSA-7 Pulse Injection Manifold,,,,,,,,,,20.600,2.060,2.243,,18.086,0.00,0.03,0.02,99.925%,,,,,,,,,,,,EPS Manifold System,EPS Manifold System,Warp Core,TRUE,,,3,3,,,,,,,20.600,2.060,2.243,0.000,17.086,0.000,0.025,0.021,-0.001,,,,[T3][M][R+] VSA-7 Pulse Injection Manifold,,3,,,,,,,20.600,2.060,2.243,,18.086,0.000,0.025,0.021,0.999,,,,20.235,,,,,,,20.600,2.060,2.243,,18.086,0.000,0.025,0.021,99.925%,,,,1,FALSE,,,,,,,1,FALSE,1,1,0.0000,2,17.75,14,0,2.2,0.11,0,0,0,0,0.01,0.01,0.99925,2315,,,,,,,,,,0.000,0.000,0.000,,1.000,0.000,0.000,0.000,1.000,,,,0.000,,,,,,,0.000,0.000,0.000,,1.000,0.000,0.000,0.000,100.000%,,,,1,FALSE,,,,,,,1,FALSE,1,1,0.0000,0,0,0,0,0,0,0,0,0,0,0,0,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,Eject System,1,[T2] EngOS Monitoring - Anak-Krueger EM Rails,,,,,,,,,,5.000,0.500,0.990,5.000,,0.00,0.00,0.01,100.000%,,,,,,,,,,,,Eject System,Eject System,Warp Core,TRUE,,,0,1,,,,,,,5.000,0.500,0.990,5.000,0.000,0.000,0.000,0.011,0.000,,,,[T2] EngOS Monitoring - Anak-Krueger EM Rails,,1,,,,,,,5.000,0.500,0.990,5.000,,0.000,0.000,0.011,1.000,,,,,,,,,,,5.000,0.500,0.990,5.000,,0.000,0.000,0.011,100.000%,,,,,FALSE,,,,,,,1,FALSE,1,1,0.0000,-99,0,5,0,0,0.2,5,0,0,0,0,0.01,0.365,2315,,,,,,,,,,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,1.000,,,,,,,,,,,0.000,0.000,0.000,0.000,,0.000,0.000,0.000,100.000%,,,,,FALSE,,,,,,,1,FALSE,1,1,0.0000,0,0,0,0,0,0,0,0,0,0,0,0,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,Warp Core Subtotal,,,,,,,,,,,,94.800,9.480,9.688,5.000,107.569,0.17,0.40,0.26,99.425%,,,,,,,,,,,,Warp Core Subtotal,,,,,,,,,,,,,,94.800,9.480,9.688,5.000,104.569,0.173,0.405,0.263,-0.006,,,,,,,,,,,,,94.800,9.480,9.688,5.000,107.569,0.173,0.405,0.263,0.994,,,,,,,,,,,94.800,9.480,9.688,5.000,107.569,0.173,0.405,0.263,99.425%,0.25,,225,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0.000,0.000,0.000,0.000,3.000,0.000,0.000,0.000,1.000,,,,,,,,,,,0.000,0.000,0.000,0.000,3.000,0.000,0.000,0.000,100.000%,0.00,,0,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,Module Options,Size,Variant,,,Weight Cap,C,S,H,L,P,D,Weight,BR Cost,SR Cost,Pwr Cost,Pwr Gen,O,E,T,Reliability,Build Time,Tech Time,,,,,,,,,,,,,,,,,,C,S,H,L,P,D,Weight,BR Cost,SR Cost,Pwr Cost,Pwr Gen,O,E,T,Reliability,Build Time,Tech Time,Weight Cap,Module Type,Module Variant,Size,C,S,H,L,P,D,Weight,BR Cost,SR Cost,Pwr Cost,Pwr Gen,O,E,T,Reliability,Build Time,Tech Time,Weight Cap,,C,S,H,L,P,D,Weight,BR Cost,SR Cost,Power Cost,Power Gen,O,E,T,Reliability,Build Time,Tech Time,Weight Cap,,,C,S,H,L,P,D,,,,,1/sum(stats),,,Weight Cap,Weight,Build Time,SR Cost,Power Cost,,,O,E,T,Reliability,Year Available (SF),Module Type,Module Variant,Size,C,S,H,L,P,D,Weight,BR Cost,SR Cost,Pwr Cost,Pwr Gen,O,E,T,Reliability,Build Time,Tech Time,Weight Cap,,C,S,H,L,P,D,Weight,BR Cost,SR Cost,Power Cost,Power Gen,O,E,T,Reliability,Build Time,Tech Time,Weight Cap,,,C,S,H,L,P,D,,,,,1/sum(stats),,,Weight Cap,Weight,Build Time,SR Cost,Power Cost,,,O,E,T,Reliability,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n,,No Module,0.00,-,,,0,0.00,0.00,0.00,0.00,0.00,0.00,0.000,0.000,0.000,0.000,0.000,0.00,0.00,0.00,100.000%,0,,,,,,,,,,,Module,,,,,,,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,,,0,No Module,-,0,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,1.000,0.00,,0.00,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,100.000%,0.00,,0,,,0,0,0,0,0,0,,,,,0,,,0,0,0,0,0,,,0,0,0,1,2270,,,0,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,1.000,0.00,,0.00,,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,100.000%,0.00,,0,,,0,0,0,0,0,0,,,,,0,,,0,0,0,0,0,,,0,0,0,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,"

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    on: {
      "click": _vm.swap_design
    }
  }, [_c('DesignSummary', {
    attrs: {
      "se_db": this.se_db,
      "design_json": this.design_json
    }
  })], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-46631714", esExports)
  }
}

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map