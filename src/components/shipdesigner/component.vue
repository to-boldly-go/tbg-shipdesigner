<template>
	<tr class="component-tr" :class="{ 'has-error': !is_loaded }">
		<td class="name-column">{{se_component.name}}</td>

		<td class="quantity-column" :class="{ 'has-error': has_quantity_error }">
			<select
				v-if="quantity_configurable"
				class="quantity-column-select"
				v-model="quantity"
				v-on:wheel="quantity_select_wheel_event"
				:class="{ 'has-error': has_quantity_error }">

				<option v-if="!valid_quantities.includes(quantity)">{{quantity}}</option>
				<option v-for="valid_quantity in valid_quantities" :key="valid_quantity">{{valid_quantity}}</option>
			</select>
			<span v-if="!quantity_configurable">{{quantity_pretty}}</span>
		</td>

		<td class="part-column">
			<select
				v-model="part"
				class="part-column-select">
				<option v-for="part_value in valid_parts" :key="part_value['Name']">{{part_value['Name']}}</option>
				<option v-if="!is_valid_part" class="has-error">{{part}}</option>
			</select>
		</td>

		<template v-for="name in stats.names">
			<StatlineCell :key="name" :stats="stats" :name="name"></StatlineCell>
		</template>

		<td class="weight-internal-column">{{weight_internal}}</td>
		<td class="weight-external-column">{{weight_external}}</td>

		<td class="br-column">{{cost_br}}</td>
		<td class="sr-column">{{cost_sr}}</td>

		<td class="power-cost-column">{{power_cost}}</td>
		<td class="power-gen-column">{{power_gen}}</td>

		<template v-for="name in crew.names">
			<StatlineCell :key="name" :stats="crew" :name="name"></StatlineCell>
		</template>

		<td class="build-time-column"></td>

		<td class="tech-year-column"
			:class="{ ['has-warning']: is_limiting_tech_year }"
			:title="tech_year_tooltip"
			>{{tech_year}}</td>
	</tr>
</template>


<script>

import {
	pretty,
} from '@/lib/ui-functions';

import StatlineCell from '@/components/shipdesigner/statline-cell.vue';

export default {
	name: 'ComponentTr',
	components: {
		StatlineCell,
	},
	props: {
		se_component: Object,
	},
	computed: {
		tech_year_tooltip() {
			if (this.is_limiting_tech_year) {
				return 'This component is the latest-available part in the design.';
			} else {
				return false;
			}
		},
		is_limiting_tech_year() {
			return this.se_component.tech_year === this.se_component.subsystem.design.tech_year;
		},
		tech_year() {
			return this.se_component.tech_year;
		},
		is_valid_part() {
			return this.valid_parts
				.map((part) => part['Name'])
				.includes(this.part);
		},
		has_quantity_error() {
			return this.quantity_configurable && !(this.valid_quantities.includes(this.quantity));
		},
		power_gen() {
			return pretty(this.se_component.power_generation);
		},
		power_cost() {
			return pretty(this.se_component.cost_power);
		},
		cost_sr() {
			return pretty(this.se_component.cost_SR);
		},
		cost_br() {
			return pretty(this.se_component.cost_BR);
		},
		weight_internal() {
			return pretty(this.se_component.weight_internal);
		},
		weight_external() {
			return pretty(this.se_component.weight_external);
		},
		is_loaded() {
			return this.se_component.is_loaded;
		},
		valid_parts() {
			return this.se_component.valid_parts;
		},
		quantity_configurable() {
			return this.se_component.is_quantity_configurable;
		},
		quantity_pretty() {
			if (this.quantity === Math.round(this.quantity)) {
				return this.quantity;
			} else {
				return this.quantity.toFixed(2);
			}
		},
		quantity: {
			get() {
				return this.se_component.quantity;
			},
			set(value) {
				this.$store.commit('set_component_quantity', {
					component: this.se_component,
					value,
				});
			},
		},
		valid_quantities() {
			return this.se_component.valid_quantities;
		},
		stats() {
			return this.se_component.stats;
		},
		crew() {
			return this.se_component.cost_crew;
		},
		part: {
			get() {
				return this.se_component.part;
			},
			set(value) {
				this.$store.commit('set_component_part', {
					component: this.se_component,
					value,
				});
			},
		},
		is_quantity_valid() {
			return (hypothesis) => this
				.valid_quantities
				.map((elem) => (elem === hypothesis))
				.reduce((acc, elem) => acc || elem);
		},
	},
	methods: {
		increment_quantity() {
			let hypothesis = this.quantity + 1;
			if (this.is_quantity_valid(hypothesis)) {
				this.quantity = hypothesis;
			}
		},
		decrement_quantity() {
			let hypothesis = this.quantity - 1;
			if (this.is_quantity_valid(hypothesis)) {
				this.quantity = hypothesis;
			}
		},
		quantity_select_wheel_event(ev) {
			if (ev.deltaY > 0) {
				this.decrement_quantity();
			} else if (ev.deltaY < 0) {
				this.increment_quantity();
			}
			if (ev.preventDefault) {
				ev.preventDefault();
			}
			ev.returnValue = false;
		},
	},
};
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

.has-warning {
	background: #ffa;
}

.quantity-column {
}
</style>