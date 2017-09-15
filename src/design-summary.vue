<template>
  <div class="design-summary">
	<div>{{se_design.name}}</div>
	<div>{{se_design.pretty_statline}}</div>
	<div>{{se_design.pretty_miscstats}}</div>
	<div>{{se_design.pretty_statline_raw}}</div>
	<div>{{se_design.pretty_buildinfo}}</div>
  </div>
</template>


<script>

import ShipEngine from '../lib/shipengine.js';

export default {
	name: 'DesignSummary',
	props: {
		se_db: Object,
		design_json: Object,
	},
	computed: {
		se_design () {
			return new ShipEngine.Design(this.se_db, this.design_json);
		},
	},
	methods: {
	},
}
</script>


<style>
.design-summary {
	background-color: #29e;
	border: 2px solid #07a;
	width: 100%;
	margin: 0px;
	box-sizing: border-box;
	min-height: 50px;
	position: fixed;
	left: 0px;
	top: 0px;
}
</style>
