<template>
  <div class="subsystem">
	<div class="headline">
	  <div class="name-span">{{se_subsystem.name}}</div>
	  <div class="pre-sub-frame-spacer"></div>
	  <select v-model="sub_frame" class="sub-frame-select">
		<option v-for="sub_frame_value in se_subsystem.valid_frames">{{sub_frame_value['Name']}}</option>
	  </select>
	  <div class="post-sub-frame-spacer"></div>
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
				return this.se_subsystem.sub_frame;
			},
			set (value) {
				this.se_subsystem.sub_frame = value;
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
	flex-flow: row nowrap;
}

.name-span {
	flex: 3 0 0;
}

.stats-span {
	flex: 5 1 0;
}

.sub-frame-select {
	flex: 5 1 0;
}

.pre-sub-frame-spacer {
	width: 30px;
	flex: 0 0 auto;
}

.post-sub-frame-spacer {
	flex: 1 1 0;
}
</style>
