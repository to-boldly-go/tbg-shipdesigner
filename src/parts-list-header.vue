<template>
  <div class="header">
	<div class="select-tab-column">
	  <div class="select-tab"
		   v-for="select in ['parts','modules','frames']"
		   @click="set_selection(select)"
		   v-bind:class="tab_class_select(select)">
		<div class="select-tab-text">{{select}}</div>
		<div class="indicator-lamp-wrapper">
		  <div class="indicator-lamp-spacer"></div>
		  <div class="indicator-lamp" v-bind:class="lamp_class_select(select)"></div>
		  <div class="indicator-lamp-spacer"></div>
		</div>
	  </div>
	</div>

	<div class="type-tab-column">
	  <div class="type-tab"
		   v-for="type in types"
		   @click="set_filter(type)"
		   v-bind:class="tab_class_type(type)">
		<div class="type-tab-text">{{type}}</div>
		<div class="indicator-lamp-wrapper">
		  <div class="indicator-lamp-spacer"></div>
		  <div class="indicator-lamp" v-bind:class="lamp_class_type(type)"></div>
		  <div class="indicator-lamp-spacer"></div>
		</div>
	  </div>
	</div>
  </div>
</template>

<script>

import _ from 'lodash';

export default {
	name: 'PartsListHeader',
	computed: {
		types () {
			let type_sort_map = _.chain(this.$store.getters.selected_parts)
				.map((part) => { return { [part['Type']]: part['Type Sort'] }; })
				.reduce(_.assign, {})
				.value();
			
			return _.chain(type_sort_map)
				.map((tsort, type) => { return { 'Type': type, 'Type Sort': tsort }; })
				.sortBy((elem) => elem['Type Sort'])
				.map((elem) => elem['Type'])
				.value();
		},
		tab_class_type () {
			return function (type) {
				return {
					'type-tab-selected': this.$store.state.display.filter.types.includes(type),
				};
			};
		},
		tab_class_select () {
			return function (select) {
				return {
					'select-tab-selected': this.$store.state.display.selected === select,
				};
			};
		},
		lamp_class_type () {
			return function (type) {
				return {
					'indicator-lamp-selected': this.$store.state.display.filter.types.includes(type),
				};
			};
		},
		lamp_class_select () {
			return function (select) {
				return {
					'indicator-lamp-selected': this.$store.state.display.selected === select,
				};
			};
		},
	},
	methods: {
		set_selection(select) {
			this.$store.state.display.selected = select;
		},
		set_filter(type) {
			this.$store.commit('toggle_filter', type);
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
}

.select-tab-column {
	flex: 0 0 auto;
	display: flex;
	flex-direction: column;
}

.select-tab {
	cursor: pointer;
	flex: 0 0 auto;
	padding: 4px;
	border: 1px outset #eee;
	background: #33a;
	color: #fff;

	/* display: flex; */
	/* flex-direction: row; */
	/* justify-content: flex-start; */
	/* flex-wrap: nowrap; */
}

.select-tab:active {
	background: #66e;
	border-style: inset;
}

.select-tab-selected {
	border: 1px solid #eee;
	background: #44c;
}

.select-tab-text {
	/* flex: 5 0 auto; */
	float: left;
}

.spacer-tab {
	flex: 0 0 30px;
	padding: 4px;
	border: 1 px outset #eee;
	background: #666;
}

.type-tab-column {
	flex: 1 0 0;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-items: flex-start;
}

.type-tab {
	cursor: pointer;
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
