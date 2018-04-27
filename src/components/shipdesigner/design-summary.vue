<template>
	<div class="design-summary">
		<div>
			<span>{{se_design.name}} | {{se_design.pretty_miscstats}}</span>
			<span> | </span>
			<span
				:class="{'has-error': has_parts_list_load_error}"
				:title="parts_list_load_title">Parts: {{parts_list_name}}</span>
			<span
				v-if="has_parts_list_load_error"
				:class="{'has-error': has_parts_list_load_error}"> (WRONG PARTS LIST! EVERYTHING MAY BE INVALID!)</span>
		</div>

		<div>
			<span>{{se_design.stats_raw.toFixed(2)}}</span>
			<span> | </span>
			<span>[{{se_design.cost_BR_raw.toFixed(2)}}]br</span>
			<span>[{{se_design.cost_SR_raw.toFixed(2)}}]sr</span>
			<template v-if="se_design.refit_valid">
				<span> | Refit </span>
				<span>[{{se_design.refit_cost_BR_raw.toFixed(2)}}]br</span>
				<span>[{{se_design.refit_cost_SR_raw.toFixed(2)}}]sr</span>
			</template>
			<span> | </span>
			<span>{{se_design.cost_crew_raw.toFixed(2)}}</span>
			<span> | </span>
			<span>[{{build_time}}]years</span>
		</div>
		<div>
			<span
				class="design-power-summary"
				:class="{'has-error': !se_design.omit_validation && se_design.cost_power_raw > se_design.power_generation_raw}"
				>Power[{{se_design.cost_power_raw.toFixed(2)}}/{{se_design.power_generation_raw.toFixed(2)}}]</span>
			<span
				class="design-weight-summary"
				:class="{'has-error': !se_design.omit_validation && se_design.weight_internal > se_design.frame_max_size_raw}"
				>Internal[{{se_design.weight_internal.toFixed(2)}}/{{se_design.frame_max_size_raw.toFixed(2)}}]</span>
			<span
				class="subsystem-weight-summary"
				v-for="ss in se_design.subsystems"
				:key="ss.name"
				:class="{'has-error': !ss.omit_validation && ss.weight_internal > ss.weight_cap}"
				>{{ss.name}}[{{ss.weight_internal.toFixed(2)}}/{{ss.weight_cap.toFixed(2)}}] </span>
		</div>
	</div>
</template>


<script>

import { mapGetters } from 'vuex';

import { frac } from '@/lib/ui-functions';

export default {
	name: 'DesignSummary',
	computed: {
		parts_list_name() {
			return this.se_design.parts_list_pretty_name;
		},
		parts_list_load_title() {
			if (this.has_parts_list_load_error) {
				return 'Could not find this parts list';
			} else {
				return null;
			}
		},
		has_parts_list_load_error() {
			return !this.se_design.matches_parts_list(this.se_db);
		},
		build_time() {
			return frac(this.$store.getters.se_design.build_time, 12);
		},
		...mapGetters([
			'se_design',
			'se_db',
		]),
	},
	methods: {
		parts_list_save_name(pl) {
			return pl.name + ' (' + (new Date(pl.timestamp).toLocaleString()) + ')';
		},
	},
};
</script>


<style scoped>
.design-summary {
	background-color: #999;

	width: 100%;
	margin: 0px;

	left: 5px;
	top: 5px;
}

.has-error {
	color: #f11;
	font-weight: bold;
}

.design-weight-summary {
	margin-left: 5px;
}

.design-power-summary {
}

.subsystem-weight-summary {
	margin-left: 5px;
}

</style>
