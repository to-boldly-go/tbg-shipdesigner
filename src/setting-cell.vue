<template>
  <span class="setting-cell">
	<span class="setting-name">{{setting_name}}</span>

	<select
	  v-if="typeof(setting_value) === 'number'"
	  class="setting-input-number"
	  type="number"
	  v-model="setting_value">
	  <option v-for="num in valid_numbers">{{num}}</option>
	</select>

	<input
	  v-if="typeof(setting_value) === 'boolean'"
	  class="setting-input-bool"
	  type="checkbox"
	  v-model="setting_value">
  </span>
</template>

<script>

import ShipEngine from '../lib/shipengine.js';

export default {
	name: 'SettingCell',
	components: {
	},
	props: {
		setting: Object,
	},
	computed: {
		valid_numbers () {
			return [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
		},
		setting_name: {
			get () {
				return this.setting['Name'];
			},
			set (value) {
				this.setting['Name'] = value;
			},
		},
		setting_type () {
			return ;
		},
		setting_value: {
			get () {
				return this.setting['Value'];
			},
			set (value) {
				this.$store.commit('set_setting', {
					setting: this.setting,
					value: value,
				});
			},
		}
	},
}

</script>

<style>
  
</style>

<style scoped>

.setting-cell {
	flex: 1 1 0;
	margin-right: 13px;
}

.setting-input-number {
	width: 60px;
}

.setting-input-bool {
}

.setting-name {
}

</style>
