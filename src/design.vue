<template>
  <div class="design">
	<PrincipalFrame :se_db="se_db" :se_design="se_design"></PrincipalFrame>
	<div v-for="se_subsystem in se_subsystems">
	  <Subsystem :se_db="se_db" :se_subsystem="se_subsystem"></Subsystem>
	</div>
  </div>
</template>


<script>

import ShipEngine from '../lib/shipengine.js';

import PrincipalFrame from './principal-frame.vue';
import Subsystem from './subsystem.vue';

export default {
	name: 'Design',
	components: {
		PrincipalFrame,
		Subsystem,
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
.design-summary {
	background-color: #29d;
	border: 2px solid #07a;
	width: 100%;
	margin: 0px;
	box-sizing: border-box;
	left: 5px;
	top: 5px;
}
</style>
