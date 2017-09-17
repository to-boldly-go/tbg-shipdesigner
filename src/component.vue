<template>
  <div class="component-div">
	<div class="name-span">{{this.se_component.name}}</div>
	<div class="part-span">{{this.se_component.part_def['Name']}}</div>
	<div class="count-span">{{this.se_component.quantity}}</div>
	<div class="spacer-span"></div>
	<div class="stats-span">
	  <Statline :stats=this.se_component.stats></Statline>
	</div>
  </div>
</template>


<script>

// TODO: function properly in the case of multiple components with the
// same name

import ShipEngine from '../lib/shipengine.js';

import Statline from './statline.vue';

export default {
	name: 'ComponentDiv',
	components: {
		Statline,
	},
	props: {
		se_db: Object,
		design_info: Object,
		subsystem_name: String,
		component_name: String,
	},
	computed: {
		se_design () {
			return new ShipEngine.Design(this.se_db, this.design_info.data);
		},
		se_subsystem() {
			return this.se_design.subsystems.find((ss) => ss.name === this.subsystem_name);
		},
		set_component() {
			return this.se_subsystem.find((comp) => comp.name === this.component_name);
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
