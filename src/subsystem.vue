<template>
  <div class="subsystem">
	<div class="headline">
	  <div class="name-span">{{se_subsystem.name}}</div>
	  <select v-model="sub_frame">
		<option v-for="sub_frame_value in se_subsystem.valid_frames">{{sub_frame_value['Name']}}</option>
	  </select>
	  <div class="spacer-span"></div>
	  <div class="stats-span">
		<Statline :stats=se_subsystem.stats></Statline>
	  </div>
	</div>
	<div class="components-div">
	  <div v-for="se_component in se_components">
		<ComponentDiv :se_db="se_db" :se_component="se_component"></ComponentDiv>
	  </div>
	</div>
  </div>
</template>


<script>

import ShipEngine from '../lib/shipengine.js';

import Statline from './statline.vue';
import ComponentDiv from './component.vue';

export default {
	name: 'Subsystem',
	components: {
		Statline,
		ComponentDiv,
	},
	props: {
		se_db: Object,
		se_subsystem: Object,
	},
	computed: {
		se_components () {
			return this.se_subsystem.components;
		},
		sub_frame: {
			get () {
				return this.se_subsystem.json['Sub-Frame'];
			},
			set (value) {
				this.se_subsystem.json['Sub-Frame'] = value;
			},
		},
	},
	methods: {
	},
}
</script>


<style>
.subsystem {
	background-color: #29e;
	border: 2px solid #07a;
	width: 100%;
	margin: 0px;
	box-sizing: border-box;
	left: 5px;
	top: 5px;
}

.headline {
	display: flex;
	justify-content: flex-start;
}

.name-span {
}

.stats-span {
}

.spacer-span {
	flex-grow: 1;
}
</style>
