<template>
  <div class="design-import-export">
	<input type="button"
		   class="undo-button"
		   @click="dispatch_undo"
		   value="<"></input>
	<input type="button"
		   class="redo-button"
		   @click="dispatch_redo"
		   value=">"></input>

    <select v-model="selected_parts_list_name">
      <option v-for="parts_list in all_parts_lists">
		{{parts_list_save_name(parts_list)}}
      </option>
    </select>

    <input type="button" @click="parts_lists_load_selected" value="Load parts list"></input>

    <!-- <input id="design-import-export-blueprint-string" v-model="design_json_string"> -->
    <!-- <input type="button" -->
	<!-- 	   class="clipboard-copy-button" -->
	<!-- 	   data-clipboard-target="#design-import-export-blueprint-string" -->
	<!-- 	   value="Copy"></input> -->

	<span><a v-bind:href="'shipdesigner.html#' + design_json_url_encoded_string">Link to this design</a></span>

    <select v-model="selected_save_bp">
      <option v-for="blueprint in local_saves">
		{{blueprint_save_name(blueprint)}}
      </option>
    </select>

    <input type="button" @click="local_saves_delete_selected" value="Delete save"></input>
    <input type="button" @click="local_saves_load_selected" value="Load save"></input>

    <input type="button" @click="local_saves_save_design" value="Save current design"></input>
    <input type="button" @click="local_saves_load_from_local_storage" value="Refresh"></input>

    <span
	  ref="status_message"
	  class="design-import-export-status-message"
	  @animationend="clear_status_message()">{{ status_message }}</span>
  </div>
</template>


<script>

import _ from 'lodash';
import ShipEngine from '../lib/shipengine';

import { mapState, mapGetters } from 'vuex';

// import Clipboard from 'clipboard';
// new Clipboard('.clipboard-copy-button');

const LOCAL_PARTS_LISTS_KEY = 'parts_lists';
const LOCAL_SAVES_KEY = 'local_saves';
const STATUS_DEFAULT_DURATION = 2000;

const bp_comparison_slice = _.partial(_.pick, _, ['Name', 'Blueprint Date']);
const pl_comparison_slice = _.partial(_.pick, _, ['name', 'timestamp']);

export default {
    name: 'DesignImportExport',
    components: {
    },
    data () {
		return {
			// local_saves is a straight array of blueprint objects,
			// exactly the same as the design_json object.
			local_saves: [],
			// the currently selected element of the local_saves
			// array. *not* the same as design_json! this is so
			// the user can work with the list of locally saved
			// blueprints without clobbering their current work.
			selected_save: null,

			status_message: "",

			status_message_timeout_id: null,

			local_parts_lists: [],
			selected_parts_list: null,
		};
    },
    computed: {
		selected_parts_list_name: {
			get () {
				if (this.selected_parts_list) {
					return this.parts_list_save_name(this.selected_parts_list);
				} else {
					return null;
				};
			},
			set (value) {
				this.selected_parts_list = _
					.chain(this.all_parts_lists)
					.find(list => this.parts_list_save_name(list) === value)
					.value();
			},
		},
		all_parts_lists () {
			return [...this.local_parts_lists, this.canon_parts_list];
		},
		selected_save_bp: {
			get () {
				if (this.selected_save) {
					return this.blueprint_save_name(this.selected_save);
				} else {
					return null;
				};
			},
			set (value) {
				this.selected_save = _.chain(this.local_saves).find(bp => this.blueprint_save_name(bp) === value).value();
			},
		},
		design_json_string: {
			get () {
				return JSON.stringify(this.$store.state.design_json);
			},
			set (value) {
				this.$store.commit('set_design_json', JSON.parse(value));
			},
		},
		design_json_url_encoded_string () {
			return encodeURI(this.design_json_string);
		},
		...mapState([
			'canon_parts_list',
		]),
    },
    mounted () {
		this.local_saves_load_from_local_storage();
		window.addEventListener('storage', function(ev) {
			if (ev.key === LOCAL_SAVES_KEY) {
				this.local_saves_load_from_local_storage();
			};
		}.bind(this));

		this.parts_lists_load_from_local_storage();
		window.addEventListener('storage', function(ev) {
			if (ev.key === LOCAL_PARTS_LISTS_KEY) {
				this.parts_lists_load_from_local_storage();
			};
		}.bind(this));
    },
    methods: {
		dispatch_undo () {
			this.$store.dispatch('undo');
		},
		dispatch_redo () {
			this.$store.dispatch('redo');
		},
		blueprint_save_name (bp) {
			return bp['Name'] +
				' (' + (new Date(bp['Blueprint Date']).toLocaleString()) + ')' +
				' [' + (new ShipEngine.Design(this.$store.getters.se_db, bp).stats.toString()) + ']';
		},
		parts_list_save_name (pl) {
			return pl.name + ' (' + (new Date(pl.timestamp).toLocaleString()) + ')';
		},
		parts_lists_load_from_local_storage () {
			const loaded = localStorage.getItem(LOCAL_PARTS_LISTS_KEY);
			if (loaded === null) {
				this.local_parts_lists = [];
				this.display_status_message("No parts lists to load");
			} else {
				this.local_parts_lists = JSON.parse(loaded);
				this.display_status_message("Parts lists loaded.");
			};
		},
		parts_lists_load_selected () {
			this.$store.commit('set_parts_list', _.cloneDeep(this.selected_parts_list));
			this.display_status_message("Parts list loaded");
		},
		
		local_saves_delete_selected () {
			// remove the selected item
			this.local_saves = _.chain(this.local_saves).reject(bp => {
				return _.isEqual(bp_comparison_slice(bp), bp_comparison_slice(this.selected_save));
			}).value();
			this.local_saves_save_to_local_storage();
			this.display_status_message("Blueprint deleted.");
		},
		local_saves_load_selected () {
			this.$store.commit('set_design_json', _.cloneDeep(this.selected_save));
			this.display_status_message("Blueprint loaded.");
		},
		local_saves_save_design () {
			this.$store.commit('timestamp_design');
			this.local_saves.push(_.cloneDeep(this.$store.state.design_json));
			this.local_saves_save_to_local_storage();
			this.display_status_message("Blueprint saved.");
		},

		local_saves_load_from_local_storage () {
			const loaded = localStorage.getItem(LOCAL_SAVES_KEY);
			if (loaded === null) {
				this.local_saves = [];
				this.display_status_message("No Blueprints to load");
			} else {
				this.local_saves = JSON.parse(loaded);
				this.display_status_message("Blueprints loaded.");
			};
		},
		local_saves_save_to_local_storage () {
			localStorage.setItem(LOCAL_SAVES_KEY, JSON.stringify(this.local_saves))
		},

		display_status_message (status) {
			this.status_message = status;
			this.$refs.status_message.className = 'design-import-export-status-message';
			window.requestAnimationFrame(function(time) {
				window.requestAnimationFrame(function(time) {
					this.$refs.status_message.className = "design-import-export-status-message fade";
				}.bind(this));
			}.bind(this));
		},
		clear_status_message () {
			this.status_message = null;
		}
		
    },
}
</script>


<style scoped>
.design-import-export {
	background-color: #999;

	width: 100%;
	margin: 0px;

	left: 5px;
	top: 5px;
}

.design-import-export-status-message {
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
