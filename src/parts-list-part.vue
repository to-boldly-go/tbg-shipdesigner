<template>
  <tr class="part">
	<PartsListCell
	  v-on:partupdate="partupdate()"
	  v-for="field in fields"
	  v-bind:class="list_class(field)"
	  :key="field.name"
	  :part="part"
	  :field="field">
	</PartsListCell>
	<td class="delete-cell"><input type="button" class="delete-button" value="X" @click="delete_this_part"></td>
	<td class="copy-cell"><input type="button" class="copy-button" value="+" @click="copy_this_part"></td>
  </tr>
</template>

<script>

import _ from 'lodash';

import PartsListCell from './parts-list-cell.vue';

export default {
	name: 'PartsListPart',
	components: {
		PartsListCell,
	},
	props: {
		partslist: {
			type: Array,
		},
		part: {
			type: Object,
		},
		schema: {
			type: Array,
		},
	},
	computed: {
		fields () {
			return this.schema;
		},
		has_duplicate_name_error () {
			return this.partslist.filter((part) => part['Name'] === this.part['Name']).length > 1;
		},
	},
	methods: {
		list_class (field) {
			return {
				['has-error']: (field.id === 'name') && (this.has_duplicate_name_error),
			};
		},
		partupdate () {
			this.$emit('partupdate');
		},
		delete_this_part () {
			const idx = this.partslist.findIndex((part) => part['Name'] === this.part['Name']);
			if (idx >= 0) {
				this.partslist.splice(idx, 1);
			};
		},
		copy_this_part () {
			const idx = this.partslist.findIndex((part) => part['Name'] === this.part['Name']);
			if (idx >= 0) {
				let clone = _.cloneDeep(this.part);
				this.partslist.splice(idx, 0, clone);
			};
		},
	},
};
</script>

<style scoped>

.part {
}

.has-error {
	background: #faa;
}

.delete-cell {
	width: 30px;
	border: 1px solid #eee;
}

.delete-button {
	padding: 0;
	border-width: 0;

	width: 100%;
    box-sizing: border-box;
}

.copy-cell {
	width: 30px;
	border: 1px solid #eee;
}

.copy-button {
	padding: 0;
	border-width: 0;

	width: 100%;
    box-sizing: border-box;
}

</style>

<style>

</style>
