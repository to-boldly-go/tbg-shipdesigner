<template>
  <span class="statline">
	<span v-for="stat in stat_names">{{pretty[stat]}}</span>
  </span>
</template>


<script>

export default {
	name: 'Statline',
	components: {
	},
	props: {
		stats: Object,
		fixed: {
			type: Number,
			default () { return  2; },
		},			
	},
	computed: {
		pretty () {
			return this
					.stats
					.apply((val) => val.toFixed(this.fixed || 2));
		},
		stat_names () {
			return this.stats.names;
		},
	},
}
</script>


<style>
.statline {
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
}

.stat-cell {
	flex: 1 1 0;
}
</style>
