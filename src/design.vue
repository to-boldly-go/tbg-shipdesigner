<template>
  <div class="design-table">
	<PrincipalFrame :se_db="se_db" :se_design="se_design"></PrincipalFrame>
	<table>
	  <thead>
		<tr>
		  <th></th>
		  <th></th>
		  <th></th>
		  <th>C</th>
		  <th>S</th>
		  <th>H</th>
		  <th>L</th>
		  <th>P</th>
		  <th>D</th>
		  <th>Weight</th>
		  <th>BR Cost</th>
		  <th>SR Cost</th>
		  <th>Pwr Gen</th>
		  <th>Pwr Cost</th>
		  <th>O</th>
		  <th>E</th>
		  <th>T</th>
		  <th>Build Time</th>
		</tr>
	  </thead>
	  <tbody>
		<template v-for="se_subsystem in se_subsystems">
		  <Subsystem :se_db="se_db" :se_subsystem="se_subsystem"></Subsystem>

		  <template v-for="se_component in se_subsystem.components">
			<ComponentTr :se_db="se_db" :se_component="se_component"></ComponentTr>
		  </template>
		</template>
	  </tbody>
	</table>
  </div>
</template>


<script>

import ShipEngine from '../lib/shipengine.js';

import PrincipalFrame from './principal-frame.vue';
import Subsystem from './subsystem.vue';
import ComponentTr from './component.vue';

export default {
	name: 'Design',
	components: {
		PrincipalFrame,
		Subsystem,
		ComponentTr,
	},
	props: {
		se_db: Object,
		se_design: Object,
	},
	computed: {
		se_subsystems () {
			return this.se_design.subsystems;
		},
	},
	methods: {
	},
}
</script>


<style>
.design-table {
	background-color: #29e;
	border-style: none;

	width: 100%;
	margin: 0px;

	left: 5px;
	top: 5px;
}
</style>
