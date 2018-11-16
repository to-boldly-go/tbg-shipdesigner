'use strict';

import _ from 'lodash';

import Vue from 'vue';
import Vuex from 'vuex';
import PartBuilder from '@/components/partbuilder/partbuilder.vue';

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
					..._(canon_parts_list.modules.records)
						.map(part => part['Type'])
						.uniq(),
					_(canon_parts_list.parts.records).minBy(part => part['Type Sort'])[
						'Type'
					],
					_(canon_parts_list.frames.records).minBy(part => part['Type Sort'])[
						'Type'
					],
				],
			},
			current_sort: {
				field: null,
				ascending: true,
			},
			selected: 'parts',
		},
	},
	getters: {
		selected_parts(state, getters) {
			return state.parts_list[state.display.selected].records;
		},
		selected_schema(state, getters) {
			return state.parts_list[state.display.selected].schema;
		},
		find_part_index(state, getters) {
			return ({ Type: type, Name: name, Variant: variant }) => {
				const selected_parts = state.parts_list[state.display.selected].records;
				return selected_parts.findIndex(
					part =>
						part['Type'] === type &&
						part['Name'] === name &&
						part['Variant'] === variant
				);
			};
		},
		has_duplicate_parts(state, getters) {
			return ({ Type: type, Name: name, Variant: variant }) => {
				const selected_parts = state.parts_list[state.display.selected].records;
				return (
					selected_parts.filter(
						part =>
							part['Type'] === type &&
							part['Name'] === name &&
							part['Variant'] === variant
					).length > 1
				);
			};
		},
	},
	actions: {},
	mutations: {
		set_parts_list_name(state, name) {
			state.parts_list.name = name;
		},
		timestamp_parts_list(state, payload) {
			const timestamp = new Date();
			timestamp.setMilliseconds(0);
			state.parts_list.timestamp = timestamp.toISOString();
		},
		edit_part(state, payload) {
			Vue.set(payload.part, payload.field, payload.value);
		},
		sort_parts_list_by(state, field) {
			if (state.display.current_sort.field === field) {
				state.display.current_sort.ascending = !state.display.current_sort
					.ascending;
			} else {
				state.display.current_sort.field = field;
				state.display.current_sort.ascending = true;
			}

			// Note: using _.orderBy rather than default .sort for both convenience
			// and the fact that _.orderBy is a stable sort.
			let selected_category = state.parts_list[state.display.selected];
			selected_category.records = _.orderBy(
				selected_category.records,
				[part => part[field]],
				[state.display.current_sort.ascending ? 'asc' : 'desc']
			);
		},
		delete_part(state, { index }) {
			if (index >= 0) {
				state.parts_list[state.display.selected].records.splice(index, 1);
			}
		},
		add_part(state, { index, new_part }) {
			if (index >= 0) {
				state.parts_list[state.display.selected].records.splice(
					index,
					0,
					new_part
				);
			}
		},
		reset_to_canon(state, payload) {
			state.parts_list = canon_parts_list;
		},
		set_parts_list(state, payload) {
			state.parts_list = payload;
		},
		toggle_filter(state, payload) {
			if (state.display.filter.types.includes(payload)) {
				state.display.filter.types = _.filter(
					state.display.filter.types,
					elem => !(elem === payload)
				);
			} else {
				state.display.filter.types.push(payload);
			}
		},
	},
});

// create a root instance
new Vue({
	el: '#app',
	store,
	render: h => h(PartBuilder),
});
