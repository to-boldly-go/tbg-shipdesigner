'use strict';

import Vue from 'vue';
import ShipDesigner from './shipdesigner.vue';
import Vuex from 'vuex';

import Promise from 'bluebird';
Promise.longStackTraces();

Vue.use(Vuex);

import design_json_init from '../dist/swb_kepler_recreation.json';
import canon_parts from '../dist/parts_C8.csv';
import canon_modules from '../dist/modules_C8.csv';
import canon_frames from '../dist/frames_C8.csv';

import ShipEngine from '../lib/shipengine.js';

let design_json;
let hash = new URL(location).hash;
if (hash) {
	design_json = JSON.parse(decodeURI(hash.substring(1)));
} else {
	design_json = design_json_init;
};

const PARTS_KEY = 'working_parts_list';

const store = new Vuex.Store({
	state: {
		design_info: {
			data: design_json,
		},
		parts_info: {
			parts: canon_parts,
			modules: canon_modules,
			frames: canon_frames,
		},
	},
	getters: {
		se_design: (state, getters) => {
			return new ShipEngine.Design(getters.se_db, state.design_info.data);
		},
		se_db: (state, getters) => {
			return new ShipEngine.DB(state.parts_info);
		},
		design_info: (state, getters) => {
			return state.design_info;
		},
	},
	mutations: {
		timestamp_design (state, payload) {
			let timestamp = new Date();
			timestamp.setMilliseconds(0);
			state.design_info.data['Blueprint Date'] = timestamp.toISOString();
		},
		load_parts_from_storage (state, payload) {
			const saved_parts = localStorage.getItem(PARTS_KEY);
			if (saved_parts) {
				const saved_parts_object = JSON.parse(saved_parts);
				state.parts_info.parts = saved_parts_object.parts.records;
				state.parts_info.modules = saved_parts_object.modules.records;
				state.parts_info.frames = saved_parts_object.frames.records;
			};
		},
		set_subsystem_frame (state, payload) {
			payload.subsystem.sub_frame = payload.value;
		},
		set_component_quantity (state, payload) {
			payload.component.quantity = payload.value;
			if (payload.value === 0) {
				const valid_parts = payload.component.valid_parts;
				const no_part = valid_parts.find((part) => part['Name'].match(/No .+/) !== null);
				console.log(no_part);
				if (no_part) {
					payload.component.part = no_part['Name'];
				};
			};
		},
		set_component_part (state, payload) {
			let component = payload.component
			component.part = payload.value;
			if (!component.quantity && !component.is_no_part) {
				component.quantity = 1;
			};
		},
		set_setting (state, payload) {
			switch (typeof(payload.setting['Value'])) {
			case 'number':
				payload.setting['Value'] = parseInt(payload.value);
				break;
			case 'boolean':
				payload.setting['Value'] = payload.value;
				break;
			}
		},
		set_module_type (state, payload) {
			payload.module.module_type = payload.value;
			const valid_variants = payload.se_db.find_modules(payload.value);
			payload.module.module_variant = valid_variants[0]['Variant'];
		},
		set_module_variant (state, payload) {
			payload.module.module_variant = payload.value;
		},
		set_design_json (state, payload) {
			state.design_info.data = payload;
		},
	},
});

window.addEventListener('storage', function(ev) {
	if (ev.key === PARTS_KEY) {
		store.commit('load_parts_from_storage');
	};
});

// create a root instance
new Vue({
	el: '#app',
 	render: h => h(ShipDesigner),
	store,
});
