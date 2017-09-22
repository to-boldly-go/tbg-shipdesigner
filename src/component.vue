<template>
  <tr class="component-tr">
	<td class="name-cell">{{se_component.name}}</td>
	<td class="quantity-cell"><input class="quantity-input" type="number" v-model="quantity"></td>
	<td class="part-cell"><select v-model="part" class="part-select">
	  <option v-for="part_value in se_component.valid_parts">{{part_value['Name']}}</option>
	</select></td>

	<template v-for="name in stats.names">
	  <StatlineCell :stats="stats" :name="name"></StatlineCell>
	</template>

	<td class="weight-cell">{{se_component.weight_internal.toFixed(2)}}</td>
	<td class="br-cell">{{se_component.cost_BR.toFixed(2)}}</td>
	<td class="sr-cell">{{se_component.cost_SR.toFixed(2)}}</td>
	<td class="power-gen-cell">{{se_component.power_generation.toFixed(2)}}</td>
	<td class="power-cost-cell">{{se_component.cost_power.toFixed(2)}}</td>

	<template v-for="name in crew.names">
	  <StatlineCell :stats="crew" :name="name"></StatlineCell>
	</template>

	<td class="build-time-cell"></td>
  </tr>
</template>


<script>

import ShipEngine from '../lib/shipengine.js';

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
		quantity: {
			get () {
				return this.se_component.quantity;
			},
			set (value) {
				this.se_component.quantity = value;
			},
		},
		stats () {
			return this.se_component.stats;
		},
		crew() {
			return this.se_component.cost_crew;
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
	},
}
</script>


<style>
.component-tr {
	width: 100%;
	margin: 0px;
}

.name-cell {
}

.quantity-cell {
}

.part-cell {
}

.part-select {
	width: 100%;
}

.quantity-input {
	width: 30px;
}
</style>
