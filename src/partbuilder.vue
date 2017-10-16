<template>
  <div class="root">
	<div class="header">
	  <PartsListHeader :partslist="selected_parts" :schema="selected_schema" :display="display"></PartsListHeader>
	</div>
	<div class="editor">
	  <PartsListEditor v-on:partupdate="save_parts_to_storage()" :partslist="selected_parts" :schema="selected_schema" :display="display"></PartsListEditor>
	</div>
	<div class="footer">
	  <PartsListFooter @reset="reset_to_canon" :data_wrapper="data_wrapper"></PartsListFooter>
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

const PARTS_SCHEMA = [
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
		align: 'right',
		style: 'fixed',
	},
	{
		name: 'Weight O/H',
		id: 'weightoh',
		edit_type: 'number',
		width: 40,
		fixed: 0,
		align: 'right',
		style: 'fixed',
	},
	{
		name: 'Scale Weight',
		id: 'scaleweight',
		edit_type: 'number',
		width: 40,
		align: 'right',
		style: 'fixed',
	},
	{
		name: 'Unit Weight',
		id: 'unitweight',
		edit_type: 'number',
		fixed: 2,
		width: 40,
		align: 'right',
		style: 'fixed',
	},
	{
		name: 'SR Cost x',
		id: 'srcostx',
		edit_type: 'number',
		fixed: 5,
		width: 65,
		align: 'right',
		style: 'fixed',
	},
	{
		name: 'Pwr O/H',
		id: 'poweroh',
		edit_type: 'number',
		fixed: 3,
		width: 54,
		align: 'right',
		style: 'fixed',
	},
	{
		name: 'Scale Pwr',
		id: 'scalepower',
		edit_type: 'number',
		fixed: 3,
		width: 40,
		align: 'right',
		style: 'fixed',
	},
	{
		name: 'Unit Power',
		id: 'unitpower',
		edit_type: 'number',
		fixed: 2,
		width: 40,
		align: 'right',
		style: 'fixed',
	},
	{
		name: 'O',
		id: 'ocost',
		edit_type: 'number',
		fixed: 3,
		width: 51,
		align: 'right',
		style: 'fixed',
	},
	{
		name: 'E',
		id: 'ecost',
		edit_type: 'number',
		fixed: 3,
		width: 51,
		align: 'right',
		style: 'fixed',
	},
	{
		name: 'T',
		id: 'tcost',
		edit_type: 'number',
		fixed: 3,
		width: 44,
		align: 'right',
		style: 'fixed',
	},
	{
		name: 'Reliability',
		id: 'reliability',
		edit_type: 'number',
		fixed: 7,
		width: 66,
		align: 'right',
		style: 'fixed',
	},
	{
		name: 'Year Available (SF)',
		id: 'year',
		edit_type: 'string',
		width: 123,
		align: 'right',
	},
];

const MODULES_SCHEMA = [
	{
		name: "Type",
		id: 'type',
		edit_type: 'string',
		width: 151,
		align: 'right',
	},
	{
		name: "Weight Cap",
		id: 'weightcap',
		edit_type: 'number',
		fixed: 0,
		width: 72,
		align: 'right',
	},
	{
		name: "Variant",
		id: 'variant',
		edit_type: 'string',
		width: 70,
		align: 'right',
	},
	{
		name: "Tier",
		id: 'tier',
		edit_type: 'number',
		fixed: 0,
		width: 24,
		align: 'right',
	},
	{
		name: "Build Time",
		id: 'buildtime',
		edit_type: 'number',
		fixed: 2,
		width: 70,
		align: 'right',
	},
	{
		name: "C",
		id: 'combat',
		edit_type: 'number',
		fixed: 1,
		width: 19,
		align: 'right',
	},
	{
		name: "S",
		id: 'science',
		edit_type: 'number',
		fixed: 1,
		width: 19,
		align: 'right',
	},
	{
		name: "H",
		id: 'hull',
		edit_type: 'number',
		fixed: 1,
		width: 19,
		align: 'right',
	},
	{
		name: "L",
		id: 'shields',
		edit_type: 'number',
		fixed: 1,
		width: 19,
		align: 'right',
	},
	{
		name: "P",
		id: 'presence',
		edit_type: 'number',
		fixed: 1,
		width: 19,
		align: 'right',
	},
	{
		name: "D",
		id: 'defense',
		edit_type: 'number',
		fixed: 1,
		width: 19,
		align: 'right',
	},
	{
		name: "Weight",
		id: 'weight',
		edit_type: 'number',
		fixed: 0,
		width: 47,
		align: 'right',
	},
	{
		name: "SR Cost",
		id: 'srcost',
		edit_type: 'number',
		fixed: 0,
		width: 54,
		align: 'right',
	},
	{
		name: "Power Cost",
		id: 'powercost',
		edit_type: 'number',
		fixed: 0,
		width: 75,
		align: 'right',
	},
	{
		name: "O",
		id: 'ocost',
		edit_type: 'number',
		fixed: 2,
		width: 30,
		align: 'right',
	},
	{
		name: "E",
		id: 'ecost',
		edit_type: 'number',
		fixed: 2,
		width: 30,
		align: 'right',
	},
	{
		name: "T",
		id: 'tcost',
		edit_type: 'number',
		fixed: 2,
		width: 30,
		align: 'right',
	},
	{
		name: "Reliability",
		id: 'reliability',
		edit_type: 'number',
		fixed: 7,
		width: 62,
		align: 'right',
	},
];

