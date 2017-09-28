'use strict';

import Vue from 'vue';
import ShipDesigner from './shipdesigner.vue';

import Promise from 'bluebird';
Promise.longStackTraces();

// create a root instance
new Vue({
	el: '#app',
 	render: h => h(ShipDesigner),
});
