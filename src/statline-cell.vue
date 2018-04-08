<template>
	<td class="stat-column">{{pretty}}</td>
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
			default() { return 2; },
		},
		ispretty: {
			type: Boolean,
			default() { return true; },
		},
	},
	computed: {
		pretty() {
			if (this.is_zero) {
				return '';
			} else if (this.ispretty) {
				return this.raw.toFixed(this.fixed);
			} else {
				return this.raw;
			}
		},
		is_zero() {
			return Math.abs(this.raw) < Number.EPSILON;
		},
		raw() {
			return this.stats[this.name];
		},
	},
};
</script>

<style>

</style>

<style scoped>

</style>
