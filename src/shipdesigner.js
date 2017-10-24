'use strict';

import Vue from 'vue';
import ShipDesigner from './shipdesigner.vue';
import Vuex from 'vuex';

import Promise from 'bluebird';
Promise.longStackTraces();

Vue.use(Vuex);

import ShipEngine from '../lib/shipengine.js';

import design_json_init from '../dist/swb_kepler_recreation.json';
import canon_parts_list from '../dist/canon_parts_list.json';

let design_json;
let hash = new URL(location).hash;
if (hash) {
	design_json = JSON.parse(decodeURI(hash.substring(1)));
} else {
	design_json = design_json_init;
};

const store = new Vuex.Store({
	state: {
		design_json,
		parts_list: canon_parts_list,
		canon_parts_list,
		undo: {
			current: -1,
			history: [],
		},
	},
	getters: {
		se_design: (state, getters) => {
			return new ShipEngine.Design(getters.se_db, state.design_json);
		},
		se_db: (state, getters) => {
			return new ShipEngine.DB({
				parts: state.parts_list.parts.records,
				modules: state.parts_list.modules.records,
				frames: state.parts_list.frames.records,
			});
		},
	},
	actions: {
		redo (context) {
			if (context.state.undo.current < context.state.undo.history.length - 1) {
				context.commit('history_forward');
				context.commit(context.state.undo.history[context.state.undo.current].redo);
			};
		},
		undo (context) {
			if (context.state.undo.current >= 0) {
				context.commit(context.state.undo.history[context.state.undo.current].undo);
				context.commit('history_backward');
			}
		},
	},
	mutations: {
		history_forward (state, payload) {
			state.undo.current += 1;
		},
		history_backward (state, payload) {
			state.undo.current -= 1;
		},
		timestamp_design (state, payload) {
			let timestamp = new Date();
			timestamp.setMilliseconds(0);
			state.design_json['Blueprint Date'] = timestamp.toISOString();
		},
		set_parts_list (state, payload) {
			state.parts_list = payload;
		},
		

		set_subsystem_frame (state, payload) {
			let old_frame = payload.subsystem.sub_frame;
			payload.subsystem.sub_frame = payload.value;
			state.undo.current += 1;
			state.undo.history.splice(state.undo.current);
			state.undo.history[state.undo.current] = ({
				undo: {
					type: 'set_subsystem_frame_undo',
					subsystem: payload.subsystem,
					old_frame,
				},
				redo: {
					type: 'set_subsystem_frame_redo',
					subsystem: payload.subsystem,
					new_frame: payload.subsystem.sub_frame,
				},
			});
		},
		set_subsystem_frame_undo (state, payload) {
			payload.subsystem.sub_frame = payload.old_frame;
		},
		set_subsystem_frame_redo (state, payload) {
			payload.subsystem.sub_frame = payload.new_frame;
		},


		set_component_quantity (state, payload) {
			const old_quantity = payload.component.quantity;
			const old_part = payload.component.part;
			payload.component.quantity = payload.value;
			state.undo.current += 1;
			state.undo.history.splice(state.undo.current);
			state.undo.history[state.undo.current] = ({
				undo: {
					type: 'set_component_quantity_undo',
					component: payload.component,
					old_quantity,
					old_part,
				},
				redo: {
					type: 'set_component_quantity_redo',
					component: payload.component,
					new_quantity: payload.component.quantity,
					new_part: payload.component.part,
				},
			});
		},
		set_component_quantity_undo (state, payload) {
			payload.component.quantity = payload.old_quantity;
			payload.component.part = payload.old_part;
		},
		set_component_quantity_redo (state, payload) {
			payload.component.quantity = payload.new_quantity;
			payload.component.part = payload.new_part;
		},


		set_component_part (state, payload) {
			let old_quantity = payload.component.quantity;
			let old_part = payload.component.part;
			payload.component.part = payload.value;
			if (!payload.component.quantity && !payload.component.is_no_part) {
				payload.component.quantity = 1;
			};
			state.undo.current += 1;
			state.undo.history.splice(state.undo.current);
			state.undo.history[state.undo.current] = {
				undo: {
					type: 'set_component_part_undo',
					component: payload.component,
					old_quantity,
					old_part,
				},
				redo: {
					type: 'set_component_part_redo',
					component: payload.component,
					new_quantity: payload.component.quantity,
					new_part: payload.component.part,
				},
			};
		},
		set_component_part_undo (state, payload) {
			payload.component.part = payload.old_part;
			payload.component.quantity = payload.old_quantity;
		},
		set_component_part_redo (state, payload) {
			payload.component.part = payload.new_part;
			payload.component.quantity = payload.new_quantity;
		},


		set_setting (state, payload) {
			const old_value = payload.setting['Value'];
			switch (typeof(payload.setting['Value'])) {
			case 'number':
				payload.setting['Value'] = parseInt(payload.value);
				break;
			case 'boolean':
				payload.setting['Value'] = payload.value;
				break;
			}
			state.undo.current += 1;
			state.undo.history.splice(state.undo.current);
			state.undo.history[state.undo.current] = {
				undo: {
					type: 'set_setting_undo',
					setting: payload.setting,
					old_value,
				},
				redo: {
					type: 'set_setting_redo',
					setting: payload.setting,
					new_value: payload.setting['Value'],
				},
			};
		},
		set_setting_undo (state, payload) {
			payload.setting['Value'] = payload.old_value;
		},
		set_setting_redo (state, payload) {
			payload.setting['Value'] = payload.new_value;
		},


		set_module_type (state, payload) {
			const old_type = payload.module.module_type;
			const old_variant = payload.module.module_variant;
			payload.module.module_type = payload.value;
			const valid_variants = payload.se_db.find_modules(payload.value);
			payload.module.module_variant = valid_variants[0]['Variant'];
			state.undo.current += 1;
			state.undo.history.splice(state.undo.current);
			state.undo.history[state.undo.current] = {
				undo: {
					type: 'set_module_type_undo',
					module: payload.module,
					old_type,
					old_variant,
				},
				redo: {
					type: 'set_module_type_redo',
					module: payload.module,
					new_type: payload.module.module_type,
					new_variant: payload.module.module_variant,
				},
			};
		},
		set_module_type_undo (state, payload) {
			payload.module.module_type = payload.old_type;
			payload.module.module_variant = payload.old_variant;
		},
		set_module_type_redo (state, payload) {
			payload.module.module_type = payload.new_type;
			payload.module.module_variant = payload.new_variant;
		},


		set_module_variant (state, payload) {
			const old_variant = payload.module.module_variant;
			payload.module.module_variant = payload.value;
			state.undo.current += 1;
			state.undo.history.splice(state.undo.current);
			state.undo.history[state.undo.current] = {
				undo: {
					type: 'set_module_variant_undo',
					module: payload.module,
					old_variant,
				},
				redo: {
					type: 'set_module_variant_redo',
					module: payload.module,
					new_variant: payload.module.module_variant,
				},
			};
		},
		set_module_variant_undo (state, payload) {
			payload.module.module_variant = payload.old_variant;
		},
		set_module_variant_redo (state, payload) {
			payload.module.module_variant = payload.new_variant;
		},


		set_design_json (state, payload) {
			const old_data = state.design_json;
			state.design_json = payload;
			state.undo.current += 1;
			state.undo.history.splice(state.undo.current);
			state.undo.history[state.undo.current] = {
				undo: {
					type: 'set_design_json_undo',
					old_data,
				},
				redo: {
					type: 'set_design_json_redo',
					new_data: state.design_json,
				},
			};
		},
		set_design_json_undo (state, payload) {
			state.design_json = payload.old_data;
		},
		set_design_json_redo (state, payload) {
			state.design_json = payload.new_data;
		},
	},
});

window.addEventListener('keydown', function(ev) {
	if (ev.key === 'z' && ev.ctrlKey) {
		store.dispatch('undo');
	};
	if (ev.key === 'y' && ev.ctrlKey) {
		store.dispatch('redo');
	};
});

// create a root instance
new Vue({
	el: '#app',
 	render: h => h(ShipDesigner),
	store,
});
