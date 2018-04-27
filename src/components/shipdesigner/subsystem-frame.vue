<template>

	<tr class="subsystem-frame" v-bind:class="{ 'has-error': !is_valid_frame }">
		<td class="name-column" colspan="2">{{se_subsystem.name}}</td>

		<td v-if="!se_subsystem.refit_valid" :class="{
				'part-column': true,
				'compare-base-value': se_subsystem.compare_base && se_subsystem.sub_frame !== se_subsystem.compare_base.sub_frame,
			}">
			<select v-model="sub_frame" class="part-column-select">
				<option
					v-for="sub_frame_value in se_subsystem.valid_frames"
					:key="sub_frame_value['Name']"
					:class="{ 'compare-base-value': se_subsystem.compare_base && sub_frame_value['Name'] === se_subsystem.compare_base.sub_frame }">
					{{sub_frame_value['Name']}}
				</option>
				<option v-if="!is_valid_frame" class="has-error">{{sub_frame}}</option>
			</select>
		</td>
		<td v-else>{{sub_frame}}</td>

		<template v-for="name in stats.names">
			<td :key="name" class="stat-column">{{stats_multiplier_pretty}}</td>
		</template>

		<td class="weight-internal-column" colspan="2">{{se_subsystem.weight_cap.toFixed(2)}}</td>

		<td class="br-column">{{se_subsystem.cost_BR_frame.toFixed(2)}}</td>
		<td class="sr-column">{{se_subsystem.cost_SR_mult.toFixed(2)}}x</td>

		<template v-if="se_subsystem.refit_valid">
			<td class="br-column"></td>
			<td class="sr-column"></td>
		</template>

		<td class="power-cost-column"></td>
		<td class="power-gen-column"></td>

		<template v-for="name in crew.names">
			<StatlineCell :key="name" :stats="crew_mult_pretty" :name="name" :ispretty="false"></StatlineCell>
		</template>

		<td class="build-time-column">{{build_time}}</td>

		<td class="tech-year-column">{{tech_year}} (Frame)</td>
	</tr>

</template>


<script>

import StatlineCell from '@/components/shipdesigner/statline-cell.vue';

import { frac } from '@/lib/ui-functions';

export default {
	name: 'SubsystemFrame',
	components: {
		StatlineCell,
	},
	props: {
		se_subsystem: Object,
	},
	computed: {
		is_valid_frame() {
			return this.se_subsystem.is_valid_frame;
		},
		valid_frames() {
			return this.se_subsystem.valid_frames;
		},
		se_components() {
			return this.se_subsystem.components;
		},
		stats() {
			return this.se_subsystem.stats;
		},
		stats_multiplier_pretty() {
			return this.se_subsystem.stats_multiplier.toFixed(2) + 'x';
		},
		crew() {
			return this.se_subsystem.cost_crew;
		},
		crew_mult_pretty() {
			return this.se_subsystem.cost_crew_frame_mult.apply((val) => val.toFixed(2) + 'x');
		},
		build_time() {
			return frac(this.se_subsystem.build_time, 12);
		},
		tech_year() {
			return this.se_subsystem.tech_year_frame;
		},
		sub_frame: {
			get() {
				return this.se_subsystem.sub_frame;
			},
			set(value) {
				this.$store.commit('set_subsystem_frame', {
					value: value,
					subsystem: this.se_subsystem,
				});
			},
		},
	},
	methods: {
	},
};
</script>


<style>

</style>


<style scoped>
.subsystem-frame {
	background: #ccc;
}

.compare-base-value {
	background: #aa80ff;
}

.has-error {
	background: #faa;
}
</style>
