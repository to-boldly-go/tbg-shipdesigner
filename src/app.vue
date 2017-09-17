<template>
  <div>
	<DesignSummary :se_db="se_db" :se_design="se_design"></DesignSummary>
	<Design :se_db="se_db" :se_design="se_design"></Design>
	<DesignImportExport :design_info="design_info"></DesignImportExport>
  </div>
</template>


<script>

import ShipEngine from '../lib/shipengine.js';
import ShipImporter from '../lib/shipimporter';

import design_json_init from '../dist/design.json';
import design_csv_init from '../dist/swb_kepler_recreations.raw.csv';
import canon_parts from '../dist/parts_C8.csv';
import canon_modules from '../dist/modules_C8.csv';
import canon_frames from '../dist/frames_C8.csv';

import DesignSummary from './design-summary.vue';
import Design from './design.vue';
import DesignImportExport from './design-import-export.vue';

const se_db = new ShipEngine.DB({
	parts: canon_parts,
	frames: canon_frames,
	modules: canon_modules,
});

export default {
	name: 'app',
	components: {
		DesignSummary,
		Design,
		DesignImportExport,
	},
	data () {
		return {
			design_info: { data: design_json_init },
			se_db: se_db,
		};
	},
	computed: {
		se_design () {
			return new ShipEngine.Design(se_db, this.design_info.data);
		},
	},
};

</script>


<style>

</style>
