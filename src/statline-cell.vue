<template>
  <td class="statline-cell">{{pretty}}</td>
</template>


<script>

export default {
	name: 'StatlineCell',
	components: {
	},
	props: {
		stats: Object,
		name: String,
		fixed: {
			type: Number,
			default () { return  2; },
		},
	},
	computed: {
		pretty () {
			if (this.is_zero) {
				return '';
			} else {
				return this.raw.toFixed(this.fixed || 2);
			};
		},
		is_zero () {
			return Math.abs(this.raw) < Number.EPSILON;
		},
		raw () {
			return this.stats[this.name];
		},
	},
}
</script>


<style>
.statline-cell {
	border-style: none;
}
</style>
