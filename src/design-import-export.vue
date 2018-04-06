<template>
  <div class="design-import-export">
	<input type="button"
		   class="undo-button"
		   @click="dispatch_undo"
		   value="<"/>
	<input type="button"
		   class="redo-button"
		   @click="dispatch_redo"
		   value=">"/>

    <select v-model="selected_parts_list_name">
      <option v-for="parts_list in all_parts_lists" :key="parts_list.pretty_name">
		{{parts_list.pretty_name}}
      </option>
    </select>

    <input type="button" @click="parts_lists_load_selected" value="Load parts list"/>

	<span><a :href="'shipdesigner.html#' + design_json_url_encoded_string">Link to this design</a></span>

    <select v-model="selected_design_name">
      <option v-for="blueprint in local_saves" :key="blueprint.pretty_name">
		{{blueprint.pretty_name}}
      </option>
    </select>

    <input type="button" @click="local_saves_delete_selected" value="Delete save"/>
    <input type="button" @click="local_saves_load_selected" value="Load save"/>

    <input type="button" @click="local_saves_save_design" value="Save current design"/>
    <input type="button" @click="local_saves_load_from_local_storage" value="Refresh"/>

    <span
	  ref="status_message"
	  class="design-import-export-status-message"
	  @animationend="clear_status_message()">{{ status_message }}</span>
  </div>
</template>


<script>

import _ from 'lodash';
import * as ShipEngine from '../lib/shipengine';

import { mapState, mapGetters } from 'vuex';

const LOCAL_PARTS_LISTS_KEY = 'parts_lists';
const LOCAL_SAVES_KEY = 'local_saves';
const STATUS_DEFAULT_DURATION = 2000;

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
					return this.selected_parts_list.pretty_name;
				} else {
					return null;
				};
			},
			set (value) {
				this.selected_parts_list = this.all_parts_lists.find(
					ShipEngine.DB.find_by_pretty_name(value)
				);
			},
		},
		all_parts_lists () {
			return [...this.local_parts_lists, this.canon_se_db];
		},
		selected_design_name: {
			get () {
				if (this.selected_save) {
					return this.selected_save.pretty_name;
				} else {
					return null;
				};
			},
			set (value) {
				this.selected_save = this.local_saves.find(
					ShipEngine.Design.find_by_pretty_name(value)
				);
			},
		},
		design_json_string () {
			return JSON.stringify(this.$store.state.design_json);
		},
		design_json_url_encoded_string () {
			return encodeURI(this.design_json_string);
		},
		...mapGetters([
			'canon_se_db',
			'se_design',
			'se_db',
		]),
    },
    mounted () {
		this.parts_lists_load_from_local_storage();
		window.addEventListener('storage', function(ev) {
			if (ev.key === LOCAL_PARTS_LISTS_KEY) {
				this.parts_lists_load_from_local_storage();
			};
		}.bind(this));

		this.local_saves_load_from_local_storage();
		window.addEventListener('storage', function(ev) {
			if (ev.key === LOCAL_SAVES_KEY) {
				this.local_saves_load_from_local_storage();
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
		parts_lists_load_from_local_storage () {
			const loaded = localStorage.getItem(LOCAL_PARTS_LISTS_KEY);
			if (loaded === null) {
				this.local_parts_lists = [];
				this.display_status_message("No parts lists to load");
			} else {
				this.local_parts_lists = JSON.parse(loaded).map(
					pl_json => new ShipEngine.DB(pl_json)
				);
				this.display_status_message("Parts lists loaded.");
			};
		},
		parts_lists_load_selected () {
			this.$store.commit('set_parts_list', _.cloneDeep(this.selected_parts_list.json));
			this.$store.commit('set_design_parts_list');
			this.display_status_message("Parts list loaded");
		},
		
		local_saves_delete_selected () {
			// remove the selected item
			this.local_saves = _.chain(this.local_saves).reject(
				(elem) => elem == this.selected_save
			).value();
			this.local_saves_save_to_local_storage();
			this.display_status_message("Blueprint deleted.");
		},
		local_saves_load_selected () {
			const db = this.all_parts_lists.find(
				ShipEngine.DB.find_by_design_json(this.selected_save.json)
			);
			if (db) {
				this.$store.commit('set_parts_list', _.cloneDeep(db.json));
				this.selected_parts_list = db;
			};

			this.$store.commit('set_design_json', _.cloneDeep(this.selected_save.json));
			this.display_status_message("Blueprint loaded.");
		},
		local_saves_save_design () {
			this.$store.commit('set_design_parts_list');
			this.$store.commit('timestamp_design');
			const new_save = new ShipEngine.Design(this.se_db, _.cloneDeep(this.$store.state.design_json));
			this.local_saves.push(new_save);
			this.local_saves_save_to_local_storage();
			this.selected_save = new_save;
			this.display_status_message("Blueprint saved.");
		},

		local_saves_load_from_local_storage () {
			const loaded = localStorage.getItem(LOCAL_SAVES_KEY);
			if (loaded === null) {
				this.local_saves = [];
				this.display_status_message("No Blueprints to load");
			} else {
				this.local_saves = JSON.parse(loaded).map((design_json) => {
					let db;
					let wrong_db;
					if (design_json['Parts List']) {
						db = this.all_parts_lists.find(
							ShipEngine.DB.find_by_design_json(design_json)
						);
						wrong_db = db === undefined;
					} else {
						db = this.se_db;
						wrong_db = false;
					};
					return new ShipEngine.Design(db || this.se_db, design_json, wrong_db);
				});
				this.display_status_message("Blueprints loaded.");
			};
		},
		local_saves_save_to_local_storage () {
			localStorage.setItem(LOCAL_SAVES_KEY, JSON.stringify(
				_.chain(this.local_saves)
					.map((design) => design.json)
					.value()
			));
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
