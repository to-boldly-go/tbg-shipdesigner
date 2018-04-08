<template>
	<tr class="part">
		<PartsListCell
			v-for="field in selected_schema"
			:class="list_class(field)"
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

import { mapGetters } from 'vuex';

import PartsListCell from './parts-list-cell.vue';

export default {
	name: 'PartsListPart',
	components: {
		PartsListCell,
	},
	props: {
		part: Object,
	},
	computed: {
		has_duplicate_name_error() {
			const f = (part) => _.pick(part, ['Name', 'Variant', 'Type']);
			const comp = (part) => _.isEqual(f(part), f(this.part));
			return this.selected_parts.filter(comp).length > 1;
		},
		list_class() {
			return (field) => ({
				'has-error': (field.id === 'name') && (this.has_duplicate_name_error),
			});
		},
		...mapGetters([
			'selected_schema',
			'selected_parts',
		]),
	},
	methods: {
		delete_this_part() {
			this.$store.commit('delete_part', this.part['Name']);
		},
		copy_this_part() {
			const idx = this.selected_parts.findIndex((part) => part['Name'] === this.part['Name']);
			if (idx >= 0) {
				let clone = _.cloneDeep(this.part);
				clone['Name'] += ' copy';
				this.$store.commit('add_part', clone);
			}
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
