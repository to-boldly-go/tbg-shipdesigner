<template>
  <div class="design-summary">
	<div>{{se_design.name}} | {{se_design.pretty_miscstats}}</div>
	<div>{{se_design.stats_raw.toFixed(2)}} | [{{se_design.cost_BR_raw.toFixed(2)}}]br [{{se_design.cost_SR_raw.toFixed(2)}}]sr | {{se_design.cost_crew_raw.toFixed(2)}}</div>
	<div>{{se_design.pretty_buildinfo}}</div>
  </div>
</template>


<script>

import ShipEngine from '../lib/shipengine.js';

export default {
	name: 'DesignSummary',
	props: {
		se_db: Object,
		se_design: Object,
	},
	methods: {
	},
}
</script>


<style scoped>
.design-summary {
	background-color: #999;

	width: 100%;
	margin: 0px;

	left: 5px;
	top: 5px;
}
</style>
