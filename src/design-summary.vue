<template>
  <div class="design-summary">
	<div>
	  <span>{{se_design.name}} | {{is_valid_frame ? se_design.pretty_miscstats : '?'}}</span>
	  <span> | </span>
	  <span
		:class="{'has-error': has_parts_list_load_error}"
		:title="parts_list_load_title">Parts: {{parts_list_name}}</span>
	  <span
		v-if="has_parts_list_load_error"
		:class="{'has-error': has_parts_list_load_error}"> (WRONG PARTS LIST! EVERYTHING MAY BE INVALID!)</span>
	</div>

	<div>
	  <span>{{is_valid_frame ? se_design.stats_raw.toFixed(2) : '?'}}</span>
	  <span> | </span>
	  <span>[{{is_valid_frame ? se_design.cost_BR_raw.toFixed(2) : '?'}}]br</span>
	  <span>[{{is_valid_frame ? se_design.cost_SR_raw.toFixed(2) : '?'}}]sr</span>
	  <span> | </span>
	  <span>{{is_valid_frame ? se_design.cost_crew_raw.toFixed(2) : '?'}}</span>
	  <span> | </span>
	  <span>[{{build_time}}]years</span>
	</div>
	<div>
	  <span
		class="design-power-summary"
		:class="{'has-error': !is_valid_frame || se_design.cost_power > se_design.power_generation}"
		>Power[{{is_valid_frame ? se_design.cost_power_raw.toFixed(2) : '?'}}/{{is_valid_frame ? se_design.power_generation_raw.toFixed(2) : '?'}}]</span>
	  <span
		class="design-weight-summary"
		:class="{'has-error': !is_valid_frame || se_design.weight_internal > se_design.frame_max_size_raw}"
		>Internal[{{is_valid_frame ? se_design.weight_internal.toFixed(2) : '?'}}/{{is_valid_frame ? se_design.frame_max_size_raw.toFixed(2) : '?'}}]</span>
	  <span
		class="subsystem-weight-summary"
		v-for="ss in se_design.subsystems"
		:key="ss.name"
		:class="{'has-error': !is_valid_frame || !ss.is_loaded || ss.weight_internal > ss.weight_cap}"
		>{{ss.name}}[{{is_valid_frame && ss.is_loaded ? ss.weight_internal.toFixed(2) : '?'}}/{{is_valid_frame && ss.is_loaded ? ss.weight_cap.toFixed(2) : '?'}}] </span>
	</div>
  </div>
</template>


<script>

import { mapState, mapGetters } from 'vuex';

import * as ShipEngine from '../lib/shipengine.js';

import { frac } from './ui-functions.js';

export default {
	name: 'DesignSummary',
	computed: {
		is_valid_frame () {
			return !!this.se_design.princ_frame_def;
		},
		parts_list_name () {
			return this.se_design.parts_list_pretty_name;
		},
		parts_list_load_title () {
			if (this.has_parts_list_load_error) {
				return "Could not find this parts list";
			} else {
				return null;
			};
		},
		has_parts_list_load_error () {
			return !this.se_design.matches_parts_list(this.se_db);
		},
		build_time () {
			return this.is_valid_frame ? frac(this.$store.getters.se_design.build_time, 12) : "?";
		},
		...mapGetters([
			'se_design',
			'se_db',
		]),
	},
	methods: {
		parts_list_save_name (pl) {
			return pl.name + ' (' + (new Date(pl.timestamp).toLocaleString()) + ')';
		},
	},
}
</script>


<style scoped>
.design-summary {
	background-color: #999;

	width: 100%;
	margin: 0px;

	left: 5px;
	top: 5px;
}

.has-error {
	color: #f11;
	font-weight: bold;
}

.design-weight-summary {
	margin-left: 5px;
}

.design-power-summary {
}

.subsystem-weight-summary {
	margin-left: 5px;
}

</style>
