'use strict';

import Vue from 'vue';
import PartBuilder from './partbuilder.vue';

import design_json from '../dist/design.json';
import canon_parts from '../dist/parts_C8.csv';
import canon_modules from '../dist/modules_C8.csv';
import canon_frames from '../dist/frames_C8.csv';

import Promise from 'bluebird';
import ShipEngine from '../lib/shipengine';
import ShipImporter from '../lib/shipimporter';

Promise.longStackTraces();

// create a root instance
new Vue({
	el: '#app',
 	render: h => h(PartBuilder),
});
