<template>
  <div class="design-import-export">
    <input id="design-import-export-blueprint-string" v-model="design_json_string">
    <input type="button"
		   class="clipboard-copy-button"
		   data-clipboard-target="#design-import-export-blueprint-string"
		   value="Copy"></input>

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
import Clipboard from 'clipboard';
import ShipEngine from '../lib/shipengine';

new Clipboard('.clipboard-copy-button');

const LOCAL_SAVES_KEY = 'local_saves';
const STATUS_DEFAULT_DURATION = 2000;

const comparison_slice = _.partial(_.pick, _, ['Name', 'Blueprint Date']);

export default {
    name: 'DesignImportExport',
    components: {
    },
    data () {
		return {
			// local_saves is a straight array of blueprint objects,
			// exactly the same as the design_info.data object.
			local_saves: [],
			// the currently selected element of the local_saves
			// array. *not* the same as design_info.data! this is so
			// the user can work with the list of locally saved
			// blueprints without clobbering their current work.
			selected_save: null,

			status_message: "",

			status_message_timeout_id: null,
		};
    },
    props: {
		design_info: Object,
		se_db: Object,
    },
    computed: {
		selected_save_bp: {
			get () {
				if (this.selected_save) {
					return this.blueprint_save_name(this.selected_save);
				} else {
					''
				};
			},
			set (value) {
				this.selected_save = _.chain(this.local_saves).find(bp => this.blueprint_save_name(bp) === value).value();
			},
		},
		design_json_string: {
			get () {
				return JSON.stringify(this.design_info.data);
			},
			set (value) {
				this.design_info.data = JSON.parse(value);
			},
		},
    },
    mounted () {
		this.local_saves_load_from_local_storage();
		window.addEventListener('storage', this.local_saves_load_from_local_storage);
    },
    methods: {
		blueprint_save_name (bp) {
			// return bp['Name'] + ' @' + new Date(bp['Blueprint Date']).toLocaleString();
			return bp['Name'] +
				' (' + (new Date(bp['Blueprint Date']).toLocaleString()) + ')' +
				' [' + (new ShipEngine.Design(this.se_db, bp).stats.toString()) + ']';
		},
		local_saves_delete_selected () {
			this.local_saves = _.chain(this.local_saves).filter(bp => {
				return _.isEqual(comparison_slice(bp), comparison_slice(this.selected_save));
			}).value();
			this.local_saves_save_to_local_storage();
			this.display_status_message("Blueprint deleted.");
		},
		local_saves_load_selected () {
			this.design_info.data = this.selected_save;
			this.display_status_message("Blueprint loaded.");
		},
		local_saves_save_design () {
			let timestamp = new Date();
			timestamp.setMilliseconds(0);
			this.design_info.data['Blueprint Date'] = timestamp.toISOString();
			this.local_saves.push(_.clone(this.design_info.data));
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
