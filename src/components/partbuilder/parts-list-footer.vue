<template>
	<div class="footer">
		<!-- <input id="partslist-import-export-string" v-model="data_json_string"> -->
		<!-- <input type="button" class="clipboard-copy-button" data-clipboard-target="#partslist-import-export-string" value="Copy"></input> -->

		<input v-model="parts_list_name">

		<select v-model="selected_parts_list_name">
			<option v-for="parts_list in all_parts_lists" :key="parts_list_save_name(parts_list)">
				{{parts_list_save_name(parts_list)}}
			</option>
		</select>

		<input type="button" @click="parts_lists_delete_selected" value="Delete saved parts"/>
		<input type="button" @click="parts_lists_load_selected" value="Load saved parts"/>

		<input type="button" @click="parts_lists_save_current" value="Save current parts"/>
		<input type="button" @click="parts_lists_load_from_local_storage" value="Refresh"/>

		<input type="button" @click="parts_lists_save_file" value="Save to file"/>
		<input type="button" @click="$refs.load_file_input.click()" value="Load from file"/>

		<input
			style="display:none"
			type="file"
			ref="load_file_input"
			@change="parts_lists_load_file"
			value="Load file"/>

		<a ref="save_file_a" style="display:none"></a>

		<span
			ref="status_message"
			class="design-import-export-status-message"
			@animationend="clear_status_message()">{{ status_message }}</span>

	</div>
</template>

<script>
import _ from 'lodash';

import { mapState } from 'vuex';

const LOCAL_PARTS_LISTS_KEY = 'parts_lists';

const pl_comparison_slice = _.partial(_.pick, _, ['name', 'timestamp']);

function applyAnyMissingSchema(parts, canon_parts) {
	for (let part_type of Object.keys(parts)) {
		let schema_list = parts[part_type].schema;
		if (schema_list) {
			let canon_schema_list = canon_parts[part_type].schema;
			let schema_map = new Map(
				schema_list.map(schema => [schema.name, schema])
			);
			let canon_schema_map = new Map(
				canon_schema_list.map(schema => [schema.name, schema])
			);
			for (let [schema_name, canon_schema] of canon_schema_map) {
				let schema = schema_map.get(schema_name);
				if (schema) {
					for (let prop in canon_schema) {
						if (!schema.hasOwnProperty(prop)) {
							schema[prop] = canon_schema[prop];
						}
					}
				} else {
					schema_list.push(Object.assign({}, canon_schema));
				}
			}
		}
	}
}

export default {
	name: 'PartsListFooter',
	components: {},
	data() {
		return {
			status_message: '',
			status_message_timeout_id: null,

			local_parts_lists: [],
			selected_parts_list: null
		};
	},
	computed: {
		parts_list_name: {
			get() {
				return this.$store.state.parts_list.name;
			},
			set(value) {
				this.$store.commit('set_parts_list_name', value);
			}
		},
		selected_parts_list_name: {
			get() {
				if (this.selected_parts_list) {
					return this.parts_list_save_name(this.selected_parts_list);
				} else {
					return null;
				}
			},
			set(value) {
				this.selected_parts_list = _.chain(this.all_parts_lists)
					.find(list => this.parts_list_save_name(list) === value)
					.value();
			}
		},
		all_parts_lists() {
			return [...this.local_parts_lists, this.canon_parts_list];
		},
		...mapState(['canon_parts_list'])
	},
	mounted() {
		this.parts_lists_load_from_local_storage();
		window.addEventListener(
			'storage',
			function(ev) {
				if (ev.key === LOCAL_PARTS_LISTS_KEY) {
					this.parts_lists_load_from_local_storage();
				}
			}.bind(this)
		);
	},
	methods: {
		reset_to_canon() {
			this.$store.commit('reset_to_canon');
		},
		parts_list_save_name(pl) {
			// console.log(Object.keys(pl));
			return pl.name + ' (' + new Date(pl.timestamp).toLocaleString() + ')';
		},
		parts_lists_load_from_local_storage() {
			const loaded = localStorage.getItem(LOCAL_PARTS_LISTS_KEY);
			if (loaded === null) {
				this.local_parts_lists = [];
				this.display_status_message('No parts lists to load');
			} else {
				let local_parts_lists = JSON.parse(loaded);
				local_parts_lists.forEach(local_parts =>
					applyAnyMissingSchema(local_parts, this.canon_parts_list)
				);
				this.local_parts_lists = local_parts_lists;
				this.display_status_message('Parts lists loaded');
			}
		},
		parts_lists_load_selected() {
			this.$store.commit(
				'set_parts_list',
				_.cloneDeep(this.selected_parts_list)
			);
			this.display_status_message('Parts list loaded');
		},
		parts_lists_delete_selected() {
			// remove the selected item
			this.local_parts_lists = _.chain(this.local_parts_lists)
				.reject(pl => {
					return _.isEqual(
						pl_comparison_slice(pl),
						pl_comparison_slice(this.selected_parts_list)
					);
				})
				.value();
			this.parts_lists_save_to_local_storage();
			this.display_status_message('Parts list deleted');
		},
		parts_lists_save_current() {
			this.$store.commit('timestamp_parts_list');
			this.local_parts_lists.push(_.cloneDeep(this.$store.state.parts_list));
			this.parts_lists_save_to_local_storage();
			this.display_status_message('Parts list saved');
		},
		parts_lists_save_to_local_storage() {
			localStorage.setItem(
				LOCAL_PARTS_LISTS_KEY,
				JSON.stringify(this.local_parts_lists)
			);
		},

		parts_lists_save_file() {
			this.$store.commit('timestamp_parts_list');
			const data = encodeURIComponent(
				JSON.stringify(this.$store.state.parts_list)
			);
			const filename =
				this.$store.state.parts_list.name +
				' ' +
				this.$store.state.parts_list.timestamp +
				'.json';
			let element = this.$refs.save_file_a;
			element.setAttribute('href', 'data:text/plain;charset=utf-8,' + data);
			element.setAttribute('download', filename);
			element.click();
		},
		parts_lists_load_file() {
			let load_f = this.$refs.load_file_input.files[0];
			let reader = new FileReader();
			reader.onload = function(event) {
				if (reader.readyState === FileReader.DONE) {
					let local_parts = JSON.parse(reader.result);
					applyAnyMissingSchema(local_parts, this.canon_parts_list);
					this.$store.commit('set_parts_list', _.cloneDeep(local_parts));
					this.local_parts_lists.push(_.cloneDeep(local_parts));
					this.parts_lists_save_to_local_storage();
					this.selected_parts_list = this.parts_list_save_name(local_parts);
					this.display_status_message('Parts list loaded from file');
				}
			}.bind(this);
			reader.readAsText(load_f);
		},

		display_status_message(status) {
			this.status_message = status;
			this.$refs.status_message.className = 'parts-list-footer-status-message';
			window.requestAnimationFrame(
				function(time) {
					window.requestAnimationFrame(
						function(time) {
							this.$refs.status_message.className =
								'parts-list-footer-status-message fade';
						}.bind(this)
					);
				}.bind(this)
			);
		},
		clear_status_message() {
			this.status_message = null;
		}
	}
};
</script>

<style scoped>
.footer {
	background-color: #999;

	width: 100%;
	margin: 0px;
}

.parts-list-footer-status-message {
}

.fade {
	animation: fadeanim 3s forwards;
}

@keyframes fadeanim {
	from {
	}
	to {
		color: transparent;
	}
}
</style>

<style>
</style>