const FRAMES_SCHEMA = [
	{
		name: 'Type Sort',
		id: 'type-sort',
		edit_type: 'number',
		fixed: 0,
		width: 59,
		align: 'right',
	},
	{
		name: 'Type',
		id: 'type',
		edit_type: 'string',
		width: 73,
		align: 'right',
	},
	{
		name: 'Tier',
		id: 'tier',
		edit_type: 'number',
		width: 27,
		align: 'right',
	},
	{
		name: 'Weight Class',
		id: 'weightclass',
		edit_type: 'number',
		width: 85,
		align: 'right',
	},
	{
		name: 'Size Class',
		id: 'sizeclass',
		edit_type: 'number',
		width: 68,
		align: 'right',
	},
	{
		name: 'Name',
		id: 'name',
		edit_type: 'string',
		width: 261,
		align: 'right',
	},
	{
		name: 'MaxSz',
		id: 'maxsz',
		edit_type: 'number',
		width: 44,
		align: 'right',
	},
	{
		name: 'Wt',
		id: 'wt',
		edit_type: 'number',
		width: 25,
		align: 'right',
	},
	{
		name: 'Build Time',
		id: 'buildtime',
		edit_type: 'string',
		width: 70,
		align: 'right',
	},
	{
		name: 'Tac Mod',
		id: 'tacmod',
		edit_type: 'number',
		width: 55,
		align: 'right',
	},
	{
		name: 'Ops Mod',
		id: 'opsmod',
		edit_type: 'number',
		width: 59,
		align: 'right',
	},
	{
		name: 'Hull Mod',
		id: 'hullmod',
		edit_type: 'number',
		width: 58,
		align: 'right',
	},
	{
		name: 'Eng. Mod',
		id: 'engmod',
		edit_type: 'number',
		width: 62,
		align: 'right',
	},
	{
		name: 'Core Mod',
		id: 'coremod',
		edit_type: 'number',
		width: 63,
		align: 'right',
	},
	{
		name: 'O-Mod',
		id: 'omod',
		edit_type: 'number',
		width: 45,
		align: 'right',
	},
	{
		name: 'E-Mod',
		id: 'emod',
		edit_type: 'number',
		width: 45,
		align: 'right',
	},
	{
		name: 'T-Mod',
		id: 'tmod',
		edit_type: 'number',
		width: 42,
		align: 'right',
	},
	{
		name: 'SR-Mod',
		id: 'srmod',
		edit_type: 'number',
		width: 53,
		align: 'right',
	},
	{
		name: 'Year Available (SF)',
		id: 'year',
		edit_type: 'string',
		width: 120,
		align: 'right',
	},
];

const canon_data = {
	parts: {
		records: canon_parts,
		schema: PARTS_SCHEMA,
	},
	modules: {
		records: canon_modules,
		schema: MODULES_SCHEMA,
	},
	frames: {
		records: canon_frames,
		schema: FRAMES_SCHEMA,
	},
};

const PARTS_KEY = 'working_parts_list';

export default {
	name: 'app',
	components: {
		PartsListHeader,
		PartsListFooter,
		PartsListEditor,
	},
	data () {
		return {
			data: canon_data,
			display: {
				filter: {
					types: [
						..._(canon_modules).map((part) => part['Type']).uniq(),
						_(canon_parts).minBy((part) => part['Type Sort'])['Type'],
						_(canon_frames).minBy((part) => part['Type Sort'])['Type'],
					]
				},
				selected: 'parts',
			},
		};
	},
	mounted () {
		this.load_parts_from_storage();
	},
	updated () {
		this.save_parts_to_storage();
	},
	computed: {
		data_wrapper () {
			return { data: this.data };
		},
		selected_parts () {
			return this.data[this.display.selected].records;
		},
		selected_schema () {
			return this.data[this.display.selected].schema;
		},
	},
	methods: {
		reset_to_canon () {
			this.data = canon_data;
		},
		load_parts_from_storage () {
			const saved_parts = localStorage.getItem(PARTS_KEY);
			if (saved_parts) {
				this.data = JSON.parse(saved_parts);
			} else {
				localStorage.setItem(PARTS_KEY, JSON.stringify(this.data));
			};
		},
		save_parts_to_storage () {
			localStorage.setItem(PARTS_KEY, JSON.stringify(this.data));
		},
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
