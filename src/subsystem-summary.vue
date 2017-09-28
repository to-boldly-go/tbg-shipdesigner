<template>

  <tr class="subsystem-summary">
	<td class="name-column"
		v-bind:class="weight_summary_class"
		colspan="2">{{se_subsystem.weight_internal.toFixed(2)}}/{{se_subsystem.weight_cap.toFixed(2)}}</td>

	<td class="part-column"></td>

	<template v-for="name in stats.names">
	  <StatlineCell :stats="stats" :name="name"></StatlineCell>
	</template>

	<td class="weight-internal-column" v-bind:class="weight_summary_class">{{se_subsystem.weight_internal.toFixed(2)}}</td>
	<td class="weight-external-column">{{se_subsystem.weight_external.toFixed(2)}}</td>

	<td class="br-column">{{se_subsystem.cost_BR.toFixed(2)}}</td>
	<td class="sr-column">{{se_subsystem.cost_SR.toFixed(2)}}</td>

	<td class="power-cost-column">{{se_subsystem.cost_power.toFixed(2)}}</td>
	<td class="power-gen-column">{{se_subsystem.power_generation.toFixed(2)}}</td>

	<template v-for="name in crew.names">
	  <StatlineCell :stats="crew" :name="name"></StatlineCell>
	</template>

	<td class="build-cost-column"></td>
  </tr>

</template>


<script>

import ShipEngine from '../lib/shipengine.js';

import StatlineCell from './statline-cell.vue';

export default {
	name: 'SubsystemSummary',
	components: {
		StatlineCell,
	},
	props: {
		se_db: Object,
		se_subsystem: Object,
	},
	computed: {
		weight_summary_class () {
			return {
				['has-error']: this.has_weight_error,
			};
		},
		has_weight_error () {
			return this.se_subsystem.weight_internal > this.se_subsystem.weight_cap;
		},
		se_components () {
			return this.se_subsystem.components;
		},
		stats() {
			return this.se_subsystem.stats;
		},
		crew() {
			return this.se_subsystem.cost_crew;
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
