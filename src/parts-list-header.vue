<template>
  <div class="header">
	<div class="type-tab"
		 v-for="type in types"
		 @click="set_filter(type)"
		 v-bind:class="tab_class(type)">
	  <div class="type-tab-text">{{type}}</div>
	  <div class="indicator-lamp-wrapper">
		<div class="indicator-lamp-spacer"></div>
		<div class="indicator-lamp" v-bind:class="lamp_class(type)"></div>
		<div class="indicator-lamp-spacer"></div>
	  </div>
	</div>
  </div>
</template>

<script>

import _ from 'lodash';

export default {
	name: 'PartsListHeader',
	components: {
	},
	props: {
		partslist: {
			type: Array,
		},
		schema: {
			type: Array,
		},
		display: {
			type: Object,
		},
	},
	computed: {
		types () {

			let type_sort_map = _.chain(this.partslist)
				.map((part) => { return { [part['Type']]: part['Type Sort'] }; })
				.reduce(_.assign, {})
				.value();
			
			return _.chain(type_sort_map)
				.map((tsort, type) => { return { 'Type': type, 'Type Sort': tsort }; })
				.sortBy((elem) => elem['Type Sort'])
				.map((elem) => elem['Type'])
				.value();
		},
	},
	methods: {
		set_filter(type) {
			if (this.display.types.includes(type)) {
				this.display.types = _.filter(this.display.types, (elem) => !(elem === type));
			} else {
				this.display.types.push(type);
			};
		},
		displaying_type(type) {
			return 
		},
		tab_class(type) {
			return {
				'type-tab-selected': this.display.types.includes(type),
			};
		},
		lamp_class(type) {
			return {
				'indicator-lamp-selected': this.display.types.includes(type),
			};
		},
	},
};
</script>

<style scoped>

.header {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-start;
	cursor: pointer;
}

.type-tab {
	flex: 0 0 auto;
	padding: 4px;
	border: 1px outset #eee;
	background: #666;

	/* display: flex; */
	/* flex-direction: row; */
	/* justify-content: flex-start; */
	/* flex-wrap: nowrap; */
}

.type-tab:active {
	background: #aaa;
	border-style: inset;
}

.type-tab-selected {
	border: 1px solid #eee;
	background: #999;
}

.type-tab-text {
	/* flex: 5 0 auto; */
	float: left;
}

.indicator-lamp-wrapper {
	display: flex;
	flex-direction: column;

	height: 100%;

	float: right;
	margin-left: 4px;
	margin-top: 0px;
	margin-bottom: 0px;
	margin-right: 0px;
	
	width: 10px;
}

.indicator-lamp-spacer {
	flex: 1 0 0;
}

.indicator-lamp {
	/* width: 10px; */
	flex: 0 0 10px;
	background: black;
}

.indicator-lamp-selected {
	background: #2f2;
}

</style>

<style>

</style>
