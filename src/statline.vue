<template>
  <span class="statline">{{this.pretty}}</span>
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
			return this.stats.toFixed(this.fixed || 2);
		},
	},
}
</script>


<style>
.statline {
}
</style>
