'use strict';

import CsvImporter from './csvimporter.vue';

import Promise from 'bluebird';
Promise.longStackTraces();

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		parts_list: {},
		design_json: {},
	},
	getters: {
	},
	actions: {
	},
	mutations: {
		set_parts_list(state, payload) {
			state.parts_list = payload;
		},
		set_design_json(state, payload) {
			state.design_json = payload;
		},
	},
});


// create a root instance
new Vue({
	el: '#app',
	render: h => h(CsvImporter),
	store,
});
