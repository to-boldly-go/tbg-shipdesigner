<template>
  <tr class="principal-frame-final">
	<td class="design-name-cell">{{ship_name}}</td>

	<td></td>
	<td>{{principal_frame}}</td>

	<template v-for="name in stats.names">
	  <StatlineCell :stats="stats" :name="name" :fixed="0"></StatlineCell>
	</template>
	
	<td class="weight-cell" colspan="2">{{se_design.weight_total}}</td>

	<td class="br-cell">{{se_design.cost_BR}}</td>
	<td class="sr-cell">{{se_design.cost_SR}}</td>
	<td class="power-gen-cell">{{se_design.power_generation}}</td>
	<td class="power-cost-cell">{{se_design.cost_power}}</td>

	<template v-for="name in crew.names">
	  <StatlineCell :stats="crew" :name="name" :fixed="0"></StatlineCell>
	</template>

	<td class="build-time-cell"></td>
  </tr>
</template>


<script>

import ShipEngine from '../lib/shipengine.js';

import StatlineCell from './statline-cell.vue';

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
		ship_name () {
			return this.se_design.json['Name'];
		},
	},
	methods: {
	},
}
</script>


<style>
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

.frame-select {
	width: 100%;
}
</style>
