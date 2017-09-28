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

const PARTS_KEY = 'working_parts_list';
const MODULES_KEY = 'working_modules_list';
const FRAMES_KEY = 'working_frames_list';

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
		let design_json;
		let hash = new URL(location).hash;
		if (hash) {
			design_json = JSON.parse(decodeURI(hash.substring(1)));
		} else {
			design_json = design_json_init;
		};

		return {
			design_info: {
				data: design_json,
			},
			parts_info: {
				parts: canon_parts,
				modules: canon_modules,
				frames: canon_frames,
			},
		};
	},
	mounted () {
		this.load_parts_from_storage();
		window.addEventListener('storage', function(ev) {
			if (ev.key === PARTS_KEY) {
				this.load_parts_from_storage();
			};
		}.bind(this));
	},
	computed: {
		se_design () {
			return new ShipEngine.Design(this.se_db, this.design_info.data);
		},
		se_db () {
			return new ShipEngine.DB(this.parts_info);
		},
	},
	methods: {
		load_parts_from_storage () {
			const saved_parts = localStorage.getItem(PARTS_KEY);
			if (saved_parts) {
				this.parts_info.parts = JSON.parse(saved_parts);
			} else {
				localStorage.setItem(PARTS_KEY, JSON.stringify(this.parts_info.parts));
			};
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
