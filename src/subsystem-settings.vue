<template>
  <tr class="setting-tr" v-if="has_settings">
	<td class="settings-cell" colspan="100"> <!-- span all columns and we'll just fill it with settings -->
	  <SettingCell v-for="setting in settings" :key="setting['Name']" :setting="setting"></SettingCell>
	</td>
  </tr>
</template>

<script>

import { mapState, mapGetters } from 'vuex';

import ShipEngine from '../lib/shipengine.js';

import SettingCell from './setting-cell.vue'

export default {
	name: 'SubsystemSettings',
	components: {
		SettingCell,
	},
	props: {
		se_subsystem: Object,
	},
	computed: {
		has_settings () {
			return this.se_subsystem.settings.length > 0;
		},
		settings () {
			return this.se_subsystem.settings;
		},
		...mapGetters([
			'se_design',
			'se_db',
			'design_info',
		]),
	},
}

</script>

<style>
  
</style>

<style scoped>

.setting-tr {
	background: #ccc;
}

.setting-container {
	display: flex;
}


</style>
