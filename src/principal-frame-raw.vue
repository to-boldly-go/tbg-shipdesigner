<template>
  <tr class="principal-frame-raw">
	<td class="name-column" colspan="2">Size: {{frame_size.toFixed(2)}}</td>

	<td class="part-column">
	  <select v-model="principal_frame" class="part-column-select">
		<option v-for="princ_frame_value in se_design.valid_frames">{{princ_frame_value['Name']}}</option>
	  </select>
	</td>

	<template v-for="name in stats_raw.names">
	  <StatlineCell :stats="stats_raw" :name="name"></StatlineCell>
	</template>
	
	<td class="weight-internal-column" v-bind:class="weight_summary_class">{{se_design.weight_internal.toFixed(2)}}</td>
	<td class="weight-external-column">{{se_design.weight_external.toFixed(2)}}</td>

	<td class="br-column">{{se_design.cost_BR_raw.toFixed(2)}}</td>
	<td class="sr-column">{{se_design.cost_SR_raw.toFixed(2)}}</td>

	<td class="power-cost-column">{{se_design.cost_power_raw.toFixed(2)}}</td>
	<td class="power-gen-column">{{se_design.power_generation_raw.toFixed(2)}}</td>

	<template v-for="name in crew_raw.names">
	  <StatlineCell :stats="crew_raw" :name="name"></StatlineCell>
	</template>

	<td class="build-time-column">{{build_time_frame}}</td>

	<td class="tech-year-column">{{tech_year_frame}} (Frame)</td>
  </tr>
</template>


<script>

import { mapState, mapGetters } from 'vuex';

import * as ShipEngine from '../lib/shipengine.js';

import StatlineCell from './statline-cell.vue';

import { frac } from './ui-functions.js';

export default {
	name: 'PrincipalFrameRaw',
	components: {
		StatlineCell,
	},
	computed: {
		weight_summary_class () {
			return {
				['has-error']: this.has_weight_error,
			};
		},
		has_weight_error () {
			return this.$store.getters.se_design.weight_internal > this.$store.getters.se_design.frame_max_size_raw;
		},
		principal_frame: {
			get () {
				return this.$store.getters.se_design.json['Principal Frame'];
			},
			set (value) {
				this.$store.getters.se_design.json['Principal Frame'] = value;
			},
		},
		stats_raw () {
			return this.$store.getters.se_design.stats_raw;
		},
		crew_raw () {
			return this.$store.getters.se_design.cost_crew_raw;
		},
		build_time_frame () {
			return frac(this.$store.getters.se_design.build_time_frame, 12);
		},
		tech_year_frame () {
			return this.$store.getters.se_design.tech_year_frame;
		},
		frame_size () {
			return this.$store.getters.se_design.frame_size;
		},
		...mapGetters([
			'se_design',
		]),
	},
	methods: {
	},
}
</script>


<style>
</style>

<style scoped>
.principal-frame-raw {
	background: #111;
	color: #fff;

	width: 100%;
	margin: 0px;

	/* position: relative; */
	/* left: 2px; */
	/* top: 2px; */
}

.name-column {
	text-align: right;
	padding-right: 0.2em;
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
