<template>
  <tr class="principal-frame-raw">
	<td><input v-model="ship_name" placeholder="Ship Name"></td>

	<td></td>
	<td><select v-model="principal_frame" class="frame-select">
	  <option v-for="princ_frame_value in se_design.valid_frames">{{princ_frame_value['Name']}}</option>
	</select></td>

	<template v-for="name in stats_raw.names">
	  <StatlineCell :stats="stats_raw" :name="name"></StatlineCell>
	</template>
	
	<td class="weight-cell">{{se_design.weight_internal.toFixed(2)}}</td>
	<td class="weight-cell">{{se_design.weight_external.toFixed(2)}}</td>

	<td class="br-cell">{{se_design.cost_BR_raw.toFixed(2)}}</td>
	<td class="sr-cell">{{se_design.cost_SR_raw.toFixed(2)}}</td>
	<td class="power-gen-cell">{{se_design.power_generation_raw.toFixed(2)}}</td>
	<td class="power-cost-cell">{{se_design.cost_power_raw.toFixed(2)}}</td>

	<template v-for="name in crew_raw.names">
	  <StatlineCell :stats="crew_raw" :name="name"></StatlineCell>
	</template>

	<td class="build-time-cell"></td>
  </tr>
</template>


<script>

import ShipEngine from '../lib/shipengine.js';

import StatlineCell from './statline-cell.vue';

export default {
	name: 'PrincipalFrameRaw',
	components: {
		StatlineCell,
	},
	props: {
		se_db: Object,
		se_design: Object,
	},
	computed: {
		principal_frame: {
			get () {
				return this.se_design.json['Principal Frame'];
			},
			set (value) {
				this.se_design.json['Principal Frame'] = value;
			},
		},
		stats_raw () {
			return this.se_design.stats_raw;
		},
		crew_raw () {
			return this.se_design.cost_crew_raw;
		},
		ship_name: {
			get () {
				return this.se_design.json['Name'];
			},
			set (value) {
				this.se_design.json['Name'] = value;
			}
		},
	},
	methods: {
	},
}
</script>


<style>
.principal-frame-raw {
	background: #111;
	color: #fff;

	width: 100%;
	margin: 0px;

	/* position: relative; */
	/* left: 2px; */
	/* top: 2px; */
}

.frame-select {
	width: 100%;
}
</style>
