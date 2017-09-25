<template>
  <div class="root">
	<div class="header">
	  <PartsListHeader :partslist="partslist_info.data" :schema="schema" :display="display"></PartsListHeader>
	</div>
	<div class="editor">
	  <PartsListEditor :partslist="partslist_info.data" :schema="schema" :display="display"></PartsListEditor>
	</div>
	<div class="footer">
	  <PartsListFooter :partslist_info="partslist_info"></PartsListFooter>
	</div>
  </div>
</template>


<script>

import _ from 'lodash';

import canon_parts from '../dist/parts_C8.csv';
import canon_modules from '../dist/modules_C8.csv';
import canon_frames from '../dist/frames_C8.csv';

import PartsListHeader from './parts-list-header.vue';
import PartsListFooter from './parts-list-footer.vue';
import PartsListEditor from './parts-list-editor.vue';

const SCHEMA = [
	{
		name: 'Type Sort',
		id: 'type-sort',
		edit_type: 'number',
		fixed: 0,
		width: 30,
		align: 'right',
	},
	{
		name: 'Type',
		id: 'type',
		edit_type: 'string',
		width: 162,
		align: 'left',
	},
	{
		name: 'Tier',
		id: 'tier',
		edit_type: 'number',
		fixed: 0,
		width: 26,
		align: 'right',
	},
	{
		name: 'Size Sort',
		id: 'size-sort',
		edit_type: 'number',
		fixed: 0,
		width: 30,
		align: 'right',
	},
	{
		name: 'Size Class',
		id: 'size-class',
		edit_type: 'string',
		width: 68,
		align: 'left',
	},
	{
		name: 'Name',
		id: 'name',
		edit_type: 'string',
		width: 345,
		align: 'left',
	},
	{
		name: 'Effect',
		id: 'effect',
		edit_type: 'number',
		fixed: 3,
		width: 56,
		align: 'left',
	},
	{
		name: 'Weight O/H',
		id: 'weightoh',
		edit_type: 'number',
		fixed: null,
		width: 40,
		align: 'left',
	},
	{
		name: 'Scale Weight',
		id: 'scaleweight',
		edit_type: 'number',
		fixed: null,
		width: 40,
		align: 'left',
	},
	{
		name: 'Unit Weight',
		id: 'unitweight',
		edit_type: 'number',
		fixed: 2,
		width: 40,
		align: 'left',
	},
	{
		name: 'SR Cost x',
		id: 'srcostx',
		edit_type: 'number',
		fixed: 5,
		width: 65,
		align: 'left',
	},
	{
		name: 'Pwr O/H',
		id: 'poweroh',
		edit_type: 'number',
		fixed: 3,
		width: 54,
		align: 'left',
	},
	{
		name: 'Scale Pwr',
		id: 'scalepower',
		edit_type: 'number',
		fixed: 3,
		width: 40,
		align: 'left',
	},
	{
		name: 'Unit Power',
		id: 'unitpower',
		edit_type: 'number',
		fixed: 2,
		width: 40,
		align: 'left',
	},
	{
		name: 'O',
		id: 'ocost',
		edit_type: 'number',
		fixed: 3,
		width: 51,
		align: 'left',
	},
	{
		name: 'E',
		id: 'ecost',
		edit_type: 'number',
		fixed: 3,
		width: 51,
		align: 'left',
	},
	{
		name: 'T',
		id: 'tcost',
		edit_type: 'number',
		fixed: 3,
		width: 44,
		align: 'left',
	},
	{
		name: 'Reliability',
		id: 'reliability',
		edit_type: 'number',
		fixed: 7,
		width: 66,
		align: 'left',
	},
	{
		name: 'Year Available (SF)',
		id: 'year',
		edit_type: 'string',
		width: 123,
		align: 'right',
	},
];

export default {
	name: 'app',
	components: {
		PartsListHeader,
		PartsListFooter,
		PartsListEditor,
	},
	data () {
		return {
			partslist_info: { data: canon_parts },
			schema: SCHEMA,
			display: { types: [_(canon_parts).minBy((part) => part['Type Sort'])['Type']] },
		};
	},
	computed: {
	},
};

</script>

<style scoped>
.root {
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;

	font-family: arial, sans-serif;
	font-size: 13px;
	font-stretch: 100%;
	font-style: 100%;
	font-variant-caps: normal;
	font-variant-ligatures: normal;
	font-variant-numeric: normal;
	font-weight: 400;
}

.header {
	flex: 0 0 auto;
	border-bottom: 2px solid;
}

.editor {
	flex: 1 1 auto;
	position: relative;/* need this to position inner content */
	overflow-y: auto;
}

.footer {
	flex: 0 0 auto;
	border-top: 2px solid;
}

</style>

<style>

button, input, select, textarea {
	font-family : inherit;
	font-size   : 100%;
}

</style>
