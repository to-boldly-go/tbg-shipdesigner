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
		<td class="move-cell"><div class="move-handle">↕️</div></td>
	</tr>
</template>

<script>
import _ from 'lodash';

import { mapGetters } from 'vuex';

import PartsListCell from '@/components/partbuilder/parts-list-cell.vue';

export default {
	name: 'PartsListPart',
	components: {
		PartsListCell,
	},
	props: {
		part: Object,
	},
	computed: {
		list_class() {
			return field => ({
				'has-error': field.id === 'name' && this.has_duplicate_parts(this.part),
			});
		},
		...mapGetters([
			'selected_schema',
			'selected_parts',
			'find_part_index',
			'has_duplicate_parts',
		]),
	},
	methods: {
		delete_this_part() {
			this.$store.commit('delete_part', {
				index: this.find_part_index(this.part),
			});
		},
		copy_this_part() {
			const index = this.find_part_index(this.part);
			if (index >= 0) {
				// XXX: can this ever be false?
				let clone = _.cloneDeep(this.part);
				clone['Name'] += ' copy';
				this.$store.commit('add_part', {
					index: index + 1,
					new_part: clone,
				});
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

.delete-cell,
.copy-cell,
.move-cell {
	width: 30px;
	border: 1px solid #eee;
}

.delete-button,
.copy-button,
.move-handle {
	padding: 0;
	border-width: 0;
	width: 100%;
	box-sizing: border-box;
	background-color: buttonface;
	text-align: center;
}

.move-handle {
	cursor: move;
}
</style>

<style>
</style>
