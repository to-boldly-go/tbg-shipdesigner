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
					<th>Pwr Cost</th>
					<th>Pwr Gen</th>
					<th>O</th>
					<th>E</th>
					<th>T</th>
					<th>Build Time</th>
					<th>Year Available</th>
				</tr>
			</thead>
			<tbody class="design-table-body">
				<PrincipalFrameFinal></PrincipalFrameFinal>
				<PrincipalFrameRaw></PrincipalFrameRaw>
				<template v-for="se_subsystem in se_subsystems">
					<tr :key="se_subsystem.name" class="subsystem-spacer-row"><td colspan="100" height="30px"></td></tr>	<!-- empty line for spacing -->
					<SubsystemFrame :key="se_subsystem.name + '-frame'" :se_subsystem="se_subsystem"></SubsystemFrame>
					<SubsystemSummary :key="se_subsystem.name + '-summary'" :se_subsystem="se_subsystem"></SubsystemSummary>
					<SubsystemSettings :key="se_subsystem.name + '-settings'" :se_subsystem="se_subsystem"></SubsystemSettings>

					<template v-for="se_component in se_subsystem.components">
						<ComponentTr :key="se_component.name" :se_component="se_component"></ComponentTr>
					</template>
				</template>

				<tr class="subsystem-spacer-row"><td colspan="100" height="30px"></td></tr>	<!-- empty line for spacing -->
				<ModuleTr :se_module="se_design.module"></ModuleTr>
			</tbody>
		</table>
	</div>
</template>


<script>

import { mapGetters } from 'vuex';

import PrincipalFrameRaw from '@/components/shipdesigner/principal-frame-raw.vue';
import PrincipalFrameFinal from '@/components/shipdesigner/principal-frame-final.vue';
import SubsystemSummary from '@/components/shipdesigner/subsystem-summary.vue';
import SubsystemFrame from '@/components/shipdesigner/subsystem-frame.vue';
import SubsystemSettings from '@/components/shipdesigner/subsystem-settings.vue';
import ComponentTr from '@/components/shipdesigner/component.vue';
import ModuleTr from '@/components/shipdesigner/module.vue';

export default {
	name: 'Design',
	components: {
		PrincipalFrameRaw,
		PrincipalFrameFinal,
		SubsystemSummary,
		SubsystemFrame,
		SubsystemSettings,
		ComponentTr,
		ModuleTr,
	},
	computed: {
		se_subsystems() {
			return this.$store.getters.se_design.subsystems;
		},
		...mapGetters([
			'se_design',
		]),
	},
	methods: {
	},
};
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
	text-align: right;
	font-family: 'Roboto Mono', monospace;
	font-size: 13px;
}

.weight-internal-column {
	text-align: right;
	font-family: 'Roboto Mono', monospace;
	font-size: 13px;
}

.weight-external-column {
	text-align: right;
	font-family: 'Roboto Mono', monospace;
	font-size: 13px;
}

.br-column {
	text-align: right;
	font-family: 'Roboto Mono', monospace;
	font-size: 13px;
}

.sr-column {
	text-align: right;
	font-family: 'Roboto Mono', monospace;
	font-size: 13px;
}

.power-gen-column {
	text-align: right;
	font-family: 'Roboto Mono', monospace;
	font-size: 13px;
}

.power-cost-column {
	text-align: right;
	font-family: 'Roboto Mono', monospace;
	font-size: 13px;
}

.build-time-column {
	text-align: center;
}

.tech-year-column {
	text-align: center;
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
