<template>
  <tr class="part">
	<PartsListCell v-for="field in fields" :key="field.name" :part="part" :field="field"></PartsListCell>
	<td class="delete-cell"><input type="button" class="delete-button" value="X" @click="delete_this_part"></td>
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
	},
	methods: {
		delete_this_part () {
			const idx = this.partslist.findIndex((part) => part['Name'] === this.part['Name']);
			console.log(idx);
			if (idx >= 0) {
				this.partslist.splice(idx, 1);
			};
		},
	},
};
</script>

<style scoped>

.part {
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

</style>

<style>

</style>
