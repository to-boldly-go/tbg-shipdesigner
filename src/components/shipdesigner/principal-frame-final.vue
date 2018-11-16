<template>
	<tr class="principal-frame-final">
		<td class="name-column" colspan="2">
			<input v-model="ship_name" placeholder="Ship Name" class="name-column-input">
		</td>

		<td class="part-column">{{principal_frame}}</td>

		<template v-for="name in stats.names">
			<StatlineCell :key="name" :stats="stats" :name="name" :fixed="0"></StatlineCell>
		</template>
		
		<td class="weight-internal-column" colspan="2">{{se_design.weight_total}}</td>

		<td class="br-column">{{se_design.cost_BR}}</td>
		<td class="sr-column">{{se_design.cost_SR}}</td>

		<template v-if="se_design.refit_valid">
			<td class="br-column">{{se_design.refit_cost_BR}}</td>
			<td class="sr-column">{{se_design.refit_cost_SR}}</td>
		</template>

		<td class="power-cost-column"
			:title="power_final_title"
			:class="power_final_class">{{se_design.cost_power}}</td>
		<td class="power-gen-column"
			:title="power_final_title"
			:class="power_final_class">{{se_design.power_generation}}</td>

		<template v-for="name in crew.names">
			<StatlineCell :key="name" :stats="crew" :name="name" :fixed="0"></StatlineCell>
		</template>

		<td class="build-time-column">{{build_time}}</td>

		<td class="tech-year-column">{{tech_year}}</td>
	</tr>
</template>


<script>
import { mapGetters } from 'vuex';

import StatlineCell from '@/components/shipdesigner/statline-cell.vue';

import { frac } from '@/lib/ui-functions';

export default {
	name: 'PrincipalFrame',
	components: {
		StatlineCell,
	},
	computed: {
		power_final_title() {
			if (this.has_power_error) {
				return 'Error: Power cost greater than power generation.';
			} else {
				return '';
			}
		},
		power_final_class() {
			return {
				'has-error': this.has_power_error,
			};
		},
		has_power_error() {
			return (
				!this.se_design.omit_validation &&
				this.se_design.cost_power_raw > this.se_design.power_generation_raw
			);
		},
		principal_frame() {
			return this.se_design.principal_frame;
		},
		stats() {
			return this.se_design.stats;
		},
		crew() {
			return this.se_design.cost_crew;
		},
		build_time() {
			return frac(this.se_design.build_time, 12, true);
		},
		tech_year() {
			return this.se_design.tech_year_max;
		},
		ship_name: {
			get() {
				return this.se_design.json['Name'];
			},
			set(value) {
				this.$store.commit('set_design_name', value);
			},
		},
		...mapGetters(['se_design']),
	},
	methods: {},
};
</script>


<style scoped>
.principal-frame-final {
	background: #111;
	color: #fff;

	font-weight: bold;

	width: 100%;
	margin: 0px;

	text-align: center;
}

.name-column-input {
	color: white;
	background: black;
	font-weight: bold;
	width: 100%;
	border-style: none;
	text-align: center;
}

/* override global value for this one */
.stat-column {
	text-align: center;
}

.weight-internal-column {
	text-align: center;
}

.weight-external-column {
	text-align: center;
}

.br-column {
	text-align: center;
}

.sr-column {
	text-align: center;
}

.power-gen-column {
	text-align: center;
}

.power-cost-column {
	text-align: center;
}

.has-error {
	background: #d60000;
}
</style>
