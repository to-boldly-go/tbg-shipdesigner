<template>
  <div class="root">
	<div class="header">
	  <DesignSummary :se_db="se_db" :se_design="se_design"></DesignSummary>
	</div>
	<div class="design">
	  <Design :se_db="se_db" :se_design="se_design"></Design>
	</div>
	<div class="footer">
	  <DesignImportExport :se_db="se_db" :design_info="design_info"></DesignImportExport>
	</div>
  </div>
</template>


<script>

import ShipEngine from '../lib/shipengine.js';
import ShipImporter from '../lib/shipimporter';

import design_json_init from '../dist/swb_kepler_recreation.json';
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

.root {
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
}

.header {
	flex: 0 0 auto;
	border-bottom: 2px solid;
}

.design {
	flex: 1 1 auto;
	position: relative;/* need this to position inner content */
	overflow-y: auto;
}

.footer {
	flex: 0 0 auto;
	border-top: 2px solid;
}

</style>
