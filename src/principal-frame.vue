<template>
  <div class="principal-frame">
	<input v-model="ship_name" placeholder="Ship Name">

	<select v-model="principal_frame">
	  <option v-for="princ_frame_value in se_design.valid_frames">{{princ_frame_value['Name']}}</option>
	</select>
  </div>
</template>


<script>

import ShipEngine from '../lib/shipengine.js';

export default {
	name: 'PrincipalFrame',
	props: {
		se_db: Object,
		se_design: Object,
	},
	computed: {
		principal_frame: {
			get () {
				return this.se_design.json['Principal Frame'];
			},
			set (value) {
				this.se_design.json['Principal Frame'] = value;
			},
		},
		ship_name: {
			get () {
				return this.se_design.json['Name'];
			},
			set (value) {
				this.se_design.json['Name'] = value;
			}
		},
	},
	methods: {
	},
}
</script>


<style>
.principal-frame {
	background-color: #29e;
	border: 2px solid #07a;
	width: 100%;
	margin: 0px;
	box-sizing: border-box;
	left: 5px;
	top: 5px;
}
</style>
