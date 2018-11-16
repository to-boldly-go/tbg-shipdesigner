<template>
	<div width="100%" height="100%">
		<table class="editor">
			<thead>
				<th v-for="field in selected_schema"
					:key="field.name"
					@click="sort_list(field.name)"
					class="column-header"
					:style="header_style(field)">{{field.name}}</th>
				<th class="column-header delete-column"></th>
				<th class="column-header copy-column"></th>
				<th class="column-header move-column"></th>
			</thead>
			<draggable element="tbody" :value="displayed_parts" @end="part_drag_drop_end" :options="{ handle: '.move-handle' }">
				<PartsListPart v-for="part in displayed_parts" :key="part.name" :part="part"></PartsListPart>
			</draggable>
		</table>
		<input type="button" value="Add new part" @click="add_new_part" class="new-part-button">
	</div>
</template>

<script>
import _ from 'lodash';

import { mapGetters } from 'vuex';

import draggable from 'vuedraggable';

import PartsListPart from '@/components/partbuilder/parts-list-part.vue';

export default {
	name: 'PartsListEditor',
	components: {
		PartsListPart,
		draggable,
	},
	data() {
		return {};
	},
	computed: {
		displayed_parts() {
			return _(this.selected_parts)
				.filter(part =>
					this.$store.state.display.filter.types.includes(part['Type'])
				)
				.value();
		},
		header_style() {
			return function(field) {
				return {
					width: field.width.toString() + 'px',
				};
			};
		},
		...mapGetters(['selected_schema', 'selected_parts', 'find_part_index']),
	},
	methods: {
		part_drag_drop_end(event) {
			// Note: display_parts/find_part_index will change after each commit here, so fetch needed data from it before the commits.
			const part = this.displayed_parts[event.oldIndex];
			const src_part_index = this.find_part_index(part);
			const dest_part_index = this.find_part_index(
				this.displayed_parts[event.newIndex]
			);
			this.$store.commit('delete_part', {
				index: src_part_index,
			});
			this.$store.commit('add_part', {
				index: dest_part_index,
				new_part: part,
			});
		},
		add_new_part() {
			let new_part = _.chain(this.fields)
				.map(field => [field.name, null])
				.fromPairs()
				.value();

			const last_part = this.displayed_parts[this.displayed_parts.length - 1];
			new_part['Type'] = last_part['Type'];
			new_part['Type Sort'] = last_part['Type Sort'];
			this.$store.commit('add_part', {
				index: this.find_part_index(last_part) + 1,
				new_part,
			});
		},
		sort_list(field) {
			this.$store.commit('sort_parts_list_by', field);
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

.delete-column,
.copy-column,
.move-column {
	width: 30px;
}

.new-part-button {
	margin: 5px;
}
</style>

<style>
</style>
