<template>
  <tr class="module-tr" v-bind:class="{ hasloaderror: !isloaded }">
	<td class="name-column" colspan="2">Module</td>

	<td class="part-column">
	  <span class="module-pair-span">
		<span class="module-pair-type"><select v-model="module_type" class="part-column-select">
			<option v-for="module_type_value in valid_types">{{module_type_value}}</option>
		</select></span>
		<span class="module-pair-variant"><select v-model="module_variant" class="part-column-select">
			<option v-for="module_variant_value in valid_variants">{{module_variant_value['Variant']}}</option>
		</select></span>
	  </span>
	</td>

	<template v-for="name in stats.names">
	  <StatlineCell :stats="stats" :name="name"></StatlineCell>
	</template>

	<td class="weight-internal-column">{{weight_internal}}</td>
	<td class="weight-external-column">{{weight_external}}</td>

	<td class="br-column">{{cost_br}}</td>
	<td class="sr-column">{{cost_sr}}</td>

	<td class="power-cost-column">{{power_cost}}</td>
	<td class="power-gen-column">{{power_gen}}</td>

	<template v-for="name in crew.names">
	  <StatlineCell :stats="crew" :name="name"></StatlineCell>
	</template>

	<td class="build-time-column">{{build_time}}</td>
  </tr>
</template>


<script>

import ShipEngine from '../lib/shipengine.js';

import {
	pretty,
	frac,
} from './ui-functions.js'

import StatlineCell from './statline-cell.vue';

export default {
	name: 'ModuleTr',
	components: {
		StatlineCell,
	},
	props: {
		se_module: Object,
	},
	computed: {
		build_time () {
			return this.isloaded ? frac(this.se_module.build_time, 12) || '' : '';
		},
		power_gen () {
			return pretty(this.isloaded ? this.se_module.power_generation : 0);
		},
		power_cost () {
			return pretty(this.isloaded ? this.se_module.cost_power : 0);
		},
		cost_sr () {
			return pretty(this.isloaded ? this.se_module.cost_SR : 0);
		},
		cost_br () {
			return pretty(this.isloaded ? this.se_module.cost_BR : 0);
		},
		weight_internal () {
			return pretty(this.isloaded ? this.se_module.weight_internal : 0);
		},
		weight_external () {
			return pretty(this.isloaded ? this.se_module.weight_external : 0);
		},
		isloaded () {
			return (!!this.se_module.module_def)
		},
		stats () {
			return this.isloaded ? this.se_module.stats : new ShipEngine.Statline(0);
		},
		crew() {
			return this.isloaded ? this.se_module.cost_crew : new ShipEngine.Crewline(0);
		},

		valid_types () {
			return this.$store.getters.se_db.valid_module_types();
		},
		valid_variants () {
			return this.$store.getters.se_db.find_modules(this.se_module.module_type);
		},
		module_type: {
			get () {
				return this.se_module.module_type;
			},
			set (value) {
				this.$store.commit('set_module_type', {
					se_db: this.$store.getters.se_db,
					module: this.se_module,
					value: value,
				});
			},
		},
		module_variant: {
			get () {
				return this.se_module.module_variant;
			},
			set (value) {
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
			console.log(this.valid_parts.map((part) => part['Name']))
			console.log(this.$store.getters.se_db.find_part(this.part));
			this.part = this.part;
		},
	},
}
</script>

<style>
  
</style>

<style scoped>
.module-tr {
	background: #ccc;

	width: 100%;
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
