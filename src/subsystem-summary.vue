<template>

  <tr class="subsystem-summary">
	<td class="name-cell" colspan="2">{{se_subsystem.weight_internal.toFixed(2)}}/{{se_subsystem.weight_cap.toFixed(2)}}</td>
	<td class="part-cell"></td>

	<template v-for="name in stats.names">
	  <StatlineCell :stats="stats" :name="name"></StatlineCell>
	</template>

	<td class="weight-cell">{{se_subsystem.weight_internal.toFixed(2)}}</td>
	<td class="weight-cell">{{se_subsystem.weight_external.toFixed(2)}}</td>

	<td class="br-cell">{{se_subsystem.cost_BR.toFixed(2)}}</td>
	<td class="sr-cell">{{se_subsystem.cost_SR.toFixed(2)}}</td>
	<td class="power-gen-cell">{{se_subsystem.power_generation.toFixed(2)}}</td>
	<td class="power-cost-cell">{{se_subsystem.cost_power.toFixed(2)}}</td>

	<template v-for="name in crew.names">
	  <StatlineCell :stats="crew" :name="name"></StatlineCell>
	</template>

	<td></td>
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


<style>
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
</style>
