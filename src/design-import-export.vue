<template>
  <div class="design-import-export">
	<input v-model="design_json_string">
  </div>
</template>


<script>

export default {
	name: 'DesignImportExport',
	components: {
	},
	props: {
		design_info: Object,
	},
	computed: {
		design_json_string: {
			get () {
				return JSON.stringify(this.design_info.data);
			},
			set (value) {
				this.design_info.data = JSON.parse(value);
			},
		},
	},
}
</script>


<style>
.design-import-export {
	background-color: #29d;

	width: 100%;
	margin: 0px;

	left: 5px;
	top: 5px;
}
</style>
