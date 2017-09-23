<template>
  <tr class="principal-frame-final">
	<td class="name-column" colspan="2">{{ship_name}}</td>

	<td class="part-column">{{principal_frame}}</td>

	<template v-for="name in stats.names">
	  <StatlineCell :stats="stats" :name="name" :fixed="0"></StatlineCell>
	</template>
	
	<td class="weight-internal-column" colspan="2">{{se_design.weight_total}}</td>

	<td class="br-column">{{se_design.cost_BR}}</td>
	<td class="sr-column">{{se_design.cost_SR}}</td>

	<td class="power-cost-column">{{se_design.cost_power}}</td>
	<td class="power-gen-column">{{se_design.power_generation}}</td>

	<template v-for="name in crew.names">
	  <StatlineCell :stats="crew" :name="name" :fixed="0"></StatlineCell>
	</template>

	<td class="build-time-column">{{build_time}}</td>
  </tr>
</template>


<script>

import ShipEngine from '../lib/shipengine.js';

import StatlineCell from './statline-cell.vue';

import { frac } from './ui-functions.js';

export default {
	name: 'PrincipalFrame',
	components: {
		StatlineCell,
	},
	props: {
		se_db: Object,
		se_design: Object,
	},
	computed: {
		principal_frame () {
			return this.se_design.json['Principal Frame'];
		},
		stats () {
			return this.se_design.stats;
		},
		crew () {
			return this.se_design.cost_crew;
		},
		build_time () {
			return frac(this.se_design.build_time, 12, true);
		},
		ship_name () {
			return this.se_design.json['Name'];
		},
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

	/* position: relative; */
	/* left: 2px; */
	/* top: 2px; */
}
</style>
