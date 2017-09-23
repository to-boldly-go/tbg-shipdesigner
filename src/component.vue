<template>
  <tr class="component-tr" v-bind:class="{ hasloaderror: !isloaded }">
	<td class="name-column" @click="log_parts">{{se_component.name}}</td>
	<td class="quantity-column"><input class="quantity-column-input" type="number" v-model="quantity"></td>

	<td class="part-column"><select v-model="part" class="part-column-select">
	  <option v-for="part_value in valid_parts">{{part_value['Name']}}</option>
	</select></td>

	<template v-for="name in stats.names">
	  <StatlineCell :stats="stats" :name="name"></StatlineCell>
	</template>

	<td class="weight-internal-column">{{weight_internal}}</td>
	<td class="weight-external-column">{{weight_external}}</td>

	<td class="br-column">{{cost_br}}</td>
	<td class="sr-column">{{cost_sr}}</td>

	<td class="power-gen-column">{{power_gen}}</td>
	<td class="power-cost-column">{{power_cost}}</td>

	<template v-for="name in crew.names">
	  <StatlineCell :stats="crew" :name="name"></StatlineCell>
	</template>

	<td class="build-time-column"></td>
  </tr>
</template>


<script>

import ShipEngine from '../lib/shipengine.js';

import {
	pretty,
} from './ui-functions.js'

import StatlineCell from './statline-cell.vue';

export default {
	name: 'ComponentTr',
	components: {
		StatlineCell,
	},
	props: {
		se_db: Object,
		se_component: Object,
	},
	computed: {
		power_gen () {
			return pretty(this.isloaded ? this.se_component.power_generation : 0);
		},
		power_cost () {
			return pretty(this.isloaded ? this.se_component.cost_power : 0);
		},
		cost_sr () {
			return pretty(this.isloaded ? this.se_component.cost_SR : 0);
		},
		cost_br () {
			return pretty(this.isloaded ? this.se_component.cost_BR : 0);
		},
		weight_internal () {
			return pretty(this.isloaded ? this.se_component.weight_internal : 0);
		},
		weight_external () {
			return pretty(this.isloaded ? this.se_component.weight_external : 0);
		},
		isloaded () {
			return (!!this.se_component.part_def)
		},
		valid_parts () {
			return this.se_component.valid_parts;
		},
		quantity: {
			get () {
				return this.se_component.quantity;
			},
			set (value) {
				this.se_component.quantity = value;
			},
		},
		stats () {
			return this.isloaded ? this.se_component.stats : new ShipEngine.Statline(0);
		},
		crew() {
			return this.isloaded ? this.se_component.cost_crew : new ShipEngine.Crewline(0);
		},
		part: {
			get () {
				return this.se_component.part;
			},
			set (value) {
				this.se_component.part = value;
			},
		},
	},
	methods: {
		log_parts() {
			console.log('"' + this.part + '"');
			console.log(this.valid_parts.map((part) => part['Name']))
			console.log(this.se_db.find_part(this.part));
			this.part = this.part;
		},
	},
}
</script>

<style>
  
</style>

<style scoped>
.component-tr {
	width: 100%;
	margin: 0px;
}

.hasloaderror {
	background: #faa;
}
</style>
