<template>
  <div class="footer">
	<input id="partslist-import-export-string" v-model="partslist_json_string">
	<input type="button" class="clipboard-copy-button" data-clipboard-target="#partslist-import-export-string" value="Copy"></input>
	<input type="button" @click="reset_to_canon()" value="Reset to canon"></input>
  </div>
</template>

<script>

import Clipboard from 'clipboard';
import canon_parts from '../dist/parts_C8.csv';

new Clipboard('.clipboard-copy-button');

export default {
	name: 'PartsListFooter',
	components: {
	},
	props: {
		partslist_info: {
			type: Object,
		},
	},
	computed: {
		partslist_json_string: {
			get () {
				return JSON.stringify(this.partslist_info.data);
			},
			set (value) {
				this.partslist_info.data = JSON.parse(value);
			},
		},
	},
	methods: {
		reset_to_canon () {
			this.partslist_info.data = canon_parts;
		},
	},
};
</script>

<style scoped>
.footer {
	background-color: #999;

	width: 100%;
	margin: 0px;
}

</style>

<style>

</style>
