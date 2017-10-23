<template>
  <div class="design-summary">
	<div>{{se_design.name}} | {{se_design.pretty_miscstats}}</div>
	<div>{{se_design.stats_raw.toFixed(2)}} | [{{se_design.cost_BR_raw.toFixed(2)}}]br [{{se_design.cost_SR_raw.toFixed(2)}}]sr | {{se_design.cost_crew_raw.toFixed(2)}} | [{{build_time}}]years</div>
	<div>
	  <span
		class="design-power-summary"
		v-bind:class="{['has-error']: se_design.cost_power > se_design.power_generation}"
		>Power[{{se_design.cost_power_raw.toFixed(2)}}/{{se_design.power_generation_raw.toFixed(2)}}]</span>
	  <span
		class="design-weight-summary"
		v-bind:class="{['has-error']: se_design.weight_internal > se_design.frame_max_size_raw}"
		>Internal[{{se_design.weight_internal.toFixed(2)}}/{{se_design.frame_max_size_raw.toFixed(2)}}]</span>
	  <span
		class="subsystem-weight-summary"
		v-for="ss in se_design.subsystems"
		v-bind:class="{['has-error']: ss.weight_internal > ss.weight_cap}"
		>{{ss.name}}[{{ss.weight_internal.toFixed(2)}}/{{ss.weight_cap.toFixed(2)}}] </span>
	</div>
  </div>
</template>


<script>

import { mapState, mapGetters } from 'vuex';

import ShipEngine from '../lib/shipengine.js';

import { frac } from './ui-functions.js';

export default {
	name: 'DesignSummary',
	computed: {
		build_time () {
			return frac(this.$store.getters.se_design.build_time, 12);
		},
		...mapGetters([
			'se_design',
		]),
	},
	methods: {
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
