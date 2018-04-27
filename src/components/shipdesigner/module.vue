<template>
	<tr class="module-tr" :class="{ hasloaderror: !is_loaded }">
		<td class="name-column" colspan="2">Module</td>

		<td :class="{
				'part-column': true,
				'compare-base-value': se_module.compare_base &&
					(se_module.module_type !== se_module.compare_base.module_type || se_module.module_variant !== se_module.compare_base.module_variant),
			}">
			<span class="module-pair-span">
			<span class="module-pair-type"><select v-model="module_type" class="part-column-select">
				<option
					v-for="module_type_value in valid_types"
					:key="module_type_value"
					:class="{ 'compare-base-value': se_module.compare_base && module_type_value === se_module.compare_base.module_type }">
					{{module_type_value}}
				</option>
			</select></span>
			<span class="module-pair-variant"><select v-model="module_variant" class="part-column-select">
				<option
					v-for="module_variant_value in valid_variants"
					:key="module_variant_value['Variant']"
					:class="{ 'compare-base-value': se_module.compare_base && module_variant_value['Variant'] === se_module.compare_base.module_variant }">
					{{module_variant_value['Variant']}}
				</option>
			</select></span>
			</span>
		</td>

		<template v-for="name in stats.names">
			<StatlineCell :key="name" :stats="stats" :name="name"></StatlineCell>
		</template>

		<td class="weight-internal-column">{{weight_internal}}</td>
		<td class="weight-external-column">{{weight_external}}</td>

		<td class="br-column">{{cost_BR}}</td>
		<td class="sr-column">{{cost_SR}}</td>

		<template v-if="se_module.refit_valid">
			<td class="br-column">{{refit_cost_BR}}</td>
			<td class="sr-column">{{refit_cost_SR}}</td>
		</template>

		<td class="power-cost-column">{{power_cost}}</td>
		<td class="power-gen-column">{{power_gen}}</td>

		<template v-for="name in crew.names">
			<StatlineCell :key="name" :stats="crew" :name="name"></StatlineCell>
		</template>

		<td class="build-time-column">{{build_time}}</td>

		<td class="tech-year-column"></td>
	</tr>
</template>


<script>

import {
	pretty,
	frac,
} from '@/lib/ui-functions';

import StatlineCell from '@/components/shipdesigner/statline-cell.vue';

export default {
	name: 'ModuleTr',
	components: {
		StatlineCell,
	},
	props: {
		se_module: Object,
	},
	computed: {
		build_time() {
			return frac(this.se_module.build_time, 12) || '';
		},
		power_gen() {
			return pretty(this.se_module.power_generation);
		},
		power_cost() {
			return pretty(this.se_module.cost_power);
		},
		cost_BR() {
			return pretty(this.se_module.cost_BR);
		},
		cost_SR() {
			return pretty(this.se_module.cost_SR);
		},
		refit_cost_BR() {
			return pretty(this.se_module.refit_cost_BR);
		},
		refit_cost_SR() {
			return pretty(this.se_module.refit_cost_SR);
		},
		weight_internal() {
			return pretty(this.se_module.weight_internal);
		},
		weight_external() {
			return pretty(this.se_module.weight_external);
		},
		is_loaded() {
			return this.se_module.is_loaded;
		},
		stats() {
			return this.se_module.stats;
		},
		crew() {
			return this.se_module.cost_crew;
		},

		valid_types() {
			return this.$store.getters.se_db.valid_module_types();
		},
		valid_variants() {
			return this.$store.getters.se_db.find_modules(this.se_module.module_type);
		},
		module_type: {
			get() {
				return this.se_module.module_type;
			},
			set(value) {
				this.$store.commit('set_module_type', {
					se_db: this.$store.getters.se_db,
					module: this.se_module,
					value: value,
				});
			},
		},
		module_variant: {
			get() {
				return this.se_module.module_variant;
			},
			set(value) {
				this.$store.commit('set_module_variant', {
					module: this.se_module,
					value: value,
				});
			},
		},
	},
	methods: {
		log_parts() {
			console.log('"' + this.part + '"');
			console.log(this.valid_parts.map((part) => part['Name']));
			console.log(this.$store.getters.se_db.find_part(this.part));
			this.part = this.part;
		},
	},
};
</script>

<style>
  
</style>

<style scoped>
.module-tr {
	background: #ccc;

	width: 100%;
}

.compare-base-value {
	background: #aa80ff;
}

.hasloaderror {
	background: #faa;
}

.module-pair-span {
	display: flex;
}

.module-pair-type {
	flex: 1 1 0;
}

.module-pair-variant {
	flex: 1 1 0;
}

.part-column-select {
}
</style>
