<template>
  <div class="component-div">
	<div class="name-span">{{se_component.name}}</div>
	<input class="quantity-input" type="number" v-model="quantity">
	<select v-model="part" class="part-select">
	  <option v-for="part_value in se_component.valid_parts">{{part_value['Name']}}</option>
	</select>
	<div class="post-part-spacer"></div>
	<div class="stats-span">
	  <Statline :stats=stats></Statline>
	</div>
  </div>
</template>


<script>

import ShipEngine from '../lib/shipengine.js';

import Statline from './statline.vue';

export default {
	name: 'ComponentDiv',
	components: {
		Statline,
	},
	props: {
		se_db: Object,
		se_component: Object,
	},
	computed: {
		quantity: {
			get () {
				return this.se_component.quantity;
			},
			set (value) {
				this.se_component.quantity = value;
			},
		},
		stats() {
			return this.se_component.stats;
		},
		part: {
			get () {
				return this.se_component.part;
			},
			set (value) {
				this.se_component.part = value;
			},
		},
	},
	methods: {
	},
}
</script>


<style>
.component-div {
	background-color: #07c;
	border: 2px solid #07a;
	width: 100%;
	margin: 0px;
	box-sizing: border-box;
	left: 5px;
	top: 5px;

	display: flex;
	flex-flow: row nowrap;
}

.name-span {
	flex: 3 0 0;
}

.stats-span {
	flex: 5 1 0;
}

.part-select {
	flex: 5 1 0;
}

.quantity-input {
	width: 30px;
	flex: 0 0 auto;
}

.post-part-spacer {
	flex: 1 1 0;
}
</style>
