<template>
  <div class="design-import-export">
	<input id="design-import-export-blueprint-string" v-model="design_json_string">
	<input type="button" class="clipboard-copy-button" data-clipboard-target="#design-import-export-blueprint-string" value="Copy"></input>

	<select v-model="selected_save">
	  <option v-for="saved_blueprint in local_saves">{{saved_blueprint['Name']}} ({{saved_blueprint['Blueprint Date']}})</option>
	</select>

	<input type="button" @click="local_saves_delete_selected" value="Delete save"></input>
	<input type="button" @click="local_saves_load_selected" value="Load save"></input>

	<input type="button" @click="local_saves_save_design" value="Save current design"></input>
	<input type="button" @click="local_saves_load_from_local_storage" value="Refresh"></input>
  </div>
</template>


<script>

import Clipboard from 'clipboard';

new Clipboard('.clipboard-copy-button');

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
		};
	},
	props: {
		design_info: Object,
	},
	computed: {
		design_json_string: {
			get () {
				let timestamp = new Date().toISOString();
				timestamp.seconds = 0;
				timestamp.milliseconds = 0;
				this.design_info.data['Blueprint Date'] = timestamp;
				return JSON.stringify(this.design_info.data);
			},
			set (value) {
				this.design_info.data = JSON.parse(value);
			},
		},
	},
	methods: {
		local_saves_delete_selected () {
			// TODO: remove the selected blueprint from local_saves
			this.local_saves_save_to_local_storage();
		},
		local_saves_load_selected () {
			this.design_info.data = selected_save;
		},
		local_saves_save_design () {
			// TODO: add the user's current blueprint to local_saves
			this.local_saves_save_to_local_storage();
		},

		local_saves_load_from_local_storage () {
			// TODO: implement this
		},
		local_saves_save_to_local_storage () {
			// TODO: implement this
		},
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
