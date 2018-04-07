<template>

  <tr class="subsystem-frame" v-bind:class="{ 'has-error': !is_valid_frame }">
	<td class="name-column" colspan="2">{{se_subsystem.name}}</td>

	<td class="part-column">
	  <select v-model="sub_frame" class="part-column-select">
		<option v-for="sub_frame_value in se_subsystem.valid_frames" :key="sub_frame_value['Name']">{{sub_frame_value['Name']}}</option>
		<option v-if="!is_valid_frame" class="has-error">{{sub_frame}}</option>
	  </select>
	</td>

	<template v-for="name in stats.names">
	  <td :key="name" class="stat-column">{{stats_multiplier_pretty}}</td>
	</template>

	<td class="weight-internal-column" colspan="2">{{is_valid_frame ? se_subsystem.weight_cap.toFixed(2) : '?'}}</td>

	<td class="br-column">{{is_valid_frame ? se_subsystem.cost_BR_frame.toFixed(2) : '?'}}</td>
	<td class="sr-column">{{is_valid_frame ? se_subsystem.cost_SR_mult.toFixed(2) : '?'}}x</td>

	<td class="power-cost-column"></td>
	<td class="power-gen-column"></td>

	<template v-for="name in crew.names">
	  <StatlineCell :key="name" :stats="crew_mult_pretty" :name="name" :ispretty="false"></StatlineCell>
	</template>

	<td class="build-time-column">{{build_time}}</td>

	<td class="tech-year-column">{{tech_year}} (Frame)</td>
  </tr>


</template>


<script>

import { mapState, mapGetters } from 'vuex';

import * as ShipEngine from '../lib/shipengine.js';

import StatlineCell from './statline-cell.vue';

import { frac } from './ui-functions.js';

export default {
	name: 'SubsystemFrame',
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
		valid_frames () {
			return this.se_subsystem.valid_frames;
		},
		se_components () {
			return this.se_subsystem.components;
		},
		stats() {
			return this.se_subsystem.stats;
		},
		stats_multiplier_pretty() {
			return this.is_valid_frame ? this.se_subsystem.stats_multiplier.toFixed(2) + 'x' : '?';
		},
		crew() {
			return this.is_valid_frame ? this.se_subsystem.cost_crew : new ShipEngine.Crewline(0);
		},
		crew_mult_pretty() {
			return this.is_valid_frame ? this.se_subsystem.cost_crew_frame_mult.apply((val) => val.toFixed(2) + 'x') : new ShipEngine.Crewline(0).apply(val => '?');
		},
		build_time () {
			return this.is_valid_frame ? frac(this.se_subsystem.build_time, 12) : '?';
		},
		tech_year () {
			return this.is_valid_frame ? this.se_subsystem.tech_year_frame : '?';
		},
		sub_frame: {
			get () {
				return this.se_subsystem.sub_frame;
			},
			set (value) {
				this.$store.commit('set_subsystem_frame', {
					value: value,
					subsystem: this.se_subsystem,
				});
			},
		},
	},
	methods: {
	},
}
</script>


<style>

</style>


<style scoped>
.subsystem-frame {
	background: #ccc;
}

.has-error {
	background: #faa;
}
</style>
