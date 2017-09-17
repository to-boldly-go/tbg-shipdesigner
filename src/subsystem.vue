<template>
  <div class="subsystem">
	<div class="headline">
	  <div class="name-span">{{this.se_subsystem.name}}</div>
	  <div class="spacer-span"></div>
	  <div class="stats-span">
		<Statline :stats=this.se_subsystem.stats></Statline>
	  </div>
	</div>
	<div class="components-div">
	  <div v-for="se_component in se_components">
		{{se_component.name}}: {{se_component.quantity}}x {{se_component.json['Part']}} {{se_component.stats.toFixed(2)}}
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
