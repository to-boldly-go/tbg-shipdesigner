<template>
  <div width="100%" height="100%">
  <table class="editor">
	<thead>
	  <th v-for="field in fields"
		  @click="sort_list(field.name)"
		  class="column-header"
		  v-bind:style="header_style(field)">{{field.name}}</th>
	  <th class="column-header delete-column"></th>
	</thead>
	<tbody>
	  <PartsListPart v-for="part in displayed_parts" key="part.name" :partslist="partslist" :part="part" :schema="schema"></PartsListPart>
	</tbody>
  </table>
  <input type="button" value="Add new part" @click="add_new_part" class="new-part-button">
  </div>
</template>

<script>

import _ from 'lodash';

import PartsListPart from './parts-list-part.vue';

function string_compare(a, b, ascending) {
	let invert = ascending ? 1 : -1;
	return a.localeCompare(b) * invert;
};

function number_compare(a, b, ascending) {
	let invert = ascending ? 1 : -1;
	return (a - b) * invert;
};

export default {
	name: 'PartsListEditor',
	components: {
		PartsListPart,
	},
	data () {
		return {
			current_sort: {
				field: null,
				ascending: true,
			},
		};
	},
	props: {
		partslist: {
			type: Array,
		},
		schema: {
			type: Array,
		},
		display: {
			type: Object,
		},
	},
	computed: {
		fields () {
			return this.schema;
		},
		displayed_parts () {
			return _(this.partslist).filter((part) => this.display.types.includes(part['Type'])).value();
		},
	},
	methods: {
		add_new_part () {
			let new_part = _.chain(this.fields)
				.map((field) => [field.name, null])
				.fromPairs()
				.value();

			const last_part = this.displayed_parts[this.displayed_parts.length - 1];
			new_part['Type'] = last_part['Type'];
			new_part['Type Sort'] = last_part['Type Sort'];
			this.partslist.push(new_part)
		},
		header_style (field) {
			return {
				width: field.width.toString() + 'px',
			};
		},
		sort_list (field) {
			if (this.current_sort.field === field) {
				this.current_sort.ascending = !this.current_sort.ascending;
			} else {
				this.current_sort.field = field;
				this.current_sort.ascending = true;
			};

			switch (typeof(this.partslist[0][field])) {
			case 'number':
				this.partslist.sort((a, b) => number_compare(a[field], b[field], this.current_sort.ascending));
				break;
			case 'string':
				this.partslist.sort((a, b) => string_compare(a[field], b[field], this.current_sort.ascending));
				break;
			};
		},
	},
};
</script>

<style scoped>

.editor {
	/* width: 1500px; */
	table-layout: fixed;
	border-collapse: collapse;
}

.column-header {
	cursor: pointer;
	border: 1px solid #eee;
}

.delete-column {
	width: 30px;
}

.new-part-button {
	margin: 5px;
}

</style>

<style>

</style>
