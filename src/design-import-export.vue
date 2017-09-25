<template>
  <div class="design-import-export">
    <input id="design-import-export-blueprint-string" v-model="design_json_string">
    <input type="button"
	   class="clipboard-copy-button"
	   data-clipboard-target="#design-import-export-blueprint-string"
	   value="Copy"></input>

    <select v-model="selected_save">
      <option v-for="blueprint in local_saves">
	{{blueprint['Name']}} @{{blueprint['Blueprint Date']}}
      </option>
    </select>

    <input type="button" @click="local_saves_delete_selected" value="Delete save"></input>
    <input type="button" @click="local_saves_load_selected" value="Load save"></input>

    <input type="button" @click="local_saves_save_design" value="Save current design"></input>
    <input type="button" @click="local_saves_load_from_local_storage" value="Refresh"></input>

    <span class="design-import-export-status-message">{{ status_message }}</span>
  </div>
</template>


<script>

import _ from 'lodash'
import localforage from 'localforage'
import Clipboard from 'clipboard';

new Clipboard('.clipboard-copy-button');

const STATUS_DEFAULT_DURATION = 2000;

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
	    // TODO: Consider binding to the actual blueprint
	    selected_save: null,

	    status_message: "",

	    status_message_timeout_id: null,
	};
    },
    props: {
	design_info: Object,
    },
    computed: {
	design_json_string: {
	    get () {
		let timestamp = new Date();
		// timestamp.setSeconds(0);
		timestamp.setMilliseconds(0);
		this.design_info.data['Blueprint Date'] = timestamp.toISOString();
		return JSON.stringify(this.design_info.data);
	    },
	    set (value) {
		this.design_info.data = JSON.parse(value);
	    },
	},
    },
    mounted () {
	this.local_saves_load_from_local_storage();
    },
    methods: {
	local_saves_delete_selected () {
	    // Remove the selected blueprint from local_saves
	    _.remove(this.local_saves, e => {
		let tmp = this.selected_save.split(" @");
		return e['Name'] === tmp[0] && e['Blueprint Date'] === tmp[1];
	    });
	    this.selected_save = null;
	    this.local_saves_save_to_local_storage();
	},
	local_saves_load_selected () {
	    this.design_info.data = this.selected_save;
	},
	local_saves_save_design () {
	    // TODO: add the user's current blueprint to local_saves
	    this.local_saves.push(_.clone(this.design_info.data));
	    this.local_saves_save_to_local_storage();
	},

	local_saves_load_from_local_storage () {
	    // TODO: implement this
	    localforage.getItem('local_saves').then(
		value => {
		    this.local_saves = value;
		    this.display_status_message("Blueprints loaded.")
		}
	    )
	},
	local_saves_save_to_local_storage () {
	    // TODO: implement this
	    localforage.setItem('local_saves', this.local_saves).then(
		value => {
		    this.display_status_message("Blueprints saved.");
		}
	    )
	},

	display_status_message (status) {
	    clearTimeout(this.status_message_timeout_id)
	    // TODO: Add fade in/out
	    this.status_message = status;
	},

	clear_status_message () {
	    // TODO: implement
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
</style>
