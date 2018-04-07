<template>

  <tr class="subsystem-summary">
	<td class="name-column"
		:class="weight_summary_class"
		colspan="2">{{is_valid_frame ? se_subsystem.weight_internal.toFixed(2) : '?'}}/{{is_valid_frame ? se_subsystem.weight_cap.toFixed(2) : '?'}}</td>

	<td class="part-column"></td>

	<template v-for="name in stats.names">
	  <StatlineCell :key="name" :stats="stats" :name="name"></StatlineCell>
	</template>

	<td class="weight-internal-column" :class="weight_summary_class">{{is_valid_frame ? se_subsystem.weight_internal.toFixed(2) : '?'}}</td>
	<td class="weight-external-column">{{se_subsystem.weight_external.toFixed(2)}}</td>

	<td class="br-column">{{is_valid_frame ? se_subsystem.cost_BR.toFixed(2) : '?'}}</td>
	<td class="sr-column">{{is_valid_frame ? se_subsystem.cost_SR.toFixed(2) : '?'}}</td>

	<td class="power-cost-column">{{se_subsystem.cost_power.toFixed(2)}}</td>
	<td class="power-gen-column">{{se_subsystem.power_generation.toFixed(2)}}</td>

	<template v-for="name in crew.names">
	  <StatlineCell :key="name" :stats="crew" :name="name"></StatlineCell>
	</template>

	<td class="build-time-column">{{build_time}}</td>

	<td class="tech-year-column">{{tech_year}}</td>
  </tr>

</template>


<script>

import { mapState, mapGetters } from 'vuex';

import * as ShipEngine from '../lib/shipengine.js';

import StatlineCell from './statline-cell.vue';

import { frac } from './ui-functions.js';

export default {
	name: 'SubsystemSummary',
	components: {
		StatlineCell,
	},
	props: {
		se_subsystem: Object,
	},
	computed: {
		is_valid_frame () {
			return this.se_subsystem.is_valid_frame;
		},
		weight_summary_class () {
			return {
				'has-error': this.has_weight_error,
			};
		},
		has_weight_error () {
			return !this.is_valid_frame || this.se_subsystem.weight_internal > this.se_subsystem.weight_cap;
		},
		se_components () {
			return this.se_subsystem.components;
		},
		stats() {
			return this.se_subsystem.stats;
		},
		crew() {
			return this.is_valid_frame ? this.se_subsystem.cost_crew : new ShipEngine.Crewline(0);
		},
		build_time () {
			return this.is_valid_frame ? frac(this.se_subsystem.build_time, 12) : '?';
		},
		tech_year () {
			return this.is_valid_frame ? this.se_subsystem.tech_year_max : '?';
		},
	},
	methods: {
	},
}
</script>


<style scoped>
.subsystem-summary {
	background: #ccc;
	border-style: none;
}

.name-cell {
	border-style: none;
}

.part-cell {
	border-style: none;
}

.part-select {
	width: 100%;
}

.has-error {
	background: #faa;
}
</style>

<style>

</style>
