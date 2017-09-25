<template>
  <div class="footer">
	<input id="partslist-import-export-string" v-model="partslist_json_string">
	<input type="button" class="clipboard-copy-button" data-clipboard-target="#partslist-import-export-string" value="Copy"></input>
  </div>
</template>

<script>

import Clipboard from 'clipboard';

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
