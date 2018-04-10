<template>
	<div class="root">
		<div class="header">
			<DesignSummary></DesignSummary>
		</div>
		<div class="design">
			<Design></Design>
		</div>
		<div class="footer">
			<DesignImportExport></DesignImportExport>
		</div>
	</div>
</template>


<script>

import DesignSummary from '@/components/shipdesigner/design-summary.vue';
import Design from '@/components/shipdesigner/design.vue';
import DesignImportExport from '@/components/shipdesigner/design-import-export.vue';

export default {
	name: 'app',
	components: {
		DesignSummary,
		Design,
		DesignImportExport,
	},
	computed: {
	},
};

</script>


<style>

.root {
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	font-size: 15px;
}

.header {
	flex: 0 0 auto;
	border-bottom: 2px solid;
}

.design {
	flex: 1 1 auto;
	position: relative;/* need this to position inner content */
	overflow-y: auto;
}

.footer {
	flex: 0 0 auto;
	border-top: 2px solid;
}

</style>
