<template>
  <tr class="principal-frame-final">
	<td class="name-column" colspan="2">
	  <input v-model="ship_name" placeholder="Ship Name" class="name-column-input">
	</td>

	<td class="part-column">{{principal_frame}}</td>

	<template v-for="name in stats.names">
	  <StatlineCell :stats="stats" :name="name" :fixed="0"></StatlineCell>
	</template>
	
	<td class="weight-internal-column" colspan="2">{{se_design.weight_total}}</td>

	<td class="br-column">{{se_design.cost_BR}}</td>
	<td class="sr-column">{{se_design.cost_SR}}</td>

	<td class="power-cost-column"
		v-bind:title="power_final_title"
		v-bind:class="power_final_class">{{se_design.cost_power}}</td>
	<td class="power-gen-column"
		v-bind:title="power_final_title"
		v-bind:class="power_final_class">{{se_design.power_generation}}</td>

	<template v-for="name in crew.names">
	  <StatlineCell :stats="crew" :name="name" :fixed="0"></StatlineCell>
	</template>

	<td class="build-time-column">{{build_time}}</td>
  </tr>
</template>


<script>

import { mapState, mapGetters } from 'vuex';

import ShipEngine from '../lib/shipengine.js';

import StatlineCell from './statline-cell.vue';

import { frac } from './ui-functions.js';

export default {
	name: 'PrincipalFrame',
	components: {
		StatlineCell,
	},
	computed: {
		power_final_title () {
			if (this.has_power_error) {
				return 'Error: Power cost greater than power generation.';
			} else {
				return '';
			};
		},
		power_final_class () {
			return {
				['has-error']: this.has_power_error,
			};
		},
		has_power_error () {
			return this.$store.getters.se_design.cost_power > this.$store.getters.se_design.power_generation;
		},
		principal_frame () {
			return this.$store.getters.se_design.json['Principal Frame'];
		},
		stats () {
			return this.$store.getters.se_design.stats;
		},
		crew () {
			return this.$store.getters.se_design.cost_crew;
		},
		build_time () {
			return frac(this.$store.getters.se_design.build_time, 12, true);
		},
		ship_name: {
			get () {
				return this.$store.getters.se_design.json['Name'];
			},
			set (value) {
				this.$store.getters.se_design.json['Name'] = value;
			}
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
.build-time-column {
	text-align: center;
}

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
