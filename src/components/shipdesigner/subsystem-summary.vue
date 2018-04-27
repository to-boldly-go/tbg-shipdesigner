<template>

	<tr class="subsystem-summary">
		<td class="name-column"
			:class="weight_summary_class"
			colspan="2">{{se_subsystem.weight_internal.toFixed(2)}}/{{se_subsystem.weight_cap.toFixed(2)}}</td>

		<td class="part-column"></td>

		<template v-for="name in stats.names">
			<StatlineCell :key="name" :stats="stats" :name="name"></StatlineCell>
		</template>

		<td class="weight-internal-column" :class="weight_summary_class">{{se_subsystem.weight_internal.toFixed(2)}}</td>
		<td class="weight-external-column">{{se_subsystem.weight_external.toFixed(2)}}</td>

		<td class="br-column">{{se_subsystem.cost_BR.toFixed(2)}}</td>
		<td class="sr-column">{{se_subsystem.cost_SR.toFixed(2)}}</td>

		<template v-if="se_subsystem.refit_valid">
			<td class="br-column">{{se_subsystem.refit_cost_BR.toFixed(2)}}</td>
			<td class="sr-column">{{se_subsystem.refit_cost_SR.toFixed(2)}}</td>
		</template>

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

import StatlineCell from '@/components/shipdesigner/statline-cell.vue';

import { frac } from '@/lib/ui-functions.js';

export default {
	name: 'SubsystemSummary',
	components: {
		StatlineCell,
	},
	props: {
		se_subsystem: Object,
	},
	computed: {
		weight_summary_class() {
			return {
				'has-error': this.has_weight_error,
			};
		},
		has_weight_error() {
			return !this.se_subsystem.compare_base && this.se_subsystem.weight_internal > this.se_subsystem.weight_cap;
		},
		se_components() {
			return this.se_subsystem.components;
		},
		stats() {
			return this.se_subsystem.stats;
		},
		crew() {
			return this.se_subsystem.cost_crew;
		},
		build_time() {
			return frac(this.se_subsystem.build_time, 12);
		},
		tech_year() {
			return this.se_subsystem.tech_year_max;
		},
	},
	methods: {
	},
};
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
