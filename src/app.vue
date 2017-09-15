<template>
  <div @click="swap_design">
	<DesignSummary :se_db="this.se_db" :design_json="this.design_json"></DesignSummary>
  </div>
</template>


<script>

import DesignSummary from './design-summary.vue';
import ShipEngine from '../lib/shipengine.js';
import ShipImporter from '../lib/shipimporter';

import design_json_init from '../dist/design.json';
import design_csv_init from '../dist/swb_kepler_recreations.raw.csv';
import canon_parts from '../dist/parts_C8.csv';
import canon_modules from '../dist/modules_C8.csv';
import canon_frames from '../dist/frames_C8.csv';

const se_db = new ShipEngine.DB({
	parts: canon_parts,
	frames: canon_frames,
	modules: canon_modules,
});

export default {
	name: 'app',
	components: {
		DesignSummary,
	},
	data () {
		return {
			design_json: design_json_init,
			se_db: se_db,
		};
	},
	computed: {
		se_design () {
			return new ShipEngine.Design(se_db, this.data.design_json);
		},
	},
	methods: {
		swap_design () {
			this.design_json = ShipImporter.import_design(design_csv_init);
			// this.design_json['Name'] = 'Foo!';
			// this.design_json['Subsystems'][4]['Settings']['Phaser Arrays'] = !this.design_json['Subsystems'][4]['Settings']['Phaser Arrays']
			;
		},
	},
};

</script>


<style>

</style>
