'use strict';

import _ from 'lodash';

import Vue from 'vue';
import Vuex from 'vuex';
import PartBuilder from './partbuilder.vue';

import Promise from 'bluebird';

Promise.longStackTraces();

Vue.use(Vuex);

import canon_parts_list from '../dist/canon_parts_list.json';

const store = new Vuex.Store({
	state: {
		parts_list: _.cloneDeep(canon_parts_list),
		canon_parts_list,
		display: {
			filter: {
				types: [
					..._(canon_parts_list.modules.records).map((part) => part['Type']).uniq(),
					_(canon_parts_list.parts.records).minBy((part) => part['Type Sort'])['Type'],
					_(canon_parts_list.frames.records).minBy((part) => part['Type Sort'])['Type'],
				]
			},
			current_sort: {
				field: null,
				ascending: true,
			},
			selected: 'parts',
		},
	},
	getters: {
		selected_parts (state, getters) {
			return state.parts_list[state.display.selected].records;
		},
		selected_schema (state, getters) {
			return state.parts_list[state.display.selected].schema;
		},
	},
	actions: {
	},
	mutations: {
		set_parts_list_name(state, name) {
			state.parts_list.name = name;
		},
		timestamp_parts_list (state, payload) {
			let timestamp = new Date();
			timestamp.setMilliseconds(0);
			state.parts_list.timestamp = timestamp.toISOString();
		},
		edit_part (state, payload) {
			payload.part[payload.field] = payload.value;
		},
		sort_parts_list_by (state, field) {
			if (state.display.current_sort.field === field) {
				state.display.current_sort.ascending = !state.display.current_sort.ascending;
			} else {
				state.display.current_sort.field = field;
				state.display.current_sort.ascending = true;
			};

			let selected_parts = state.parts_list[state.display.selected].records;

			switch (typeof(selected_parts[0][field])) {
			case 'number':
				selected_parts.sort((a, b) => {
					let invert = state.display.current_sort.ascending ? 1 : -1;
					return (a[field] - b[field]) * invert;
				});
				break;
			case 'string':
				selected_parts.sort((a, b) => {
					let invert = state.display.current_sort.ascending ? 1 : -1;
					return a[field].localeCompare(b[field]) * invert;
				});
				break;
			};
		},
		delete_part (state, payload) {
			let selected_parts = state.parts_list[state.display.selected].records;
			const idx = selected_parts.findIndex((part) => part['Name'] === payload);
			if (idx >= 0) {
				selected_parts.splice(idx, 1);
			};
		},
		add_part (state, payload) {
			state.parts_list[state.display.selected].records.push(payload)
		},
		reset_to_canon (state, payload) {
			state.parts_list = canon_parts_list;
		},
		set_parts_list (state, payload) {
			state.parts_list = payload;
		},
		toggle_filter (state, payload) {
			if (state.display.filter.types.includes(payload)) {
				state.display.filter.types = _.filter(state.display.filter.types, (elem) => !(elem === payload));
			} else {
				state.display.filter.types.push(payload);
			};
		},
	},
});

// create a root instance
new Vue({
	el: '#app',
	store,
 	render: h => h(PartBuilder),
});
