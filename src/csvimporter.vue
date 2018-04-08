<template>

	<div>

		<div><h2>Instructions:</h2>
			<ol>
				<li>In google docs, open the sheet with the parts that you want to transfer.</li>
				<li>Click File -> Download as -> Comma-separated values (.csv, current sheet).</li>
				<li>Open the sheet for the modules and repeat (download current sheet as csv).</li>
				<li>Open the sheet for the frames and repeat (download current sheet as csv).</li>
				<li>Use the "Choose File" buttons on this tool to load the csv files that were created.</li>
				<li>Name the parts list.</li>
				<li>If there are errors and you can't fix them, report an error in the sdb-informatics channel.</li>
				<li>Click "Import parts list". The parts you uploaded will be immediately available in the ship designer and parts builder.</li>
			</ol>
		</div>

		<div>
			<span>Parts list name:</span>
			<input v-model="name_computed"/>
		</div>
	
		<div>
			<span>Parts CSV:</span>
			<input
				type="file"
				ref="load_parts_file_input"
				@change="load_file_parts"
				value="Load parts csv"/>
		</div>

		<div>
			<span>Frames CSV:</span>
			<input
				type="file"
				ref="load_frames_file_input"
				@change="load_file_frames"
				value="Load frames csv"/>
		</div>

		<div>
			<span>Modules CSV:</span>
			<input
				type="file"
				ref="load_modules_file_input"
				@change="load_file_modules"
				value="Load modules csv"/>
		</div>

		<div v-if="can_import">
			<input
				type="button"
				@click="import_parts_list"
				value="Import parts list"/>
		</div>

	<div v-if="success">
		<span>{{success}}</span>
	</div>

		<div v-if="has_errors">
			<div>Errors present, cannot import:</div>
			<ul>
				<li v-if="has_name_errors">Name:
					<ol>
						<li v-for="(er, index) in name_error_messages" :key="index">{{er}}</li>
					</ol>
				</li>
				<li v-if="has_parts_errors">Parts file:
					<ol>
						<li v-for="(er, index) in parts_error_messages" :key="index">{{er}}</li>
					</ol>
				</li>
				<li v-if="has_frames_errors">Frames file:
					<ol>
						<li v-for="(er, index) in frames_error_messages" :key="index">{{er}}</li>
					</ol>
				</li>
				<li v-if="has_modules_errors">Modules file:
					<ol>
						<li v-for="(er, index) in modules_error_messages" :key="index">{{er}}</li>
					</ol>
				</li>
			</ul>
		</div>

	</div>
	
</template>

<script>

import canon_parts_list from '../dist/canon_parts_list.json';

import _ from 'lodash';

import Papa from 'papaparse';

const LOCAL_PARTS_LISTS_KEY = 'parts_lists';

const csv_parse_config = {
	header: true,
	dynamicTyping: true,
};

export default {
	name: 'CsvImporter',
	components: {
	},
	props: {
	},
	data() {
		return {
			modules_result: {},
			parts_result: {},
			frames_result: {},
			name: '',
			success: null,
		};
	},
	computed: {
		name_computed: {
			get() {
				return this.name;
			},
			set(value) {
				this.success = false;
				this.name = value;
			},
		},
		modules_error_messages() {
			if (this.has_modules_errors) {
				return this.modules_result.errors.map((er) => {
					if (er.row) {
						return 'Row ' + er.row.toString() + ': ' + er.message;
					} else {
						return er.message;
					}
				});
			} else {
				return [];
			}
		},
		frames_error_messages() {
			if (this.has_frames_errors) {
				return this.frames_result.errors.map((er) => {
					if (er.row) {
						return 'Row ' + er.row.toString() + ': ' + er.message;
					} else {
						return er.message;
					}
				});
			} else {
				return [];
			}
		},
		parts_error_messages() {
			if (this.has_parts_errors) {
				console.log(this.parts_result.errors);
				return this.parts_result.errors.map((er) => {
					if (er.row) {
						return 'Row ' + er.row.toString() + ': ' + er.message;
					} else {
						return er.message;
					}
				});
			} else {
				return [];
			}
		},
		name_error_messages() {
			if (!this.name.length) {
				return ['No name specified'];
			}
		},
		can_import() {
			return (!this.has_errors
					&& this.name.length
					&& (this.parts_result.data && this.parts_result.data.length)
					&& (this.frames_result.data && this.frames_result.data.length)
					&& (this.modules_result.data && this.modules_result.data.length));
		},
		has_errors() {
			return this.has_name_errors
				|| this.has_parts_errors
				|| this.has_frames_errors
				|| this.has_modules_errors;
		},
		has_name_errors() {
			return !this.name.length;
		},
		has_parts_errors() {
			return (this.parts_result.errors && this.parts_result.errors.length);
		},
		has_frames_errors() {
			return (this.frames_result.errors && this.frames_result.errors.length);
		},
		has_modules_errors() {
			return (this.modules_result.errors && this.modules_result.errors.length);
		},
	},
	methods: {
		load_file_parts() {
			this.success = false;
			let load_f = this.$refs.load_parts_file_input.files[0];
			let reader = new FileReader();
			reader.onload = function(event) {
				if (reader.readyState === FileReader.DONE) {
					this.parts_result = Papa.parse(reader.result, csv_parse_config);
				}
			}.bind(this);
			reader.readAsText(load_f);
		},
		load_file_modules() {
			this.success = false;
			let load_f = this.$refs.load_modules_file_input.files[0];
			let reader = new FileReader();
			reader.onload = function(event) {
				if (reader.readyState === FileReader.DONE) {
					this.modules_result = Papa.parse(reader.result, csv_parse_config);
				}
			}.bind(this);
			reader.readAsText(load_f);
		},
		load_file_frames() {
			this.success = false;
			let load_f = this.$refs.load_frames_file_input.files[0];
			let reader = new FileReader();
			reader.onload = function(event) {
				if (reader.readyState === FileReader.DONE) {
					this.frames_result = Papa.parse(reader.result, csv_parse_config);
				}
			}.bind(this);
			reader.readAsText(load_f);
		},
		import_parts_list() {
			if (this.has_errors) {
				return;
			}

			this.$store.commit('set_parts_list', {
				name: this.name,
				timestamp: new Date().toISOString(),
				parts: {
					records: this.parts_result.data.filter((row) => _.size(row) > 2),
					schema: canon_parts_list.parts.schema,
				},
				modules: {
					records: this.modules_result.data.filter((row) => _.size(row) > 2),
					schema: canon_parts_list.modules.schema,
				},
				frames: {
					records: this.frames_result.data.filter((row) => _.size(row) > 2),
					schema: canon_parts_list.frames.schema,
				},
			});

			const loaded = localStorage.getItem(LOCAL_PARTS_LISTS_KEY);
			let local_parts_lists;
			if (loaded === null) {
				local_parts_lists = [];
			} else {
				local_parts_lists = JSON.parse(loaded);
			}
			local_parts_lists.push(_.cloneDeep(this.$store.state.parts_list));
			localStorage.setItem(LOCAL_PARTS_LISTS_KEY, JSON.stringify(local_parts_lists));
			this.success = 'Successfully saved parts list!';
		},
	},
};

</script>

<style scoped>

</style>

<style>

</style>
