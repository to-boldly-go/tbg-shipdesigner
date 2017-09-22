<template>

	<tr class="subsystem">
	  <td class="name-cell" colspan="2">{{se_subsystem.name}}</td>
	  <td class="part-cell"><select v-model="sub_frame" class="part-select">
		<option v-for="sub_frame_value in se_subsystem.valid_frames">{{sub_frame_value['Name']}}</option>
	  </select></td>

	  <template v-for="name in stats.names">
		<StatlineCell :stats="stats" :name="name"></StatlineCell>
	  </template>

	  <td class="weight-cell">{{se_subsystem.weight_internal.toFixed(2)}}</td>
	  <td class="br-cell">{{se_subsystem.cost_BR.toFixed(2)}}</td>
	  <td class="sr-cell">{{se_subsystem.cost_SR.toFixed(2)}}</td>
	  <td class="power-gen-cell">{{se_subsystem.power_generation.toFixed(2)}}</td>
	  <td class="power-cost-cell">{{se_subsystem.cost_power.toFixed(2)}}</td>

	  <template v-for="name in crew.names">
		<StatlineCell :stats="crew" :name="name"></StatlineCell>
	  </template>

	  <td class="build-time-cell">{{se_subsystem.build_time.toFixed(2)}}</td>
	</tr>


</template>


<script>

import ShipEngine from '../lib/shipengine.js';

import StatlineCell from './statline-cell.vue';

export default {
	name: 'Subsystem',
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
		sub_frame: {
			get () {
				return this.se_subsystem.sub_frame;
			},
			set (value) {
				this.se_subsystem.sub_frame = value;
			},
		},
	},
	methods: {
	},
}
</script>


<style>
.subsystem {
	background: #4af;
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
