<template>
  <div class="design-table">
	<table>
	  <thead class="design-table-head">
		<tr class="design-table-head-tr">
		  <th></th>	<!-- name -->
		  <th></th>	<!-- quantity -->
		  <th></th>	<!-- part -->
		  <th>C</th>
		  <th>S</th>
		  <th>H</th>
		  <th>L</th>
		  <th>P</th>
		  <th>D</th>
		  <th>Wt (Int</th>
		  <th>Ext)</th>
		  <th>BR</th>
		  <th>SR</th>
		  <th>Pwr Gen</th>
		  <th>Pwr Cost</th>
		  <th>O</th>
		  <th>E</th>
		  <th>T</th>
		  <th>Build Time</th>
		</tr>
	  </thead>
	  <tbody class="design-table-body">
		<PrincipalFrameFinal :se_db="se_db" :se_design="se_design"></PrincipalFrameFinal>
		<PrincipalFrameRaw :se_db="se_db" :se_design="se_design"></PrincipalFrameRaw>
		<template v-for="se_subsystem in se_subsystems">
		  <SubsystemFrame :se_db="se_db" :se_subsystem="se_subsystem"></SubsystemFrame>
		  <SubsystemSummary :se_db="se_db" :se_subsystem="se_subsystem"></SubsystemSummary>

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

import PrincipalFrameRaw from './principal-frame-raw.vue';
import PrincipalFrameFinal from './principal-frame-final.vue';
import SubsystemSummary from './subsystem-summary.vue';
import SubsystemFrame from './subsystem-frame.vue';
import ComponentTr from './component.vue';

export default {
	name: 'Design',
	components: {
		PrincipalFrameRaw,
		PrincipalFrameFinal,
		SubsystemSummary,
		SubsystemFrame,
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
	border-style: none;

	width: 100%;
	margin: 0px;
    /* height: 100%; */

	left: 5px;
	top: 5px;
}

.name-column {
}

.part-column {
}

.part-column-select {
	width: 100%;
}

.quantity-column {
	width: 30px;
}

.quantity-column-input {
	width: 100%;
}

.stat-column {
}

.weight-internal-column {
}

.weight-external-column {
}

.br-column {
}

.sr-column {
}

.power-gen-column {
}

.power-cost-column {
}

.build-time-column {
}

.design-table-head {
}

.design-table-head-tr {
	/* display: block; */
	/* position: relative; */
}


.design-table-body {
    /* display: block; */
    /* overflow: auto; */
    /* width: 100%; */
    /* height: 100%; */
}

</style>
