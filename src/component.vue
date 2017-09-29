<template>
  <tr class="component-tr" v-bind:class="{ ['has-error']: !isloaded }">
	<td class="name-column">{{se_component.name}}</td>

	<td class="quantity-column" v-bind:class="{ ['has-error']: has_quantity_error }">
	  <select
		v-if="quantity_configurable"
		class="quantity-column-select"
		v-model="quantity"
		v-on:wheel="quantity_select_wheel_event"
		v-bind:class="{ ['has-error']: has_quantity_error }">

		<option v-if="!valid_quantities.includes(quantity)">{{quantity}}</option>
		<option v-for="valid_quantity in valid_quantities">{{valid_quantity}}</option>
	  </select>
	  <span v-if="!quantity_configurable">{{quantity_pretty}}</span>
	</td>

	<td class="part-column" v-bind:class="part_column_select_computed">
	  <select
		v-model="part"
		v-bind:class="part_column_select_computed"
		class="part-column-select">
		<option v-for="part_value in valid_parts">{{part_value['Name']}}</option>
		<option v-if="!is_valid_part">{{part}}</option>
	  </select>
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
		part_column_select_computed () {
			return {
				['has-error']: !this.is_valid_part,
			};
		},
		is_valid_part () {
			return this.valid_parts
				.map((part) => part['Name'])
				.includes(this.part);
		},
		has_quantity_error () {
			return this.quantity_configurable && !(this.valid_quantities.includes(this.quantity));
		},
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
			return this.isloaded ? this.se_component.valid_parts : [];
		},
		quantity_configurable () {
			return this.se_component.is_quantity_configurable;
		},
		quantity_pretty () {
			if (this.quantity === Math.round(this.quantity)) {
				return this.quantity;
			} else {
				return this.quantity.toFixed(2);
			};
		},
		quantity: {
			get () {
				return this.se_component.quantity;
			},
			set (value) {
				this.se_component.quantity = value;
			},
		},
		valid_quantities () {
			return this.se_component.valid_quantities;
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
				if (!this.quantity && !this.se_component.is_no_part) {
					this.quantity = 1;
				};
				if (this.se_component.is_no_part) {
					this.quantity = 0;
				};
			},
		},
	},
	methods: {
		is_quantity_valid (hypothesis) {
			return this
				.valid_quantities
				.map((elem) => (elem === hypothesis))
				.reduce((acc, elem) => acc || elem);
		},
		increment_quantity () {
			let hypothesis = this.quantity + 1;
			if (this.is_quantity_valid(hypothesis)) {
				this.quantity = hypothesis;
			};
		},
		decrement_quantity () {
			let hypothesis = this.quantity - 1;
			if (this.is_quantity_valid(hypothesis)) {
				this.quantity = hypothesis;
			};
		},

		quantity_select_wheel_event (ev) {
			if (ev.deltaY > 0) {
				this.decrement_quantity();
			} else if (ev.deltaY < 0) {
				this.increment_quantity();
			};
			if (ev.preventDefault)
				ev.preventDefault();
			ev.returnValue = false;
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

.has-error {
	background: #faa;
}

.quantity-column {
}
</style>
